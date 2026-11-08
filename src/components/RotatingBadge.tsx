import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function RotatingBadge({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("pointer-events-none select-none", className)}
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
      aria-hidden="true"
    >
      <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
        <defs>
          <path
            id="kc-badge-path"
            d="M 75, 75 m -54, 0 a 54,54 0 1,1 108,0 a 54,54 0 1,1 -108,0"
          />
        </defs>
        <text className="fill-current text-xs font-medium">
          <textPath href="#kc-badge-path" startOffset="0%">
            KC Prajapati India · Est. 2000 · 26 Years ·
          </textPath>
        </text>
        <path d="M75 59v32M61 75h28" stroke="currentColor" strokeOpacity="0.35" />
      </svg>
    </motion.div>
  );
}
