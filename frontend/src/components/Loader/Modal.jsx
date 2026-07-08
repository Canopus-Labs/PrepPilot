import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalVariants, backdropVariants } from "../../utils/animations";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 p-4"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative flex flex-col bg-[#111827] border border-white/10 shadow-2xl rounded-2xl lg:w-[35vw] w-[90vw] max-w-lg p-6 md:p-8 max-h-[90vh]"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {!hideHeader && (
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <h3 className="text-xl font-bold text-white">{title}</h3>
              </div>
            )}

            <button
              type="button"
              aria-label="Close authentication modal"
              title="Close"
              className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full w-11 h-11 flex items-center justify-center absolute top-4 right-4 transition-all duration-200 z-50"
              onClick={onClose}
            >
              ✕
            </button>

            {/* scrollbar-hide hides the bar visually while still allowing scroll if content overflows */}
            <div className="w-full overflow-y-auto scrollbar-hide">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
