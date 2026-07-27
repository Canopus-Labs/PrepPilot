import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useMemoryMatch, DIFFICULTY_CONFIGS } from "../hooks/useMemoryMatch";
import { setMatchAudioMuted, getMatchAudioMuted } from "../utils/matchAudio";
import {
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  Trophy,
  Flame,
  ShieldCheck,
  Timer,
  Gamepad2,
  HelpCircle,
  Activity,
  Award,
  PlayCircle,
  Play,
  Info,
  Pause,
  Star,
  Zap,
  Calendar,
  Sparkles,
  Lock,
  // Card Icons Map
  Brain,
  Cpu,
  Globe,
  Database,
  Code,
  Terminal,
  Atom,
  Key,
  Laptop,
  Music,
  Heart,
  Palette,
  Infinity as InfinityIcon,
  Shield,
  HelpCircle as QuestionIcon,
} from "lucide-react";

// List of 18 unique, beautiful icons corresponding to iconIndex from hook
const ICONS_LIST = [
  Brain,
  Cpu,
  Globe,
  Database,
  Code,
  Terminal,
  Atom,
  Flame,
  Trophy,
  Key,
  Laptop,
  Music,
  Heart,
  Palette,
  Gamepad2,
  InfinityIcon,
  Sparkles,
  Shield,
];

// Color catalog matching cards to give them high visual excellence
const COLOR_CLASSES = [
  "text-violet-500 border-violet-500/30 bg-violet-500/5",
  "text-blue-500 border-blue-500/30 bg-blue-500/5",
  "text-emerald-500 border-emerald-500/30 bg-emerald-500/5",
  "text-rose-500 border-rose-500/30 bg-rose-500/5",
  "text-amber-500 border-amber-500/30 bg-amber-500/5",
  "text-cyan-500 border-cyan-500/30 bg-cyan-500/5",
  "text-fuchsia-500 border-fuchsia-500/30 bg-fuchsia-500/5",
  "text-teal-500 border-teal-500/30 bg-teal-500/5",
  "text-orange-500 border-orange-500/30 bg-orange-500/5",
  "text-pink-500 border-pink-500/30 bg-pink-500/5",
  "text-indigo-500 border-indigo-500/30 bg-indigo-500/5",
  "text-sky-500 border-sky-500/30 bg-sky-500/5",
  "text-lime-500 border-lime-500/30 bg-lime-500/5",
  "text-yellow-500 border-yellow-500/30 bg-yellow-500/5",
  "text-red-500 border-red-500/30 bg-red-500/5",
  "text-purple-500 border-purple-500/30 bg-purple-500/5",
  "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  "text-indigo-400 border-indigo-400/30 bg-indigo-400/5",
];

