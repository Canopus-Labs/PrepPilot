import React, { useMemo, useState } from "react";
import {
  Brain,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  MessageSquare,
  BarChart3,
  Lightbulb,
  RefreshCw,
  Target,
  TrendingUp,
  Award,
  Route,
  Mic,
  FileText,
  MoveRight,
} from "lucide-react";

const AIInterviewResponseTransitionCoach = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);

  const answers = [
    {
      question: "How would you optimize a slow database query?",
      type: "Technical",
      flowScore: 72,
      transitionIssues: 3,
      improvedScore: 93,
      original:
        "First, I would check the query execution plan. The database might have missing indexes. The joins could also be inefficient. I would then look at the indexes. For example, if the user_id column is frequently searched, I would add an index. The complexity depends on the query and indexes. Overall, I would optimize the query based on the bottleneck.",
      improved:
        "First, I would identify the bottleneck by checking the query execution plan. Once the bottleneck is clear, I would review the indexes and joins to determine whether they are contributing to the slow execution. For example, if user_id is frequently used for filtering, I would consider adding an appropriate index. From a performance perspective, the resulting query efficiency depends on the execution plan and indexing strategy. Finally, I would validate the optimization by comparing the query performance before and after the change.",
      sections: [
        {
          name: "Problem Explanation",
          status: "Good",
          detail: "The answer begins by identifying the database performance problem.",
        },
        {
          name: "Approach",
          status: "Needs Transition",
          detail: "The move from execution plan analysis to indexes is abrupt.",
        },
        {
          name: "Implementation",
          status: "Good",
          detail: "The answer provides a concrete indexing example.",
        },
        {
          name: "Complexity",
          status: "Needs Transition",
          detail: "The complexity discussion appears suddenly without connecting it to the approach.",
        },
        {
          name: "Conclusion",
          status: "Good",
          detail: "The answer ends with a practical optimization strategy.",
        },
      ],
      transitions: [
        {
          from: "Problem Explanation",
          to: "Approach",
          issue: "The answer jumps directly from identifying the query problem to indexes.",
          suggestion: "Once I identify the bottleneck, I would then...",
        },
        {
          from: "Approach",
          to: "Implementation",
          issue: "The concrete example is introduced without context.",
          suggestion: "To put that approach into practice, for example...",
        },
        {
          from: "Implementation",
          to: "Complexity",
          issue: "The complexity discussion starts abruptly.",
          suggestion: "From a performance perspective, this means...",
        },
      ],
      strengths: [
        "The answer follows the main technical reasoning correctly.",
        "A practical database example is included.",
        "The response reaches a clear conclusion.",
      ],
    },
    {
      question: "Explain how you would design a scalable URL shortener.",
      type: "System Design",
      flowScore: 78,
      transitionIssues: 2,
      improvedScore: 94,
      original:
        "I would start with an API service. We need a database to store URLs. Redis could be used for caching. The system needs to handle many requests. For example, we can cache popular URLs. The database could be sharded. We should also monitor the system.",
      improved:
        "I would start by defining the API responsibilities and the core URL-shortening workflow. From there, I would introduce a database to persist the URL mappings. Because frequently accessed URLs can create repeated database reads, I would add Redis as a caching layer. As traffic increases, the database may become a bottleneck, so sharding can be considered for horizontal scalability. Finally, I would add monitoring to track latency, errors, cache performance, and system capacity.",
      sections: [
        {
          name: "Problem Explanation",
          status: "Good",
          detail: "The response establishes the main system requirements.",
        },
        {
          name: "Approach",
          status: "Good",
          detail: "The API and storage architecture are introduced clearly.",
        },
        {
          name: "Implementation",
          status: "Needs Transition",
          detail: "The move into caching could be explained more naturally.",
        },
        {
          name: "Scalability",
          status: "Needs Transition",
          detail: "Database sharding appears without explicitly connecting it to traffic growth.",
        },
        {
          name: "Conclusion",
          status: "Good",
          detail: "Monitoring provides a useful closing component.",
        },
      ],
      transitions: [
        {
          from: "Storage",
          to: "Caching",
          issue: "Redis is introduced without explaining the reason for caching.",
          suggestion: "To reduce repeated database reads, I would...",
        },
        {
          from: "Caching",
          to: "Scalability",
          issue: "The answer jumps to sharding without explaining the scaling trigger.",
          suggestion: "As traffic grows and the database becomes a bottleneck...",
        },
      ],
      strengths: [
        "Covers the major system components.",
        "Identifies caching as a performance optimization.",
        "Includes scalability and monitoring considerations.",
      ],
    },
    {
      question: "How would you debug a program that is producing incorrect output?",
      type: "Problem Solving",
      flowScore: 69,
      transitionIssues: 4,
      improvedScore: 91,
      original:
        "I would reproduce the issue first. Then I would check the input. I would use a debugger. I would inspect variables. For example, I could add breakpoints. After that I would check the output. I would fix the bug. Finally I would test it again.",
      improved:
        "First, I would reproduce the incorrect output consistently so I can understand the failure. Once I can reproduce it, I would verify the input and expected output to determine where the behavior diverges. Next, I would use a debugger and breakpoints to inspect the relevant variables and program state. For example, I would trace the values leading up to the incorrect result. After identifying the root cause, I would implement the fix and then rerun the test cases to confirm that the problem has been resolved without introducing regressions.",
      sections: [
        {
          name: "Problem Explanation",
          status: "Good",
          detail: "The response starts with reproducing the bug.",
        },
        {
          name: "Investigation",
          status: "Needs Transition",
          detail: "The movement from input validation to debugging tools is abrupt.",
        },
        {
          name: "Example",
          status: "Needs Transition",
          detail: "The breakpoint example could be connected more clearly.",
        },
        {
          name: "Fix",
          status: "Good",
          detail: "The response identifies the need to locate the root cause before fixing it.",
        },
        {
          name: "Verification",
          status: "Needs Transition",
          detail: "Testing should be explicitly connected to confirming the fix.",
        },
      ],
      transitions: [
        {
          from: "Reproduction",
          to: "Investigation",
          issue: "The answer moves to checking inputs without explaining the purpose.",
          suggestion: "Once the issue is reproducible, I would verify...",
        },
        {
          from: "Investigation",
          to: "Debugging",
          issue: "The debugger is introduced suddenly.",
          suggestion: "If the input appears correct, I would then use...",
        },
        {
          from: "Debugging",
          to: "Example",
          issue: "The breakpoint example lacks a connecting phrase.",
          suggestion: "For example, to inspect this behavior...",
        },
        {
          from: "Fix",
          to: "Verification",
          issue: "The testing step needs a clearer connection to the fix.",
          suggestion: "After applying the fix, I would verify it by...",
        },
      ],
      strengths: [
        "Uses a logical debugging process.",
        "Includes practical debugging tools.",
        "Ends by validating the fix.",
      ],
    },
  ];

  const selected = answers[selectedAnswer];

  const overallScore = useMemo(() => {
    return Math.round(
      answers.reduce((sum, answer) => sum + answer.flowScore, 0) /
        answers.length
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
    if (score >= 85) return "Excellent Flow";
    if (score >= 70) return "Developing Flow";
    return "Needs Improvement";
  };

  const getStatusClass = (status) => {
    if (status === "Good") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <Route size={34} className="text-violet-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                AI Interview Response Transition Coach
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Improve the flow of your interview answers by connecting
                ideas naturally and presenting technical reasoning clearly.
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
                Analyzing Response...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Response Flow
              </>
            )}
          </button>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <MessageSquare className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Responses Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              28
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <AlertTriangle className="text-orange-500" size={30} />

            <p className="text-gray-500 mt-4">
              Transition Issues
            </p>

            <p className="text-5xl font-black mt-3">
              34
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <Route className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Response Flow Score
            </p>

            <p className="text-5xl font-black mt-3">
              {overallScore}%
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <TrendingUp className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Average Improvement
            </p>

            <p className="text-5xl font-black mt-3">
              +21%
            </p>
          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">
            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Response Transition Engine
            </h2>
          </div>

          <p className="leading-8 text-white/90">
            AI analyzes how smoothly your answer moves from one idea to
            another. It identifies abrupt transitions and suggests natural
            connecting phrases so your technical explanations become easier
            to follow without changing the meaning of your answer.
          </p>

        </div>

        {/* Answer Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Response
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
                      answer.flowScore
                    )}`}
                  >
                    {answer.flowScore}%
                  </span>

                  <span className="text-sm text-gray-500">
                    response flow
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

          <span className="inline-block mt-5 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
            {selected.type}
          </span>

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
            Flow Analysis
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("original")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "original"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Original Response
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("improved")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "improved"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Improved Flow
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("transitions")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "transitions"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Transition Suggestions
          </button>

        </div>

        {/* Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">
                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Response Flow Score
                </h2>
              </div>

              <div className="flex items-center justify-center py-6">

                <div className="relative w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getScoreColor(
                        selected.flowScore
                      )}`}
                    >
                      {selected.flowScore}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {getScoreLabel(selected.flowScore)}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-violet-600"
                  style={{
                    width: `${selected.flowScore}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                This score measures how naturally your response moves
                between important interview answer sections.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">
                <AlertTriangle className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Transition Issues
                </h2>
              </div>

              <div className="text-center py-5">

                <p className="text-6xl font-black text-orange-500">
                  {selected.transitionIssues}
                </p>

                <p className="text-gray-500 mt-2">
                  abrupt transitions detected
                </p>

              </div>

              <div className="space-y-3 mt-5">

                {selected.transitions.slice(0, 3).map((item, index) => (

                  <div
                    key={index}
                    className="rounded-xl bg-orange-50 dark:bg-orange-900/10 p-4"
                  >

                    <div className="flex items-center gap-3">

                      <span className="font-semibold text-orange-700 dark:text-orange-400">
                        {item.from}
                      </span>

                      <ArrowRight
                        size={18}
                        className="text-gray-400"
                      />

                      <span className="font-semibold text-violet-700 dark:text-violet-400">
                        {item.to}
                      </span>

                    </div>

                  </div>

                ))}

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
                Original Response
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
                  Flow Score
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.flowScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Transition Issues
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.transitionIssues}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="text-xl font-black text-orange-500 mt-3">
                  Needs Smoother Flow
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
                <CheckCircle2 className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Improved Response Flow
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
                  Original Score
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.flowScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Improved Score
                </p>

                <p className="text-3xl font-black text-green-600 mt-2">
                  {selected.improvedScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Improvement
                </p>

                <p className="text-3xl font-black text-violet-600 mt-2">
                  +{selected.improvedScore - selected.flowScore}%
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Transitions */}

        {activeTab === "transitions" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">
              <Lightbulb className="text-yellow-500" />

              <h2 className="text-2xl font-bold">
                Transition Suggestions
              </h2>
            </div>

            <div className="space-y-5">

              {selected.transitions.map((item, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex flex-wrap items-center gap-3">

                    <span className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold">
                      {item.from}
                    </span>

                    <MoveRight className="text-gray-400" />

                    <span className="px-4 py-2 rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400 font-semibold">
                      {item.to}
                    </span>

                  </div>

                  <div className="mt-5 rounded-xl bg-orange-50 dark:bg-orange-900/10 p-5">

                    <p className="text-sm text-gray-500">
                      Detected Issue
                    </p>

                    <p className="mt-2 leading-6">
                      {item.issue}
                    </p>

                  </div>

                  <div className="mt-5 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-5">

                    <div className="flex items-start gap-3">

                      <ArrowRight
                        className="text-green-600 shrink-0"
                        size={22}
                      />

                      <div>

                        <p className="font-semibold text-green-700 dark:text-green-400">
                          Suggested Transition
                        </p>

                        <p className="text-lg font-semibold mt-2">
                          "{item.suggestion}"
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* Answer Structure */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Route className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Recommended Answer Flow
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">

            {[
              {
                title: "Problem",
                description: "Explain what needs to be solved.",
                icon: "🎯",
              },
              {
                title: "Approach",
                description: "Describe the strategy you would use.",
                icon: "🧠",
              },
              {
                title: "Implementation",
                description: "Explain how the solution works.",
                icon: "⚙️",
              },
              {
                title: "Example",
                description: "Support the explanation with an example.",
                icon: "💡",
              },
              {
                title: "Conclusion",
                description: "Summarize the result and key trade-offs.",
                icon: "✅",
              },
            ].map((item, index) => (

              <div
                key={item.title}
                className="relative rounded-2xl border border-gray-200 dark:border-white/10 p-5 text-center"
              >

                <div className="text-4xl">
                  {item.icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 leading-5">
                  {item.description}
                </p>

                {index < 4 && (
                  <ArrowRight
                    className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 text-gray-300"
                    size={24}
                  />
                )}

              </div>
            ))}

          </div>

        </div>

        {/* Section Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Section-by-Section Flow Analysis
            </h2>

          </div>

          <div className="space-y-4">

            {selected.sections.map((section, index) => (

              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center justify-between gap-5 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center font-bold text-violet-600">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {section.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {section.detail}
                    </p>

                  </div>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusClass(
                    section.status
                  )}`}
                >
                  {section.status}
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">
              What You Are Already Doing Well
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

        {/* Transition Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Transition Skill Categories
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Logical Flow",
                score: 84,
                example: "Ideas follow a clear sequence",
                icon: "🔗",
              },
              {
                title: "Technical Structure",
                score: 88,
                example: "Approach connects to implementation",
                icon: "⚙️",
              },
              {
                title: "Examples",
                score: 79,
                example: "Examples support previous points",
                icon: "💡",
              },
              {
                title: "Conclusions",
                score: 91,
                example: "Answers finish with clear takeaways",
                icon: "🎯",
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

        {/* Before vs After */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Response Flow Improvement
            </h2>

          </div>

          <div className="space-y-8">

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Original flow
                </span>

                <span className="font-black text-orange-500">
                  {selected.flowScore}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                  style={{
                    width: `${selected.flowScore}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Improved flow
                </span>

                <span className="font-black text-green-600">
                  {selected.improvedScore}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  style={{
                    width: `${selected.improvedScore}%`,
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
                Potential improvement: +
                {selected.improvedScore - selected.flowScore}%
              </p>

            </div>

          </div>

        </div>

        {/* Common Transition Phrases */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Useful Transition Phrases
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-200 dark:border-white/10">

                  <th className="p-4">
                    Transition
                  </th>

                  <th className="p-4">
                    Useful Phrase
                  </th>

                  <th className="p-4">
                    Purpose
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  [
                    "Problem → Approach",
                    "To address this, I would...",
                    "Introduce your solution strategy.",
                  ],
                  [
                    "Approach → Implementation",
                    "To put this into practice...",
                    "Move from strategy to implementation.",
                  ],
                  [
                    "Implementation → Example",
                    "For example, in this case...",
                    "Introduce a concrete example.",
                  ],
                  [
                    "Example → Complexity",
                    "From a performance perspective...",
                    "Connect the example with analysis.",
                  ],
                  [
                    "Analysis → Conclusion",
                    "Overall, this approach...",
                    "Summarize the key result.",
                  ],
                ].map((row, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-white/5"
                  >

                    <td className="p-4 font-semibold text-violet-600">
                      {row[0]}
                    </td>

                    <td className="p-4 font-semibold text-green-600">
                      "{row[1]}"
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
              AI Transition Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧩
              </p>

              <h3 className="text-xl font-bold mt-4">
                Connect Ideas
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Make the relationship between each part of your answer
                explicit instead of jumping between topics.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🗣️
              </p>

              <h3 className="text-xl font-bold mt-4">
                Guide the Listener
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Use short connecting phrases to help the interviewer
                understand where your reasoning is going.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Stay Structured
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Follow a consistent structure so technical explanations
                remain clear and easy to follow.
              </p>

            </div>

          </div>

        </div>

        {/* Progress Tracking */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Response Flow Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 61,
              },
              {
                label: "Week 2",
                score: 68,
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
                Technical Structure
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your responses contain the major technical components.
                Focus on connecting those components more explicitly.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Smoother Transitions
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Use short connecting phrases when moving from an approach
                to an example, implementation, or complexity discussion.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Structured Speaking
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Practice answers using a consistent problem, approach,
                implementation, example, and conclusion structure.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Response Flow Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your response structure is developing well. Continue
                practicing clear transitions between technical ideas so
                the interviewer can easily follow your reasoning.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {overallScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Developing Flow
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
                Your technical knowledge is easier to understand when each
                idea is connected to the next. Instead of jumping from one
                point to another, briefly explain why you are moving to the
                next part of your answer. This creates a smoother,
                structured, and more professional interview response.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Flow
              </h3>

              <p className="text-5xl font-black">
                {selected.flowScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewResponseTransitionCoach;