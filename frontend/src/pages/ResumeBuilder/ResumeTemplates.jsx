import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Plus, Clock, Trash2, Pencil } from "lucide-react";
import moment from "moment";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

export const RESUME_TEMPLATES = [
  {
    id: "jakes-resume",
    name: "Jake's Resume",
    description: "A clean, basic, and widely accepted professional template perfect for software engineers.",
  },
  {
    id: "deedy-cv",
    name: "Deedy CV",
    description: "A popular two-column layout for experienced professionals and researchers.",
  },
  {
    id: "harvard-pro",
    name: "Harvard Professional",
    description: "The classic, conservative single-column format favored by top consulting and finance firms.",
  },
];

const ResumeTemplates = () => {
  const navigate = useNavigate();
  const [savedResumes, setSavedResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchResumes = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setSavedResumes(res.data?.resumes || []);
    } catch {
      // not logged in or fetch failed — just show empty
    } finally {
      setLoadingResumes(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (e, resumeId) => {
    e.stopPropagation();
    if (!window.confirm("Delete this resume? This cannot be undone.")) return;
    setDeletingId(resumeId);
    try {
      await axiosInstance.delete(`/api/resume/${resumeId}`);
      setSavedResumes(prev => prev.filter(r => r._id !== resumeId));
      toast.success("Resume deleted.");
    } catch {
      toast.error("Failed to delete resume.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] text-gray-900 dark:text-white px-5 md:px-12 py-10 transition-colors duration-300">

      {/* Header */}
      <div className="mb-10 max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Resume Builder</h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Create a flawless, professional resume using our Overleaf-powered LaTeX editor.
            </p>
          </div>
        </div>
      </div>

      {/* ── Templates ── */}
      <section className="max-w-6xl mx-auto mb-14">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-5">
          Start from a template
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

          {/* Blank */}
          <button onClick={() => navigate("/resume-builder/blank")}
            className="group flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-[#151c2f] border-2 border-dashed border-gray-200 dark:border-white/10 hover:border-violet-500/50 dark:hover:border-violet-500/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-center min-h-[220px] shadow-sm hover:shadow-md">
            <div className="w-12 h-12 mb-3 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-violet-500 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20 transition-all">
              <Plus size={24} />
            </div>
            <h3 className="text-base font-bold mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">Blank Project</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 px-4">Start from scratch with an empty document.</p>
          </button>

          {/* Template cards */}
          {RESUME_TEMPLATES.map((t) => (
            <button key={t.id} onClick={() => navigate(`/resume-builder/${t.id}`)}
              className="group flex flex-col rounded-xl bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 hover:border-violet-400 dark:hover:border-violet-500/40 hover:shadow-md transition-all text-left overflow-hidden shadow-sm min-h-[220px]">
              <div className="w-full h-32 bg-gray-50 dark:bg-[#0b1120]/50 flex items-center justify-center relative border-b border-gray-100 dark:border-white/5">
                <FileText size={36} className="text-gray-300 dark:text-gray-700 group-hover:text-violet-400 transition-all group-hover:scale-105" />
                <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-2 py-0.5 rounded-full">LaTeX</span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold mb-1 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">{t.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{t.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Saved Resumes ── */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            My Saved Resumes
          </h2>
          {savedResumes.length > 0 && (
            <span className="text-xs text-gray-400">{savedResumes.length} resume{savedResumes.length !== 1 ? "s" : ""}</span>
          )}
        </div>

        {loadingResumes ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1, 2, 3].map(n => (
              <div key={n} className="animate-pulse bg-white dark:bg-white/5 border border-gray-200 dark:border-white/8 rounded-xl h-[140px]" />
            ))}
          </div>
        ) : savedResumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 rounded-xl border border-dashed border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-center">
            <FileText size={32} className="text-gray-300 dark:text-white/20 mb-3" />
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">No saved resumes yet</p>
            <p className="text-xs text-gray-400 mt-1">Pick a template above and hit "Save" in the editor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {savedResumes.map(r => (
              <div key={r._id}
                className="group relative flex flex-col bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/8 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-violet-400/40 dark:hover:border-violet-500/40 transition-all cursor-pointer"
                onClick={() => navigate(`/resume-builder/${r._id}`)}>

                {/* Solid purple top strip */}
                <div className="h-1.5 w-full bg-violet-600" />

                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0">
                        <FileText size={15} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{r.title || "Untitled"}</p>
                        <div className="flex items-center gap-1 mt-0.5 text-[11px] text-gray-400">
                          <Clock size={10} />
                          <span>{moment(r.updatedAt).fromNow()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons — visible on hover */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={e => { e.stopPropagation(); navigate(`/resume-builder/${r._id}`); }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-violet-400 hover:bg-violet-500/10 transition-colors"
                        title="Edit">
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={e => handleDelete(e, r._id)}
                        disabled={deletingId === r._id}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default ResumeTemplates;
