import React from "react";
import { Trash } from "lucide-react";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastupdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="relative rounded-xl p-4 cursor-pointer 
                 bg-white/10 backdrop-blur-md border shadow-md
                 border-white/20 hover:shadow-xl hover:scale-[1.02] 
                 transition-all duration-300 group"
      style={{ borderLeft: `6px solid ${colors.bgcolor}` }}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-black shadow"
          style={{ background: colors.bgcolor }}
        >
          {getInitials(role)}
        </div>
        <div className="flex-1">
          <h2 className="text-base font-semibold text-white truncate">
            {role}
          </h2>
          <p className="text-xs text-gray-300 truncate">{topicsToFocus}</p>
        </div>

        {/* Delete Button */}
        <button
          className="hidden group-hover:flex items-center gap-1 text-rose-400 text-xs font-medium 
                     bg-white/10 px-2 py-0.5 rounded border border-rose-300/30 
                     hover:bg-rose-500/20 absolute top-2 right-2 transition"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash className="w-3 h-3" />
          Delete
        </button>
      </div>

      {/* Info Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-[11px] font-medium text-gray-200 bg-white/10 px-2 py-0.5 rounded-full">
          Experience: {experience} {experience === 1 ? "Year" : "Years"}
        </span>
        <span className="text-[11px] font-medium text-gray-200 bg-white/10 px-2 py-0.5 rounded-full">
          {questions} Q&A
        </span>
        <span className="text-[11px] font-medium text-gray-200 bg-white/10 px-2 py-0.5 rounded-full">
          Last Updated: {lastupdated}
        </span>
      </div>

      {/* Description */}
      <p className="text-[13px] text-gray-300 line-clamp-2">{description}</p>
    </div>
  );
};

export default SummaryCard;
