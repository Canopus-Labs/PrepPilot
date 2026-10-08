import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  GitFork,
  Zap,
  Database,
  Network,
  Layers,
  ListOrdered,
  Cpu,
  Route,
  Repeat,
  Activity,
  Search,
  TrendingUp,
  Brain,
  Code2,
  Trophy,
  RotateCcw,
  Sparkles,
  Timer,
  CheckCircle2,
  Gamepad2,
  HelpCircle,
} from "lucide-react";

// ─── Technical concepts data for card matching ──────────────────────────────────
const TECH_CONCEPTS = [
  {
    id: "binary-tree",
    name: "Binary Tree",
    category: "Data Structure",
    icon: GitFork,
    colorClass: "from-violet-500/10 to-violet-600/20 text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-500/40",
    badgeColor: "text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 border-violet-200 dark:border-violet-500/30",
  },
  {
    id: "quicksort",
    name: "Quick Sort",
    category: "Algorithm",
    icon: Zap,
    colorClass: "from-amber-500/10 to-amber-600/20 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-500/40",
    badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 border-amber-200 dark:border-amber-500/30",
  },
  {
    id: "hash-table",
    name: "Hash Table",
    category: "Data Structure",
    icon: Database,
    colorClass: "from-blue-500/10 to-blue-600/20 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-500/40",
    badgeColor: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-500/30",
  },
  {
    id: "graph",
    name: "Graph Theory",
    category: "Data Structure",
    icon: Network,
    colorClass: "from-emerald-500/10 to-emerald-600/20 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/40",
    badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-500/30",
  },
  {
    id: "stack",
    name: "Stack (LIFO)",
    category: "Data Structure",
    icon: Layers,
    colorClass: "from-indigo-500/10 to-indigo-600/20 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-500/40",
    badgeColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/40 border-indigo-200 dark:border-indigo-500/30",
  },
  {
    id: "queue",
    name: "Queue (FIFO)",
    category: "Data Structure",
    icon: ListOrdered,
    colorClass: "from-rose-500/10 to-rose-600/20 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-500/40",
    badgeColor: "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40 border-rose-200 dark:border-rose-500/30",
  },
  {
    id: "dynamic-prog",
    name: "Dynamic Prog.",
    category: "Paradigm",
    icon: Cpu,
    colorClass: "from-cyan-500/10 to-cyan-600/20 text-cyan-600 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500/40",
    badgeColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/40 border-cyan-200 dark:border-cyan-500/30",
  },
  {
    id: "dijkstra",
    name: "Dijkstra Algo",
    category: "Graph Algo",
    icon: Route,
    colorClass: "from-fuchsia-500/10 to-fuchsia-600/20 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-300 dark:border-fuchsia-500/40",
    badgeColor: "text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-100 dark:bg-fuchsia-900/40 border-fuchsia-200 dark:border-fuchsia-500/30",
  },
  {
    id: "recursion",
    name: "Recursion",
    category: "Concept",
    icon: Repeat,
    colorClass: "from-teal-500/10 to-teal-600/20 text-teal-600 dark:text-teal-400 border-teal-300 dark:border-teal-500/40",
    badgeColor: "text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/40 border-teal-200 dark:border-teal-500/30",
  },
  {
    id: "big-o",
    name: "Big O Notation",
    category: "Complexity",
    icon: Activity,
    colorClass: "from-orange-500/10 to-orange-600/20 text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-500/40",
    badgeColor: "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/40 border-orange-200 dark:border-orange-500/30",
  },
  {
    id: "trie",
    name: "Trie Tree",
    category: "Data Structure",
    icon: Search,
    colorClass: "from-pink-500/10 to-pink-600/20 text-pink-600 dark:text-pink-400 border-pink-300 dark:border-pink-500/40",
    badgeColor: "text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/40 border-pink-200 dark:border-pink-500/30",
  },
  {
    id: "heap",
    name: "Binary Heap",
    category: "Data Structure",
    icon: TrendingUp,
    colorClass: "from-sky-500/10 to-sky-600/20 text-sky-600 dark:text-sky-400 border-sky-300 dark:border-sky-500/40",
    badgeColor: "text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/40 border-sky-200 dark:border-sky-500/30",
  },
];

// ─── Difficulty levels ────────────────────────────────────────────────────────
const DIFFICULTIES = {
  easy: { label: "Easy", pairs: 6, colsClass: "grid-cols-3 sm:grid-cols-4" },
  medium: { label: "Medium", pairs: 8, colsClass: "grid-cols-3 sm:grid-cols-4" },
  hard: { label: "Hard", pairs: 12, colsClass: "grid-cols-3 sm:grid-cols-4 md:grid-cols-6" },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildCards(numPairs) {
  const selectedConcepts = shuffle(TECH_CONCEPTS).slice(0, numPairs);
  const deck = [];
  selectedConcepts.forEach((concept) => {
    deck.push({
      uid: `${concept.id}-1`,
      conceptId: concept.id,
      name: concept.name,
      category: concept.category,
      icon: concept.icon,
      colorClass: concept.colorClass,
      badgeColor: concept.badgeColor,
      isFlipped: false,
      isMatched: false,
      isMismatched: false,
    });
    deck.push({
      uid: `${concept.id}-2`,
      conceptId: concept.id,
      name: concept.name,
      category: concept.category,
      icon: concept.icon,
      colorClass: concept.colorClass,
      badgeColor: concept.badgeColor,
      isFlipped: false,
      isMatched: false,
      isMismatched: false,
    });
  });
  return shuffle(deck);
}

const MemoryCardGame = () => {
  const [phase, setPhase] = useState("start"); // "start" | "playing" | "won"
  const [difficultyKey, setDifficultyKey] = useState("medium");
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [timer, setTimer] = useState(0);

  const timerRef = useRef(null);
  const mismatchTimeoutRef = useRef(null);
  const startTimeRef = useRef(null);

  const currentDiff = DIFFICULTIES[difficultyKey];
  const totalPairs = currentDiff.pairs;

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsedSeconds = Math.floor(
          (Date.now() - startTimeRef.current) / 1000
        );
        setTimer(elapsedSeconds);
      }
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  const startGame = useCallback(
    (diff = difficultyKey) => {
      stopTimer();
      if (mismatchTimeoutRef.current) {
        clearTimeout(mismatchTimeoutRef.current);
        mismatchTimeoutRef.current = null;
      }
      setDifficultyKey(diff);
      const newDeck = buildCards(DIFFICULTIES[diff].pairs);
      setCards(newDeck);
      setFlippedIndices([]);
      setIsEvaluating(false);
      setMoves(0);
      setMatchedCount(0);
      setTimer(0);
      setPhase("playing");
      startTimer();
    },
    [difficultyKey, startTimer, stopTimer]
  );

  useEffect(() => {
    return () => {
      stopTimer();
      if (mismatchTimeoutRef.current) {
        clearTimeout(mismatchTimeoutRef.current);
      }
    };
  }, [stopTimer]);

  const handleCardClick = (index) => {
    if (phase !== "playing" || isEvaluating) return;
    const clickedCard = cards[index];
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    // First card flip
    if (flippedIndices.length === 0) {
      setCards((prev) =>
        prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c))
      );
      setFlippedIndices([index]);
      return;
    }

    // Second card flip
    if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      if (firstIndex === index) return;

      const firstCard = cards[firstIndex];
      const secondCard = clickedCard;

      const newMoves = moves + 1;
      setMoves(newMoves);

      // Flip second card
      setCards((prev) =>
        prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c))
      );
      setFlippedIndices([firstIndex, index]);

      // Evaluate match
      if (firstCard.conceptId === secondCard.conceptId) {
        // Match
        const newMatched = matchedCount + 1;
        setMatchedCount(newMatched);

        setCards((prev) =>
          prev.map((c, i) =>
            i === firstIndex || i === index
              ? { ...c, isFlipped: true, isMatched: true }
              : c
          )
        );
        setFlippedIndices([]);

        if (newMatched === totalPairs) {
          stopTimer();
          setPhase("won");
        }
      } else {
        // Mismatch
        setIsEvaluating(true);
        setCards((prev) =>
          prev.map((c, i) =>
            i === firstIndex || i === index
              ? { ...c, isFlipped: true, isMismatched: true }
              : c
          )
        );

        mismatchTimeoutRef.current = setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIndex || i === index
                ? { ...c, isFlipped: false, isMismatched: false }
                : c
            )
          );
          setFlippedIndices([]);
          setIsEvaluating(false);
          mismatchTimeoutRef.current = null;
        }, 850);
      }
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // ─── Start Screen ─────────────────────────────────────────────────────────────
  if (phase === "start") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center max-w-xl mx-auto px-4">
        <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-5 border border-violet-200 dark:border-violet-500/20 shadow-sm">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Memory Card Matching
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-md mx-auto mb-8">
          Test and train your technical memory! Flip cards to reveal data structures,
          algorithms, and CS concepts. Match all pairs in as few moves as possible.
        </p>

        {/* Difficulty Selection */}
        <div className="flex items-center justify-center gap-2 mb-8 bg-gray-100 dark:bg-white/5 p-1.5 rounded-full border border-gray-200 dark:border-white/10">
          {Object.entries(DIFFICULTIES).map(([key, diff]) => (
            <button
              key={key}
              onClick={() => setDifficultyKey(key)}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                difficultyKey === key
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {diff.label} ({diff.pairs} Pairs)
            </button>
          ))}
        </div>

        <button
          onClick={() => startGame(difficultyKey)}
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-10 py-3 rounded-full transition-colors shadow"
        >
          Start Game →
        </button>
      </div>
    );
  }

  // ─── Playing & Won Views ─────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      {/* Stats header */}
      <div className="flex gap-2 mb-6 flex-wrap items-center justify-between">
        <div className="flex gap-2 flex-wrap items-center">
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100 shadow-sm">
            <span className="text-gray-400 font-normal">Moves </span>
            {moves}
          </div>

          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100 shadow-sm">
            <span className="text-gray-400 font-normal">Pairs </span>
            {matchedCount} / {totalPairs}
          </div>

          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100 shadow-sm">
            <span className="text-gray-400 font-normal">Time </span>
            {formatTime(timer)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Difficulty badge */}
          <div className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20 rounded-lg px-3 py-1.5 text-sm font-bold shadow-sm">
            {currentDiff.label} ({totalPairs} Pairs)
          </div>

          <button
            onClick={() => startGame(difficultyKey)}
            title="Restart Game"
            className="bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-white p-2 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className={`grid ${currentDiff.colsClass} gap-3 mb-8`}>
        {cards.map((card, idx) => {
          const IconComp = card.icon;
          const isFlippedOrMatched = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.uid}
              onClick={() => handleCardClick(idx)}
              disabled={isFlippedOrMatched || isEvaluating || phase !== "playing"}
              aria-label={`Card ${idx + 1} ${
                card.isMatched ? "matched" : card.isFlipped ? "face-up" : "face-down"
              }`}
              className={`h-28 sm:h-32 rounded-xl border p-2.5 transition-all duration-300 relative flex flex-col items-center justify-between text-center select-none overflow-hidden ${
                card.isMatched
                  ? "bg-emerald-500/10 border-emerald-500 dark:border-emerald-500/80 text-emerald-700 dark:text-emerald-300 shadow-md ring-2 ring-emerald-500/20"
                  : card.isMismatched
                  ? "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400 shadow-md animate-bounce"
                  : card.isFlipped
                  ? `bg-gradient-to-br ${card.colorClass} shadow-md border-2`
                  : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-violet-400 dark:hover:border-violet-500/50 hover:bg-violet-50/50 dark:hover:bg-violet-900/20 cursor-pointer shadow-sm"
              }`}
            >
              {isFlippedOrMatched ? (
                <>
                  <div className="w-full flex justify-between items-center text-[10px] uppercase font-bold tracking-wider opacity-80">
                    <span className={`px-1.5 py-0.5 rounded border ${card.badgeColor}`}>
                      {card.category}
                    </span>
                    {card.isMatched && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                  <div className="my-auto flex flex-col items-center justify-center gap-1">
                    <IconComp className="w-6 h-6 sm:w-7 sm:h-7" />
                    <span className="text-xs sm:text-sm font-bold leading-tight">
                      {card.name}
                    </span>
                  </div>
                </>
              ) : (
                <div className="my-auto flex flex-col items-center justify-center gap-1.5 text-gray-400 dark:text-gray-500">
                  <Code2 className="w-6 h-6 sm:w-7 sm:h-7" />
                  <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">
                    PrepCard
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Result / Win Overlay */}
      {phase === "won" && (
        <div className="text-center mt-6 p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-lg">
          <div className="text-5xl mb-3">🏆</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            All Pairs Matched!
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
            Great memory! You completed the <span className="font-semibold text-violet-600 dark:text-violet-400">{currentDiff.label}</span> level by matching all {totalPairs} pairs in <span className="font-bold text-gray-800 dark:text-gray-200">{moves} moves</span> and <span className="font-bold text-gray-800 dark:text-gray-200">{formatTime(timer)}</span>.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => startGame(difficultyKey)}
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-2.5 rounded-full transition-colors text-sm shadow"
            >
              🔁 Play Again
            </button>
            <button
              onClick={() => setPhase("start")}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-white font-semibold px-6 py-2.5 rounded-full transition-colors text-sm"
            >
              ⚙️ Select Level
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryCardGame;
