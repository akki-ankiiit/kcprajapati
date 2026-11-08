import { cn } from "@/utils/cn";

type RoyalFrameProps = {
  children: React.ReactNode;
  className?: string;
};

const gold = "bg-gradient-to-br from-[#f3dca6] via-[#b8862f] to-[#f3dca6]";

// Gold-leaf frame: a gold band, a thin ink channel, scroll ornaments at the
// four corners and diamonds at the middle of each edge.
function Corner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("pointer-events-none absolute z-10 h-9 w-9 text-[#c9a05a]", className)}
    >
      <path d="M2 30 V12 C2 6 6 2 12 2 H30" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1" y="1" width="4" height="4" fill="currentColor" transform="rotate(45 3 3)" />
      <circle cx="30" cy="2" r="1.6" fill="currentColor" />
      <circle cx="2" cy="30" r="1.6" fill="currentColor" />
    </svg>
  );
}

export default function RoyalFrame({ children, className }: RoyalFrameProps) {
  return (
    <div className={cn("relative p-[3px]", gold, className)}>
      <div className="bg-ink p-[5px]">{children}</div>
      <Corner className="-left-1.5 -top-1.5" />
      <Corner className="-right-1.5 -top-1.5 rotate-90" />
      <Corner className="-bottom-1.5 -right-1.5 rotate-180" />
      <Corner className="-bottom-1.5 -left-1.5 -rotate-90" />
      <span className={cn("absolute left-1/2 -top-[5px] h-2.5 w-2.5 -translate-x-1/2 rotate-45", gold)} aria-hidden="true" />
      <span className={cn("absolute left-1/2 -bottom-[5px] h-2.5 w-2.5 -translate-x-1/2 rotate-45", gold)} aria-hidden="true" />
      <span className={cn("absolute top-1/2 -left-[5px] h-2.5 w-2.5 -translate-y-1/2 rotate-45", gold)} aria-hidden="true" />
      <span className={cn("absolute top-1/2 -right-[5px] h-2.5 w-2.5 -translate-y-1/2 rotate-45", gold)} aria-hidden="true" />
    </div>
  );
}
