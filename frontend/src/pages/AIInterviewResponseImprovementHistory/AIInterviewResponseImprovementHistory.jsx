import React, { useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  TrendingUp,
  MessageSquare,
  History,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  ArrowRight,
  Clock3,
  Target,
  Lightbulb,
  RefreshCw,
  Award,
  FileText,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

const AIInterviewResponseImprovementHistory = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [comparing, setComparing] = useState(false);

  const questions = [
    {
      question: "How would you optimize a slow database query?",
      category: "Technical",
      attempts: 4,
      previousScore: 61,
      currentScore: 92,
      improvement: 31,
      missingConcepts: [
        "Query execution plan",
        "Index optimization",
        "Join optimization",
      ],
      improvements: [
        "Removed unnecessary hesitation",
        "Added a clear optimization process",
        "Explained indexing more precisely",
        "Included query-plan analysis",
      ],
      aiSummary:
        "The latest response is significantly more direct and technically structured. The candidate now explains the optimization process in a logical sequence instead of listing uncertain possibilities.",
      versions: [
        {
          attempt: 1,
          date: "Week 1",
          score: 61,
          answer:
            "I think I would probably check the query and maybe see if there are missing indexes. I'm not completely sure, but I guess I would also look at the joins.",
          feedback:
            "The answer identifies some relevant areas but uses uncertain language and does not provide a clear troubleshooting sequence.",
        },
        {
          attempt: 2,
          date: "Week 2",
          score: 72,
          answer:
            "I would start by checking the query and looking for missing indexes. I would also review the joins to see whether unnecessary operations are causing the problem.",
          feedback:
            "The answer is more direct, but it would benefit from mentioning the query execution plan and explaining how bottlenecks would be identified.",
        },
        {
          attempt: 3,
          date: "Week 3",
          score: 84,
          answer:
            "I would start by checking the query execution plan to identify where the bottleneck occurs. Then I would check indexes and review the joins for unnecessary operations.",
          feedback:
            "The response now provides a clear process. Adding more detail about index selection and query optimization would make it stronger.",
        },
        {
          attempt: 4,
          date: "Current",
          score: 92,
          answer:
            "I would start by checking the query execution plan to identify the bottleneck. Then I would verify whether the required columns are properly indexed and review the joins for unnecessary operations. Finally, I would benchmark the optimized query to confirm the improvement.",
          feedback:
            "Strong response. It provides a structured optimization process, uses precise technical language, and includes validation through benchmarking.",
        },
      ],
    },
    {
      question: "Explain the difference between an array and a linked list.",
      category: "Data Structures",
      attempts: 3,
      previousScore: 64,
      currentScore: 95,
      improvement: 31,
      missingConcepts: [
        "Contiguous memory",
        "Pointer-based structure",
        "Access complexity",
      ],
      improvements: [
        "Added precise memory-layout explanation",
        "Included time complexity",
        "Removed unnecessary uncertainty",
        "Clearly compared both structures",
      ],
      aiSummary:
        "The response progressed from a general explanation to a technically precise comparison that includes memory layout, node structure, and access complexity.",
      versions: [
        {
          attempt: 1,
          date: "Week 1",
          score: 64,
          answer:
            "I think an array is probably stored continuously in memory while a linked list is stored in different places. Arrays are generally faster for accessing elements.",
          feedback:
            "The core idea is correct, but the explanation is uncertain and does not clearly describe the linked-list structure.",
        },
        {
          attempt: 2,
          date: "Week 2",
          score: 81,
          answer:
            "An array stores elements continuously in memory, while a linked list stores elements in separate nodes connected together. Arrays are faster for direct access.",
          feedback:
            "The answer is clearer, but adding exact complexity and explaining pointers would improve technical depth.",
        },
        {
          attempt: 3,
          date: "Current",
          score: 95,
          answer:
            "An array stores elements in contiguous memory, which allows O(1) indexed access. A linked list stores elements in separate nodes connected by pointers, so accessing an element generally takes O(n) time.",
          feedback:
            "Excellent improvement. The answer is concise, technically accurate, and includes the key performance difference.",
        },
      ],
    },
    {
      question: "What is the purpose of an API?",
      category: "General Technical",
      attempts: 3,
      previousScore: 55,
      currentScore: 94,
      improvement: 39,
      missingConcepts: [
        "Defined interface",
        "Software communication",
        "Data and functionality access",
      ],
      improvements: [
        "Removed unnecessary filler",
        "Started with the definition directly",
        "Clarified software communication",
        "Explained functionality access",
      ],
      aiSummary:
        "The candidate transformed a hesitant definition into a concise technical explanation that directly communicates the purpose of an API.",
      versions: [
        {
          attempt: 1,
          date: "Week 1",
          score: 55,
          answer:
            "I think an API is basically something that maybe allows different applications to communicate. I'm not sure if that's the exact definition.",
          feedback:
            "The general idea is correct, but the answer contains unnecessary uncertainty and does not clearly define an API.",
        },
        {
          attempt: 2,
          date: "Week 2",
          score: 78,
          answer:
            "An API allows different applications or software components to communicate with each other and access functionality.",
          feedback:
            "Good improvement. The definition is clear but could be more precise by describing an API as a defined interface.",
        },
        {
          attempt: 3,
          date: "Current",
          score: 94,
          answer:
            "An API provides a defined interface that allows different software components or applications to communicate and access functionality or data.",
          feedback:
            "Excellent answer. It is concise, technically accurate, and clearly explains both communication and access.",
        },
      ],
    },
  ];

  const selected = questions[selectedQuestion];

  const averageImprovement = useMemo(() => {
    return Math.round(
      questions.reduce(
        (sum, question) => sum + question.improvement,
        0
      ) / questions.length
    );
  }, []);

  const averageCurrentScore = useMemo(() => {
    return Math.round(
      questions.reduce(
        (sum, question) => sum + question.currentScore,
        0
      ) / questions.length
    );
  }, []);

  const totalAttempts = useMemo(() => {
    return questions.reduce(
      (sum, question) => sum + question.attempts,
      0
    );
  }, []);

  const handleCompare = () => {
    setComparing(true);

    setTimeout(() => {
      setComparing(false);
      setActiveTab("comparison");
    }, 800);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getScoreBg = (score) => {
    if (score >= 85) {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (score >= 70) {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <History
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Response Improvement History
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Track how your interview answers improve across repeated
              attempts and understand which changes make your responses
              stronger.
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
              Questions Practiced
            </p>

            <p className="text-5xl font-black mt-3">
              {questions.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <History
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Total Attempts
            </p>

            <p className="text-5xl font-black mt-3">
              {totalAttempts}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Avg Improvement
            </p>

            <p className="text-5xl font-black mt-3">
              +{averageImprovement}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Award
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Current Avg Score
            </p>

            <p className="text-5xl font-black mt-3">
              {averageCurrentScore}%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-5">

                <Brain size={32} />

                <h2 className="text-2xl sm:text-3xl font-bold">
                  AI Response Improvement Engine
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-4xl">
                AI compares your previous and latest answers to identify
                meaningful improvements, remaining gaps, missing concepts,
                and changes in answer quality. Repeated practice becomes a
                measurable progression instead of isolated feedback.
              </p>

            </div>

            <button
              type="button"
              onClick={handleCompare}
              disabled={comparing}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition shrink-0 disabled:opacity-60"
            >

              {comparing ? (
                <>
                  <RefreshCw
                    size={20}
                    className="animate-spin"
                  />
                  Comparing...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Compare Responses
                </>
              )}

            </button>

          </div>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Question History
            </h2>

          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {questions.map((question, index) => (

              <button
                key={index}
                type="button"
                onClick={() => {
                  setSelectedQuestion(index);
                  setActiveTab("overview");
                }}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                  {question.category}
                </span>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {question.question}
                </h3>

                <div className="flex items-center justify-between mt-6">

                  <span className="text-sm text-gray-500">
                    {question.attempts} attempts
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreBg(
                      question.currentScore
                    )}`}
                  >
                    {question.currentScore}%
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-wrap items-center gap-3">

            <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold">
              {selected.category}
            </span>

            <span className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-semibold">
              {selected.attempts} Attempts
            </span>

          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mt-5">
            {selected.question}
          </h2>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["overview", "Progress Overview"],
            ["timeline", "Attempt Timeline"],
            ["comparison", "AI Comparison"],
            ["gaps", "Missing Concepts"],
          ].map(([tab, label]) => (

            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Overview */}

        {activeTab === "overview" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <TrendingUp className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Response Improvement
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="text-center">

                  <p className="text-6xl font-black text-green-600">
                    +{selected.improvement}%
                  </p>

                  <p className="text-gray-500 mt-3">
                    improvement across attempts
                  </p>

                </div>

              </div>

              <div className="space-y-6 mt-5">

                <div>

                  <div className="flex justify-between mb-3">

                    <span className="font-semibold">
                      Previous Score
                    </span>

                    <span className="font-black text-orange-500">
                      {selected.previousScore}%
                    </span>

                  </div>

                  <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{
                        width: `${selected.previousScore}%`,
                      }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-3">

                    <span className="font-semibold">
                      Current Score
                    </span>

                    <span className="font-black text-green-600">
                      {selected.currentScore}%
                    </span>

                  </div>

                  <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${selected.currentScore}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Sparkles className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Progress Summary
                </h2>

              </div>

              <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

                <p className="leading-7 text-gray-600 dark:text-gray-300">
                  {selected.aiSummary}
                </p>

              </div>

              <div className="mt-7 grid sm:grid-cols-2 gap-5">

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Attempts
                  </p>

                  <p className="text-3xl font-black mt-2">
                    {selected.attempts}
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Score Gain
                  </p>

                  <p className="text-3xl font-black text-green-600 mt-2">
                    +{selected.improvement}%
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Timeline */}

        {activeTab === "timeline" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <CalendarDays className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Response Improvement Timeline
              </h2>

            </div>

            <div className="relative">

              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-700" />

              <div className="space-y-8">

                {selected.versions.map((version, index) => (

                  <div
                    key={version.attempt}
                    className="relative flex gap-6"
                  >

                    <div className="relative z-10 w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold shrink-0">
                      {version.attempt}
                    </div>

                    <div className="flex-1 rounded-2xl border border-gray-200 dark:border-white/10 p-6">

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                        <div>

                          <p className="text-sm text-gray-500">
                            {version.date}
                          </p>

                          <h3 className="text-xl font-bold mt-1">
                            Attempt {version.attempt}
                          </h3>

                        </div>

                        <span
                          className={`px-4 py-2 rounded-full font-bold ${getScoreBg(
                            version.score
                          )}`}
                        >
                          {version.score}%
                        </span>

                      </div>

                      <div className="mt-6 rounded-xl bg-gray-50 dark:bg-gray-800 p-5">

                        <p className="text-sm text-gray-500 mb-2">
                          Answer
                        </p>

                        <p className="leading-7">
                          {version.answer}
                        </p>

                      </div>

                      <div className="mt-5 flex items-start gap-3">

                        <Lightbulb
                          size={20}
                          className="text-yellow-500 shrink-0"
                        />

                        <p className="text-gray-500 leading-6">
                          {version.feedback}
                        </p>

                      </div>

                      {index < selected.versions.length - 1 && (
                        <div className="mt-5 flex items-center gap-2 text-sm text-green-600 font-semibold">
                          <TrendingUp size={17} />
                          Improvement recorded
                        </div>
                      )}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Comparison */}

        {activeTab === "comparison" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <FileText className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Previous Answer
                </h2>

              </div>

              <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

                <p className="leading-8">
                  {selected.versions[0].answer}
                </p>

              </div>

              <div className="mt-6 flex items-center justify-between">

                <span className="text-gray-500">
                  Previous Score
                </span>

                <span className="text-3xl font-black text-orange-500">
                  {selected.previousScore}%
                </span>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <CheckCircle2 className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Latest Answer
                </h2>

              </div>

              <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

                <p className="leading-8">
                  {
                    selected.versions[
                      selected.versions.length - 1
                    ].answer
                  }
                </p>

              </div>

              <div className="mt-6 flex items-center justify-between">

                <span className="text-gray-500">
                  Current Score
                </span>

                <span className="text-3xl font-black text-green-600">
                  {selected.currentScore}%
                </span>

              </div>

            </div>

            <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Sparkles className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Comparison Summary
                </h2>

              </div>

              <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-7">

                <p className="text-lg leading-8">
                  {selected.aiSummary}
                </p>

              </div>

              <div className="grid md:grid-cols-3 gap-5 mt-7">

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

                  <TrendingUp
                    className="text-green-600"
                    size={25}
                  />

                  <p className="text-sm text-gray-500 mt-4">
                    Score Improvement
                  </p>

                  <p className="text-3xl font-black text-green-600 mt-2">
                    +{selected.improvement}%
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

                  <MessageSquare
                    className="text-blue-600"
                    size={25}
                  />

                  <p className="text-sm text-gray-500 mt-4">
                    Attempts
                  </p>

                  <p className="text-3xl font-black mt-2">
                    {selected.attempts}
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

                  <Target
                    className="text-violet-600"
                    size={25}
                  />

                  <p className="text-sm text-gray-500 mt-4">
                    Current Score
                  </p>

                  <p className="text-3xl font-black text-violet-600 mt-2">
                    {selected.currentScore}%
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Missing Concepts */}

        {activeTab === "gaps" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <AlertTriangle className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Missing Concepts & Improvements
              </h2>

            </div>

            <div className="grid lg:grid-cols-2 gap-8">

              <div>

                <h3 className="font-bold text-lg mb-5">
                  Concepts Identified
                </h3>

                <div className="space-y-4">

                  {selected.missingConcepts.map((concept) => (

                    <div
                      key={concept}
                      className="flex items-center gap-4 rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-5"
                    >

                      <AlertTriangle
                        className="text-orange-500 shrink-0"
                        size={22}
                      />

                      <span className="font-semibold">
                        {concept}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

              <div>

                <h3 className="font-bold text-lg mb-5">
                  Improvements Made
                </h3>

                <div className="space-y-4">

                  {selected.improvements.map((improvement) => (

                    <div
                      key={improvement}
                      className="flex items-center gap-4 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-5"
                    >

                      <CheckCircle2
                        className="text-green-600 shrink-0"
                        size={22}
                      />

                      <span className="font-semibold">
                        {improvement}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Improvement Areas */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Improvement Areas
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Technical Accuracy",
                score: 94,
                icon: "💻",
              },
              {
                title: "Answer Structure",
                score: 89,
                icon: "🧩",
              },
              {
                title: "Communication",
                score: 91,
                icon: "🎤",
              },
              {
                title: "Completeness",
                score: 87,
                icon: "📋",
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

        {/* Progress Chart */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Score Progression
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {selected.versions.map((version) => (

              <div
                key={version.attempt}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center"
              >

                <p className="text-sm text-gray-500">
                  {version.date}
                </p>

                <p
                  className={`text-4xl font-black mt-3 ${getScoreColor(
                    version.score
                  )}`}
                >
                  {version.score}%
                </p>

                <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
                    style={{
                      width: `${version.score}%`,
                    }}
                  />

                </div>

                {version.attempt ===
                  selected.versions.length && (
                  <span className="inline-block mt-4 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs font-bold">
                    Current
                  </span>
                )}

              </div>

            ))}

          </div>

        </div>

        {/* AI Learning Insight */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Brain size={30} />

            <h2 className="text-3xl font-bold">
              AI Learning Insight
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-4xl">
            Your repeated attempts show measurable improvement. The
            strongest gains come from replacing uncertain language,
            adding missing technical concepts, and organizing answers into
            a clear logical sequence. Reattempting difficult questions is
            helping you convert feedback into stronger responses.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                📈
              </p>

              <h3 className="text-xl font-bold mt-4">
                Keep Reattempting
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Repeated practice makes improvement measurable and
                reinforces concepts.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Apply Feedback
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Focus on the specific gaps identified after each attempt.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Measure Progress
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Compare earlier and latest answers to see whether your
                communication is becoming stronger.
              </p>

            </div>

          </div>

        </div>

        {/* Personalized Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

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
                Technical Clarity
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your latest responses communicate technical concepts more
                directly and with stronger structure.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Improvement
              </p>

              <h3 className="text-xl font-bold mt-2">
                Answer Structure
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                You are increasingly organizing answers into logical steps
                instead of giving disconnected explanations.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Add Deeper Reasoning
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Continue adding trade-offs, edge cases, and validation
                steps when the question requires deeper explanation.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Response Improvement
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your answer quality has improved significantly across
                repeated attempts. Continue using AI feedback to identify
                missing concepts and strengthen your explanations.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-green-600">
                +{averageImprovement}%
              </p>

              <p className="text-gray-500 mt-2">
                Average Improvement
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
              style={{
                width: `${Math.min(
                  averageImprovement * 2.5,
                  100
                )}%`,
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
                Your improvement history shows that repeated attempts can
                turn feedback into measurable progress. Instead of only
                reviewing your latest score, compare how your explanation,
                technical accuracy, completeness, and communication change
                over time. Continue reattempting questions where AI
                identifies meaningful improvement opportunities.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🏆
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Current Score
              </h3>

              <p className="text-5xl font-black">
                {selected.currentScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewResponseImprovementHistory;