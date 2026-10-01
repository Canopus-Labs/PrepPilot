import React, { useMemo, useState } from "react";
import {
  Brain,
  BookOpen,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Lightbulb,
  LockOpen,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  AlertTriangle,
  GraduationCap,
  RefreshCw,
  ChevronRight,
  PlayCircle,
  Bookmark,
  Layers,
  ShieldCheck,
  Code2,
} from "lucide-react";

const AIInterviewQuestionPrerequisiteRecommendation = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [completedPrerequisites, setCompletedPrerequisites] = useState(
    new Set(["arrays"])
  );
  const [skippedPrerequisites, setSkippedPrerequisites] = useState(
    new Set()
  );
  const [activeTab, setActiveTab] = useState("prerequisites");
  const [analyzing, setAnalyzing] = useState(false);

  const questions = [
    {
      question: "How would you optimize a slow database query?",
      category: "Database",
      difficulty: "Advanced",
      readiness: 72,
      estimatedTime: "8 min",
      description:
        "Analyze a slow query, identify bottlenecks, and recommend practical database optimization strategies.",
      prerequisites: [
        {
          id: "sql",
          title: "SQL Fundamentals",
          level: "Foundation",
          importance: "Required",
          time: "15 min",
          description:
            "Understand SELECT, WHERE, JOIN, GROUP BY, ORDER BY, and filtering operations.",
          reason:
            "Query optimization requires understanding how SQL operations are executed.",
          status: "completed",
        },
        {
          id: "indexes",
          title: "Database Indexes",
          level: "Core",
          importance: "Required",
          time: "20 min",
          description:
            "Understand indexes, index selection, and how indexes affect query performance.",
          reason:
            "Indexes are one of the most important tools for improving database query performance.",
          status: "recommended",
        },
        {
          id: "execution-plan",
          title: "Query Execution Plans",
          level: "Core",
          importance: "Recommended",
          time: "25 min",
          description:
            "Learn how databases execute queries and how to identify expensive operations.",
          reason:
            "Execution plans help identify where a query is spending most of its time.",
          status: "recommended",
        },
        {
          id: "joins",
          title: "SQL Joins",
          level: "Core",
          importance: "Recommended",
          time: "15 min",
          description:
            "Understand INNER JOIN, LEFT JOIN, RIGHT JOIN, and their performance implications.",
          reason:
            "Poorly designed joins can become major database performance bottlenecks.",
          status: "recommended",
        },
      ],
      recommendedQuestions: [
        "Write SQL queries using INNER JOIN and LEFT JOIN.",
        "Explain how database indexes improve query performance.",
        "Identify the bottleneck in a sample SQL execution plan.",
      ],
      resources: [
        "SQL Query Optimization Guide",
        "Database Indexing Fundamentals",
        "Reading Query Execution Plans",
      ],
      strengths: [
        "Basic SQL knowledge",
        "Understanding of relational data",
      ],
    },
    {
      question: "Design a scalable URL shortening service.",
      category: "System Design",
      difficulty: "Advanced",
      readiness: 58,
      estimatedTime: "15 min",
      description:
        "Design a distributed URL shortening service that handles high traffic, unique IDs, storage, and scalability.",
      prerequisites: [
        {
          id: "http",
          title: "HTTP Fundamentals",
          level: "Foundation",
          importance: "Required",
          time: "15 min",
          description:
            "Understand HTTP requests, responses, status codes, and common web communication patterns.",
          reason:
            "A URL shortening service is fundamentally a web-based request-response system.",
          status: "recommended",
        },
        {
          id: "rest",
          title: "REST API Design",
          level: "Core",
          importance: "Required",
          time: "20 min",
          description:
            "Understand endpoints, HTTP methods, request handling, and API design principles.",
          reason:
            "The service requires a clean API for creating and resolving shortened URLs.",
          status: "recommended",
        },
        {
          id: "databases",
          title: "Database Fundamentals",
          level: "Core",
          importance: "Required",
          time: "25 min",
          description:
            "Understand relational and NoSQL databases, keys, indexes, and basic data modeling.",
          reason:
            "The system needs to store and retrieve mappings between short IDs and original URLs.",
          status: "recommended",
        },
        {
          id: "caching",
          title: "Caching Concepts",
          level: "Advanced",
          importance: "Recommended",
          time: "20 min",
          description:
            "Understand cache-aside patterns, TTL, cache invalidation, and distributed caching.",
          reason:
            "Caching can significantly reduce database load for frequently accessed URLs.",
          status: "recommended",
        },
      ],
      recommendedQuestions: [
        "Design a REST API for a URL management system.",
        "Explain when you would use Redis as a cache.",
        "Compare SQL and NoSQL databases for a high-traffic service.",
      ],
      resources: [
        "System Design Fundamentals",
        "REST API Design Principles",
        "Distributed Caching Basics",
      ],
      strengths: [
        "Basic programming concepts",
        "Understanding of web applications",
      ],
    },
    {
      question: "Explain how a binary search tree can become unbalanced.",
      category: "Data Structures",
      difficulty: "Medium",
      readiness: 86,
      estimatedTime: "6 min",
      description:
        "Explain BST structure, insertion patterns, imbalance, and how balanced trees solve performance problems.",
      prerequisites: [
        {
          id: "trees",
          title: "Tree Data Structures",
          level: "Foundation",
          importance: "Required",
          time: "15 min",
          description:
            "Understand nodes, edges, root nodes, leaf nodes, and tree traversal.",
          reason:
            "A binary search tree is a specialized tree data structure.",
          status: "completed",
        },
        {
          id: "bst",
          title: "Binary Search Trees",
          level: "Core",
          importance: "Required",
          time: "20 min",
          description:
            "Understand BST ordering rules, insertion, deletion, and searching.",
          reason:
            "Understanding BST operations is required before analyzing imbalance.",
          status: "completed",
        },
        {
          id: "complexity",
          title: "Time Complexity",
          level: "Core",
          importance: "Recommended",
          time: "15 min",
          description:
            "Understand O(log n), O(n), and how data structure shape affects performance.",
          reason:
            "BST imbalance directly affects search and insertion complexity.",
          status: "completed",
        },
      ],
      recommendedQuestions: [
        "Implement search in a binary search tree.",
        "Compare a balanced BST with an unbalanced BST.",
        "Explain the difference between BST and AVL tree.",
      ],
      resources: [
        "Binary Search Tree Fundamentals",
        "Tree Traversal Guide",
        "AVL Tree Introduction",
      ],
      strengths: [
        "Strong tree fundamentals",
        "Good understanding of complexity",
        "Previous BST practice",
      ],
    },
    {
      question: "How does asynchronous programming work in JavaScript?",
      category: "JavaScript",
      difficulty: "Advanced",
      readiness: 64,
      estimatedTime: "10 min",
      description:
        "Explain the event loop, callbacks, promises, async/await, and asynchronous execution in JavaScript.",
      prerequisites: [
        {
          id: "js-basics",
          title: "JavaScript Fundamentals",
          level: "Foundation",
          importance: "Required",
          time: "20 min",
          description:
            "Understand variables, functions, scope, objects, and basic JavaScript execution.",
          reason:
            "Async JavaScript builds directly on normal function execution.",
          status: "completed",
        },
        {
          id: "callbacks",
          title: "Callbacks",
          level: "Core",
          importance: "Required",
          time: "15 min",
          description:
            "Understand how functions can be passed and executed later.",
          reason:
            "Callbacks are one of the foundations of asynchronous JavaScript.",
          status: "recommended",
        },
        {
          id: "promises",
          title: "JavaScript Promises",
          level: "Core",
          importance: "Required",
          time: "20 min",
          description:
            "Understand pending, fulfilled, rejected states and promise chaining.",
          reason:
            "Promises provide the foundation for modern async/await syntax.",
          status: "recommended",
        },
        {
          id: "event-loop",
          title: "Event Loop",
          level: "Advanced",
          importance: "Recommended",
          time: "25 min",
          description:
            "Understand the call stack, task queue, microtask queue, and event loop.",
          reason:
            "The event loop explains why asynchronous JavaScript behaves differently from synchronous code.",
          status: "recommended",
        },
      ],
      recommendedQuestions: [
        "Explain the difference between synchronous and asynchronous JavaScript.",
        "What is a JavaScript Promise?",
        "Explain the JavaScript event loop.",
      ],
      resources: [
        "JavaScript Async Programming Guide",
        "Promises and Async/Await",
        "Understanding the Event Loop",
      ],
      strengths: [
        "JavaScript fundamentals",
        "Function concepts",
      ],
    },
  ];

  const selected = questions[selectedQuestion];

  const completionPercentage = useMemo(() => {
    const total = selected.prerequisites.length;

    const completed = selected.prerequisites.filter(
      (item) =>
        completedPrerequisites.has(item.id) ||
        skippedPrerequisites.has(item.id)
    ).length;

    return Math.round((completed / total) * 100);
  }, [
    selected,
    completedPrerequisites,
    skippedPrerequisites,
  ]);

  const readinessStatus = useMemo(() => {
    if (selected.readiness >= 80) {
      return {
        label: "Ready",
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-900/20",
      };
    }

    if (selected.readiness >= 65) {
      return {
        label: "Almost Ready",
        color: "text-orange-500",
        bg: "bg-orange-100 dark:bg-orange-900/20",
      };
    }

    return {
      label: "Needs Preparation",
      color: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/20",
    };
  }, [selected.readiness]);

  const togglePrerequisite = (id) => {
    setCompletedPrerequisites((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });

    setSkippedPrerequisites((previous) => {
      const next = new Set(previous);
      next.delete(id);
      return next;
    });
  };

  const skipPrerequisite = (id) => {
    setSkippedPrerequisites((previous) => {
      const next = new Set(previous);
      next.add(id);
      return next;
    });

    setCompletedPrerequisites((previous) => {
      const next = new Set(previous);
      next.delete(id);
      return next;
    });
  };

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("prerequisites");
    }, 800);
  };

  const isPrerequisiteComplete = (id) =>
    completedPrerequisites.has(id) ||
    skippedPrerequisites.has(id);

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Brain
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Question Prerequisite Recommendation
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Discover the concepts you should understand before attempting
              advanced interview questions.
            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Questions Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              42
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Layers
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Prerequisites Found
            </p>

            <p className="text-5xl font-black mt-3">
              13
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ShieldCheck
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Current Readiness
            </p>

            <p className="text-5xl font-black mt-3">
              {selected.readiness}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Topics Completed
            </p>

            <p className="text-5xl font-black mt-3">
              {completionPercentage}%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Prerequisite Intelligence Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            AI analyzes the concepts required to solve an interview
            question and compares them with your preparation history.
            It identifies prerequisite knowledge, estimates your
            readiness, and recommends what to study before attempting
            the question.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <CircleHelp className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {questions.map((question, index) => (

              <button
                key={index}
                type="button"
                onClick={() => {
                  setSelectedQuestion(index);
                  setActiveTab("prerequisites");
                }}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-center justify-between gap-4">

                  <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm font-semibold">
                    {question.category}
                  </span>

                  <span className="text-sm text-orange-500 font-semibold">
                    {question.difficulty}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {question.question}
                </h3>

                <div className="flex items-center justify-between gap-4 mt-5">

                  <span className="text-sm text-gray-500">
                    Readiness: {question.readiness}%
                  </span>

                  <ChevronRight
                    size={20}
                    className="text-violet-600"
                  />

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row justify-between gap-8">

            <div>

              <p className="text-sm text-gray-500">
                Selected Interview Question
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold mt-3">
                {selected.question}
              </h2>

              <div className="flex flex-wrap items-center gap-3 mt-5">

                <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
                  {selected.category}
                </span>

                <span className="px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400">
                  {selected.difficulty}
                </span>

                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <Clock3 size={16} />
                  {selected.estimatedTime}
                </span>

              </div>

              <p className="text-gray-500 mt-6 leading-7 max-w-3xl">
                {selected.description}
              </p>

            </div>

            <div className="text-center shrink-0">

              <p className="text-sm text-gray-500">
                AI Readiness
              </p>

              <p
                className={`text-6xl font-black mt-3 ${readinessStatus.color}`}
              >
                {selected.readiness}%
              </p>

              <span
                className={`inline-block mt-3 px-4 py-2 rounded-full font-bold ${readinessStatus.bg} ${readinessStatus.color}`}
              >
                {readinessStatus.label}
              </span>

            </div>

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
                <RefreshCw
                  size={22}
                  className="animate-spin"
                />

                Analyzing Prerequisites...
              </>
            ) : (
              <>
                <Sparkles size={22} />

                Analyze Prerequisites
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["prerequisites", "Prerequisite Concepts"],
            ["readiness", "Readiness Analysis"],
            ["recommendations", "Recommendations"],
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

        {/* Prerequisites */}

        {activeTab === "prerequisites" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

              <div>

                <div className="flex items-center gap-3">

                  <Layers className="text-violet-600" />

                  <h2 className="text-2xl font-bold">
                    Required Prerequisite Concepts
                  </h2>

                </div>

                <p className="text-gray-500 mt-2">
                  Complete the recommended concepts before attempting the
                  advanced question, or skip concepts you already understand.
                </p>

              </div>

              <div className="text-right">

                <p className="text-sm text-gray-500">
                  Preparation Progress
                </p>

                <p className="text-3xl font-black text-violet-600 mt-1">
                  {completionPercentage}%
                </p>

              </div>

            </div>

            <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mb-8">

              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 transition-all"
                style={{
                  width: `${completionPercentage}%`,
                }}
              />

            </div>

            <div className="space-y-5">

              {selected.prerequisites.map((item, index) => {

                const completed =
                  completedPrerequisites.has(item.id);

                const skipped =
                  skippedPrerequisites.has(item.id);

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-6 transition ${
                      completed || skipped
                        ? "border-green-200 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10"
                        : "border-gray-200 dark:border-white/10"
                    }`}
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                      <div className="flex gap-4">

                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            completed || skipped
                              ? "bg-green-100 dark:bg-green-900/20"
                              : "bg-violet-100 dark:bg-violet-900/20"
                          }`}
                        >

                          {completed || skipped ? (
                            <CheckCircle2
                              className="text-green-600"
                              size={24}
                            />
                          ) : (
                            <span className="font-black text-violet-600">
                              {index + 1}
                            </span>
                          )}

                        </div>

                        <div>

                          <div className="flex flex-wrap items-center gap-3">

                            <h3 className="text-xl font-bold">
                              {item.title}
                            </h3>

                            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                              {item.level}
                            </span>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                item.importance === "Required"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                  : "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                              }`}
                            >
                              {item.importance}
                            </span>

                          </div>

                          <p className="text-gray-500 mt-3 leading-6">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">

                            <span className="flex items-center gap-2">
                              <Clock3 size={16} />
                              {item.time}
                            </span>

                            <span className="flex items-center gap-2">
                              <Lightbulb size={16} />
                              {item.reason}
                            </span>

                          </div>

                        </div>

                      </div>

                      <div className="flex flex-wrap gap-3 shrink-0">

                        <button
                          type="button"
                          onClick={() =>
                            togglePrerequisite(item.id)
                          }
                          className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold ${
                            completed
                              ? "bg-green-600 text-white"
                              : "bg-violet-600 text-white hover:bg-violet-700"
                          }`}
                        >

                          <CheckCircle2 size={18} />

                          {completed
                            ? "Completed"
                            : "Mark Complete"}

                        </button>

                        {!completed && !skipped && (
                          <button
                            type="button"
                            onClick={() =>
                              skipPrerequisite(item.id)
                            }
                            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 font-semibold text-gray-600 dark:text-gray-300"
                          >

                            <LockOpen size={18} />

                            Skip

                          </button>
                        )}

                        {skipped && (
                          <button
                            type="button"
                            onClick={() =>
                              togglePrerequisite(item.id)
                            }
                            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 font-semibold"
                          >

                            Undo Skip

                          </button>
                        )}

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        )}

        {/* Readiness */}

        {activeTab === "readiness" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Readiness Assessment
                </h2>

              </div>

              <div className="text-center py-5">

                <div className="relative w-52 h-52 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-6xl font-black ${readinessStatus.color}`}
                    >
                      {selected.readiness}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {readinessStatus.label}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-green-500"
                  style={{
                    width: `${selected.readiness}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-7">
                AI estimates your readiness by comparing the concepts
                required by this question with the topics you have already
                practiced.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <GraduationCap className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Knowledge Breakdown
                </h2>

              </div>

              <div className="space-y-5">

                {selected.prerequisites.map((item) => {

                  const complete =
                    isPrerequisiteComplete(item.id);

                  return (
                    <div key={item.id}>

                      <div className="flex justify-between gap-4 mb-2">

                        <span className="font-semibold">
                          {item.title}
                        </span>

                        <span
                          className={
                            complete
                              ? "text-green-600 font-bold"
                              : "text-orange-500 font-bold"
                          }
                        >
                          {complete
                            ? "Covered"
                            : "Needs Practice"}
                        </span>

                      </div>

                      <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                        <div
                          className={`h-full rounded-full ${
                            complete
                              ? "bg-green-500"
                              : "bg-orange-500"
                          }`}
                          style={{
                            width: complete ? "100%" : "45%",
                          }}
                        />

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Lightbulb className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  Recommended Practice Questions
                </h2>

              </div>

              <div className="space-y-4">

                {selected.recommendedQuestions.map(
                  (question, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                    >

                      <div className="flex gap-4">

                        <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">

                          <span className="font-bold text-violet-600">
                            {index + 1}
                          </span>

                        </div>

                        <p className="font-semibold leading-6">
                          {question}
                        </p>

                      </div>

                      <ArrowRight
                        size={20}
                        className="text-violet-600 shrink-0"
                      />

                    </div>
                  )
                )}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BookOpen className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Recommended Resources
                </h2>

              </div>

              <div className="space-y-4">

                {selected.resources.map((resource) => (

                  <div
                    key={resource}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 p-5"
                  >

                    <div className="flex items-center gap-4">

                      <BookOpen
                        className="text-blue-600"
                        size={22}
                      />

                      <span className="font-semibold">
                        {resource}
                      </span>

                    </div>

                    <ChevronRight
                      className="text-blue-600"
                      size={20}
                    />

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Learning Path */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Recommended Learning Path
            </h2>

          </div>

          <div className="relative">

            <div className="hidden md:block absolute left-8 right-8 top-8 h-1 bg-gray-200 dark:bg-gray-700" />

            <div className="grid md:grid-cols-4 gap-6 relative">

              {selected.prerequisites.slice(0, 4).map(
                (item, index) => {

                  const complete =
                    isPrerequisiteComplete(item.id);

                  return (
                    <div
                      key={item.id}
                      className="text-center"
                    >

                      <div
                        className={`relative mx-auto w-16 h-16 rounded-full flex items-center justify-center border-4 border-white dark:border-[#111827] ${
                          complete
                            ? "bg-green-600 text-white"
                            : "bg-violet-600 text-white"
                        }`}
                      >

                        {complete ? (
                          <CheckCircle2 size={27} />
                        ) : (
                          <span className="font-black">
                            {index + 1}
                          </span>
                        )}

                      </div>

                      <h3 className="font-bold mt-5">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">
                        {complete
                          ? "Completed"
                          : "Recommended next"}
                      </p>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </div>

        {/* Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <ShieldCheck className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Concepts You Already Understand
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {selected.strengths.map((strength) => (

              <div
                key={strength}
                className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6"
              >

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    className="text-green-600"
                    size={24}
                  />

                  <p className="font-semibold">
                    {strength}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Skip Guidance */}

        <div className="mt-10 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <LockOpen size={30} />

            <h2 className="text-3xl font-bold">
              Already Know a Prerequisite?
            </h2>

          </div>

          <p className="text-white/90 leading-8 max-w-4xl">
            You do not need to repeat concepts you already understand.
            Use the Skip option for familiar prerequisites and continue
            directly toward the advanced interview question.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-7">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                ⚡
              </p>

              <h3 className="font-bold text-xl mt-4">
                Save Time
              </h3>

              <p className="text-white/80 mt-3">
                Avoid repeating topics you have already mastered.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="font-bold text-xl mt-4">
                Stay Focused
              </h3>

              <p className="text-white/80 mt-3">
                Spend preparation time on concepts that actually need work.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🚀
              </p>

              <h3 className="font-bold text-xl mt-4">
                Progress Faster
              </h3>

              <p className="text-white/80 mt-3">
                Move toward advanced questions at your own pace.
              </p>

            </div>

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
                Current Readiness
              </p>

              <h3
                className={`text-2xl font-black mt-2 ${readinessStatus.color}`}
              >
                {selected.readiness}%
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                {selected.readiness >= 80
                  ? "You have strong prerequisite coverage and can attempt this question."
                  : selected.readiness >= 65
                  ? "You are close to being ready. Review the remaining recommended concepts."
                  : "Build the recommended foundations before attempting this advanced question."}
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Complete Missing Concepts
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Focus on prerequisites marked as Required before moving
                to the advanced question.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Step
              </p>

              <h3 className="text-xl font-bold mt-2">
                Practice Related Questions
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Use the recommended questions to strengthen the concepts
                identified by the AI.
              </p>

            </div>

          </div>

        </div>

        {/* Final Readiness */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Ready to Attempt This Question?
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                AI currently estimates your readiness at{" "}
                <strong>
                  {selected.readiness}%
                </strong>
                . Complete or skip the prerequisite concepts according
                to your actual knowledge before starting the interview
                question.
              </p>

            </div>

            <button
              type="button"
              className={`inline-flex items-center gap-3 px-7 py-4 rounded-2xl font-bold text-lg ${
                selected.readiness >= 75
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >

              <PlayCircle size={23} />

              Attempt Question

              <ArrowRight size={20} />

            </button>

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
                Advanced interview questions become easier when you build
                the right foundations first. This analyzer identifies the
                concepts behind each question, checks your preparation,
                and gives you the option to study, practice, or skip
                concepts you already understand. The goal is not to block
                you from difficult questions, but to provide the right
                learning path before you attempt them.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Readiness
              </h3>

              <p className="text-5xl font-black">
                {selected.readiness}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionPrerequisiteRecommendation;