import React, { useMemo, useState } from "react";
import {
  Brain,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Target,
  BarChart3,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Award,
  Code2,
  BookOpen,
  CircleAlert,
  SearchCheck,
  XCircle,
  Info,
} from "lucide-react";

const AIInterviewAnswerTechnicalAccuracyChecker = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);

  const answers = [
    {
      question: "What is the difference between an array and a linked list?",
      type: "Data Structures",
      difficulty: "Medium",
      original:
        "An array stores elements in different locations in memory, while a linked list stores all elements continuously. Arrays are usually slower for accessing elements because they need to search through the structure.",
      corrected:
        "An array typically stores elements in contiguous memory, which allows O(1) indexed access. A linked list stores elements in separate nodes connected through pointers, so accessing an element by position generally takes O(n) time.",
      accuracyScore: 54,
      correctedScore: 96,
      incorrectCount: 3,
      statements: [
        {
          statement:
            "An array stores elements in different locations in memory.",
          status: "incorrect",
          correction:
            "Arrays typically store elements in contiguous memory locations.",
          explanation:
            "Contiguous storage is a key property that enables efficient indexed access in arrays.",
        },
        {
          statement:
            "A linked list stores all elements continuously.",
          status: "incorrect",
          correction:
            "Linked-list nodes can be located in different memory locations.",
          explanation:
            "Nodes are connected using references or pointers and do not need to occupy adjacent memory.",
        },
        {
          statement:
            "Arrays are slower for accessing elements because they need to search through the structure.",
          status: "misleading",
          correction:
            "Arrays generally provide O(1) indexed access.",
          explanation:
            "An array can directly calculate the location of an indexed element instead of searching sequentially.",
        },
      ],
      strengths: [
        "Recognizes arrays and linked lists as different data structures.",
        "Understands that linked lists use connected nodes.",
        "Identifies access performance as an important comparison.",
      ],
      concepts: [
        "Contiguous memory",
        "Pointers and references",
        "Random access",
        "Time complexity",
      ],
    },
    {
      question: "What is the purpose of an API?",
      type: "Web Development",
      difficulty: "Easy",
      original:
        "An API is a database that stores information for different applications. It allows applications to directly access another application's database and modify its internal code.",
      corrected:
        "An API is a defined interface that allows software components or applications to communicate and access functionality or data through specified operations.",
      accuracyScore: 48,
      correctedScore: 94,
      incorrectCount: 3,
      statements: [
        {
          statement:
            "An API is a database that stores information for different applications.",
          status: "incorrect",
          correction:
            "An API is an interface, not a database.",
          explanation:
            "An API defines how software components interact; it does not inherently store application data.",
        },
        {
          statement:
            "An API allows applications to directly access another application's database.",
          status: "misleading",
          correction:
            "An API can expose controlled access to functionality or data.",
          explanation:
            "Applications generally interact through API endpoints rather than directly accessing another application's database.",
        },
        {
          statement:
            "An API can modify another application's internal code.",
          status: "incorrect",
          correction:
            "APIs expose specific functionality without exposing internal implementation.",
          explanation:
            "A well-designed API provides an abstraction boundary between consumers and the underlying implementation.",
        },
      ],
      strengths: [
        "Understands that APIs enable communication.",
        "Recognizes APIs as a mechanism for interacting with software.",
        "Understands that applications can expose functionality.",
      ],
      concepts: [
        "API interface",
        "Endpoints",
        "Abstraction",
        "Client-server communication",
      ],
    },
    {
      question: "What is the time complexity of binary search?",
      type: "Algorithms",
      difficulty: "Medium",
      original:
        "Binary search has O(n) time complexity because it may need to check every element in the array. It works by checking elements one by one until the target is found.",
      corrected:
        "Binary search has O(log n) time complexity because it repeatedly divides the sorted search space approximately in half. Each comparison eliminates about half of the remaining possibilities.",
      accuracyScore: 42,
      correctedScore: 98,
      incorrectCount: 3,
      statements: [
        {
          statement: "Binary search has O(n) time complexity.",
          status: "incorrect",
          correction: "Binary search has O(log n) time complexity.",
          explanation:
            "Each comparison approximately halves the remaining search space.",
        },
        {
          statement:
            "Binary search may need to check every element in the array.",
          status: "incorrect",
          correction:
            "Binary search eliminates approximately half of the search space after each comparison.",
          explanation:
            "The algorithm avoids sequentially checking every element.",
        },
        {
          statement:
            "Binary search checks elements one by one until the target is found.",
          status: "incorrect",
          correction:
            "Binary search compares the target with the middle element and narrows the search range.",
          explanation:
            "Sequential checking describes linear search, not binary search.",
        },
      ],
      strengths: [
        "Understands that binary search is a searching algorithm.",
        "Recognizes that comparisons are used to locate a target.",
        "Understands that the algorithm reduces the search space.",
      ],
      concepts: [
        "Binary search",
        "Divide and conquer",
        "Sorted arrays",
        "Logarithmic complexity",
      ],
    },
    {
      question: "What happens when a JavaScript Promise is rejected?",
      type: "JavaScript",
      difficulty: "Medium",
      original:
        "When a Promise is rejected, JavaScript automatically stops the entire program and throws an error that cannot be handled. The Promise will also immediately restart the operation.",
      corrected:
        "When a Promise is rejected, it transitions to the rejected state. The rejection can be handled with a rejection handler such as .catch() or the try/catch pattern when using async/await.",
      accuracyScore: 38,
      correctedScore: 97,
      incorrectCount: 3,
      statements: [
        {
          statement:
            "A rejected Promise automatically stops the entire JavaScript program.",
          status: "incorrect",
          correction:
            "A rejected Promise does not inherently stop the entire program.",
          explanation:
            "The rejection represents an asynchronous failure that can be handled by application code.",
        },
        {
          statement:
            "A Promise rejection cannot be handled.",
          status: "incorrect",
          correction:
            "Promise rejections can be handled with .catch() or try/catch with async/await.",
          explanation:
            "JavaScript provides standard mechanisms for handling asynchronous failures.",
        },
        {
          statement:
            "A rejected Promise immediately restarts the operation.",
          status: "incorrect",
          correction:
            "A rejected Promise does not automatically restart its operation.",
          explanation:
            "Retry behavior must be explicitly implemented by the application.",
        },
      ],
      strengths: [
        "Understands that Promises represent asynchronous operations.",
        "Recognizes that errors can occur during asynchronous execution.",
        "Identifies Promise rejection as an important state.",
      ],
      concepts: [
        "Promises",
        "Rejected state",
        ".catch()",
        "async/await",
      ],
    },
  ];

  const selected = answers[selectedAnswer];

  const overallScore = useMemo(() => {
    return Math.round(
      answers.reduce(
        (sum, answer) => sum + answer.accuracyScore,
        0
      ) / answers.length
    );
  }, []);

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return "Highly Accurate";
    if (score >= 70) return "Mostly Accurate";
    if (score >= 50) return "Needs Review";
    return "Low Accuracy";
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

          <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <SearchCheck
              size={34}
              className="text-blue-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Answer Technical Accuracy Checker
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Detect technically incorrect or misleading statements and
              understand how to correct them.
            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <MessageSquare
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Answers Checked
            </p>

            <p className="text-5xl font-black mt-3">
              38
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-red-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Accuracy Issues
            </p>

            <p className="text-5xl font-black mt-3">
              27
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ShieldCheck
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Technical Accuracy
            </p>

            <p className="text-5xl font-black mt-3">
              {overallScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Corrections Learned
            </p>

            <p className="text-5xl font-black mt-3">
              31
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Technical Accuracy Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            AI analyzes interview answers statement by statement. It
            identifies incorrect technical claims, detects misleading
            explanations, provides the correct concept, and explains
            why each statement needs correction.
          </p>

        </div>

        {/* Answer Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Answer
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {answers.map((answer, index) => (

              <button
                key={index}
                type="button"
                onClick={() => {
                  setSelectedAnswer(index);
                  setActiveTab("analysis");
                }}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedAnswer === index
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-center justify-between gap-4">

                  <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-semibold">
                    {answer.type}
                  </span>

                  <span className="text-sm text-gray-500">
                    {answer.difficulty}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {answer.question}
                </h3>

                <div className="flex items-center gap-2 mt-5">

                  <span
                    className={`font-bold ${getScoreColor(
                      answer.accuracyScore
                    )}`}
                  >
                    {answer.accuracyScore}%
                  </span>

                  <span className="text-sm text-gray-500">
                    technical accuracy
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

            <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
              {selected.type}
            </span>

            <span className="px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400">
              {selected.difficulty}
            </span>

          </div>

        </div>

        {/* Analyze Button */}

        <div className="mt-8 flex justify-center">

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition disabled:opacity-60"
          >

            {analyzing ? (
              <>
                <RefreshCw
                  size={22}
                  className="animate-spin"
                />

                Checking Technical Accuracy...
              </>
            ) : (
              <>
                <Sparkles size={22} />

                Check Technical Accuracy
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Accuracy Analysis"],
            ["original", "Original Answer"],
            ["corrections", "Technical Corrections"],
            ["concepts", "Concept Review"],
          ].map(([value, label]) => (

            <button
              key={value}
              type="button"
              onClick={() => setActiveTab(value)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === value
                  ? "bg-blue-600 text-white"
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

                <BarChart3 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Technical Accuracy Score
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="relative w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getScoreColor(
                        selected.accuracyScore
                      )}`}
                    >
                      {selected.accuracyScore}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {getScoreLabel(selected.accuracyScore)}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-green-500"
                  style={{
                    width: `${selected.accuracyScore}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                The technical accuracy score estimates how correctly
                your answer represents the underlying technical concepts.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <CircleAlert className="text-red-500" />

                <h2 className="text-2xl font-bold">
                  Detected Issues
                </h2>

              </div>

              <div className="text-center py-5">

                <p className="text-6xl font-black text-red-500">
                  {selected.incorrectCount}
                </p>

                <p className="text-gray-500 mt-2">
                  statements require technical review
                </p>

              </div>

              <div className="space-y-3 mt-5">

                {selected.statements.map((item, index) => (

                  <div
                    key={index}
                    className={`rounded-xl p-4 ${
                      item.status === "incorrect"
                        ? "bg-red-50 dark:bg-red-900/10"
                        : "bg-orange-50 dark:bg-orange-900/10"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      {item.status === "incorrect" ? (
                        <XCircle
                          className="text-red-600 shrink-0"
                          size={20}
                        />
                      ) : (
                        <AlertTriangle
                          className="text-orange-500 shrink-0"
                          size={20}
                        />
                      )}

                      <span
                        className={`font-bold ${
                          item.status === "incorrect"
                            ? "text-red-700 dark:text-red-400"
                            : "text-orange-700 dark:text-orange-400"
                        }`}
                      >
                        {item.status === "incorrect"
                          ? "Incorrect"
                          : "Potentially Misleading"}
                      </span>

                    </div>

                    <p className="text-sm mt-3 leading-6">
                      {item.statement}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Original Answer */}

        {activeTab === "original" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-6">

              <MessageSquare className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Original Answer
              </h2>

            </div>

            <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.original}
              </p>

            </div>

            <div className="mt-7 grid sm:grid-cols-3 gap-5">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Accuracy
                </p>

                <p
                  className={`text-3xl font-black mt-2 ${getScoreColor(
                    selected.accuracyScore
                  )}`}
                >
                  {selected.accuracyScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Technical Issues
                </p>

                <p className="text-3xl font-black text-red-500 mt-2">
                  {selected.incorrectCount}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="text-xl font-black text-orange-500 mt-3">
                  Needs Review
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Technical Corrections */}

        {activeTab === "corrections" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Lightbulb className="text-yellow-500" />

              <h2 className="text-2xl font-bold">
                Technical Corrections
              </h2>

            </div>

            <div className="space-y-6">

              {selected.statements.map((item, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex items-center gap-3">

                    {item.status === "incorrect" ? (
                      <XCircle
                        className="text-red-600"
                        size={25}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-500"
                        size={25}
                      />
                    )}

                    <h3 className="text-xl font-bold">
                      Statement {index + 1}
                    </h3>

                    <span
                      className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === "incorrect"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          : "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                      }`}
                    >
                      {item.status === "incorrect"
                        ? "Incorrect"
                        : "Misleading"}
                    </span>

                  </div>

                  <div className="mt-6 grid lg:grid-cols-2 gap-5">

                    <div className="rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-5">

                      <p className="text-sm font-bold text-red-600 mb-2">
                        Your Statement
                      </p>

                      <p className="leading-7">
                        {item.statement}
                      </p>

                    </div>

                    <div className="rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-5">

                      <p className="text-sm font-bold text-green-600 mb-2">
                        Correct Concept
                      </p>

                      <p className="leading-7">
                        {item.correction}
                      </p>

                    </div>

                  </div>

                  <div className="mt-5 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-5">

                    <div className="flex items-start gap-3">

                      <Info
                        className="text-blue-600 shrink-0 mt-1"
                        size={20}
                      />

                      <div>

                        <p className="font-bold text-blue-700 dark:text-blue-400">
                          Why this matters
                        </p>

                        <p className="mt-2 leading-7">
                          {item.explanation}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* Concepts */}

        {activeTab === "concepts" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Code2 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Concepts Covered
                </h2>

              </div>

              <div className="grid sm:grid-cols-2 gap-4">

                {selected.concepts.map((concept) => (

                  <div
                    key={concept}
                    className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-5"
                  >

                    <div className="flex items-center gap-3">

                      <CheckCircle2
                        className="text-blue-600"
                        size={22}
                      />

                      <span className="font-semibold">
                        {concept}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BookOpen className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Accuracy Categories
                </h2>

              </div>

              {[
                {
                  label: "Core Concept Accuracy",
                  score: selected.accuracyScore + 4,
                },
                {
                  label: "Terminology Accuracy",
                  score: selected.accuracyScore + 8,
                },
                {
                  label: "Example Accuracy",
                  score: selected.accuracyScore - 2,
                },
                {
                  label: "Technical Reasoning",
                  score: selected.accuracyScore + 5,
                },
              ].map((item) => (

                <div key={item.label} className="mb-6">

                  <div className="flex justify-between mb-2">

                    <span className="font-semibold">
                      {item.label}
                    </span>

                    <span className="font-bold text-blue-600">
                      {Math.min(item.score, 100)}%
                    </span>

                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-violet-600"
                      style={{
                        width: `${Math.min(
                          Math.max(item.score, 0),
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* Corrected Answer */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center justify-between gap-5 mb-7">

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-green-600" />

              <h2 className="text-2xl font-bold">
                Technically Corrected Answer
              </h2>

            </div>

            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-semibold">
              AI Corrected
            </span>

          </div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-7">

            <p className="text-lg leading-8">
              {selected.corrected}
            </p>

          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-5">

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

              <p className="text-sm text-gray-500">
                Original Accuracy
              </p>

              <p className="text-3xl font-black text-red-500 mt-2">
                {selected.accuracyScore}%
              </p>

            </div>

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

              <p className="text-sm text-gray-500">
                Corrected Accuracy
              </p>

              <p className="text-3xl font-black text-green-600 mt-2">
                {selected.correctedScore}%
              </p>

            </div>

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

              <p className="text-sm text-gray-500">
                Improvement
              </p>

              <p className="text-3xl font-black text-violet-600 mt-2">
                +{selected.correctedScore - selected.accuracyScore}%
              </p>

            </div>

          </div>

        </div>

        {/* Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">
              What You Got Right
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

        {/* Accuracy Principles */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              Technical Accuracy Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🔍
              </p>

              <h3 className="text-xl font-bold mt-4">
                Verify Concepts
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Make sure your explanation matches how the underlying
                technology actually works.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Use Precise Terms
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Avoid technically ambiguous descriptions when explaining
                important concepts.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                💡
              </p>

              <h3 className="text-xl font-bold mt-4">
                Explain Why
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Support technical claims with correct reasoning instead
                of relying only on memorized definitions.
              </p>

            </div>

          </div>

        </div>

        {/* Common Technical Mistakes */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Common Technical Accuracy Mistakes
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-200 dark:border-white/10">

                  <th className="p-4">
                    Mistake
                  </th>

                  <th className="p-4">
                    Better Understanding
                  </th>

                  <th className="p-4">
                    Why It Matters
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  [
                    "Confusing O(n) with O(log n)",
                    "Understand how the search space changes.",
                    "Complexity determines algorithm scalability.",
                  ],
                  [
                    "Treating an API as a database",
                    "An API is an interface for communication.",
                    "Correct terminology demonstrates technical understanding.",
                  ],
                  [
                    "Assuming linked-list nodes are contiguous",
                    "Nodes can exist at separate memory locations.",
                    "Memory layout affects access behavior.",
                  ],
                  [
                    "Assuming rejected Promises restart automatically",
                    "Retry logic must be implemented explicitly.",
                    "Incorrect assumptions can lead to faulty applications.",
                  ],
                  [
                    "Using vague technical explanations",
                    "Use precise concepts and examples.",
                    "Precision makes interview answers more trustworthy.",
                  ],
                ].map((row, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-white/5"
                  >

                    <td className="p-4 font-semibold text-red-600">
                      {row[0]}
                    </td>

                    <td className="p-4 font-semibold text-green-600">
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

        {/* Progress Tracking */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Technical Accuracy Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 58,
              },
              {
                label: "Week 2",
                score: 67,
              },
              {
                label: "Week 3",
                score: 76,
              },
              {
                label: "Current",
                score: 84,
              },
            ].map((item) => (

              <div
                key={item.label}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center"
              >

                <p className="text-sm text-gray-500">
                  {item.label}
                </p>

                <p className="text-4xl font-black text-blue-600 mt-3">
                  {item.score}%
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                  <div
                    className="h-full bg-blue-600 rounded-full"
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

            <Brain className="text-blue-600" />

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
                Concept Awareness
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                You identify the general topic correctly. Focus on
                technical details and precise definitions.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Correct Technical Claims
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Review the statements marked incorrect or misleading and
                understand the reasoning behind each correction.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Explain With Precision
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Practice explaining technical concepts using correct
                terminology, complexity, examples, and reasoning.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Technical Accuracy
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your technical accuracy improves when you verify the
                details behind your answers instead of relying only on
                general understanding.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-blue-600">
                {overallScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Needs Review
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-blue-500 to-violet-600"
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
                A convincing answer is not necessarily a technically
                correct answer. Focus on understanding why a concept
                works, use precise technical terminology, and verify
                important claims before presenting them. Correcting
                misconceptions early helps build stronger technical
                knowledge and more reliable interview answers.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Accuracy
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

export default AIInterviewAnswerTechnicalAccuracyChecker;