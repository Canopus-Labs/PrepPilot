import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Grid3x3 } from "lucide-react";

// ─── Game config ───────────────────────────────────────────────────────────────
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
    colored: coloredSet.has(i),
    clicked: false,
    state: "idle", // idle | correct | wrong
  }));
}

// ─── Component ─────────────────────────────────────────────────────────────────
const GridMemoryGame = ({ onClose }) => {
  const [phase, setPhase] = useState("start"); // start | preview | playing | won | lost | timeup
  const [level, setLevel] = useState(0);
  const [grid, setGrid] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const timerRef = useRef(null);
  const previewRef = useRef(null);

  const clearTimers = () => {
    clearTimeout(timerRef.current);
    clearTimeout(previewRef.current);
  };

  const startLevel = useCallback((lvl) => {
    clearTimers();
    const newGrid = buildGrid(lvl);
    setLevel(lvl);
    setGrid(newGrid);
    setMistakes(0);
    setScore(0);
    setRemaining(LEVELS[lvl].colored);
    setTimeLeft(LEVELS[lvl].time);
    setPhase("preview");
  }, []);

  // Preview → playing
  useEffect(() => {
    if (phase !== "preview") return;
    previewRef.current = setTimeout(() => {
      setGrid((g) => g.map((c) => ({ ...c, state: "idle" })));
      setPhase("playing");
    }, LEVELS[level].preview * 1000);
    return () => clearTimeout(previewRef.current);
  }, [phase, level]);

  // Timer countdown
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

    setGrid((g) =>
      g.map((c, idx) =>
        idx === i ? { ...c, clicked: true, state: c.colored ? "correct" : "wrong" } : c
      )
    );

    if (cell.colored) {
      const newRemaining = remaining - 1;
      const newScore = score + 10;
      setRemaining(newRemaining);
      setScore(newScore);
      if (newRemaining === 0) { clearTimers(); setPhase("won"); }
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes >= 3) { clearTimers(); setPhase("lost"); }
    }
  };

  const lvl = LEVELS[level];
  const pct = lvl ? (timeLeft / lvl.time) * 100 : 0;
  const CELL = 56;
  const isLast = level >= LEVELS.length - 1;

  const cellStyle = (c) => {
    if (phase === "preview") return c.colored ? "bg-violet-600" : "bg-gray-200 dark:bg-white/10";
    if (c.state === "correct") return "bg-emerald-500";
    if (c.state === "wrong") return "bg-red-500";
    return "bg-gray-200 dark:bg-white/10 hover:bg-violet-200 dark:hover:bg-violet-700/40 cursor-pointer";
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#111827] rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-auto shadow-2xl border border-gray-200 dark:border-white/10 relative">

        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Grid3x3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                Grid Memory
              </h2>
              <p className="text-xs text-gray-400">Spatial recall challenge</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {phase !== "start" && (
              <span className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 text-xs font-bold px-3 py-1 rounded-full">
                Level {level + 1} / {LEVELS.length}
              </span>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center text-gray-500 dark:text-gray-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-6 pb-6">

          {/* START SCREEN */}
          {phase === "start" && (
            <div className="text-center py-10">
              <div className="text-5xl mb-5">🧠</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Grid Memory Challenge
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                Purple cells flash briefly — memorise their positions, then click them all from memory.
                3 wrong clicks = game over. Beat all 8 levels!
              </p>
              <button
                onClick={() => startLevel(0)}
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-sm"
              >
                Start Game →
              </button>
            </div>
          )}

          {/* IN-GAME */}
          {phase !== "start" && (
            <>
              {/* Progress dots */}
              <div className="flex gap-1 mb-4">
                {LEVELS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i < level
                        ? "bg-violet-600"
                        : i === level
                        ? "bg-violet-400"
                        : "bg-gray-200 dark:bg-white/10"
                    }`}
                  />
                ))}
              </div>

              {/* Stats row */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {[
                  ["Mistakes", `${mistakes}/3`],
                  ["Remaining", remaining],
                  ["Score", score],
                  ["Time", `${timeLeft}s`],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className={`bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm font-semibold ${
                      label === "Time" && timeLeft <= 5
                        ? "text-red-500"
                        : "text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    <span className="text-gray-400 font-normal">{label} </span>
                    {val}
                  </div>
                ))}
              </div>

              {/* Timer bar */}
              {(phase === "playing" || phase === "preview") && (
                <div className="h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mb-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 linear ${
                      timeLeft <= 5 ? "bg-red-500" : "bg-violet-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              )}

              {/* Phase label */}
              <p className="text-center text-xs font-semibold text-violet-500 dark:text-violet-400 mb-4 h-4">
                {phase === "preview"
                  ? "Memorise the purple cells…"
                  : phase === "playing"
                  ? "Click all the purple cells!"
                  : ""}
              </p>

              {/* Grid */}
              <div
                className="mx-auto w-fit"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${lvl.cols}, ${CELL}px)`,
                  gap: "6px",
                }}
              >
                {grid.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => handleCellClick(i)}
                    className={`rounded-lg transition-all duration-150 ${cellStyle(c)} ${
                      c.clicked ? "cursor-default" : ""
                    }`}
                    style={{ width: CELL, height: CELL }}
                  />
                ))}
              </div>
            </>
          )}

          {/* RESULT OVERLAY */}
          {(phase === "won" || phase === "lost" || phase === "timeup") && (
            <div className="absolute inset-0 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-sm flex items-center justify-center rounded-2xl">
              <div className="text-center p-8">
                <div className="text-5xl mb-4">
                  {phase === "won" ? (isLast ? "🏆" : "🎉") : phase === "lost" ? "❌" : "⏰"}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {phase === "won"
                    ? isLast
                      ? "All levels complete!"
                      : `Level ${level + 1} complete!`
                    : phase === "lost"
                    ? "Too many mistakes!"
                    : "Time's up!"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {phase === "won"
                    ? `Found all ${lvl.colored} cells with ${mistakes} mistake${mistakes !== 1 ? "s" : ""}. Score: ${score}`
                    : phase === "lost"
                    ? `You made 3 mistakes on Level ${level + 1}. Study the pattern and try again.`
                    : `Ran out of time on Level ${level + 1}. ${remaining} cell${remaining !== 1 ? "s" : ""} left.`}
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {phase === "won" && !isLast && (
                    <button
                      onClick={() => startLevel(level + 1)}
                      className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
                    >
                      Next Level →
                    </button>
                  )}
                  {phase === "won" && isLast && (
                    <button
                      onClick={() => startLevel(0)}
                      className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
                    >
                      🔁 Play Again
                    </button>
                  )}
                  <button
                    onClick={() => startLevel(level)}
                    className="bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    🔄 Retry
                  </button>
                  {phase !== "won" && (
                    <button
                      onClick={() => startLevel(0)}
                      className="bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                    >
                      Start Over
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GridMemoryGame;
