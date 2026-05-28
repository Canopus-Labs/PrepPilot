import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const dotVariants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="flex justify-center items-center py-10 gap-4">
      <motion.div
        className="h-2 w-2 bg-blue-500 rounded-full"
        variants={dotVariants}
        animate="animate"
      />
      <motion.div
        className="h-2 w-2 bg-blue-500 rounded-full"
        variants={dotVariants}
        animate="animate"
        transition={{ delay: 0.1 }}
      />
      <motion.div
        className="h-2 w-2 bg-blue-500 rounded-full"
        variants={dotVariants}
        animate="animate"
        transition={{ delay: 0.2 }}
      />
      <span className="ml-2 text-blue-600 font-medium">Loading...</span>
    </div>
  );
};

export default Loader;
