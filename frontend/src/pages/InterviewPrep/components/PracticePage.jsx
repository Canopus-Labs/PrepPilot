import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import AptitudeQuestionCard from "../../../components/Cards/AptitudeQuestionCard";
import Loader from "../../../components/Loader/Loader";

import axiosInstance from "../../../utils/axiosinstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { BrainCircuit, LineChart, Calculator, Dices, BookOpen, Puzzle, Grid3x3 } from "lucide-react";

// ─── Grid Memory Game ──────────────────────────────────────────────────────────
const LEVELS = [
  { rows: 3, cols: 4, colored: 6,  preview: 4, time: 20 },
  { rows: 3, cols: 5, colored: 9,  preview: 4, time: 22 },
  { rows: 4, cols: 5, colored: 12, preview: 4, time: 25 },
  { rows: 4, cols: 6, colored: 15, preview: 3, time: 25 },
  { rows: 4, cols: 7, colored: 18, preview: 3, time: 28 },
  { rows: 5, cols: 7, colored: 22, preview: 3, time: 30 },
  { rows: 5, cols: 8, colored: 26, preview: 2, time: 30 },
  { rows: 6, cols: 8, colored: 30, preview: 2, time: 32 },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildGrid(lvl) {
  const { rows, cols, colored } = LEVELS[lvl];
  const total = rows * cols;
  const positions = shuffle([...Array(total).keys()]);
  const coloredSet = new Set(positions.slice(0, colored));
  return Array.from({ length: total }, (_, i) => ({
    colored: coloredSet.has(i), clicked: false, state: "idle",
  }));
}

const GridMemoryGame = () => {
  const [phase, setPhase] = useState("start");
  const [level, setLevel] = useState(0);
  const [grid, setGrid] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const previewRef = useRef(null);

  const clearTimers = () => { clearTimeout(timerRef.current); clearTimeout(previewRef.current); };

  const startLevel = useCallback((lvl) => {
    clearTimers();
    const newGrid = buildGrid(lvl);
    setLevel(lvl); setGrid(newGrid); setMistakes(0); setScore(0);
    setRemaining(LEVELS[lvl].colored); setTimeLeft(LEVELS[lvl].time);
    setPhase("preview");
  }, []);

  useEffect(() => {
    if (phase !== "preview") return;
    previewRef.current = setTimeout(() => {
      setGrid((g) => g.map((c) => ({ ...c, state: "idle" })));
      setPhase("playing");
    }, LEVELS[level].preview * 1000);
    return () => clearTimeout(previewRef.current);
  }, [phase, level]);

  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) { setPhase("timeup"); return; }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [phase, timeLeft]);

  useEffect(() => () => clearTimers(), []);

  const handleCellClick = (i) => {
    if (phase !== "playing") return;
    const cell = grid[i];
    if (cell.clicked) return;
    setGrid((g) => g.map((c, idx) => idx === i ? { ...c, clicked: true, state: c.colored ? "correct" : "wrong" } : c));
    if (cell.colored) {
      const nr = remaining - 1; const ns = score + 10;
      setRemaining(nr); setScore(ns);
      if (nr === 0) { clearTimers(); setPhase("won"); }
    } else {
      const nm = mistakes + 1; setMistakes(nm);
      if (nm >= 3) { clearTimers(); setPhase("lost"); }
    }
  };

  const lvl = LEVELS[level];
  const pct = lvl ? (timeLeft / lvl.time) * 100 : 0;
  const isLast = level >= LEVELS.length - 1;
  const CELL = 58;

  const cellClass = (c) => {
    if (phase === "preview") return c.colored ? "bg-violet-600" : "bg-gray-200 dark:bg-white/10";
    if (c.state === "correct") return "bg-emerald-500";
    if (c.state === "wrong") return "bg-red-500";
    return "bg-gray-200 dark:bg-white/10 hover:bg-violet-300 dark:hover:bg-violet-700/50 cursor-pointer";
  };

  // Start screen
  if (phase === "start") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-5">🧠</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Grid Memory Challenge</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mx-auto mb-8">
          Purple cells will flash briefly — memorise their positions, then click them all from memory.
          3 wrong clicks = game over. Beat all 8 levels!
        </p>
        <button
          onClick={() => startLevel(0)}
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-10 py-3 rounded-full transition-colors shadow"
        >
          Start Game →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Level progress */}
      <div className="flex gap-1 mb-5">
        {LEVELS.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${
            i < level ? "bg-violet-600" : i === level ? "bg-violet-400" : "bg-gray-200 dark:bg-white/10"
          }`} />
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[["Mistakes", `${mistakes}/3`], ["Remaining", remaining], ["Score", score], ["Time", `${timeLeft}s`]].map(([label, val]) => (
          <div key={label} className={`bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm font-semibold ${
            label === "Time" && timeLeft <= 5 ? "text-red-500" : "text-gray-800 dark:text-gray-100"
          }`}>
            <span className="text-gray-400 font-normal">{label} </span>{val}
          </div>
        ))}
        <div className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20 rounded-lg px-3 py-1.5 text-sm font-bold ml-auto">
          Level {level + 1} / {LEVELS.length}
        </div>
      </div>

      {/* Timer bar */}
      {(phase === "playing" || phase === "preview") && (
        <div className="h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mb-4 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 linear ${timeLeft <= 5 ? "bg-red-500" : "bg-violet-500"}`}
            style={{ width: `${pct}%` }} />
        </div>
      )}

      {/* Phase label */}
      <p className="text-center text-xs font-semibold text-violet-500 dark:text-violet-400 mb-5 h-4">
        {phase === "preview" ? "Memorise the purple cells…" : phase === "playing" ? "Click all the purple cells!" : ""}
      </p>

      {/* Grid */}
      <div className="mx-auto w-fit" style={{
        display: "grid",
        gridTemplateColumns: `repeat(${lvl.cols}, ${CELL}px)`,
        gap: "7px",
      }}>
        {grid.map((c, i) => (
          <div key={i} onClick={() => handleCellClick(i)}
            className={`rounded-lg transition-all duration-150 ${cellClass(c)} ${c.clicked ? "cursor-default" : ""}`}
            style={{ width: CELL, height: CELL }}
          />
        ))}
      </div>

      {/* Result panel */}
      {(phase === "won" || phase === "lost" || phase === "timeup") && (
        <div className="mt-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center shadow-sm">
          <div className="text-5xl mb-4">
            {phase === "won" ? (isLast ? "🏆" : "🎉") : phase === "lost" ? "❌" : "⏰"}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {phase === "won" ? (isLast ? "All levels complete!" : `Level ${level + 1} complete!`)
              : phase === "lost" ? "Too many mistakes!" : "Time's up!"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            {phase === "won"
              ? `Found all ${lvl.colored} cells with ${mistakes} mistake${mistakes !== 1 ? "s" : ""}. Score: ${score}`
              : phase === "lost"
              ? `You made 3 mistakes on Level ${level + 1}. Study the pattern and try again.`
              : `Ran out of time on Level ${level + 1}. ${remaining} cell${remaining !== 1 ? "s" : ""} left to find.`}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {phase === "won" && !isLast && (
              <button onClick={() => startLevel(level + 1)}
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-2.5 rounded-full transition-colors text-sm shadow">
                Next Level →
              </button>
            )}
            {phase === "won" && isLast && (
              <button onClick={() => startLevel(0)}
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-2.5 rounded-full transition-colors text-sm shadow">
                🔁 Play Again
              </button>
            )}
            <button onClick={() => startLevel(level)}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-white font-semibold px-6 py-2.5 rounded-full transition-colors text-sm">
              🔄 Retry
            </button>
            {phase !== "won" && (
              <button onClick={() => setPhase("start")}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-white font-semibold px-6 py-2.5 rounded-full transition-colors text-sm">
                Start Over
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Topic data ────────────────────────────────────────────────────────────────
const topicsData = [
  { name: "Logical Reasoning",     icon: BrainCircuit, desc: "Test your analytical and logical thinking abilities." },
  { name: "Data Interpretation",   icon: LineChart,    desc: "Analyze and interpret data from charts and graphs." },
  { name: "Quantitative Aptitude", icon: Calculator,   desc: "Sharpen your mathematical and numerical calculation skills." },
  { name: "Probability",           icon: Dices,        desc: "Master the concepts of chance, odds, and likelihood." },
  { name: "Verbal ability",        icon: BookOpen,     desc: "Improve your grammar, vocabulary, and comprehension." },
  { name: "Puzzles",               icon: Puzzle,       desc: "Solve complex brain teasers and lateral thinking puzzles." },
  { name: "Grid Memory",           icon: Grid3x3,      desc: "Train spatial recall by memorising and clicking coloured cell patterns.", isGame: true },
];

// ─── PracticePage ──────────────────────────────────────────────────────────────
const PracticePage = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleTopicClick = async (topic) => {
    if (!user) { navigate("/login"); return; }
    if (topic.isGame) { setSelectedTopic(topic); return; }
    setSelectedTopic(topic);
    setLoading(true);
    setQuestions([]);
    try {
      const res = await axiosInstance.get(`${API_PATHS.APTITUDE.GENERATE}?topic=${topic.name}`);
      setQuestions(res.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to generate questions.");
    }
    setLoading(false);
  };

  const handleBack = () => { setSelectedTopic(null); setQuestions([]); };

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
      <main className="flex-1 container mx-auto px-4 py-10 md:py-16">

        {/* Hero — hidden when a topic is selected */}
        <div className={`text-center mb-12 transition-colors duration-300 ${selectedTopic ? "hidden" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Practice Cognitive Skills
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto md:text-lg">
            Sharpen your logical reasoning, quantitative, and verbal skills with curated aptitude tests and exercises.
          </p>
        </div>

        {/* Topics grid */}
        {!selectedTopic && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 max-w-[1400px] mx-auto">
            {topicsData.map((topic) => {
              const Icon = topic.icon;
              return (
                <button
                  key={topic.name}
                  onClick={() => handleTopicClick(topic)}
                  className="group flex flex-col items-start sm:flex-row sm:items-center gap-4 md:gap-5 p-5 md:p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-500/40 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-all duration-300 text-left w-full shadow-sm hover:shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-300 group-hover:bg-violet-100 group-hover:text-violet-600 dark:group-hover:bg-violet-600/30 dark:group-hover:text-violet-400 transition-colors duration-300">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex flex-col mt-2 sm:mt-0 flex-1">
                    <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                      {topic.name}
                    </h3>
                    <p className="text-[13px] md:text-sm text-gray-500 dark:text-gray-400 leading-snug line-clamp-2">
                      {topic.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Active topic header — same for all topics including Grid Memory */}
        {selectedTopic && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
              Practicing: <span className="text-violet-600 dark:text-violet-400">{selectedTopic.name}</span>
            </h2>
            <button
              className="bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-300 flex items-center gap-2"
              onClick={handleBack}
            >
              ← Choose Another Topic
            </button>
          </div>
        )}

        {/* Grid Memory game — inline, no modal */}
        {selectedTopic?.isGame && <GridMemoryGame />}

        {/* Quiz loading & questions */}
        {!selectedTopic?.isGame && (
          <>
            {loading && <Loader />}
            {questions.length > 0 && (
              <>
                <div className="space-y-4">
                  {questions.map((q, idx) => (
                    <AptitudeQuestionCard key={idx} question={q.question} options={q.options} answer={q.answer} />
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-full font-semibold shadow transition"
                    disabled={loading || !selectedTopic}
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const res = await axiosInstance.get(`${API_PATHS.APTITUDE.GENERATE}?topic=${selectedTopic.name}`);
                        setQuestions((prev) => [...prev, ...res.data]);
                      } catch (error) {
                        console.error("Error fetching questions:", error);
                        alert("Failed to generate more questions.");
                      }
                      setLoading(false);
                    }}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default PracticePage;
