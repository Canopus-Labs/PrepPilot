import React, { useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview';

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md dark:shadow-none hover:border-violet-300 dark:hover:border-violet-500/50 rounded-2xl p-5 md:p-6 mb-5 transition-all duration-300 backdrop-blur-sm">
      {/* Question header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-start gap-4 cursor-pointer flex-1" onClick={toggleExpand}>
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white font-bold shadow-sm group-hover:scale-105 transition-transform duration-300">
            Q
          </div>
          <h3 className="text-base md:text-lg text-gray-900 dark:text-white font-semibold leading-snug mt-1 flex-1">
            {question}
          </h3>
        </div>

        <div className="flex items-center justify-start sm:ml-auto gap-3 shrink-0">
          {onTogglePin && (
            <button
              className={`p-2 rounded-xl transition-colors duration-200 flex items-center justify-center ${
                isPinned 
                  ? "bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30 shadow-sm" 
                  : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-white/10 dark:hover:text-violet-300 border border-transparent"
              }`}
              onClick={onTogglePin}
              title={isPinned ? "Unpin Question" : "Pin Question"}
            >
              {isPinned ? <LuPinOff size={18} /> : <LuPin size={18} />}
            </button>
          )}

          {onLearnMore && (
            <button
              className="flex items-center gap-2 text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-500/10 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-500/20 border border-fuchsia-100 dark:border-fuchsia-500/20 px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <LuSparkles size={16} className="animate-pulse" />
              <span>Learn More</span>
            </button>
          )}

          <button 
            className="p-2 ml-1 text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-all" 
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={22}
              className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Answer section */}
      {isExpanded && answer && (
        <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/10 text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
          <AIResponsePreview content={answer} />
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
