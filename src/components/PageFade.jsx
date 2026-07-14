import { motion } from "framer-motion";

// Wraps each route's page: a quick fade + slide, reading as signal moving to
// the next layer rather than a page "changing".
export default function PageFade({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
