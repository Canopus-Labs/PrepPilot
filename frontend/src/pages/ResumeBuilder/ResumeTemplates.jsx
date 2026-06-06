import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarClock, Check, Edit3, FileText, Plus, RefreshCw, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

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
  const [savedResumes, setSavedResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [busyId, setBusyId] = useState(null);

  const fetchSavedResumes = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setSavedResumes(response.data.resumes || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load saved resumes.");
      toast.error("Failed to load saved resumes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavedResumes();
  }, [fetchSavedResumes]);

  const handleSelectTemplate = (id) => {
    navigate(`/resume-builder/${id}`);
  };

  const handleStartRename = (resume) => {
    setEditingId(resume._id);
    setDraftTitle(resume.title);
  };

  const handleCancelRename = () => {
    setEditingId(null);
    setDraftTitle("");
  };

  const handleRename = async (resumeId) => {
    const title = draftTitle.trim();

    if (!title) {
      toast.error("Resume title cannot be empty");
      return;
    }

    setBusyId(resumeId);
    try {
      const response = await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), { title });
      const updatedResume = response.data.resume;

      setSavedResumes((prev) =>
        prev.map((resume) => (resume._id === resumeId ? updatedResume : resume))
      );
      toast.success("Resume renamed");
      handleCancelRename();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to rename resume");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (resume) => {
    const confirmed = window.confirm(`Delete "${resume.title}"? This cannot be undone.`);

    if (!confirmed) return;

    setBusyId(resume._id);
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resume._id));
      setSavedResumes((prev) => prev.filter((item) => item._id !== resume._id));
      toast.success("Resume deleted");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete resume");
    } finally {
      setBusyId(null);
    }
  };

  const formatDate = (value) => {
    if (!value) return "Recently updated";

    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
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

      {/* Saved Resumes */}
      <section className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Saved Resumes</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Continue editing, rename, or remove your saved LaTeX resumes.
            </p>
          </div>
          <button
            onClick={fetchSavedResumes}
            disabled={isLoading}
            className="h-10 w-10 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#151c2f] text-gray-500 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
            title="Refresh saved resumes"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-300">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#151c2f] px-5 py-4 text-sm font-semibold text-gray-500 dark:text-gray-300 flex items-center gap-2">
            <RefreshCw size={16} className="animate-spin" />
            Loading saved resumes...
          </div>
        ) : savedResumes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 dark:border-white/10 bg-white/70 dark:bg-[#151c2f]/70 px-5 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
            No saved resumes yet. Start from a blank project or choose a template below.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedResumes.map((resume) => {
              const isEditing = editingId === resume._id;
              const isBusy = busyId === resume._id;

              return (
                <div
                  key={resume._id}
                  className="group rounded-xl bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all min-h-[190px] p-5 flex flex-col"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-11 h-11 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0">
                      <FileText size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      {isEditing ? (
                        <input
                          value={draftTitle}
                          onChange={(e) => setDraftTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleRename(resume._id);
                            if (e.key === "Escape") handleCancelRename();
                          }}
                          className="w-full rounded-lg border border-violet-200 dark:border-violet-500/30 bg-gray-50 dark:bg-black/20 px-3 py-2 text-sm font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/30"
                          autoFocus
                        />
                      ) : (
                        <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                          {resume.title}
                        </h3>
                      )}
                      <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        <CalendarClock size={14} />
                        Updated {formatDate(resume.updatedAt)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => navigate(`/resume-builder/${resume._id}`)}
                      disabled={isBusy || isEditing}
                      className="flex-1 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400/60 disabled:cursor-not-allowed text-white text-sm font-bold px-3 py-2 transition"
                    >
                      Open
                    </button>

                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleRename(resume._id)}
                          disabled={isBusy}
                          className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
                          title="Save title"
                        >
                          {isBusy ? <RefreshCw size={16} className="animate-spin" /> : <Check size={16} />}
                        </button>
                        <button
                          onClick={handleCancelRename}
                          disabled={isBusy}
                          className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
                          title="Cancel rename"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStartRename(resume)}
                          disabled={isBusy}
                          className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
                          title="Rename resume"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(resume)}
                          disabled={isBusy}
                          className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
                          title="Delete resume"
                        >
                          {isBusy ? <RefreshCw size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Grid of Templates */}
      <section className="max-w-6xl mx-auto">
        <div className="mb-4">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Templates</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Pick a starting point for a new resume.
          </p>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        
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
      </section>
    </div>
  );
};

export default ResumeTemplates;
