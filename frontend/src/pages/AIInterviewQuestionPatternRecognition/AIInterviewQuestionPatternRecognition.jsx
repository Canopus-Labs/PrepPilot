import React, { useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  Search,
  CheckCircle2,
  BarChart3,
  ArrowRight,
  RefreshCw,
  Lightbulb,
  Code2,
  Layers,
  TrendingUp,
  BookOpen,
  Zap,
} from "lucide-react";

const AIInterviewQuestionPatternRecognition = () => {
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [activeTab, setActiveTab] = useState("patterns");
  const [question, setQuestion] = useState(
    "Find the longest substring without repeating characters."
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const patterns = [
    {
      name: "Sliding Window",
      category: "Array / String",
      confidence: 96,
      mastery: 78,
      occurrences: 18,
      description:
        "Maintain a dynamic range of elements and expand or shrink the window based on the current constraints.",
      signals: [
        "Contiguous subarray or substring",
        "Longest or shortest range",
        "Frequency or uniqueness constraints",
        "Need to process elements efficiently",
      ],
      approach: [
        "Initialize two pointers representing the window.",
        "Expand the right pointer to include new elements.",
        "Check whether the current window satisfies the constraint.",
        "Move the left pointer when the constraint is violated.",
        "Track the best valid window.",
      ],
      questions: [
        "Longest Substring Without Repeating Characters",
        "Minimum Size Subarray Sum",
        "Longest Repeating Character Replacement",
        "Permutation in String",
      ],
    },
    {
      name: "Two Pointers",
      category: "Array / String",
      confidence: 92,
      mastery: 84,
      occurrences: 24,
      description:
        "Use two indices that move through a data structure to reduce unnecessary comparisons and achieve linear-time solutions.",
      signals: [
        "Sorted array",
        "Pair or triplet search",
        "Comparing values from both ends",
        "Need to reduce nested loops",
      ],
      approach: [
        "Place pointers at appropriate starting positions.",
        "Compare the values referenced by both pointers.",
        "Move one or both pointers according to the condition.",
        "Continue until the pointers meet or cross.",
        "Record the valid result.",
      ],
      questions: [
        "Two Sum II",
        "3Sum",
        "Container With Most Water",
        "Valid Palindrome",
      ],
    },
    {
      name: "Binary Search",
      category: "Searching / Optimization",
      confidence: 94,
      mastery: 71,
      occurrences: 15,
      description:
        "Repeatedly reduce the search space by half when the input or answer space has a monotonic property.",
      signals: [
        "Sorted input",
        "Monotonic condition",
        "Search for minimum or maximum feasible value",
        "Need logarithmic search",
      ],
      approach: [
        "Define the search space.",
        "Calculate the middle position.",
        "Evaluate the condition at the middle.",
        "Discard the impossible half.",
        "Repeat until the answer is found.",
      ],
      questions: [
        "Search in Rotated Sorted Array",
        "First and Last Position",
        "Koko Eating Bananas",
        "Search a 2D Matrix",
      ],
    },
    {
      name: "Dynamic Programming",
      category: "Optimization",
      confidence: 89,
      mastery: 63,
      occurrences: 21,
      description:
        "Break a problem into overlapping subproblems and store previously computed results to avoid repeated work.",
      signals: [
        "Overlapping subproblems",
        "Optimal substructure",
        "Multiple choices at each step",
        "Repeated recursive calculations",
      ],
      approach: [
        "Define the state.",
        "Identify the transition.",
        "Determine the base cases.",
        "Choose memoization or tabulation.",
        "Analyze time and space complexity.",
      ],
      questions: [
        "Climbing Stairs",
        "House Robber",
        "Coin Change",
        "Longest Common Subsequence",
      ],
    },
    {
      name: "Greedy",
      category: "Optimization",
      confidence: 87,
      mastery: 69,
      occurrences: 13,
      description:
        "Make the locally optimal decision at each step when those choices can be proven to lead to a globally optimal solution.",
      signals: [
        "Optimization objective",
        "Locally optimal choices",
        "Ordering or scheduling",
        "Can prove exchange or greedy-choice property",
      ],
      approach: [
        "Identify the optimization objective.",
        "Determine the locally best choice.",
        "Verify that the greedy choice is safe.",
        "Make the choice and update the state.",
        "Repeat until the problem is complete.",
      ],
      questions: [
        "Activity Selection",
        "Jump Game",
        "Gas Station",
        "Non-overlapping Intervals",
      ],
    },
    {
      name: "System Design Trade-Off",
      category: "System Design",
      confidence: 84,
      mastery: 58,
      occurrences: 9,
      description:
        "Compare architectural alternatives by analyzing scalability, reliability, performance, cost, and maintainability.",
      signals: [
        "Multiple valid architectures",
        "Scalability requirements",
        "Performance constraints",
        "Reliability or availability requirements",
      ],
      approach: [
        "Clarify requirements.",
        "Identify possible architectural approaches.",
        "Compare advantages and disadvantages.",
        "Select the approach based on constraints.",
        "Explain the trade-offs clearly.",
      ],
      questions: [
        "Design a URL Shortener",
        "Design a Rate Limiter",
        "Design a Notification System",
        "Design a Distributed Cache",
      ],
    },
  ];

  const selected = patterns[selectedPattern];

  const totalPatterns = patterns.length;

  const averageMastery = useMemo(() => {
    return Math.round(
      patterns.reduce((sum, pattern) => sum + pattern.mastery, 0) /
        patterns.length
    );
  }, []);

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      setActiveTab("analysis");
    }, 700);
  };

  const getMasteryColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 65) return "text-orange-500";
    return "text-red-600";
  };

  const getMasteryBar = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 65) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <Brain size={34} className="text-violet-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Question Pattern Recognition
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Discover reusable problem-solving patterns hidden across
                different interview questions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Detecting Pattern...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Detect Question Pattern
              </>
            )}
          </button>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <Layers className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Patterns Detected
            </p>

            <p className="text-5xl font-black mt-2">
              {totalPatterns}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <Target className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Average Mastery
            </p>

            <p className="text-5xl font-black mt-2">
              {averageMastery}%
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <Code2 className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Questions Mapped
            </p>

            <p className="text-5xl font-black mt-2">
              100+
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <TrendingUp className="text-orange-500" size={30} />

            <p className="text-gray-500 mt-4">
              Pattern Recognition
            </p>

            <p className="text-5xl font-black mt-2">
              82%
            </p>
          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Learn Patterns, Not Just Questions
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI analyzes interview questions to identify reusable patterns
            such as sliding window, two pointers, binary search, dynamic
            programming, greedy strategies, and system-design trade-offs.
            Recognizing these patterns helps you apply the right approach
            faster instead of memorizing individual solutions.
          </p>

        </div>

        {/* Question Analyzer */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-6">

            <Search className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Analyze Interview Question
            </h2>

          </div>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
            className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-violet-500 resize-none leading-7"
            placeholder="Paste an interview question here..."
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5">

            <p className="text-sm text-gray-500">
              AI will identify the underlying problem-solving pattern and
              recommend related questions.
            </p>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing || !question.trim()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-50"
            >
              <Zap size={18} />
              Analyze Pattern
            </button>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("patterns")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "patterns"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Pattern Library
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("analysis")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "analysis"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Pattern Analysis
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("practice")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "practice"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Related Practice
          </button>

        </div>

        {/* Pattern Library */}

        {activeTab === "patterns" && (
          <div className="mt-6 grid lg:grid-cols-3 gap-6">

            {patterns.map((pattern, index) => (

              <button
                key={pattern.name}
                type="button"
                onClick={() => setSelectedPattern(index)}
                className={`text-left bg-white dark:bg-[#111827] rounded-3xl shadow p-6 transition hover:-translate-y-1 ${
                  selectedPattern === index
                    ? "ring-2 ring-violet-500"
                    : ""
                }`}
              >

                <div className="flex items-center justify-between gap-4">

                  <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                    <Layers
                      size={24}
                      className="text-violet-600"
                    />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                    {pattern.category}
                  </span>

                </div>

                <h3 className="text-xl font-bold mt-6">
                  {pattern.name}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {pattern.description}
                </p>

                <div className="mt-6">

                  <div className="flex justify-between mb-2">

                    <span className="text-sm text-gray-500">
                      Your Mastery
                    </span>

                    <span
                      className={`font-black ${getMasteryColor(
                        pattern.mastery
                      )}`}
                    >
                      {pattern.mastery}%
                    </span>

                  </div>

                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className={`h-full ${getMasteryBar(
                        pattern.mastery
                      )}`}
                      style={{
                        width: `${pattern.mastery}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="flex items-center justify-between mt-6 text-sm">

                  <span className="text-gray-500">
                    {pattern.occurrences} questions
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-violet-600"
                  />

                </div>

              </button>
            ))}

          </div>
        )}

        {/* Selected Pattern */}

        {activeTab === "analysis" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <Brain className="text-violet-600" />

                    <h2 className="text-3xl font-bold">
                      {selected.name}
                    </h2>

                  </div>

                  <span className="inline-block mt-4 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold">
                    {selected.category}
                  </span>

                  <p className="text-gray-500 mt-5 max-w-3xl leading-7">
                    {selected.description}
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-sm text-gray-500">
                    AI Confidence
                  </p>

                  <p className="text-6xl font-black text-violet-600 mt-2">
                    {selected.confidence}%
                  </p>

                </div>

              </div>

            </div>

            {/* Recognition Signals */}

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <Search className="text-blue-600" />

                  <h2 className="text-2xl font-bold">
                    Pattern Recognition Signals
                  </h2>

                </div>

                <div className="space-y-4">

                  {selected.signals.map((signal, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 p-5"
                    >

                      <CheckCircle2
                        size={21}
                        className="text-blue-600 shrink-0"
                      />

                      <p className="font-semibold">
                        {signal}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

              {/* Approach */}

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <Lightbulb className="text-yellow-500" />

                  <h2 className="text-2xl font-bold">
                    Recommended Approach
                  </h2>

                </div>

                <div className="space-y-4">

                  {selected.approach.map((step, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >

                      <span className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold shrink-0">
                        {index + 1}
                      </span>

                      <p className="leading-7">
                        {step}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

            {/* Mastery */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Your Pattern Mastery
                </h2>

              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">

                <div className="text-center">

                  <p
                    className={`text-7xl font-black ${getMasteryColor(
                      selected.mastery
                    )}`}
                  >
                    {selected.mastery}%
                  </p>

                  <p className="text-gray-500 mt-2">
                    Mastery
                  </p>

                </div>

                <div className="flex-1 w-full">

                  <div className="flex justify-between mb-3">

                    <span className="text-gray-500">
                      Pattern recognition progress
                    </span>

                    <span className="font-bold">
                      {selected.mastery}%
                    </span>

                  </div>

                  <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className={`h-full ${getMasteryBar(
                        selected.mastery
                      )}`}
                      style={{
                        width: `${selected.mastery}%`,
                      }}
                    />

                  </div>

                  <p className="text-gray-500 mt-4 leading-6">
                    {selected.mastery >= 80
                      ? "You recognize this pattern consistently. Focus on harder variations and speed."
                      : selected.mastery >= 65
                      ? "You have a good foundation. More targeted practice will improve recognition speed."
                      : "This pattern needs additional practice. Focus on identifying its signals before solving problems."}
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Related Practice */}

        {activeTab === "practice" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

                <div>

                  <div className="flex items-center gap-3">

                    <BookOpen className="text-violet-600" />

                    <h2 className="text-2xl font-bold">
                      Related Questions
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-3">
                    Practice questions that use the same underlying pattern.
                  </p>

                </div>

                <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold">
                  {selected.name}
                </span>

              </div>

              <div className="grid md:grid-cols-2 gap-5 mt-8">

                {selected.questions.map((item, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:border-violet-500 transition"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <span className="text-sm text-gray-500">
                          Question {index + 1}
                        </span>

                        <h3 className="font-bold text-lg mt-2">
                          {item}
                        </h3>

                      </div>

                      <Code2
                        className="text-violet-600 shrink-0"
                        size={22}
                      />

                    </div>

                    <button
                      type="button"
                      className="mt-5 inline-flex items-center gap-2 text-violet-600 font-semibold hover:gap-3 transition-all"
                    >
                      Practice Question
                      <ArrowRight size={17} />
                    </button>

                  </div>
                ))}

              </div>

            </div>

            {/* Pattern Learning */}

            <div className="grid lg:grid-cols-3 gap-6">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <Zap className="text-yellow-500" size={30} />

                <h3 className="text-xl font-bold mt-5">
                  Recognize Faster
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  Learn the signals that indicate when this pattern is
                  appropriate so you spend less time guessing approaches.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <Layers className="text-violet-600" size={30} />

                <h3 className="text-xl font-bold mt-5">
                  Reuse Solutions
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  Apply the same underlying strategy to multiple questions
                  instead of memorizing separate solutions.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <TrendingUp className="text-green-600" size={30} />

                <h3 className="text-xl font-bold mt-5">
                  Improve Speed
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  Faster pattern recognition helps you reach the correct
                  approach earlier during timed interviews.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Pattern Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Pattern Mastery Overview
            </h2>

          </div>

          <div className="space-y-6">

            {patterns.map((pattern) => (

              <div key={pattern.name}>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">

                  <div className="flex items-center gap-3">

                    <span className="font-semibold">
                      {pattern.name}
                    </span>

                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                      {pattern.occurrences} questions
                    </span>

                  </div>

                  <span
                    className={`font-black ${getMasteryColor(
                      pattern.mastery
                    )}`}
                  >
                    {pattern.mastery}%
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className={`h-full ${getMasteryBar(
                      pattern.mastery
                    )}`}
                    style={{
                      width: `${pattern.mastery}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* AI Pattern Process */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              How AI Recognizes Patterns
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Analyze",
                "Understand the question, constraints, and expected output.",
              ],
              [
                "2",
                "Detect",
                "Compare problem characteristics with known patterns.",
              ],
              [
                "3",
                "Explain",
                "Show why the detected pattern fits the problem.",
              ],
              [
                "4",
                "Recommend",
                "Suggest related questions for targeted practice.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl bg-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-white text-violet-600 flex items-center justify-center font-black">
                  {number}
                </div>

                <h3 className="text-xl font-bold mt-5">
                  {title}
                </h3>

                <p className="text-white/80 mt-3 leading-6">
                  {description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Learning Benefits */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Why Pattern Recognition Matters
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                icon: "🧠",
                title: "Reusable Thinking",
                description:
                  "Learn general strategies that work across many questions.",
              },
              {
                icon: "⚡",
                title: "Faster Solutions",
                description:
                  "Recognize the right approach before spending time experimenting.",
              },
              {
                icon: "🎯",
                title: "Less Memorization",
                description:
                  "Understand the underlying idea instead of memorizing answers.",
              },
              {
                icon: "📈",
                title: "Stronger Algorithms",
                description:
                  "Build deeper algorithmic thinking and problem-solving ability.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {item.icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Pattern Recognition Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              ["Week 1", 61],
              ["Week 2", 69],
              ["Week 3", 76],
              ["Current", 82],
            ].map(([label, score]) => (

              <div
                key={label}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center"
              >

                <p className="text-sm text-gray-500">
                  {label}
                </p>

                <p className="text-4xl font-black text-violet-600 mt-3">
                  {score}%
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                  <div
                    className="h-full bg-violet-600 rounded-full"
                    style={{
                      width: `${score}%`,
                    }}
                  />

                </div>

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
                Focus on recognizing the underlying pattern before thinking
                about implementation. For your current preparation level,
                practicing multiple questions from the same pattern will help
                you identify reusable approaches faster and reduce
                memorization-based learning.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🧠
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Recognition
              </h3>

              <p className="text-5xl font-black">
                82%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionPatternRecognition;