import { useState, useEffect, useCallback, useMemo } from "react";
import axiosInstance from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers, Plus, Trash2, Camera, ChevronDown, ChevronUp,
  BarChart3, Target, TrendingUp, AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

const CATEGORIES = ["DSA", "System Design", "Languages", "Frameworks", "Databases", "DevOps", "Behavioral", "Aptitude", "Other"];
const CAT_COLORS = {
  DSA: "#3b82f6", "System Design": "#8b5cf6", Languages: "#10b981", Frameworks: "#f59e0b",
  Databases: "#ef4444", DevOps: "#06b6d4", Behavioral: "#ec4899", Aptitude: "#84cc16", Other: "#6b7280",
};

// ─── Pure SVG Radar Chart ────────────────────────────────────────────────────

function RadarChart({ skills, size = 280 }) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 30;
  const n = skills.length;
  if (n < 3) return <p className="text-xs text-gray-400 text-center py-6">Add at least 3 skills to see the radar chart</p>;

  const angleStep = (2 * Math.PI) / n;
  const levels = [2, 4, 6, 8, 10];

  const getPoint = (i, value) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = (value / 10) * radius;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const skillPoints = skills.map((s, i) => getPoint(i, s.proficiency));
  const targetPoints = skills.filter((s) => s.targetProficiency > 0).map((s) => {
    const idx = skills.indexOf(s);
    return getPoint(idx, s.targetProficiency);
  });

  const skillPath = skillPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
  const targetPath = targetPoints.length >= 3
    ? targetPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z"
    : null;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {/* Grid rings */}
      {levels.map((level) => {
        const pts = skills.map((_, i) => getPoint(i, level));
        const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
        return <path key={level} d={d} fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-gray-700" />;
      })}
      {/* Axis lines */}
      {skills.map((_, i) => {
        const p = getPoint(i, 10);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-gray-700" />;
      })}
      {/* Target area */}
      {targetPath && (
        <path d={targetPath} fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 2" />
      )}
      {/* Skill area */}
      <path d={skillPath} fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
      {/* Data points */}
      {skillPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={CAT_COLORS[skills[i].category] || "#3b82f6"} stroke="white" strokeWidth="1.5" />
      ))}
      {/* Labels */}
      {skills.map((s, i) => {
        const p = getPoint(i, 11.5);
        const anchor = p.x < cx - 5 ? "end" : p.x > cx + 5 ? "start" : "middle";
        return (
          <text key={i} x={p.x} y={p.y} textAnchor={anchor} dominantBaseline="middle"
            className="text-[9px] fill-gray-600 dark:fill-gray-400" style={{ fontSize: 9 }}>
            {s.name}
          </text>
        );
      })}
      {/* Level labels */}
      {levels.map((level) => {
        const p = getPoint(0, level);
        return (
          <text key={level} x={p.x + 4} y={p.y - 4} className="text-[7px] fill-gray-400" style={{ fontSize: 7 }}>
            {level}
          </text>
        );
      })}
    </svg>
  );
}

// ─── Add Skill Form ──────────────────────────────────────────────────────────

