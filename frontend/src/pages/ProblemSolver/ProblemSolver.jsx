import React, { useEffect, useState } from "react";
import {
  Brain,
  Sparkles,
  Send,
  Loader2,
  Copy,
  Check,
  RotateCcw,
  Download,
  Lightbulb,
  ListOrdered,
  Gauge,
  Terminal,
} from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";

const LANGUAGES = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
];

const EXAMPLES = [
  {
    title: "Two Sum",
    problem:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution, and you may not use the same element twice.",
    constraints: "2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9",
  },
  {
    title: "Reverse Linked List",
    problem:
      "Given the head of a singly linked list, reverse the list and return the new head.",
    constraints: "The number of nodes is in the range [0, 5000].",
  },
  {
    title: "LRU Cache",
    problem:
      "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement get(key) and put(key, value) with O(1) average time complexity.",
    constraints: "1 <= capacity <= 3000, 0 <= key <= 10^4, 0 <= value <= 10^5.",
  },
];

const STORAGE_KEY = "preppilot.problemSolver.history.v1";

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, 5) : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 5)));
  } catch {
    // storage may be unavailable; ignore
  }
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard may be blocked; ignore
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-sm text-gray-400 hover:text-violet-500 transition"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function SectionCard({ icon, title, tone, children }) {
  const Glyph = icon;
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tone}`}>
            <Glyph size={20} />
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function ProblemSolver() {
  const [problem, setProblem] = useState("");
  const [constraints, setConstraints] = useState("");
  const [language, setLanguage] = useState("python");
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(loadHistory);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  function loadExample(example) {
    setProblem(example.problem);
    setConstraints(example.constraints || "");
    setSolution(null);
    setError(null);
  }

  async function solve() {
    if (!problem.trim() || loading) return;

    setLoading(true);
    setError(null);
    setSolution(null);

    try {
      const { data } = await axiosInstance.post(API_PATHS.AI.SOLVE, {
        problem,
        language,
        constraints,
      });

      if (!data.success) {
        throw new Error(
          "The model response could not be parsed into a structured solution. Please try again."
        );
      }

      const next = {
        id: Date.now(),
        title: problem.trim().slice(0, 60),
        language,
        problem,
        constraints,
        solution: data.solution,
        model: data.model,
      };
      setSolution(next);
      setHistory((h) => [next, ...h.filter((item) => item.id !== next.id)]);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to generate solution");
    } finally {
      setLoading(false);
    }
  }

  function downloadCode() {
    const code = solution?.solution?.code || "";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `solution.${language === "python" ? "py" : language === "javascript" || language === "typescript" ? "ts" : "txt"}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function reset() {
    setProblem("");
    setConstraints("");
    setSolution(null);
    setError(null);
  }

  const solutionData = solution?.solution;

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
            <Brain size={34} className="text-violet-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Problem Solver</h1>
            <p className="text-gray-500 mt-2">
              Paste a coding problem and get an interview-style breakdown —
              approach, steps, complexity, and a runnable solution.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Terminal size={22} className="text-violet-600" />
            <h2 className="text-2xl font-bold">Problem</h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.title}
                onClick={() => loadExample(ex)}
                className="text-sm px-3 py-1.5 rounded-full border border-gray-300 dark:border-white/10 text-gray-500 dark:text-gray-300 hover:border-violet-400 hover:text-violet-500 transition"
              >
                <Sparkles size={14} className="inline mr-1 -mt-0.5" />
                {ex.title}
              </button>
            ))}
          </div>

          <textarea
            rows={8}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Paste your coding problem here... e.g. 'Given an array, find the longest increasing subsequence.'"
            className="w-full rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] p-5 outline-none focus:border-violet-400"
          />

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
                Constraints (optional)
              </label>
              <input
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="e.g. 1 <= n <= 10^5"
                className="w-full rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] px-4 py-3 outline-none focus:border-violet-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] px-4 py-3 outline-none focus:border-violet-400"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={solve}
              disabled={!problem.trim() || loading}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {loading ? "Solving..." : "Solve Problem"}
            </button>
            <button
              onClick={reset}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition disabled:opacity-50"
            >
              <RotateCcw size={18} />
              Clear
            </button>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-300 px-5 py-4 text-sm">
              {error}
            </div>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-3 py-12 text-gray-500">
            <Loader2 size={24} className="animate-spin text-violet-500" />
            <span>Breaking down the problem...</span>
          </div>
        )}

        {solutionData && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <SectionCard icon={Lightbulb} title="Approach" tone="bg-violet-100 dark:bg-violet-900/20 text-violet-600">
                <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {solutionData.approach}
                </div>
              </SectionCard>
              <SectionCard icon={ListOrdered} title="Steps" tone="bg-blue-100 dark:bg-blue-900/20 text-blue-600">
                <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-2 list-decimal list-inside leading-relaxed">
                  {solutionData.steps
                    ? solutionData.steps
                        .split("\n")
                        .map((line) => line.replace(/^\s*\d+[.)]\s*/, "").trim())
                        .filter(Boolean)
                        .map((step, idx) => <li key={idx}>{step}</li>)
                    : null}
                </ol>
              </SectionCard>
              <SectionCard icon={Gauge} title="Complexity" tone="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600">
                <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {solutionData.complexity}
                </div>
              </SectionCard>
            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-200">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Solution</h3>
                    <p className="text-xs text-gray-400">
                      {language} {solution?.model ? `· ${solution.model}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <CopyButton text={solutionData.code} />
                  <button
                    onClick={downloadCode}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-violet-500 transition"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
              <pre className="rounded-2xl bg-gray-900 text-gray-100 p-5 overflow-x-auto text-sm leading-relaxed">
                <code>{solutionData.code}</code>
              </pre>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-200">
              Recent solutions
            </h3>
            <div className="flex flex-wrap gap-3">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setProblem(item.problem);
                    setConstraints(item.constraints || "");
                    setLanguage(item.language);
                    setSolution(item);
                    setError(null);
                  }}
                  className="text-left text-sm px-4 py-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111827] text-gray-600 dark:text-gray-300 hover:border-violet-400 transition max-w-xs"
                >
                  <span className="block font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {item.title}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">{item.language}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
