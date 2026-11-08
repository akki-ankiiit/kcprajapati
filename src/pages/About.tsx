import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import SplitText from "@/components/SplitText";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Founders from "@/components/Founders";
import Timeline from "@/components/Timeline";
import ContactCTA from "@/components/ContactCTA";
import HoverRevealList, {
  type HoverRevealItem,
} from "@/components/HoverRevealList";
import usePageMeta from "@/hooks/usePageMeta";
import { principles, processSteps } from "@/data/services";
import { site } from "@/data/site";

const principleImages = [
  {
    image: "/images/kc/marble-stair-classic.webp",
    alt: "Classic marble staircase with clean stone edges",
  },
  {
    image: "/images/kc/marble-bath-floor.webp",
    alt: "Polished marble bathroom floor with a smooth, even finish",
  },
  {
    image: "/images/kc/marble-showroom.webp",
    alt: "Elegant marble wall panels in a showroom setting",
  },
  {
    image: "/images/kc/tile-leveling.webp",
    alt: "Close-up of gloved hands using a tile levelling tool",
  },
  {
    image: "/images/kc/tile-spacers.webp",
    alt: "Tiler fitting spacers between stone tiles with precision",
  },
  {
    image: "/images/kc/marble-hallway.webp",
    alt: "Marble hallway with a continuous, carefully laid surface",
  },
];

const principleItems: HoverRevealItem[] = principles.map((principle, index) => ({
  name: principle.title,
  image: principleImages[index].image,
  alt: principleImages[index].alt,
  desc: principle.description,
  href: "/contact",
}));

