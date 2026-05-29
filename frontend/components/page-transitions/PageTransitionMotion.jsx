import { motion, AnimatePresence } from "framer-motion";

export function PageTransition({ children, routeKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={routeKey}
        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

