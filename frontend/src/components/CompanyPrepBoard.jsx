import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Plus, Search, Filter, Trash2, ChevronDown, ChevronUp,
  CheckCircle2, Circle, Target, Zap,
} from "lucide-react";
import toast from "react-hot-toast";

const STATUSES = [
  { value: "researching", label: "Researching", color: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" },
  { value: "preparing", label: "Preparing", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  { value: "applied", label: "Applied", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
  { value: "interviewing", label: "Interviewing", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
  { value: "offer", label: "Offer", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  { value: "withdrawn", label: "Withdrawn", color: "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400" },
];
const PRIORITIES = { low: "text-gray-400", medium: "text-yellow-500", high: "text-red-500" };
const DIFF_COLOR = { Easy: "text-green-500", Medium: "text-yellow-500", Hard: "text-red-500" };
const STATUS_MAP = Object.fromEntries(STATUSES.map((s) => [s.value, s]));

function CreateForm({ onClose, onCreated }) {
  const [f, setF] = useState({ companyName: "", role: "", priority: "medium", location: "", salaryRange: "", focusTopics: "" });
  const [loading, setLoading] = useState(false);
  const cls = "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!f.companyName.trim() || !f.role.trim()) return toast.error("Company and role are required");
    setLoading(true);
    try {
      const topics = f.focusTopics.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 8);
      await axiosInstance.post("/api/company-prep", { ...f, focusTopics: topics });
      toast.success("Company added!"); onCreated(); onClose();
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
    finally { setLoading(false); }
  };
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 mb-5">
      <h3 className="font-semibold text-sm mb-3 dark:text-white">Add Company</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input value={f.companyName} onChange={(e) => setF({ ...f, companyName: e.target.value })} placeholder="Company name" className={cls} />
          <input value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} placeholder="Target role" className={cls} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <select value={f.priority} onChange={(e) => setF({ ...f, priority: e.target.value })} className={cls}>
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </select>
          <input value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })} placeholder="Location" className={cls} />
          <input value={f.salaryRange} onChange={(e) => setF({ ...f, salaryRange: e.target.value })} placeholder="Salary" className={cls} />
        </div>
        <input value={f.focusTopics} onChange={(e) => setF({ ...f, focusTopics: e.target.value })} placeholder="Focus topics (comma-separated)" className={cls} />
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium disabled:opacity-50">{loading ? "Saving..." : "Add"}</button>
          <button type="button" onClick={onClose} className="px-4 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Cancel</button>
        </div>
      </form>
    </motion.div>
  );
}

function StatsBar({ stats }) {
  if (!stats) return null;
  const items = [
    { icon: <Building2 size={16} className="text-blue-500" />, l: "Companies", v: stats.total },
    { icon: <Target size={16} className="text-green-500" />, l: "Avg Readiness", v: `${stats.avgReadiness}%` },
    { icon: <CheckCircle2 size={16} className="text-purple-500" />, l: "Q's Solved", v: `${stats.solvedQuestions}/${stats.totalQuestions}` },
    { icon: <Zap size={16} className="text-orange-500" />, l: "Rounds Done", v: `${stats.completedRounds}/${stats.totalRounds}` },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
      {items.map((c) => (
        <div key={c.l} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 flex items-center gap-2">
          {c.icon}
          <div><div className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{c.v}</div><div className="text-[10px] text-gray-500">{c.l}</div></div>
        </div>
      ))}
    </div>
  );
}

