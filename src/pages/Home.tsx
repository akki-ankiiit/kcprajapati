import Header from "@/components/Header";
import TextLink from "@/components/TextLink";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ParallaxImage from "@/components/ParallaxImage";
import SplitText from "@/components/SplitText";
import SectionLabel from "@/components/SectionLabel";
import AnimatedNumber from "@/components/AnimatedNumber";
import Founders from "@/components/Founders";
import ServiceShowcase from "@/components/ServiceShowcase";
import Timeline from "@/components/Timeline";
import GalleryGrid from "@/components/GalleryGrid";
import ContactCTA from "@/components/ContactCTA";
import ButtonLink from "@/components/ButtonLink";
import Reveal from "@/components/Reveal";
import GlassMirrorSphere from "@/components/GlassMirrorSphere";
import HomeHero from "@/components/HomeHero";
import PaperFlowHero from "@/components/PaperFlowHero";
import RoyalFrame from "@/components/RoyalFrame";
import usePageMeta from "@/hooks/usePageMeta";
import { featuredStudies } from "@/data/work";
import { site } from "@/data/site";

const marbleInteriors = [
  "/images/kc/marble-foyer.webp",
  "/images/kc/marble-living-room.webp",
  "/images/kc/marble-hallway.webp",
  "/images/kc/marble-showroom.webp",
  "/images/kc/marble-bath-floor.webp",
  "/images/kc/marble-bathroom.webp",
  "/images/kc/marble-arches.webp",
  "/images/kc/curved-marble-hall.webp",
  "/images/kc/marble-stair-lobby.webp",
  "/images/kc/marble-stair-hall.webp",
  "/images/kc/marble-entry-stair.webp",
  "/images/kc/marble-tile-pattern.webp",
];

const experienceStats = [
  { value: 26, label: "Years of Experience" },
  { value: 2000, label: "Working Since" },
  { value: 6, label: "Areas of Expertise", pad: true },
];

const experienceAside = (
  <div className="pointer-events-auto flex max-w-xl flex-col gap-5 md:gap-8">
    <SectionLabel className="text-ink/50">Why KC Prajapati</SectionLabel>
    <h2 className="font-sans text-[clamp(34px,5.6vw,92px)] leading-[0.98] tracking-[-0.03em] text-ink">
      Experience you can
      <br />
      build <span className="accent-word">on.</span>
    </h2>
    <p className="hidden max-w-md text-base leading-relaxed text-ink/65 md:block">
      Every site, every surface and every handover is held to the same standard
      we keep when no one is watching.
    </p>
    <div className="hidden grid-cols-3 gap-6 border-y border-ink/10 py-6 md:grid">
      {experienceStats.map((stat) => (
        <div key={stat.label} className="text-ink">
          <AnimatedNumber value={stat.value} label={stat.label} pad={stat.pad} />
        </div>
      ))}
    </div>
    <ButtonLink to="/about" variant="primary" className="w-fit">
      Our Story
    </ButtonLink>
  </div>
);

