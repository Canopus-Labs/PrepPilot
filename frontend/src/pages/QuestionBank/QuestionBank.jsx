import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Search,
  Star,
  BookOpen,
  Brain,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axiosInstance from "../../utils/axiosinstance";
import toast from "react-hot-toast";

const QuestionBank = () => {
  const [activeTab, setActiveTab] = useState("mine");
  const [query, setQuery] = useState("");
  const [filterPinned, setFilterPinned] = useState(null);
  const [filterSessionId, setFilterSessionId] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ questions: [], pagination: null });
  const [sessions, setSessions] = useState([]);
  const [aiTopic, setAiTopic] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQuestions, setAiQuestions] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");

  useEffect(() => {
    axiosInstance.get("/api/sessions/my-sessions").then((res) => {
      if (res.data?.success) setSessions(res.data.sessions || []);
    });
  }, []);

  const fetchMyQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pageSize),
      });
      if (filterPinned !== null) params.set("pinned", String(filterPinned));
      if (filterSessionId) params.set("sessionId", filterSessionId);
      if (query.trim()) params.set("q", query.trim());

      const res = await axiosInstance.get(`/api/questions/my-questions?${params}`);
      if (res.data?.success) setData(res.data);
    } catch {
      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, filterPinned, filterSessionId, query]);

  useEffect(() => {
    if (activeTab === "mine") fetchMyQuestions();
  }, [activeTab, fetchMyQuestions]);

  const handlePin = async (q) => {
    try {
      await axiosInstance.post(`/api/questions/${q._id}/pin`);
      fetchMyQuestions();
      toast.success(q.isPinned ? "Unpinned" : "Pinned");
    } catch {
      toast.error("Failed to toggle pin");
    }
  };

  const handleSaveNote = async (q) => {
    try {
      await axiosInstance.post(`/api/questions/${q._id}/note`, { note: noteDraft });
      setEditingNoteId(null);
      fetchMyQuestions();
      toast.success("Note saved");
    } catch {
      toast.error("Failed to save note");
    }
  };

  const handleGenerateAi = async () => {
    const topic = aiTopic.trim();
    if (!topic) return;
    setAiLoading(true);
    try {
      const res = await axiosInstance.get(`/api/questions?topic=${encodeURIComponent(topic)}`);
      setAiQuestions(res.data?.questions || []);
      toast.success(`Generated ${(res.data?.questions || []).length} questions`);
    } catch {
      toast.error("AI generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSaveAiToSession = async (aiQ, sessionId) => {
    try {
      await axiosInstance.post("/api/questions/add", {
        sessionId,
        questions: [{ question: aiQ.question, answer: aiQ.answer }],
      });
      fetchMyQuestions();
      toast.success("Saved to session");
    } catch {
      toast.error("Failed to save");
    }
  };

  const sessionsWithQuestions = useMemo(() => {
    return sessions.filter((s) => (data.questions || []).some((q) => q.session?._id === s._id));
  }, [sessions, data.questions]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-dark)]">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-500 dark:text-violet-300 flex items-center justify-center">
              <Brain size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Question Bank</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Browse your session questions and generate AI aptitude problems.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "mine", label: "My Questions", icon: BookOpen },
            { id: "ai", label: "AI Aptitude", icon: Brain },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  active
                    ? "bg-violet-500 text-white border-violet-500"
                    : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "mine" && (
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
              <div className="relative w-full md:w-80 flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search question, answer, note..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/70"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={filterPinned === null ? "" : String(filterPinned)}
                  onChange={(e) => setFilterPinned(e.target.value === "" ? null : e.target.value === "true")}
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/70"
                >
                  <option value="">All</option>
                  <option value="true">Pinned</option>
                  <option value="false">Unpinned</option>
                </select>
                <select
                  value={filterSessionId}
                  onChange={(e) => setFilterSessionId(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/70 min-w-[180px]"
                >
                  <option value="">All Sessions</option>
                  {sessionsWithQuestions.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.role} – {s.topicsToFocus?.slice(0, 2).join(", ") || "General"}
                    </option>
                  ))}
                </select>
                {(filterPinned !== null || filterSessionId || query.trim()) && (
                  <button
                    type="button"
                    onClick={() => {
                      setFilterPinned(null);
                      setFilterSessionId("");
                      setQuery("");
                    }}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <X size={14} /> Clear
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={24} className="animate-spin text-violet-500" />
              </div>
            ) : data.questions.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No questions yet.</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Create a session and add questions, or generate some with AI.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-white/10">
                        <th className="py-2.5 px-3 font-semibold">Question</th>
                        <th className="py-2.5 px-3 font-semibold">Answer</th>
                        <th className="py-2.5 px-3 font-semibold">Session</th>
                        <th className="py-2.5 px-3 font-semibold text-center">Pinned</th>
                        <th className="py-2.5 px-3 font-semibold">Note</th>
                        <th className="py-2.5 px-3 font-semibold">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.questions.map((q) => (
                        <tr key={q._id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                          <td className="py-2.5 px-3 max-w-xs">
                            <div className="font-medium text-gray-900 dark:text-white truncate">{q.question}</div>
                          </td>
                          <td className="py-2.5 px-3 max-w-xs text-gray-600 dark:text-gray-300 truncate">
                            {q.answer}
                          </td>
                          <td className="py-2.5 px-3">
                            {q.session && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs">
                                <BookOpen size={10} />
                                {q.session.role}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => handlePin(q)}
                              className={`p-1 rounded transition-colors ${
                                q.isPinned
                                  ? "text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                                  : "text-gray-300 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-white/5"
                              }`}
                              aria-label={q.isPinned ? "Unpin" : "Pin"}
                            >
                              <Star size={16} fill={q.isPinned ? "currentColor" : "none"} />
                            </button>
                          </td>
                          <td className="py-2.5 px-3 max-w-sm">
                            {editingNoteId === q._id ? (
                              <div className="flex gap-1">
                                <input
                                  value={noteDraft}
                                  onChange={(e) => setNoteDraft(e.target.value)}
                                  placeholder="Add a note..."
                                  className="flex-1 px-2 py-1 rounded border border-gray-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/70"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSaveNote(q)}
                                  className="px-2 py-1 rounded bg-violet-500 text-white text-xs hover:bg-violet-600 transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingNoteId(null)}
                                  className="px-2 py-1 rounded text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingNoteId(q._id);
                                  setNoteDraft(q.note || "");
                                }}
                                className={`w-full text-left truncate px-2 py-1 rounded ${
                                  q.note
                                    ? "text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10"
                                    : "text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
                                } transition-colors`}
                              >
                                {q.note || "Add note…"}
                              </button>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {q.createdAt && new Date(q.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {data.pagination && data.pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Page {data.pagination.page} of {data.pagination.totalPages} ({data.pagination.totalItems} total)
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                        disabled={page === data.pagination.totalPages}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === "ai" && (
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <input
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Enter a topic (e.g., Probability, Graphs, Dynamic Programming)"
                  className="w-full pl-3 pr-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/70"
                />
              </div>
              <button
                onClick={handleGenerateAi}
                disabled={aiLoading || !aiTopic.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 disabled:opacity-50 transition-colors"
              >
                {aiLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Brain size={16} />
                    Generate
                  </>
                )}
              </button>
            </div>

            {aiQuestions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Generated Questions ({aiQuestions.length})
                </h3>
                {aiQuestions.map((q, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="font-medium text-gray-900 dark:text-white flex-1">
                        {idx + 1}. {q.question}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      <strong>Answer:</strong> {q.answer}
                    </p>
                    <div className="flex items-center gap-2">
                      <select
                        defaultValue=""
                        onChange={(e) => e.target.value && handleSaveAiToSession(q, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/70"
                      >
                        <option value="">Save to session…</option>
                        {sessions.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.role} – {s.topicsToFocus?.slice(0, 2).join(", ") || "General"}
                          </option>
                        ))}
                      </select>
                    </div>
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

export default QuestionBank;