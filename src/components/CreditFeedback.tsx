import { motion, AnimatePresence } from "framer-motion";

interface CreditFeedbackProps {
  amount: number | null;
}

const CreditFeedback = ({ amount }: CreditFeedbackProps) => {
  return (
    <AnimatePresence>
      {amount !== null && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -40 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="fixed top-20 right-8 text-2xl font-heading font-bold text-accent z-50"
        >
          -{amount} CC
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreditFeedback;
