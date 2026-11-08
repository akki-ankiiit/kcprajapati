import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import RoyalFrame from "@/components/RoyalFrame";
import { timeline } from "@/data/services";
import { cn } from "@/utils/cn";

type TimelineProps = {
  framed?: boolean;
};

export default function Timeline({ framed = false }: TimelineProps) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = timeline[active];

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink">
            <AnimatePresence initial={false}>
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.imageAlt}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <p className="font-accent text-4xl leading-none text-porcelain">
                  {current.year}
                </p>
                <p className="mt-2 text-xs text-porcelain/60">
                  {current.title}
                </p>
              </div>
              <span className="text-xs text-porcelain/45">
                0{active + 1} / 0{timeline.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="border-t border-porcelain/15">
          {timeline.map((entry, index) => {
            const isActive = active === index;

            return (
              <button
                key={entry.year}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                className={cn(
                  "group block w-full border-b border-porcelain/15 py-7 text-left transition-colors duration-500 md:py-9",
                )}
              >
                <div className="flex items-start gap-5 md:gap-8">
                  <span
                    className={cn(
                      "mt-1 shrink-0 text-xs transition-colors duration-500",
                      isActive ? "text-gold" : "text-porcelain/30",
                    )}
                  >
                    {entry.year}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3
                      className={cn(
                        "font-sans text-3xl leading-tight transition-colors duration-500 md:text-4xl lg:text-4xl",
                        isActive
                          ? "text-porcelain"
                          : "text-porcelain/35 group-hover:text-porcelain/65",
                      )}
                    >
                      {entry.title}
                    </h3>

                    <p
                      className={cn(
                        "mt-3 max-w-lg text-base leading-relaxed transition-colors duration-500",
                        isActive ? "text-porcelain/65" : "text-porcelain/25",
                      )}
                    >
                      {entry.description}
                    </p>

                    <div className="mt-5 lg:hidden">
                      {framed ? (
                        <RoyalFrame>
                          <div className="aspect-[4/3] w-full overflow-hidden bg-ink/40">
                            <img
                              src={entry.image}
                              alt={entry.imageAlt}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </RoyalFrame>
                      ) : (
                        <div className="aspect-[4/3] w-full overflow-hidden bg-ink/40">
                          <img
                            src={entry.image}
                            alt={entry.imageAlt}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
