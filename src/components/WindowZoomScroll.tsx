import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/utils/cn";

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger, SplitText);

export type WindowZoomScrollProps = {
  image?: string;
  heading?: string;
  text?: string;
  /** Colour of the wall the two windows are cut into. */
  wall?: string;
  /** How far the wall zooms in at the end (1.84 fills the screen with the window). */
  zoom?: number;
  /** Section height in screens. */
  length?: number;
  className?: string;
};

const IN_OUT = CustomEase.create("kc-window-inout", "0.75,0,0.25,1");
const OUT = CustomEase.create("kc-window-out", "0.25,1,0.5,1");

// Each half of the wall is a full rectangle with a window cut out of it.
// Left window: the right 55.6% of the left half. Right window: the left
// 55.6% of the right half, staggered in height with a hair of wall between.
const LEFT = [
  "polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 36.111%, 98.889% 36.111%, 98.889% 99.074%, 44.444% 99.074%, 1.111% 100%, 100% 100%, 100% 0%)",
  "polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 18.519%, 98.889% 18.519%, 98.889% 81.481%, 44.444% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)",
  "polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 18.519%, 100% 18.519%, 100% 81.481%, 44.444% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)",
];
const RIGHT = [
  "polygon(0% 0%, 0% 100%, 1.111% 100%, 1.111% 0.926%, 55.556% 0.926%, 55.556% 63.889%, 1.111% 63.889%, 1.111% 100%, 100% 100%, 100% 0%)",
  "polygon(0% 0%, 0% 100%, 1.111% 100%, 1.111% 18.519%, 55.556% 18.519%, 55.556% 81.481%, 1.111% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)",
  "polygon(0% 0%, 0% 100%, 0% 100%, 0% 18.519%, 55.556% 18.519%, 55.556% 81.481%, 0% 81.481%, 0% 100%, 100% 100%, 100% 0%)",
];

export default function WindowZoomScroll({
  image = "/images/kc/curved-marble-hall.webp",
  heading = "Craft",
  text = "Marble and tile, laid with precision and finished with care across Chhattisgarh.",
  wall = "#f2efe8",
  zoom = 1.84,
  length = 3.5,
  className = "",
}: WindowZoomScrollProps) {
  const rootRef = useRef<HTMLElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [stageH, setStageH] = useState(0);

  // The stage is as tall as the viewport.
  useEffect(() => {
    const measure = () => setStageH(window.innerHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const chars = SplitText.create(headingRef.current, { type: "chars" }).chars;
      const lines = SplitText.create(textRef.current, {
        type: "lines",
        mask: "lines",
      }).lines;

      gsap.set(root, { visibility: "visible" });

      if (reduceMotion) {
        gsap.set(wallRef.current, { autoAlpha: 0 });
        return;
      }

      // Windows align, the wall zooms into the photo, and the photo grows
      // from 75% to full size, all scrubbed across two screens of scroll.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: () => `top+=${2 * window.innerHeight} top`,
            scrub: true,
          },
        })
        .fromTo(
          leftRef.current,
          { clipPath: LEFT[0] },
          { clipPath: LEFT[1], ease: "none", duration: 0.5 },
        )
        .fromTo(
          rightRef.current,
          { clipPath: RIGHT[0] },
          { clipPath: RIGHT[1], ease: "none", duration: 0.5 },
          "<",
        )
        .to(leftRef.current, { clipPath: LEFT[2], ease: "none", duration: 0.1 })
        .to(rightRef.current, { clipPath: RIGHT[2], ease: "none", duration: 0.1 }, "<")
        .fromTo(
          wallRef.current,
          { scale: 1 },
          { scale: zoom, ease: IN_OUT, duration: 0.4 },
        )
        .fromTo(
          sceneRef.current,
          { scale: 0.75, transformOrigin: "center top" },
          { scale: 1, ease: IN_OUT, duration: 0.4 },
          "<",
        );

      // Words turn in letter by letter once the section is over halfway up.
      gsap.set(chars, { opacity: 0, yPercent: 50, rotateY: 90 });
      gsap.set(lines, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: root,
        start: () => `top+=${0.56 * window.innerHeight} top`,
        onEnter: () => {
          gsap.fromTo(
            chars,
            { opacity: 0, yPercent: 50, rotateY: 90 },
            {
              opacity: 1,
              yPercent: 0,
              rotateY: 0,
              duration: 1.2,
              stagger: 0.05,
              ease: OUT,
              overwrite: true,
            },
          );
          gsap.fromTo(
            lines,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1.2,
              delay: 0.4,
              stagger: 0.1,
              ease: OUT,
              overwrite: true,
            },
          );
        },
        onLeaveBack: () => {
          gsap.to(chars, {
            opacity: 0,
            yPercent: -50,
            rotateY: -90,
            duration: 0.4,
            stagger: 0.025,
            ease: "power2.in",
            overwrite: true,
          });
          gsap.to(lines, {
            yPercent: -110,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });

      // Once open, the photo drifts down as the section leaves.
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "55% top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    {
      scope: rootRef,
      dependencies: [heading, text, zoom, length, stageH],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={rootRef}
      aria-label={heading}
      className={cn("relative", className)}
      style={{
        height: stageH ? stageH * length : `${length * 100}svh`,
        background: wall,
        visibility: "hidden",
      }}
    >
      <div
        className="sticky top-0 overflow-hidden [container-type:size]"
        style={{ height: stageH || "100svh" }}
      >
        {/* The photo and its words sit behind the wall. The scene is a third
            taller than the stage so that, even at 75%, it still fills both
            windows down to the bottom. */}
        <div
          ref={sceneRef}
          className="absolute inset-x-0 top-0 h-[calc(100%/0.75)] overflow-hidden text-porcelain"
        >
          <img
            ref={imageRef}
            src={image}
            alt=""
            className="absolute inset-x-0 top-[-25%] h-[125%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink/50" />
          <div className="relative flex h-3/4 flex-col items-center justify-between px-[4%] pb-[7%] pt-[6%] text-center">
            <h2
              ref={headingRef}
              className="whitespace-nowrap font-sans text-[clamp(56px,19cqw,300px)] leading-[0.85] [perspective:800px]"
            >
              {heading}
            </h2>
            <p
              ref={textRef}
              className="max-w-[28em] text-[clamp(16px,1.6cqw,22px)] leading-[1.35]"
            >
              {text}
            </p>
          </div>
        </div>

        {/* The wall: two halves, each with its window cut out. */}
        <div
          ref={wallRef}
          className="pointer-events-none absolute inset-0 z-[1]"
        >
          <div
            ref={leftRef}
            className="absolute inset-[-1%_calc(50%-1px)_0_0]"
            style={{ background: wall, clipPath: LEFT[0] }}
          />
          <div
            ref={rightRef}
            className="absolute inset-[-1%_0_0_50%]"
            style={{ background: wall, clipPath: RIGHT[0] }}
          />
        </div>
      </div>
    </section>
  );
}
