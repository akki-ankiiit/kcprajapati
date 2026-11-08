import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ParallaxImage from "@/components/ParallaxImage";
import { cn } from "@/utils/cn";

type PageHeroProps = {
  label: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  meta?: string[];
  size?: "compact" | "tall";
  priority?: boolean;
};

export default function PageHero({
  label,
  title,
  description,
  image,
  imageAlt,
  meta,
  size = "tall",
  priority = true,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative flex w-full flex-col justify-end overflow-hidden bg-ink text-porcelain",
        size === "tall" ? "min-h-[78vh] md:min-h-[86vh]" : "min-h-[62vh] md:min-h-[68vh]",
      )}
    >
      <div className="absolute inset-0 z-0">
        <ParallaxImage src={image} alt={imageAlt} speed={0.32} priority={priority} />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-12 pt-32 md:px-8 md:pb-16 md:pt-40 xl:px-18">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <span className="inline-flex items-center gap-4 text-xs font-medium text-porcelain/60 md:text-sm">
            <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />
            {label}
          </span>

          <h1 className="mt-7 font-sans text-3xl leading-[1.02] text-porcelain md:mt-9 md:text-7xl lg:text-[6vw]">
            {title}
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-porcelain/65 md:mt-9 md:text-base">
            {description}
          </p>
        </motion.div>

        {meta && meta.length > 0 && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-12 grid grid-cols-1 gap-3 border-t border-porcelain/15 pt-6 text-xs text-porcelain/45 sm:grid-cols-3 md:mt-16"
          >
            {meta.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
