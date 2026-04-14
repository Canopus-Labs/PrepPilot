import React, { useState } from "react";
import { BASE_URL } from "../../utils/apiPaths";
import {
  Lightbulb,
  Layers,
  Cpu,
  Coffee,
  Globe,
  Server,
  Rocket,
  Sparkles,
  Github,
  ChevronRight,
  RefreshCw,
  Code2,
  BookOpen,
  Star,
  Zap,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────
const DOMAINS = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
  },
  {
    id: "fullstack",
    label: "Full Stack",
    icon: Layers,
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
  },
  {
    id: "ai",
    label: "AI / ML",
    icon: Cpu,
    color: "from-fuchsia-500 to-pink-500",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
    text: "text-fuchsia-400",
  },
  {
    id: "java",
    label: "Java",
    icon: Coffee,
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-400",
  },
  {
    id: "devops",
    label: "DevOps / Cloud",
    icon: Rocket,
    color: "from-rose-500 to-red-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-400",
  },
];

const LEVELS = [
  {
    id: "Beginner",
    desc: "Build confidence with guided, simple projects",
    star: 1,
  },
  {
    id: "Intermediate",
    desc: "Apply core concepts with moderate complexity",
    star: 2,
  },
  {
    id: "Advanced",
    desc: "Production-grade, portfolio-worthy challenges",
    star: 3,
  },
];

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────
function buildRequestBody(domainLabel, level) {
  // Backend schema: prompt(max 500), role(max 50), topic(max 100) — all required
  return {
    role: `${level} ${domainLabel} developer`,
    topic: `${domainLabel} project ideas for ${level} level`,
    prompt: `List 3 ${level} ${domainLabel} project ideas as JSON array. Each: {title, tagline, techStack:[], features:[], githubSearch, difficulty, domain}. Return only valid JSON array.`,
  };
}

function tryParseJSON(text) {
  try {
    // strip markdown code fences if the model added them
    const cleaned = text.replace(/```json|```/gi, "").trim();
    const match = cleaned.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────
const StarRating = ({ count }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3].map((n) => (
      <Star
        key={n}
        size={13}
        className={
          n <= count ? "text-amber-400 fill-amber-400" : "text-gray-700"
        }
      />
    ))}
  </div>
);

