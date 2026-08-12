import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  MessageSquare,
  Lightbulb,
  Search,
  ArrowRight,
  RefreshCw,
  Award,
  FileText,
} from "lucide-react";

const AIInterviewAnswerSpecificityAnalyzer = () => {
  const [answer, setAnswer] = useState(
    "I improved the application performance by optimizing the database queries and making the backend more efficient."
  );

  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzed, setAnalyzed] = useState(false);

  const analysis = {
    score: 62,
    vagueStatements: 2,
    missingDetails: 4,
    supportedClaims: 3,
  };

  const vagueStatements = [
    {
      text: "I improved the application performance.",
      issue: "The statement does not explain what performance metric improved or by how much.",
      suggestion:
        "Mention the specific metric, such as response time, throughput, or page-load time.",
    },
    {
      text: "I made the backend more efficient.",
      issue: "The statement does not explain which backend component was changed or how.",
      suggestion:
        "Describe the specific optimization and its measurable impact.",
    },
  ];

  const missingDetails = [
    "Specific technical changes made",
    "Tools or technologies used",
    "Before-and-after performance metrics",
    "Your individual contribution",
  ];

  const recommendations = [
    "Mention the exact database queries or operations you optimized.",
    "Explain the optimization technique you used.",
    "Include measurable before-and-after results.",
    "Clarify which part of the implementation you personally handled.",
    "Mention relevant technologies, tools, or frameworks.",
  ];

  const improvedAnswer =
    "I improved the application's API response time by optimizing three frequently executed PostgreSQL queries and adding indexes to the most-used columns. I analyzed the slow queries using query execution plans and reduced the average response time from 850 ms to 420 ms. I implemented and tested the database changes in the backend and verified the improvement using performance tests.";

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      setActiveTab("analysis");
    }, 700);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-orange-500";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <Search size={34} className="text-violet-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Answer Specificity Analyzer
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Identify vague statements and improve your answers with
                concrete technical details, examples, and measurable results.
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
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Answer
              </>
            )}
          </button>

        </div>

        {/* Overview Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Specificity Score
            </p>

            <p
              className={`text-5xl font-black mt-2 ${getScoreColor(
                analysis.score
              )}`}
            >
              {analysis.score}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <AlertTriangle className="text-orange-500" size={30} />

            <p className="text-gray-500 mt-4">
              Vague Statements
            </p>

            <p className="text-5xl font-black mt-2">
              {analysis.vagueStatements}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <FileText className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Missing Details
            </p>

            <p className="text-5xl font-black mt-2">
              {analysis.missingDetails}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <CheckCircle2 className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Supported Claims
            </p>

            <p className="text-5xl font-black mt-2">
              {analysis.supportedClaims}
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Make Your Answers More Specific
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI checks whether your response contains enough concrete
            technical information to support your claims. It identifies
            vague statements, missing details, unsupported generalizations,
            and opportunities to add measurable evidence.
          </p>

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
            Answer Analysis
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "details"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Missing Details
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("improvement")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "improvement"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Improvement
          </button>

        </div>

        {/* Answer Editor */}

        <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-6">

            <MessageSquare className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Your Interview Answer
            </h2>

          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={8}
            className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-violet-500 resize-none leading-7"
            placeholder="Paste or type your interview answer..."
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5">

            <p className="text-sm text-gray-500">
              AI will analyze technical specificity, evidence, examples,
              metrics, and contribution details.
            </p>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing || !answer.trim()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-50"
            >
              <Sparkles size={18} />
              Check Specificity
            </button>

          </div>

        </div>

        {/* Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-8 space-y-8">

            {/* Score */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <BarChart3 className="text-violet-600" />

                    <h2 className="text-2xl font-bold">
                      Specificity Analysis
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-4 max-w-2xl leading-7">
                    Your answer contains useful technical direction, but
                    several claims need concrete evidence and implementation
                    details to make the response more convincing.
                  </p>

                </div>

                <div className="text-center">

                  <p
                    className={`text-7xl font-black ${getScoreColor(
                      analysis.score
                    )}`}
                  >
                    {analysis.score}%
                  </p>

                  <p className="text-gray-500 mt-2">
                    Specificity Score
                  </p>

                </div>

              </div>

              <div className="mt-8">

                <div className="flex justify-between mb-3">

                  <span className="text-sm text-gray-500">
                    Answer Specificity
                  </span>

                  <span className="font-bold">
                    {analysis.score}%
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-violet-600"
                    style={{
                      width: `${analysis.score}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            {/* Vague Statements */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <AlertTriangle className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Vague Statements Detected
                </h2>

              </div>

              <div className="space-y-6">

                {vagueStatements.map((item, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-orange-200 dark:border-orange-900/30 overflow-hidden"
                  >

                    <div className="bg-orange-50 dark:bg-orange-900/10 p-5">

                      <p className="font-bold">
                        "{item.text}"
                      </p>

                    </div>

                    <div className="p-5">

                      <p className="text-gray-500 leading-7">
                        <span className="font-semibold text-orange-500">
                          Why it is vague:
                        </span>{" "}
                        {item.issue}
                      </p>

                      <div className="mt-4 flex items-start gap-3 rounded-xl bg-violet-50 dark:bg-violet-900/10 p-4">

                        <Lightbulb
                          className="text-violet-600 shrink-0"
                          size={20}
                        />

                        <p className="text-sm leading-6">
                          <span className="font-semibold">
                            AI suggestion:
                          </span>{" "}
                          {item.suggestion}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* Claim Quality */}

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <CheckCircle2 className="text-green-600" size={30} />

                <p className="text-gray-500 mt-5">
                  Supported Claims
                </p>

                <p className="text-4xl font-black text-green-600 mt-2">
                  3
                </p>

                <p className="text-gray-500 mt-3 leading-6">
                  Claims that contain enough context to be understood.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <AlertTriangle className="text-orange-500" size={30} />

                <p className="text-gray-500 mt-5">
                  Unsupported Claims
                </p>

                <p className="text-4xl font-black text-orange-500 mt-2">
                  2
                </p>

                <p className="text-gray-500 mt-3 leading-6">
                  Statements that require more evidence or technical detail.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <Target className="text-violet-600" size={30} />

                <p className="text-gray-500 mt-5">
                  Improvement Potential
                </p>

                <p className="text-4xl font-black text-violet-600 mt-2">
                  High
                </p>

                <p className="text-gray-500 mt-3 leading-6">
                  Adding metrics and implementation details could
                  significantly strengthen the answer.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Missing Details */}

        {activeTab === "details" && (
          <div className="mt-8 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <FileText className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Missing Technical Details
                </h2>

              </div>

              <div className="space-y-4">

                {missingDetails.map((detail, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-5"
                  >

                    <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">
                      {index + 1}
                    </span>

                    <div>

                      <p className="font-semibold">
                        {detail}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Add this information to make your claim more
                        concrete and credible.
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Lightbulb className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  What Makes an Answer Specific?
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  {
                    title: "What",
                    text: "Explain exactly what you changed or implemented.",
                  },
                  {
                    title: "How",
                    text: "Describe the technical approach or method used.",
                  },
                  {
                    title: "Why",
                    text: "Explain why you selected that approach.",
                  },
                  {
                    title: "Result",
                    text: "Include measurable outcomes whenever possible.",
                  },
                  {
                    title: "Contribution",
                    text: "Clearly state what you personally contributed.",
                  },
                ].map((item) => (

                  <div
                    key={item.title}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                  >

                    <div className="flex items-center gap-3">

                      <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-bold">
                        {item.title}
                      </span>

                      <p className="font-semibold">
                        {item.text}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* Improvement */}

        {activeTab === "improvement" && (
          <div className="mt-8 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Improvement Recommendations
                </h2>

              </div>

              <div className="space-y-4">

                {recommendations.map((recommendation, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-5"
                  >

                    <CheckCircle2
                      className="text-violet-600 shrink-0"
                      size={22}
                    />

                    <p className="leading-7">
                      {recommendation}
                    </p>

                  </div>
                ))}

              </div>

            </div>

            {/* Improved Answer */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Sparkles className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Example of a More Specific Answer
                </h2>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 border border-gray-200 dark:border-white/10">

                <p className="leading-8">
                  {improvedAnswer}
                </p>

              </div>

              <div className="mt-6 grid md:grid-cols-4 gap-4">

                {[
                  ["What", "Optimized PostgreSQL queries"],
                  ["How", "Used indexes and query plans"],
                  ["Result", "850 ms → 420 ms"],
                  ["Contribution", "Implemented and tested changes"],
                ].map(([label, value]) => (

                  <div
                    key={label}
                    className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-5"
                  >

                    <p className="text-sm text-gray-500">
                      {label}
                    </p>

                    <p className="font-bold mt-2">
                      {value}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* Specificity Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Interview Answer Specificity Checklist
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {[
              "Did I explain exactly what I changed?",
              "Did I describe how I implemented it?",
              "Did I mention the technologies used?",
              "Did I provide measurable results?",
              "Did I explain my personal contribution?",
              "Did I avoid broad unsupported claims?",
            ].map((item, index) => (

              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <CheckCircle2
                  className="text-green-600 shrink-0"
                  size={21}
                />

                <p className="font-semibold">
                  {item}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* AI Process */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Brain size={30} />

            <h2 className="text-3xl font-bold">
              How AI Analyzes Specificity
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              ["1", "Detect", "Find vague statements and broad claims."],
              ["2", "Compare", "Compare claims with expected technical details."],
              ["3", "Score", "Calculate the specificity of the response."],
              ["4", "Improve", "Suggest concrete details and examples."],
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

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Specificity Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              ["Week 1", 48],
              ["Week 2", 56],
              ["Week 3", 61],
              ["Current", 62],
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
                Your answer has a useful technical foundation, but it would
                become significantly more convincing with measurable results,
                specific implementation details, and a clearer explanation
                of your personal contribution. Focus on answering
                <strong> what, how, why, and result </strong>
                whenever describing a technical achievement.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Specificity
              </h3>

              <p className="text-5xl font-black">
                {analysis.score}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerSpecificityAnalyzer;