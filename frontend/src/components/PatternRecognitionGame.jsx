import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Binary,
  Timer,
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Brain,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

// ─── Question Generator Helper Functions ────────────────────────────────────

// Check if number is prime
const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

// Generate list of primes up to n
const getPrimes = (count, startAfter = 2) => {
  const primes = [];
  let candidate = startAfter;
  while (primes.length < count) {
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
    candidate++;
  }
  return primes;
};

// Generate 4 unique distractors around correct answer
const generateOptions = (correctAnswer, approxStep = 2) => {
  const optionsSet = new Set([correctAnswer]);
  const candidates = [
    correctAnswer + approxStep,
    correctAnswer - approxStep,
    correctAnswer + 1,
    correctAnswer - 1,
    correctAnswer + 2,
    correctAnswer - 2,
    correctAnswer + (approxStep > 1 ? approxStep * 2 : 3),
    correctAnswer - (approxStep > 1 ? approxStep * 2 : 3),
    correctAnswer + Math.max(2, Math.floor(Math.abs(correctAnswer) * 0.15)),
    correctAnswer - Math.max(2, Math.floor(Math.abs(correctAnswer) * 0.15)),
  ];

  for (const cand of candidates) {
    if (optionsSet.size >= 4) break;
    if (cand !== correctAnswer) {
      optionsSet.add(cand);
    }
  }

  let offset = 1;
  while (optionsSet.size < 4) {
    if (!optionsSet.has(correctAnswer + offset)) optionsSet.add(correctAnswer + offset);
    if (optionsSet.size < 4 && !optionsSet.has(correctAnswer - offset)) optionsSet.add(correctAnswer - offset);
    offset++;
  }

  const optionsArr = Array.from(optionsSet).slice(0, 4);
  // Shuffle options
  for (let i = optionsArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsArr[i], optionsArr[j]] = [optionsArr[j], optionsArr[i]];
  }
  return optionsArr;
};

