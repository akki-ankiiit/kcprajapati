import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
  speed?: number;
  priority?: boolean;
  sizes?: string;
}

export default function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  objectPosition = "center",
  speed = 0.5,
  priority = false,
  sizes,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed * 12}%`, `${speed * 12}%`],
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
    >
      <motion.div
        style={reduceMotion ? undefined : { y }}
        className="absolute inset-0 -top-[8%] h-[116%] w-full"
      >
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          style={{ objectPosition }}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </motion.div>
    </div>
  );
}