export default function About() {
  usePageMeta({
    title: "Our Story",
    description:
      "The story of KC Prajapati India — a father-and-son tile and marble contracting practice built in Chhattisgarh over 26 years of hands-on work.",
    image: "/images/kc/marble-stair-hall.webp",
  });

  return (
    <PageTransition>
      <Header />
      <main id="main-content" className="min-h-screen bg-porcelain">
        <PageHero
          label="Our Story"
          title={
            <>
              A family practice,
              <br />
              built on{" "}
              <span className="accent-word">
                precision.
              </span>
            </>
          }
          description="Since 2000, KC Prajapati India has grown from a single pair of hands into a father-and-son contracting practice — shaped by material knowledge, measured execution, and a standard that has not moved."
          image="/images/kc/marble-stair-hall.webp"
          imageAlt="Polished marble staircase and landing in a refined interior"
          meta={["Established 2000", "Chhattisgarh, India", "Kailash & Manish Prajapati"]}
        />

        {/* Story */}
        <section className="bg-porcelain py-20 text-ink md:py-32">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <Reveal>
                  <figure>
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone">
                      <img
                        src="/images/kc/founders-portrait.jpg"
                        alt="Kailash Prajapati seated in a leather armchair and Manish Prajapati standing beside him in a wood-panelled room"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-[center_20%]"
                      />
                    </div>
                    <figcaption className="mt-4 text-xs text-ink/45">
                      Kailash Prajapati and Manish Prajapati · Father and son
                    </figcaption>
                  </figure>
                </Reveal>
              </div>

              <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
                <Reveal>
                  <SectionLabel className="text-ink/50">
                    The Beginning
                  </SectionLabel>
                </Reveal>

                <div className="mt-7 md:mt-9">
                  <SplitText
                    as="h2"
                    text={"It began with\na single *surface.*"}
                    className="font-sans text-3xl leading-[1.02] md:text-5xl lg:text-6xl"
                  />
                </div>

                <Reveal delay={0.1}>
                  <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-ink/65 md:mt-10 md:text-base">
                    <p>
                      KC Prajapati India began in 2000 with Kailash Prajapati and
                      a simple conviction: a surface should be laid so well that
                      it disappears into the life of the room. In the beginning,
                      the work was hands-on and local — one floor, one stair, one
                      careful handover at a time.
                    </p>
                    <p>
                      Over the years, that conviction became a practice. The team
                      grew, the projects grew, and the standards stayed the same.
                      Manish Prajapati joined his father to bring a younger
                      perspective to planning, coordination, and delivery while
                      keeping the craft at the centre.
                    </p>
                    <p>
                      Today, KC Prajapati India works across Chhattisgarh on
                      marble flooring, tile installation, large-format surfaces,
                      detailed stonework, and finishing. The tools have improved.
                      The measure has not.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-ink/10 pt-7">
                    <p className="font-accent text-4xl leading-none text-ink/70">
                      Kailash &amp; Manish
                    </p>
                    <p className="text-xs text-ink/40">
                      Founder &amp; Co-Founder
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="bg-stone py-20 text-ink md:py-32">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="mb-14 grid grid-cols-1 gap-10 md:mb-20 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <Reveal>
                  <SectionLabel className="text-ink/50">
                    The Founders
                  </SectionLabel>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-7 font-sans text-3xl leading-[1.02] md:mt-9 md:text-5xl lg:text-6xl">
                    Two generations.
                    <br />
                    One <span className="accent-word">standard.</span>
                  </h2>
                </Reveal>
              </div>

              <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
                <Reveal delay={0.12}>
                  <p className="text-base leading-relaxed text-ink/65 md:text-base">
                    A father who learned the work by doing it, and a son who grew
                    up alongside it. Together they lead every project with the
                    same commitment to material, method, and finish.
                  </p>
                </Reveal>
              </div>
            </div>

            <Founders variant="full" />

          </div>
        </section>

        {/* Principles */}
        <section className="bg-porcelain py-20 text-ink md:py-32">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <Reveal>
                  <SectionLabel className="text-ink/50">
                    What We Believe
                  </SectionLabel>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-7 font-sans text-3xl leading-[1.02] md:mt-9 md:text-5xl lg:text-6xl">
                    The standard
                    <br />
                    behind the{" "}
                    <span className="accent-word">
                      surface.
                    </span>
                  </h2>
                </Reveal>
              </div>

              <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
                <Reveal delay={0.12}>
                  <p className="text-base leading-relaxed text-ink/65 md:text-base">
                    Good work is rarely the result of one decision. It is the
                    accumulation of many careful ones — made on site, in
                    sequence, with the finished surface in mind.
                  </p>
                </Reveal>
              </div>
            </div>

            <Reveal delay={0.1}>
              <div className="mt-14 h-[880px] md:mt-20 md:h-[720px]">
                <HoverRevealList
                  eyebrow="( What We Believe )"
                  items={principleItems}
                  background="#ffffff"
                  foreground="#1a1a19"
                  accent="#99681b"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-ink py-20 text-porcelain md:py-32">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="mb-12 grid grid-cols-1 gap-10 md:mb-16 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <Reveal>
                  <SectionLabel className="text-porcelain/55">
                    Our Journey
                  </SectionLabel>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-7 font-sans text-3xl leading-[1.02] md:mt-9 md:text-5xl lg:text-6xl">
                    A legacy measured
                    <br />
                    in{" "}
                    <span className="accent-word">
                      surfaces.
                    </span>
                  </h2>
                </Reveal>
              </div>

              <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
                <Reveal delay={0.12}>
                  <p className="text-base leading-relaxed text-porcelain/60 md:text-base">
                    Four moments in a continuing practice — from the first
                    commission to 26 years of craftsmanship.
                  </p>
                </Reveal>
              </div>
            </div>

            <Timeline />
          </div>
        </section>

        {/* Process */}
        <section className="bg-bone py-20 text-ink md:py-32">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <Reveal>
                  <SectionLabel className="text-ink/50">
                    How We Work
                  </SectionLabel>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-7 font-sans text-3xl leading-[1.02] md:mt-9 md:text-5xl lg:text-6xl">
                    A measured
                    <br />
                    <span className="accent-word">
                      process.
                    </span>
                  </h2>
                </Reveal>
              </div>

              <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
                <Reveal delay={0.12}>
                  <p className="text-base leading-relaxed text-ink/65 md:text-base">
                    Every project follows the same discipline: understand the
                    space, resolve the setting-out, and protect the finish from
                    the first cut to the last polish.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step, index) => (
                <Reveal key={step.id} delay={index * 0.04}>
                  <article className="border-t border-ink/15 pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-gold">
                        {String(step.id).padStart(2, "0")}
                      </span>
                      <span className="h-px w-6 bg-ink/15" />
                    </div>
                    <h3 className="mt-8 font-sans text-3xl leading-tight md:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-base leading-relaxed text-ink/55">
                      {step.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className="mt-12 text-xs text-ink/35">
              {site.location} · Working by appointment
            </p>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </PageTransition>
  );
}
