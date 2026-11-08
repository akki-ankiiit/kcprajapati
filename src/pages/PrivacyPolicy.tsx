import LegalPage from "@/components/LegalPage";
import usePageMeta from "@/hooks/usePageMeta";

export default function PrivacyPolicy() {
  usePageMeta({
    title: "Privacy Policy",
    description:
      "How KC Prajapati India handles information shared through this website, and how illustrative imagery is sourced.",
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
          This website does not currently include a live enquiry endpoint, an
          advertising tracker, or a third-party analytics service. The enquiry
          form is a preview and does not transmit or store the details you enter.
        </p>
        <p className="mt-4">
          If you contact us through verified phone or email details once they are
          published, we will receive the information you choose to share — such
          as your name, contact details, project location, and a description of
          the work you are planning.
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
          Imagery
        </h2>
        <p className="mt-4">
          The photography on this website is illustrative and is used under the
          Pexels license. It does not depict verified KC Prajapati India
          projects or the founders. Client project photography will replace
          these studies as it becomes available.
        </p>
      </section>

      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          Your Choices
        </h2>
        <p className="mt-4">
          Once verified contact details are published, you may use them to ask
          for access to, correction of, or deletion of any personal information
          you have shared with us. We will respond within a reasonable period.
        </p>
      </section>

      <section>
        <h2 className="font-sans text-3xl text-ink md:text-4xl">
          Contact
        </h2>
        <p className="mt-4">
          KC Prajapati India is based in Chhattisgarh, India. Verified phone,
          email, and postal details will be published on the contact page before
          launch. Until then, this website intentionally shows contact details
          as available on request.
        </p>
      </section>
    </LegalPage>
  );
}
