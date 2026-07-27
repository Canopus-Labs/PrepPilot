import { useState, useEffect, useCallback, useRef } from "react";
import {
  playCardFlipSound,
  playMatchSuccessSound,
  playMatchWrongSound,
  playVictorySound,
  initAudioContext,
} from "../utils/matchAudio";

// ─── Game Difficulty Specifications ─────────────────────────────────────────────
export const DIFFICULTY_CONFIGS = {
  easy: {
    id: "easy",
    label: "Easy",
    rows: 4,
    cols: 4,
    pairs: 8,
    multiplier: 1.0,
    maxExpectedTime: 45, // Seconds for speed achievement check
    description: "4×4 grid. 8 matching pairs. Relaxed pace for brain warming.",
  },
  medium: {
    id: "medium",
    label: "Medium",
    rows: 5,
    cols: 4,
    pairs: 10,
    multiplier: 1.8,
    maxExpectedTime: 65,
    description: "5×4 grid. 10 matching pairs. Standard working memory challenge.",
  },
  hard: {
    id: "hard",
    label: "Hard",
    rows: 6,
    cols: 6,
    pairs: 18,
    multiplier: 3.5,
    maxExpectedTime: 120,
    description: "6×6 grid. 18 matching pairs. Dense layout requiring high focus.",
  },
  extreme: {
    id: "extreme",
    label: "Extreme",
    rows: 6,
    cols: 6, // Chosen dynamically during generation
    pairs: 18,
    multiplier: 5.5,
    maxExpectedTime: 100,
    description: "Random grid size layout. Accelerated speed rules and scoring multipliers.",
  },
};

// Unique index values mapping to Lucide Icons in the React view component
export const ICON_CATALOG_SIZE = 18;

