import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sparkles,
  Clock,
  Layers,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { BASE_URL, API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";

/* ────────────────────────────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────────────────────────────── */

const formatBytes = (bytes) => {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

// Labels shown while the real backend request is in flight. The upload
// stage tracks real multipart upload progress (via axios onUploadProgress);
// the remaining stages advance on a timer since the AI/parse work happens
// server-side and doesn't report incremental progress.
const PROCESSING_STAGES = [
  "Uploading document…",
  "Validating PDF & extracting text…",
  "Identifying key topics…",
  "Estimating difficulty & prerequisites…",
  "Generating summary & outcomes…",
];

/* ────────────────────────────────────────────────────────────────────────
   Small presentational bits
   ──────────────────────────────────────────────────────────────────────── */

const SectionCard = ({ icon: Icon, title, subtitle, children, className = "" }) => (
  <div
    className={`bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 space-y-4 ${className}`}
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-300 flex items-center justify-center shrink-0">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{subtitle}</p>
        )}
      </div>
    </div>
    {children}
  </div>
);

const Chip = ({ children, tone = "violet" }) => {
  const tones = {
    violet:
      "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-500/20",
    gray:
      "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

const highlightText = (text, term) => {
  if (!term.trim()) return text;
  const safe = term.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${safe})`, "ig"));
  return parts.map((part, i) =>
    part.toLowerCase() === term.trim().toLowerCase() ? (
      <mark
        key={i}
        className="bg-amber-200 dark:bg-amber-500/40 text-inherit rounded px-0.5"
      >
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

/* ────────────────────────────────────────────────────────────────────────
   Main component
   ──────────────────────────────────────────────────────────────────────── */

const NotesSummarizer = () => {
  const [sourceMode, setSourceMode] = useState("upload"); // "upload" | "platform"

  // Upload state
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Platform picker state
  const [platformCategories, setPlatformCategories] = useState([]);
  const [platformLoading, setPlatformLoading] = useState(false);
  const [platformError, setPlatformError] = useState(null);
  const [selectedPlatformDoc, setSelectedPlatformDoc] = useState(null);
  const [platformSearch, setPlatformSearch] = useState("");
  const [expandedFolders, setExpandedFolders] = useState({});

  // Processing / result state
  const [isProcessing, setIsProcessing] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Result UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);
  const [savedSummaries, setSavedSummaries] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /* Load the user's saved summaries from the backend on mount */
  const fetchSavedSummaries = async () => {
    try {
      setSavedLoading(true);
      const { data } = await axiosInstance.get(API_PATHS.NOTES_SUMMARY.GET_ALL);
      setSavedSummaries(data.summaries || []);
    } catch (err) {
      console.error("Failed to load saved summaries:", err);
    } finally {
      setSavedLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedSummaries();
  }, []);

  /* Fetch platform PDFs lazily when that tab is opened, keeping them
     clubbed inside their originating folder (category) */
  const fetchPlatformDocs = async () => {
    if (platformCategories.length || platformLoading) return;
    try {
      setPlatformLoading(true);
      setPlatformError(null);
      const res = await fetch(`${BASE_URL}/api/books`);
      if (!res.ok) throw new Error("Unable to load platform notes right now.");
      const data = await res.json();
      const categories = (data.categories || []).map((cat, idx) => ({
        id: cat.id || `${cat.title}-${idx}`,
        title: cat.title,
        items: (cat.items || []).map((item) => ({
          name: item.name,
          category: cat.title,
          url: item.url,
        })),
      }));
      setPlatformCategories(categories);
      // Expand the first folder by default so the picker isn't empty-looking
      if (categories[0]) {
        setExpandedFolders({ [categories[0].id]: true });
      }
    } catch (err) {
      setPlatformError(err.message || "Could not load notes from the platform.");
    } finally {
      setPlatformLoading(false);
    }
  };

  useEffect(() => {
    if (sourceMode === "platform") fetchPlatformDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceMode]);

  // Folders (and the PDFs inside them) filtered by the search bar. A folder
  // whose title matches keeps all its PDFs; otherwise only matching PDFs
  // inside it are kept.
  const filteredPlatformCategories = useMemo(() => {
    const term = platformSearch.trim().toLowerCase();
    if (!term) return platformCategories;

    return platformCategories
      .map((cat) => {
        const folderMatches = cat.title.toLowerCase().includes(term);
        const items = folderMatches
          ? cat.items
          : cat.items.filter((item) => item.name.toLowerCase().includes(term));
        return { ...cat, items };
      })
      .filter((cat) => cat.items.length > 0);
  }, [platformCategories, platformSearch]);

  // Auto-expand every folder that currently has search matches so results
  // aren't hidden behind a collapsed header.
  useEffect(() => {
    if (!platformSearch.trim()) return;
    setExpandedFolders((prev) => {
      const next = { ...prev };
      filteredPlatformCategories.forEach((cat) => {
        next[cat.id] = true;
      });
      return next;
    });
  }, [platformSearch, filteredPlatformCategories]);

  const toggleFolder = (id) =>
    setExpandedFolders((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalPlatformDocCount = useMemo(
    () => platformCategories.reduce((acc, cat) => acc + cat.items.length, 0),
    [platformCategories]
  );

  /* Upload handlers */
  const acceptFile = (candidate) => {
    if (!candidate) return;
    if (candidate.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }
    if (candidate.size > 15 * 1024 * 1024) {
      setError("File is too large. Please upload a PDF under 15MB.");
      return;
    }
    setError(null);
    setFile(candidate);
    setSelectedPlatformDoc(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    acceptFile(e.dataTransfer.files?.[0]);
  };

  const handleFileChange = (e) => acceptFile(e.target.files?.[0]);

  const activeSourceLabel = useMemo(() => {
    if (sourceMode === "upload" && file) return file.name;
    if (sourceMode === "platform" && selectedPlatformDoc) return selectedPlatformDoc.name;
    return null;
  }, [sourceMode, file, selectedPlatformDoc]);

  const canAnalyze =
    (sourceMode === "upload" && !!file) ||
    (sourceMode === "platform" && !!selectedPlatformDoc);

  /* Real AI processing pipeline — uploads/fetches the PDF, then Gemini
     analyzes it server-side (see backend/controllers/notesSummaryController.js) */
  const handleAnalyze = async () => {
    if (!canAnalyze || isProcessing) return;
    setError(null);
    setResult(null);
    setIsSaved(false);
    setSearchTerm("");
    setIsProcessing(true);
    setStageIndex(0);
    setProgress(0);

    // While the server does the (un-trackable) parsing + AI work, nudge the
    // stage indicator forward on a timer so the UI doesn't look frozen.
    let stageTimer = null;
    const advanceStages = () => {
      stageTimer = setInterval(() => {
        setStageIndex((prev) => Math.min(PROCESSING_STAGES.length - 1, prev + 1));
        setProgress((prev) => Math.min(92, prev + 12));
      }, 900);
    };

    try {
      let response;
      if (sourceMode === "upload") {
        const formData = new FormData();
        formData.append("pdf", file);

        response = await axiosInstance.post(API_PATHS.NOTES_SUMMARY.SUMMARIZE, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (evt) => {
            if (!evt.total) return;
            // Upload itself only accounts for the first stage/~30% of the bar;
            // the rest represents server-side parsing + AI generation.
            const uploadPct = Math.round((evt.loaded / evt.total) * 30);
            setProgress(uploadPct);
            if (evt.loaded >= evt.total) {
              setStageIndex(1);
              advanceStages();
            }
          },
        });
      } else {
        setStageIndex(1);
        advanceStages();
        response = await axiosInstance.post(API_PATHS.NOTES_SUMMARY.SUMMARIZE, {
          url: selectedPlatformDoc.url,
          fileName: selectedPlatformDoc.name,
        });
      }

      if (stageTimer) clearInterval(stageTimer);
      setProgress(100);
      setStageIndex(PROCESSING_STAGES.length - 1);
      setResult(response.data);
    } catch (err) {
      if (stageTimer) clearInterval(stageTimer);
      console.error("Summarize error:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to summarize the PDF. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const resetFlow = () => {
    setFile(null);
    setSelectedPlatformDoc(null);
    setResult(null);
    setError(null);
    setProgress(0);
    setStageIndex(0);
    setSearchTerm("");
    setIsSaved(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* Result actions */
  const buildExportText = (r) =>
    `${r.fileName}\n` +
    `Generated: ${new Date(r.generatedAt).toLocaleString()}\n\n` +
    `SUMMARY\n${r.summary}\n\n` +
    `TOPICS COVERED\nChapters: ${r.topics.chapters.join(", ")}\nSubtopics: ${r.topics.subtopics.join(", ")}\nKeywords: ${r.topics.keywords.join(", ")}\n\n` +
    `PREREQUISITES\n${r.prerequisites.map((p) => `- ${p}`).join("\n")}\n\n` +
    `DIFFICULTY LEVEL\n${r.difficulty.level} — ${r.difficulty.explanation}\n\n` +
    `ESTIMATED READING TIME\n${r.readingTime.label} (~${r.readingTime.pages} pages)\n\n` +
    `LEARNING OUTCOMES\n${r.learningOutcomes.map((o) => `- ${o}`).join("\n")}\n`;

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(buildExportText(result));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Couldn't copy to clipboard. Try downloading instead.");
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([buildExportText(result)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.fileName.replace(/\.pdf$/i, "")}-summary.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    if (!result || isSaving) return;
    setIsSaving(true);
    setError(null);
    try {
      const payload = {
        fileName: result.fileName,
        sourceType: result.sourceType,
        sourceUrl: result.sourceUrl ?? null,
        pageCount: result.pageCount ?? 0,
        wordCount: result.wordCount ?? 0,
        contentHash: result.contentHash ?? null,
        summary: result.summary,
        topics: result.topics,
        prerequisites: result.prerequisites,
        difficulty: result.difficulty,
        readingTime: result.readingTime,
        learningOutcomes: result.learningOutcomes,
      };
      await axiosInstance.post(API_PATHS.NOTES_SUMMARY.SAVE, payload);
      setIsSaved(true);
      fetchSavedSummaries();
    } catch (err) {
      console.error("Save summary error:", err);
      setError(err.response?.data?.message || "Failed to save this summary. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSaved = async (id) => {
    const previous = savedSummaries;
    setSavedSummaries((prev) => prev.filter((s) => s._id !== id));
    try {
      await axiosInstance.delete(API_PATHS.NOTES_SUMMARY.DELETE(id));
    } catch (err) {
      console.error("Delete summary error:", err);
      setSavedSummaries(previous); // roll back on failure
    }
  };

  const loadSavedSummary = (entry) => {
    setResult({
      ...entry,
      generatedAt: entry.generatedAt || entry.updatedAt || entry.createdAt,
    });
    setSourceMode("upload");
    setFile(null);
    setSelectedPlatformDoc(null);
    setIsSaved(true);
    setSearchTerm("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ──────────────────────────────────────────────────────────────────── */

  return (
    <div className="min-h-full bg-[var(--color-background)] text-[var(--color-text-dark)]">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-violet-500/10 text-violet-500 dark:text-violet-300 flex items-center justify-center">
              <Sparkles size={22} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">AI PDF Notes Summarizer</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload any PDF notes and instantly get a summary, topics covered,
                prerequisites, difficulty level, and learning outcomes.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl border border-red-200 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-200">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!result && !isProcessing && (
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 space-y-6">
            {/* Source tabs */}
            <div className="inline-flex p-1 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
              <button
                onClick={() => setSourceMode("upload")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  sourceMode === "upload"
                    ? "bg-white dark:bg-white/10 text-violet-600 dark:text-violet-300 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                }`}
              >
                Upload PDF
              </button>
              <button
                onClick={() => setSourceMode("platform")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  sourceMode === "platform"
                    ? "bg-white dark:bg-white/10 text-violet-600 dark:text-violet-300 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                }`}
              >
                Choose from Notes & Books
              </button>
            </div>

            {/* Upload dropzone */}
            {sourceMode === "upload" && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center text-center gap-3 h-64 rounded-2xl border-2 border-dashed cursor-pointer transition-colors ${
                  isDragging
                    ? "border-violet-500 bg-violet-50/50 dark:bg-violet-500/10"
                    : "border-gray-300 dark:border-white/10 hover:border-violet-400 dark:hover:border-violet-400/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 text-violet-500 dark:text-violet-300 flex items-center justify-center">
                  <UploadCloud size={26} />
                </div>
                {file ? (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/10">
                    <FileText size={16} className="text-violet-500" />
                    <span className="text-sm font-semibold max-w-xs truncate">{file.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatBytes(file.size)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-semibold">
                      Drag & drop your PDF here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Supports PDF files up to 15MB
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Platform picker */}
            {sourceMode === "platform" && (
              <div className="space-y-3">
                {!platformLoading && !platformError && platformCategories.length > 0 && (
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      value={platformSearch}
                      onChange={(e) => setPlatformSearch(e.target.value)}
                      placeholder="Search folders or PDFs…"
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/70"
                    />
                  </div>
                )}

                {platformLoading && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 py-8 justify-center">
                    <Loader2 size={16} className="animate-spin" />
                    Loading notes from the platform…
                  </div>
                )}

                {!platformLoading && platformError && (
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-300 py-6 justify-center">
                    <AlertCircle size={16} />
                    {platformError}
                  </div>
                )}

                {!platformLoading && !platformError && platformCategories.length === 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 py-8 justify-center">
                    <FolderOpen size={16} />
                    No platform notes available right now.
                  </div>
                )}

                {!platformLoading && platformCategories.length > 0 && (
                  <>
                    {filteredPlatformCategories.length === 0 ? (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 py-8 justify-center">
                        <Search size={16} />
                        No folders or PDFs match “{platformSearch}”.
                      </div>
                    ) : (
                      <div className="max-h-80 overflow-y-auto custom-scrollbar space-y-2 pr-1">
                        {filteredPlatformCategories.map((cat) => {
                          const isOpen = !!expandedFolders[cat.id];
                          return (
                            <div
                              key={cat.id}
                              className="rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden"
                            >
                              {/* Folder header */}
                              <button
                                onClick={() => toggleFolder(cat.id)}
                                className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-left"
                              >
                                <div className="w-9 h-9 rounded-lg bg-violet-500/10 text-violet-500 dark:text-violet-300 flex items-center justify-center shrink-0">
                                  <FolderOpen size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold truncate">{cat.title}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {cat.items.length} PDF{cat.items.length === 1 ? "" : "s"}
                                  </p>
                                </div>
                                {isOpen ? (
                                  <ChevronUp size={16} className="text-gray-400 shrink-0" />
                                ) : (
                                  <ChevronDown size={16} className="text-gray-400 shrink-0" />
                                )}
                              </button>

                              {/* Folder contents */}
                              {isOpen && (
                                <div className="p-2 space-y-1.5 bg-white dark:bg-transparent">
                                  {cat.items.map((doc) => {
                                    const active = selectedPlatformDoc?.name === doc.name;
                                    return (
                                      <button
                                        key={`${doc.category}-${doc.name}`}
                                        onClick={() => {
                                          setSelectedPlatformDoc(doc);
                                          setFile(null);
                                        }}
                                        className={`w-full flex items-center gap-3 p-2.5 rounded-lg border text-left transition-colors ${
                                          active
                                            ? "border-violet-400 bg-violet-50/60 dark:bg-violet-500/10"
                                            : "border-transparent hover:border-violet-300 dark:hover:border-violet-400/40 hover:bg-violet-50/30 dark:hover:bg-violet-500/5"
                                        }`}
                                      >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300 shrink-0">
                                          <FileText size={14} />
                                        </div>
                                        <p className="flex-1 min-w-0 text-sm font-medium truncate">
                                          {doc.name}
                                        </p>
                                        {active && (
                                          <CheckCircle2 size={16} className="text-violet-500 shrink-0" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <p className="text-xs text-gray-400 text-right">
                      {totalPlatformDocCount} PDF{totalPlatformDocCount === 1 ? "" : "s"} across{" "}
                      {platformCategories.length} folder{platformCategories.length === 1 ? "" : "s"}
                    </p>
                  </>
                )}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${
                !canAnalyze
                  ? "bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-700 text-white shadow-sm hover:shadow-lg active:scale-[0.99]"
              }`}
            >
              <Sparkles size={17} />
              Summarize Notes
              {activeSourceLabel && <ChevronRight size={15} />}
            </button>
          </div>
        )}

        {/* Processing state */}
        {isProcessing && (
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-10 flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 text-violet-500 dark:text-violet-300 flex items-center justify-center">
              <Loader2 size={28} className="animate-spin" />
            </div>
            <div>
              <p className="font-semibold">{PROCESSING_STAGES[stageIndex]}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Analyzing “{activeSourceLabel}”
              </p>
            </div>
            <div className="w-full max-w-sm h-2 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full bg-violet-500 transition-all duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">{progress}%</p>
          </div>
        )}

        {/* Results */}
        {result && !isProcessing && (
          <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-300 flex items-center justify-center shrink-0">
                  <FileText size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{result.fileName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Generated {new Date(result.generatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-400/50 transition-colors"
                >
                  {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-400/50 transition-colors"
                >
                  <Download size={14} />
                  Download
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaved || isSaving}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                    isSaved
                      ? "border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10"
                      : "border-gray-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-400/50"
                  }`}
                >
                  {isSaving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : isSaved ? (
                    <BookmarkCheck size={14} />
                  ) : (
                    <Bookmark size={14} />
                  )}
                  {isSaving ? "Saving…" : isSaved ? "Saved" : "Save"}
                </button>
                <button
                  onClick={resetFlow}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-400/50 transition-colors"
                >
                  <RotateCcw size={14} />
                  New Summary
                </button>
              </div>
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 flex items-center gap-3">
                <Clock size={18} className="text-violet-500" />
                <div>
                  <p className="text-sm font-bold">{result.readingTime.label}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Est. reading time</p>
                </div>
              </div>
              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 flex items-center gap-3">
                <Layers size={18} className="text-violet-500" />
                <div>
                  <p className="text-sm font-bold">{result.difficulty.level}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Difficulty level</p>
                </div>
              </div>
              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 flex items-center gap-3">
                <BookOpen size={18} className="text-violet-500" />
                <div>
                  <p className="text-sm font-bold">{result.topics.chapters.length} chapters</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Topics identified</p>
                </div>
              </div>
              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 flex items-center gap-3">
                <ListChecks size={18} className="text-violet-500" />
                <div>
                  <p className="text-sm font-bold">{result.learningOutcomes.length} outcomes</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Learning outcomes</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Smart summary with search-within */}
              <SectionCard
                icon={Sparkles}
                title="Smart Summary"
                subtitle="Main topics, concepts & purpose"
                className="md:col-span-2"
              >
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search within summary…"
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/70"
                  />
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {highlightText(result.summary, searchTerm)}
                </p>
              </SectionCard>

              {/* Topics covered */}
              <SectionCard icon={BookOpen} title="Topics Covered" subtitle="Chapters, subtopics & keywords">
                <div className="space-y-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1.5">
                      Major Chapters
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.topics.chapters.map((c) => (
                        <Chip key={c}>{c}</Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1.5">
                      Subtopics
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.topics.subtopics.map((s) => (
                        <Chip key={s} tone="gray">{s}</Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1.5">
                      Keywords
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.topics.keywords.map((k) => (
                        <span
                          key={k}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300"
                        >
                          <Tag size={10} />
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Prerequisites */}
              <SectionCard icon={Layers} title="Prerequisites Required" subtitle="What to know beforehand">
                <ul className="space-y-2">
                  {result.prerequisites.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle2 size={14} className="text-violet-500 shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              {/* Difficulty */}
              <SectionCard icon={Layers} title="Difficulty Level" subtitle="Estimated complexity rating">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                      result.difficulty.level === "Beginner"
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20"
                        : result.difficulty.level === "Intermediate"
                        ? "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-500/20"
                        : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-100 dark:border-red-500/20"
                    }`}
                  >
                    {result.difficulty.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {result.difficulty.explanation}
                </p>
              </SectionCard>

              {/* Reading time */}
              <SectionCard icon={Clock} title="Estimated Reading Time" subtitle="Based on length & complexity">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-violet-600 dark:text-violet-300">
                    {result.readingTime.label}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ~{result.readingTime.pages} pages at an average study pace.
                </p>
              </SectionCard>

              {/* Learning outcomes */}
              <SectionCard icon={GraduationCap} title="Learning Outcomes" subtitle="After completing these notes">
                <ul className="space-y-2">
                  {result.learningOutcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-violet-500/10 text-violet-500 dark:text-violet-300 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={12} />
                      </div>
                      {o}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>
          </div>
        )}

        {/* Saved summaries */}
        {(savedSummaries.length > 0 || savedLoading) && !isProcessing && (
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Bookmark size={16} className="text-violet-500" />
              <h3 className="text-sm font-bold">Saved Summaries</h3>
              {!savedLoading && (
                <span className="text-xs text-gray-400">({savedSummaries.length})</span>
              )}
            </div>
            {savedLoading && savedSummaries.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 py-4 justify-center">
                <Loader2 size={16} className="animate-spin" />
                Loading saved summaries…
              </div>
            ) : (
              <div className="space-y-2">
                {savedSummaries.map((s) => (
                  <div
                    key={s._id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-400/40 transition-colors"
                  >
                    <button
                      onClick={() => loadSavedSummary(s)}
                      className="flex items-center gap-3 flex-1 min-w-0 text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300 shrink-0">
                        <FileText size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{s.fileName}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {s.difficulty.level} • {s.readingTime.label} • saved{" "}
                          {new Date(s.updatedAt || s.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={() => handleDeleteSaved(s._id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors shrink-0"
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesSummarizer;