import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePatternMatrix, DIFFICULTY_CONFIGS } from "../hooks/usePatternMatrix";
import { setMatrixAudioMuted, getMatrixAudioMuted } from "../utils/matrixAudio";
import {
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  Trophy,
  Flame,
  ShieldCheck,
  Timer,
  Grid,
  HelpCircle,
  Activity,
  Award,
  Play,
  PlayCircle,
  Info,
  Pause,
} from "lucide-react";

const PatternMatrixGame = () => {
  const {
    phase,
    difficulty,
    paused,
    gridSize,
    targetCount,
    targets,
    selected,
    wrongClicks,
    lives,
    countdownVal,
    previewProgress,
    showScorePopup,
    score,
    level,
    streak,
    maxStreak,
    highScore,
    accuracy,
    timeElapsed,
    config,
    startGame,
    handleTileClick,
    pauseGame,
    resumeGame,
    quitGame,
    setDifficulty,
  } = usePatternMatrix();

  const [muted, setMuted] = useState(() => getMatrixAudioMuted());
  const shouldReduceMotion = useReducedMotion();

  const handleMuteToggle = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setMatrixAudioMuted(nextMuted);
  };

  // Format MM:SS duration
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Accolade based on final score
  const getAccolade = (finalScore) => {
    if (finalScore >= 2000) return { medal: "🔮", title: "Spatial Oracle", color: "text-amber-400" };
    if (finalScore >= 1000) return { medal: "🏆", title: "Matrix Architect", color: "text-yellow-400" };
    if (finalScore >= 500) return { medal: "🥇", title: "Grid Specialist", color: "text-slate-300" };
    if (finalScore >= 200) return { medal: "🥈", title: "Pattern Memorizer", color: "text-amber-600" };
    return { medal: "🎗️", title: "Pioneer Apprentice", color: "text-gray-400" };
  };

  // Animations configured with prefers-reduced-motion in mind
  const springTransition = shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 25 };
  const fadeTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.35 };

  const containerVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
    exit: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, transition: { duration: 0.25 } },
  };

  const gridShakeVariants = {
    idle: { x: 0 },
    shake: {
      x: shouldReduceMotion ? 0 : [-8, 8, -6, 6, -4, 4, -2, 2, 0],
      transition: { duration: 0.45, ease: "easeInOut" },
    },
  };

  // Generate grid tiles
  const totalTiles = gridSize * gridSize;
  const tiles = Array.from({ length: totalTiles }, (_, i) => i);

  // Dynamic Tile size based on grid complexity (keeps board compact on mobile)
  const getTileSizeClass = () => {
    if (gridSize <= 3) return "w-16 h-16 sm:w-24 sm:h-24 rounded-2xl";
    if (gridSize === 4) return "w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl";
    if (gridSize === 5) return "w-11 h-11 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl";
    return "w-9 h-9 sm:w-14 sm:h-14 rounded-md sm:rounded-lg";
  };

  // ─── 1. Instructions / Setup Screen ───────────────────────────────────────
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
          <div className="w-16 h-16 bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner animate-pulse">
            <Grid className="w-8 h-8" />
          </div>

          <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            Pattern Matrix Memory
          </h3>
          <p className="text-violet-600 dark:text-violet-400 font-bold text-sm uppercase tracking-wider mb-6">
            Visual Spatial Memory Trainer
          </p>

          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mb-8">
            Sharpen your spatial awareness and visual working memory. A matrix grid will display a highlighted pattern of blue tiles. Memorize them, then select them back correctly once they disappear.
          </p>

          {/* Quick Rules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8 text-left">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex gap-3">
              <HelpCircle className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-gray-700 dark:text-gray-200 mb-1">Memorize</h4>
                <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-snug">
                  Watch the flashing tile configuration. You'll get a countdown before each round starts.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex gap-3">
              <Activity className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-gray-700 dark:text-gray-200 mb-1">Recall</h4>
                <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-snug">
                  Tap all highlighted tiles. Clicking incorrect tiles shakes the board and reveals correct answers.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex gap-3">
              <Award className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-gray-700 dark:text-gray-200 mb-1">Difficulty</h4>
                <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-snug">
                  Choose fixed grids, or play <strong>Extreme Mode</strong> for dynamic grid scaling up to 6×6 and faster display times.
                </p>
              </div>
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="w-full mb-8">
            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 text-left">
              Select Game Difficulty:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {Object.values(DIFFICULTY_CONFIGS).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDifficulty(item.id)}
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
                  <p className="text-[10px] leading-relaxed text-gray-400 dark:text-gray-500 font-normal">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => startGame(difficulty)}
            className="group bg-violet-600 hover:bg-violet-700 text-white font-extrabold px-12 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-violet-600/30 hover:scale-[1.02] flex items-center gap-2 cursor-pointer text-base"
          >
            <Play className="w-5 h-5 fill-current" /> Start Game
          </button>
        </div>
      </motion.div>
    );
  }

  // ─── 2. Main Game Board & Countdown Overlay ──────────────────────────────
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-2xl mx-auto relative"
    >
      {/* HUD Bar Stats Panel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        {[
          { label: "Score", value: score, icon: Trophy, color: "text-yellow-500 bg-yellow-500/10" },
          { label: "Level / Round", value: `Lvl ${level}`, icon: Flame, color: "text-orange-500 bg-orange-500/10" },
          { label: "Accuracy", value: `${accuracy}%`, icon: ShieldCheck, color: "text-emerald-500 bg-emerald-500/10" },
          { label: "Timer", value: formatTime(timeElapsed), icon: Timer, color: "text-blue-500 bg-blue-500/10" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-sm"
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

      {/* Difficulty Details & Lives Bar */}
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-6 shadow-sm flex items-center justify-between">
        <div className="flex gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20">
            {difficulty} Mode
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
            Grid: {gridSize}×{gridSize}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Strikes:
          </span>
          <div className="flex gap-1">
            {[1, 2, 3].map((heart) => (
              <span
                key={heart}
                className={`text-sm transition-all duration-300 ${
                  heart > (3 - lives)
                    ? "text-red-500 filter drop-shadow-[0_0_2px_rgba(239,68,68,0.4)] animate-pulse"
                    : "text-red-500 grayscale opacity-20 scale-90"
                }`}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Progress Bar for Preview Duration */}
      {(phase === "preview" || phase === "countdown") && (
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
              {phase === "countdown" ? "Get ready..." : "Memorize highlighted pattern..."}
            </span>
            <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">
              {targetCount} tiles
            </span>
          </div>
          <div className="h-2.5 bg-gray-100 dark:bg-black/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: `${previewProgress}%` }}
              transition={{ duration: 0.025 }}
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
            />
          </div>
        </div>
      )}

      {/* User Input Prompt */}
      {phase === "playing" && (
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-6 shadow-sm text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-500 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Your Turn: Match {selected.size} of {targets.size} tiles
          </span>
        </div>
      )}

      {/* ─── Grid Board Container ─── */}
      <div className="flex justify-center items-center py-6 min-h-[320px] relative">
        {/* Floating Score Popup */}
        <AnimatePresence>
          {showScorePopup && (
            <motion.div
              key={showScorePopup.time}
              initial={{ opacity: 0, y: 0, scale: 0.7 }}
              animate={{ opacity: 1, y: -90, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.95, ease: "easeOut" }}
              className="absolute z-30 pointer-events-none font-black text-4xl text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
            >
              {showScorePopup.value}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Countdown screen display */}
        {phase === "countdown" && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={countdownVal}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.6 }}
                transition={springTransition}
                className="w-36 h-36 rounded-full bg-gradient-to-tr from-violet-600/10 to-blue-600/10 border-2 border-violet-500/20 dark:border-violet-400/20 backdrop-blur-md shadow-2xl flex items-center justify-center font-black text-6xl text-violet-600 dark:text-violet-400 font-mono"
              >
                {countdownVal}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* 2. Tiles Grid Layout */}
        <motion.div
          variants={gridShakeVariants}
          animate={phase === "reveal" && wrongClicks.size > 0 ? "shake" : "idle"}
          className={`grid gap-2.5 p-4 rounded-3xl bg-white/40 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-lg relative ${
            phase === "countdown" ? "opacity-15 pointer-events-none" : ""
          }`}
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {tiles.map((index) => {
            const isTarget = targets.has(index);
            const isSelected = selected.has(index);
            const isWrong = wrongClicks.has(index);
            const isRevealed = isTarget && phase === "reveal";

            // Determine styling classes for tile
            let tileClass = "bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-transparent cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10";
            let motionShadow = "";

            if (phase === "preview" && isTarget) {
              // Highlight target pattern in blue/indigo during preview
              tileClass = "bg-gradient-to-tr from-blue-500 to-indigo-600 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] scale-98";
              motionShadow = "0px 0px 25px rgba(59, 130, 246, 0.85)";
            } else if (isSelected) {
              // Highlight correct clicks in Emerald green
              tileClass = "bg-gradient-to-tr from-emerald-500 to-teal-600 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)]";
              motionShadow = "0px 0px 25px rgba(16, 185, 129, 0.85)";
            } else if (isWrong) {
              // Highlight incorrect clicks in Rose red
              tileClass = "bg-gradient-to-tr from-rose-500 to-red-600 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.8)]";
              motionShadow = "0px 0px 25px rgba(244, 63, 94, 0.85)";
            } else if (isRevealed) {
              // Reveal missed targets in Amber orange during check phases
              tileClass = "bg-gradient-to-tr from-amber-500 to-orange-600 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.8)]";
              motionShadow = "0px 0px 25px rgba(245, 158, 11, 0.85)";
            }

            return (
              <motion.button
                key={index}
                type="button"
                onClick={() => handleTileClick(index)}
                disabled={phase !== "playing" || paused}
                whileTap={phase === "playing" && !paused ? { scale: 0.92 } : {}}
                className={`aspect-square relative focus:outline-none focus:ring-4 focus:ring-violet-500/50 flex items-center justify-center transition-all duration-150 overflow-hidden ${getTileSizeClass()} ${tileClass}`}
                style={{
                  boxShadow: motionShadow ? `0 0 25px ${motionShadow}` : undefined,
                }}
                aria-label={`Grid Tile ${index + 1}`}
              >
                {/* Visual ripple scaling inside correct tiles */}
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 border-2 border-emerald-400 rounded-lg sm:rounded-xl pointer-events-none"
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Control Utility Buttons Footer */}
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

          {/* Pause Trigger */}
          {(phase === "playing" || phase === "preview" || phase === "countdown") && (
            <button
              onClick={pauseGame}
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold transition-all cursor-pointer"
              title="Pause Game"
            >
              <Pause className="w-3.5 h-3.5" /> Pause
            </button>
          )}

          <button
            onClick={() => startGame(difficulty)}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold transition-all cursor-pointer"
            title="Restart Challenge"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart
          </button>
        </div>
      </div>

      {/* ─── 3. Game Over Results Popup Overlay ─── */}
      {phase === "gameover" && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            {/* Design elements */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-28 h-28 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-28 h-28 bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center relative z-10">
              <span className="text-6xl inline-block mb-3 animate-bounce">
                {getAccolade(score).medal}
              </span>

              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
                Challenge Complete!
              </h3>
              <p className="text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wide mb-6">
                Rank: {getAccolade(score).title}
              </p>

              {/* Stats Card Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                <div className="p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Final Score
                  </span>
                  <span className="text-xl font-black text-violet-600 dark:text-violet-400">
                    {score}
                  </span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Accuracy
                  </span>
                  <span className="text-xl font-black text-emerald-500">{accuracy}%</span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Max Streak
                  </span>
                  <span className="text-xl font-black text-gray-800 dark:text-white">
                    {maxStreak} rounds
                  </span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Time Played
                  </span>
                  <span className="text-xl font-black text-gray-800 dark:text-white">
                    {formatTime(timeElapsed)}
                  </span>
                </div>
              </div>

              {/* Secondary Details HUD */}
              <div className="mb-6 flex justify-center gap-2 flex-wrap">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20">
                  Highest Level: {level}
                </span>
                <span className="px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                  Difficulty: {difficulty}
                </span>
              </div>

              {/* Replay Actions */}
              <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                <button
                  onClick={() => startGame(difficulty)}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-sm"
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

      {/* ─── 4. Pause Menu Screen Overlay Modal ─── */}
      {paused && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative"
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Info className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
                Game Paused
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                Take a deep breath. Focus is key. Resume when you are ready.
              </p>

              {/* Stats Summary while paused */}
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-6 text-left grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Score</span>
                  <span className="text-base font-extrabold text-violet-600 dark:text-violet-400">{score}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Level</span>
                  <span className="text-base font-extrabold text-gray-800 dark:text-white">{level}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Accuracy</span>
                  <span className="text-base font-extrabold text-emerald-500">{accuracy}%</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Time Played</span>
                  <span className="text-base font-extrabold text-gray-800 dark:text-white">{formatTime(timeElapsed)}</span>
                </div>
              </div>

              {/* Pause Actions */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={resumeGame}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-sm"
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

export default PatternMatrixGame;
