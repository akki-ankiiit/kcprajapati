import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/utils/cn";

interface SplitTextProps {
  text: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
}

export default function SplitText({
  text,
  className = "",
  lineClassName = "",
  delay = 0,
  as = "div",
}: SplitTextProps) {
  const lines = text.split("\n");
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];

  const container: Variants = {
    hidden: { opacity: reduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        ease: [0.22, 1, 0.36, 1],
        duration: 0.9,
      },
    },
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : "105%",
    },
  };

  return (
    <Tag
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      className={className}
    >
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          className={cn(
            "-my-[0.12em] block overflow-hidden py-[0.12em]",
            lineClassName,
          )}
        >
          <motion.span variants={child} className="block">
            {line.split(/\*(.+?)\*/).map((part, partIndex) =>
              partIndex % 2 === 1 ? (
                <span key={partIndex} className="accent-word">
                  {part}
                </span>
              ) : (
                part
              ),
            )}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
