import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FooterWordmark from "@/components/FooterWordmark";
import { contactDisplay, navLinks, site } from "@/data/site";
import { services } from "@/data/services";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-stone text-ink">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-8 pt-16 md:px-8 md:pb-10 md:pt-24 xl:px-18">
        <div className="grid grid-cols-1 gap-12 border-b border-ink/10 pb-14 md:grid-cols-12 md:gap-8 md:pb-20">
          <div className="md:col-span-4">
            <Link
              to="/"
              aria-label="KC Prajapati India — home"
              className="inline-block transition-opacity hover:opacity-70"
            >
              <FooterWordmark />
            </Link>
            <p className="mt-7 max-w-xs font-sans text-3xl leading-snug">
              {site.tagline}
            </p>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-ink/65">
              {site.description}
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <h3 className="mb-5 text-xs font-medium text-ink/45">
              Explore
            </h3>
            <ul className="space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-base text-ink/75 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-5 text-xs font-medium text-ink/45">
              Expertise
            </h3>
            <ul className="space-y-3.5">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/expertise#${service.id}`}
                    className="text-base leading-snug text-ink/75 transition-colors hover:text-ink"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h3 className="mb-5 text-xs font-medium text-ink/45">
              Contact
            </h3>
            <div className="space-y-1.5 text-base leading-relaxed text-ink/75">
              <p>{contactDisplay.address}</p>
              <p>{contactDisplay.phone}</p>
              <p>{contactDisplay.email}</p>
            </div>
            <div className="mt-6 space-y-1.5 text-base text-ink/65">
              <p>Kailash Prajapati</p>
              <p>Manish Prajapati</p>
            </div>
            <Link
              to="/contact"
              className="group mt-7 inline-flex items-center gap-2 border-b border-ink/40 pb-1 text-xs font-medium transition-colors hover:border-ink"
            >
              Discuss Your Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-5 text-xs text-ink/50 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 KC Prajapati India. All Rights Reserved.</p>
          <p className="text-ink/40">{site.secondaryTagline}</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-ink">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-ink">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-4 z-0 select-none overflow-hidden text-center md:-bottom-8"
      >
        <svg
          viewBox="0 0 1000 200"
          className="block h-auto w-full text-ink/[0.045]"
          role="presentation"
        >
          <text
            x="0"
            y="170"
            fill="currentColor"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="font-accent"
            fontSize="200"
          >
            KC PRAJAPATI
          </text>
        </svg>
      </div>
    </footer>
  );
}