const MemoryMatchGame = () => {
  const {
    phase,
    difficulty,
    paused,
    dailyChallenge,
    cards,
    flippedIndices,
    rowsCount,
    colsCount,
    moves,
    score,
    combo,
    maxCombo,
    stars,
    wrongMoves,
    accuracy,
    timeElapsed,
    highScore,
    achievements,
    perfectGame,
    config,
    startGame,
    flipCard,
    pauseGame,
    resumeGame,
    quitGame,
    setDifficulty,
    setDailyChallenge,
  } = useMemoryMatch();

  const [muted, setMuted] = useState(() => getMatchAudioMuted());
  const shouldReduceMotion = useReducedMotion();

  const handleMuteToggle = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setMatchAudioMuted(nextMuted);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getRank = (finalScore) => {
    if (finalScore >= 3500) return { medal: "👑", title: "Cerebral Architect", color: "text-amber-400" };
    if (finalScore >= 2000) return { medal: "🏆", title: "Mnemonic Master", color: "text-yellow-400" };
    if (finalScore >= 1000) return { medal: "🥇", title: "Star Recallist", color: "text-slate-300" };
    if (finalScore >= 400) return { medal: "🥈", title: "Mental Synapse", color: "text-amber-600" };
    return { medal: "🎗️", title: "Apprentice Learner", color: "text-gray-400" };
  };

  // Card click handler mapped to keyboard
  const handleCardKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flipCard(index);
    }
  };

  // Framer motion setups
  const springTransition = shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 };
  const fadeTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.3 };

  const containerVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, transition: { duration: 0.25 } },
  };

  // ─── 1. Onboarding / Instructions Screen ──────────────────────────────────
  if (phase === "instructions") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="max-w-3xl mx-auto bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 bg-pink-100 dark:bg-pink-600/20 text-pink-600 dark:text-pink-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner animate-pulse">
            <Gamepad2 className="w-8 h-8" />
          </div>

          <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            Memory Match
          </h3>
          <p className="text-pink-600 dark:text-pink-400 font-bold text-sm uppercase tracking-wider mb-6">
            Working Memory Capacity Challenge
          </p>

          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mb-8">
            Test and train your visual association memory. Flip cards two-by-two to match identical icons. Solve matches consecutively to double your score with combo multipliers!
          </p>

          {/* Mode Option Switcher */}
          <div className="w-full mb-6 text-left">
            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              1. Choose Game Mode:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDailyChallenge(false)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                  !dailyChallenge
                    ? "bg-pink-600/10 border-pink-500 text-pink-600 dark:bg-pink-500/20 dark:border-pink-400 dark:text-pink-300 ring-2 ring-pink-500"
                    : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2 mb-1 font-extrabold text-sm tracking-wide">
                  <Sparkles className="w-4 h-4" /> Standard Training
                </div>
                <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                  Play with randomly shuffled cards on your chosen grid size. Perfect for repeat training.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDailyChallenge(true)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                  dailyChallenge
                    ? "bg-amber-600/10 border-amber-500 text-amber-600 dark:bg-amber-500/20 dark:border-amber-400 dark:text-amber-300 ring-2 ring-amber-500"
                    : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2 mb-1 font-extrabold text-sm tracking-wide">
                  <Calendar className="w-4 h-4" /> Daily Seed Challenge
                </div>
                <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                  Plays a fixed card shuffle generated from today's date. Play and compare results daily!
                </p>
              </button>
            </div>
          </div>

          {/* Difficulty Cards */}
          <div className="w-full mb-8 text-left">
            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              2. Select Difficulty Level:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {Object.values(DIFFICULTY_CONFIGS).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDifficulty(item.id)}
                  disabled={dailyChallenge && item.id !== "extreme" && false} // Let daily challenge apply to any
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 w-full ${
                    difficulty === item.id
                      ? "bg-violet-600/10 border-violet-500 text-violet-600 dark:bg-violet-500/20 dark:border-violet-400 dark:text-violet-300 ring-2 ring-violet-500"
                      : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-xs tracking-wide">{item.label}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-400">
                      {item.multiplier}x
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal mb-1 font-semibold">
                    Grid: {item.rows}×{item.cols}
                  </div>
                  <p className="text-[9px] leading-relaxed text-gray-400 dark:text-gray-500 font-normal">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Info bar */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 w-full mb-8 text-left text-xs text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-700 dark:text-gray-200 block mb-0.5">Combos</strong>
                Matching pairs back-to-back increments your combo multiplier, exponentially increasing points.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-700 dark:text-gray-200 block mb-0.5">Stars & Awards</strong>
                Completing the puzzle in fewer moves earns up to 3 stars. Solve in record speed to grab achievements!
              </div>
            </div>
          </div>

          <button
            onClick={() => startGame(difficulty, dailyChallenge)}
            className="group bg-pink-600 hover:bg-pink-700 text-white font-extrabold px-12 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-pink-600/30 hover:scale-[1.02] flex items-center gap-2 cursor-pointer text-base"
          >
            <Play className="w-5 h-5 fill-current" /> Start Game
          </button>
        </div>
      </motion.div>
    );
  }

  // ─── 2. Main Gameplay Screen ──────────────────────────────────────────────
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-4xl mx-auto"
    >
      {/* HUD Stats Panel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        {[
          { label: "Score", value: score, icon: Trophy, color: "text-yellow-500 bg-yellow-500/10" },
          { label: "Moves Played", value: moves, icon: Activity, color: "text-pink-500 bg-pink-500/10" },
          { label: "Accuracy", value: `${accuracy}%`, icon: ShieldCheck, color: "text-emerald-500 bg-emerald-500/10" },
          { label: "Timer", value: formatTime(timeElapsed), icon: Timer, color: "text-blue-500 bg-blue-500/10" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm"
          >
            <div className={`p-2 rounded-xl flex items-center justify-center ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                {label}
              </span>
              <span className="text-sm font-extrabold text-gray-800 dark:text-gray-100">
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mode Configurations HUD Bar */}
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-6 shadow-sm flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400 border border-pink-200 dark:border-pink-500/20">
            {dailyChallenge ? "Daily Challenge" : "Standard Game"}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20">
            {difficulty} difficulty
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
            Layout: {rowsCount}×{colsCount}
          </span>
        </div>

        {/* Combo Multiplier Alert */}
        <AnimatePresence>
          {combo > 1 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs font-bold tracking-wide animate-bounce"
            >
              <Zap className="w-3.5 h-3.5 fill-current" /> Combo {combo}x!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Cards Grid Deck ─── */}
      <div
        className="grid gap-3.5 p-4 rounded-3xl bg-white/40 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-lg justify-center mx-auto"
        style={{
          gridTemplateColumns: `repeat(${colsCount}, minmax(0, 120px))`, // caps card width at 120px, scales dynamically
          perspective: "1000px", // Enables 3D flipping space
        }}
      >
        {cards.map((card, idx) => {
          const CardIcon = ICONS_LIST[card.iconIndex];
          const colorClass = COLOR_CLASSES[card.iconIndex % COLOR_CLASSES.length];
          const isOpen = card.isFlipped || card.isMatched;

          return (
            <div
              key={card.id}
              onClick={() => flipCard(idx)}
              onKeyDown={(e) => handleCardKeyDown(e, idx)}
              role="button"
              tabIndex={card.isMatched ? -1 : 0}
              aria-label={`Card ${idx + 1}. ${
                card.isMatched
                  ? "Matched."
                  : card.isFlipped
                  ? "Flipped open."
                  : "Face down."
              }`}
              className="aspect-[3/4] relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-500/50 rounded-2xl overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Card Container holding Front and Back */}
              <motion.div
                className="w-full h-full relative"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateY: isOpen ? 180 : 0,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.45,
                  ease: "easeInOut",
                }}
              >
                {/* 1. CARD BACK (Face Down state) */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-violet-500/10 border border-gray-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md shadow-md hover:border-pink-500/50 hover:bg-gradient-to-tr hover:from-pink-500/15 hover:to-violet-500/15 transition-colors"
                  style={{
                    backfaceVisibility: "hidden",
                    zIndex: 2,
                  }}
                >
                  {/* Glowing Question Circle */}
                  <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-white/5 border border-white/15 dark:border-white/5 flex items-center justify-center shadow-inner">
                    <QuestionIcon className="w-4 h-4 text-pink-500/70" />
                  </div>
                </div>

                {/* 2. CARD FRONT (Flipped / Matched state) */}
                <div
                  className={`absolute inset-0 bg-white dark:bg-slate-900/60 border rounded-2xl flex items-center justify-center shadow-inner backdrop-blur-md ${colorClass} ${
                    card.isMatched ? "border-emerald-500/40 ring-1 ring-emerald-500/20" : ""
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    zIndex: 1,
                  }}
                >
                  <CardIcon className="w-8 h-8 md:w-10 md:h-10 stroke-[2.2]" />
                  {card.isMatched && (
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={springTransition}
                      className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-bold"
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Control Buttons Footer */}
      <div className="flex items-center justify-between mt-6 px-2">
        <button
          onClick={quitGame}
          className="flex items-center gap-1.5 text-xs font-extrabold text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
          title="Quit and return to settings"
        >
          <X className="w-4 h-4" /> Quit Game
        </button>

        <div className="flex gap-4">
          <button
            onClick={handleMuteToggle}
            className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
            aria-label={muted ? "Unmute Audio" : "Mute Audio"}
            title={muted ? "Unmute Audio" : "Mute Audio"}
          >
            {muted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Pause Toggle */}
          {phase === "playing" && (
            <button
              onClick={pauseGame}
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold transition-all cursor-pointer"
              title="Pause Game"
            >
              <Pause className="w-3.5 h-3.5" /> Pause
            </button>
          )}

          <button
            onClick={() => startGame(difficulty, dailyChallenge)}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold transition-all cursor-pointer"
            title="Restart puzzle"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart
          </button>
        </div>
      </div>

      {/* ─── 3. Victory Completion Screen Modal ─── */}
      {phase === "victory" && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            {/* Background design glow */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-28 h-28 bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-28 h-28 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center relative z-10">
              {/* Animated star rating chimes */}
              <div className="flex justify-center gap-2 mb-3">
                {[1, 2, 3].map((starIdx) => (
                  <motion.div
                    key={starIdx}
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.3 }}
                    animate={{
                      opacity: starIdx <= stars ? 1 : 0.18,
                      scale: starIdx <= stars ? [1, 1.3, 1] : 1,
                    }}
                    transition={{
                      delay: idx => (idx * 0.15) + 0.1,
                      duration: 0.45,
                    }}
                  >
                    <Star
                      className={`w-10 h-10 ${
                        starIdx <= stars ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
                Puzzle Solved!
              </h3>
              <p className="text-pink-600 dark:text-pink-400 font-bold text-xs uppercase tracking-wide mb-6">
                Rank: {getRank(score).title}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                <div className="p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Final Score
                  </span>
                  <span className="text-xl font-black text-pink-600 dark:text-pink-400">
                    {score}
                  </span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Moves Count
                  </span>
                  <span className="text-xl font-black text-violet-600 dark:text-violet-400">
                    {moves} moves
                  </span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Match Accuracy
                  </span>
                  <span className="text-xl font-black text-emerald-500">{accuracy}%</span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Time Taken
                  </span>
                  <span className="text-xl font-black text-gray-800 dark:text-white">
                    {formatTime(timeElapsed)}
                  </span>
                </div>
              </div>

              {/* Unlock Achievements Panel */}
              {achievements.length > 0 && (
                <div className="mb-6 text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-2">
                    Achievements Unlocked:
                  </span>
                  <div className="flex flex-col gap-2">
                    {achievements.map((ach) => (
                      <div
                        key={ach.id}
                        className="p-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/20 flex items-center gap-2.5"
                      >
                        <Award className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        <div>
                          <h5 className="font-extrabold text-xs text-yellow-600 dark:text-yellow-400 leading-tight">
                            {ach.title}
                          </h5>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-normal">
                            {ach.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Perfect game visual badge */}
              {perfectGame && (
                <div className="mb-6 flex justify-center">
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20 flex items-center gap-1 shadow-sm">
                    ✨ Perfect Recall Badge (+500 Pts) ✨
                  </span>
                </div>
              )}

              {/* Victory Actions */}
              <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                <button
                  onClick={() => startGame(difficulty, dailyChallenge)}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-sm"
                >
                  <RotateCcw className="w-4 h-4" /> Play Again
                </button>

                <button
                  onClick={quitGame}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-full border border-gray-200 dark:border-white/10 transition-all text-sm cursor-pointer"
                >
                  Change Setup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── 4. Pause Screen Modal ─── */}
      {paused && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative"
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-600/20 text-pink-600 dark:text-pink-400 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Info className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
                Puzzle Paused
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                Take your time. Focus is key. Resume when you are ready.
              </p>

              {/* Pause HUD Stats */}
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-6 text-left grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Score</span>
                  <span className="text-base font-extrabold text-pink-600 dark:text-pink-400">{score}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Moves</span>
                  <span className="text-base font-extrabold text-gray-800 dark:text-white">{moves}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Accuracy</span>
                  <span className="text-base font-extrabold text-emerald-500">{accuracy}%</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Time</span>
                  <span className="text-base font-extrabold text-gray-800 dark:text-white">{formatTime(timeElapsed)}</span>
                </div>
              </div>

              {/* Pause actions */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={resumeGame}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-sm"
                >
                  <PlayCircle className="w-4 h-4" /> Resume Game
                </button>

                <button
                  onClick={quitGame}
                  className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-full border border-gray-200 dark:border-white/10 transition-all text-sm cursor-pointer"
                >
                  Quit to Settings
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default MemoryMatchGame;
