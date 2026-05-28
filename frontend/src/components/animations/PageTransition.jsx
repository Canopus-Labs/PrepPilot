import React from "react";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/animations";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
