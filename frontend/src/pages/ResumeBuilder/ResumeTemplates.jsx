import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Plus, Sparkles } from "lucide-react";

// Sample initial templates
export const RESUME_TEMPLATES = [
  {
    id: "jakes-resume",
    name: "Jake's Resume",
    description: "A clean, basic, and widely accepted professional template perfect for software engineers."
  },
  {
    id: "deedy-cv",
    name: "Deedy CV",
    description: "A popular two-column layout for experienced professionals and researchers."
  },
  {
    id: "harvard-pro",
    name: "Harvard Professional",
    description: "The classic, conservative single-column format favored by top consulting and finance firms."
  }
];

const ResumeTemplates = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (id) => {
    navigate(`/resume-builder/${id}`);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] text-gray-900 dark:text-white px-5 md:px-12 py-10 transition-colors duration-300">
      
      {/* Header */}
      <div className="mb-10 lg:mb-14 max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20 shadow-sm">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Resume Builder
            </h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Create a flawless, professional resume using our Overleaf-powered LaTeX editor.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
        
        {/* Blank Project Card */}
        <button
          onClick={() => handleSelectTemplate("blank")}
          className="group relative flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-[#151c2f] border-2 border-dashed border-gray-200 dark:border-white/10 hover:border-violet-500/50 dark:hover:border-violet-500/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 text-center min-h-[220px] shadow-sm hover:shadow-md overflow-hidden"
        >
          <div className="w-12 h-12 mb-3 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-violet-600 dark:group-hover:text-violet-400 group-hover:scale-110 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20 transition-all shadow-sm">
            <Plus size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">
            Blank Project
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium px-4">
            Start from scratch with an empty document.
          </p>
        </button>

        {/* Existing Templates */}
        {RESUME_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => handleSelectTemplate(template.id)}
            className="group relative flex flex-col items-start p-0 rounded-xl bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 hover:border-violet-400 dark:hover:border-violet-500/40 hover:shadow-md transition-all duration-300 text-left overflow-hidden shadow-sm min-h-[220px]"
          >
            {/* Template Cover / Image Simulation */}
            <div className="w-full h-32 bg-gray-50 dark:bg-[#0b1120]/50 shrink-0 relative flex items-center justify-center overflow-hidden border-b border-gray-100 dark:border-white/5">
              
              <FileText size={36} className="text-gray-300 dark:text-gray-700/80 group-hover:text-violet-400 dark:group-hover:text-violet-500/80 transition-all duration-300 group-hover:scale-105 drop-shadow-sm" />
              
              {/* Refined "LaTeX" badge */}
              <div className="absolute top-3 right-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-2 py-0.5 rounded-full flex items-center shadow-sm backdrop-blur-sm">
                <span className="text-[9px] font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase">LaTeX</span>
              </div>
            </div>
            
            {/* Info Section */}
            <div className="p-4 flex flex-col flex-1 w-full relative z-10 bg-transparent">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {template.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed line-clamp-2">
                {template.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;
