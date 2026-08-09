import React, { useEffect, useRef, useId } from "react";
import { LuX } from "react-icons/lu";

const FOCUSABLE_SELECTORS = [
  'a[href]:not([disabled])',
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"]):not([disabled])',
].join(", ");

const Drawer = ({ isOpen, onClose, title, children }) => {
  const drawerRef = useRef(null);
  const previousFocusRef = useRef(null);
  const titleId = useId();

  const getFocusableElements = () => {
    if (!drawerRef.current) return [];
    return Array.from(drawerRef.current.querySelectorAll(FOCUSABLE_SELECTORS));
  };

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement;

    const raf = requestAnimationFrame(() => {
      const elements = getFocusableElements();
      if (elements.length > 0) {
        elements[0].focus();
      } else if (drawerRef.current) {
        drawerRef.current.focus();
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
          if (active === first || !drawerRef.current?.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !drawerRef.current?.contains(active)) {
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
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-labelledby={isOpen ? titleId : undefined}
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-40 h-[100dvh] p-6 overflow-y-auto custom-scrollbar transform transition-transform duration-300 ease-in-out bg-white dark:bg-[#0f172a] w-full md:w-[45vw] lg:w-[35vw] shadow-[auto_0_40px_rgba(0,0,0,0.5)] border-l border-gray-200 dark:border-white/10 outline-none
        ${isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"}`}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100 dark:border-white/10 mt-16 md:mt-0">
          <h5
            id={titleId}
            className="flex items-center text-lg font-bold text-gray-900 dark:text-white"
          >
            {title || "Concept Explanation"}
          </h5>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 hover:bg-violet-100 hover:text-violet-600 dark:hover:bg-violet-500/20 dark:hover:text-violet-300 rounded-xl text-sm w-9 h-9 inline-flex items-center justify-center transition-colors"
          >
            <LuX className="text-xl" />
          </button>
        </div>
        <div className="text-sm">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
