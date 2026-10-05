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
  Mic,
  BarChart3,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Award,
} from "lucide-react";

const AIInterviewAnswerConfidenceLanguageAnalyzer = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);

  const answers = [
    {
      question: "How would you optimize a slow database query?",
      type: "Technical",
      original:
        "I think I would probably start by checking the query execution plan. Maybe the issue could be related to missing indexes, although I'm not completely sure. I guess I would also look at the joins and see if there are unnecessary operations.",
      improved:
        "I would start by checking the query execution plan to identify the bottleneck. Then I would verify whether the required columns are properly indexed and review the joins for unnecessary operations.",
      uncertaintyCount: 4,
      confidenceScore: 61,
      improvedScore: 92,
      phrases: [
        {
          phrase: "I think",
          alternative: "I would",
          reason: "Use direct language when describing a planned approach.",
        },
        {
          phrase: "Maybe",
          alternative: "The issue may be",
          reason: "State uncertainty precisely instead of sounding generally unsure.",
        },
        {
          phrase: "I'm not completely sure",
          alternative: "I would verify",
          reason: "Show how you would validate your assumption.",
        },
        {
          phrase: "I guess",
          alternative: "I would also",
          reason: "Replace hesitant wording with a clear next step.",
        },
      ],
      strengths: [
        "Correctly identifies query execution plans.",
        "Understands the importance of database indexes.",
        "Recognizes joins as a possible performance bottleneck.",
      ],
    },
    {
      question: "Explain the difference between an array and a linked list.",
      type: "Technical",
      original:
        "I think an array is probably stored continuously in memory, while a linked list might be stored in different places. I'm not entirely sure about all the details, but I believe arrays are generally faster for accessing elements.",
      improved:
        "An array stores elements in contiguous memory, which allows O(1) indexed access. A linked list stores elements in separate nodes connected by pointers, so accessing an element generally takes O(n) time.",
      uncertaintyCount: 3,
      confidenceScore: 68,
      improvedScore: 95,
      phrases: [
        {
          phrase: "I think",
          alternative: "An array",
          reason: "State known technical facts directly.",
        },
        {
          phrase: "probably",
          alternative: "generally",
          reason: "Use precise qualifiers rather than uncertain language.",
        },
        {
          phrase: "I'm not entirely sure",
          alternative: "The key difference is",
          reason: "Avoid weakening an explanation you already understand.",
        },
      ],
      strengths: [
        "Correctly identifies memory-layout differences.",
        "Understands array access performance.",
        "Recognizes linked-list node structure.",
      ],
    },
    {
      question: "What is the purpose of an API?",
      type: "General Technical",
      original:
        "I think an API is basically something that maybe allows different applications to communicate with each other. I'm not sure if that's the exact definition, but I believe it provides some kind of interface for accessing functionality.",
      improved:
        "An API provides a defined interface that allows different software components or applications to communicate and access functionality or data.",
      uncertaintyCount: 4,
      confidenceScore: 55,
      improvedScore: 94,
      phrases: [
        {
          phrase: "I think",
          alternative: "An API",
          reason: "Begin with the definition directly.",
        },
        {
          phrase: "basically",
          alternative: "",
          reason: "The word does not add useful meaning here.",
        },
        {
          phrase: "maybe",
          alternative: "allows",
          reason: "Remove unnecessary uncertainty from a known concept.",
        },
        {
          phrase: "I'm not sure",
          alternative: "",
          reason: "Avoid disclaimers when you can explain the concept correctly.",
        },
      ],
      strengths: [
        "Understands communication between software components.",
        "Recognizes the interface concept.",
        "Understands that APIs expose functionality.",
      ],
    },
  ];

  const selected = answers[selectedAnswer];

  const overallScore = useMemo(() => {
    return Math.round(
      answers.reduce(
        (sum, answer) => sum + answer.confidenceScore,
        0
      ) / answers.length
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
    if (score >= 85) return "Confident";
    if (score >= 70) return "Developing";
    return "Hesitant";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <ShieldCheck
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Answer Confidence Language Analyzer
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Detect hesitant language and learn how to communicate your
              technical knowledge with greater confidence.
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
              32
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Hesitant Phrases
            </p>

            <p className="text-5xl font-black mt-3">
              47
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ShieldCheck
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Confidence Score
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
              Improvement
            </p>

            <p className="text-5xl font-black mt-3">
              +24%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Confidence Language Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI analyzes the language you use when answering interview
            questions and identifies unnecessary uncertainty. It helps
            you replace hesitant phrases with clear, professional
            language without encouraging you to make claims you cannot
            support.
          </p>

        </div>

        {/* Answer Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare className="text-violet-600" />

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
                      answer.confidenceScore
                    )}`}
                  >
                    {answer.confidenceScore}%
                  </span>

                  <span className="text-sm text-gray-500">
                    confidence
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
                Analyzing Language...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Analyze Confidence Language
              </>
            )}

          </button>

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
            Language Analysis
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
            Original Answer
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
            Confident Version
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("phrases")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "phrases"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Phrase Suggestions
          </button>

        </div>

        {/* Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Confidence Language Score
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="relative w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getScoreColor(
                        selected.confidenceScore
                      )}`}
                    >
                      {selected.confidenceScore}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {getScoreLabel(
                        selected.confidenceScore
                      )}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-violet-600"
                  style={{
                    width: `${selected.confidenceScore}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                The score measures how directly and confidently your
                language communicates your knowledge. It does not judge
                whether you actually know the answer.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <AlertTriangle className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Detected Hesitation
                </h2>

              </div>

              <div className="text-center py-5">

                <p className="text-6xl font-black text-orange-500">
                  {selected.uncertaintyCount}
                </p>

                <p className="text-gray-500 mt-2">
                  uncertainty phrases detected
                </p>

              </div>

              <div className="space-y-3 mt-5">

                {selected.phrases.slice(0, 4).map((item) => (

                  <div
                    key={item.phrase}
                    className="flex items-center justify-between gap-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 p-4"
                  >

                    <span className="font-semibold text-orange-700 dark:text-orange-400">
                      "{item.phrase}"
                    </span>

                    <ArrowRight
                      size={18}
                      className="text-gray-400 shrink-0"
                    />

                    <span className="font-semibold text-green-700 dark:text-green-400">
                      "{item.alternative || "Remove"}"
                    </span>

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
                  Confidence
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.confidenceScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Hesitant Phrases
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.uncertaintyCount}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="text-xl font-black text-orange-500 mt-3">
                  Needs Improvement
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
                  More Confident Version
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
                  {selected.confidenceScore}%
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
                  +{selected.improvedScore - selected.confidenceScore}%
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Phrase Suggestions */}

        {activeTab === "phrases" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Lightbulb className="text-yellow-500" />

              <h2 className="text-2xl font-bold">
                Confidence Language Suggestions
              </h2>

            </div>

            <div className="space-y-5">

              {selected.phrases.map((item, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-5">

                    <div>

                      <p className="text-sm text-gray-500 mb-2">
                        Avoid
                      </p>

                      <span className="inline-block px-4 py-2 rounded-xl bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 font-semibold">
                        "{item.phrase}"
                      </span>

                    </div>

                    <ArrowRight
                      className="text-gray-400 hidden md:block"
                    />

                    <div>

                      <p className="text-sm text-gray-500 mb-2">
                        Try
                      </p>

                      <span className="inline-block px-4 py-2 rounded-xl bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-semibold">
                        {item.alternative
                          ? `"${item.alternative}"`
                          : "Remove the phrase"}
                      </span>

                    </div>

                  </div>

                  <div className="mt-5 rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                    <p className="text-sm text-gray-500">
                      Why?
                    </p>

                    <p className="mt-1 leading-6">
                      {item.reason}
                    </p>

                  </div>

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

        {/* Confidence Language Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Confidence Language Categories
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Uncertainty",
                score: 68,
                example: "I think, maybe, probably",
                icon: "🤔",
              },
              {
                title: "Directness",
                score: 82,
                example: "I would, the reason is",
                icon: "🎯",
              },
              {
                title: "Technical Clarity",
                score: 89,
                example: "Specific technical explanations",
                icon: "💻",
              },
              {
                title: "Professional Tone",
                score: 91,
                example: "Clear and respectful language",
                icon: "💼",
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

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Confidence Improvement
            </h2>

          </div>

          <div className="space-y-8">

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Original language
                </span>

                <span className="font-black text-orange-500">
                  {selected.confidenceScore}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                  style={{
                    width: `${selected.confidenceScore}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Improved language
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
                {selected.improvedScore -
                  selected.confidenceScore}
                %
              </p>

            </div>

          </div>

        </div>

        {/* Confidence Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Confidence Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Be Direct
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                State what you know directly instead of unnecessarily
                weakening your answer.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🔍
              </p>

              <h3 className="text-xl font-bold mt-4">
                Be Precise
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                When something is uncertain, explain what you would verify
                instead of using vague hesitation.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                💡
              </p>

              <h3 className="text-xl font-bold mt-4">
                Stay Honest
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Confidence does not mean pretending to know something you
                do not know.
              </p>

            </div>

          </div>

        </div>

        {/* Common Alternatives */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Stronger Language Alternatives
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-200 dark:border-white/10">

                  <th className="p-4">
                    Hesitant Phrase
                  </th>

                  <th className="p-4">
                    Stronger Alternative
                  </th>

                  <th className="p-4">
                    When to Use
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  [
                    "I think...",
                    "My understanding is...",
                    "When you have reasonable confidence but want to qualify.",
                  ],
                  [
                    "Maybe...",
                    "One possibility is...",
                    "When presenting one possible explanation.",
                  ],
                  [
                    "I'm not sure...",
                    "I would verify...",
                    "When you need to validate a technical detail.",
                  ],
                  [
                    "I guess...",
                    "I would...",
                    "When describing your approach.",
                  ],
                  [
                    "Probably...",
                    "Generally...",
                    "When describing a common behavior with exceptions.",
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
              Confidence Language Progress
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
                score: 69,
              },
              {
                label: "Week 3",
                score: 76,
              },
              {
                label: "Current",
                score: 85,
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
                Technical Knowledge
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your answers contain relevant technical concepts. The main
                improvement area is how confidently you communicate them.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Reduce Hesitation
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Replace repeated phrases such as "I think", "maybe", and
                "I'm not sure" with precise explanations.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Speak Directly
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Practice answering technical questions without unnecessary
                disclaimers while remaining honest about uncertainty.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Confidence Language Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your confidence language is improving. Continue practicing
                direct explanations and replace unnecessary hesitation with
                precise reasoning.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {overallScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Developing Confidence
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
                You do not need to remove every phrase such as "I think"
                from your vocabulary. The goal is to avoid unnecessary
                hesitation. When you know something, state it directly.
                When you are genuinely uncertain, explain how you would
                verify it. That combination creates confident and
                trustworthy interview communication.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Confidence
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

export default AIInterviewAnswerConfidenceLanguageAnalyzer;