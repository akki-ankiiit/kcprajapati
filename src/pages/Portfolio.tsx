import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import GalleryLightbox from "@/components/GalleryLightbox";
import ContactCTA from "@/components/ContactCTA";
import usePageMeta from "@/hooks/usePageMeta";
import {
  workCategories,
  workStudies,
  type WorkCategory,
} from "@/data/work";
import { cn } from "@/utils/cn";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  usePageMeta({
    title: "Our Work",
    description:
      "Material and craftsmanship studies in marble flooring, premium tile work, wall installations, stone finishing, and large-format tiles by KC Prajapati India.",
    image: "/images/kc/marble-tile-pattern.webp",
  });

  const filteredStudies = useMemo(
    () =>
      activeCategory === "All"
        ? workStudies
        : workStudies.filter((study) => study.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

  return (
    <PageTransition>
      <Header />
      <main id="main-content" className="min-h-screen bg-porcelain">
        <PageHero
          label="Our Work"
          title={
            <>
              Studies in
              <br />
              material and{" "}
              <span className="accent-word">
                craft.
              </span>
            </>
          }
          description="A closer look at the surfaces, joints, edges, and finishes that define our work."
          image="/images/kc/marble-tile-pattern.webp"
          imageAlt="Geometric marble floor tiles arranged in a considered pattern"
          meta={["16 Studies", "06 Categories"]}
        />

        <section className="border-b border-ink/10 bg-porcelain/95 text-ink backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8 md:py-5 xl:px-18">
            <div
              className="no-scrollbar -mx-1 flex gap-x-6 overflow-x-auto px-1 py-1 md:gap-x-8"
              role="tablist"
              aria-label="Filter studies by category"
            >
              {workCategories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "relative shrink-0 whitespace-nowrap pb-2 text-xs font-medium transition-opacity md:text-sm",
                      isActive
                        ? "text-ink opacity-100"
                        : "text-ink opacity-40 hover:opacity-70",
                    )}
                  >
                    {category}
                    {isActive && (
                      <motion.span
                        layoutId="portfolio-filter"
                        className="absolute inset-x-0 -bottom-px h-px bg-ink"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <p className="shrink-0 text-xs text-ink/40">
              {String(filteredStudies.length).padStart(2, "0")} studies
            </p>
          </div>
        </section>

        <section className="bg-porcelain py-12 text-ink md:py-20">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-18">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <GalleryGrid
                  studies={filteredStudies}
                  onOpen={setLightboxIndex}
                  priorityCount={3}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <ContactCTA
          image="/images/kc/marble-hallway.webp"
          imageAlt="Long corridor with large-format marble flooring"
          label="Discuss a Project"
          description="Have a surface in mind? Share the space, the material, and the finish you are looking for. We will help you take it from drawing to handover."
        />
      </main>
      <Footer />

      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            studies={filteredStudies}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onChange={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
