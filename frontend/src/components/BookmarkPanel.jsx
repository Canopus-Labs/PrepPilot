import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark, Plus, Search, Star, Tag, Trash2, Filter,
  ChevronDown, ChevronUp, Edit3, Save, X, BarChart3,
} from "lucide-react";
import toast from "react-hot-toast";

const CATEGORIES = [
  "DSA", "System Design", "Behavioral", "Aptitude", "Coding",
  "OS", "DBMS", "Networking", "Other",
];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const DIFF_COLOR = { Easy: "text-green-500", Medium: "text-yellow-500", Hard: "text-red-500" };
const CAT_ICON = { DSA: "💻", "System Design": "🏗️", Behavioral: "🗣️", Aptitude: "🧮", Coding: "⌨️", OS: "🖥️", DBMS: "🗃️", Networking: "🌐", Other: "📚" };

// ─── Create Form ─────────────────────────────────────────────────────────────

function CreateForm({ onClose, onCreated }) {
  const [form, setForm] = useState({ question: "", answer: "", category: "DSA", difficulty: "Medium", notes: "", tags: "" });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.question.trim()) return toast.error("Question is required");
    setLoading(true);
    try {
      const tags = form.tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 5);
      await axiosInstance.post("/api/bookmarks", { ...form, tags });
      toast.success("Bookmark saved!");
      onCreated();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally { setLoading(false); }
  };
  const inputCls = "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm";

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 mb-5">
      <h3 className="font-semibold mb-3 dark:text-white text-sm">Add Bookmark</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Question..." rows={2} className={inputCls} />
        <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} placeholder="Answer (optional)" rows={2} className={inputCls} />
        <div className="grid grid-cols-3 gap-3">
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{CAT_ICON[c]} {c}</option>)}
          </select>
          <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className={inputCls}>
            {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags (comma)" className={inputCls} />
        </div>
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Personal notes..." rows={2} className={inputCls} />
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium disabled:opacity-50">{loading ? "Saving..." : "Save"}</button>
          <button type="button" onClick={onClose} className="px-4 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Cancel</button>
        </div>
      </form>
    </motion.div>
  );
}

// ─── Stats Bar ───────────────────────────────────────────────────────────────

function StatsBar({ stats }) {
  if (!stats) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
      {[
        { icon: <Bookmark size={16} className="text-blue-500" />, label: "Total", val: stats.total },
        { icon: <Star size={16} className="text-yellow-500" />, label: "Starred", val: stats.starredCount },
        { icon: <Tag size={16} className="text-purple-500" />, label: "Categories", val: Object.keys(stats.categoryBreakdown).length },
        { icon: <BarChart3 size={16} className="text-green-500" />, label: "Hard Q's", val: stats.difficultyBreakdown.Hard || 0 },
      ].map((c) => (
        <div key={c.label} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 flex items-center gap-2">
          {c.icon}
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{c.val}</div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400">{c.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Bookmark Card ───────────────────────────────────────────────────────────

function BookmarkCard({ bm, onDeleted, onRefresh }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [noteText, setNoteText] = useState(bm.notes);

  const handleStar = async () => {
    try {
      await axiosInstance.patch(`/api/bookmarks/${bm._id}/star`);
      onRefresh();
    } catch { toast.error("Failed"); }
  };
  const handleDelete = async () => {
    if (!window.confirm("Delete this bookmark?")) return;
    try {
      await axiosInstance.delete(`/api/bookmarks/${bm._id}`);
      toast.success("Deleted");
      onDeleted();
    } catch { toast.error("Failed"); }
  };
  const handleSaveNote = async () => {
    try {
      await axiosInstance.put(`/api/bookmarks/${bm._id}`, { notes: noteText });
      setEditing(false);
      toast.success("Note saved");
      onRefresh();
    } catch { toast.error("Failed"); }
  };

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 ${bm.starred ? "border-l-4 border-l-yellow-400" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span>{CAT_ICON[bm.category] || "📚"}</span>
            <span className={`text-[10px] font-bold uppercase ${DIFF_COLOR[bm.difficulty]}`}>{bm.difficulty}</span>
            <span className="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">{bm.category}</span>
          </div>
          <p className="text-sm text-gray-900 dark:text-white font-medium leading-snug">{bm.question}</p>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <button onClick={handleStar} className="p-1 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
            <Star size={15} className={bm.starred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} />
          </button>
          <button onClick={handleDelete} className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
            <Trash2 size={15} className="text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </div>

      {bm.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {bm.tags.map((t) => <span key={t} className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-full">{t}</span>)}
        </div>
      )}

      {(bm.answer || bm.notes) && (
        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2">
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? "Hide" : "Show"} details
        </button>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-2 space-y-2">
            {bm.answer && (
              <div className="text-xs bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Answer: </span>
                <span className="text-gray-600 dark:text-gray-400">{bm.answer}</span>
              </div>
            )}
            <div className="text-xs bg-yellow-50 dark:bg-yellow-900/10 rounded-lg p-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-700 dark:text-gray-300">My Notes</span>
                {!editing && <button onClick={() => setEditing(true)} className="text-blue-500 hover:underline"><Edit3 size={11} /></button>}
              </div>
              {editing ? (
                <div className="flex gap-1">
                  <input value={noteText} onChange={(e) => setNoteText(e.target.value)} className="flex-1 text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none" />
                  <button onClick={handleSaveNote} className="p-1 text-green-500"><Save size={14} /></button>
                  <button onClick={() => { setEditing(false); setNoteText(bm.notes); }} className="p-1 text-gray-400"><X size={14} /></button>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{bm.notes || "No notes yet"}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Panel ──────────────────────────────────────────────────────────────

export default function BookmarkPanel() {
  const [bookmarks, setBookmarks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", difficulty: "", starred: false });
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const fetchBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const params = { page, limit: 15 };
      if (search) params.search = search;
      if (filters.category) params.category = filters.category;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.starred) params.starred = true;

      const [bmRes, statsRes] = await Promise.all([
        axiosInstance.get("/api/bookmarks", { params }),
        axiosInstance.get("/api/bookmarks/stats"),
      ]);
      setBookmarks(bmRes.data.bookmarks || []);
      setPagination(bmRes.data.pagination);
      setStats(statsRes.data.stats || null);
    } catch {
      toast.error("Failed to load bookmarks");
    } finally { setLoading(false); }
  }, [page, search, filters]);

  useEffect(() => { fetchBookmarks(); }, [fetchBookmarks]);
  useEffect(() => { setPage(1); }, [search, filters]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Bookmark size={22} className="text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bookmarks</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Your personal question collection</p>
          </div>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
          <Plus size={16} /> Add
        </button>
      </div>

      <AnimatePresence>{showCreate && <CreateForm onClose={() => setShowCreate(false)} onCreated={fetchBookmarks} />}</AnimatePresence>
      <StatsBar stats={stats} />

      {/* Search & Filter */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions, notes..." className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-1 ${showFilters ? "bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"}`}>
          <Filter size={14} /> Filter
        </button>
        <button onClick={() => setFilters({ ...filters, starred: !filters.starred })} className={`px-3 py-2 rounded-lg border text-sm ${filters.starred ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"}`}>
          <Star size={14} className={filters.starred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} />
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
            <div className="flex gap-2 flex-wrap p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">All categories</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={filters.difficulty} onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })} className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">All difficulties</option>
                {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <button onClick={() => { setFilters({ category: "", difficulty: "", starred: false }); setSearch(""); }} className="px-2 py-1 text-xs text-red-500 hover:underline">Clear all</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bookmarks list */}
      {loading && bookmarks.length === 0 ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />)}</div>
      ) : bookmarks.length === 0 ? (
        <div className="text-center py-14">
          <Bookmark size={40} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{search ? "No bookmarks match your search" : "No bookmarks yet"}</p>
          {!search && <button onClick={() => setShowCreate(true)} className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add First Bookmark</button>}
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {bookmarks.map((bm) => <BookmarkCard key={bm._id} bm={bm} onDeleted={fetchBookmarks} onRefresh={fetchBookmarks} />)}
          </div>
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-5">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-3 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-40">Prev</button>
              <span className="text-xs text-gray-500 dark:text-gray-400">Page {page} of {pagination.pages}</span>
              <button disabled={page >= pagination.pages} onClick={() => setPage(page + 1)} className="px-3 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-40">Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