function CompanyCard({ cp, onRefresh }) {
  const [expanded, setExpanded] = useState(false);
  const [newQ, setNewQ] = useState("");
  const [newRound, setNewRound] = useState("");
  const s = STATUS_MAP[cp.status] || STATUS_MAP.researching;
  const solved = cp.encounteredQuestions?.filter((q) => q.solved).length || 0;
  const totalQ = cp.encounteredQuestions?.length || 0;
  const roundsDone = cp.rounds?.filter((r) => r.completed).length || 0;
  const totalRounds = cp.rounds?.length || 0;

  const updateStatus = async (status) => {
    try { await axiosInstance.put(`/api/company-prep/${cp._id}`, { status }); onRefresh(); } catch { toast.error("Failed"); }
  };
  const updateScore = async (readinessScore) => {
    try { await axiosInstance.put(`/api/company-prep/${cp._id}`, { readinessScore }); onRefresh(); } catch { toast.error("Failed"); }
  };
  const addQuestion = async () => {
    if (!newQ.trim()) return;
    try { await axiosInstance.post(`/api/company-prep/${cp._id}/questions`, { question: newQ }); setNewQ(""); onRefresh(); } catch { toast.error("Failed"); }
  };
  const toggleSolved = async (qid) => {
    try { await axiosInstance.patch(`/api/company-prep/${cp._id}/questions/${qid}/toggle-solved`); onRefresh(); } catch { toast.error("Failed"); }
  };
  const addRound = async () => {
    if (!newRound.trim()) return;
    try { await axiosInstance.post(`/api/company-prep/${cp._id}/rounds`, { name: newRound }); setNewRound(""); onRefresh(); } catch { toast.error("Failed"); }
  };
  const toggleRound = async (rid) => {
    try { await axiosInstance.patch(`/api/company-prep/${cp._id}/rounds/${rid}/toggle-complete`); onRefresh(); } catch { toast.error("Failed"); }
  };
  const handleDelete = async () => {
    if (!window.confirm("Delete this company?")) return;
    try { await axiosInstance.delete(`/api/company-prep/${cp._id}`); toast.success("Deleted"); onRefresh(); } catch { toast.error("Failed"); }
  };

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Building2 size={16} className="text-blue-500 shrink-0" />
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{cp.companyName}</h4>
            <span className={`text-[10px] font-bold ${PRIORITIES[cp.priority]}`}>●</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{cp.role}{cp.location ? ` · ${cp.location}` : ""}</p>
        </div>
        <button onClick={handleDelete} className="p-1 rounded hover:bg-red-100"><Trash2 size={14} className="text-gray-400" /></button>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {STATUSES.map((st) => (
          <button key={st.value} onClick={() => updateStatus(st.value)}
            className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-all ${cp.status === st.value ? st.color + " ring-1 ring-offset-1 ring-gray-300 dark:ring-gray-600" : "bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-gray-600"}`}>
            {st.label}
          </button>
        ))}
      </div>
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-500 dark:text-gray-400">Readiness</span>
          <input type="range" min={0} max={100} value={cp.readinessScore} onChange={(e) => updateScore(Number(e.target.value))} className="w-24 accent-blue-500" />
          <span className="font-semibold text-gray-700 dark:text-gray-300 w-8 text-right">{cp.readinessScore}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div className={`h-2 rounded-full ${cp.readinessScore >= 70 ? "bg-green-500" : cp.readinessScore >= 40 ? "bg-yellow-500" : "bg-red-500"}`}
            initial={{ width: 0 }} animate={{ width: `${cp.readinessScore}%` }} transition={{ duration: 0.6 }} />
        </div>
      </div>
      {cp.focusTopics?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {cp.focusTopics.map((t) => <span key={t} className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-full">{t}</span>)}
        </div>
      )}
      <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
        <span>📝 {solved}/{totalQ} questions</span>
        <span>🎯 {roundsDone}/{totalRounds} rounds</span>
      </div>
      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline">
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />} {expanded ? "Hide" : "Show"} details
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-3 space-y-3">
            <div>
              <h5 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Encountered Questions</h5>
              <div className="flex gap-1 mb-2">
                <input value={newQ} onChange={(e) => setNewQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addQuestion()} placeholder="Add question..." className="flex-1 text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none" />
                <button onClick={addQuestion} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">+</button>
              </div>
              {cp.encounteredQuestions?.map((q) => (
                <div key={q._id} className="flex items-center gap-2 text-xs py-1 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <button onClick={() => toggleSolved(q._id)} className="shrink-0">
                    {q.solved ? <CheckCircle2 size={14} className="text-green-500" /> : <Circle size={14} className="text-gray-400" />}
                  </button>
                  <span className={`flex-1 ${q.solved ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-300"}`}>{q.question}</span>
                  <span className={`text-[10px] font-bold ${DIFF_COLOR[q.difficulty]}`}>{q.difficulty}</span>
                </div>
              ))}
              {(!cp.encounteredQuestions || cp.encounteredQuestions.length === 0) && <p className="text-[10px] text-gray-400">No questions yet</p>}
            </div>
            <div>
              <h5 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Interview Rounds</h5>
              <div className="flex gap-1 mb-2">
                <input value={newRound} onChange={(e) => setNewRound(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addRound()} placeholder="Add round..." className="flex-1 text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none" />
                <button onClick={addRound} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">+</button>
              </div>
              {cp.rounds?.map((r) => (
                <div key={r._id} className="flex items-center gap-2 text-xs py-1 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <button onClick={() => toggleRound(r._id)} className="shrink-0">
                    {r.completed ? <CheckCircle2 size={14} className="text-green-500" /> : <Circle size={14} className="text-gray-400" />}
                  </button>
                  <span className={`flex-1 ${r.completed ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-300"}`}>{r.name}</span>
                </div>
              ))}
              {(!cp.rounds || cp.rounds.length === 0) && <p className="text-[10px] text-gray-400">No rounds yet</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CompanyPrepBoard() {
  const [companies, setCompanies] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (filterStatus) params.status = filterStatus;
      const [cpRes, stRes] = await Promise.all([
        axiosInstance.get("/api/company-prep", { params }),
        axiosInstance.get("/api/company-prep/stats"),
      ]);
      setCompanies(cpRes.data.companyPreps || []);
      setStats(stRes.data.stats || null);
    } catch { toast.error("Failed to load"); }
    finally { setLoading(false); }
  }, [search, filterStatus]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Building2 size={22} className="text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Company Prep Board</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Track interview preparation for each target company</p>
          </div>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
          <Plus size={16} /> Add
        </button>
      </div>
      <AnimatePresence>{showCreate && <CreateForm onClose={() => setShowCreate(false)} onCreated={fetchData} />}</AnimatePresence>
      <StatsBar stats={stats} />
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search companies..." className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button onClick={() => setShowFilter(!showFilter)} className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-1 ${showFilter ? "bg-blue-50 dark:bg-blue-900/30 border-blue-300" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"}`}>
          <Filter size={14} /> Filter
        </button>
      </div>
      <AnimatePresence>
        {showFilter && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
            <div className="flex gap-1.5 flex-wrap p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              {STATUSES.map((st) => (
                <button key={st.value} onClick={() => setFilterStatus(filterStatus === st.value ? "" : st.value)}
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${filterStatus === st.value ? st.color : "bg-gray-200 dark:bg-gray-700 text-gray-500"}`}>
                  {st.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {loading && companies.length === 0 ? (
        <div className="grid gap-4 md:grid-cols-2">{[1, 2, 3, 4].map((i) => <div key={i} className="h-40 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />)}</div>
      ) : companies.length === 0 ? (
        <div className="text-center py-14">
          <Building2 size={40} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{search ? "No companies match" : "No companies tracked yet"}</p>
          {!search && <button onClick={() => setShowCreate(true)} className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add First Company</button>}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {companies.map((cp) => <CompanyCard key={cp._id} cp={cp} onRefresh={fetchData} />)}
        </div>
      )}
    </div>
  );
}
