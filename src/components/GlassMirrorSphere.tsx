import {useEffect, useRef, type ReactNode} from 'react'
import * as THREE from 'three'

export type GlassMirrorSphereProps = {
  /** sphere diameter as a share of the box's shorter side */
  size?: number
  /** mirror tiles along each edge of the cube the sphere is built from (rebuilds) */
  density?: number
  /** gap between tiles, 0–0.6 */
  gap?: number
  /** radius of the invisible ball the cursor pushes through the tiles with */
  pushRadius?: number
  /** how hard that ball knocks the tiles out */
  pushForce?: number
  /** how fast the tiles pull back to their place */
  stiffness?: number
  /** idle turn of the sphere, degrees per second */
  spin?: number
  /** press and hold scatters every tile; release gathers them */
  holdToScatter?: boolean
  /** colour of the tiles' reflections' dark bands */
  reflectionText?: string
  /** canvas background; 'transparent' lets the page show through */
  background?: string
  children?: ReactNode
  className?: string
}

const TILE_DEPTH = 0.07
const THICK = 0.02 // extra radius for the tile layer over the glass

// ---------- the environment the mirrors reflect: bold text bands, like a studio wall ----------
function makeEnvironment(renderer: THREE.WebGLRenderer, text: string) {
  const c = document.createElement('canvas')
  c.width = 2048
  c.height = 1024
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#f3f3f5'
  ctx.fillRect(0, 0, c.width, c.height)
  // a darker floor and ceiling so the tiles have contrast top and bottom
  const g = ctx.createLinearGradient(0, 0, 0, c.height)
  g.addColorStop(0, 'rgba(0,0,0,0.9)')
  g.addColorStop(0.18, 'rgba(0,0,0,0)')
  g.addColorStop(0.82, 'rgba(0,0,0,0)')
  g.addColorStop(1, 'rgba(0,0,0,0.95)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, c.width, c.height)
  ctx.fillStyle = '#0b0b0d'
  ctx.font = '900 300px Impact, "Arial Black", sans-serif'
  ctx.textBaseline = 'middle'
  const row = (y: number, offset: number) => {
    let x = -offset
    const w = ctx.measureText(text + '  ').width
    if (w < 1) return
    while (x < c.width) {
      ctx.fillText(text, x, y)
      x += w
    }
  }
  row(c.height * 0.36, 180)
  row(c.height * 0.64, 700)
  const tex = new THREE.CanvasTexture(c)
  tex.mapping = THREE.EquirectangularReflectionMapping
  tex.colorSpace = THREE.SRGBColorSpace
  const pmrem = new THREE.PMREMGenerator(renderer)
  const env = pmrem.fromEquirectangular(tex).texture
  tex.dispose()
  pmrem.dispose()
  return env
}

// ---------- one rounded chrome tile ----------
function makeTile(half: number) {
  const r = half * 0.3
  const s = new THREE.Shape()
  s.moveTo(-half + r, -half)
  s.lineTo(half - r, -half)
  s.quadraticCurveTo(half, -half, half, -half + r)
  s.lineTo(half, half - r)
  s.quadraticCurveTo(half, half, half - r, half)
  s.lineTo(-half + r, half)
  s.quadraticCurveTo(-half, half, -half, half - r)
  s.lineTo(-half, -half + r)
  s.quadraticCurveTo(-half, -half, -half + r, -half)
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: TILE_DEPTH,
    bevelEnabled: true,
    bevelSize: half * 0.12,
    bevelThickness: half * 0.1,
    bevelSegments: 3,
    curveSegments: 6,
  })
  geo.translate(0, 0, -TILE_DEPTH / 2)
  return geo
}

// Tile homes: a cube with density² points per face, pushed out onto the
// sphere (tan-spaced so the lattice stays even), like a disco ball.
function makeHomes(radius: number, density: number) {
  const homes: THREE.Vector3[] = []
  const axes = [
    [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)],
    [new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, -1)],
    [new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0)],
    [new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(-1, 0, 0)],
    [new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 1, 0), new THREE.Vector3(-1, 0, 0)],
    [new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 1, 0), new THREE.Vector3(1, 0, 0)],
  ]
  for (const [n, u, v] of axes)
    for (let i = 0; i < density; i++)
      for (let j = 0; j < density; j++) {
        const a = Math.tan((((i + 0.5) / density) * 2 - 1) * (Math.PI / 4))
        const b = Math.tan((((j + 0.5) / density) * 2 - 1) * (Math.PI / 4))
        homes.push(n.clone().addScaledVector(u, a).addScaledVector(v, b).normalize().multiplyScalar(radius))
      }
  return homes
}

