import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import ParallaxImage from "@/components/ParallaxImage";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import ContactCTA from "@/components/ContactCTA";
import usePageMeta from "@/hooks/usePageMeta";
import { materials, processSteps, services } from "@/data/services";
import { cn } from "@/utils/cn";

export default function Expertise() {
  usePageMeta({
    title: "Expertise",
    description:
      "Marble flooring, tile installation, marble cutting and fitting, polishing, large-format tiles, and premium stonework by KC Prajapati India in Chhattisgarh.",
    image: "/images/kc/marble-showroom.webp",
  });

  return (
    <PageTransition>
      <Header />
      <main id="main-content" className="min-h-screen bg-porcelain">
        <PageHero
          label="Expertise"
          title={
            <>
              Materials handled
              <br />
              with{" "}
              <span className="accent-word">
                intent.
              </span>
            </>
          }
          description="Six disciplines, one standard of execution. From the first setting-out line to the final polish, every surface is treated as a piece of work that has to last."
          image="/images/kc/marble-showroom.webp"
          imageAlt="Elegant marble wall panels and detailed stonework in a showroom setting"
          meta={["06 Disciplines", "26 Years of Experience", "Chhattisgarh, India"]}
        />

        <section className="bg-porcelain py-16 text-ink md:py-24">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <Reveal>
                  <SectionLabel className="text-ink/50">
                    What We Do
                  </SectionLabel>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-7 font-sans text-3xl leading-[1.02] md:mt-9 md:text-5xl lg:text-6xl">
                    The work is in
                    <br />
                    the{" "}
                    <span className="accent-word">
                      detail.
                    </span>
                  </h2>
                </Reveal>
              </div>

              <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
                <Reveal delay={0.12}>
                  <p className="text-base leading-relaxed text-ink/65 md:text-base">
                    Marble and tile are unforgiving materials. A joint that is
                    slightly out, a lip that is slightly high, a polish that is
                    slightly uneven — each one stays visible. Our expertise is
                    the discipline of getting those details right.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-ink/65 md:text-base">
                    We work with interior designers, builders, and homeowners
                    across Chhattisgarh, from single-room installations to
                    complete floor plates.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed services */}
        <section className="bg-porcelain pb-20 text-ink md:pb-28">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="space-y-16 md:space-y-24">
              {services.map((service, index) => {
                const imageOnRight = index % 2 === 1;

                return (
                  <article
                    key={service.id}
                    id={service.id}
                    className="scroll-mt-28 border-t border-ink/15 pt-10 md:pt-14"
                  >
                    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
                      <div
                        className={cn(
                          "lg:col-span-6",
                          imageOnRight
                            ? "lg:order-2 lg:col-start-7"
                            : "lg:col-start-1",
                        )}
                      >
                        <Reveal>
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone">
                            <ParallaxImage
                              src={service.image}
                              alt={service.imageAlt}
                              speed={0.14}
                            />
                          </div>
                        </Reveal>
                      </div>

                      <div
                        className={cn(
                          "lg:col-span-5",
                          imageOnRight
                            ? "lg:order-1 lg:col-start-1"
                            : "lg:col-start-8",
                        )}
                      >
                        <Reveal delay={0.08}>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs text-gold">
                              {service.number} / Expertise
                            </span>
                            <span className="h-px w-8 bg-ink/15" />
                          </div>

                          <h3 className="mt-6 font-sans text-3xl leading-[1.05] md:text-4xl lg:text-5xl">
                            {service.title}
                          </h3>

                          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/65 md:text-base">
                            {service.description}
                          </p>

                          <ul className="mt-7 grid grid-cols-1 gap-2.5 text-sm leading-relaxed text-ink/55 sm:grid-cols-2">
                            {service.details.map((detail) => (
                              <li key={detail} className="flex gap-2.5">
                                <span className="mt-2 h-px w-3 shrink-0 bg-gold/70" />
                                {detail}
                              </li>
                            ))}
                          </ul>

                          <Link
                            to="/contact"
                            className="group mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-1.5 text-xs font-medium transition-colors hover:border-ink"
                          >
                            Discuss This Service
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        </Reveal>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-ink py-20 text-porcelain md:py-32">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <Reveal>
                  <SectionLabel className="text-porcelain/55">
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
                  <p className="text-base leading-relaxed text-porcelain/60 md:text-base">
                    The sequence matters as much as the material. Each stage
                    prepares the next, and none is rushed.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step, index) => (
                <Reveal key={step.id} delay={index * 0.04}>
                  <article className="border-t border-porcelain/15 pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-gold">
                        {String(step.id).padStart(2, "0")}
                      </span>
                      <span className="h-px w-6 bg-porcelain/20" />
                    </div>
                    <h3 className="mt-8 font-sans text-3xl leading-tight md:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-base leading-relaxed text-porcelain/55">
                      {step.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Materials */}
        <section className="bg-bone py-20 text-ink md:py-32">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <Reveal>
                  <SectionLabel className="text-ink/50">
                    Materials
                  </SectionLabel>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-7 font-sans text-3xl leading-[1.02] md:mt-9 md:text-5xl lg:text-6xl">
                    Stone, tile,
                    <br />
                    and{" "}
                    <span className="accent-word">
                      surface.
                    </span>
                  </h2>
                </Reveal>
              </div>

              <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
                <Reveal delay={0.12}>
                  <p className="text-base leading-relaxed text-ink/65 md:text-base">
                    We work with the materials our clients and designers choose,
                    and we bring a practical understanding of how each one
                    behaves on site.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:mt-20 lg:grid-cols-6">
              {materials.map((material, index) => (
                <Reveal key={material.name} delay={index * 0.04}>
                  <article className="group">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone">
                      <img
                        src={material.image}
                        alt={material.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent opacity-40" />
                    </div>
                    <p className="mt-3 text-xs text-ink/55">
                      {material.name}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA
          image="/images/kc/marble-arches.webp"
          imageAlt="Marble arches and corridor with detailed stonework"
          label="Start With a Conversation"
          description="Tell us about the space, the material, and the standard of finish you have in mind. We will help you plan the next step."
        />
      </main>
      <Footer />
    </PageTransition>
  );
}
