import LegalPage from "@/components/LegalPage";
import usePageMeta from "@/hooks/usePageMeta";

export default function TermsOfService() {
  usePageMeta({
    title: "Terms of Service",
    description:
      "Terms governing use of the KC Prajapati India website, including content, imagery, and service enquiries.",
  });

  return (
    <LegalPage
      label="Legal"
      title="Terms of Service"
      description="The terms that apply to your use of this website and the information published on it."
      updated="November 2026"
    >
      <p>
        By accessing this website, you agree to these terms. If you do not agree
        with them, please discontinue use of the site.
      </p>

      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          Purpose of This Website
        </h2>
        <p className="mt-4">
          This website presents information about KC Prajapati India, the
          founders, and the tile and marble contracting services offered. It is
          intended for general information and enquiry only.
        </p>
      </section>


      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          Services and Quotations
        </h2>
        <p className="mt-4">
          Nothing on this website constitutes a quotation, a binding offer, or a
          professional guarantee. Project scope, materials, timelines, and costs
          are agreed separately in writing. Site conditions, material
          availability, and design decisions can affect the work.
        </p>
      </section>

      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          Intellectual Property
        </h2>
        <p className="mt-4">
          The KC Prajapati India name, wordmark, and original written content on
          this website belong to KC Prajapati India. Photography remains the
          property of its respective creators and is used under the applicable
          license. You may view and print pages for personal, non-commercial
          use. Reproduction or commercial use requires permission.
        </p>
      </section>

      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          Accuracy and Availability
        </h2>
        <p className="mt-4">
          We aim to keep the website accurate, but details may change without
          notice. We do not guarantee that the site will be uninterrupted or
          error-free.
        </p>
      </section>

      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          Limitation of Liability
        </h2>
        <p className="mt-4">
          To the extent permitted by law, KC Prajapati India is not liable for
          any indirect or consequential loss arising from use of this website or
          reliance on its general information.
        </p>
      </section>

      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          Governing Law
        </h2>
        <p className="mt-4">
          These terms are governed by the laws of India. Any dispute arising in
          connection with this website is subject to the jurisdiction of the
          courts of Chhattisgarh, India.
        </p>
      </section>
    </LegalPage>
  );
}
