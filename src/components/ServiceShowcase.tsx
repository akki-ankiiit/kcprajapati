import { Fragment, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import RoyalFrame from "@/components/RoyalFrame";
import { services } from "@/data/services";
import { cn } from "@/utils/cn";

type ServiceShowcaseProps = {
  className?: string;
  showDetails?: boolean;
  framed?: boolean;
};

export default function ServiceShowcase({
  className,
  showDetails = false,
  framed = false,
}: ServiceShowcaseProps) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = services[active];
  const Frame = framed ? RoyalFrame : Fragment;

  return (
    <div className={className}>
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="border-t border-ink/15">
            {services.map((service, index) => {
              const isActive = active === index;

              return (
                <button
                  key={service.id}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                  className="group block w-full border-b border-ink/15 py-6 text-left md:py-8"
                >
                  <div className="flex items-start gap-5">
                    <span
                      className={cn(
                        "mt-2 text-xs transition-colors duration-500",
                        isActive ? "text-gold" : "text-ink/30",
                      )}
                    >
                      {service.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3
                          className={cn(
                            "font-sans text-3xl leading-tight transition-colors duration-500 xl:text-4xl",
                            isActive
                              ? "text-ink"
                              : "text-ink/35 group-hover:text-ink/65",
                          )}
                        >
                          {service.title}
                        </h3>
                        <ArrowUpRight
                          className={cn(
                            "h-4 w-4 shrink-0 transition-all duration-500",
                            isActive
                              ? "translate-x-0 translate-y-0 text-ink/60"
                              : "-translate-x-1 translate-y-1 text-ink/20",
                          )}
                        />
                      </div>

                      <div
                        className={cn(
                          "grid transition-all duration-500 ease-out",
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-md pt-3 text-base leading-relaxed text-ink/60">
                            {service.short}
                          </p>
                        </div>
                      </div>

                      {showDetails && isActive && (
                        <ul className="mt-4 grid max-w-md grid-cols-1 gap-2 text-sm leading-relaxed text-ink/55 sm:grid-cols-2">
                          {service.details.map((detail) => (
                            <li key={detail} className="flex gap-2">
                              <span className="mt-[7px] h-px w-3 shrink-0 bg-gold/70" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="sticky top-28">
            <Frame>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-bone">
              <AnimatePresence initial={false}>
                <motion.img
                  key={current.image}
                  src={current.image}
                  alt={current.imageAlt}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                <div>
                  <p className="text-xs text-porcelain/60">
                    {current.number} / Expertise
                  </p>
                  <p className="mt-2 font-sans text-3xl leading-tight text-porcelain md:text-4xl">
                    {current.title}
                  </p>
                </div>
              </div>
            </div>
            </Frame>
          </div>
        </div>
      </div>

      <div className="space-y-8 lg:hidden">
        {services.map((service) => (
          <article key={service.id} className="border-t border-ink/15 pt-6">
            <Frame>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              </div>
            </Frame>

            <div className="mt-5 flex items-start gap-4">
              <span className="mt-1.5 text-xs text-gold">
                {service.number}
              </span>
              <div>
                <h3 className="font-sans text-3xl leading-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink/60">
                  {service.short}
                </p>

                {showDetails && (
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/55">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span className="mt-[7px] h-px w-3 shrink-0 bg-gold/70" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
