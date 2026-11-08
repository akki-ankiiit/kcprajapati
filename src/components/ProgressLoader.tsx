import { motion } from "framer-motion";
import Wordmark from "@/components/Wordmark";

export default function ProgressLoader() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-ink text-porcelain">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Wordmark theme="light" size="md" />
      </motion.div>

      <div className="mt-10 h-px w-40 overflow-hidden bg-porcelain/20">
        <motion.div
          className="h-full w-1/2 bg-gold"
          initial={{ x: "-110%" }}
          animate={{ x: "220%" }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        />
      </div>

      <p className="mt-5 text-xs text-porcelain/35">
        Tile &amp; Marble · Since 2000
      </p>
    </div>
  );
}
