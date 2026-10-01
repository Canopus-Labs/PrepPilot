import React, { useState } from "react";
import {
  Brain,
  RefreshCw,
  AlertTriangle,
  Target,
  CheckCircle2,
  Zap,
  Database,
  Server,
  Clock,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const challenges = [
  {
    id: 1,
    title: "Input Size Increased",
    category: "Scale",
    original: "Input contains up to 10,000 elements.",
    changed: "Input can now contain up to 10,000,000 elements.",
    impact: "Your current O(n²) approach may no longer be practical.",
    icon: Database,
  },
  {
    id: 2,
    title: "Memory Availability Reduced",
    category: "Memory",
    original: "You have sufficient memory for auxiliary data structures.",
    changed: "Memory is limited to O(1) additional space.",
    impact: "Your auxiliary data structure must be removed or replaced.",
    icon: Server,
  },
  {
    id: 3,
    title: "Data Is No Longer Sorted",
    category: "Data",
    original: "The input array is guaranteed to be sorted.",
    changed: "The input may now arrive in arbitrary order.",
    impact: "Your solution can no longer rely on sorted-order properties.",
    icon: RefreshCw,
  },
  {
    id: 4,
    title: "Failure Conditions Added",
    category: "Reliability",
    original: "All external services are available.",
    changed: "External services may temporarily become unavailable.",
    impact: "The architecture needs failure handling and recovery.",
    icon: AlertTriangle,
  },
  {
    id: 5,
    title: "User Load Increased",
    category: "Scalability",
    original: "The system handles 1,000 concurrent users.",
    changed: "The system must support 1,000,000 concurrent users.",
    impact: "The architecture must address horizontal scaling and bottlenecks.",
    icon: Server,
  },
  {
    id: 6,
    title: "Performance Requirement Changed",
    category: "Performance",
    original: "Response time under 2 seconds is acceptable.",
    changed: "The system must respond within 100 milliseconds.",
    impact: "Latency-sensitive components need optimization.",
    icon: Clock,
  },
];

const evaluationAreas = [
  "Assumption identified",
  "Impact understood",
  "Approach adapted",
  "Trade-offs explained",
  "New constraints handled",
];

export default function AIInterviewQuestionAssumptionChallengeMode() {
  const [solution, setSolution] = useState("");
  const [challenge, setChallenge] = useState(challenges[0]);
  const [answer, setAnswer] = useState("");
  const [started, setStarted] = useState(false);
  const [evaluated, setEvaluated] = useState(false);
  const [score, setScore] = useState(0);

  const startChallenge = () => {
    setStarted(true);
    setEvaluated(false);
    setAnswer("");
  };

  const evaluateAnswer = () => {
    if (!answer.trim()) return;

    setScore(82);
    setEvaluated(true);
  };

  const nextChallenge = () => {
    const currentIndex = challenges.findIndex(
      (item) => item.id === challenge.id
    );

    const nextIndex =
      (currentIndex + 1) % challenges.length;

    setChallenge(challenges[nextIndex]);
    setAnswer("");
    setEvaluated(false);
    setStarted(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Interview Question Assumption Challenge Mode
          </h1>

          <p className="text-gray-500">
            Adapt your solution when interview assumptions and requirements
            suddenly change.
          </p>

        </div>

      </div>

      {/* Original Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Original Interview Problem
        </p>

        <h2 className="text-xl font-bold mt-2">
          Design an algorithm to find duplicate values in an array efficiently.
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-indigo-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Input
            </p>

            <p className="font-bold mt-1">
              Up to 10,000 elements
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Memory
            </p>

            <p className="font-bold mt-1">
              Auxiliary memory allowed
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Performance
            </p>

            <p className="font-bold mt-1">
              Standard response time
            </p>

          </div>

        </div>

      </div>

      {/* Proposed Solution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Step 1 — Propose Your Solution
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Describe your initial approach before AI changes the assumptions.
        </p>

        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          rows={7}
          placeholder="Explain your algorithm, complexity, assumptions, and why you selected this approach..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!solution.trim()}
          onClick={startChallenge}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Lock Solution & Start Challenge
        </button>

      </div>

      {started && (
        <>
          {/* Challenge Banner */}
          <div className="bg-red-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <div className="p-3 bg-white rounded-xl h-fit">
                <AlertTriangle
                  className="text-red-600"
                  size={28}
                />
              </div>

              <div className="flex-1">

                <div className="flex flex-wrap items-center gap-3">

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                    ASSUMPTION CHANGED
                  </span>

                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                    {challenge.category}
                  </span>

                </div>

                <h2 className="text-2xl font-black mt-3">
                  {challenge.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  The interviewer has changed one of the original assumptions.
                  Adapt your solution without starting from scratch.
                </p>

              </div>

            </div>

          </div>

          {/* Original vs Changed */}
          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-white rounded-2xl shadow p-6">

              <p className="text-sm text-gray-500">
                Original Assumption
              </p>

              <div className="flex gap-4 mt-4">

                <div className="p-3 rounded-xl bg-gray-100 h-fit">
                  <challenge.icon size={23} />
                </div>

                <div>

                  <h3 className="font-bold">
                    {challenge.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    {challenge.original}
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-red-50 rounded-2xl p-6">

              <p className="text-sm text-red-600 font-semibold">
                New Assumption
              </p>

              <div className="flex gap-4 mt-4">

                <div className="p-3 rounded-xl bg-white text-red-600 h-fit">
                  <AlertTriangle size={23} />
                </div>

                <div>

                  <h3 className="font-bold">
                    Requirement Changed
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    {challenge.changed}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Impact */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  AI Challenge Impact
                </h2>

                <p className="text-gray-600 mt-2">
                  {challenge.impact}
                </p>

              </div>

            </div>

          </div>

          {/* Adaptation */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Step 2 — Adapt Your Solution
                </h2>

                <p className="text-sm text-gray-500">
                  Explain what changes you would make and why.
                </p>

              </div>

            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={9}
              placeholder="Explain how the changed assumption affects your solution. What would you change? What trade-offs would you accept?"
              className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex flex-wrap gap-3 mt-4">

              <button
                type="button"
                onClick={evaluateAnswer}
                disabled={!answer.trim()}
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
              >
                Evaluate Adaptation
              </button>

              <button
                type="button"
                onClick={nextChallenge}
                className="px-5 py-3 rounded-xl border font-semibold flex items-center gap-2"
              >
                Change Another Assumption
                <RefreshCw size={17} />
              </button>

            </div>

          </div>

          {evaluated && (
            <>
              {/* Score */}
              <div className="bg-indigo-50 rounded-2xl p-6">

                <div className="flex gap-5 items-center">

                  <div className="p-4 rounded-2xl bg-white">

                    <Zap
                      className="text-indigo-600"
                      size={40}
                    />

                  </div>

                  <div className="flex-1">

                    <p className="text-sm text-gray-500">
                      Adaptability Score
                    </p>

                    <div className="flex items-end gap-3">

                      <p className="text-6xl font-black text-indigo-600">
                        {score}%
                      </p>

                      <span className="mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                        Strong Adaptation
                      </span>

                    </div>

                    <p className="text-gray-600 mt-2">
                      You recognized the changed constraint and adjusted the
                      solution without abandoning the original reasoning.
                    </p>

                    <div className="h-3 bg-white rounded-full mt-4">

                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${score}%` }}
                      />

                    </div>

                  </div>

                </div>

              </div>

              {/* Evaluation */}
              <div className="bg-white rounded-2xl shadow p-6">

                <h2 className="font-bold text-lg">
                  AI Adaptation Evaluation
                </h2>

                <div className="space-y-4 mt-6">

                  {evaluationAreas.map((item, index) => (
                    <div
                      key={item}
                      className="border rounded-xl p-4 flex items-center gap-4"
                    >

                      <CheckCircle2
                        className={
                          index === 3
                            ? "text-orange-500"
                            : "text-green-600"
                        }
                      />

                      <div className="flex-1">

                        <p className="font-semibold">
                          {item}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {index === 3
                            ? "Trade-off explanation could be more detailed."
                            : "Requirement handled successfully."}
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          index === 3
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {index === 3 ? "Improve" : "Passed"}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

              {/* Before / After */}
              <div className="bg-white rounded-2xl shadow p-6">

                <h2 className="font-bold text-lg">
                  Solution Evolution
                </h2>

                <div className="grid md:grid-cols-2 gap-5 mt-6">

                  <div className="border rounded-2xl p-5">

                    <div className="flex items-center gap-2">

                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                        ORIGINAL
                      </span>

                    </div>

                    <p className="text-sm text-gray-600 mt-4">
                      Your original approach was designed around the initial
                      problem constraints and assumptions.
                    </p>

                  </div>

                  <div className="border rounded-2xl p-5">

                    <div className="flex items-center gap-2">

                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        ADAPTED
                      </span>

                    </div>

                    <p className="text-sm text-gray-600 mt-4">
                      Your updated approach removes the dependency on the
                      changed assumption while preserving the core solution
                      strategy.
                    </p>

                  </div>

                </div>

              </div>

              {/* Interview Follow-up */}
              <div className="bg-red-50 rounded-2xl p-6">

                <div className="flex gap-3">

                  <Brain
                    className="text-red-600"
                    size={27}
                  />

                  <div>

                    <h2 className="font-bold text-red-700">
                      Interviewer Follow-Up
                    </h2>

                    <p className="text-gray-600 mt-2">
                      "What if this new constraint becomes even more strict?
                      Would you still choose the same approach?"
                    </p>

                    <p className="text-sm text-gray-500 mt-3">
                      Explain where your current approach stops being suitable
                      and what alternative you would consider.
                    </p>

                  </div>

                </div>

              </div>

              {/* AI Coaching */}
              <div className="bg-indigo-50 rounded-2xl p-6">

                <div className="flex gap-3">

                  <Lightbulb
                    className="text-indigo-600"
                    size={27}
                  />

                  <div>

                    <h2 className="font-bold text-indigo-700">
                      AI Coaching
                    </h2>

                    <p className="text-gray-600 mt-2">
                      Strong interview candidates do not defend an approach
                      blindly. First identify which assumption changed, then
                      explain its impact on complexity, architecture, or
                      correctness. Finally, describe the smallest change needed
                      to satisfy the new requirement.
                    </p>

                  </div>

                </div>

              </div>

              {/* Next Challenge */}
              <div className="bg-green-50 rounded-2xl p-6">

                <div className="flex gap-3">

                  <CheckCircle2
                    className="text-green-600"
                    size={27}
                  />

                  <div className="flex-1">

                    <h2 className="font-bold text-green-700">
                      Ready for Another Assumption Change?
                    </h2>

                    <p className="text-gray-600 mt-2">
                      Continue the challenge with a different constraint to
                      test whether you can consistently adapt your reasoning.
                    </p>

                    <button
                      type="button"
                      onClick={nextChallenge}
                      className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
                    >
                      Next Challenge
                      <ArrowRight size={18} />
                    </button>

                  </div>

                </div>

              </div>

            </>
          )}

        </>
      )}

    </div>
  );
}