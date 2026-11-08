import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProgressLoader from "@/components/ProgressLoader";
import LenisProvider from "@/components/LenisProvider";
import { ContactModalProvider } from "@/components/ContactModal";
import { scrollToHash } from "@/lib/scroll";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      return scrollToHash(decodeURIComponent(location.hash.slice(1)));
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [location.pathname, location.hash]);

  return null;
}

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Expertise = lazy(() => import("@/pages/Expertise"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Contact = lazy(() => import("@/pages/Contact"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (!window.location.hash) window.scrollTo(0, 0);
      }}
    >
      <Suspense fallback={<ProgressLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LenisProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-porcelain focus:px-4 focus:py-2 focus:text-[10px] focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>
        <ContactModalProvider>
          <AnimatedRoutes />
        </ContactModalProvider>
      </LenisProvider>
    </BrowserRouter>
  );
}