export default function Home() {
  usePageMeta({
    title: site.metaTitle,
    description: site.metaDescription,
    image: "/images/kc/marble-foyer.webp",
  });

  return (
    <PageTransition>
      <Header />
      <main id="main-content" className="min-h-screen bg-porcelain">
        <HomeHero />

        {/* ------------------------------------------------------------------ */}
        {/* 02 — Brand introduction                                            */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative overflow-hidden bg-porcelain py-20 text-ink md:py-32">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <Reveal>
                  <RoyalFrame>
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone">
                      <ParallaxImage
                        src="/images/kc/marble-entry-lobby.webp"
                        alt="Contemporary living space with a polished marble plinth, a sculpted timber staircase and soft daylight"
                        speed={0.18}
                      />
                      <div className="absolute inset-0 bg-ink/5" />
                    </div>
                  </RoyalFrame>
                </Reveal>

                <div className="relative z-10 -mt-10 ml-auto mr-4 w-[82%] border border-ink/10 bg-porcelain p-5 md:-mt-14 md:mr-8 md:p-6">
                  <p className="font-accent text-4xl leading-none text-ink md:text-4xl">
                    Since 2000
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-ink/50">
                    26 years of hands-on contracting across Chhattisgarh
                  </p>
                </div>

              </div>

              <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
                <Reveal>
                  <SectionLabel className="text-ink/50">
                    The Practice
                  </SectionLabel>
                </Reveal>

                <div className="mt-7 md:mt-9">
                  <SplitText
                    as="h2"
                    text={"Every floor carries\nthe *whole room.*"}
                    className="font-sans text-3xl leading-[1.02] md:text-5xl lg:text-6xl"
                  />
                  <Reveal delay={0.15}>
                    <p className="mt-3 font-sans text-4xl leading-none md:text-5xl">
                      Everything else in it rests on what we lay.
                    </p>
                  </Reveal>
                </div>

                <Reveal delay={0.1}>
                  <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-ink/65 md:mt-10 md:text-base">
                    <p>
                      A father-and-son marble and tile team in Chhattisgarh,
                      working since 2000.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-10 grid grid-cols-3 gap-4 border-y border-ink/10 py-6 md:mt-12">
                    <div>
                      <p className="font-sans text-3xl leading-none md:text-4xl">
                        26
                      </p>
                      <p className="mt-2 text-xs text-ink/45">
                        Years
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-3xl leading-none md:text-4xl">
                        2000
                      </p>
                      <p className="mt-2 text-xs text-ink/45">
                        Established
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-3xl leading-none md:text-4xl">
                        02
                      </p>
                      <p className="mt-2 text-xs text-ink/45">
                        Generations
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.24}>
                  <ButtonLink to="/about" variant="primary" className="mt-9">
                    Our Story
                  </ButtonLink>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 03 — Founders                                                      */}
        {/* ------------------------------------------------------------------ */}
        <section className="bg-stone py-20 text-ink md:py-32">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
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
                    Kailash Prajapati founded the practice in 2000. Today he
                    works alongside his son Manish, combining decades of site
                    experience with a contemporary approach to planning and
                    delivery.
                  </p>
                  <TextLink to="/about" className="mt-6">
                    Read Their Story
                  </TextLink>
                </Reveal>
              </div>
            </div>

            <Founders className="mt-14 md:mt-20" framed />
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 04 — Expertise                                                     */}
        {/* ------------------------------------------------------------------ */}
        <section className="bg-porcelain py-20 text-ink md:py-32">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="mb-12 grid grid-cols-1 gap-10 md:mb-16 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <Reveal>
                  <SectionLabel className="text-ink/50">
                    Our Expertise
                  </SectionLabel>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-7 font-sans text-3xl leading-[1.02] md:mt-9 md:text-5xl lg:text-6xl">
                    The craft behind
                    <br />
                    the <span className="accent-word">finish.</span>
                  </h2>
                </Reveal>
              </div>

              <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
                <Reveal delay={0.12}>
                  <p className="text-base leading-relaxed text-ink/65 md:text-base">
                    Six disciplines, one standard of execution. From the first
                    setting-out line to the final polish, every stage is handled
                    with the same measure of care.
                  </p>
                  <ButtonLink to="/expertise" variant="primary" className="mt-7">
                    Explore Expertise
                  </ButtonLink>
                </Reveal>
              </div>
            </div>

            <ServiceShowcase framed />
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 05 — Featured work                                                 */}
        {/* ------------------------------------------------------------------ */}
        <section className="bg-ink py-20 text-porcelain md:py-32">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="mb-12 grid grid-cols-1 gap-10 md:mb-16 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <Reveal>
                  <SectionLabel className="text-porcelain/55">
                    Selected Studies
                  </SectionLabel>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-7 font-sans text-3xl leading-[1.02] md:mt-9 md:text-5xl lg:text-6xl">
                    Surfaces that
                    <br />
                    speak{" "}
                    <span className="accent-word">
                      quietly.
                    </span>
                  </h2>
                </Reveal>
              </div>

              <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
                <Reveal delay={0.12}>
                  <p className="text-base leading-relaxed text-porcelain/60 md:text-base">
                    A closer look at the material character, joint discipline,
                    and finishing standards that define our work.
                  </p>
                  <ButtonLink
                    to="/portfolio"
                    variant="glass"
                    className="mt-7"
                  >
                    View All Studies
                  </ButtonLink>
                </Reveal>
              </div>
            </div>

            <GalleryGrid
              studies={featuredStudies.slice(0, 6)}
              theme="dark"
              stagger
              framed
            />
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 06 — Why KC                                                        */}
        {/* ------------------------------------------------------------------ */}
        <PaperFlowHero
          images={marbleInteriors}
          aside={experienceAside}
          background="#f7f7f5"
        />

        {/* ------------------------------------------------------------------ */}
        {/* 07 — Journey                                                       */}
        {/* ------------------------------------------------------------------ */}
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
                    From a first independent commission in 2000 to a
                    father-and-son practice in 2026, the work has changed in
                    scale — never in standard.
                  </p>
                  <ButtonLink to="/about" variant="glass" className="mt-7">
                    Read Our Story
                  </ButtonLink>
                </Reveal>
              </div>
            </div>

            <Timeline framed />
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 08 — Contact                                                       */}
        {/* ------------------------------------------------------------------ */}
        <ContactCTA />

        {/* ------------------------------------------------------------------ */}
        {/* 09 — Glass mirror sphere                                           */}
        {/* ------------------------------------------------------------------ */}
        <section className="bg-porcelain py-20 text-ink md:py-32">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <Reveal>
                  <SectionLabel className="text-ink/50">
                    Reflections
                  </SectionLabel>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-7 font-sans text-3xl leading-[1.02] md:mt-9 md:text-5xl lg:text-6xl">
                    Every surface,
                    <br />
                    <span className="accent-word">
                      seen from every side.
                    </span>
                  </h2>
                </Reveal>
              </div>

              <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
                <Reveal delay={0.12}>
                  <p className="text-base leading-relaxed text-ink/65 md:text-base">
                    A polished floor shows its quality in the light it throws
                    back. This sphere is built the same way: hundreds of small
                    mirrors, each set to its place on a grid. Move across it to
                    knock a few loose, or press and hold to scatter them all —
                    they settle back exactly where they belong, as every joint
                    we set is held true.
                  </p>
                </Reveal>
              </div>
            </div>

            <Reveal delay={0.1}>
              <div className="mt-14 h-[min(80svh,640px)] w-full md:mt-20">
                <GlassMirrorSphere
                  reflectionText="KC PRAJAPATI"
                  background="transparent"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* 10 — Footer */}
      <Footer />
    </PageTransition>
  );
}
