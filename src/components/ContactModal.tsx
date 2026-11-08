import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import CallModal from "@/components/layout/CallModal";
import "@/styles/contact-card.css";
import "@/styles/contact-card-theme.css";

type ContactModalContextValue = {
  open: () => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used inside ContactModalProvider");
  }
  return context;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <CallModal isOpen={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  );
}
