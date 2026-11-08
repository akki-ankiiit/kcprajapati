import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

type MagneticLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export default function MagneticLink({
  to,
  children,
  className,
  strength = 0.22,
}: MagneticLinkProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const handleMouse = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (reduceMotion || !ref.current) return;
    const { clientX, clientY } = event;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPosition({
      x: (clientX - (left + width / 2)) * strength,
      y: (clientY - (top + height / 2)) * strength,
    });
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("inline-block", className)}
    >
      <Link to={to}>{children}</Link>
    </motion.span>
  );
}
