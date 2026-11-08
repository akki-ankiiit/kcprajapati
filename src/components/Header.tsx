import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import Wordmark from "@/components/Wordmark";
import { ButtonArrow, buttonClass } from "@/components/ButtonLink";
import { useContactModal } from "@/components/ContactModal";
import { navLinks, site } from "@/data/site";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const contact = useContactModal();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  const isActiveLink = (href: string) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[height,background-color,border-color,box-shadow] duration-500",
          isScrolled
            ? "h-16 border-b border-ink/10 bg-porcelain/92 text-ink shadow-[0_1px_0_rgba(26,26,25,0.06)] backdrop-blur-md md:h-[76px]"
            : "h-20 bg-transparent text-porcelain md:h-24",
        )}
      >
        <div className="mx-auto grid h-full w-full max-w-[1440px] grid-cols-[1fr_auto] items-center px-5 md:px-10 lg:grid-cols-[1fr_auto_1fr] xl:px-18">
          <Link
            to="/"
            aria-label="KC Prajapati India — home"
            className="shrink-0 justify-self-start transition-opacity duration-300 hover:opacity-80"
          >
            <Wordmark
              theme={isScrolled ? "dark" : "light"}
              size={isScrolled ? "sm" : "md"}
              className={isScrolled ? "h-14" : "h-[4.5rem] md:h-[5.5rem]"}
            />
          </Link>

          <nav
            className="hidden items-center gap-9 lg:flex xl:gap-11"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative py-2 font-sans text-[14px] font-medium tracking-[-0.005em] transition-opacity duration-[250ms] ease-soft",
                    isActive ? "opacity-100" : "opacity-75 hover:opacity-100",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-current"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden justify-self-end lg:flex">
            <button
              type="button"
              onClick={contact.open}
              className={buttonClass(isScrolled ? "primary" : "glass")}
            >
              <span>Discuss Your Project</span>
              <ButtonArrow />
            </button>
          </div>

          <button
            type="button"
            className="-mr-2 p-2 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink px-5 pb-8 pt-5 text-porcelain lg:hidden"
          >
            <div className="flex h-12 items-center justify-between">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="KC Prajapati India — home"
              >
                <Wordmark theme="light" size="sm" />
              </Link>
              <button
                type="button"
                className="-mr-2 p-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col" aria-label="Mobile navigation">
              {navLinks.map((link, index) => {
                const isActive = isActiveLink(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + index * 0.07,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-t border-porcelain/10 last:border-b"
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-baseline gap-4 py-4"
                    >
                      <span className="w-6 font-sans text-xs font-medium tabular-nums text-porcelain/40">
                        0{index + 1}
                      </span>
                      <span
                        className={cn(
                          "font-sans text-4xl tracking-[-0.03em] transition-opacity",
                          isActive ? "opacity-100" : "opacity-70",
                        )}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-auto space-y-6 pt-10"
            >
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  contact.open();
                }}
                className={buttonClass("glass", "h-12 w-full")}
              >
                Discuss Your Project
                <ButtonArrow />
              </button>
              <div className="space-y-1 font-sans text-sm leading-relaxed text-porcelain/50">
                <p>{site.location}</p>
                <p>Phone &amp; email available on request</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
