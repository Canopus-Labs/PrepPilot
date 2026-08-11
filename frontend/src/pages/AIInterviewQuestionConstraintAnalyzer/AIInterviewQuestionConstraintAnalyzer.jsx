import React, { useMemo, useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  MessageSquare,
  BarChart3,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Award,
  Search,
  ShieldCheck,
  TrendingUp,
  FileText,
  Gauge,
  Database,
  Clock3,
} from "lucide-react";

const AIInterviewQuestionConstraintAnalyzer = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);

  const questions = [
    {
      question:
        "Given an array of up to 100,000 integers, find two numbers that add up to a target value.",
      type: "Array / Hashing",
      difficulty: "Medium",
      constraintScore: 94,
      explicitConstraints: 3,
      hiddenConstraints: 2,
      constraints: [
        {
          name: "Input Size",
          value: "n ≤ 100,000",
          type: "Explicit",
          impact:
            "A quadratic O(n²) solution may perform poorly for large input sizes.",
          recommendation:
            "Prefer an O(n) hash-map approach.",
        },
        {
          name: "Time Complexity",
          value: "Large input requires efficient processing",
          type: "Inferred",
          impact:
            "The input size suggests that checking every pair is not efficient enough.",
          recommendation:
            "Use hashing to reduce pair lookup to near constant time.",
        },
        {
          name: "Space Complexity",
          value: "Additional memory is available",
          type: "Inferred",
          impact:
            "A hash map can be used to trade memory for faster lookups.",
          recommendation:
            "Use O(n) auxiliary space if memory constraints allow it.",
        },
        {
          name: "Target Matching",
          value: "Exact target sum",
          type: "Explicit",
          impact:
            "Each number needs to be matched with target - currentNumber.",
          recommendation:
            "Store previously seen values and check complements.",
        },
        {
          name: "Duplicate Values",
          value: "Duplicates may exist",
          type: "Explicit",
          impact:
            "The solution should correctly handle repeated values.",
          recommendation:
            "Track indices or occurrences when required by the problem.",
        },
      ],
      recommendedApproach:
        "Use a hash map to store previously seen numbers and check whether the complement of the current number already exists.",
      complexity: "O(n) time and O(n) space",
      risks: [
        "Using a nested loop can result in O(n²) time.",
        "Ignoring duplicate values may produce incorrect results.",
        "Using sorting changes the index-handling requirements.",
      ],
      strengths: [
        "Correctly identifies the large input constraint.",
        "Recognizes the need for an efficient lookup strategy.",
        "Understands that time and space complexity influence the solution.",
      ],
    },
    {
      question:
        "Design a system that processes 1 million requests per minute while keeping average response time below 200ms.",
      type: "System Design",
      difficulty: "Hard",
      constraintScore: 91,
      explicitConstraints: 3,
      hiddenConstraints: 3,
      constraints: [
        {
          name: "Request Volume",
          value: "1,000,000 requests/minute",
          type: "Explicit",
          impact:
            "The system must support high throughput and horizontal scalability.",
          recommendation:
            "Use load balancing and horizontally scalable services.",
        },
        {
          name: "Response Time",
          value: "< 200ms average",
          type: "Explicit",
          impact:
            "Slow database queries or synchronous processing can violate the latency requirement.",
          recommendation:
            "Use caching, optimized queries, and asynchronous processing where appropriate.",
        },
        {
          name: "Availability",
          value: "High availability is implied",
          type: "Inferred",
          impact:
            "A single server or service instance creates a major availability risk.",
          recommendation:
            "Use redundancy and distribute workloads across multiple instances.",
        },
        {
          name: "Scalability",
          value: "Traffic must scale horizontally",
          type: "Inferred",
          impact:
            "Vertical scaling alone may not be sufficient for sustained high traffic.",
          recommendation:
            "Design stateless services that can scale horizontally.",
        },
        {
          name: "Caching",
          value: "Frequently accessed data may be cached",
          type: "Inferred",
          impact:
            "Caching can reduce database load and improve response time.",
          recommendation:
            "Use an appropriate distributed cache for hot data.",
        },
        {
          name: "Traffic Spikes",
          value: "Traffic may not be uniform",
          type: "Inferred",
          impact:
            "Sudden traffic increases can overload services if capacity is fixed.",
          recommendation:
            "Use autoscaling and queue-based load management.",
        },
      ],
      recommendedApproach:
        "Use a load-balanced, horizontally scalable architecture with caching, optimized storage access, monitoring, and asynchronous processing for non-critical work.",
      complexity: "Horizontally scalable architecture",
      risks: [
        "Ignoring traffic spikes can cause service overload.",
        "A single database can become a bottleneck.",
        "Synchronous processing for every operation can increase latency.",
      ],
      strengths: [
        "Recognizes throughput as a primary design constraint.",
        "Connects latency requirements with architectural decisions.",
        "Understands the importance of scalability.",
      ],
    },
    {
      question:
        "Given a matrix with at most 500 rows and 500 columns, find the shortest path from the top-left cell to the bottom-right cell.",
      type: "Graph / Matrix",
      difficulty: "Medium",
      constraintScore: 87,
      explicitConstraints: 2,
      hiddenConstraints: 2,
      constraints: [
        {
          name: "Matrix Size",
          value: "Rows, columns ≤ 500",
          type: "Explicit",
          impact:
            "The matrix can contain up to 250,000 cells, so the solution should avoid excessive repeated processing.",
          recommendation:
            "Prefer BFS or another O(rows × columns) approach when movement costs are equal.",
        },
        {
          name: "Movement Cost",
          value: "Equal movement cost is implied",
          type: "Inferred",
          impact:
            "Equal edge costs make BFS suitable for shortest-path traversal.",
          recommendation:
            "Use BFS with a visited structure.",
        },
        {
          name: "Memory",
          value: "Visited state may require O(rows × columns)",
          type: "Inferred",
          impact:
            "The traversal needs to remember which cells have already been processed.",
          recommendation:
            "Use a boolean visited matrix or equivalent representation.",
        },
        {
          name: "Blocked Cells",
          value: "Obstacles may exist",
          type: "Inferred",
          impact:
            "The algorithm must skip cells that cannot be traversed.",
          recommendation:
            "Validate each neighboring cell before adding it to the queue.",
        },
      ],
      recommendedApproach:
        "Model the matrix as a grid graph and use BFS because every valid move has equal cost.",
      complexity: "O(rows × columns) time and O(rows × columns) space",
      risks: [
        "DFS does not guarantee the shortest path without additional logic.",
        "Forgetting visited cells can cause repeated processing.",
        "Ignoring obstacles can produce invalid paths.",
      ],
      strengths: [
        "Identifies the matrix-size limitation.",
        "Recognizes equal movement cost as an important clue.",
        "Connects constraints with the BFS approach.",
      ],
    },
  ];

  const selected = questions[selectedQuestion];

  const overallScore = useMemo(() => {
    return Math.round(
      questions.reduce(
        (sum, question) => sum + question.constraintScore,
        0
      ) / questions.length
    );
  }, []);

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("analysis");
    }, 700);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    return "Needs Improvement";
  };

  const getConstraintClass = (type) => {
    if (type === "Explicit") {
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    }

    return "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <Gauge
                size={34}
                className="text-violet-600"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Question Constraint Analyzer
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Identify important problem constraints and understand how
                they influence your interview solution.
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
                <RefreshCw
                  size={19}
                  className="animate-spin"
                />
                Analyzing Constraints...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Constraints
              </>
            )}
          </button>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <MessageSquare
              className="text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Questions Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              32
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target
              className="text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Constraints Found
            </p>

            <p className="text-5xl font-black mt-3">
              86
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <AlertTriangle
              className="text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Hidden Constraints
            </p>

            <p className="text-5xl font-black mt-3">
              29
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <ShieldCheck
              className="text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Constraint Awareness
            </p>

            <p className="text-5xl font-black mt-3">
              {overallScore}%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Constraint Analysis Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI analyzes interview questions to identify explicit
            constraints, infer hidden requirements, and explain how those
            constraints should influence algorithm, data structure, and
            system design decisions.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {questions.map((question, index) => (

              <button
                key={index}
                type="button"
                onClick={() => setSelectedQuestion(index)}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-center justify-between gap-3">

                  <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                    {question.type}
                  </span>

                  <span className="text-xs font-semibold text-gray-500">
                    {question.difficulty}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {question.question}
                </h3>

                <div className="flex items-center gap-2 mt-5">

                  <span
                    className={`font-bold ${getScoreColor(
                      question.constraintScore
                    )}`}
                  >
                    {question.constraintScore}%
                  </span>

                  <span className="text-sm text-gray-500">
                    constraint awareness
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <p className="text-sm text-gray-500">
            Interview Question
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-3">
            {selected.question}
          </h2>

          <div className="flex flex-wrap gap-3 mt-5">

            <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
              {selected.type}
            </span>

            <span className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              {selected.difficulty}
            </span>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("analysis")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "analysis"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Constraint Analysis
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("question")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "question"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Question
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("constraints")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "constraints"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Detected Constraints
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("approach")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "approach"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Recommended Approach
          </button>

        </div>

        {/* Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Constraint Awareness Score
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="relative w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getScoreColor(
                        selected.constraintScore
                      )}`}
                    >
                      {selected.constraintScore}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {getScoreLabel(
                        selected.constraintScore
                      )}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-violet-600"
                  style={{
                    width: `${selected.constraintScore}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                This score represents how effectively the important
                explicit and inferred constraints have been identified.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Constraint Summary
                </h2>

              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 p-5">

                  <FileText
                    className="text-blue-600"
                    size={26}
                  />

                  <p className="text-3xl font-black text-blue-600 mt-3">
                    {selected.explicitConstraints}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Explicit Constraints
                  </p>

                </div>

                <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-5">

                  <Search
                    className="text-violet-600"
                    size={26}
                  />

                  <p className="text-3xl font-black text-violet-600 mt-3">
                    {selected.hiddenConstraints}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Inferred Constraints
                  </p>

                </div>

              </div>

              <div className="mt-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-5">

                <div className="flex items-start gap-3">

                  <CheckCircle2
                    className="text-green-600 shrink-0"
                    size={22}
                  />

                  <div>

                    <p className="font-bold text-green-700 dark:text-green-400">
                      AI Assessment
                    </p>

                    <p className="text-gray-500 mt-2 leading-6">
                      {selected.constraintScore >= 85
                        ? "The important constraints are clearly identified and can guide an efficient solution."
                        : "Several important constraints should be clarified before selecting the final approach."}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Question */}

        {activeTab === "question" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-6">

              <FileText className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Full Question
              </h2>

            </div>

            <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.question}
              </p>

            </div>

            <div className="mt-7 rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <div className="flex items-center gap-3">

                <Lightbulb className="text-yellow-500" />

                <p className="font-bold text-lg">
                  AI Reading Tip
                </p>

              </div>

              <p className="text-gray-500 mt-3 leading-7">
                Before writing code or designing the solution, identify
                input limits, output requirements, performance expectations,
                memory considerations, and special cases that could change
                your approach.
              </p>

            </div>

          </div>
        )}

        {/* Constraints */}

        {activeTab === "constraints" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Search className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Detected Constraints
              </h2>

            </div>

            <div className="space-y-5">

              {selected.constraints.map((constraint, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-xl font-bold">
                          {constraint.name}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getConstraintClass(
                            constraint.type
                          )}`}
                        >
                          {constraint.type}
                        </span>

                      </div>

                      <p className="text-lg font-semibold text-violet-600 mt-3">
                        {constraint.value}
                      </p>

                    </div>

                    <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">

                      {constraint.name === "Input Size" ||
                      constraint.name === "Matrix Size" ? (
                        <Database
                          className="text-violet-600"
                          size={24}
                        />
                      ) : constraint.name === "Response Time" ? (
                        <Clock3
                          className="text-violet-600"
                          size={24}
                        />
                      ) : (
                        <Gauge
                          className="text-violet-600"
                          size={24}
                        />
                      )}

                    </div>

                  </div>

                  <div className="mt-6 rounded-xl bg-gray-50 dark:bg-gray-800 p-5">

                    <p className="text-sm text-gray-500">
                      Why It Matters
                    </p>

                    <p className="mt-2 leading-7">
                      {constraint.impact}
                    </p>

                  </div>

                  <div className="mt-5 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-5">

                    <div className="flex items-start gap-3">

                      <Lightbulb
                        className="text-green-600 shrink-0"
                        size={22}
                      />

                      <div>

                        <p className="font-semibold text-green-700 dark:text-green-400">
                          AI Recommendation
                        </p>

                        <p className="text-gray-500 mt-2 leading-6">
                          {constraint.recommendation}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* Recommended Approach */}

        {activeTab === "approach" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Sparkles className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Constraint-Based Solution Recommendation
              </h2>

            </div>

            <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-7">

              <p className="text-sm text-gray-500">
                Recommended Approach
              </p>

              <p className="text-xl font-bold mt-3 leading-8">
                {selected.recommendedApproach}
              </p>

            </div>

            <div className="mt-7 grid md:grid-cols-2 gap-6">

              <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    className="text-green-600"
                    size={25}
                  />

                  <h3 className="text-xl font-bold">
                    Expected Complexity
                  </h3>

                </div>

                <p className="text-lg font-bold text-green-600 mt-5">
                  {selected.complexity}
                </p>

              </div>

              <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

                <div className="flex items-center gap-3">

                  <AlertTriangle
                    className="text-orange-500"
                    size={25}
                  />

                  <h3 className="text-xl font-bold">
                    Potential Risks
                  </h3>

                </div>

                <p className="text-gray-500 mt-5 leading-6">
                  Consider the following issues before finalizing the
                  solution.
                </p>

              </div>

            </div>

            <div className="mt-7 space-y-4">

              {selected.risks.map((risk, index) => (

                <div
                  key={index}
                  className="flex items-start gap-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 p-5"
                >

                  <AlertTriangle
                    className="text-orange-500 shrink-0"
                    size={21}
                  />

                  <p className="font-semibold">
                    {risk}
                  </p>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Constraint Analysis Strengths
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            {selected.strengths.map((strength, index) => (

              <div
                key={index}
                className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6"
              >

                <CheckCircle2
                  className="text-green-600"
                  size={24}
                />

                <p className="font-semibold mt-4 leading-6">
                  {strength}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Constraint Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Constraint Categories
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Input Size",
                score: 94,
                example: "Number of elements or requests",
                icon: "📦",
              },
              {
                title: "Time Limit",
                score: 91,
                example: "Response or execution time",
                icon: "⏱️",
              },
              {
                title: "Memory",
                score: 83,
                example: "Available auxiliary memory",
                icon: "💾",
              },
              {
                title: "Scalability",
                score: 89,
                example: "Expected growth and workload",
                icon: "📈",
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

                <p className="text-3xl font-black text-violet-600 mt-3">
                  {item.score}%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {item.example}
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Explicit vs Hidden */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Explicit vs Inferred Constraints
            </h2>

          </div>

          <div className="space-y-8">

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Explicit constraints
                </span>

                <span className="font-black text-blue-600">
                  {selected.explicitConstraints}
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  style={{
                    width: `${Math.min(
                      selected.explicitConstraints * 20,
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Inferred constraints
                </span>

                <span className="font-black text-violet-600">
                  {selected.hiddenConstraints}
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{
                    width: `${Math.min(
                      selected.hiddenConstraints * 20,
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>

          </div>

          <div className="mt-8 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

            <div className="flex items-center gap-3">

              <Search
                size={22}
                className="text-violet-600"
              />

              <p className="font-bold">
                Interview Tip
              </p>

            </div>

            <p className="text-gray-500 mt-3 leading-7">
              Strong candidates do not only read the constraints that are
              explicitly written. They infer what the input size, latency,
              memory, and scalability requirements mean for the solution.
            </p>

          </div>

        </div>

        {/* Common Constraint Signals */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Common Constraint Signals
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-200 dark:border-white/10">

                  <th className="p-4">
                    Signal
                  </th>

                  <th className="p-4">
                    Likely Constraint
                  </th>

                  <th className="p-4">
                    Possible Impact
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  [
                    "n ≤ 10⁵ or larger",
                    "Large input size",
                    "Avoid O(n²) solutions when possible.",
                  ],
                  [
                    "Response time < 200ms",
                    "Latency requirement",
                    "Optimize expensive operations and use caching.",
                  ],
                  [
                    "Millions of requests",
                    "High throughput",
                    "Consider horizontal scaling and load balancing.",
                  ],
                  [
                    "Memory limit",
                    "Space constraint",
                    "Avoid unnecessary data structures.",
                  ],
                  [
                    "Real-time processing",
                    "Low-latency requirement",
                    "Avoid slow synchronous operations.",
                  ],
                ].map((row, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-white/5"
                  >

                    <td className="p-4 font-semibold text-violet-600">
                      {row[0]}
                    </td>

                    <td className="p-4 font-semibold">
                      {row[1]}
                    </td>

                    <td className="p-4 text-gray-500">
                      {row[2]}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* AI Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Constraint Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🔍
              </p>

              <h3 className="text-xl font-bold mt-4">
                Read Carefully
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Extract every explicit requirement before choosing an
                algorithm or architecture.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Infer Requirements
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Think about hidden performance, memory, scalability, and
                reliability requirements.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Let Constraints Guide You
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Use constraints to justify your algorithm, data structure,
                and system design decisions.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3">

                <ShieldCheck className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Overall Constraint Awareness
                </h2>

              </div>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your constraint awareness is strong. Continue practicing
                how input limits, time requirements, memory restrictions,
                and scalability expectations influence technical decisions.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {overallScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Constraint Awareness
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
              style={{
                width: `${overallScore}%`,
              }}
            />

          </div>

        </div>

        {/* Final AI Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Do not treat constraints as extra information. They are
                often the clues that determine the correct approach. Always
                consider input size, execution time, memory, scalability,
                and edge cases before committing to a solution.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Awareness
              </h3>

              <p className="text-5xl font-black">
                {selected.constraintScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionConstraintAnalyzer;