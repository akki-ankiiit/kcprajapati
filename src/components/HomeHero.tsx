import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ButtonLink from "@/components/ButtonLink";
import { cn } from "@/utils/cn";

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger);
CustomEase.create("heroOut", "0.22,1,0.36,1");

const credentials = [
  { value: "26 Years", label: "Of experience", mobile: true },
  { value: "2000", label: "Established", mobile: true },
  { value: "Marble · Tile · Stone", label: "Specialization", mobile: false },
  { value: "Kailash & Manish Prajapati", label: "Leadership", mobile: false },
];

export default function HomeHero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "heroOut" } })
          .from("[data-hero-media]", { autoAlpha: 0, duration: 1.4, ease: "power1.out" }, 0)
          .from("[data-hero-image]", { scale: 1.08, duration: 2.4 }, 0)
          .from("[data-hero-line]", { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.3)
          .from("[data-hero-fade]", { autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.1 }, 0.9);

        gsap.to("[data-hero-image]", {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to("[data-hero-content]", {
          autoAlpha: 0.2,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom 40%",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-title"
      className="relative isolate flex h-[100svh] min-h-[640px] flex-col overflow-hidden bg-ink text-white"
    >
      <div data-hero-media className="absolute inset-0 -z-10 overflow-hidden">
        <picture className="block h-full w-full">
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet="/images/hero/hero-portrait.webp"
          />
          <img
            data-hero-image
            src="/images/hero/hero-landscape.webp"
            alt="Grand marble staircase with veined stone treads, gold handrails and precisely set dark marble walls"
            width={2400}
            height={1958}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[center_55%] saturate-[0.9] md:object-[center_40%]"
          />
        </picture>
        <div className="absolute inset-0 bg-ink/40 md:bg-ink/30" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-ink/70 to-transparent" />
      </div>

      <div
        data-hero-content
        className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-5 pt-28 text-center md:px-8 md:pt-20 xl:px-18"
      >
        <h1
          id="hero-title"
          className="max-w-[1280px] font-sans text-[clamp(2.4rem,1.1rem+3.2vw,4.75rem)] leading-[1.1] font-normal tracking-[-0.035em] text-balance text-white"
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              Marble and tile work that lasts,
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              built on a{" "}
              <span className="font-accent text-[1.16em] font-normal leading-none">
                done right, every time.
              </span>
            </span>
          </span>
        </h1>

        <p
          data-hero-fade
          className="mx-auto mt-7 max-w-[480px] font-sans text-[15px] leading-[1.6] text-white/80 md:mt-8 md:text-[16px]"
        >
          26 years of experience, precision, and exceptional finishing. Kailash
          and Manish Prajapati bring generations of craftsmanship to premium
          marble and tile installations across Chhattisgarh.
        </p>

        <div data-hero-fade className="mt-9 md:mt-10">
          <ButtonLink to="/portfolio" variant="primary">
            Explore Our Work
          </ButtonLink>
        </div>
      </div>

      <div data-hero-fade className="relative z-10 w-full">
        <dl className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-x-6 gap-y-6 px-5 pb-8 md:grid-cols-4 md:px-8 md:pb-10 xl:px-18">
          {credentials.map((item, index) => (
            <div
              key={item.label}
              className={cn(
                "flex-col-reverse gap-1.5 border-t border-white/25 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-7",
                item.mobile ? "flex" : "hidden md:flex",
                index === 0 && "md:border-l-0 md:pl-0",
              )}
            >
              <dt className="font-sans text-sm font-medium text-white/60">
                {item.label}
              </dt>
              <dd className="font-sans text-[15px] font-medium leading-tight text-white md:text-[16px]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