export const useMemoryMatch = () => {
  // ─── Game Phases ─────────────────────────────────────────────────────────────
  // 'instructions' | 'playing' | 'victory'
  const [phase, setPhase] = useState("instructions");
  const [difficulty, setDifficulty] = useState("medium");
  const [paused, setPaused] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(false);

  // ─── Card Deck State ──────────────────────────────────────────────────────────
  // Cards are structured as: { id, iconIndex, isFlipped, isMatched }
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [rowsCount, setRowsCount] = useState(4);
  const [colsCount, setColsCount] = useState(5);

  // ─── Metrics & Scoring ────────────────────────────────────────────────────────
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [maxCombo, setMaxCombo] = useState(1);
  const [stars, setStars] = useState(3);
  const [wrongMoves, setWrongMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  // High Scores & Achievements
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("memory_match_high_score");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [achievements, setAchievements] = useState([]);
  const [perfectGame, setPerfectGame] = useState(false);

  // Timers and execution refs
  const gameIntervalRef = useRef(null);
  const flipbackTimeoutRef = useRef(null);

  const config = DIFFICULTY_CONFIGS[difficulty];

  // Live playtime tracker
  useEffect(() => {
    if (phase === "playing" && !paused) {
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

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      if (flipbackTimeoutRef.current) clearTimeout(flipbackTimeoutRef.current);
    };
  }, []);

  // ─── Deterministic LCG Shuffler for Daily Challenge ──────────────────────────
  const seedShuffle = (array, seed) => {
    let m = 0x80000000; // 2**31
    let a = 1103515245;
    let c = 12345;
    let s = seed;
    
    const nextRandom = () => {
      s = (a * s + c) % m;
      return s / m;
    };

    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(nextRandom() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Standard Random Shuffle
  const randomShuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // ─── Initialize Game Board ───────────────────────────────────────────────────
  const startGame = useCallback((selectedDiff = difficulty, challengeMode = dailyChallenge) => {
    initAudioContext();
    if (flipbackTimeoutRef.current) clearTimeout(flipbackTimeoutRef.current);

    setDifficulty(selectedDiff);
    setDailyChallenge(challengeMode);
    setPaused(false);
    setMoves(0);
    setScore(0);
    setCombo(1);
    setMaxCombo(1);
    setWrongMoves(0);
    setTimeElapsed(0);
    setFlippedIndices([]);
    setAchievements([]);
    setPerfectGame(false);

    // Determine grid columns and rows based on difficulty setting
    let rows = DIFFICULTY_CONFIGS[selectedDiff].rows;
    let cols = DIFFICULTY_CONFIGS[selectedDiff].cols;
    let pairsCount = DIFFICULTY_CONFIGS[selectedDiff].pairs;

    if (selectedDiff === "extreme") {
      // Choose a random layout for extreme mode:
      // Option A: 6x4 = 24 cards (12 pairs)
      // Option B: 6x5 = 30 cards (15 pairs)
      // Option C: 6x6 = 36 cards (18 pairs)
      const options = [
        { r: 6, c: 4, p: 12 },
        { r: 6, c: 5, p: 15 },
        { r: 6, c: 6, p: 18 },
      ];
      // If daily challenge is enabled, choose seed-based layout, else random
      const dateInt = new Date().getFullYear() * 10000 + (new Date().getMonth() + 1) * 100 + new Date().getDate();
      const index = challengeMode ? (dateInt % options.length) : Math.floor(Math.random() * options.length);
      
      rows = options[index].r;
      cols = options[index].c;
      pairsCount = options[index].p;
    }

    setRowsCount(rows);
    setColsCount(cols);

    // Build card pair pool
    const iconIndices = Array.from({ length: pairsCount }, (_, i) => i);
    const deckPool = [...iconIndices, ...iconIndices];

    // Shuffle the deck pool
    let shuffledDeck = [];
    if (challengeMode) {
      // Create seed based on calendar date (YYYYMMDD)
      const dateSeed = new Date().getFullYear() * 10000 + (new Date().getMonth() + 1) * 100 + new Date().getDate();
      shuffledDeck = seedShuffle(deckPool, dateSeed);
    } else {
      shuffledDeck = randomShuffle(deckPool);
    }

    // Map into card objects
    const initialCards = shuffledDeck.map((iconIdx, idx) => ({
      id: idx,
      iconIndex: iconIdx,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(initialCards);
    setPhase("playing");
  }, [difficulty, dailyChallenge]);

  // ─── Flip Card Selection Logic ────────────────────────────────────────────────
  const flipCard = useCallback((cardIndex) => {
    if (phase !== "playing" || paused) return;
    if (cards[cardIndex].isFlipped || cards[cardIndex].isMatched) return;
    if (flippedIndices.length >= 2) return; // Prevent clicking a 3rd card during check

    // Set clicked card as flipped
    playCardFlipSound();
    
    const updatedCards = cards.map((c, i) => i === cardIndex ? { ...c, isFlipped: true } : c);
    setCards(updatedCards);

    const nextFlipped = [...flippedIndices, cardIndex];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      // Completed a move pair
      const nextMoves = moves + 1;
      setMoves(nextMoves);

      const [firstIdx, secondIdx] = nextFlipped;
      const card1 = cards[firstIdx];
      const card2 = cards[cardIndex]; // current card

      if (card1.iconIndex === card2.iconIndex) {
        // ─── CORRESPONDING MATCH FOUND ───
        playMatchSuccessSound();
        
        // Mark match states immediately
        const matchedCards = updatedCards.map((c, i) => 
          (i === firstIdx || i === secondIdx) ? { ...c, isMatched: true } : c
        );
        setCards(matchedCards);
        
        // Combo multiplier progression
        const currentCombo = combo;
        const pts = Math.round(100 * currentCombo * DIFFICULTY_CONFIGS[difficulty].multiplier);
        setScore((s) => s + pts);

        const nextCombo = combo + 1;
        setCombo(nextCombo);
        setMaxCombo((m) => Math.max(m, nextCombo));

        setFlippedIndices([]);

        // Evaluate victory phase
        const allMatched = matchedCards.every((c) => c.isMatched);
        if (allMatched) {
          triggerVictory(matchedCards, nextMoves, nextCombo - 1, wrongMoves);
        }
      } else {
        // ─── MISMATCH ───
        playMatchWrongSound();
        setWrongMoves((w) => w + 1);
        setCombo(1); // Mismatch breaks combo

        // Schedule flip back timers
        if (flipbackTimeoutRef.current) clearTimeout(flipbackTimeoutRef.current);
        flipbackTimeoutRef.current = setTimeout(() => {
          const revertedCards = updatedCards.map((c, i) => 
            (i === firstIdx || i === secondIdx) ? { ...c, isFlipped: false } : c
          );
          setCards(revertedCards);
          setFlippedIndices([]);
        }, 900);
      }
    }
  }, [phase, paused, cards, flippedIndices, moves, combo, difficulty, wrongMoves]);

  // ─── Victory Operations ──────────────────────────────────────────────────────
  const triggerVictory = (finalCards, totalMoves, finalMaxCombo, totalWrong) => {
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    playVictorySound();
    setPhase("victory");

    // 1. Calculate Star rating based on grid efficiency
    const totalPairs = finalCards.length / 2;
    // Perfect moves is totalPairs (e.g. 8 moves on easy). We scale star boundaries around that:
    let finalStars = 1;
    if (difficulty === "easy") {
      if (totalMoves <= 11) finalStars = 3;
      else if (totalMoves <= 16) finalStars = 2;
    } else if (difficulty === "medium") {
      if (totalMoves <= 14) finalStars = 3;
      else if (totalMoves <= 21) finalStars = 2;
    } else { // Hard or Extreme
      if (totalMoves <= 26) finalStars = 3;
      else if (totalMoves <= 36) finalStars = 2;
    }
    setStars(finalStars);

    // 2. Score Time Bonus
    let timeBonus = 0;
    const timeCap = config.maxExpectedTime;
    if (timeElapsed < timeCap) {
      timeBonus = Math.round((timeCap - timeElapsed) * 15 * config.multiplier);
      setScore((s) => s + timeBonus);
    }

    // 3. Perfect Game check
    const isPerfect = totalWrong === 0;
    setPerfectGame(isPerfect);
    if (isPerfect) {
      setScore((s) => s + 500); // 500 bonus points for perfect game
    }

    // 4. Achievement unlocking checks
    const unlocked = [];
    if (isPerfect) {
      unlocked.push({ id: "perfect", title: "Perfect Recall", desc: "Matched all pairs with zero incorrect moves!" });
    }
    if (finalMaxCombo >= 5) {
      unlocked.push({ id: "combo", title: "Combo Master", desc: "Achieved a combo multiplier of 5x or higher!" });
    }
    if (timeElapsed <= config.maxExpectedTime * 0.6) {
      unlocked.push({ id: "speed", title: "Speed Demon", desc: "Completed the memory board in record time!" });
    }
    setAchievements(unlocked);

    // 5. Update and persist High Score
    setHighScore((prevHigh) => {
      // Account for score updates (including time bonus and perfect bonus)
      const finalScore = score + timeBonus + (isPerfect ? 500 : 0);
      if (finalScore > prevHigh) {
        localStorage.setItem("memory_match_high_score", finalScore.toString());
        return finalScore;
      }
      return prevHigh;
    });
  };

  // ─── Pause & Reset controls ──────────────────────────────────────────────────
  const pauseGame = useCallback(() => {
    if (phase !== "playing") return;
    setPaused(true);
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
  }, [phase]);

  const resumeGame = useCallback(() => {
    if (!paused) return;
    setPaused(false);
    initAudioContext();
  }, [paused]);

  const quitGame = useCallback(() => {
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    if (flipbackTimeoutRef.current) clearTimeout(flipbackTimeoutRef.current);
    setPhase("instructions");
    setPaused(false);
    setCards([]);
    setFlippedIndices([]);
  }, []);

  // Compute live match accuracy metric
  const accuracy = moves > 0 ? Math.round(((moves - wrongMoves) / moves) * 100) : 100;

  return {
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
  };
};
