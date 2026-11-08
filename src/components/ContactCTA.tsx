import ParallaxImage from "@/components/ParallaxImage";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import MagneticLink from "@/components/MagneticLink";
import { contactDisplay, site } from "@/data/site";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ButtonLink";

type ContactCTAProps = {
  image?: string;
  imageAlt?: string;
  label?: string;
  title?: React.ReactNode;
  description?: string;
};

export default function ContactCTA({
  image = "/images/kc/marble-staircase.webp",
  imageAlt = "Marble staircase and refined stone surfaces",
  label = "Let's Create Something Lasting",
  title,
  description = "Planning a marble flooring project, premium tile installation, or detailed stonework? Let's discuss how 26 years of experience and a skilled team can bring your requirements to life.",
}: ContactCTAProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-ink py-20 text-porcelain md:min-h-[78vh] md:py-28">
      <div className="absolute inset-0">
        <ParallaxImage src={image} alt={imageAlt} speed={0.18} />
        <div className="absolute inset-0 bg-ink/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 text-center md:px-8 xl:px-18">
        <Reveal>
          <SectionLabel className="text-porcelain/60">{label}</SectionLabel>
        </Reveal>

        <Reveal delay={0.08} className="w-full">
          <h2 className="mx-auto mt-7 max-w-4xl font-sans text-3xl leading-[1.08] md:mt-9 md:text-5xl lg:text-6xl">
            {title ?? (
              <>
                Your Next Project
                <br />
                Deserves the{" "}
                <span className="font-accent pr-6 text-[1.15em] font-normal lowercase text-gold-light">
                  right hands.
                </span>
              </>
            )}
          </h2>
        </Reveal>

        <Reveal delay={0.14} className="w-full">
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-porcelain/65 md:mt-8 md:text-base">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <MagneticLink to="/contact" className="mt-9 inline-block md:mt-11">
            <span className={buttonClass("primary", "group md:px-10 md:text-[15px]")}>
              Discuss Your Project
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </span>
          </MagneticLink>
        </Reveal>

        <Reveal delay={0.26} className="w-full">
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-3 border-t border-porcelain/15 pt-7 text-xs text-porcelain/50 sm:grid-cols-3 md:mt-16">
            <p>Kailash &amp; Manish Prajapati</p>
            <p>{site.location}</p>
            <p>{contactDisplay.phone}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
