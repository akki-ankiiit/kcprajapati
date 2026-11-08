import { cn } from "@/utils/cn";

type WordmarkProps = {
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-14 md:h-16",
  md: "h-16 md:h-20",
  lg: "h-24",
};

export default function Wordmark({
  theme = "dark",
  size = "md",
  className,
}: WordmarkProps) {
  return (
    <span
      className={cn("inline-flex select-none", className)}
      aria-label="KC Prajapati India — Tile and Marble Contractors"
    >
      <img
        src="/images/media/Logo.svg"
        alt=""
        draggable={false}
        className={cn(
          "w-auto object-contain transition-[height] duration-500",
          sizes[size],
          theme === "light" && "brightness-0 invert",
        )}
      />
    </span>
  );
}
