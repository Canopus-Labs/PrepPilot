import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const AptitudeQuestionCard = ({ question, options, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (opt) => {
    if (selectedOption !== null) return;
    setSelectedOption(opt);
    setIsExpanded(true);
  };

  const checkIsCorrect = (opt, optionLabel) => {
    if (!answer) return false;
    const ansString = String(answer).trim().toLowerCase();
    const optString = String(opt).trim().toLowerCase();
    return ansString === optString || ansString === optionLabel.toLowerCase() || optString.includes(ansString) || ansString.includes(optString);
  };

  return (
    <div className="relative bg-white dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-xl p-5 mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Expand button */}
      <button
        className="absolute top-4 right-4 text-gray-400 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <ChevronDown
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Question */}
      <div
        className="flex items-start gap-3 mr-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold px-2.5 py-1 rounded-md shadow-sm text-sm shrink-0">
          Q
        </span>
        <h3 className="text-gray-900 dark:text-white/90 font-medium text-base leading-snug pt-0.5">
          {question}
        </h3>
      </div>

      {/* Options */}
      {options && Array.isArray(options) && (
        <div className="mt-5 space-y-2">
          {options.map((opt, i) => {
            const optionLabel = String.fromCharCode(65 + i); // A, B, C, D, ...
            
            let optionStyles = "bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-white/5 cursor-pointer";
            let labelStyles = "text-violet-600 dark:text-violet-400";

            if (selectedOption !== null) {
                const isCorrect = checkIsCorrect(opt, optionLabel);
                if (isCorrect) {
                  optionStyles = "bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-500/50 text-green-800 dark:text-green-300";
                  labelStyles = "text-green-700 dark:text-green-400";
                } else if (selectedOption === opt) {
                  optionStyles = "bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-500/50 text-red-800 dark:text-red-300";
                  labelStyles = "text-red-700 dark:text-red-400";
                } else {
                  optionStyles = "bg-gray-50 dark:bg-transparent opacity-60 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 cursor-not-allowed";
                  labelStyles = "text-gray-400 dark:text-gray-500";
                }
            }
            
            return (
              <div
                key={i}
                onClick={() => handleOptionClick(opt)}
                className={`text-sm px-4 py-3 rounded-lg flex items-start gap-3 transition-colors duration-200 ${optionStyles}`}
              >
                <span className={`font-bold shrink-0 ${labelStyles}`}>
                  {optionLabel}.
                </span> 
                <span className="pt-0.5 leading-snug">{opt}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Answer (expanded) */}
      {isExpanded && answer && (
        <div className="mt-5 text-sm text-green-800 dark:text-green-300 font-medium bg-green-50 dark:bg-green-900/30 px-4 py-3 rounded-lg border border-green-200 dark:border-green-400/40 flex items-start gap-3 transition-all">
          <span className="shrink-0 text-lg">💡</span> 
          <div>
            <span className="block text-xs uppercase tracking-wider text-green-600/80 dark:text-green-400/80 font-bold mb-1">Correct Answer</span>
            <span className="font-semibold text-base">{answer}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AptitudeQuestionCard;