// A glass sphere tiled with chrome mirrors. The
// tiles sit on springs: the cursor drives an invisible ball through them that
// knocks the ones it touches out of the lattice (they tumble and settle back),
// and pressing anywhere scatters them all until you let go. three.js, one
// instanced draw for the tiles, no physics library. Pauses off screen; reduced
// motion keeps the tiles still but the cursor still works.
export default function GlassMirrorSphere({
  size = 0.78,
  density = 7,
  gap = 0.3,
  pushRadius = 0.5,
  pushForce = 14,
  stiffness = 28,
  spin = 4,
  holdToScatter = true,
  reflectionText = 'MADE FOR AWARD',
  background = '#eef1f8',
  children,
  className = '',
}: GlassMirrorSphereProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const live = useRef({size, gap, pushRadius, pushForce, stiffness, spin, holdToScatter, background})
  useEffect(() => {
    live.current = {size, gap, pushRadius, pushForce, stiffness, spin, holdToScatter, background}
  }, [size, gap, pushRadius, pushForce, stiffness, spin, holdToScatter, background])

  useEffect(() => {
    const root = rootRef.current!
    const canvas = canvasRef.current!
    const transparent = live.current.background === 'transparent'
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: transparent, powerPreference: 'high-performance'})
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05

    const scene = new THREE.Scene()
    scene.environment = makeEnvironment(renderer, reflectionText)
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0, 10)
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8899bb, 0.9))
    const key = new THREE.DirectionalLight(0xffffff, 1.4)
    key.position.set(3, 5, 6)
    scene.add(key)

    const R = 2 // sphere radius in world units; `size` scales the camera, not the scene
    const group = new THREE.Group()
    scene.add(group)

    const glass = new THREE.Mesh(
      new THREE.SphereGeometry(R, 96, 64),
      new THREE.MeshPhysicalMaterial({
        transmission: 1,
        thickness: R * 0.7,
        ior: 1.45,
        roughness: 0.03,
        metalness: 0,
        clearcoat: 1,
        envMapIntensity: 1.2,
        color: 0xffffff,
      }),
    )
    group.add(glass)

    // ---- tiles ----
    const homes = makeHomes(R + THICK + TILE_DEPTH / 2, density)
    const n = homes.length
    const spacing = (R * (Math.PI / 2)) / density
    const half = (spacing / 2) * (1 - live.current.gap)
    const tileGeo = makeTile(half)
    const tileMat = new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.06, envMapIntensity: 1.4})
    const tiles = new THREE.InstancedMesh(tileGeo, tileMat, n)
    tiles.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    group.add(tiles)

    const homeQ = homes.map((h) => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), h.clone().normalize()))
    const pos = homes.map((h) => h.clone())
    const vel = homes.map(() => new THREE.Vector3())
    const quat = homeQ.map((q) => q.clone())
    const spinAxis = homes.map(() => new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize())
    const spinSpeed = new Float32Array(n)
    const scatterBase = homes.map((h) => {
      const dir = h.clone().normalize().addScaledVector(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5), 0.9).normalize()
      return dir.multiplyScalar(R * (1.7 + Math.random() * 1.3))
    })
    const scatterTo = homes.map(() => new THREE.Vector3())
    const tileReach = half * 1.2
    // scattered tiles are pulled inside the visible frame so the container never cuts them
    const fitScatter = () => {
      const hv = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)
      const xMax = hv * camera.aspect * 0.8 - tileReach
      const yMax = hv * 0.8 - tileReach
      const zMax = 1
      scatterBase.forEach((b, i) => {
        const k = Math.max(0, Math.min(1, xMax / Math.abs(b.x), yMax / Math.abs(b.y), zMax / Math.abs(b.z)))
        scatterTo[i].copy(b).multiplyScalar(k)
      })
    }

    // ---- pointer: a ball under the cursor, on the sphere's surface ----
    const ray = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    const hitSphere = new THREE.Sphere(new THREE.Vector3(), R + THICK + TILE_DEPTH)
    const hit = new THREE.Vector3()
    let pointerOn = false
    let holding = false
    let hitLocal: THREE.Vector3 | null = null
    const onMove = (e: PointerEvent) => {
      const b = root.getBoundingClientRect()
      ndc.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1)
      pointerOn = true
      wake()
    }
    const onLeave = () => {
      pointerOn = false
      hitLocal = null
    }
    const onDown = (e: PointerEvent) => {
      if (!live.current.holdToScatter || (e.pointerType === 'mouse' && e.button !== 0)) return
      holding = true
      onMove(e)
    }
    const onUp = () => {
      holding = false
      wake()
    }
    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)
    root.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    // ---- simulation ----
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const m4 = new THREE.Matrix4()
    const one = new THREE.Vector3(1, 1, 1)
    const d = new THREE.Vector3()
    const tmpQ = new THREE.Quaternion()
    let settled = false

    const step = (dt: number) => {
      const o = live.current
      if (!still) group.rotation.y += THREE.MathUtils.degToRad(o.spin) * dt

      // where the cursor's ball is, in the group's own space
      if (pointerOn) {
        ray.setFromCamera(ndc, camera)
        hitLocal = ray.ray.intersectSphere(hitSphere, hit) ? group.worldToLocal(hit.clone()) : null
      }

      const k = o.stiffness
      const damp = Math.exp(-6.5 * dt)
      const pr = o.pushRadius
      let moving = false
      for (let i = 0; i < n; i++) {
        const p = pos[i]
        const v = vel[i]
        const target = holding ? scatterTo[i] : homes[i]
        // spring home (or out to the scatter point), heavily damped
        d.subVectors(target, p)
        v.addScaledVector(d, k * dt)
        if (holding) v.addScaledVector(d.normalize(), 6 * dt) // keep drifting outward while held
        v.multiplyScalar(damp)
        // the cursor's ball shoves tiles it overlaps, and sets them tumbling
        if (hitLocal && !holding) {
          d.subVectors(p, hitLocal)
          const dist = d.length()
          const reach = pr + tileReach
          if (dist < reach && dist > 1e-4) {
            const overlap = (reach - dist) / reach
            v.addScaledVector(d.divideScalar(dist), overlap * o.pushForce * dt * 8)
            v.addScaledVector(homes[i].clone().normalize(), overlap * o.pushForce * dt * 4)
            spinSpeed[i] = Math.min(14, spinSpeed[i] + overlap * 40 * dt)
          }
        }
        p.addScaledVector(v, dt)
        // rotation: ease back to the lattice, plus whatever tumble it was given
        quat[i].slerp(homeQ[i], 1 - Math.exp(-(holding ? 1.5 : 7) * dt))
        if (spinSpeed[i] > 1e-3) {
          tmpQ.setFromAxisAngle(spinAxis[i], spinSpeed[i] * dt)
          quat[i].premultiply(tmpQ)
          spinSpeed[i] *= Math.exp(-2.2 * dt)
        }
        if (v.lengthSq() > 1e-6 || spinSpeed[i] > 1e-3 || p.distanceToSquared(target) > 1e-6) moving = true
        m4.compose(p, quat[i], one)
        tiles.setMatrixAt(i, m4)
      }
      tiles.instanceMatrix.needsUpdate = true
      settled = !moving && !holding
    }

    const draw = () => {
      renderer.render(scene, camera)
    }

    let raf = 0
    let last = 0
    let visible = true
    const frame = (now: number) => {
      raf = 0
      if (!visible || document.hidden) return
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60
      last = now
      step(dt)
      draw()
      // keep going while anything moves or the sphere turns
      if (!settled || pointerOn || (!still && live.current.spin !== 0)) raf = requestAnimationFrame(frame)
    }
    const wake = () => {
      if (!raf && visible && !document.hidden) {
        last = 0
        raf = requestAnimationFrame(frame)
      }
    }

    const ro = new ResizeObserver(() => {
      const w = Math.max(1, root.clientWidth)
      const h = Math.max(1, root.clientHeight)
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      // frame the sphere at `size` of the shorter side
      const fovY = THREE.MathUtils.degToRad(camera.fov)
      const half = w < h ? Math.tan(fovY / 2) * camera.aspect : Math.tan(fovY / 2)
      camera.position.z = (R + THICK + TILE_DEPTH) / (live.current.size * half)
      camera.updateProjectionMatrix()
      fitScatter()
      wake()
    })
    ro.observe(root)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      wake()
    })
    io.observe(root)
    document.addEventListener('visibilitychange', wake)
    // settle the lattice before the first paint
    for (let i = 0; i < 8; i++) step(1 / 60)
    wake()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', wake)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      glass.geometry.dispose()
      glass.material.dispose()
      tileGeo.dispose()
      tileMat.dispose()
      tiles.dispose()
      scene.environment?.dispose()
      renderer.dispose()
    }
    // tiles and the environment are built once; everything else is read live
  }, [density, gap, reflectionText])

  return (
    <div
      ref={rootRef}
      className={`relative h-full w-full touch-none overflow-hidden select-none ${className}`}
      style={{background: background === 'transparent' ? undefined : background}}
    >
      {children != null && <div className="absolute inset-0">{children}</div>}
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 block h-full w-full" />
    </div>
  )
}
