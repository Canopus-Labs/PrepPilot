import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Trophy,
  Clock,
  Target,
  Zap,
  BarChart2,
  Keyboard,
} from "lucide-react";

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog near the river bank where wild flowers grow.",
  "Programming is the art of telling a computer what to do through a set of instructions.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Practice makes progress. Every keystroke brings you closer to mastering your craft.",
  "Focus is the ability to concentrate on one task without distraction or interruption.",
];

const TypingSpeedGame = () => {
  const [gameState, setGameState] = useState("idle"); // idle | playing | done
  const [sampleText, setSampleText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const DURATION_MAP = { easy: 120, medium: 60, hard: 30 };
  const DURATION = DURATION_MAP[selectedDifficulty];

  const startGame = useCallback(() => {
    const text = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setSampleText(text);
    setUserInput("");
    setStartTime(null);
    setElapsedTime(0);
    setWpm(0);
    setAccuracy(100);
    setGameState("playing");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;

    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }

    setUserInput(value);

    if (value.length > 0) {
      const elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
      const words = value.trim().split(/\s+/).filter(Boolean).length;
      const currentWpm = elapsed > 0 ? Math.round(words / elapsed) : 0;
      setWpm(currentWpm);
    }

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === sampleText[i]) correct++;
    }
    const acc = value.length > 0 ? Math.round((correct / value.length) * 100) : 100;
    setAccuracy(acc);

    // End when user finishes the text
    if (value.length >= sampleText.length) {
      finishGame(value);
    }
  };

  const finishGame = useCallback(
    (finalInput) => {
      clearInterval(timerRef.current);
      const endTime = Date.now();
      const elapsed = (endTime - startTime) / 1000 / 60; // minutes
      const words = (finalInput || userInput).trim().split(/\s+/).filter(Boolean).length;
      const finalWpm = elapsed > 0 ? Math.round(words / elapsed) : 0;

      let correct = 0;
      const text = finalInput || userInput;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === sampleText[i]) correct++;
      }
      const finalAcc = text.length > 0 ? Math.round((correct / text.length) * 100) : 100;

      setWpm(finalWpm);
      setAccuracy(finalAcc);
      setElapsedTime(Math.round((endTime - startTime) / 1000));
      setGameState("done");
    },
    [startTime, userInput, sampleText]
  );

  // Countdown timer for hard mode
  useEffect(() => {
    if (gameState !== "playing" || !startTime) return;

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = DURATION - elapsed;
      setElapsedTime(remaining);

      if (remaining <= 0) {
        finishGame(userInput);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [gameState, startTime, DURATION, finishGame, userInput]);

  const resetGame = () => {
    clearInterval(timerRef.current);
    setGameState("idle");
    setUserInput("");
    setStartTime(null);
    setElapsedTime(0);
    setWpm(0);
    setAccuracy(100);
  };

  const getWpmLabel = (wpm) => {
    if (wpm >= 80) return { label: "Elite", color: "text-emerald-400" };
    if (wpm >= 60) return { label: "Fast", color: "text-green-400" };
    if (wpm >= 40) return { label: "Good", color: "text-yellow-400" };
    if (wpm >= 20) return { label: "Average", color: "text-orange-400" };
    return { label: "Beginner", color: "text-red-400" };
  };

  const getAccLabel = (acc) => {
    if (acc >= 98) return { label: "Excellent", color: "text-emerald-400" };
    if (acc >= 95) return { label: "Great", color: "text-green-400" };
    if (acc >= 85) return { label: "Good", color: "text-yellow-400" };
    if (acc >= 70) return { label: "Fair", color: "text-orange-400" };
    return { label: "Keep Practicing", color: "text-red-400" };
  };

  if (gameState === "idle") {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center"
        >
          <Keyboard className="w-16 h-16 mx-auto mb-4 text-violet-500" />
          <h3 className="text-2xl font-bold mb-2">Typing Speed Challenge</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Measure your typing speed and accuracy. Choose a difficulty level and start typing!
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {["easy", "medium", "hard"].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-5 py-2 rounded-xl font-medium capitalize transition-all ${
                  selectedDifficulty === d
                    ? "bg-violet-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900/30"
                }`}
              >
                {d} — {DURATION_MAP[d]}s
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
              <Zap className="w-5 h-5 mx-auto mb-1 text-amber-500" />
              <div className="text-xl font-bold">WPM</div>
              <div className="text-sm text-gray-500">Words per minute</div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
              <Target className="w-5 h-5 mx-auto mb-1 text-green-500" />
              <div className="text-xl font-bold">Accuracy</div>
              <div className="text-sm text-gray-500">Error-free keystrokes</div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
              <Clock className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <div className="text-xl font-bold">{DURATION}s</div>
              <div className="text-sm text-gray-500">Time limit</div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-lg shadow-lg transition-colors"
          >
            Start Challenge
          </button>
        </motion.div>
      </div>
    );
  }

  if (gameState === "done") {
    const wpmInfo = getWpmLabel(wpm);
    const accInfo = getAccLabel(accuracy);
    const score = Math.round(wpm * (accuracy / 100));

    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center"
        >
          <Trophy className="w-16 h-16 mx-auto mb-4 text-amber-500" />
          <h3 className="text-2xl font-bold mb-1">Challenge Complete!</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Here is how you performed</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
              <Zap className="w-5 h-5 mx-auto mb-1 text-amber-500" />
              <div className="text-2xl font-bold">{wpm}</div>
              <div className={`text-sm font-medium ${wpmInfo.color}`}>{wpmInfo.label}</div>
              <div className="text-xs text-gray-500 mt-1">WPM</div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
              <Target className="w-5 h-5 mx-auto mb-1 text-green-500" />
              <div className="text-2xl font-bold">{accuracy}%</div>
              <div className={`text-sm font-medium ${accInfo.color}`}>{accInfo.label}</div>
              <div className="text-xs text-gray-500 mt-1">Accuracy</div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
              <Clock className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <div className="text-2xl font-bold">{elapsedTime}s</div>
              <div className="text-sm text-gray-400">Time Taken</div>
              <div className="text-xs text-gray-500 mt-1">seconds</div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
              <BarChart2 className="w-5 h-5 mx-auto mb-1 text-amber-600" />
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{score}</div>
              <div className="text-sm text-amber-600 dark:text-amber-500">Score</div>
              <div className="text-xs text-gray-500 mt-1">WPM x Acc</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={startGame}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-lg transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white rounded-xl font-bold transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Playing state
  const totalChars = sampleText.length;
  const typed = userInput.length;
  const progress = Math.round((typed / totalChars) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Stats bar */}
      <div className="flex items-center justify-between mb-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-lg font-bold">{wpm}</span>
            <span className="text-xs text-gray-500">WPM</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-green-500" />
            <span className="text-lg font-bold">{accuracy}%</span>
            <span className="text-xs text-gray-500">Accuracy</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          <span className="text-lg font-bold">{elapsedTime}s</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-violet-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-right text-xs text-gray-500 mt-1">{progress}% complete</div>
      </div>

      {/* Sample text with character highlighting */}
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 mb-4 font-mono text-base leading-relaxed select-none">
        {sampleText.split("").map((char, i) => {
          let cls = "text-gray-400"; // untyped
          if (i < userInput.length) {
            cls = userInput[i] === char ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 bg-red-100 dark:bg-red-900/40 line-through";
          } else if (i === userInput.length) {
            cls = "text-violet-600 dark:text-violet-400 border-b-2 border-violet-500";
          }
          return (
            <span key={i} className={cls}>
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>

      {/* Hidden input */}
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleInput}
        className="opacity-0 absolute -z-10 w-0 h-0"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {/* Instructions */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Start typing above — the timer starts on your first keystroke.
        <button
          onClick={resetGame}
          className="ml-3 text-violet-500 hover:text-violet-600 font-medium"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TypingSpeedGame;