// Generate 10 progressive questions for a single game round
const generateQuestions = () => {
  const questions = [];

  // Question 1: Easy Addition (Arithmetic)
  const q1Step = Math.floor(Math.random() * 5) + 2; // +2 to +6
  const q1Start = Math.floor(Math.random() * 15) + 1;
  const q1Seq = Array.from({ length: 5 }, (_, i) => q1Start + i * q1Step);
  const q1Ans = q1Seq[4];
  questions.push({
    id: 1,
    levelName: "Level 1 • Easy",
    difficultyBadge: "Easy",
    sequence: [...q1Seq.slice(0, 4), "?"],
    correctAnswer: q1Ans,
    options: generateOptions(q1Ans, q1Step),
    explanation: `Arithmetic sequence: Add ${q1Step} to each term (${q1Seq[3]} + ${q1Step} = ${q1Ans}).`,
  });

  // Question 2: Easy Subtraction (Arithmetic)
  const q2Step = Math.floor(Math.random() * 4) + 3; // -3 to -6
  const q2Start = Math.floor(Math.random() * 20) + 40; // 40 to 60
  const q2Seq = Array.from({ length: 5 }, (_, i) => q2Start - i * q2Step);
  const q2Ans = q2Seq[4];
  questions.push({
    id: 2,
    levelName: "Level 1 • Easy",
    difficultyBadge: "Easy",
    sequence: [...q2Seq.slice(0, 4), "?"],
    correctAnswer: q2Ans,
    options: generateOptions(q2Ans, q2Step),
    explanation: `Arithmetic sequence: Subtract ${q2Step} from each term (${q2Seq[3]} - ${q2Step} = ${q2Ans}).`,
  });

  // Question 3: Medium Geometric (Multiplication)
  const q3Ratio = Math.floor(Math.random() * 2) + 2; // 2 or 3
  const q3Start = Math.floor(Math.random() * 4) + 2; // 2 to 5
  const q3Seq = Array.from({ length: 5 }, (_, i) => q3Start * Math.pow(q3Ratio, i));
  const q3Ans = q3Seq[4];
  questions.push({
    id: 3,
    levelName: "Level 2 • Medium",
    difficultyBadge: "Medium",
    sequence: [...q3Seq.slice(0, 4), "?"],
    correctAnswer: q3Ans,
    options: generateOptions(q3Ans, q3Ans / q3Ratio),
    explanation: `Geometric sequence: Multiply each term by ${q3Ratio} (${q3Seq[3]} × ${q3Ratio} = ${q3Ans}).`,
  });

  // Question 4: Medium Step-Increasing Difference (+2, +3, +4, +5...)
  const q4Start = Math.floor(Math.random() * 8) + 1;
  const q4BaseDiff = Math.floor(Math.random() * 3) + 1;
  const q4Seq = [q4Start];
  for (let i = 0; i < 4; i++) {
    q4Seq.push(q4Seq[i] + q4BaseDiff + i);
  }
  const q4Ans = q4Seq[4];
  const lastDiff = q4BaseDiff + 3;
  questions.push({
    id: 4,
    levelName: "Level 2 • Medium",
    difficultyBadge: "Medium",
    sequence: [...q4Seq.slice(0, 4), "?"],
    correctAnswer: q4Ans,
    options: generateOptions(q4Ans, lastDiff),
    explanation: `Step-increasing difference: Diffs are +${q4BaseDiff}, +${q4BaseDiff + 1}, +${q4BaseDiff + 2}, +${lastDiff} (${q4Seq[3]} + ${lastDiff} = ${q4Ans}).`,
  });

  // Question 5: Hard Fibonacci Variant
  const fibA = Math.floor(Math.random() * 3) + 1;
  const fibB = Math.floor(Math.random() * 4) + 1;
  const fibSeq = [fibA, fibB];
  for (let i = 2; i < 6; i++) {
    fibSeq.push(fibSeq[i - 1] + fibSeq[i - 2]);
  }
  const fibAns = fibSeq[5];
  questions.push({
    id: 5,
    levelName: "Level 3 • Hard",
    difficultyBadge: "Hard",
    sequence: [...fibSeq.slice(0, 5), "?"],
    correctAnswer: fibAns,
    options: generateOptions(fibAns, fibSeq[4] - fibSeq[3]),
    explanation: `Fibonacci sequence: Each number is the sum of the previous two (${fibSeq[4]} + ${fibSeq[3]} = ${fibAns}).`,
  });

  // Question 6: Hard Squares Pattern (n^2 + k)
  const q6Offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
  const q6StartN = Math.floor(Math.random() * 3) + 1; // 1 to 3
  const q6Seq = Array.from({ length: 5 }, (_, i) => Math.pow(q6StartN + i, 2) + q6Offset);
  const q6Ans = q6Seq[4];
  const q6NVal = q6StartN + 4;
  questions.push({
    id: 6,
    levelName: "Level 3 • Hard",
    difficultyBadge: "Hard",
    sequence: [...q6Seq.slice(0, 4), "?"],
    correctAnswer: q6Ans,
    options: generateOptions(q6Ans, 2 * q6NVal),
    explanation: `Squares pattern: Terms are n²${q6Offset >= 0 ? "+" + q6Offset : q6Offset} (${q6NVal}²${q6Offset >= 0 ? "+" + q6Offset : q6Offset} = ${q6Ans}).`,
  });

  // Question 7: Advanced Prime Numbers Sequence
  const primeStart = Math.floor(Math.random() * 15) + 2;
  const primes = getPrimes(6, primeStart);
  const primeAns = primes[5];
  questions.push({
    id: 7,
    levelName: "Level 4 • Advanced",
    difficultyBadge: "Advanced",
    sequence: [...primes.slice(0, 5), "?"],
    correctAnswer: primeAns,
    options: generateOptions(primeAns, 2),
    explanation: `Prime numbers sequence: Consecutive prime numbers starting after ${primeStart - 1} (next prime is ${primeAns}).`,
  });

  // Question 8: Advanced Alternating / Interleaved Sequence
  const altAStart = Math.floor(Math.random() * 5) + 2;
  const altAStep = Math.floor(Math.random() * 3) + 2;
  const altBStart = Math.floor(Math.random() * 20) + 50;
  const altBStep = Math.floor(Math.random() * 5) + 5;
  // Sequence: A0, B0, A1, B1, A2, B2 -> find A3
  const altSeq = [
    altAStart,
    altBStart,
    altAStart + altAStep,
    altBStart - altBStep,
    altAStart + altAStep * 2,
    altBStart - altBStep * 2,
  ];
  const altAns = altAStart + altAStep * 3;
  questions.push({
    id: 8,
    levelName: "Level 4 • Advanced",
    difficultyBadge: "Advanced",
    sequence: [...altSeq, "?"],
    correctAnswer: altAns,
    options: generateOptions(altAns, altAStep),
    explanation: `Alternating sequence: Odd position terms increase by +${altAStep} (${altSeq[4]} + ${altAStep} = ${altAns}).`,
  });

  // Question 9: Expert Multi-Operation Sequence (x * a + b)
  const q9Mult = 2;
  const q9Add = Math.floor(Math.random() * 3) + 1; // +1, +2, or +3
  const q9Start = Math.floor(Math.random() * 3) + 2; // 2 to 4
  const q9Seq = [q9Start];
  for (let i = 0; i < 4; i++) {
    q9Seq.push(q9Seq[i] * q9Mult + q9Add);
  }
  const q9Ans = q9Seq[4];
  questions.push({
    id: 9,
    levelName: "Level 5 • Expert",
    difficultyBadge: "Expert",
    sequence: [...q9Seq.slice(0, 4), "?"],
    correctAnswer: q9Ans,
    options: generateOptions(q9Ans, q9Seq[3]),
    explanation: `Multi-operation pattern: Next = (Current × ${q9Mult}) + ${q9Add} (${q9Seq[3]} × ${q9Mult} + ${q9Add} = ${q9Ans}).`,
  });

  // Question 10: Expert Product of Consecutive Integers / Quadratic (n * (n + 1))
  const q10Offset = Math.floor(Math.random() * 3) + 1;
  const q10Seq = Array.from({ length: 5 }, (_, i) => (i + q10Offset) * (i + q10Offset + 1));
  const q10Ans = q10Seq[4];
  const q10LastN = 4 + q10Offset;
  questions.push({
    id: 10,
    levelName: "Level 5 • Expert",
    difficultyBadge: "Expert",
    sequence: [...q10Seq.slice(0, 4), "?"],
    correctAnswer: q10Ans,
    options: generateOptions(q10Ans, q10LastN * 2),
    explanation: `Consecutive products pattern: Terms are n × (n + 1) (${q10LastN} × ${q10LastN + 1} = ${q10Ans}).`,
  });

  return questions;
};

// Get performance accolade based on final score
const getAccolade = (score, correctCount) => {
  if (score >= 1200 && correctCount >= 9) {
    return { title: "Pattern Oracle", medal: "🔮", color: "text-amber-400 border-amber-400/30 bg-amber-500/10" };
  }
  if (score >= 900 && correctCount >= 7) {
    return { title: "Sequence Master", medal: "🏆", color: "text-violet-400 border-violet-400/30 bg-violet-500/10" };
  }
  if (score >= 600 && correctCount >= 5) {
    return { title: "Logic Specialist", medal: "🥇", color: "text-emerald-400 border-emerald-400/30 bg-emerald-500/10" };
  }
  if (score >= 300) {
    return { title: "Pattern Analyst", medal: "🥈", color: "text-blue-400 border-blue-400/30 bg-blue-500/10" };
  }
  return { title: "Number Explorer", medal: "🎗️", color: "text-slate-400 border-slate-400/30 bg-slate-500/10" };
};

const QUESTION_TIMER_SECONDS = 15;

const PatternRecognitionGame = () => {
  // Game state
  const [phase, setPhase] = useState("start"); // "start" | "playing" | "gameover"
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIMER_SECONDS);
  const [answersHistory, setAnswersHistory] = useState([]);

  const timerRef = useRef(null);
  const transitionRef = useRef(null);

  // Clear running timers safely
  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (transitionRef.current) {
      clearTimeout(transitionRef.current);
      transitionRef.current = null;
    }
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  // Handle auto transition to next question or game over
  const proceedToNextQuestion = useCallback(
    (chosenOpt, isTimeOut = false, remainingTime = QUESTION_TIMER_SECONDS) => {
      if (isAnswered) return;

      clearTimers();
      const currentQ = questions[currentIndex];
      if (!currentQ) return;

      const isCorrect = !isTimeOut && chosenOpt === currentQ.correctAnswer;

      // Update state for current answer feedback
      setIsAnswered(true);
      setSelectedOption(chosenOpt);

      let pointsGained = 0;

      if (isCorrect) {
        const timeBonus = Math.round((remainingTime / QUESTION_TIMER_SECONDS) * 50);
        const newStreak = streak + 1;
        const streakBonus = newStreak * 10;
        pointsGained = 100 + timeBonus + streakBonus;

        setStreak(newStreak);
        setMaxStreak((prevMax) => Math.max(prevMax, newStreak));
        setScore((prevScore) => prevScore + pointsGained);
        setCorrectCount((prevCount) => prevCount + 1);
      } else {
        setStreak(0);
      }

      setAnswersHistory((prev) => [
        ...prev,
        {
          question: currentQ,
          userAnswer: chosenOpt,
          isCorrect,
          isTimeOut,
          pointsGained,
        },
      ]);

      // Pause briefly to show answer feedback before advancing
      transitionRef.current = setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
          setIsAnswered(false);
          setTimeLeft(QUESTION_TIMER_SECONDS);
        } else {
          setPhase("gameover");
        }
      }, 1400);
    },
    [clearTimers, currentIndex, isAnswered, questions, streak]
  );

  // Per-question countdown timer logic
  useEffect(() => {
    if (phase !== "playing" || isAnswered) return;

    if (timeLeft <= 0) {
      proceedToNextQuestion(null, true, 0);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase, isAnswered, timeLeft, proceedToNextQuestion]);

  // Start new game round
  const handleStartGame = () => {
    clearTimers();
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnswersHistory([]);
    setTimeLeft(QUESTION_TIMER_SECONDS);
    setPhase("playing");
  };

  // Option selection handler
  const handleOptionClick = (opt) => {
    if (isAnswered || phase !== "playing") return;
    proceedToNextQuestion(opt, false, timeLeft);
  };

  const currentQ = questions[currentIndex];
  const accolade = getAccolade(score, correctCount);

  // ─── Render: Start Screen ──────────────────────────────────────────────────
  if (phase === "start") {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-slate-950/80 shadow-sm p-6 md:p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 mb-6 shadow-inner">
            <Binary className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Number Sequence & Pattern Recognition
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-8">
            Test your quantitative reasoning! Identify the hidden rule in each number sequence and select the missing term before the timer runs out.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-start gap-3">
              <span className="p-2 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 shrink-0">
                <Brain className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Questions
                </h4>
                <p className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                  10 Per Round
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-start gap-3">
              <span className="p-2 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 shrink-0">
                <Timer className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Timer
                </h4>
                <p className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                  15s / Question
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-start gap-3">
              <span className="p-2 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 shrink-0">
                <Zap className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Difficulty
                </h4>
                <p className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                  Progressive
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg shadow-lg hover:shadow-violet-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Start Challenge <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // ─── Render: Game Over Screen ──────────────────────────────────────────────
  if (phase === "gameover") {
    const accuracy = Math.round((correctCount / 10) * 100);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-slate-950/80 shadow-sm p-6 md:p-8">
          {/* Header accolade banner */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center text-4xl mb-2">
              {accolade.medal}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Round Completed!
            </h2>
            <div
              className={`inline-block px-4 py-1.5 rounded-full border text-sm font-bold uppercase tracking-wider mt-2 ${accolade.color}`}
            >
              Accolade: {accolade.title}
            </div>
          </div>

          {/* Stats overview grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Final Score
              </p>
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400 mt-1">
                {score}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Accuracy
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {accuracy}%
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Correct
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {correctCount} / 10
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Max Streak
              </p>
              <p className="text-2xl font-bold text-amber-500 mt-1">
                🔥 {maxStreak}
              </p>
            </div>
          </div>

          {/* Question Breakdown List */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-violet-600 dark:text-violet-400" /> Question Breakdown
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {answersHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    item.isCorrect
                      ? "bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20"
                      : "bg-rose-50/50 dark:bg-rose-500/5 border-rose-200 dark:border-rose-500/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0">
                      {item.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      )}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Q{idx + 1}. Sequence:
                        </span>
                        <span className="font-mono text-violet-600 dark:text-violet-300 font-bold">
                          {item.question.sequence.join(", ")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {item.question.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300">
                      Ans: <strong className="text-emerald-600 dark:text-emerald-400">{item.question.correctAnswer}</strong>
                    </span>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                      +{item.pointsGained} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleStartGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors duration-300 shadow-md"
            >
              <RotateCcw className="w-5 h-5" /> Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Render: Active Game Playing ──────────────────────────────────────────
  if (!currentQ) return null;

  const timerPercentage = (timeLeft / QUESTION_TIMER_SECONDS) * 100;
  const isTimerLow = timeLeft <= 4;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header Card: Game Stats */}
      <div className="rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-slate-950/80 shadow-sm p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Badge & Title */}
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-600/20 text-violet-700 dark:text-violet-300">
              <Binary className="h-5 w-5" />
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                {currentQ.levelName}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-none mt-0.5">
                Question {currentIndex + 1} of 10
              </h3>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold block">
                Score
              </span>
              <span className="text-xl font-bold text-violet-600 dark:text-violet-400">
                {score}
              </span>
            </div>

            <div className="h-8 w-px bg-gray-200 dark:bg-white/10" />

            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold block">
                Correct
              </span>
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {correctCount} / 10
              </span>
            </div>

            {streak > 1 && (
              <>
                <div className="h-8 w-px bg-gray-200 dark:bg-white/10" />
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-amber-500 font-semibold block">
                    Streak
                  </span>
                  <span className="text-xl font-bold text-amber-500">
                    🔥 {streak}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Timer Bar */}
        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Timer className="w-3.5 h-3.5" /> Time Remaining
            </span>
            <span
              className={`font-mono font-bold ${
                isTimerLow
                  ? "text-rose-600 dark:text-rose-400 animate-pulse"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {timeLeft}s
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                isTimerLow ? "bg-rose-500" : "bg-violet-600 dark:bg-violet-500"
              }`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sequence Question Display Card */}
      <div className="rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-slate-950/80 shadow-sm p-6 md:p-8 text-center space-y-6">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Identify the missing element in the sequence
          </h4>
        </div>

        {/* Sequence Numbers Container */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-4">
          {currentQ.sequence.map((item, idx) => {
            const isMissing = item === "?";

            if (isMissing) {
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center min-w-[3.5rem] h-14 sm:h-16 px-4 rounded-2xl bg-violet-50 dark:bg-violet-500/10 border-2 border-dashed border-violet-500 text-violet-600 dark:text-violet-400 font-extrabold text-2xl sm:text-3xl shadow-sm animate-pulse"
                >
                  ?
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="flex items-center justify-center min-w-[3.5rem] h-14 sm:h-16 px-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-xl sm:text-2xl shadow-inner"
              >
                {item}
              </div>
            );
          })}
        </div>

        {/* Answer Options Grid (4 Options) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {currentQ.options.map((opt, i) => {
            const optionLabel = String.fromCharCode(65 + i); // A, B, C, D
            const isCorrect = opt === currentQ.correctAnswer;
            const isSelected = selectedOption === opt;

            let buttonStyles =
              "bg-slate-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:bg-violet-50 dark:hover:bg-white/10 hover:border-violet-300 dark:hover:border-violet-500/40 cursor-pointer";
            let badgeStyles =
              "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300";

            if (isAnswered) {
              if (isCorrect) {
                buttonStyles =
                  "bg-emerald-50 dark:bg-emerald-500/20 border-emerald-400 dark:border-emerald-500/50 text-emerald-900 dark:text-emerald-200 shadow-sm";
                badgeStyles =
                  "bg-emerald-500 text-white font-bold";
              } else if (isSelected) {
                buttonStyles =
                  "bg-rose-50 dark:bg-rose-500/20 border-rose-400 dark:border-rose-500/50 text-rose-900 dark:text-rose-200 shadow-sm";
                badgeStyles =
                  "bg-rose-500 text-white font-bold";
              } else {
                buttonStyles =
                  "bg-slate-50 dark:bg-transparent border-gray-200 dark:border-white/5 text-gray-400 dark:text-gray-600 opacity-50 cursor-not-allowed";
                badgeStyles =
                  "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600";
              }
            }

            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => handleOptionClick(opt)}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 font-semibold text-lg text-left ${buttonStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${badgeStyles}`}
                  >
                    {optionLabel}
                  </span>
                  <span className="font-bold text-xl">{opt}</span>
                </div>

                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation / Rule Toast on Answer */}
        {isAnswered && (
          <div className="mt-4 p-4 rounded-2xl bg-violet-50/80 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-500/30 text-left flex items-start gap-3 transition-all animate-fadeIn">
            <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs uppercase tracking-wider font-bold text-violet-600 dark:text-violet-300">
                Pattern Rule Explanation
              </span>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-0.5">
                {currentQ.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternRecognitionGame;
