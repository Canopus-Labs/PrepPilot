import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Target,
  BarChart3,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Search,
  TrendingUp,
  CircleHelp,
} from "lucide-react";

const AIInterviewAnswerKnowledgeGapDetector = () => {
  const [answer, setAnswer] = useState(
    "Polymorphism means that different classes can use the same method. It allows objects to behave differently, although I think it mainly happens because inheritance lets child classes use parent methods."
  );

  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);

  const knowledgeGaps = [
    {
      concept: "Runtime Polymorphism",
      confidence: 58,
      severity: "High",
      issue:
        "The answer recognizes that different objects can behave differently but incorrectly connects polymorphism primarily to inheritance.",
      correction:
        "Runtime polymorphism is commonly achieved through method overriding and dynamic dispatch. It is related to inheritance in many object-oriented designs, but inheritance itself is not the definition of polymorphism.",
    },
    {
      concept: "Method Overriding",
      confidence: 64,
      severity: "Medium",
      issue:
        "The response mentions parent and child methods but does not clearly explain how overriding changes runtime behavior.",
      correction:
        "Method overriding allows a subclass to provide its own implementation of a method defined by a parent class.",
    },
    {
      concept: "Compile-Time vs Runtime Polymorphism",
      confidence: 42,
      severity: "High",
      issue:
        "The response does not distinguish runtime polymorphism from compile-time polymorphism.",
      correction:
        "Compile-time polymorphism is commonly associated with method overloading, while runtime polymorphism is commonly associated with method overriding and dynamic dispatch.",
    },
  ];

  const resources = [
    {
      title: "Object-Oriented Programming Fundamentals",
      type: "Concept Revision",
      level: "Beginner",
      description:
        "Review inheritance, encapsulation, abstraction, and polymorphism.",
    },
    {
      title: "Method Overriding & Dynamic Dispatch",
      type: "Focused Topic",
      level: "Intermediate",
      description:
        "Understand how runtime method selection works in object-oriented systems.",
    },
    {
      title: "OOP Interview Practice",
      type: "Practice",
      level: "Intermediate",
      description:
        "Practice explaining OOP concepts through interview-style questions.",
    },
  ];

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("analysis");
    }, 700);
  };

  const getSeverityClass = (severity) => {
    if (severity === "High") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
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
              <Brain size={34} className="text-violet-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Answer Knowledge Gap Detector
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Identify partially understood concepts, misconceptions, and
                hidden technical weaknesses in interview responses.
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
                Detecting Gaps...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Knowledge
              </>
            )}
          </button>

        </div>

        {/* AI Banner */}

        <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Find What You Almost Know
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            A response does not have to be completely wrong to reveal a
            knowledge gap. AI analyzes partially correct explanations,
            misconceptions, and missing concepts to identify areas where your
            understanding needs strengthening.
          </p>

        </div>

        {/* Answer Input */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-6">

            <CircleHelp className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Interview Response
            </h2>

          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={8}
            className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-violet-500 resize-none leading-7"
            placeholder="Paste your interview answer here..."
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5">

            <p className="text-sm text-gray-500">
              AI separates conceptual gaps from communication problems.
            </p>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing || !answer.trim()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-50"
            >
              <Sparkles size={18} />
              Detect Knowledge Gaps
            </button>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <AlertTriangle className="text-orange-600" size={30} />

            <p className="text-gray-500 mt-4">
              Knowledge Gaps
            </p>

            <p className="text-5xl font-black text-orange-600 mt-2">
              3
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Brain className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Concept Understanding
            </p>

            <p className="text-5xl font-black text-violet-600 mt-2">
              58%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Concept Accuracy
            </p>

            <p className="text-5xl font-black mt-2">
              72%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <TrendingUp className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Revision Progress
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              76%
            </p>

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
            Gap Analysis
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("concepts")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "concepts"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Concept Map
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("resources")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "resources"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Learning Resources
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("progress")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "progress"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Gap Progress
          </button>

        </div>

        {/* Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <Search className="text-violet-600" size={30} />

                    <h2 className="text-3xl font-bold">
                      AI Knowledge Analysis
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-5 max-w-3xl leading-7">
                    Your response demonstrates partial understanding of
                    polymorphism, but several concepts need clarification.
                    The detected issues appear primarily conceptual rather
                    than communication-related.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-7xl font-black text-orange-600">
                    58%
                  </p>

                  <p className="text-gray-500 mt-2">
                    Concept Confidence
                  </p>

                </div>

              </div>

            </div>

            {/* Knowledge Gaps */}

            <div className="space-y-5">

              {knowledgeGaps.map((gap, index) => (

                <div
                  key={gap.concept}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="flex flex-col lg:flex-row gap-6">

                    <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">

                      <AlertTriangle
                        size={28}
                        className="text-orange-600"
                      />

                    </div>

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-xl font-bold">
                          {gap.concept}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityClass(
                            gap.severity
                          )}`}
                        >
                          {gap.severity} Gap
                        </span>

                      </div>

                      <div className="mt-5">

                        <div className="flex justify-between mb-2">

                          <span className="text-sm text-gray-500">
                            Understanding confidence
                          </span>

                          <span className="font-bold">
                            {gap.confidence}%
                          </span>

                        </div>

                        <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                          <div
                            className="h-full rounded-full bg-orange-500"
                            style={{
                              width: `${gap.confidence}%`,
                            }}
                          />

                        </div>

                      </div>

                      <div className="mt-6 rounded-2xl bg-red-50 dark:bg-red-900/10 p-5">

                        <p className="font-bold text-red-700 dark:text-red-400">
                          Detected Issue
                        </p>

                        <p className="text-gray-600 dark:text-gray-300 mt-2 leading-7">
                          {gap.issue}
                        </p>

                      </div>

                      <div className="mt-4 rounded-2xl bg-green-50 dark:bg-green-900/10 p-5">

                        <p className="font-bold text-green-700 dark:text-green-400">
                          Correct Understanding
                        </p>

                        <p className="text-gray-600 dark:text-gray-300 mt-2 leading-7">
                          {gap.correction}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* Communication vs Knowledge */}

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <Brain className="text-violet-600" />

                  <h2 className="text-2xl font-bold">
                    Knowledge Assessment
                  </h2>

                </div>

                <div className="space-y-5">

                  <div>

                    <div className="flex justify-between mb-2">

                      <span>
                        Concept understanding
                      </span>

                      <strong>
                        58%
                      </strong>

                    </div>

                    <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="h-full rounded-full bg-violet-600"
                        style={{ width: "58%" }}
                      />

                    </div>

                  </div>

                  <div>

                    <div className="flex justify-between mb-2">

                      <span>
                        Concept accuracy
                      </span>

                      <strong>
                        72%
                      </strong>

                    </div>

                    <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: "72%" }}
                      />

                    </div>

                  </div>

                  <div>

                    <div className="flex justify-between mb-2">

                      <span>
                        Communication clarity
                      </span>

                      <strong>
                        86%
                      </strong>

                    </div>

                    <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="h-full rounded-full bg-green-600"
                        style={{ width: "86%" }}
                      />

                    </div>

                  </div>

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <Lightbulb className="text-yellow-500" />

                  <h2 className="text-2xl font-bold">
                    AI Interpretation
                  </h2>

                </div>

                <p className="text-gray-500 leading-8">
                  Your response is relatively clear, so the primary issue is
                  conceptual understanding rather than communication. Focus on
                  revising the relationship between inheritance, method
                  overriding, and polymorphism before attempting advanced OOP
                  interview questions.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Concept Map */}

        {activeTab === "concepts" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Concept Understanding Map
                </h2>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {[
                  ["Inheritance", 82, "Strong"],
                  ["Method Overriding", 64, "Partial"],
                  ["Runtime Polymorphism", 58, "Needs Review"],
                  ["Method Overloading", 42, "Needs Review"],
                  ["Dynamic Dispatch", 51, "Partial"],
                  ["OOP Fundamentals", 86, "Strong"],
                ].map(([concept, score, status]) => (

                  <div
                    key={concept}
                    className="rounded-3xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex items-center justify-between">

                      <h3 className="font-bold">
                        {concept}
                      </h3>

                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          status === "Strong"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : status === "Partial"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        }`}
                      >
                        {status}
                      </span>

                    </div>

                    <p className="text-4xl font-black text-violet-600 mt-6">
                      {score}%
                    </p>

                    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-4">

                      <div
                        className="h-full rounded-full bg-violet-600"
                        style={{ width: `${score}%` }}
                      />

                    </div>

                  </div>
                ))}

              </div>

            </div>

            <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-7">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  Recommended Learning Path
                </h2>

              </div>

              <div className="flex flex-col lg:flex-row items-center gap-4">

                {[
                  "OOP Fundamentals",
                  "Inheritance",
                  "Method Overriding",
                  "Runtime Polymorphism",
                  "Dynamic Dispatch",
                ].map((concept, index) => (

                  <React.Fragment key={concept}>

                    <div className="rounded-2xl bg-white/10 px-5 py-4 text-center">

                      <p className="font-bold">
                        {concept}
                      </p>

                    </div>

                    {index < 4 && (
                      <ArrowRight
                        className="hidden lg:block shrink-0"
                        size={22}
                      />
                    )}

                  </React.Fragment>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* Resources */}

        {activeTab === "resources" && (
          <div className="mt-6 space-y-6">

            {resources.map((resource, index) => (

              <div
                key={resource.title}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
              >

                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">

                  <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">

                    <BookOpen
                      size={28}
                      className="text-blue-600"
                    />

                  </div>

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-xl font-bold">
                        {resource.title}
                      </h2>

                      <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300 text-xs font-bold">
                        {resource.level}
                      </span>

                    </div>

                    <p className="text-sm text-blue-600 font-semibold mt-2">
                      {resource.type}
                    </p>

                    <p className="text-gray-500 mt-3 leading-7">
                      {resource.description}
                    </p>

                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition shrink-0"
                  >
                    Start
                    <ArrowRight size={17} />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* Progress */}

        {activeTab === "progress" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <TrendingUp className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Knowledge Gap Improvement
                </h2>

              </div>

              <div className="space-y-7">

                {[
                  ["Runtime Polymorphism", 42, 58],
                  ["Method Overriding", 51, 64],
                  ["Dynamic Dispatch", 38, 51],
                ].map(([concept, previous, current]) => (

                  <div key={concept}>

                    <div className="flex justify-between mb-3">

                      <span className="font-bold">
                        {concept}
                      </span>

                      <span className="text-sm text-gray-500">
                        {previous}% → {current}%
                      </span>

                    </div>

                    <div className="relative h-4 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gray-400"
                        style={{ width: `${previous}%` }}
                      />

                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-green-500"
                        style={{ width: `${current}%` }}
                      />

                    </div>

                    <p className="text-sm text-green-600 font-semibold mt-2">
                      +{current - previous}% improvement
                    </p>

                  </div>
                ))}

              </div>

            </div>

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <BarChart3 className="text-violet-600" />

                  <h2 className="text-2xl font-bold">
                    Gap Status
                  </h2>

                </div>

                <div className="space-y-5">

                  <div className="flex items-center justify-between">

                    <span>
                      Active gaps
                    </span>

                    <strong className="text-red-600">
                      3
                    </strong>

                  </div>

                  <div className="flex items-center justify-between">

                    <span>
                      Improving gaps
                    </span>

                    <strong className="text-orange-600">
                      2
                    </strong>

                  </div>

                  <div className="flex items-center justify-between">

                    <span>
                      Resolved gaps
                    </span>

                    <strong className="text-green-600">
                      4
                    </strong>

                  </div>

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <Lightbulb className="text-yellow-500" />

                  <h2 className="text-2xl font-bold">
                    AI Progress Insight
                  </h2>

                </div>

                <p className="text-gray-500 leading-8">
                  Your conceptual understanding is improving after targeted
                  revision. Continue practicing runtime polymorphism and
                  dynamic dispatch until your confidence consistently exceeds
                  80%.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Detection Process */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              How AI Detects Knowledge Gaps
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Analyze",
                "Analyze the candidate's explanation and technical claims.",
              ],
              [
                "2",
                "Identify",
                "Detect partial understanding and conceptual misconceptions.",
              ],
              [
                "3",
                "Separate",
                "Distinguish knowledge problems from communication issues.",
              ],
              [
                "4",
                "Recommend",
                "Suggest targeted learning and practice resources.",
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

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

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
                "Hidden Weaknesses",
                "Detects concepts that are only partially understood.",
              ],
              [
                "🎯",
                "Targeted Learning",
                "Recommends resources based on specific knowledge gaps.",
              ],
              [
                "🔍",
                "Misconception Detection",
                "Identifies technically incorrect assumptions.",
              ],
              [
                "📈",
                "Progress Tracking",
                "Measures whether knowledge gaps improve after revision.",
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

        <div className="mt-10 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Recommendation
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your response shows partial knowledge of polymorphism but
                contains misconceptions about inheritance and runtime
                behavior. Review method overriding and dynamic dispatch before
                moving to advanced OOP interview questions.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🧠
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Knowledge Confidence
              </h3>

              <p className="text-5xl font-black">
                58%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerKnowledgeGapDetector;