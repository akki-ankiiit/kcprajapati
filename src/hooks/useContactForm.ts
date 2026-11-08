import { useCallback, type FormEvent } from "react";

/** Use a configured enquiry endpoint; never claim an enquiry was sent without one. */
export function useContactForm() {
  return useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const labels = [...form.querySelectorAll<HTMLElement>('[data-form-btn] [hover="text"]')];
    const endpoint: string | undefined = import.meta.env.VITE_CONTACT_ENDPOINT;
    let status = form.querySelector<HTMLParagraphElement>("[data-form-status]");
    if (!status) {
      status = document.createElement("p");
      status.dataset.formStatus = "";
      status.className = "form-status";
      status.setAttribute("role", "status");
      form.appendChild(status);
    }
    if (!endpoint) {
      status.textContent =
        "Online enquiries are not connected yet. Please call +91 6260906952 to speak with the studio.";
      labels.forEach((label) => {
        label.textContent = "Submit";
      });
      return;
    }
    if (form.dataset.sending === "true") return;
    form.dataset.sending = "true";
    labels.forEach((label) => {
      label.textContent = "Sending…";
    });
    status.textContent = "";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error("Unable to submit enquiry");
      const success = form.parentElement?.querySelector<HTMLElement>(".w-form-done");
      if (success) {
        form.style.display = "none";
        success.style.display = "block";
        success.setAttribute("tabindex", "-1");
        success.focus();
      } else status.textContent = "Thank you. Your enquiry has been sent.";
    } catch {
      status.textContent =
        "Your enquiry could not be sent. Please try again or call +91 6260906952.";
    } finally {
      delete form.dataset.sending;
      labels.forEach((label) => {
        label.textContent = "Submit";
      });
    }
  }, []);
}
