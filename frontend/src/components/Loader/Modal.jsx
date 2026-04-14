import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalVariants, backdropVariants } from "../../utils/animations";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/40"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative flex flex-col bg-white dark:bg-[#151c2f] border border-gray-100 dark:border-white/10 shadow-2xl rounded-2xl lg:w-[35vw] w-[90vw] max-w-lg p-6 md:p-8 overflow-hidden"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {!hideHeader && (
              <div className="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-white/10 pb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
              </div>
            )}

            {/* close button */}
            <button
              type="button"
              className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-white bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full p-1.5 flex items-center justify-center absolute top-4 right-4 transition-all duration-200 z-10"
              onClick={onClose}
            >
              ✕
            </button>

            {/* modal content */}
            <div className="w-full">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;


// import React from "react";

// const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
//   return (
//     <div className="fixed inset-0 z-50 justify-center items-center w-full h-full bg-black/40">
//       <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow">
//         {!hideHeader && (
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
//           </div>
//         )}
//   <button type="button" className="text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer" onClick={onClose}>
//           <svg
//             className="w-3 h-3"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 14 14"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="rounded"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
//             />
//           </svg>
//         </button>

//         {/* modal body scroll  */}
//         <div className="flex overflow-y-auto custom-scrollbar">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
