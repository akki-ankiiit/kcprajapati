import FounderPortrait from "@/components/FounderPortrait";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { cn } from "@/utils/cn";

type FoundersProps = {
  variant?: "summary" | "full";
  className?: string;
  framed?: boolean;
};

export default function Founders({
  variant = "summary",
  className,
  framed = false,
}: FoundersProps) {
  if (variant === "full") {
    return (
      <div className={cn("space-y-20 md:space-y-28", className)}>
        {site.founders.map((founder, index) => (
          <Reveal key={founder.id}>
            <article className="grid grid-cols-1 items-start gap-10 border-t border-ink/10 pt-10 md:grid-cols-12 md:gap-8 md:pt-14">
              <div
                className={cn(
                  "md:col-span-5",
                  index % 2 === 1 && "md:order-2 md:col-start-8",
                )}
              >
                <FounderPortrait founder={founder} index={index} framed={framed} />
              </div>

              <div
                className={cn(
                  "md:col-span-6",
                  index % 2 === 1 ? "md:col-start-1 md:order-1" : "md:col-start-7",
                )}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs text-ink/35">
                    Founder 0{index + 1}
                  </span>
                  <span className="text-xs text-ink/40">
                    {founder.role}
                  </span>
                </div>

                <h3 className="mt-5 font-sans text-3xl leading-none md:text-5xl">
                  {founder.name}
                </h3>
                <p className="mt-3 text-sm text-gold">
                  {founder.title}
                </p>

                <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/70 md:text-base">
                  {founder.bio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <blockquote className="mt-8 border-l border-gold/50 pl-5 md:pl-6">
                  <p className="font-sans text-2xl leading-snug text-ink/80 md:text-3xl">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </blockquote>

                <p className="mt-6 font-accent text-4xl text-ink/70">
                  {founder.firstName}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 xl:gap-14",
        className,
      )}
    >
      {site.founders.map((founder, index) => (
        <Reveal key={founder.id} delay={index * 0.08}>
          <article className="group">
            <FounderPortrait founder={founder} index={index} framed={framed} />

            <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-ink/10 pb-5">
              <div>
                <h3 className="font-sans text-3xl leading-tight md:text-4xl">
                  {founder.name}
                </h3>
                <p className="mt-2 text-xs text-gold">
                  {founder.role} · {founder.title}
                </p>
              </div>
              <span className="text-xs text-ink/30">
                0{index + 1}
              </span>
            </div>

            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/65">
              {founder.summary}
            </p>

            <blockquote className="mt-6 max-w-md">
              <p className="font-sans text-xl leading-snug text-ink/70">
                &ldquo;{founder.quote}&rdquo;
              </p>
            </blockquote>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
