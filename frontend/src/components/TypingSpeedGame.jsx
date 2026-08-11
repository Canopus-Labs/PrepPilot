import React, { useEffect, useMemo, useRef, useState } from "react";
import { Keyboard } from "lucide-react";
import { calculateWpm, calculateAccuracy, formatTime } from "./typingSpeedHelpers";

const TEXT_PARAGRAPHS = [
  "Algorithms are the heart of efficient code. Practice breaking problems into small functions and choosing the right data structure.",
  "Master recursion, dynamic programming, and graph traversal to solve interview challenges with confidence.",
  "Clean code means readable variable names, consistent spacing, and thoughtful comments for logic-heavy implementations.",
  "A sorted array and two pointers can often replace nested loops, reducing complexity and improving speed.",
];

const TypingSpeedGame = () => {
  const [paragraphIndex, setParagraphIndex] = useState(
    () => Math.floor(Math.random() * TEXT_PARAGRAPHS.length)
  );
  const paragraph = useMemo(
    () => TEXT_PARAGRAPHS[paragraphIndex],
    [paragraphIndex]
  );
  const [inputValue, setInputValue] = useState("");
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (!started || completed) return undefined;

    intervalRef.current = window.setInterval(() => {
      setTimeElapsed((value) => value + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [started, completed]);

  useEffect(() => {
    if (completed) {
      window.clearInterval(intervalRef.current);
    }
  }, [completed]);

  useEffect(() => {
    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, []);

  const handleInputChange = (event) => {
    if (completed) return;

    const nextValue = event.target.value.slice(0, paragraph.length);
    if (!started && nextValue.length > 0) {
      setStarted(true);
    }
    setInputValue(nextValue);
    if (nextValue.length >= paragraph.length) {
      setCompleted(true);
    }
  };

  const correctChars = useMemo(
    () =>
      inputValue
        .split("")
        .reduce(
          (count, char, index) =>
            char === paragraph[index] ? count + 1 : count,
          0
        ),
    [inputValue, paragraph]
  );

  const totalTyped = inputValue.length;
  const wpm = calculateWpm(correctChars, timeElapsed);
  const accuracy = calculateAccuracy(correctChars, totalTyped);

  const characterStates = useMemo(
    () =>
      paragraph.split("").map((char, index) => {
        const typedChar = inputValue[index];
        if (typedChar == null) return "pending";
        return typedChar === char ? "correct" : "incorrect";
      }),
    [inputValue, paragraph]
  );

  const handleRetry = () => {
    window.clearInterval(intervalRef.current);
    setParagraphIndex((current) => (current + 1) % TEXT_PARAGRAPHS.length);
    setInputValue("");
    setStarted(false);
    setCompleted(false);
    setTimeElapsed(0);
    setTimeout(() => {
      textAreaRef.current?.focus();
    }, 0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-7">
      <div className="rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-slate-950/80 shadow-sm p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-2xl bg-violet-50/80 dark:bg-violet-500/10 px-4 py-3 mb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-600/20 text-violet-700 dark:text-violet-300">
                <Keyboard className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                  Typing Speed Challenge
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Type a developer-themed paragraph accurately and complete it as fast as possible.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center sm:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Time
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                {formatTime(timeElapsed)}
              </p>
            </div>
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                WPM
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                {wpm}
              </p>
            </div>
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Accuracy
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                {accuracy}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-slate-950/80 shadow-sm p-6 md:p-8">
        <div className="space-y-5">
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-gray-200 dark:border-white/10 p-5">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Type the paragraph below
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Keep the cursor in the box and type without pasting. Correct letters are highlighted in green; incorrect letters are marked in red.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/80 p-5 text-sm leading-7 text-slate-900 dark:text-slate-100 whitespace-pre-wrap break-words">
            {paragraph.split("").map((char, index) => {
              const state = characterStates[index];
              const isCurrent = index === inputValue.length && !completed;
              const displayChar = char === " " ? "\u00A0" : char;

              const commonClasses =
                "inline-block rounded-lg px-1 py-[0.08rem] mr-[-0.125rem]"
                + (isCurrent ? " ring-1 ring-violet-400/70" : "");

              if (state === "correct") {
                return (
                  <span
                    key={`${index}-${char}`}
                    className={`${commonClasses} bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300`}
                  >
                    {displayChar}
                  </span>
                );
              }

              if (state === "incorrect") {
                return (
                  <span
                    key={`${index}-${char}`}
                    className={`${commonClasses} bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300`}
                  >
                    {displayChar}
                  </span>
                );
              }

              return (
                <span
                  key={`${index}-${char}`}
                  className={`${commonClasses} text-slate-500 dark:text-slate-400`}
                >
                  {displayChar}
                </span>
              );
            })}
          </div>

          <textarea
            ref={textAreaRef}
            value={inputValue}
            onChange={handleInputChange}
            disabled={completed}
            rows={8}
            placeholder="Start typing here once you are ready..."
            className="w-full resize-none rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/90 px-4 py-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 transition-colors duration-300"
            aria-label="Typing speed challenge input"
          />

          {completed && (
            <div className="rounded-3xl border border-violet-200 dark:border-violet-500/20 bg-violet-50/80 dark:bg-violet-500/10 p-5">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Challenge complete!
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-white dark:bg-slate-950/90 p-4 text-center border border-gray-200 dark:border-white/10">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Final WPM
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                    {wpm}
                  </p>
                </div>
                <div className="rounded-3xl bg-white dark:bg-slate-950/90 p-4 text-center border border-gray-200 dark:border-white/10">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Final accuracy
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                    {accuracy}%
                  </p>
                </div>
                <div className="rounded-3xl bg-white dark:bg-slate-950/90 p-4 text-center border border-gray-200 dark:border-white/10">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Time taken
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                    {formatTime(timeElapsed)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center justify-center rounded-3xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-violet-700"
            >
              Retry
            </button>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              When you retry, a new paragraph will appear and the timer will reset.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingSpeedGame;
