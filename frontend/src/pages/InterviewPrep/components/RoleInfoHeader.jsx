import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="relative rounded-2xl p-6 md:p-8 overflow-hidden mb-8 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f172a]/60 backdrop-blur-xl shadow-sm dark:shadow-lg">
      {/* Decorative Orbs Removed */}
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            {role}
          </h2>
          <p className="text-sm md:text-base font-bold text-violet-600 dark:text-violet-400 mb-4 tracking-wide uppercase">
            [ {topicsToFocus} ]
          </p>
          
          {description && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 leading-relaxed max-w-3xl border-l-2 border-violet-500/30 pl-3">
              <span className="font-semibold text-gray-900 dark:text-gray-100">Info: </span>{description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-700/50 px-3.5 py-1.5 rounded-lg shadow-sm">
              Experience: {experience} {Number(experience) === 1 ? "Year" : "Years"}
            </span>
            <span className="text-xs font-bold text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-100 dark:bg-fuchsia-900/30 border border-fuchsia-200 dark:border-fuchsia-700/50 px-3.5 py-1.5 rounded-lg shadow-sm">
              {questions} Q&A
            </span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50 px-3.5 py-1.5 rounded-lg shadow-sm">
              Updated: {lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
