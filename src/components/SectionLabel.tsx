import { cn } from "@/utils/cn";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
  lineClassName?: string;
};

export default function SectionLabel({
  children,
  className,
  lineClassName,
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-sans text-sm font-medium md:text-[15px]",
        className,
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 shrink-0 rounded-full bg-gold", lineClassName)}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
