import LegalPage from "@/components/LegalPage";
import usePageMeta from "@/hooks/usePageMeta";

export default function PrivacyPolicy() {
  usePageMeta({
    title: "Privacy Policy",
    description:
      "How KC Prajapati India handles information shared through this website.",
  });

  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      description="A plain-language summary of how this website handles information, imagery, and enquiries."
      updated="November 2026"
    >
      <p>
        KC Prajapati India respects your privacy. This policy explains what
        information this website collects, how it is used, and the choices
        available to you. It applies to this website only.
      </p>

      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          Information We Collect
        </h2>
        <p className="mt-4">
          If you contact us, we will receive the information you choose to share
          — such as your name, contact details, project location, and a
          description of the work you are planning.
        </p>
      </section>

      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          How We Use Information
        </h2>
        <p className="mt-4">
          Information shared with us is used to respond to your enquiry, discuss
          a potential project, and provide the services you request. We do not
          sell, rent, or share personal information for third-party marketing.
        </p>
      </section>

      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          Cookies and Hosting
        </h2>
        <p className="mt-4">
          This website does not set advertising or profiling cookies. Our hosting
          provider may process basic technical information — such as request
          logs, browser type, and approximate location — to deliver the site
          securely and reliably.
        </p>
      </section>

      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          Your Choices
        </h2>
        <p className="mt-4">
          You may ask us for access to, correction of, or deletion of any
          personal information you have shared with us. We will respond within a
          reasonable period.
        </p>
      </section>

      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          Contact
        </h2>
        <p className="mt-4">
          KC Prajapati India, Rajendra Nagar, Raipur, 492001, Chhattisgarh, India.
          Phone: +91 78208 09999. Email: help@kcprajapati.com.
        </p>
      </section>
    </LegalPage>
  );
}
