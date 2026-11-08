import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import usePageMeta from "@/hooks/usePageMeta";
import { contactDisplay, site } from "@/data/site";
import { services } from "@/data/services";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  usePageMeta({
    title: "Contact",
    description:
      "Discuss a marble or tile contracting project with KC Prajapati India, led by Kailash and Manish Prajapati in Chhattisgarh.",
    image: "/images/kc/marble-living-room.webp",
  });

  const update =
    (field: keyof typeof initialForm) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <Header />
      <main id="main-content" className="min-h-screen bg-porcelain">
        <PageHero
          label="Contact"
          title={
            <>
              Let&rsquo;s discuss
              <br />
              your{" "}
              <span className="accent-word">
                project.
              </span>
            </>
          }
          description="Tell us about the space, the material, and where you are in the process. A clear conversation at the start makes for a better surface at the end."
          image="/images/kc/marble-living-room.webp"
          imageAlt="Living room with refined marble flooring and contemporary furniture"
          meta={["Chhattisgarh, India", "By appointment", "Founder-led practice"]}
        />

        <section className="bg-porcelain py-16 text-ink md:py-24">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <Reveal>
                  <SectionLabel className="text-ink/50">
                    Project Enquiry
                  </SectionLabel>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-7 max-w-xl font-sans text-3xl leading-[1.04] md:mt-9 md:text-5xl lg:text-6xl">
                    Start with a few
                    <br />
                    <span className="accent-word">details.</span>
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/60">
                    Share as much or as little as you know. If you are still at
                    the planning stage, that is a good place to begin.
                  </p>
                  <p className="mt-3 max-w-xl border-l border-gold/60 pl-4 text-xs leading-relaxed text-ink/40">
                    Form preview — this site does not transmit enquiries yet.
                    Verified phone and email details will be published before
                    launch.
                  </p>
                </Reveal>

                <Reveal delay={0.14}>
                  <div className="mt-10 border border-ink/10 bg-bone/50 p-5 md:p-8">
                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex min-h-[320px] flex-col items-start justify-center"
                        >
                          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold">
                            <Check className="h-5 w-5" />
                          </span>
                          <h3 className="mt-6 font-sans text-4xl">
                            Thank you.
                          </h3>
                          <p className="mt-3 max-w-md text-base leading-relaxed text-ink/60">
                            Your details are complete, but this preview form does
                            not send data. Once verified contact details are
                            published, the enquiry route will be connected here.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setSubmitted(false);
                              setForm(initialForm);
                            }}
                            className="mt-7 border-b border-ink/30 pb-1.5 text-xs font-medium transition-colors hover:border-ink"
                          >
                            Start Again
                          </button>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          onSubmit={handleSubmit}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-7"
                        >
                          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                            <label className="block">
                              <span className="text-xs text-ink/45">
                                Your Name *
                              </span>
                              <input
                                type="text"
                                required
                                value={form.name}
                                onChange={update("name")}
                                placeholder="Full name"
                                className="mt-2 w-full border-b border-ink/20 bg-transparent py-2.5 text-base text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ink"
                              />
                            </label>

                            <label className="block">
                              <span className="text-xs text-ink/45">
                                Email *
                              </span>
                              <input
                                type="email"
                                required
                                value={form.email}
                                onChange={update("email")}
                                placeholder="you@example.com"
                                className="mt-2 w-full border-b border-ink/20 bg-transparent py-2.5 text-base text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ink"
                              />
                            </label>

                            <label className="block">
                              <span className="text-xs text-ink/45">
                                Phone
                              </span>
                              <input
                                type="tel"
                                value={form.phone}
                                onChange={update("phone")}
                                placeholder="Optional"
                                className="mt-2 w-full border-b border-ink/20 bg-transparent py-2.5 text-base text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ink"
                              />
                            </label>

                            <label className="block">
                              <span className="text-xs text-ink/45">
                                Project Location
                              </span>
                              <input
                                type="text"
                                value={form.location}
                                onChange={update("location")}
                                placeholder="City or area"
                                className="mt-2 w-full border-b border-ink/20 bg-transparent py-2.5 text-base text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ink"
                              />
                            </label>
                          </div>

                          <label className="block">
                            <span className="text-xs text-ink/45">
                              Type of Work
                            </span>
                            <select
                              value={form.projectType}
                              onChange={update("projectType")}
                              className="mt-2 w-full appearance-none border-b border-ink/20 bg-transparent py-2.5 text-base text-ink outline-none transition-colors focus:border-ink"
                            >
                              <option value="">Select a service</option>
                              {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                  {service.title}
                                </option>
                              ))}
                              <option value="other">Other / Not sure</option>
                            </select>
                          </label>

                          <label className="block">
                            <span className="text-xs text-ink/45">
                              About the Project
                            </span>
                            <textarea
                              rows={4}
                              value={form.message}
                              onChange={update("message")}
                              placeholder="The space, the material, the stage you are at…"
                              className="mt-2 w-full resize-none border-b border-ink/20 bg-transparent py-2.5 text-base leading-relaxed text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ink"
                            />
                          </label>

                          <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
                            <p className="max-w-xs text-xs leading-relaxed text-ink/35">
                              By submitting, you confirm the details above are
                              yours to share.
                            </p>
                            <button
                              type="submit"
                              className="group inline-flex items-center justify-center gap-3 border border-ink bg-ink px-7 py-3.5 text-xs font-medium text-porcelain transition-colors duration-500 hover:bg-transparent hover:text-ink"
                            >
                              Prepare Enquiry
                              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                            </button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-4 lg:col-start-9">
                <Reveal delay={0.1}>
                  <div className="border-t border-ink/15 pt-6">
                    <h3 className="text-xs text-ink/45">
                      Contact
                    </h3>

                    <dl className="mt-6 space-y-5 text-base">
                      <div>
                        <dt className="text-xs text-ink/35">
                          Based In
                        </dt>
                        <dd className="mt-1.5 leading-relaxed text-ink/70">
                          {contactDisplay.address}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-ink/35">
                          Phone
                        </dt>
                        <dd className="mt-1.5 leading-relaxed text-ink/70">
                          {contactDisplay.phone}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-ink/35">
                          Email
                        </dt>
                        <dd className="mt-1.5 leading-relaxed text-ink/70">
                          {contactDisplay.email}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-ink/35">
                          Hours
                        </dt>
                        <dd className="mt-1.5 leading-relaxed text-ink/70">
                          {site.contact.hours}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-8 border-t border-ink/10 pt-6">
                      <h3 className="text-xs text-ink/45">
                        Leadership
                      </h3>
                      <p className="mt-4 leading-relaxed text-ink/70">
                        Kailash Prajapati
                        <span className="text-ink/35"> · Founder</span>
                      </p>
                      <p className="mt-1 leading-relaxed text-ink/70">
                        Manish Prajapati
                        <span className="text-ink/35"> · Co-Founder</span>
                      </p>
                    </div>

                    <p className="mt-8 text-xs leading-relaxed text-ink/35">
                      Phone, email, and social profiles will be published here
                      once verified.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.16}>
                  <div className="relative mt-10 aspect-[4/5] w-full overflow-hidden bg-stone">
                    <ParallaxImage
                      src="/images/kc/marble-foyer.webp"
                      alt="Polished marble floor in a light-filled interior"
                      speed={0.12}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                    <p className="absolute inset-x-0 bottom-0 p-5 font-accent text-4xl leading-none text-porcelain">
                      Precision, from the first cut.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
