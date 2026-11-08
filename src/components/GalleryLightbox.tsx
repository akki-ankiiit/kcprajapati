import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { WorkStudy } from "@/data/work";

type GalleryLightboxProps = {
  studies: WorkStudy[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export default function GalleryLightbox({
  studies,
  index,
  onClose,
  onChange,
}: GalleryLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const study = studies[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        onChange((index - 1 + studies.length) % studies.length);
      }
      if (event.key === "ArrowRight") {
        onChange((index + 1) % studies.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [index, studies.length, onClose, onChange]);

  if (!study) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/96 text-porcelain backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 border-b border-porcelain/10 px-5 py-4 md:px-8">
        <p className="text-xs text-porcelain/50">
          {study.category}
        </p>
        <div className="flex items-center gap-5">
          <span className="text-xs text-porcelain/50">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(studies.length).padStart(2, "0")}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-10 w-10 items-center justify-center border border-porcelain/25 transition-colors hover:border-porcelain hover:bg-porcelain hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-hidden px-4 py-5 md:px-16 md:py-8">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onChange((index - 1 + studies.length) % studies.length);
          }}
          aria-label="Previous study"
          className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center border border-porcelain/20 transition-colors hover:border-porcelain hover:bg-porcelain hover:text-ink md:mr-8 md:h-14 md:w-14"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        <div
          className="flex min-w-0 flex-1 flex-col items-center"
          onClick={(event) => event.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={study.id}
              src={study.image}
              alt={study.alt}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[62vh] w-auto max-w-full object-contain md:max-h-[68vh]"
            />
          </AnimatePresence>

          <div className="mt-5 max-w-2xl text-center md:mt-7">
            <h2
              id="lightbox-title"
              className="font-sans text-3xl leading-tight md:text-4xl"
            >
              {study.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-porcelain/55 md:text-base">
              {study.caption}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onChange((index + 1) % studies.length);
          }}
          aria-label="Next study"
          className="ml-3 flex h-11 w-11 shrink-0 items-center justify-center border border-porcelain/20 transition-colors hover:border-porcelain hover:bg-porcelain hover:text-ink md:ml-8 md:h-14 md:w-14"
        >
          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>
    </motion.div>
  );
}
