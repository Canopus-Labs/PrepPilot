import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  Clock,
  Database,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Lock,
  BarChart3,
  Code2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const complexityFactors = [
  {
    title: "Input Size",
    value: "n ≤ 100,000",
    description: "Large input size suggests avoiding quadratic approaches.",
    icon: Database,
  },
  {
    title: "Expected Time",
    value: "O(n log n)",
    description: "The constraints favor a near-linear or n log n solution.",
    icon: Clock,
  },
  {
    title: "Expected Space",
    value: "O(n)",
    description: "Linear auxiliary space is reasonable for this problem.",
    icon: Database,
  },
  {
    title: "Optimization Need",
    value: "High",
    description: "An O(n²) solution may not scale to the maximum input.",
    icon: Target,
  },
];

const complexityOptions = [
  "O(1)",
  "O(log n)",
  "O(n)",
  "O(n log n)",
  "O(n²)",
  "O(2ⁿ)",
];

const AIInterviewQuestionSolutionComplexityPredictor = () => {
  const [activeTab, setActiveTab] = useState("prediction");
  const [selectedHint, setSelectedHint] = useState("moderate");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("prediction");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
              <BarChart3 size={34} className="text-purple-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Question Solution Complexity Predictor
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Understand the expected time and space complexity before
                solving a coding interview problem.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Analyzing Constraints...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Complexity
              </>
            )}
          </button>

        </div>

        {/* Hero */}

        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Think About Complexity Before Coding
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI analyzes constraints and provides complexity hints without
            revealing the solution. Use these hints to decide which classes of
            algorithms are likely to be appropriate.
          </p>

        </div>

        {/* Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-6">

            <Code2 className="text-purple-600" />

            <h2 className="text-2xl font-bold">
              Interview Question
            </h2>

          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

            <p className="text-lg font-semibold leading-8">
              "Given an array of up to 100,000 integers, find whether any two
              numbers have a sum equal to a given target value."
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-7">

            <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/10 p-5">

              <p className="text-sm text-gray-500">
                Input Size
              </p>

              <p className="text-xl font-black text-purple-600 mt-2">
                n ≤ 100,000
              </p>

            </div>

            <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 p-5">

              <p className="text-sm text-gray-500">
                Output
              </p>

              <p className="text-xl font-black text-blue-600 mt-2">
                Boolean
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-5">

              <p className="text-sm text-gray-500">
                Optimization
              </p>

              <p className="text-xl font-black text-orange-600 mt-2">
                Important
              </p>

            </div>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Clock className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Expected Time
            </p>

            <p className="text-4xl font-black text-green-600 mt-2">
              O(n)
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Database className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Expected Space
            </p>

            <p className="text-4xl font-black text-blue-600 mt-2">
              O(n)
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target className="text-purple-600" size={30} />

            <p className="text-gray-500 mt-4">
              Efficiency Target
            </p>

            <p className="text-4xl font-black text-purple-600 mt-2">
              High
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Lightbulb className="text-orange-600" size={30} />

            <p className="text-gray-500 mt-4">
              Hint Level
            </p>

            <p className="text-4xl font-black text-orange-600 mt-2">
              Moderate
            </p>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["prediction", "Complexity Prediction"],
            ["constraints", "Constraint Analysis"],
            ["hints", "Complexity Hints"],
            ["comparison", "Approach Comparison"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Prediction */}

        {activeTab === "prediction" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <Brain className="text-purple-600" size={30} />

                    <h2 className="text-2xl font-bold">
                      AI Complexity Prediction
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-5 max-w-3xl leading-7">
                    The input constraint of 100,000 elements makes a quadratic
                    approach potentially too expensive. Aim for a linear or
                    near-linear solution.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-6xl font-black text-purple-600">
                    O(n)
                  </p>

                  <p className="text-gray-500 mt-2">
                    Recommended Target
                  </p>

                </div>

              </div>

            </div>

            {/* Complexity Cards */}

            <div className="grid lg:grid-cols-2 gap-7">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3">

                  <Clock className="text-green-600" />

                  <h2 className="text-2xl font-bold">
                    Time Complexity
                  </h2>

                </div>

                <p className="text-6xl font-black text-green-600 mt-8">
                  O(n)
                </p>

                <p className="text-gray-500 mt-5 leading-7">
                  With up to 100,000 elements, a linear-time solution is a
                  strong target. An O(n²) solution could require billions of
                  comparisons in the worst case.
                </p>

                <div className="mt-6 rounded-2xl bg-green-50 dark:bg-green-900/10 p-5">

                  <p className="font-bold text-green-700 dark:text-green-400">
                    Why this matters
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 mt-2 leading-6">
                    Larger input sizes require algorithms that scale efficiently
                    as n increases.
                  </p>

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3">

                  <Database className="text-blue-600" />

                  <h2 className="text-2xl font-bold">
                    Space Complexity
                  </h2>

                </div>

                <p className="text-6xl font-black text-blue-600 mt-8">
                  O(n)
                </p>

                <p className="text-gray-500 mt-5 leading-7">
                  Using additional linear storage is reasonable for the
                  constraint. The key is to avoid unnecessary data structures
                  that increase memory beyond the required scale.
                </p>

                <div className="mt-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 p-5">

                  <p className="font-bold text-blue-700 dark:text-blue-400">
                    Trade-off
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 mt-2 leading-6">
                    Additional memory may be acceptable when it significantly
                    reduces execution time.
                  </p>

                </div>

              </div>

            </div>

            {/* Complexity Scale */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-purple-600" />

                <h2 className="text-2xl font-bold">
                  Complexity Scale
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  ["O(1)", "Excellent", "Constant", "bg-green-500"],
                  ["O(log n)", "Excellent", "Logarithmic", "bg-green-500"],
                  ["O(n)", "Recommended", "Linear", "bg-blue-500"],
                  ["O(n log n)", "Acceptable", "Near Linear", "bg-blue-500"],
                  ["O(n²)", "Risky", "Quadratic", "bg-orange-500"],
                  ["O(2ⁿ)", "Avoid", "Exponential", "bg-red-500"],
                ].map(([complexity, label, type, color]) => (

                  <div
                    key={complexity}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5"
                  >

                    <div className="w-28 shrink-0">

                      <p className="font-black text-lg">
                        {complexity}
                      </p>

                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between mb-2">

                        <span className="font-semibold">
                          {type}
                        </span>

                        <span className="text-sm text-gray-500">
                          {label}
                        </span>

                      </div>

                      <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                        <div
                          className={`h-full rounded-full ${color}`}
                          style={{
                            width:
                              complexity === "O(1)"
                                ? "15%"
                                : complexity === "O(log n)"
                                ? "25%"
                                : complexity === "O(n)"
                                ? "45%"
                                : complexity === "O(n log n)"
                                ? "60%"
                                : complexity === "O(n²)"
                                ? "82%"
                                : "100%",
                          }}
                        />

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Constraints */}

        {activeTab === "constraints" && (
          <div className="mt-6 space-y-7">

            <div className="grid md:grid-cols-2 gap-6">

              {complexityFactors.map((factor) => {

                const Icon = factor.icon;

                return (
                  <div
                    key={factor.title}
                    className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">

                        <Icon
                          size={24}
                          className="text-purple-600"
                        />

                      </div>

                      <div>

                        <p className="text-gray-500 text-sm">
                          {factor.title}
                        </p>

                        <h3 className="text-xl font-bold">
                          {factor.value}
                        </h3>

                      </div>

                    </div>

                    <p className="text-gray-500 mt-5 leading-7">
                      {factor.description}
                    </p>

                  </div>
                );
              })}

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Target className="text-purple-600" />

                <h2 className="text-2xl font-bold">
                  Constraint-to-Complexity Reasoning
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  [
                    "n ≤ 100",
                    "Quadratic approaches may still be practical depending on the operation.",
                  ],
                  [
                    "n ≤ 10,000",
                    "Consider O(n log n) or optimized O(n) approaches.",
                  ],
                  [
                    "n ≤ 100,000",
                    "Prefer O(n) or O(n log n) solutions.",
                  ],
                  [
                    "n ≥ 1,000,000",
                    "Strongly favor linear or better complexity and carefully consider memory.",
                  ],
                ].map(([constraint, explanation]) => (

                  <div
                    key={constraint}
                    className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                  >

                    <span className="font-black text-purple-600 sm:w-32">
                      {constraint}
                    </span>

                    <p className="text-gray-500 leading-6">
                      {explanation}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Hints */}

        {activeTab === "hints" && (
          <div className="mt-6 space-y-7">

            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-3xl p-7">

              <div className="flex items-start gap-4">

                <Lightbulb
                  size={30}
                  className="text-orange-600 shrink-0"
                />

                <div>

                  <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                    Complexity Hints
                  </h2>

                  <p className="text-orange-700/80 dark:text-orange-300/80 mt-3 leading-7">
                    These hints help you reason about the expected complexity
                    without revealing the algorithm or implementation.
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <h2 className="text-2xl font-bold">
                Choose Hint Strength
              </h2>

              <div className="grid md:grid-cols-3 gap-5 mt-6">

                {[
                  [
                    "light",
                    "Light",
                    "Only reveal whether your target should be sub-quadratic.",
                  ],
                  [
                    "moderate",
                    "Moderate",
                    "Reveal the recommended complexity range.",
                  ],
                  [
                    "strong",
                    "Strong",
                    "Reveal time and space complexity targets.",
                  ],
                ].map(([id, title, description]) => (

                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedHint(id)}
                    className={`text-left rounded-2xl border-2 p-6 transition ${
                      selectedHint === id
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-900/10"
                        : "border-gray-200 dark:border-white/10"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <h3 className="font-bold text-lg">
                        {title}
                      </h3>

                      {selectedHint === id && (
                        <CheckCircle2
                          size={21}
                          className="text-purple-600"
                        />
                      )}

                    </div>

                    <p className="text-gray-500 mt-3 leading-6">
                      {description}
                    </p>

                  </button>

                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <Lock className="text-purple-600" />

                  <h2 className="text-2xl font-bold">
                    Current Hint
                  </h2>

                </div>

                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 text-sm font-bold">
                  {selectedHint.charAt(0).toUpperCase() +
                    selectedHint.slice(1)}
                </span>

              </div>

              <div className="mt-7 rounded-2xl bg-purple-50 dark:bg-purple-900/10 p-6">

                {selectedHint === "light" && (
                  <p className="leading-8">
                    Your solution should avoid quadratic complexity for the
                    maximum input size.
                  </p>
                )}

                {selectedHint === "moderate" && (
                  <p className="leading-8">
                    Aim for a linear or near-linear solution. Think about
                    whether additional storage can help you avoid repeatedly
                    comparing every pair.
                  </p>
                )}

                {selectedHint === "strong" && (
                  <p className="leading-8">
                    Target approximately <strong>O(n)</strong> time and
                    <strong> O(n)</strong> auxiliary space. Consider how a
                    suitable data structure might reduce repeated work.
                  </p>
                )}

              </div>

              <div className="flex items-center gap-3 mt-6 text-gray-500">

                <Lock size={17} />

                <span className="text-sm">
                  Algorithm and implementation details remain hidden.
                </span>

              </div>

            </div>

          </div>
        )}

        {/* Comparison */}

        {activeTab === "comparison" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center justify-between gap-5">

                <div className="flex items-center gap-3">

                  <BarChart3 className="text-purple-600" />

                  <h2 className="text-2xl font-bold">
                    Possible Complexity Classes
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold"
                >
                  {showAdvanced ? "Hide" : "Show"} Details
                  <ChevronDown
                    size={17}
                    className={`transition ${
                      showAdvanced ? "rotate-180" : ""
                    }`}
                  />
                </button>

              </div>

              <div className="grid md:grid-cols-3 gap-5 mt-7">

                {[
                  ["O(n)", "Strong Candidate", "Recommended"],
                  ["O(n log n)", "Strong Candidate", "Acceptable"],
                  ["O(n²)", "Potentially Too Slow", "Risky"],
                ].map(([complexity, description, label]) => (

                  <div
                    key={complexity}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <p className="text-3xl font-black text-purple-600">
                      {complexity}
                    </p>

                    <p className="font-bold mt-4">
                      {description}
                    </p>

                    <span className="inline-block mt-3 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">
                      {label}
                    </span>

                  </div>

                ))}

              </div>

              {showAdvanced && (
                <div className="mt-7 rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

                  <h3 className="font-bold">
                    AI Reasoning
                  </h3>

                  <p className="text-gray-500 mt-3 leading-7">
                    With 100,000 possible elements, an O(n²) approach could
                    require roughly 10 billion pair comparisons in the worst
                    case. A linear or near-linear strategy is therefore much
                    more appropriate.
                  </p>

                </div>
              )}

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <ArrowRight className="text-purple-600" />

                <h2 className="text-2xl font-bold">
                  Complexity Decision Guide
                </h2>

              </div>

              <div className="space-y-4">

                {[
                  ["Can O(1) work?", "Check whether direct access or mathematical reasoning is possible."],
                  ["Can O(log n) work?", "Look for sorted data, binary search, or divide-and-conquer opportunities."],
                  ["Can O(n) work?", "Usually preferred for large one-dimensional inputs."],
                  ["Is O(n log n) necessary?", "Consider sorting or efficient divide-and-conquer approaches."],
                  ["Is O(n²) unavoidable?", "Verify the constraints carefully before accepting it."],
                ].map(([question, answer]) => (

                  <div
                    key={question}
                    className="flex gap-4 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5"
                  >

                    <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                      ?
                    </div>

                    <div>

                      <h3 className="font-bold">
                        {question}
                      </h3>

                      <p className="text-gray-500 mt-1 leading-6">
                        {answer}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* How It Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-purple-600" />

            <h2 className="text-2xl font-bold">
              How AI Complexity Prediction Works
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Analyze Constraints",
                "AI reads input sizes, memory limits, and performance requirements.",
              ],
              [
                "2",
                "Estimate Complexity",
                "The system predicts a practical time and space complexity target.",
              ],
              [
                "3",
                "Explain Reasoning",
                "It explains why the expected complexity fits the constraints.",
              ],
              [
                "4",
                "Give Hints",
                "Users receive complexity guidance without seeing the solution.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-black">
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

        <div className="mt-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

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
                "Algorithm Selection",
                "Helps candidates reason about which complexity classes are appropriate.",
              ],
              [
                "🎯",
                "Constraint Awareness",
                "Connects input constraints directly with expected performance.",
              ],
              [
                "💡",
                "Guided Practice",
                "Provides useful hints without revealing the complete solution.",
              ],
              [
                "⚡",
                "Efficient Solutions",
                "Encourages candidates to design scalable solutions from the start.",
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
                The input size of up to 100,000 elements makes an O(n²)
                approach risky. Aim for approximately O(n) time with O(n)
                additional space. Use the complexity hint to guide your
                algorithm selection without revealing the implementation.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                ⚡
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Target Complexity
              </h3>

              <p className="text-5xl font-black">
                O(n)
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionSolutionComplexityPredictor;