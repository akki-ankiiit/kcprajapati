import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";

type TextLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export default function TextLink({ to, children, className }: TextLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-2 pb-1 font-sans text-[14px] font-medium text-ink text-link-underline focus-visible:outline-offset-4",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowUpRight
        className="h-3.5 w-3.5 shrink-0 transition-transform duration-[250ms] ease-soft group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </Link>
  );
}
