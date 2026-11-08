import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/** Keeps a module-level reference so route-level code can drive Lenis. */
export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

/** Scrolls an element into view below the fixed header. */
export function scrollToElement(element: HTMLElement) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const headerOffset = 112;

  if (lenisInstance) {
    lenisInstance.resize();
    lenisInstance.scrollTo(element, {
      duration: reduceMotion ? 0 : 1.2,
      immediate: reduceMotion,
      force: true,
    });
    return;
  }

  const top =
    element.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
}

/**
 * Waits for a lazily rendered route to mount the target, then scrolls to it.
 * Returns a cleanup function that cancels pending attempts.
 */
export function scrollToHash(id: string) {
  let cancelled = false;
  let attempts = 0;

  const attempt = () => {
    if (cancelled) return;

    const element = document.getElementById(id);
    if (element) {
      scrollToElement(element);
      return;
    }

    attempts += 1;
    if (attempts < 80) window.setTimeout(attempt, 50);
  };

  attempt();

  return () => {
    cancelled = true;
  };
}