const IdeaCard = ({ idea, domain, index }) => {
  const domainCfg = DOMAINS.find(
    (d) => d.id.toLowerCase() === (idea.domain || domain).toLowerCase(),
  );
  const gradientClass = domainCfg?.color || "from-violet-500 to-fuchsia-500";
  const bgClass = domainCfg?.bg || "bg-violet-500/10";
  const borderClass = domainCfg?.border || "border-violet-500/30";
  const textClass = domainCfg?.text || "text-violet-400";

  return (
    <div className="flex flex-col bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-300 dark:hover:border-white/20 h-full">
      {/* Color accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradientClass}`} />

      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm bg-gradient-to-br ${gradientClass}`}
            >
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                {idea.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {idea.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <StarRating
              count={LEVELS.find((l) => l.id === idea.difficulty)?.star || 1}
            />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {idea.difficulty}
            </span>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Layers
              size={14}
              className="text-gray-600 dark:text-gray-400"
              strokeWidth={1.5}
            />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(idea.techStack || []).map((tech) => (
              <span
                key={tech}
                className={`text-xs font-medium px-2.5 py-1 rounded-md border ${bgClass} ${borderClass} ${textClass}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <Zap
              size={14}
              className="text-gray-600 dark:text-gray-400"
              strokeWidth={1.5}
            />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
              Features
            </span>
          </div>
          <ul className="space-y-1.5 text-sm">
            {(idea.features || []).slice(0, 3).map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
              >
                <ChevronRight
                  size={14}
                  className="text-gray-400 dark:text-gray-600 shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* GitHub Link */}
        <a
          href={`https://github.com/search?q=${encodeURIComponent(idea.githubSearch || idea.title)}&type=repositories`}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center gap-2 w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium transition-all ${bgClass} ${borderClass} ${textClass} hover:opacity-80`}
        >
          <Github size={14} strokeWidth={1.5} />
          <span className="flex-1 truncate text-xs">Find on GitHub</span>
          <ChevronRight size={14} strokeWidth={1.5} className="shrink-0" />
        </a>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────
const ProjectIdeas = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generated, setGenerated] = useState(false);

  const canGenerate = selectedDomain && selectedLevel && !loading;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setError(null);
    setIdeas([]);
    setGenerated(false);

    try {
      const prompt = buildPrompt(
        DOMAINS.find((d) => d.id === selectedDomain)?.label || selectedDomain,
        selectedLevel,
      );

      const res = await fetch(`${BASE_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      // collect the full streamed response
      let fullText = "";
      if (res.body && typeof res.body.getReader === "function") {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        while (!done) {
          const { value, done: d } = await reader.read();
          done = d;
          if (value) fullText += decoder.decode(value, { stream: !done });
        }
      } else {
        const data = await res.json();
        fullText = data.text || "";
      }

      const parsed = tryParseJSON(fullText);
      if (parsed && Array.isArray(parsed) && parsed.length > 0) {
        setIdeas(parsed);
        setGenerated(true);
      } else {
        setError("The AI returned an unexpected format. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIdeas([]);
    setGenerated(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white px-4 sm:px-6 lg:px-8 py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ── Header Section ── */}
        <div className="space-y-4 border-b border-gray-200 dark:border-white/10 pb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-violet-500/15 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20 flex items-center justify-center shrink-0">
              <Lightbulb size={24} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Project Ideas Generator
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
                Generate customized project ideas based on your domain and skill
                level. Explore features, tech stacks, and GitHub references.
              </p>
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        {!generated ? (
          <div className="space-y-8">
            {/* Domain Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Code2
                  size={18}
                  className="text-violet-600 dark:text-violet-400"
                  strokeWidth={1.5}
                />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Choose Your Domain
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {DOMAINS.map((d) => {
                  const Icon = d.icon;
                  const active = selectedDomain === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDomain(d.id)}
                      className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                        active
                          ? `border-violet-500 bg-violet-50 dark:bg-violet-500/10`
                          : "border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${active ? "bg-violet-600 dark:bg-violet-600" : `bg-gradient-to-br ${d.color}`}`}
                      >
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <span
                        className={`text-sm font-semibold text-center leading-tight ${active ? "text-violet-600 dark:text-violet-400" : "text-gray-700 dark:text-gray-300"}`}
                      >
                        {d.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Level Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen
                  size={18}
                  className="text-violet-600 dark:text-violet-400"
                  strokeWidth={1.5}
                />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Select Your Level
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {LEVELS.map((lv) => {
                  const active = selectedLevel === lv.id;
                  return (
                    <button
                      key={lv.id}
                      onClick={() => setSelectedLevel(lv.id)}
                      className={`flex flex-col gap-3 p-5 rounded-lg border-2 text-left transition-all duration-200 ${
                        active
                          ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10"
                          : "border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm font-bold uppercase tracking-widest ${active ? "text-violet-600 dark:text-violet-400" : "text-gray-600 dark:text-gray-400"}`}
                        >
                          {lv.id}
                        </span>
                        <StarRating count={lv.star} />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {lv.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={`flex items-center gap-2.5 px-8 py-3 rounded-lg text-base font-semibold transition-all ${
                  canGenerate
                    ? "bg-violet-600 dark:bg-violet-600 hover:bg-violet-700 dark:hover:bg-violet-700 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600 cursor-not-allowed"
                }`}
              >
                <Sparkles size={18} strokeWidth={1.5} />
                {loading ? "Generating Ideas…" : "Generate Project Ideas"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                {(() => {
                  const d = DOMAINS.find((x) => x.id === selectedDomain);
                  const Icon = d?.icon;
                  return (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                      {Icon && <Icon size={16} strokeWidth={1.5} />} {d?.label}
                    </span>
                  );
                })()}
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30">
                  <StarRating
                    count={
                      LEVELS.find((l) => l.id === selectedLevel)?.star || 1
                    }
                  />
                  {selectedLevel}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/30 transition-all"
              >
                <RefreshCw size={16} strokeWidth={1.5} /> New Search
              </button>
            </div>

            {/* Ideas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea, i) => (
                <IdeaCard
                  key={i}
                  idea={idea}
                  domain={selectedDomain}
                  index={i}
                />
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex justify-center gap-3 pt-6 border-t border-gray-200 dark:border-white/10">
              <button
                onClick={handleGenerate}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-all"
              >
                <RefreshCw size={16} strokeWidth={1.5} /> Regenerate
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-semibold transition-all"
              >
                <X size={16} strokeWidth={1.5} /> Clear All
              </button>
            </div>
          </>
        )}

        {/* ── Loading State ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden animate-pulse"
              >
                <div className="h-1 bg-gray-300 dark:bg-white/10" />
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-300 dark:bg-white/10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4" />
                      <div className="h-3 bg-gray-300 dark:bg-white/10 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div
                        key={j}
                        className="h-3 bg-gray-300 dark:bg-white/10 rounded"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Error Message ── */}
        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg p-4 text-red-700 dark:text-red-400 text-sm font-medium">
            <div className="flex gap-3">
              <div className="text-lg">⚠️</div>
              <div>{error}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectIdeas;
