import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  GitBranch,
  Clock,
  Database,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Code2,
  Scale,
  Trophy,
} from "lucide-react";

const approaches = [
  {
    name: "Hash Map",
    type: "User Approach",
    time: "O(n)",
    space: "O(n)",
    score: 92,
    description:
      "Store previously seen values in a hash map and check whether the required complement already exists.",
    advantages: [
      "Fast average lookup",
      "Simple to implement",
      "Excellent for large inputs",
    ],
    disadvantages: [
      "Requires additional memory",
      "Hash-table overhead",
    ],
    bestFor: "Large inputs where fast lookup is more important than memory usage.",
  },
  {
    name: "Sorting + Two Pointers",
    type: "Alternative",
    time: "O(n log n)",
    space: "O(1)",
    score: 86,
    description:
      "Sort the input and use two pointers that move inward based on the current sum.",
    advantages: [
      "Lower auxiliary memory",
      "Easy to reason about",
      "Useful when data is already sorted",
    ],
    disadvantages: [
      "Sorting adds O(n log n)",
      "May modify the original order",
    ],
    bestFor: "Memory-constrained environments or when the input can be sorted.",
  },
  {
    name: "Brute Force",
    type: "Alternative",
    time: "O(n²)",
    space: "O(1)",
    score: 61,
    description:
      "Check every possible pair until the required pair is found.",
    advantages: [
      "Very simple",
      "No extra data structure",
      "Useful as a baseline solution",
    ],
    disadvantages: [
      "Slow for large inputs",
      "Poor scalability",
    ],
    bestFor: "Very small inputs or as a first approach before optimizing.",
  },
];

