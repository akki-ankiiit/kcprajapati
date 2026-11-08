import {useCallback, useEffect, useRef, useState, type CSSProperties, type RefObject} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {SplitText} from 'gsap/SplitText'
import 'gsap/EasePack'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export type HoverRevealItem = {
  name: string
  image: string
  alt: string
  desc: string
  href: string
}

export type HoverRevealListProps = {
  eyebrow?: string
  items?: HoverRevealItem[]
  /** numbers, eyebrow and button hover */
  accent?: string
  background?: string
  /** text and rule colour */
  foreground?: string
  /** seconds the new photo takes to open out of the centre */
  duration?: number
  className?: string
}

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

export const DEFAULT_ITEMS: HoverRevealItem[] = [
  {
    name: 'Strategy',
    image: unsplash('photo-1552664730-d307ca884978'),
    alt: 'Team planning strategy on a whiteboard with sticky notes',
    desc: 'We work closely with our clients to uncover what truly defines their brand. Through shared exploration, we find the idea that guides how it speaks and acts.',
    href: '#strategy',
  },
  {
    name: 'Brand Identity',
    image: unsplash('photo-1561070791-2526d30994b5'),
    alt: 'Colour palettes and brand identity materials on a designer desk',
    desc: 'A brand is more than a logo. We craft complete identities — voice, colour and visual language — that make a brand instantly recognisable everywhere it shows up.',
    href: '#brand-identity',
  },
  {
    name: 'Design',
    image: unsplash('photo-1581291518857-4e27b48ff24e'),
    alt: 'Designer sketching interface wireframes with a pen',
    desc: 'From print to product, we design with intent. Every layout, typeface and detail is considered, so the work feels effortless and unmistakably on-brand.',
    href: '#design',
  },
  {
    name: 'Film',
    image: unsplash('photo-1485846234645-a62644f84728'),
    alt: 'Film clapperboard held up before a take',
    desc: 'Stories move people. We concept, direct and produce films that bring brands to life — from quick social cuts to full campaign productions.',
    href: '#film',
  },
  {
    name: 'Digital',
    image: unsplash('photo-1460925895917-afdab827c52f'),
    alt: 'Laptop showing a digital analytics dashboard',
    desc: 'Websites, campaigns and experiences built to connect. We translate brand thinking into digital products that people genuinely enjoy using.',
    href: '#digital',
  },
]

type Layer = {id: number; item: HoverRevealItem}
type Desc = {id: number; text: string}

const setInMap =
  <T,>(map: RefObject<Map<number, T>>, id: number) =>
  (el: T | null) => {
    if (el) map.current.set(id, el)
    else map.current.delete(id)
  }

// A list with a hover image reveal. Hovering (or clicking) a row swaps the
// photo through a centre-out clip reveal, swaps the description line by
// line, glides a solid strip under the row (the row flips to the background
// colour) and sends the arrow out and back. The whole thing reveals once
// when it scrolls into view. Fills its parent.
export default function HoverRevealList({
  eyebrow = '( Our Services )',
  items = DEFAULT_ITEMS,
  accent = '#ff5b2e',
  background = '#0d0c0a',
  foreground = '#f3efe6',
  duration = 0.7,
  className = '',
}: HoverRevealListProps) {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  // Stacked photo layers: each swap pushes a new one on top; once it has
  // covered everything beneath, the older ones are dropped.
  const [layers, setLayers] = useState<Layer[]>(() => [{id: 0, item: items[0]}])
  // The outgoing description exits up while the incoming one rises line by line.
  const [descs, setDescs] = useState<Desc[]>(() => [{id: 0, text: items[0].desc}])

  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const stripRef = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const arrowRef = useRef<SVGSVGElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const layerRefs = useRef(new Map<number, HTMLDivElement>())
  const imgRefs = useRef(new Map<number, HTMLImageElement>())
  const descRefs = useRef(new Map<number, HTMLParagraphElement>())
  const splits = useRef(new Map<number, SplitText>())
  const nextId = useRef(1)
  const activeRef = useRef(0)
  // the newest layer / description already animated: pruning the old ones
  // changes the state again, and must not replay the newest one's reveal
  const shownLayer = useRef(0)
  const shownDesc = useRef(0)

  /* ---- white strip over the active row ---- */
  const moveStrip = useCallback((index: number, instant = false) => {
    const item = itemRefs.current[index]
    if (!item) return
    const to = {y: item.offsetTop, height: item.offsetHeight}
    if (instant) gsap.set(stripRef.current, to)
    else gsap.to(stripRef.current, {...to, duration: 0.4, ease: 'power3.out', overwrite: true})
  }, [])

  /* ---- entrance: plays once when the component scrolls into view ---- */
  useGSAP(
    () => {
      const firstLayer = layerRefs.current.get(0)
      const firstImg = imgRefs.current.get(0)
      const firstDesc = descRefs.current.get(0)!
      const rows = itemRefs.current.slice(0, items.length)
      gsap.set(firstLayer!, {clipPath: 'inset(50%)'})
      gsap.set(firstImg!, {scale: 1.3})
      gsap.set(eyebrowRef.current, {autoAlpha: 0, y: 24})
      gsap.set(rows, {autoAlpha: 0, y: 64})
      gsap.set([stripRef.current, firstDesc], {autoAlpha: 0})
      gsap.set(ctaRef.current, {autoAlpha: 0, scale: 0.6})
      moveStrip(0, true)

      const revealDesc = () => {
        const split = SplitText.create(firstDesc, {type: 'lines', mask: 'lines'})
        splits.current.set(0, split)
        gsap.set(firstDesc, {autoAlpha: 1})
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.7,
          ease: 'power3.out',
          onComplete: () => {
            split.revert()
            splits.current.delete(0)
          },
        })
      }

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 65%',
        once: true,
        onEnter: () =>
          gsap
            .timeline({defaults: {ease: 'power3.out'}})
            .to(firstLayer!, {clipPath: 'inset(0%)', duration: 1, ease: 'power3.inOut'}, 0)
            .to(firstImg!, {scale: 1, duration: 1.8, ease: 'power2.out'}, 0)
            .to(eyebrowRef.current, {autoAlpha: 1, y: 0, duration: 0.6}, 0.2)
            .to(rows, {autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09}, 0.3)
            .add(() => moveStrip(activeRef.current, true), 0.3)
            .to(stripRef.current, {autoAlpha: 1, duration: 0.5}, 0.9)
            .add(revealDesc, 0.65)
            .to(ctaRef.current, {autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)'}, 0.8),
      })

      // row heights depend on fonts and width, so re-anchor the strip when they change
      const ro = new ResizeObserver(() => moveStrip(activeRef.current, true))
      ro.observe(listRef.current!)
      return () => ro.disconnect()
    },
    {scope: rootRef},
  )

  // preload every image so switching feels instant
  useEffect(() => {
    items.forEach((s) => {
      new Image().src = s.image
    })
  }, [items])

  /* ---- photo swap: the newest layer opens out of the centre ---- */
  useGSAP(
    () => {
      const top = layers[layers.length - 1]
      if (top.id === shownLayer.current) return // the first layer belongs to the entrance
      shownLayer.current = top.id
      gsap
        .timeline({onComplete: () => setLayers((ls) => ls.filter((l) => l.id >= top.id))})
        .fromTo(layerRefs.current.get(top.id)!, {clipPath: 'inset(50%)'}, {clipPath: 'inset(0%)', duration, ease: 'expoScale(0.5,7,power2.inOut)'}, 0)
        .fromTo(imgRefs.current.get(top.id)!, {scale: 1.5}, {scale: 1, duration: duration * 1.43, ease: 'power2.out'}, 0)
    },
    {dependencies: [layers], scope: rootRef},
  )

  /* ---- description swap: old lines exit up, new lines rise in ---- */
  useGSAP(
    () => {
      const incoming = descs[descs.length - 1]
      if (incoming.id === shownDesc.current) return
      shownDesc.current = incoming.id
      descs.slice(0, -1).forEach((old) => {
        const el = descRefs.current.get(old.id)
        if (!el) return
        // reuse the live split if still mid-animation, otherwise split fresh
        const split = splits.current.get(old.id) ?? SplitText.create(el, {type: 'lines', mask: 'lines'})
        splits.current.set(old.id, split)
        gsap.killTweensOf(split.lines)
        gsap.to(split.lines, {
          yPercent: -110,
          duration: 0.2,
          ease: 'none',
          onComplete: () => {
            splits.current.delete(old.id)
            setDescs((ds) => ds.filter((d) => d.id !== old.id))
          },
        })
      })

      const split = SplitText.create(descRefs.current.get(incoming.id)!, {type: 'lines', mask: 'lines'})
      splits.current.set(incoming.id, split)
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.1,
        onComplete: () => {
          // unwrap once settled so the text reflows on resize
          split.revert()
          splits.current.delete(incoming.id)
        },
      })
    },
    {dependencies: [descs], scope: rootRef},
  )

  const activate = useCallback(
    (index: number) => {
      if (index === activeRef.current) return
      activeRef.current = index
      setActive(index)
      const id = nextId.current++
      setLayers((ls) => [...ls, {id, item: items[index]}])
      setDescs((ds) => [...ds, {id, text: items[index].desc}])
      moveStrip(index)

      // the arrow leaves top-right and comes back from bottom-left
      gsap.killTweensOf(arrowRef.current)
      gsap
        .timeline({defaults: {ease: 'none'}})
        .to(arrowRef.current, {x: 46, y: -46, duration: 0.12})
        .set(arrowRef.current, {x: -46, y: 46})
        .to(arrowRef.current, {x: 0, y: 0, duration: 0.16})
    },
    [items, moveStrip],
  )

  // Activate the row under the pointer — also when the page scrolls under a
  // still cursor, which doesn't update :hover.
  useEffect(() => {
    const root = rootRef.current!
    let x = -1
    let y = -1
    const update = () => {
      const index = x < 0 ? -1 : itemRefs.current.findIndex((el) => {
        const r = el?.getBoundingClientRect()
        return r && x >= r.left && x < r.right && y >= r.top && y < r.bottom
      })
      setHovered(index < 0 ? null : index)
      if (index >= 0) activate(index)
    }
    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      update()
    }
    const onLeave = () => {
      x = -1
      update()
    }
    root.addEventListener('pointermove', onMove, {passive: true})
    root.addEventListener('pointerleave', onLeave)
    document.addEventListener('scroll', update, {passive: true, capture: true})
    return () => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('scroll', update, {capture: true})
    }
  }, [activate])

  const current = items[active]

  return (
    <div
      ref={rootRef}
      className={`@container h-full w-full overflow-hidden text-(--fg) antialiased select-none ${className}`}
      style={{background, '--bg': background, '--fg': foreground, '--accent': accent} as CSSProperties}
    >
      <section className="grid h-full grid-rows-[minmax(0,1fr)_auto] gap-6 p-5 @3xl:grid-cols-[1fr_1.08fr] @3xl:grid-rows-1 @3xl:gap-[clamp(24px,4cqw,56px)] @3xl:p-[clamp(24px,4cqw,64px)]">
        {/* ---- photo ---- */}
        <figure className="relative m-0 min-h-0 overflow-hidden">
          {layers.map((layer) => (
            <div key={layer.id} ref={setInMap(layerRefs, layer.id)} className="absolute inset-0 overflow-hidden will-change-[clip-path]">
              <img ref={setInMap(imgRefs, layer.id)} src={layer.item.image} alt={layer.item.alt} className="block h-full w-full object-cover" />
            </div>
          ))}
        </figure>

        {/* ---- list + footer ---- */}
        <div className="flex flex-col justify-between">
          {/* isolate keeps the strip's difference blend inside the list */}
          <nav ref={listRef} aria-label={eyebrow} className="relative isolate flex flex-col">
            <span ref={eyebrowRef} className="mb-6 flex items-center gap-4 font-sans text-sm font-medium text-(--fg)/60">
              <span aria-hidden className="h-px w-10 bg-(--accent)" />
              {eyebrow}
            </span>
            {/* the strip sits under the rows: it is the active row's background */}
            <span ref={stripRef} aria-hidden className="pointer-events-none absolute top-0 left-0 w-full bg-(--fg) will-change-transform" />
            {items.map((item, i) => {
              const isActive = i === active
              return (
                <a
                  key={item.name}
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    activate(i)
                  }}
                  className={`relative flex items-baseline gap-[clamp(14px,2cqw,28px)] border-t border-(--fg)/15 px-0 pt-2.5 pb-3 font-sans text-[clamp(24px,3cqw,38px)] leading-[1.1] font-medium tracking-[-0.015em] transition-[color,padding-left] duration-300 last-of-type:border-b hover:pl-[18px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--accent) ${
                    isActive ? 'text-(--bg)' : i === hovered ? 'pl-[18px] text-(--fg)' : 'text-(--fg)/55 hover:text-(--fg)'
                  }`}
                >
                  <span className={`flex-none font-sans text-xs font-medium tabular-nums tracking-[-0.02em] transition-colors duration-300 ${isActive ? 'text-(--accent)' : 'text-(--fg)/60'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.name}
                </a>
              )
            })}
          </nav>

          <div className="mt-6 flex items-end justify-between gap-8 @3xl:mt-12">
            {/* fixed height, so descriptions coming and going never move the layout */}
            <div className="relative h-24 flex-1 @3xl:h-[clamp(104px,12cqw,140px)]">
              {descs.map((d) => (
                <p
                  key={d.id}
                  ref={setInMap(descRefs, d.id)}
                  className="absolute bottom-0 left-0 m-0 w-full max-w-[480px] text-base leading-relaxed text-(--fg)/75 @3xl:text-lg"
                >
                  {d.text}
                </p>
              ))}
            </div>
            <a
              ref={ctaRef}
              href={current.href}
              aria-label={`View ${current.name}`}
              className="relative grid size-12 flex-none place-items-center overflow-hidden border border-(--fg)/20 transition-[background,border-color,color] duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-(--fg) focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-(--accent) @3xl:size-16"
            >
              <svg
                ref={arrowRef}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="size-4 @3xl:size-6"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