function AddSkillForm({ onAdd, existingNames }) {
  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState(5);
  const [category, setCategory] = useState("Other");
  const [target, setTarget] = useState(0);
  const cls = "w-full px-2 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs outline-none focus:ring-1 focus:ring-blue-500";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name required");
    if (existingNames.includes(name.toLowerCase())) return toast.error("Skill already exists");
    onAdd({ name: name.trim(), proficiency, category, targetProficiency: target, notes: "" });
    setName(""); setProficiency(5); setTarget(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Skill name" className={cls} />
      <div className="grid grid-cols-3 gap-2">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={cls}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <div>
          <label className="text-[10px] text-gray-500 dark:text-gray-400">Current: {proficiency}</label>
          <input type="range" min={0} max={10} value={proficiency} onChange={(e) => setProficiency(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div>
          <label className="text-[10px] text-gray-500 dark:text-gray-400">Target: {target}</label>
          <input type="range" min={0} max={10} value={target} onChange={(e) => setTarget(Number(e.target.value))} className="w-full accent-yellow-500" />
        </div>
      </div>
      <button type="submit" className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium">Add Skill</button>
    </form>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SkillRadar() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [chartSize, setChartSize] = useState(280);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/skills");
      setProfile(res.data.profile || { skills: [], snapshots: [] });
    } catch { toast.error("Failed to load profile"); }
    finally { setLoading(false); }
  }, []);

  const fetchAnalysis = useCallback(async () => {
    try {
      const [aRes, hRes] = await Promise.all([
        axiosInstance.get("/api/skills/analysis"),
        axiosInstance.get("/api/skills/history"),
      ]);
      setAnalysis(aRes.data.analysis || null);
      setHistory(hRes.data.snapshots || []);
    } catch { toast.error("Failed to load analysis"); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleAddSkill = async (data) => {
    try {
      await axiosInstance.post("/api/skills", data);
      toast.success("Skill added"); fetchData();
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const handleUpdateSkill = async (skillId, updates) => {
    try {
      await axiosInstance.put(`/api/skills/${skillId}`, updates);
      fetchData();
    } catch { toast.error("Failed"); }
  };

  const handleDeleteSkill = async (skillId) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await axiosInstance.delete(`/api/skills/${skillId}`);
      toast.success("Deleted"); fetchData();
    } catch { toast.error("Failed"); }
  };

  const handleSnapshot = async () => {
    try {
      await axiosInstance.post("/api/skills/snapshot");
      toast.success("Snapshot saved"); fetchData();
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const skills = profile?.skills || [];
  const existingNames = skills.map((s) => s.name.toLowerCase());

  const avgProf = useMemo(() => {
    if (skills.length === 0) return 0;
    return Math.round((skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length) * 10) / 10;
  }, [skills]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Layers size={22} className="text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Skill Profiler</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Visualize and track your technical skill proficiency</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSnapshot} disabled={skills.length === 0}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium disabled:opacity-40">
            <Camera size={14} /> Snapshot
          </button>
          <button onClick={() => { setShowAdd(!showAdd); }}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
            <Plus size={14} /> Skill
          </button>
        </div>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-4">
            <AddSkillForm onAdd={handleAddSkill} existingNames={existingNames} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Skill Radar</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">Avg: {avgProf}/10</span>
          </div>
          {loading ? (
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
          ) : skills.length < 3 ? (
            <div className="h-64 flex flex-col items-center justify-center text-gray-400">
              <Layers size={32} className="mb-2 opacity-50" />
              <p className="text-xs">Add at least 3 skills to see the radar</p>
            </div>
          ) : (
            <RadarChart skills={skills} size={chartSize} />
          )}
        </div>

        {/* Skills List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Skills ({skills.length})
          </h3>
          {loading ? (
            <div className="space-y-2">{[1, 2, 3].map((i) => <div key={i} className="h-10 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />)}</div>
          ) : skills.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-8">No skills added yet</p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {skills.map((s) => (
                <div key={s._id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: CAT_COLORS[s.category] || "#6b7280" }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-900 dark:text-white truncate">{s.name}</span>
                      <span className="text-[10px] text-gray-500 shrink-0">{s.category}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <input type="range" min={0} max={10} value={s.proficiency}
                        onChange={(e) => handleUpdateSkill(s._id, { proficiency: Number(e.target.value) })}
                        className="flex-1 h-1 accent-blue-500" />
                      <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 w-5 text-right">{s.proficiency}</span>
                      {s.targetProficiency > 0 && (
                        <span className="text-[10px] text-yellow-500">→{s.targetProficiency}</span>
                      )}
                      <button onClick={() => handleDeleteSkill(s._id)} className="p-0.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded">
                        <Trash2 size={10} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gap Analysis */}
      <div className="mt-5">
        <button onClick={() => { setShowAnalysis(!showAnalysis); if (!showAnalysis) fetchAnalysis(); }}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          {showAnalysis ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <BarChart3 size={16} /> Gap Analysis
        </button>
        <AnimatePresence>
          {showAnalysis && analysis && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                {/* Category breakdown */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">By Category</h4>
                  <div className="space-y-2">
                    {Object.entries(analysis.byCategory)
                      .sort(([, a], [, b]) => b.avg - a.avg)
                      .map(([cat, data]) => (
                        <div key={cat} className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-600 dark:text-gray-400 w-20 truncate">{cat}</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="h-1.5 rounded-full transition-all" style={{ width: `${data.avg * 10}%`, backgroundColor: CAT_COLORS[cat] || "#6b7280" }} />
                          </div>
                          <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 w-6 text-right">{data.avg}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Top gaps */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-1">
                    <AlertTriangle size={12} /> Top Gaps
                  </h4>
                  {analysis.gaps.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-4">Set target proficiencies to see gaps</p>
                  ) : (
                    <div className="space-y-2">
                      {analysis.gaps.slice(0, 6).map((g) => (
                        <div key={g.name} className="flex items-center gap-2 text-xs">
                          <span className="text-gray-700 dark:text-gray-300 truncate w-24">{g.name}</span>
                          <span className="text-gray-400">{g.current}→{g.target}</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                            <div className="h-1 bg-red-400 rounded-full" style={{ width: `${g.gap * 10}%` }} />
                          </div>
                          <span className="text-red-500 font-bold">-{g.gap}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Snapshot History */}
      <div className="mt-5">
        <button onClick={() => { setShowHistory(!showHistory); if (!showHistory) fetchAnalysis(); }}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          {showHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <TrendingUp size={16} /> Snapshot History ({history.length})
        </button>
        <AnimatePresence>
          {showHistory && history.length > 0 && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="mt-3 space-y-2">
                {[...history].reverse().map((snap) => {
                  const avg = snap.skills.length > 0
                    ? Math.round((snap.skills.reduce((s, sk) => s + sk.proficiency, 0) / snap.skills.length) * 10) / 10
                    : 0;
                  return (
                    <div key={snap._id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div>
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {new Date(snap.recordedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="text-[10px] text-gray-500 ml-2">{snap.skills.length} skills</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Avg: {avg}</span>
                        <div className="flex gap-0.5">
                          {snap.skills.slice(0, 5).map((sk, i) => (
                            <div key={i} className="w-1.5 rounded-full" style={{ height: `${sk.proficiency * 3}px`, backgroundColor: CAT_COLORS[sk.category] || "#6b7280" }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
