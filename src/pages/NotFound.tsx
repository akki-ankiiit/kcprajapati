import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ParallaxImage from "@/components/ParallaxImage";
import usePageMeta from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta({
    title: "Page Not Found",
    description:
      "The page you are looking for could not be found. Return to KC Prajapati India.",
  });

  return (
    <PageTransition>
      <Header />
      <main
        id="main-content"
        className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-porcelain"
      >
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="/images/kc/marble-arches.webp"
            alt="Marble arches and corridor with detailed stonework"
            speed={0.2}
            priority
          />
          <div className="absolute inset-0 bg-ink/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/35" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40 xl:px-18">
          <p className="inline-flex items-center gap-4 text-xs font-medium text-porcelain/55">
            <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />
            Error 404
          </p>

          <h1 className="mt-7 max-w-4xl font-sans text-3xl leading-[1.02] md:mt-9 md:text-7xl lg:text-[6vw]">
            This surface
            <br />
            doesn&rsquo;t{" "}
            <span className="accent-word">
              exist.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-porcelain/60 md:text-base">
            The page you are looking for may have moved, or the link may be
            incomplete. Let&rsquo;s return you to the work.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              to="/"
              className="group inline-flex items-center gap-3 border border-porcelain bg-porcelain px-7 py-3.5 text-xs font-medium text-ink transition-colors duration-500 hover:bg-transparent hover:text-porcelain"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1" />
              Return Home
            </Link>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 border-b border-porcelain/35 pb-2 text-xs font-medium text-porcelain/80 transition-colors hover:border-porcelain hover:text-porcelain"
            >
              View Our Work
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}
