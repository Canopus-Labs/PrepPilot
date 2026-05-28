import React from "react";
import { LuX } from "react-icons/lu";
const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-40 h-[100dvh] p-6 overflow-y-auto custom-scrollbar transform transition-transform duration-300 ease-in-out bg-white dark:bg-[#0f172a] w-full md:w-[45vw] lg:w-[35vw] shadow-[auto_0_40px_rgba(0,0,0,0.5)] border-l border-gray-200 dark:border-white/10
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100 dark:border-white/10 mt-16 md:mt-0">
          <h5
            id="drawer-right-label"
            className="flex items-center text-lg font-bold text-gray-900 dark:text-white"
          >
            {title || "Concept Explanation"}
          </h5>
          {/* close button */}
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 hover:bg-violet-100 hover:text-violet-600 dark:hover:bg-violet-500/20 dark:hover:text-violet-300 rounded-xl text-sm w-9 h-9 inline-flex items-center justify-center transition-colors"
          >
            <LuX className="text-xl" />
          </button>
        </div>
        {/* Body Content */}
        <div className="text-sm">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
