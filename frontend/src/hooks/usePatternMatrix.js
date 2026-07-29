import { useState, useEffect, useCallback, useRef } from "react";
import {
  playCountdownTick,
  playCorrectTileSound,
  playWrongTileSound,
  playLevelWinSound,
  playGameOverSound,
  initAudioContext,
} from "../utils/matrixAudio";

// ─── Game Difficulties ────────────────────────────────────────────────────────
export const DIFFICULTY_CONFIGS = {
  easy: {
    id: "easy",
    label: "Easy",
    gridSize: 3,
    targetCount: 3,
    displayDuration: 2500, // Pattern display duration (ms)
    multiplier: 1.0,
    description: "3×3 grid, 3 tiles. Pattern visible for 2.5s. Perfect for focus onboarding.",
  },
  medium: {
    id: "medium",
    label: "Medium",
    gridSize: 4,
    targetCount: 5,
    displayDuration: 1800,
    multiplier: 1.8,
    description: "4×4 grid, 5–6 tiles. Pattern visible for 1.8s. Standard memory test.",
  },
  hard: {
    id: "hard",
    label: "Hard",
    gridSize: 5,
    targetCount: 8,
    displayDuration: 1200,
    multiplier: 3.2,
    description: "5×5 grid, 8–10 tiles. Pattern visible for 1.2s. High focus density.",
  },
  extreme: {
    id: "extreme",
    label: "Extreme",
    gridSize: 3, // Starts at 3, scales progressively
    targetCount: 3,
    displayDuration: 850,
    multiplier: 5.0,
    description: "Adaptive grid sizes (3x3 to 6x6), rapid previews, and progressive challenges.",
  },
};

