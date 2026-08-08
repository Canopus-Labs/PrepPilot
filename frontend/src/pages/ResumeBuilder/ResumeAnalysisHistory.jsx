import React, { useState, useEffect } from "react";
import { Clock, Briefcase, Zap, CheckCircle2, AlertTriangle, AlertCircle, X, ChevronDown, ChevronUp, FileText, Target } from "lucide-react";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { Link } from "react-router-dom";

const ResumeAnalysisHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ANALYSIS_HISTORY);
      setHistory(response.data.history || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load analysis history.");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderScore = (score) => {
    let colorClass = "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-500/20";
    if (score < 50) {
      colorClass = "text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-500/20";
    } else if (score < 75) {
      colorClass = "text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-500/20";
    }
    return (
      <div className={`px-4 py-2 rounded-xl border font-black text-xl ${colorClass}`}>
        {score}%
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] px-5 py-10 md:px-12 flex items-center justify-center">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] px-5 py-10 md:px-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 shadow-sm flex items-center justify-center shrink-0">
              <Clock size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Analysis History
              </h1>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1 font-medium">
                Track your progress and revisit past resume improvements.
              </p>
            </div>
          </div>
          <Link 
            to="/resume-analyzer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-sm shadow-indigo-500/25"
          >
            <Zap size={18} /> New Analysis
          </Link>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-3">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {history.length === 0 && !error ? (
          <div className="bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 rounded-3xl p-12 text-center shadow-sm flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 mb-4">
              <FileText size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Analysis History Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              You haven't analyzed any resumes yet. Upload a resume to get instant ATS parsing and AI feedback.
            </p>
            <Link 
              to="/resume-analyzer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition text-gray-700 dark:text-gray-200"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((item) => (
              <div key={item._id} className="bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                
                {/* Summary Row */}
                <div 
                  onClick={() => toggleExpand(item._id)}
                  className="p-6 sm:p-8 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6">
                    {renderScore(item.resumeScore)}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Briefcase size={18} className="text-indigo-500" />
                        {item.targetRole || "General"}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium flex items-center gap-2">
                        <Clock size={14} />
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 border-gray-100 dark:border-gray-800 pt-4 sm:pt-0">
                    <div className="flex flex-col items-start sm:items-end">
                       <span className="text-xs uppercase tracking-wider font-bold text-gray-400">ATS Status</span>
                       <span className={`font-bold ${
                         item.atsCompatibility?.status === 'Good' ? 'text-emerald-500' :
                         item.atsCompatibility?.status === 'Average' ? 'text-amber-500' : 'text-red-500'
                       }`}>
                         {item.atsCompatibility?.status || 'Unknown'}
                       </span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition">
                      {expandedId === item._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === item._id && (
                  <div className="p-6 sm:p-8 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#111827] space-y-8 animate-in slide-in-from-top-4 duration-300">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        {/* Missing Skills */}
                        <div className="bg-white dark:bg-[#151c2f] p-6 rounded-2xl border border-gray-200 dark:border-white/5">
                          <h4 className="text-sm font-bold tracking-wide uppercase text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                            <AlertTriangle size={16} className="text-amber-500" /> Missing Skills
                          </h4>
                          {item.missingSkills?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {item.missingSkills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 text-xs font-bold rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">None detected</p>
                          )}
                        </div>

                        {/* Formatting Issues */}
                        {item.formattingIssues?.length > 0 && (
                          <div className="bg-white dark:bg-[#151c2f] p-6 rounded-2xl border border-gray-200 dark:border-white/5">
                            <h4 className="text-sm font-bold tracking-wide uppercase text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                              <AlertCircle size={16} className="text-red-500" /> Formatting Issues
                            </h4>
                            <ul className="space-y-2">
                              {item.formattingIssues.map((issue, i) => (
                                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                  <X size={14} className="text-red-400 mt-1 shrink-0" />
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6">
                        {/* Suggestions */}
                        <div className="bg-white dark:bg-[#151c2f] p-6 rounded-2xl border border-gray-200 dark:border-white/5 h-full">
                          <h4 className="text-sm font-bold tracking-wide uppercase text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                            <Zap size={16} className="text-emerald-500" /> Suggestions
                          </h4>
                          <div className="space-y-3">
                            {item.suggestions?.length > 0 ? item.suggestions.map((sug, i) => (
                               <div key={i} className="flex items-start gap-3">
                                 <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                   {sug}
                                 </p>
                               </div>
                            )) : (
                              <p className="text-sm text-gray-500">No suggestions available.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ResumeAnalysisHistory;