const AIInterviewQuestionAlternativeApproachExplorer = () => {
  const [activeTab, setActiveTab] = useState("explorer");
  const [selectedApproach, setSelectedApproach] = useState("Hash Map");
  const [generating, setGenerating] = useState(false);
  const [attempted, setAttempted] = useState(true);

  const generateAlternatives = () => {
    setGenerating(true);

    setTimeout(() => {
      setGenerating(false);
      setAttempted(true);
      setActiveTab("explorer");
    }, 700);
  };

  const selected = approaches.find(
    (approach) => approach.name === selectedApproach
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <GitBranch size={34} className="text-violet-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Question Alternative Approach Explorer
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Explore multiple valid solutions and understand the trade-offs
                between different approaches.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={generateAlternatives}
            disabled={generating}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-60"
          >
            {generating ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Exploring Approaches...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Explore Alternatives
              </>
            )}
          </button>

        </div>

        {/* Hero */}

        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              One Problem, Multiple Ways to Solve It
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            After you attempt a question, AI compares your approach with other
            valid solutions, explains their trade-offs, and recommends the
            approach that best fits different constraints.
          </p>

        </div>

        {/* Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

          <div className="flex items-center gap-3 mb-6">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Interview Question
            </h2>

          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-6">

            <p className="text-xl font-semibold leading-8">
              "Given an array of integers and a target value, find two numbers
              whose sum equals the target."
            </p>

          </div>

          <div className="flex flex-wrap gap-3 mt-6">

            <span className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold">
              Arrays
            </span>

            <span className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold">
              Hashing
            </span>

            <span className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold">
              Two Pointers
            </span>

            <span className="px-3 py-2 rounded-xl bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm font-semibold">
              Attempt Completed
            </span>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <GitBranch className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Approaches Found
            </p>

            <p className="text-5xl font-black text-violet-600 mt-2">
              3
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Clock className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Best Time
            </p>

            <p className="text-4xl font-black text-blue-600 mt-2">
              O(n)
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Database className="text-orange-600" size={30} />

            <p className="text-gray-500 mt-4">
              Lowest Space
            </p>

            <p className="text-4xl font-black text-orange-600 mt-2">
              O(1)
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Trophy className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Recommended
            </p>

            <p className="text-2xl font-black text-green-600 mt-2">
              Hash Map
            </p>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["explorer", "Approach Explorer"],
            ["comparison", "Complexity Comparison"],
            ["tradeoffs", "Trade-offs"],
            ["constraints", "Constraint Recommendations"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Explorer */}

        {activeTab === "explorer" && (
          <div className="mt-6 space-y-7">

            {/* User Approach */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-7">

                <div>

                  <div className="flex flex-wrap items-center gap-3">

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm font-bold">
                      YOUR APPROACH
                    </span>

                    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400 text-sm font-bold">
                      Hash Map
                    </span>

                  </div>

                  <h2 className="text-3xl font-black mt-4">
                    Hash Map Solution
                  </h2>

                  <p className="text-gray-500 mt-4 max-w-3xl leading-7">
                    You used a hash map to store previously visited values and
                    check for the required complement in constant average time.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-6xl font-black text-green-600">
                    92
                  </p>

                  <p className="text-gray-500">
                    Approach Score
                  </p>

                </div>

              </div>

              <div className="grid sm:grid-cols-2 gap-5 mt-7">

                <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 p-5">

                  <div className="flex items-center gap-3">

                    <Clock className="text-blue-600" />

                    <span className="font-bold">
                      Time Complexity
                    </span>

                  </div>

                  <p className="text-3xl font-black mt-3">
                    O(n)
                  </p>

                </div>

                <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-5">

                  <div className="flex items-center gap-3">

                    <Database className="text-orange-600" />

                    <span className="font-bold">
                      Space Complexity
                    </span>

                  </div>

                  <p className="text-3xl font-black mt-3">
                    O(n)
                  </p>

                </div>

              </div>

            </div>

            {/* Alternatives */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <GitBranch className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Alternative Approaches
                </h2>

              </div>

              <div className="grid lg:grid-cols-3 gap-5">

                {approaches.map((approach) => (

                  <button
                    key={approach.name}
                    type="button"
                    onClick={() => setSelectedApproach(approach.name)}
                    className={`text-left rounded-2xl border-2 p-6 transition ${
                      selectedApproach === approach.name
                        ? "border-violet-600 bg-violet-50 dark:bg-violet-900/10"
                        : "border-gray-200 dark:border-white/10"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                        <Code2
                          size={23}
                          className="text-violet-600"
                        />

                      </div>

                      {approach.type === "User Approach" && (
                        <span className="text-xs font-bold text-green-600">
                          YOUR SOLUTION
                        </span>
                      )}

                    </div>

                    <h3 className="text-xl font-bold mt-5">
                      {approach.name}
                    </h3>

                    <p className="text-gray-500 mt-3 text-sm leading-6">
                      {approach.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-5">

                      <div className="rounded-xl bg-gray-100 dark:bg-gray-800 p-3">

                        <p className="text-xs text-gray-500">
                          Time
                        </p>

                        <p className="font-black mt-1">
                          {approach.time}
                        </p>

                      </div>

                      <div className="rounded-xl bg-gray-100 dark:bg-gray-800 p-3">

                        <p className="text-xs text-gray-500">
                          Space
                        </p>

                        <p className="font-black mt-1">
                          {approach.space}
                        </p>

                      </div>

                    </div>

                  </button>

                ))}

              </div>

            </div>

            {/* Selected Approach Details */}

            {selected && (
              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3">

                  <Lightbulb className="text-yellow-500" />

                  <h2 className="text-2xl font-bold">
                    {selected.name} — Detailed Analysis
                  </h2>

                </div>

                <p className="text-gray-500 mt-5 leading-7">
                  {selected.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-7">

                  <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-6">

                    <div className="flex items-center gap-3">

                      <CheckCircle2
                        className="text-green-600"
                        size={25}
                      />

                      <h3 className="text-xl font-bold">
                        Advantages
                      </h3>

                    </div>

                    <ul className="mt-5 space-y-3">

                      {selected.advantages.map((item) => (
                        <li
                          key={item}
                          className="text-gray-600 dark:text-gray-300"
                        >
                          • {item}
                        </li>
                      ))}

                    </ul>

                  </div>

                  <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6">

                    <div className="flex items-center gap-3">

                      <AlertTriangle
                        className="text-red-600"
                        size={25}
                      />

                      <h3 className="text-xl font-bold">
                        Disadvantages
                      </h3>

                    </div>

                    <ul className="mt-5 space-y-3">

                      {selected.disadvantages.map((item) => (
                        <li
                          key={item}
                          className="text-gray-600 dark:text-gray-300"
                        >
                          • {item}
                        </li>
                      ))}

                    </ul>

                  </div>

                </div>

                <div className="mt-6 rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-6">

                  <p className="font-bold">
                    Best Used When
                  </p>

                  <p className="text-gray-500 mt-2 leading-6">
                    {selected.bestFor}
                  </p>

                </div>

              </div>
            )}

          </div>
        )}

        {/* Comparison */}

        {activeTab === "comparison" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Scale className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Complexity Comparison
                </h2>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead>

                    <tr className="border-b border-gray-200 dark:border-white/10">

                      <th className="p-4">
                        Approach
                      </th>

                      <th className="p-4">
                        Time
                      </th>

                      <th className="p-4">
                        Space
                      </th>

                      <th className="p-4">
                        Score
                      </th>

                      <th className="p-4">
                        Best Use
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {approaches.map((approach) => (

                      <tr
                        key={approach.name}
                        className="border-b border-gray-100 dark:border-white/5"
                      >

                        <td className="p-4 font-bold">
                          {approach.name}
                        </td>

                        <td className="p-4 font-mono font-bold text-blue-600">
                          {approach.time}
                        </td>

                        <td className="p-4 font-mono font-bold text-orange-600">
                          {approach.space}
                        </td>

                        <td className="p-4">

                          <span className="font-black">
                            {approach.score}%
                          </span>

                        </td>

                        <td className="p-4 text-gray-500">
                          {approach.bestFor}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-3xl p-7">

                <div className="flex items-center gap-3">

                  <Clock className="text-blue-600" size={28} />

                  <h2 className="text-xl font-bold">
                    Fastest Approach
                  </h2>

                </div>

                <p className="text-3xl font-black mt-5">
                  Hash Map
                </p>

                <p className="text-gray-500 mt-2">
                  O(n) average time complexity.
                </p>

              </div>

              <div className="bg-orange-50 dark:bg-orange-900/10 rounded-3xl p-7">

                <div className="flex items-center gap-3">

                  <Database className="text-orange-600" size={28} />

                  <h2 className="text-xl font-bold">
                    Lowest Extra Space
                  </h2>

                </div>

                <p className="text-3xl font-black mt-5">
                  Two Pointers
                </p>

                <p className="text-gray-500 mt-2">
                  O(1) auxiliary space after sorting.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Tradeoffs */}

        {activeTab === "tradeoffs" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Scale className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Approach Trade-offs
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  [
                    "Hash Map",
                    "Trades additional memory for faster lookup and linear average runtime.",
                    "Speed over memory",
                  ],
                  [
                    "Sorting + Two Pointers",
                    "Trades sorting time for lower auxiliary memory usage.",
                    "Memory over speed",
                  ],
                  [
                    "Brute Force",
                    "Trades execution time for the simplest possible implementation.",
                    "Simplicity over performance",
                  ],
                ].map(([title, description, tradeoff]) => (

                  <div
                    key={title}
                    className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6"
                  >

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                      <h3 className="text-xl font-bold">
                        {title}
                      </h3>

                      <span className="px-3 py-2 rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400 text-sm font-bold">
                        {tradeoff}
                      </span>

                    </div>

                    <p className="text-gray-500 mt-4 leading-7">
                      {description}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-violet-50 dark:bg-violet-900/10 rounded-3xl p-7">

              <div className="flex items-center gap-3">

                <Lightbulb className="text-violet-600" />

                <h2 className="text-xl font-bold">
                  Interview Follow-up Insight
                </h2>

              </div>

              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-8">
                An interviewer may ask, "Can you solve this without using
                extra memory?" Understanding alternative approaches allows you
                to switch from a hash-map solution to a sorting and two-pointer
                strategy while clearly explaining the trade-off.
              </p>

            </div>

          </div>
        )}

        {/* Constraints */}

        {activeTab === "constraints" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Recommended Approach by Constraint
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  [
                    "Very large input",
                    "Hash Map",
                    "O(n) average time makes it preferable when processing speed is critical.",
                    "green",
                  ],
                  [
                    "Strict memory limit",
                    "Two Pointers",
                    "Use sorting followed by two pointers to reduce auxiliary memory.",
                    "blue",
                  ],
                  [
                    "Very small input",
                    "Brute Force",
                    "The simple O(n²) approach may be perfectly acceptable for small datasets.",
                    "orange",
                  ],
                  [
                    "Input already sorted",
                    "Two Pointers",
                    "Avoid additional sorting and directly use the two-pointer technique.",
                    "purple",
                  ],
                ].map(([constraint, approach, explanation, color]) => (

                  <div
                    key={constraint}
                    className={`rounded-2xl p-6 ${
                      color === "green"
                        ? "bg-green-50 dark:bg-green-900/10"
                        : color === "blue"
                        ? "bg-blue-50 dark:bg-blue-900/10"
                        : color === "orange"
                        ? "bg-orange-50 dark:bg-orange-900/10"
                        : "bg-purple-50 dark:bg-purple-900/10"
                    }`}
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                      <div>

                        <p className="text-sm text-gray-500">
                          Constraint
                        </p>

                        <h3 className="text-xl font-bold mt-1">
                          {constraint}
                        </h3>

                        <p className="text-gray-500 mt-3 leading-6">
                          {explanation}
                        </p>

                      </div>

                      <div className="flex items-center gap-3 shrink-0">

                        <ArrowRight
                          className="text-gray-400"
                          size={22}
                        />

                        <span className="px-4 py-3 rounded-xl bg-white dark:bg-gray-800 font-black shadow-sm">
                          {approach}
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 text-white">

              <div className="flex items-center gap-3">

                <Trophy size={30} />

                <h2 className="text-2xl font-bold">
                  AI Recommended Approach
                </h2>

              </div>

              <p className="text-4xl font-black mt-5">
                Hash Map
              </p>

              <p className="text-white/90 mt-4 leading-7 max-w-3xl">
                For the default problem constraints, the hash-map approach
                provides the best balance of implementation simplicity and
                O(n) average time complexity.
              </p>

            </div>

          </div>
        )}

        {/* How It Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              How Alternative Approach Explorer Works
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Analyze Attempt",
                "AI analyzes the approach selected by the candidate.",
              ],
              [
                "2",
                "Find Alternatives",
                "AI identifies other valid techniques for solving the problem.",
              ],
              [
                "3",
                "Compare Trade-offs",
                "Time, space, implementation complexity, and constraints are compared.",
              ],
              [
                "4",
                "Recommend",
                "AI recommends the best approach for different problem conditions.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-black">
                  {number}
                </div>

                <h3 className="font-bold text-lg mt-5">
                  {title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Benefits */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 size={30} />

            <h2 className="text-3xl font-bold">
              Benefits
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              [
                "🧠",
                "Flexible Problem Solving",
                "Helps candidates learn that problems can have multiple valid solutions.",
              ],
              [
                "⚖️",
                "Understand Trade-offs",
                "Shows how speed, memory, simplicity, and scalability affect approach selection.",
              ],
              [
                "🎯",
                "Handle Follow-ups",
                "Prepares candidates for questions asking for alternative solutions.",
              ],
              [
                "🚀",
                "Deeper Learning",
                "Encourages understanding of algorithms instead of memorizing one solution.",
              ],
            ].map(([icon, title, description]) => (

              <div
                key={title}
                className="rounded-2xl bg-white/10 p-6"
              >

                <div className="text-4xl">
                  {icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {title}
                </h3>

                <p className="text-white/80 mt-3 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Final Recommendation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Recommendation
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your Hash Map approach is the strongest choice for the default
                constraints because it provides O(n) average time complexity.
                However, if memory becomes a major constraint or the input is
                already sorted, a two-pointer approach may be preferable.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🏆
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Recommended
              </h3>

              <p className="text-4xl font-black">
                Hash Map
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionAlternativeApproachExplorer;