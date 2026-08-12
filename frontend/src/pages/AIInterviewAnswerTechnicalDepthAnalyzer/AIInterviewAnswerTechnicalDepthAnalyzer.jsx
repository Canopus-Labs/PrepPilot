import React, { useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  MessageSquare,
  Lightbulb,
  TrendingUp,
  Award,
  ArrowRight,
  BookOpen,
  Layers3,
  Gauge,
  Code2,
  Zap,
  ShieldCheck,
  Search,
} from "lucide-react";

const AIInterviewAnswerTechnicalDepthAnalyzer = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState("Intermediate");
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);

  const answers = [
    {
      question: "What is the difference between an array and a linked list?",
      type: "Data Structures",
      original:
        "An array stores elements in memory and a linked list stores nodes connected together. Arrays are generally faster for accessing elements, while linked lists are useful when we need to insert or delete elements.",
      improved:
        "An array stores elements in contiguous memory, enabling O(1) indexed access through address calculation. A linked list stores independent nodes connected through pointers, so accessing an arbitrary element generally requires O(n) traversal. Arrays provide better cache locality, while linked lists can perform O(1) insertion or deletion when the relevant node position is already known.",
      depthScore: 64,
      beginnerScore: 88,
      intermediateScore: 64,
      advancedScore: 42,
      missingConcepts: [
        "Memory layout",
        "Cache locality",
        "Indexed access complexity",
        "Pointer traversal",
        "Insertion and deletion conditions",
      ],
      strengths: [
        "Correctly identifies the basic structural difference.",
        "Recognizes access-time differences.",
        "Mentions insertion and deletion behavior.",
      ],
      depthAreas: [
        {
          title: "Core Concepts",
          score: 88,
          description: "The fundamental difference is correctly explained.",
        },
        {
          title: "Complexity",
          score: 65,
          description: "Basic access behavior is mentioned but not fully analyzed.",
        },
        {
          title: "Internal Working",
          score: 48,
          description: "Memory layout and pointer mechanics are not explained.",
        },
        {
          title: "Advanced Reasoning",
          score: 41,
          description: "Cache locality and practical performance considerations are missing.",
        },
      ],
      deeperSuggestions: [
        "Explain contiguous memory allocation for arrays.",
        "Explain how linked-list nodes use pointers or references.",
        "Discuss cache locality and why arrays can perform better in practice.",
        "Explain when linked-list insertion is actually O(1).",
      ],
    },
    {
      question: "How does a database index improve query performance?",
      type: "Database",
      original:
        "A database index helps queries run faster because it lets the database find the required data more quickly instead of checking every row. Indexes are useful for columns that are frequently searched.",
      improved:
        "A database index creates an auxiliary data structure, commonly a B-tree or B+ tree, that allows the database engine to locate matching rows without scanning the entire table. For selective predicates, the index can reduce the number of pages that must be read. However, indexes also consume storage and add write overhead because inserts, updates, and deletes may require index maintenance.",
      depthScore: 69,
      beginnerScore: 92,
      intermediateScore: 69,
      advancedScore: 51,
      missingConcepts: [
        "B-tree / B+ tree structure",
        "Page-level data access",
        "Selectivity",
        "Index maintenance cost",
        "Composite indexes",
      ],
      strengths: [
        "Correctly explains the purpose of an index.",
        "Understands that indexes reduce unnecessary row scanning.",
        "Identifies appropriate use cases.",
      ],
      depthAreas: [
        {
          title: "Core Concepts",
          score: 92,
          description: "The purpose of database indexes is clearly understood.",
        },
        {
          title: "Complexity",
          score: 70,
          description: "Performance improvement is explained without complexity details.",
        },
        {
          title: "Internal Working",
          score: 61,
          description: "The answer does not explain index structures or page access.",
        },
        {
          title: "Advanced Reasoning",
          score: 53,
          description: "Write overhead and index trade-offs are not discussed.",
        },
      ],
      deeperSuggestions: [
        "Explain B-tree or B+ tree traversal.",
        "Discuss selectivity and query planner decisions.",
        "Explain why indexes can reduce disk-page reads.",
        "Mention the write and storage cost of maintaining indexes.",
      ],
    },
    {
      question: "What happens when you enter a URL in a browser?",
      type: "Web Development",
      original:
        "The browser sends a request to the server and the server sends the webpage back. The browser then displays the page.",
      improved:
        "When a URL is entered, the browser parses it and resolves the hostname through DNS. It establishes a TCP connection and, for HTTPS, performs a TLS handshake. The browser then sends an HTTP request, the server processes it and returns a response, and the browser parses the HTML, discovers additional resources, constructs the DOM and CSSOM, and performs layout and rendering.",
      depthScore: 55,
      beginnerScore: 84,
      intermediateScore: 55,
      advancedScore: 31,
      missingConcepts: [
        "URL parsing",
        "DNS resolution",
        "TCP connection",
        "TLS handshake",
        "HTTP request/response",
        "DOM and CSSOM",
        "Rendering pipeline",
      ],
      strengths: [
        "Understands client-server communication.",
        "Correctly describes the server response.",
        "Recognizes that the browser renders the received page.",
      ],
      depthAreas: [
        {
          title: "Core Concepts",
          score: 84,
          description: "The high-level browser-server flow is correct.",
        },
        {
          title: "Networking",
          score: 39,
          description: "DNS, TCP, and TLS steps are missing.",
        },
        {
          title: "Browser Internals",
          score: 32,
          description: "DOM construction and rendering are not discussed.",
        },
        {
          title: "Advanced Reasoning",
          score: 27,
          description: "Caching, connection reuse, and rendering details are absent.",
        },
      ],
      deeperSuggestions: [
        "Explain DNS resolution before the HTTP request.",
        "Mention TCP and TLS for HTTPS connections.",
        "Explain how the browser builds the DOM and CSSOM.",
        "Discuss resource loading and the rendering pipeline.",
      ],
    },
  ];

  const interviewLevels = [
    {
      name: "Beginner",
      description: "Definitions, fundamentals, and simple examples.",
      icon: BookOpen,
      target: 65,
    },
    {
      name: "Intermediate",
      description: "Internal workings, complexity, and practical trade-offs.",
      icon: Layers3,
      target: 78,
    },
    {
      name: "Advanced",
      description: "System-level reasoning, edge cases, scalability, and trade-offs.",
      icon: Zap,
      target: 88,
    },
  ];

  const selected = answers[selectedAnswer];

  const overallScore = useMemo(() => {
    return Math.round(
      answers.reduce((sum, answer) => sum + answer.depthScore, 0) /
        answers.length
    );
  }, []);

  const getLevelScore = () => {
    if (selectedLevel === "Beginner") {
      return selected.beginnerScore;
    }

    if (selectedLevel === "Advanced") {
      return selected.advancedScore;
    }

    return selected.intermediateScore;
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getDepthLabel = (score) => {
    if (score >= 85) return "Deep";
    if (score >= 70) return "Good";
    if (score >= 55) return "Developing";
    return "Superficial";
  };

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("analysis");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Brain size={34} className="text-violet-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Answer Technical Depth Analyzer
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Evaluate whether your technical answers demonstrate enough
              depth for the target interview level.
            </p>
          </div>
        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <MessageSquare className="mx-auto text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Answers Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              36
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <Layers3 className="mx-auto text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Average Depth
            </p>

            <p className="text-5xl font-black mt-3">
              {overallScore}%
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <AlertTriangle className="mx-auto text-orange-500" size={30} />

            <p className="text-gray-500 mt-4">
              Shallow Areas
            </p>

            <p className="text-5xl font-black mt-3">
              11
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <TrendingUp className="mx-auto text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Depth Improvement
            </p>

            <p className="text-5xl font-black mt-3">
              +19%
            </p>
          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">
            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Technical Depth Engine
            </h2>
          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            AI evaluates whether your answer goes beyond basic definitions
            and demonstrates the technical reasoning expected at your target
            interview level. It identifies shallow explanations and
            recommends concepts that can make your answer more complete.
          </p>

        </div>

        {/* Interview Level Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">
            <Gauge className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Target Interview Level
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {interviewLevels.map((level) => {
              const Icon = level.icon;
              const isSelected = selectedLevel === level.name;

              return (
                <button
                  key={level.name}
                  type="button"
                  onClick={() => setSelectedLevel(level.name)}
                  className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                    isSelected
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                      : "border-gray-200 dark:border-white/10"
                  }`}
                >

                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                      <Icon className="text-violet-600" size={25} />
                    </div>

                    {isSelected && (
                      <CheckCircle2
                        className="text-green-600"
                        size={24}
                      />
                    )}
                  </div>

                  <h3 className="text-xl font-bold mt-5">
                    {level.name}
                  </h3>

                  <p className="text-gray-500 mt-3 leading-6">
                    {level.description}
                  </p>

                  <div className="mt-5">
                    <p className="text-sm text-gray-500">
                      Recommended depth
                    </p>

                    <p className="text-2xl font-black text-violet-600 mt-1">
                      {level.target}%
                    </p>
                  </div>

                </button>
              );
            })}

          </div>

        </div>

        {/* Answer Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Technical Answer
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {answers.map((answer, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedAnswer(index)}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedAnswer === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                  {answer.type}
                </span>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {answer.question}
                </h3>

                <div className="flex items-center gap-2 mt-5">
                  <span
                    className={`font-bold ${getScoreColor(
                      answer.depthScore
                    )}`}
                  >
                    {answer.depthScore}%
                  </span>

                  <span className="text-sm text-gray-500">
                    technical depth
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

            <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
              Target: {selectedLevel}
            </span>

          </div>

        </div>

        {/* Analyze */}

        <div className="mt-8 flex justify-center">

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-violet-600 text-white font-bold text-lg hover:bg-violet-700 transition disabled:opacity-60"
          >

            {analyzing ? (
              <>
                <RefreshCw size={22} className="animate-spin" />
                Analyzing Technical Depth...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Analyze Technical Depth
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Depth Analysis"],
            ["original", "Original Answer"],
            ["improved", "Deeper Version"],
            ["concepts", "Missing Concepts"],
            ["categories", "Depth Categories"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setActiveTab(value)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === value
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>
          ))}

        </div>

        {/* Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">
                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Technical Depth Score
                </h2>
              </div>

              <div className="flex items-center justify-center py-6">

                <div className="w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getScoreColor(
                        getLevelScore()
                      )}`}
                    >
                      {getLevelScore()}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {getDepthLabel(getLevelScore())}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-violet-600"
                  style={{
                    width: `${getLevelScore()}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                This score compares the technical detail in your answer
                with what would typically be expected at the selected
                {` ${selectedLevel.toLowerCase()} `}
                interview level.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">
                <AlertTriangle className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Depth Gaps
                </h2>
              </div>

              <div className="text-center py-4">

                <p className="text-6xl font-black text-orange-500">
                  {selected.missingConcepts.length}
                </p>

                <p className="text-gray-500 mt-2">
                  concepts could make the answer deeper
                </p>

              </div>

              <div className="space-y-3 mt-5">

                {selected.missingConcepts.slice(0, 4).map(
                  (concept, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 p-4"
                    >

                      <AlertTriangle
                        size={18}
                        className="text-orange-500 shrink-0"
                      />

                      <span className="font-semibold">
                        {concept}
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>
        )}

        {/* Original */}

        {activeTab === "original" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Original Answer
              </h2>
            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.original}
              </p>

            </div>

            <div className="mt-7 grid sm:grid-cols-3 gap-5">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">
                <p className="text-sm text-gray-500">
                  Overall Depth
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.depthScore}%
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">
                <p className="text-sm text-gray-500">
                  Target Level
                </p>

                <p className="text-xl font-black text-violet-600 mt-3">
                  {selectedLevel}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="text-xl font-black text-orange-500 mt-3">
                  {getDepthLabel(getLevelScore())}
                </p>
              </div>

            </div>

          </div>
        )}

        {/* Improved */}

        {activeTab === "improved" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center justify-between gap-5 mb-6">

              <div className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Deeper Technical Version
                </h2>
              </div>

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-semibold">
                AI Improved
              </span>

            </div>

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.improved}
              </p>

            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-5">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">
                <p className="text-sm text-gray-500">
                  Original Depth
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.depthScore}%
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">
                <p className="text-sm text-gray-500">
                  Improved Depth
                </p>

                <p className="text-3xl font-black text-green-600 mt-2">
                  {Math.min(selected.depthScore + 28, 98)}%
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">
                <p className="text-sm text-gray-500">
                  Improvement
                </p>

                <p className="text-3xl font-black text-violet-600 mt-2">
                  +
                  {Math.min(
                    28,
                    98 - selected.depthScore
                  )}
                  %
                </p>
              </div>

            </div>

          </div>
        )}

        {/* Missing Concepts */}

        {activeTab === "concepts" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">
              <Lightbulb className="text-yellow-500" />

              <h2 className="text-2xl font-bold">
                Concepts That Can Add Depth
              </h2>
            </div>

            <div className="space-y-5">

              {selected.deeperSuggestions.map(
                (suggestion, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex items-start gap-4">

                      <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">

                        <span className="font-bold text-violet-600">
                          {index + 1}
                        </span>

                      </div>

                      <div>
                        <h3 className="font-bold text-lg">
                          {suggestion}
                        </h3>

                        <p className="text-gray-500 mt-2 leading-6">
                          Discussing this concept would provide more
                          technical depth and demonstrate stronger
                          understanding.
                        </p>
                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>
        )}

        {/* Categories */}

        {activeTab === "categories" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Technical Depth Categories
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {selected.depthAreas.map(
                (area, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <h3 className="text-xl font-bold">
                        {area.title}
                      </h3>

                      <span
                        className={`text-2xl font-black ${getScoreColor(
                          area.score
                        )}`}
                      >
                        {area.score}%
                      </span>

                    </div>

                    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                        style={{
                          width: `${area.score}%`,
                        }}
                      />

                    </div>

                    <p className="text-gray-500 mt-5 leading-6">
                      {area.description}
                    </p>

                  </div>
                )
              )}

            </div>

          </div>
        )}

        {/* Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">
            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Technical Strengths
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">

            {selected.strengths.map(
              (strength, index) => (
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
              )
            )}

          </div>

        </div>

        {/* Level Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">
            <Layers3 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Answer Depth by Interview Level
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6">

              <p className="text-sm text-blue-600">
                Beginner
              </p>

              <p className="text-4xl font-black text-blue-600 mt-2">
                {selected.beginnerScore}%
              </p>

              <p className="text-gray-500 mt-3 leading-6">
                Your answer covers most fundamental concepts expected
                from a beginner-level candidate.
              </p>

            </div>

            <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

              <p className="text-sm text-violet-600">
                Intermediate
              </p>

              <p className="text-4xl font-black text-violet-600 mt-2">
                {selected.intermediateScore}%
              </p>

              <p className="text-gray-500 mt-3 leading-6">
                Additional internal workings, complexity, and practical
                trade-offs would strengthen this answer.
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

              <p className="text-sm text-orange-600">
                Advanced
              </p>

              <p className="text-4xl font-black text-orange-600 mt-2">
                {selected.advancedScore}%
              </p>

              <p className="text-gray-500 mt-3 leading-6">
                Advanced answers require deeper system-level reasoning,
                edge cases, and engineering trade-offs.
              </p>

            </div>

          </div>

        </div>

        {/* Before vs After */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Technical Depth Improvement
            </h2>
          </div>

          <div className="space-y-8">

            <div>

              <div className="flex justify-between mb-3">
                <span className="font-semibold">
                  Original Answer
                </span>

                <span className="font-black text-orange-500">
                  {selected.depthScore}%
                </span>
              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                  style={{
                    width: `${selected.depthScore}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-3">
                <span className="font-semibold">
                  Improved Answer
                </span>

                <span className="font-black text-green-600">
                  {Math.min(selected.depthScore + 28, 98)}%
                </span>
              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  style={{
                    width: `${Math.min(
                      selected.depthScore + 28,
                      98
                    )}%`,
                  }}
                />

              </div>

            </div>

          </div>

          <div className="mt-8 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

            <div className="flex items-center gap-3">

              <TrendingUp
                size={22}
                className="text-green-600"
              />

              <p className="font-bold">
                Potential technical depth improvement: +
                {Math.min(
                  28,
                  98 - selected.depthScore
                )}
                %
              </p>

            </div>

          </div>

        </div>

        {/* AI Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Technical Depth Principles
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Explain How
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Go beyond definitions and explain how the technology or
                algorithm actually works internally.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                ⚙️
              </p>

              <h3 className="text-xl font-bold mt-4">
                Discuss Trade-Offs
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Explain when an approach works well and what limitations
                or costs it introduces.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🚀
              </p>

              <h3 className="text-xl font-bold mt-4">
                Match the Level
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Adjust your explanation based on the expected experience
                and technical depth of the interview.
              </p>

            </div>

          </div>

        </div>

        {/* Stronger Technical Answer Guide */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              How to Add More Technical Depth
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">

                  <th className="p-4">
                    Basic Answer
                  </th>

                  <th className="p-4">
                    Add This
                  </th>

                  <th className="p-4">
                    Deeper Explanation
                  </th>

                </tr>
              </thead>

              <tbody>

                {[
                  [
                    "Give the definition.",
                    "Explain how it works.",
                    "Describe the internal mechanism.",
                  ],
                  [
                    "State the complexity.",
                    "Explain why.",
                    "Connect complexity to implementation.",
                  ],
                  [
                    "Mention one approach.",
                    "Compare alternatives.",
                    "Explain trade-offs and use cases.",
                  ],
                  [
                    "Describe the normal case.",
                    "Discuss edge cases.",
                    "Explain failure scenarios and limitations.",
                  ],
                  [
                    "Explain the technology.",
                    "Give a practical example.",
                    "Connect it to real production scenarios.",
                  ],
                ].map((row, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-white/5"
                  >

                    <td className="p-4 font-semibold text-red-600">
                      {row[0]}
                    </td>

                    <td className="p-4 font-semibold text-violet-600">
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

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Technical Depth Progress
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 48,
              },
              {
                label: "Week 2",
                score: 57,
              },
              {
                label: "Week 3",
                score: 65,
              },
              {
                label: "Current",
                score: overallScore,
              },
            ].map((item) => (

              <div
                key={item.label}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center"
              >

                <p className="text-sm text-gray-500">
                  {item.label}
                </p>

                <p className="text-4xl font-black text-violet-600 mt-3">
                  {item.score}%
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                  <div
                    className="h-full bg-violet-600 rounded-full"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">
            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Personalized Recommendation
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Current Strength
              </p>

              <h3 className="text-xl font-bold mt-2">
                Core Understanding
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                You generally understand the main concepts. Your next
                improvement should focus on explaining internal mechanisms.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Technical Reasoning
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Add complexity analysis, implementation details, and
                practical trade-offs instead of stopping at definitions.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Explain the "Why"
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                For every technical statement, practice explaining why
                the behavior occurs and when the approach is appropriate.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Technical Depth Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your technical answers demonstrate a solid foundation.
                Continue adding internal workings, complexity analysis,
                edge cases, and trade-offs to reach stronger intermediate
                and advanced interview depth.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {overallScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Developing Depth
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
                A technically correct answer is only the starting point.
                To demonstrate deeper understanding, explain how the
                concept works internally, analyze complexity, discuss
                practical trade-offs, and mention relevant edge cases.
                The goal is not to make every answer unnecessarily long,
                but to provide the level of technical reasoning expected
                for your target interview.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🧠
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Technical Depth
              </h3>

              <p className="text-5xl font-black">
                {overallScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerTechnicalDepthAnalyzer;