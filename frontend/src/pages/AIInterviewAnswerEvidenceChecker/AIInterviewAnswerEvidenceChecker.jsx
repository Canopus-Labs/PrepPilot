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
  RefreshCw,
  ArrowRight,
  Award,
  Lightbulb,
  Search,
  BarChart3,
  FileCheck2,
  CircleAlert,
  Briefcase,
  Trophy,
  Gauge,
  Quote,
  Check,
  X,
} from "lucide-react";

const AIInterviewAnswerEvidenceChecker = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);

  const answers = [
    {
      question: "Tell me about a project where you improved application performance.",
      type: "Behavioral / Project",
      evidenceScore: 62,
      claims: 4,
      supportedClaims: 2,
      missingEvidence: 3,

      original:
        "I worked on a web application where I improved the performance significantly. I optimized several parts of the application and made it much faster for users. The application became more efficient after my changes.",

      improved:
        "I improved the performance of our React dashboard by optimizing unnecessary component re-renders and introducing memoization for expensive calculations. The average dashboard load time decreased from approximately 3.2 seconds to 1.8 seconds, improving the experience for users with large datasets.",

      claimsList: [
        {
          claim: "I improved the performance significantly.",
          status: "Weak Evidence",
          evidence: "No specific measurement or baseline was provided.",
          suggestion:
            "Mention the original performance and the result after your changes.",
        },
        {
          claim: "I optimized several parts of the application.",
          status: "Partial Evidence",
          evidence: "The specific technical optimizations are not explained.",
          suggestion:
            "Name the components, algorithms, queries, or techniques you optimized.",
        },
        {
          claim: "The application became much faster.",
          status: "Weak Evidence",
          evidence: "The improvement is subjective without a measurable result.",
          suggestion:
            "Add concrete metrics such as response time, load time, throughput, or resource usage.",
        },
        {
          claim: "The changes improved the user experience.",
          status: "Unsupported",
          evidence: "No user-facing impact or measurement is provided.",
          suggestion:
            "Explain how users benefited and include an observable result if available.",
        },
      ],

      evidenceCategories: [
        {
          title: "Concrete Example",
          score: 72,
          icon: Briefcase,
          description:
            "The answer describes a real project but lacks implementation details.",
        },
        {
          title: "Measurable Result",
          score: 45,
          icon: BarChart3,
          description:
            "The answer claims improvement without providing meaningful metrics.",
        },
        {
          title: "Technical Detail",
          score: 61,
          icon: Search,
          description:
            "The answer mentions optimization but does not explain the techniques.",
        },
        {
          title: "Personal Contribution",
          score: 83,
          icon: Trophy,
          description:
            "The candidate clearly states that they personally worked on the improvement.",
        },
      ],

      missingDetails: [
        "Original performance measurement.",
        "Specific optimization technique.",
        "Measured improvement after the change.",
      ],

      strengths: [
        "Clearly describes personal involvement.",
        "Identifies performance improvement as the main achievement.",
        "Communicates the overall project outcome.",
      ],
    },

    {
      question: "Describe a time when you solved a difficult technical problem.",
      type: "Behavioral / Technical",
      evidenceScore: 74,
      claims: 4,
      supportedClaims: 3,
      missingEvidence: 2,

      original:
        "I had a difficult issue in one of my projects where the application was not working correctly. I investigated the problem, found the cause, and fixed it. After that, the application worked properly and the team was able to continue development.",

      improved:
        "During a project, our API occasionally returned duplicate records because two asynchronous requests were updating the same cache entry. I reproduced the issue using concurrent requests, traced it through the request lifecycle, and added request-level locking. After the fix, the duplicate-response issue stopped occurring in our test environment and the team could continue development without the intermittent failures.",

      claimsList: [
        {
          claim: "I had a difficult technical issue.",
          status: "Partial Evidence",
          evidence: "The difficulty is stated but the actual technical problem is unclear.",
          suggestion:
            "Explain what was failing and under what conditions.",
        },
        {
          claim: "I investigated the problem.",
          status: "Supported",
          evidence:
            "The response describes investigation as part of the resolution process.",
          suggestion:
            "Mention the debugging tools or methods used for stronger evidence.",
        },
        {
          claim: "I found the cause and fixed it.",
          status: "Supported",
          evidence:
            "The answer connects investigation with identifying and resolving the issue.",
          suggestion:
            "Explain the root cause and the exact fix.",
        },
        {
          claim: "The team was able to continue development.",
          status: "Partial Evidence",
          evidence:
            "The outcome is reasonable but does not include a measurable impact.",
          suggestion:
            "Explain how the fix affected development or delivery.",
        },
      ],

      evidenceCategories: [
        {
          title: "Concrete Example",
          score: 84,
          icon: Briefcase,
          description:
            "A specific technical problem is described.",
        },
        {
          title: "Measurable Result",
          score: 61,
          icon: BarChart3,
          description:
            "The outcome is explained but could use stronger metrics.",
        },
        {
          title: "Technical Detail",
          score: 78,
          icon: Search,
          description:
            "The debugging and resolution process contains useful technical information.",
        },
        {
          title: "Personal Contribution",
          score: 88,
          icon: Trophy,
          description:
            "The candidate clearly explains their role in resolving the issue.",
        },
      ],

      missingDetails: [
        "Specific debugging tools or techniques.",
        "Measured impact of the fix.",
      ],

      strengths: [
        "Clearly identifies personal responsibility.",
        "Explains a logical problem-solving process.",
        "Connects the problem to a concrete technical action.",
      ],
    },

    {
      question: "Tell me about an achievement you are proud of.",
      type: "Behavioral",
      evidenceScore: 57,
      claims: 4,
      supportedClaims: 1,
      missingEvidence: 4,

      original:
        "I am proud of completing an important project with my team. We worked hard and successfully delivered the project. I contributed a lot to the implementation and helped make sure everything was completed on time.",

      improved:
        "I am proud of leading the dashboard implementation for our student project. I designed the attendance analytics interface, implemented the subject-wise charts, and integrated the data with the existing frontend. We completed the feature before the final demonstration and were able to present a working analytics dashboard to the judges.",

      claimsList: [
        {
          claim: "We successfully delivered the project.",
          status: "Weak Evidence",
          evidence: "There is no description of what was delivered.",
          suggestion:
            "Explain the specific feature, product, or result that was delivered.",
        },
        {
          claim: "I contributed a lot to the implementation.",
          status: "Unsupported",
          evidence: "The answer does not identify your specific contribution.",
          suggestion:
            "Describe exactly what you designed, implemented, or owned.",
        },
        {
          claim: "We worked hard.",
          status: "Unsupported",
          evidence: "Effort alone does not demonstrate achievement.",
          suggestion:
            "Replace general effort statements with concrete actions and outcomes.",
        },
        {
          claim: "We completed everything on time.",
          status: "Partial Evidence",
          evidence: "The timing claim has no specific deadline or delivery detail.",
          suggestion:
            "Mention the deadline and when the work was actually completed.",
        },
      ],

      evidenceCategories: [
        {
          title: "Concrete Example",
          score: 58,
          icon: Briefcase,
          description:
            "The achievement is mentioned but the actual project outcome is vague.",
        },
        {
          title: "Measurable Result",
          score: 42,
          icon: BarChart3,
          description:
            "Very few measurable outcomes are included.",
        },
        {
          title: "Technical Detail",
          score: 49,
          icon: Search,
          description:
            "The technical contribution is not clearly explained.",
        },
        {
          title: "Personal Contribution",
          score: 67,
          icon: Trophy,
          description:
            "Personal contribution is claimed but not supported with specific responsibilities.",
        },
      ],

      missingDetails: [
        "Specific achievement.",
        "Individual responsibilities.",
        "Technical implementation details.",
        "Measurable or observable outcome.",
      ],

      strengths: [
        "Communicates enthusiasm about the achievement.",
        "Shows awareness of teamwork.",
        "Mentions successful project completion.",
      ],
    },
  ];

  const selected = answers[selectedAnswer];

  const overallScore = useMemo(() => {
    return Math.round(
      answers.reduce(
        (sum, answer) => sum + answer.evidenceScore,
        0
      ) / answers.length
    );
  }, []);

  const totalClaims = useMemo(() => {
    return answers.reduce(
      (sum, answer) => sum + answer.claims,
      0
    );
  }, []);

  const totalSupportedClaims = useMemo(() => {
    return answers.reduce(
      (sum, answer) => sum + answer.supportedClaims,
      0
    );
  }, []);

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("analysis");
    }, 800);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getStatusColor = (status) => {
    if (status === "Supported") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (status === "Partial Evidence") {
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
            <FileCheck2
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Answer Evidence Checker
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Analyze whether your interview claims are supported by
              concrete examples, measurable results, and technical evidence.
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
              Answers Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              38
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Quote
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Claims Detected
            </p>

            <p className="text-5xl font-black mt-3">
              {totalClaims}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ShieldCheck
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Evidence Score
            </p>

            <p className="text-5xl font-black mt-3">
              {overallScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Supported Claims
            </p>

            <p className="text-5xl font-black mt-3">
              {totalSupportedClaims}
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Evidence Quality Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            AI identifies claims in your interview answers and checks
            whether they are supported by concrete examples, technical
            details, measurable outcomes, and your personal contribution.
            It helps transform vague statements into credible,
            evidence-based explanations.
          </p>

        </div>

        {/* Answer Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Search className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Answer
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
                      answer.evidenceScore
                    )}`}
                  >
                    {answer.evidenceScore}%
                  </span>

                  <span className="text-sm text-gray-500">
                    evidence quality
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

        {/* Analyze Button */}

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
                Checking Evidence...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Analyze Answer Evidence
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Evidence Analysis"],
            ["claims", "Claim Analysis"],
            ["original", "Original Answer"],
            ["improved", "Improved Answer"],
            ["categories", "Evidence Categories"],
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
                  Evidence Quality Score
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getScoreColor(
                        selected.evidenceScore
                      )}`}
                    >
                      {selected.evidenceScore}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {selected.evidenceScore >= 85
                        ? "Strong Evidence"
                        : selected.evidenceScore >= 70
                        ? "Developing"
                        : "Needs Evidence"}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-violet-600"
                  style={{
                    width: `${selected.evidenceScore}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                This score measures how effectively your claims are
                supported by concrete examples, technical details,
                measurable outcomes, and personal contribution.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <CircleAlert className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Missing Evidence
                </h2>

              </div>

              <div className="text-center py-4">

                <p className="text-6xl font-black text-orange-500">
                  {selected.missingEvidence}
                </p>

                <p className="text-gray-500 mt-2">
                  evidence areas need attention
                </p>

              </div>

              <div className="space-y-3 mt-5">

                {selected.missingDetails.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 p-4"
                    >

                      <AlertTriangle
                        size={18}
                        className="text-orange-500 shrink-0"
                      />

                      <span className="font-semibold">
                        {item}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>
        )}

        {/* Claims */}

        {activeTab === "claims" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Quote className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                AI Claim Evidence Analysis
              </h2>

            </div>

            <div className="space-y-5">

              {selected.claimsList.map(
                (item, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                      <div className="flex gap-4">

                        <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">

                          <span className="font-bold text-violet-600">
                            {index + 1}
                          </span>

                        </div>

                        <div>

                          <p className="font-bold text-lg leading-7">
                            "{item.claim}"
                          </p>

                        </div>

                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>

                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mt-6">

                      <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-5">

                        <p className="text-sm text-gray-500">
                          Evidence Review
                        </p>

                        <p className="mt-2 leading-6">
                          {item.evidence}
                        </p>

                      </div>

                      <div className="rounded-xl bg-violet-50 dark:bg-violet-900/10 p-5">

                        <p className="text-sm text-violet-600">
                          AI Suggestion
                        </p>

                        <p className="mt-2 leading-6">
                          {item.suggestion}
                        </p>

                      </div>

                    </div>

                  </div>

                )
              )}

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
                  Evidence Score
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.evidenceScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Claims
                </p>

                <p className="text-3xl font-black text-violet-600 mt-2">
                  {selected.claims}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Supported
                </p>

                <p className="text-3xl font-black text-green-600 mt-2">
                  {selected.supportedClaims}
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
                  Evidence-Rich Answer
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
                  {selected.evidenceScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Improved Score
                </p>

                <p className="text-3xl font-black text-green-600 mt-2">
                  {Math.min(
                    selected.evidenceScore + 28,
                    98
                  )}%
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
                    98 - selected.evidenceScore
                  )}
                  %
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Categories */}

        {activeTab === "categories" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Gauge className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Evidence Quality Categories
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {selected.evidenceCategories.map(
                (item, index) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div className="flex items-center gap-3">

                          <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                            <Icon
                              className="text-violet-600"
                              size={24}
                            />

                          </div>

                          <h3 className="text-xl font-bold">
                            {item.title}
                          </h3>

                        </div>

                        <span className="text-2xl font-black text-violet-600">
                          {item.score}%
                        </span>

                      </div>

                      <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                          style={{
                            width: `${item.score}%`,
                          }}
                        />

                      </div>

                      <p className="text-gray-500 mt-5 leading-6">
                        {item.description}
                      </p>

                    </div>
                  );
                }
              )}

            </div>

          </div>
        )}

        {/* Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">
              What You Are Already Doing Well
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

        {/* Evidence Categories Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Evidence Categories
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Examples",
                score: 76,
                icon: "💼",
                text: "Concrete project experiences",
              },
              {
                title: "Metrics",
                score: 58,
                icon: "📊",
                text: "Measurable outcomes",
              },
              {
                title: "Technical Detail",
                score: 71,
                icon: "💻",
                text: "Implementation evidence",
              },
              {
                title: "Impact",
                score: 64,
                icon: "🎯",
                text: "Business or user outcome",
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
                  {item.text}
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

        {/* Strong Evidence Formula */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Evidence Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                📌
              </p>

              <h3 className="text-xl font-bold mt-4">
                Be Specific
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Replace broad claims with specific actions, technologies,
                problems, and responsibilities.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                📊
              </p>

              <h3 className="text-xl font-bold mt-4">
                Show Results
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Whenever possible, support achievements with measurable
                results such as time, percentage, scale, or impact.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Explain Your Role
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Make it clear what you personally designed, implemented,
                investigated, or improved.
              </p>

            </div>

          </div>

        </div>

        {/* Common Alternatives */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Stronger Evidence Alternatives
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-200 dark:border-white/10">

                  <th className="p-4">
                    Weak Claim
                  </th>

                  <th className="p-4">
                    Evidence-Rich Version
                  </th>

                  <th className="p-4">
                    Evidence to Add
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  [
                    "I improved performance.",
                    "Reduced API response time from 800ms to 450ms.",
                    "Before/after metric",
                  ],
                  [
                    "I optimized the application.",
                    "Added memoization to prevent unnecessary React re-renders.",
                    "Technical technique",
                  ],
                  [
                    "I solved a difficult bug.",
                    "Identified a race condition using concurrent request testing.",
                    "Root cause and debugging method",
                  ],
                  [
                    "I helped the team.",
                    "Implemented the authentication module and documented the integration steps.",
                    "Specific contribution",
                  ],
                  [
                    "The project was successful.",
                    "Delivered the dashboard before the final demonstration.",
                    "Observable outcome",
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

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Evidence Quality Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 49,
              },
              {
                label: "Week 2",
                score: 57,
              },
              {
                label: "Week 3",
                score: 66,
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
                Personal Contribution
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                You generally communicate your involvement in projects.
                Continue making your specific responsibilities explicit.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Add Metrics
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Replace words such as "significantly", "a lot", and "much
                faster" with measurable results whenever possible.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Use Concrete Evidence
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                For every major claim, practice explaining what you did,
                how you did it, and what changed afterward.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Evidence Quality Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your answers contain useful experiences, but stronger
                evidence comes from specific examples, measurable results,
                technical details, and clearly defined personal contributions.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {overallScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Developing
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
                Strong interview answers should not rely only on claims.
                Support important statements with concrete examples,
                explain your personal contribution, describe the technical
                approach you used, and provide measurable or observable
                results whenever possible. Credible evidence makes your
                achievements easier for an interviewer to understand and
                evaluate.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                📋
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Evidence
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

export default AIInterviewAnswerEvidenceChecker;