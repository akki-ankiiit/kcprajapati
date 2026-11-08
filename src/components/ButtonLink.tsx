import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "glass" | "dark";

const base =
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-button font-sans font-semibold select-none transition-[background-color,border-color,color,opacity] duration-[250ms] ease-soft focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-40 active:opacity-90";

const variants: Record<ButtonVariant, string> = {
  primary:
    "h-12 px-6 text-[14px] border border-gold bg-gold text-white hover:border-gold-dark hover:bg-gold-dark",
  glass:
    "glass-surface h-11 px-5 text-[13px] font-medium text-white border border-white/40 bg-white/10 hover:bg-white/20 hover:border-white/70",
  dark: "h-12 px-6 text-[14px] border border-ink bg-ink text-white hover:border-ink-soft hover:bg-ink-soft",
};

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

export function ButtonArrow() {
  return (
    <ArrowRight
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-[250ms] ease-soft group-hover:translate-x-[3px]"
      strokeWidth={1.75}
      aria-hidden="true"
    />
  );
}

type ButtonLinkProps = {
  to: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  arrow?: boolean;
};

export default function ButtonLink({
  to,
  children,
  variant = "primary",
  className,
  arrow = true,
}: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClass(variant, className)}>
      <span>{children}</span>
      {arrow && <ButtonArrow />}
    </Link>
  );
}
