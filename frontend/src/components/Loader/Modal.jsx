import React, { useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalVariants, backdropVariants } from "../../utils/animations";

const FOCUSABLE_SELECTORS = [
  'a[href]:not([disabled])',
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"]):not([disabled])',
].join(", ");

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const titleId = useId();

  const getFocusableElements = () => {
    if (!dialogRef.current) return [];
    return Array.from(dialogRef.current.querySelectorAll(FOCUSABLE_SELECTORS));
  };

  // Focus management: save trigger, move focus in, restore on close
  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement;

    const raf = requestAnimationFrame(() => {
      const elements = getFocusableElements();
      if (elements.length > 0) {
        elements[0].focus();
      } else if (dialogRef.current) {
        dialogRef.current.focus();
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      const prev = previousFocusRef.current;
      if (prev && typeof prev.focus === "function") {
        prev.focus();
      }
    };
  }, [isOpen]);

  // Escape key, focus trap, body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const elements = getFocusableElements();

        if (elements.length === 0) {
          e.preventDefault();
          return;
        }

        const first = elements[0];
        const last = elements[elements.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
          if (active === first || !dialogRef.current?.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !dialogRef.current?.contains(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={!hideHeader && title ? titleId : undefined}
            tabIndex={-1}
            className="relative flex flex-col bg-[#111827] border border-white/10 shadow-2xl rounded-2xl lg:w-[35vw] w-[90vw] max-w-lg p-6 md:p-8 max-h-[90vh] outline-none"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {!hideHeader && (
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <h3 id={titleId} className="text-xl font-bold text-white">{title}</h3>
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
