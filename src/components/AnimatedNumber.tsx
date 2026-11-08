import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type AnimatedNumberProps = {
  value: number;
  label: string;
  suffix?: string;
  pad?: boolean;
};

export default function AnimatedNumber({
  value,
  label,
  suffix,
  pad = false,
}: AnimatedNumberProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { margin: "-80px", once: true });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const format = (current: number) => {
      const rounded = Math.round(current).toString();
      return pad ? rounded.padStart(2, "0") : rounded;
    };

    if (reduceMotion || !isInView) {
      node.textContent = format(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (current) => {
        node.textContent = format(current);
      },
    });

    return () => controls.stop();
  }, [isInView, value, pad, reduceMotion]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start font-sans text-3xl leading-none md:text-7xl">
        <span ref={nodeRef}>{pad ? String(value).padStart(2, "0") : "0"}</span>
        {suffix && (
          <span className="ml-1 mt-1 text-xl font-normal opacity-50 md:text-2xl">
            {suffix}
          </span>
        )}
      </div>
      <p className="text-xs font-medium opacity-55 md:text-sm">
        {label}
      </p>
    </div>
  );
}
