import { Fragment } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import RoyalFrame from "@/components/RoyalFrame";
import type { WorkStudy } from "@/data/work";
import { cn } from "@/utils/cn";

type GalleryCardProps = {
  study: WorkStudy;
  index: number;
  onOpen?: (index: number) => void;
  className?: string;
  priority?: boolean;
  theme?: "light" | "dark";
  framed?: boolean;
};

export default function GalleryCard({
  study,
  index,
  onOpen,
  className,
  priority = false,
  theme = "light",
  framed = false,
}: GalleryCardProps) {
  const reduceMotion = useReducedMotion();
  const Frame = framed ? RoyalFrame : Fragment;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{
        duration: 0.8,
        delay: Math.min(index * 0.04, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("group", className)}
    >
      <Frame>
      <button
        type="button"
        onClick={() => onOpen?.(index)}
        aria-label={`View study: ${study.title}`}
        className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-bone text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <img
          src={study.image}
          alt={study.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-85" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-5">
          <span className="bg-ink/45 px-2.5 py-1.5 text-xs text-porcelain/85 backdrop-blur-sm">
            {study.category}
          </span>
          <span className="text-xs text-porcelain/65">
            Illustrative
          </span>
        </div>

        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center border border-porcelain/35 text-porcelain opacity-0 transition-all duration-500 group-hover:opacity-100 md:bottom-5 md:right-5">
          <ArrowUpRight className="h-4 w-4" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 pr-16 md:p-5 md:pr-20">
          <p className="font-sans text-2xl leading-tight text-porcelain md:text-3xl">
            {study.title}
          </p>
        </div>
      </button>
      </Frame>

      <div className="mt-4 flex items-start justify-between gap-5">
        <p
          className={cn(
            "max-w-md text-sm leading-relaxed md:text-base",
            theme === "dark" ? "text-porcelain/55" : "text-ink/55",
          )}
        >
          {study.caption}
        </p>
        <span
          className={cn(
            "shrink-0 pt-0.5 text-xs",
            theme === "dark" ? "text-porcelain/25" : "text-ink/25",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.article>
  );
}
