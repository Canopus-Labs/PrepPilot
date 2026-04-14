import React, { useState } from "react";
import { Upload, FileText, Briefcase, Zap, CheckCircle2, AlertTriangle, AlertCircle, X, ChevronRight, RefreshCw, Target } from "lucide-react";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("resume", file);
      if (targetRole.trim()) {
        formData.append("targetRole", targetRole);
      }

      const response = await axiosInstance.post(API_PATHS.RESUME.ANALYZE, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderScoreRing = (score, label, subtitle) => {
    let strokeColor = "text-emerald-500";
    let textGlow = "drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]";
    let statusId = "Excellent";

    if (score < 50) {
      strokeColor = "text-red-500";
      textGlow = "drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]";
      statusId = "Critical";
    } else if (score < 75) {
      strokeColor = "text-amber-500";
      textGlow = "drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]";
      statusId = "Good";
    }

    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center relative group">
        
        <div className="relative w-44 h-44 flex items-center justify-center">

          <svg className="w-full h-full transform -rotate-90 relative z-10 drop-shadow-2xl">
            {/* Track */}
            <circle cx="88" cy="88" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100 dark:text-[#1a233a]" />
            {/* Progress */}
            <circle 
              cx="88" cy="88" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent"
              strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              strokeLinecap="round" className={`${strokeColor} transition-all duration-1500 ease-out`} 
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center z-20">
            <div className="flex items-start">
              <span className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 ${textGlow}`}>
                {score}
              </span>
              <span className="text-sm font-bold text-gray-400 dark:text-gray-500 ml-1 mt-1">%</span>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest mt-1 text-gray-400 dark:text-gray-500">
              {statusId}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center relative z-20 text-center">
          <span className="text-sm font-extrabold text-gray-800 dark:text-gray-100 uppercase tracking-[0.2em]">{label}</span>
          <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-1">{subtitle}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] px-5 py-10 md:px-12 transition-colors duration-300">
      
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 shadow-sm flex items-center justify-center shrink-0">
            <Zap size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              AI Resume Analyzer
            </h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Upload your resume for real-time ATS parsing, scoring, and role-matched AI suggestions.
            </p>
          </div>
        </div>

        {/* Dynamic Display */}
        {!result ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Upload Section */}
            <div className="flex flex-col gap-6">
              
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="relative group w-full h-80 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 bg-white dark:bg-[#151c2f] rounded-3xl transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg"
              >
                <input 
                  type="file" accept="application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                
                {file ? (
                  <div className="flex flex-col items-center text-center px-6">
                    <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 flex items-center justify-center mb-4 shadow-sm">
                      <FileText size={40} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{file.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                    </p>
                    <button 
                      onClick={(e) => { e.preventDefault(); setFile(null); }}
                      className="mt-6 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-700 transition"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center px-6 pointer-events-none">
                    <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center mb-4">
                      <Upload size={40} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Drag & Drop your Resume
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium max-w-xs">
                      Supports PDF format up to 5MB. Or click anywhere to browse your files.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Config & Action Section */}
            <div className="flex flex-col justify-center space-y-8 bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
               
              <div className="space-y-3">
                <label className="text-sm font-bold tracking-wide uppercase text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Briefcase size={16} className="text-indigo-500" />
                  Target Role <span className="text-xs text-gray-400 normal-case font-medium">(Optional)</span>
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Frontend Developer, Data Scientist..."
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium placeholder-gray-400 dark:placeholder-gray-600"
                />
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-3">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
                className={`w-full flex items-center justify-center overflow-hidden gap-3 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-sm ${
                  !file
                    ? "bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : isAnalyzing 
                      ? "bg-indigo-500/50 text-white cursor-wait"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-500/25 hover:shadow-lg active:scale-[0.98]"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw size={20} className="animate-spin" />
                    Analyzing Frameworks & Syntax...
                  </>
                ) : (
                  <>
                    <Zap size={20} className={file ? "animate-pulse" : ""} />
                    Analyze Resume
                  </>
                )}
              </button>

            </div>

          </div>
        ) : (
          /* Results Dashboard */
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out space-y-8">
            
            {/* Top Stat Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 flex flex-col sm:flex-row items-center justify-around bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 md:p-12 border border-gray-200 dark:border-white/5 shadow-xl relative overflow-hidden">
                 {/* Decorative vectors */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"></div>
                 
                 {renderScoreRing(result.resumeScore, "Overall Score", "Based on deep analysis")}
                 
                 <div className="hidden sm:block w-px h-32 bg-gradient-to-b from-transparent via-gray-200 dark:via-white/10 to-transparent mx-8"></div>
                 <div className="sm:hidden h-px w-full max-w-xs bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent my-8"></div>
                 
                 {renderScoreRing(result.roleMatch, "Role Match", `Target: ${targetRole || "General"}`)}
              </div>
              
              <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 border border-gray-200 dark:border-white/5 shadow-xl flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute -right-8 -bottom-8 opacity-5 dark:opacity-[0.03] text-gray-900 dark:text-white transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6 pointer-events-none">
                  <FileText size={180} />
                </div>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center mb-6 shadow-inner relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                  <Target size={28} />
                </div>

                <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 relative z-10">
                  ATS Parse Status
                </h3>
                <div className="relative z-10 space-y-3">
                  <div className={`text-3xl sm:text-4xl font-black tracking-tight ${
                    result.atsCompatibility.status === "Good" ? "text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" :
                    result.atsCompatibility.status === "Average" ? "text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]" : "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                  }`}>
                    {result.atsCompatibility.status}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed pr-4">
                    {result.atsCompatibility.remarks}
                  </p>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* Weaknesses */}
               <div className="space-y-6">
                 {/* Missing Skills */}
                 <div className="bg-white dark:bg-[#151c2f] rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-sm">
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                     <AlertTriangle size={20} className="text-amber-500" /> Critical Skills Missing
                   </h3>
                   {result.missingSkills?.length > 0 ? (
                     <div className="flex flex-wrap gap-2">
                       {result.missingSkills.map((skill, i) => (
                         <span key={i} className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold border border-red-100 dark:border-red-500/20">
                           {skill}
                         </span>
                       ))}
                     </div>
                   ) : (
                     <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No critical missing skills detected for this role!</p>
                   )}
                 </div>

                 {/* Missing Projects */}
                 <div className="bg-white dark:bg-[#151c2f] rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-sm">
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                     <Briefcase size={20} className="text-indigo-500" /> Missing Project Types
                   </h3>
                   <ul className="space-y-3">
                     {result.missingProjects?.length > 0 ? result.missingProjects.map((proj, i) => (
                       <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                         <X size={16} className="text-red-400 shrink-0 mt-0.5" />
                         {proj}
                       </li>
                     )) : (
                       <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Your portfolio perfectly matches role expectations.</p>
                     )}
                   </ul>
                 </div>
               </div>

               {/* Suggestions List */}
               <div className="bg-white dark:bg-[#151c2f] rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-sm flex flex-col h-full">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                   <Zap size={20} className="text-emerald-500" /> Recommended Improvements
                 </h3>
                 <div className="flex-1 space-y-4">
                   {result.suggestions?.map((sug, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                          {sug}
                        </p>
                      </div>
                   ))}
                 </div>

                 <button
                   onClick={() => { setResult(null); setFile(null); setTargetRole(""); }}
                   className="mt-8 w-full py-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-400 hover:text-gray-800 dark:hover:text-white transition-all text-sm uppercase tracking-widest"
                 >
                   Analyze Another Resume
                 </button>
               </div>
               
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ResumeAnalyzer;