export const usePatternMatrix = () => {
  // ─── Game State Phases ───────────────────────────────────────────────────────
  // 'instructions' | 'countdown' | 'preview' | 'playing' | 'reveal' | 'gameover'
  const [phase, setPhase] = useState("instructions");
  const [difficulty, setDifficulty] = useState("medium");
  const [paused, setPaused] = useState(false);

  // ─── Grid Configurations ────────────────────────────────────────────────────
  const [gridSize, setGridSize] = useState(4);
  const [targetCount, setTargetCount] = useState(5);
  const [targets, setTargets] = useState(new Set());
  const [selected, setSelected] = useState(new Set());
  const [wrongClicks, setWrongClicks] = useState(new Set());
  const [lives, setLives] = useState(3);

  // ─── Onscreen Displays & Countdowns ─────────────────────────────────────────
  const [countdownVal, setCountdownVal] = useState(3);
  const [previewProgress, setPreviewProgress] = useState(100);
  const [showScorePopup, setShowScorePopup] = useState(null); // { x, y, value } for float animations

  // ─── Metrics & Scores ──────────────────────────────────────────────────────
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("matrix_high_score");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [totalClicks, setTotalClicks] = useState(0);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Timer reference stores
  const displayTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const gameIntervalRef = useRef(null);
  const previewTickIntervalRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  const config = DIFFICULTY_CONFIGS[difficulty];

  // ─── Helper: Clear All Active Timers ────────────────────────────────────────
  const clearTimers = useCallback(() => {
    if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    if (previewTickIntervalRef.current) clearInterval(previewTickIntervalRef.current);
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
  }, []);

  // Time Played Counter
  useEffect(() => {
    if ((phase === "playing" || phase === "preview" || phase === "countdown") && !paused) {
      gameIntervalRef.current = setInterval(() => {
        setTimeElapsed((t) => t + 1);
      }, 1000);
    } else {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    }
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    };
  }, [phase, paused]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  // ─── Helper: Generate Unique Random Grid Targets ─────────────────────────────
  const generateRandomTargets = (size, count) => {
    const totalTiles = size * size;
    const indices = Array.from({ length: totalTiles }, (_, i) => i);
    
    // Fisher-Yates Shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    return new Set(indices.slice(0, count));
  };

  // ─── Calculate Grid Size & Targets based on Difficulty ──────────────────────
  const setupGridSpecsForLevel = useCallback((lvlIndex, diffId) => {
    const currentConfig = DIFFICULTY_CONFIGS[diffId];
    if (diffId !== "extreme") {
      setGridSize(currentConfig.gridSize);
      // Alternates target sizes slightly for variety
      const baseTarget = currentConfig.targetCount;
      const count = lvlIndex % 2 === 0 ? baseTarget : baseTarget + 1;
      setTargetCount(count);
      return { size: currentConfig.gridSize, count };
    } else {
      // EXTREME PROGRESSIVE MODE SIZES:
      // Level 1-2: 3x3 grid, 3-4 targets
      // Level 3-4: 4x4 grid, 5-6 targets
      // Level 5-6: 4x4 grid, 6-7 targets
      // Level 7-8: 5x5 grid, 8-9 targets
      // Level 9-10: 5x5 grid, 9-10 targets
      // Level 11+: 6x6 grid, progressive targets capped at 16
      let size = 3;
      let count = 3;

      if (lvlIndex <= 2) {
        size = 3;
        count = 2 + lvlIndex; // 3, 4
      } else if (lvlIndex <= 4) {
        size = 4;
        count = 3 + lvlIndex; // 6, 7
      } else if (lvlIndex <= 6) {
        size = 4;
        count = 4 + lvlIndex; // 9, 10
      } else if (lvlIndex <= 8) {
        size = 5;
        count = 3 + lvlIndex; // 10, 11
      } else if (lvlIndex <= 10) {
        size = 5;
        count = 4 + lvlIndex; // 13, 14
      } else {
        size = 6;
        count = Math.min(16, 5 + lvlIndex);
      }

      setGridSize(size);
      setTargetCount(count);
      return { size, count };
    }
  }, []);

  // ─── Start Pattern Preview Phase ─────────────────────────────────────────────
  const startPreview = useCallback((lvlIndex, diffId) => {
    clearTimers();
    setPhase("preview");
    setSelected(new Set());
    setWrongClicks(new Set());
    
    // Establish grid spec and generate pattern
    const { size, count } = setupGridSpecsForLevel(lvlIndex, diffId);
    const newTargets = generateRandomTargets(size, count);
    setTargets(newTargets);

    // Compute display duration (decreases progressively on extreme mode)
    const baseDuration = DIFFICULTY_CONFIGS[diffId].displayDuration;
    const duration = diffId === "extreme" 
      ? Math.max(500, baseDuration - (lvlIndex - 1) * 45) // gets faster by 45ms per level down to 500ms
      : baseDuration;

    setPreviewProgress(100);
    const intervalMs = 25;
    let elapsed = 0;

    // Start progress bar tick timer
    previewTickIntervalRef.current = setInterval(() => {
      elapsed += intervalMs;
      const progress = Math.max(0, 100 - (elapsed / duration) * 100);
      setPreviewProgress(progress);

      if (elapsed >= duration) {
        clearInterval(previewTickIntervalRef.current);
        setPhase("playing");
      }
    }, intervalMs);

  }, [setupGridSpecsForLevel, clearTimers]);

  // ─── Start 3-2-1 Countdown Timer ─────────────────────────────────────────────
  const startCountdown = useCallback((lvlIndex = level, diffId = difficulty) => {
    clearTimers();
    setPhase("countdown");
    setCountdownVal(3);
    playCountdownTick();

    let value = 3;
    countdownIntervalRef.current = setInterval(() => {
      value -= 1;
      setCountdownVal(value);
      
      if (value > 0) {
        playCountdownTick();
      } else {
        clearInterval(countdownIntervalRef.current);
        startPreview(lvlIndex, diffId);
      }
    }, 1000);
  }, [level, difficulty, startPreview, clearTimers]);

  // ─── Start / Restart Entire Challenge ────────────────────────────────────────
  const startGame = useCallback((selectedDiff = difficulty) => {
    initAudioContext();
    clearTimers();
    
    setDifficulty(selectedDiff);
    setPaused(false);
    setScore(0);
    setLevel(1);
    setStreak(0);
    setMaxStreak(0);
    setTotalClicks(0);
    setCorrectClicks(0);
    setTimeElapsed(0);
    setLives(3);
    setShowScorePopup(null);

    // Trigger initial countdown
    startCountdown(1, selectedDiff);
  }, [difficulty, startCountdown, clearTimers]);

  // ─── Handle Interactive Grid Tile Selection ───
  const handleTileClick = useCallback((tileIndex) => {
    if (phase !== "playing" || paused) return;
    if (selected.has(tileIndex) || wrongClicks.has(tileIndex)) return;

    setTotalClicks((c) => c + 1);

    const isMatch = targets.has(tileIndex);

    if (isMatch) {
      // ─── CORRECT CLICK ───
      setCorrectClicks((c) => c + 1);
      playCorrectTileSound(tileIndex, gridSize * gridSize);
      
      const newSelected = new Set([...selected, tileIndex]);
      setSelected(newSelected);

      if (newSelected.size === targets.size) {
        // Round Win! All targets matched
        playLevelWinSound();
        
        // Success calculations
        const diffMultiplier = DIFFICULTY_CONFIGS[difficulty].multiplier;
        const ptsEarned = Math.round((50 * level * diffMultiplier) + (10 * targets.size));
        setScore((s) => s + ptsEarned);
        
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        setMaxStreak((m) => Math.max(m, nextStreak));

        // Floating score popup coordinates
        setShowScorePopup({
          value: `+${ptsEarned}`,
          time: Date.now(),
        });

        // Shift to a brief victory phase, then proceed
        setPhase("reveal");
        const nextLevel = level + 1;
        setLevel(nextLevel);

        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = setTimeout(() => {
          setShowScorePopup(null);
          startCountdown(nextLevel, difficulty);
        }, 1100);
      }
    } else {
      // ─── WRONG CLICK ───
      playWrongTileSound();
      setStreak(0);
      
      const newWrong = new Set([...wrongClicks, tileIndex]);
      setWrongClicks(newWrong);

      // Decrement lives
      const nextLives = lives - 1;
      setLives(nextLives);

      // Trigger reveal phase to show correct pattern
      setPhase("reveal");

      if (nextLives <= 0) {
        // Game Over!
        playGameOverSound();
        
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = setTimeout(() => {
          setPhase("gameover");
          setHighScore((prevHigh) => {
            if (score > prevHigh) {
              localStorage.setItem("matrix_high_score", score.toString());
              return score;
            }
            return prevHigh;
          });
        }, 1500);
      } else {
        // Lives remaining: wait briefly, then replay same level with new pattern
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = setTimeout(() => {
          startCountdown(level, difficulty);
        }, 1500);
      }
    }
  }, [phase, paused, selected, wrongClicks, targets, gridSize, difficulty, level, streak, lives, score, startCountdown, clearTimers]);

  // ─── Pause & Resume Utilities ────────────────────────────────────────────────
  const pauseGame = useCallback(() => {
    if (phase !== "playing" && phase !== "preview" && phase !== "countdown") return;
    setPaused(true);
    clearTimers();
  }, [phase, clearTimers]);

  const resumeGame = useCallback(() => {
    if (!paused) return;
    setPaused(false);
    initAudioContext();

    if (phase === "countdown") {
      // Resume countdown
      startCountdown(level, difficulty);
    } else if (phase === "preview") {
      // Resume preview at remaining progress
      setPhase("preview");
      const baseDuration = DIFFICULTY_CONFIGS[difficulty].displayDuration;
      const duration = difficulty === "extreme" 
        ? Math.max(500, baseDuration - (level - 1) * 45)
        : baseDuration;
      const remainingTime = (previewProgress / 100) * duration;
      
      let elapsed = duration - remainingTime;
      const intervalMs = 25;

      previewTickIntervalRef.current = setInterval(() => {
        elapsed += intervalMs;
        const progress = Math.max(0, 100 - (elapsed / duration) * 100);
        setPreviewProgress(progress);

        if (elapsed >= duration) {
          clearInterval(previewTickIntervalRef.current);
          setPhase("playing");
        }
      }, intervalMs);
    } else if (phase === "playing") {
      // Return straight to active user input
      setPhase("playing");
    }
  }, [paused, phase, level, difficulty, previewProgress, startCountdown]);

  // Exit back to dashboard setup
  const quitGame = useCallback(() => {
    clearTimers();
    setPhase("instructions");
    setPaused(false);
    setTargets(new Set());
    setSelected(new Set());
    setWrongClicks(new Set());
  }, [clearTimers]);

  // Live click accuracy percentage
  const accuracy = totalClicks > 0 ? Math.round((correctClicks / totalClicks) * 100) : 100;

  return {
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
  };
};
