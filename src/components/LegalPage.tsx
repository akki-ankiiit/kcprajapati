import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

type LegalPageProps = {
  label: string;
  title: string;
  description: string;
  updated: string;
  children: ReactNode;
};

export default function LegalPage({
  label,
  title,
  description,
  updated,
  children,
}: LegalPageProps) {
  return (
    <PageTransition>
      <Header />
      <main id="main-content" className="min-h-screen bg-porcelain">
        <PageHero
          label={label}
          title={title}
          description={description}
          image="/images/kc/marble-wall-bath.webp"
          imageAlt="Marble wall panels in a contemporary interior"
          meta={[`Last updated: ${updated}`, "KC Prajapati India", "Chhattisgarh, India"]}
          size="compact"
        />

        <section className="bg-porcelain py-16 text-ink md:py-24">
          <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
            <Reveal>
              <div className="space-y-10 text-base leading-relaxed text-ink/70 md:text-base">
                {children}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
