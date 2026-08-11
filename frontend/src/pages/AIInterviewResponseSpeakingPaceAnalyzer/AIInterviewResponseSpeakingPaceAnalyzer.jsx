import React, { useMemo, useState } from "react";
import {
  Brain,
  Mic,
  Gauge,
  Clock3,
  Pause,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Lightbulb,
  RefreshCw,
  Target,
  MessageSquare,
  Volume2,
  Activity,
  ShieldCheck,
} from "lucide-react";

const AIInterviewResponseSpeakingPaceAnalyzer = () => {
  const [selectedResponse, setSelectedResponse] = useState(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);

  const responses = [
    {
      title: "Technical Database Answer",
      question: "How would you optimize a slow database query?",
      duration: "1:42",
      words: 228,
      wpm: 134,
      averageWpm: 134,
      pauseCount: 7,
      pauseDuration: "9.4s",
      status: "Good Pace",
      score: 86,
      recommendation:
        "Your pace is generally comfortable. Slightly slow down when explaining database optimization steps so the interviewer can follow each technical point.",
      fastSections: [
        {
          time: "00:28 - 00:39",
          text: "I would check the execution plan and indexes and then look at joins and filtering...",
          wpm: 171,
        },
      ],
      slowSections: [
        {
          time: "01:15 - 01:27",
          text: "After that, I would verify the results and compare the query performance...",
          wpm: 92,
        },
      ],
      pauses: [
        {
          time: "00:18",
          duration: "1.4s",
          reason: "Thinking pause",
        },
        {
          time: "00:42",
          duration: "1.1s",
          reason: "Transition pause",
        },
        {
          time: "01:03",
          duration: "1.8s",
          reason: "Thinking pause",
        },
      ],
    },
    {
      title: "Data Structures Answer",
      question: "Explain the difference between an array and a linked list.",
      duration: "1:18",
      words: 190,
      wpm: 146,
      averageWpm: 146,
      pauseCount: 4,
      pauseDuration: "5.2s",
      status: "Slightly Fast",
      score: 72,
      recommendation:
        "Your response is understandable, but you speak slightly faster than the recommended range. Add short pauses after important comparisons and complexity statements.",
      fastSections: [
        {
          time: "00:12 - 00:25",
          text: "Arrays provide constant time access while linked lists require traversal...",
          wpm: 178,
        },
        {
          time: "00:43 - 00:51",
          text: "Insertion and deletion can be more efficient with linked lists...",
          wpm: 169,
        },
      ],
      slowSections: [
        {
          time: "01:02 - 01:09",
          text: "The main difference is therefore based on memory layout...",
          wpm: 88,
        },
      ],
      pauses: [
        {
          time: "00:31",
          duration: "0.9s",
          reason: "Thinking pause",
        },
        {
          time: "00:55",
          duration: "1.2s",
          reason: "Transition pause",
        },
      ],
    },
    {
      title: "Behavioral Project Answer",
      question: "Tell me about a difficult project you worked on.",
      duration: "2:06",
      words: 247,
      wpm: 118,
      averageWpm: 118,
      pauseCount: 11,
      pauseDuration: "18.7s",
      status: "Too Slow",
      score: 61,
      recommendation:
        "Your pace is slower than ideal for a behavioral answer. Reduce long pauses and organize your response using Situation, Task, Action, and Result.",
      fastSections: [
        {
          time: "01:32 - 01:42",
          text: "I coordinated with the team and implemented the solution before testing...",
          wpm: 151,
        },
      ],
      slowSections: [
        {
          time: "00:25 - 00:41",
          text: "The project was challenging because there were several different requirements...",
          wpm: 76,
        },
        {
          time: "01:02 - 01:18",
          text: "I then tried to understand what exactly was causing the issue...",
          wpm: 81,
        },
      ],
      pauses: [
        {
          time: "00:17",
          duration: "2.4s",
          reason: "Thinking pause",
        },
        {
          time: "00:34",
          duration: "2.1s",
          reason: "Hesitation",
        },
        {
          time: "00:49",
          duration: "1.9s",
          reason: "Thinking pause",
        },
        {
          time: "01:20",
          duration: "2.7s",
          reason: "Response planning",
        },
      ],
    },
  ];

  const selected = responses[selectedResponse];

  const overallScore = useMemo(() => {
    return Math.round(
      responses.reduce((sum, response) => sum + response.score, 0) /
        responses.length
    );
  }, []);

  const averageWpm = useMemo(() => {
    return Math.round(
      responses.reduce((sum, response) => sum + response.averageWpm, 0) /
        responses.length
    );
  }, []);

  const totalPauses = useMemo(() => {
    return responses.reduce(
      (sum, response) => sum + response.pauseCount,
      0
    );
  }, []);

  const getPaceLabel = (wpm) => {
    if (wpm < 110) return "Too Slow";
    if (wpm <= 140) return "Good Pace";
    if (wpm <= 160) return "Slightly Fast";
    return "Too Fast";
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getPaceClass = (wpm) => {
    if (wpm < 110) {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    if (wpm <= 140) {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (wpm <= 160) {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("analysis");
    }, 800);
  };

  const handleResponseChange = (index) => {
    setSelectedResponse(index);
    setActiveTab("analysis");
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Mic size={34} className="text-violet-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Response Speaking Pace Analyzer
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Analyze your speaking speed, pauses, and verbal delivery to
              communicate more clearly during interviews.
            </p>
          </div>

        </div>

        {/* Overview Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Gauge className="mx-auto text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Pace Score
            </p>

            <p className="text-5xl font-black mt-3">
              {overallScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Activity className="mx-auto text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Average WPM
            </p>

            <p className="text-5xl font-black mt-3">
              {averageWpm}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Pause className="mx-auto text-orange-500" size={30} />

            <p className="text-gray-500 mt-4">
              Pauses Detected
            </p>

            <p className="text-5xl font-black mt-3">
              {totalPauses}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp className="mx-auto text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Ideal Range
            </p>

            <p className="text-4xl font-black mt-4">
              110–140
            </p>

            <p className="text-sm text-gray-500 mt-2">
              words per minute
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
                  AI Speaking Pace Engine
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-4xl">
                AI analyzes your recorded interview responses to estimate
                speaking pace, identify long pauses, detect unusually fast
                or slow sections, and provide personalized communication
                suggestions.
              </p>

            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition shrink-0 disabled:opacity-60"
            >

              {analyzing ? (
                <>
                  <RefreshCw
                    size={20}
                    className="animate-spin"
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Analyze Speaking Pace
                </>
              )}

            </button>

          </div>

        </div>

        {/* Response Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Recorded Response
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {responses.map((response, index) => (

              <button
                key={response.title}
                type="button"
                onClick={() => handleResponseChange(index)}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedResponse === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-center justify-between gap-3">

                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm font-semibold">
                    <Mic size={14} />
                    Response {index + 1}
                  </span>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${getPaceClass(
                      response.wpm
                    )}`}
                  >
                    {response.status}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {response.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {response.question}
                </p>

                <div className="flex items-center gap-5 mt-5">

                  <div>

                    <p className="text-xs text-gray-500">
                      WPM
                    </p>

                    <p
                      className={`text-2xl font-black ${getScoreColor(
                        response.score
                      )}`}
                    >
                      {response.wpm}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Score
                    </p>

                    <p className="text-2xl font-black text-violet-600">
                      {response.score}%
                    </p>

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Response */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div>

              <p className="text-sm text-gray-500">
                Interview Question
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold mt-3">
                {selected.question}
              </h2>

              <div className="flex flex-wrap gap-3 mt-5">

                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
                  <Clock3 size={16} />
                  {selected.duration}
                </span>

                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                  <MessageSquare size={16} />
                  {selected.words} words
                </span>

                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getPaceClass(
                    selected.wpm
                  )}`}
                >
                  <Gauge size={16} />
                  {selected.wpm} WPM
                </span>

              </div>

            </div>

            <div className="text-center shrink-0">

              <p
                className={`text-6xl font-black ${getScoreColor(
                  selected.score
                )}`}
              >
                {selected.score}%
              </p>

              <p className="text-gray-500 mt-2">
                Speaking Pace Score
              </p>

            </div>

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
            Pace Analysis
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sections")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "sections"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Fast & Slow Sections
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pauses")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "pauses"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Pause Analysis
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("recommendations")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "recommendations"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            AI Recommendations
          </button>

        </div>

        {/* Pace Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Gauge className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Speaking Pace Score
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="relative w-52 h-52 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getScoreColor(
                        selected.score
                      )}`}
                    >
                      {selected.score}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {selected.status}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-green-500"
                  style={{
                    width: `${selected.score}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-7">
                A comfortable interview speaking pace is generally around
                110–140 words per minute. The ideal pace can vary depending
                on the complexity of the explanation and the candidate's
                natural speaking style.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Speaking Metrics
                </h2>

              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Words Per Minute
                  </p>

                  <p className="text-4xl font-black text-violet-600 mt-3">
                    {selected.wpm}
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Duration
                  </p>

                  <p className="text-4xl font-black mt-3">
                    {selected.duration}
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Pauses
                  </p>

                  <p className="text-4xl font-black text-orange-500 mt-3">
                    {selected.pauseCount}
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Pause Time
                  </p>

                  <p className="text-4xl font-black text-blue-600 mt-3">
                    {selected.pauseDuration}
                  </p>

                </div>

              </div>

              <div className="mt-7 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-5">

                <div className="flex items-center gap-3">

                  <Volume2
                    className="text-violet-600"
                    size={22}
                  />

                  <p className="font-bold">
                    Pace Classification
                  </p>

                </div>

                <p className="text-gray-500 mt-2">
                  {getPaceLabel(selected.wpm)} at {selected.wpm} words
                  per minute.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Fast & Slow Sections */}

        {activeTab === "sections" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <TrendingUp className="text-red-500" />

                <h2 className="text-2xl font-bold">
                  Overly Fast Sections
                </h2>

              </div>

              <div className="space-y-5">

                {selected.fastSections.map((section, index) => (

                  <div
                    key={index}
                    className="rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-6"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <span className="font-bold">
                        {section.time}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 font-bold text-sm">
                        {section.wpm} WPM
                      </span>

                    </div>

                    <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                      "{section.text}"
                    </p>

                    <p className="text-sm text-red-600 dark:text-red-400 mt-4 font-semibold">
                      Slow down slightly and add a short pause between
                      technical points.
                    </p>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Clock3 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Overly Slow Sections
                </h2>

              </div>

              <div className="space-y-5">

                {selected.slowSections.map((section, index) => (

                  <div
                    key={index}
                    className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <span className="font-bold">
                        {section.time}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-bold text-sm">
                        {section.wpm} WPM
                      </span>

                    </div>

                    <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                      "{section.text}"
                    </p>

                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-4 font-semibold">
                      Reduce unnecessary pauses and use a structured
                      explanation to keep the response moving.
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Pause Analysis */}

        {activeTab === "pauses" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-8">

              <div className="flex items-center gap-3">

                <Pause className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Pause & Hesitation Analysis
                </h2>

              </div>

              <div className="text-center">

                <p className="text-3xl font-black text-orange-500">
                  {selected.pauseCount}
                </p>

                <p className="text-sm text-gray-500">
                  detected pauses
                </p>

              </div>

            </div>

            <div className="space-y-4">

              {selected.pauses.map((pause, index) => (

                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                >

                  <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">

                    <Pause
                      className="text-orange-500"
                      size={24}
                    />

                  </div>

                  <div className="flex-1">

                    <p className="font-bold">
                      Pause at {pause.time}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {pause.reason}
                    </p>

                  </div>

                  <div className="text-left sm:text-right">

                    <p className="text-2xl font-black text-orange-500">
                      {pause.duration}
                    </p>

                    <p className="text-sm text-gray-500">
                      duration
                    </p>

                  </div>

                </div>

              ))}

            </div>

            <div className="mt-8 rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-6">

              <div className="flex items-start gap-4">

                <Lightbulb
                  className="text-yellow-500 shrink-0"
                  size={24}
                />

                <div>

                  <h3 className="font-bold">
                    AI Pause Insight
                  </h3>

                  <p className="text-gray-500 mt-2 leading-7">
                    Pauses are not always negative. Short pauses can make
                    an answer sound thoughtful and organized. Focus on
                    reducing repeated long pauses caused by uncertainty
                    while keeping natural pauses between major ideas.
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Sparkles className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Personalized Recommendations
                </h2>

              </div>

              <div className="space-y-5">

                <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

                  <div className="flex items-center gap-3">

                    <Target className="text-violet-600" />

                    <h3 className="font-bold">
                      Target Pace
                    </h3>

                  </div>

                  <p className="text-gray-500 mt-3 leading-6">
                    Aim for approximately 110–140 words per minute during
                    technical explanations, while allowing natural
                    variation for complex concepts.
                  </p>

                </div>

                <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6">

                  <div className="flex items-center gap-3">

                    <Pause className="text-blue-600" />

                    <h3 className="font-bold">
                      Use Strategic Pauses
                    </h3>

                  </div>

                  <p className="text-gray-500 mt-3 leading-6">
                    Pause briefly after stating an important idea or
                    completing a reasoning step instead of rushing into
                    the next sentence.
                  </p>

                </div>

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

                  <div className="flex items-center gap-3">

                    <MessageSquare className="text-green-600" />

                    <h3 className="font-bold">
                      Structure Your Answers
                    </h3>

                  </div>

                  <p className="text-gray-500 mt-3 leading-6">
                    Use structures such as "First", "Then", "Finally" or
                    STAR for behavioral questions to reduce hesitation and
                    keep your response organized.
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Brain className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Current Response Insight
                </h2>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

                <div className="flex items-center justify-between">

                  <span className="text-gray-500">
                    Current pace
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full font-bold ${getPaceClass(
                      selected.wpm
                    )}`}
                  >
                    {selected.status}
                  </span>

                </div>

                <p className="text-5xl font-black text-violet-600 mt-6">
                  {selected.wpm}
                </p>

                <p className="text-gray-500 mt-2">
                  words per minute
                </p>

              </div>

              <div className="mt-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

                <div className="flex items-start gap-3">

                  <CheckCircle2
                    className="text-green-600 shrink-0"
                    size={22}
                  />

                  <p className="text-gray-600 dark:text-gray-300 leading-7">
                    {selected.recommendation}
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Pace Trend */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Speaking Pace Trend
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              {
                label: "Week 1",
                wpm: 158,
                score: 62,
              },
              {
                label: "Week 2",
                wpm: 151,
                score: 68,
              },
              {
                label: "Week 3",
                wpm: 142,
                score: 77,
              },
              {
                label: "Current",
                wpm: averageWpm,
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
                  {item.wpm}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  WPM
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                  <div
                    className="h-full bg-violet-600 rounded-full"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

                <p className="font-bold mt-3">
                  {item.score}% pace score
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Speaking Guidelines */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Speaking Guidelines
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Aim for Clarity
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Do not rush simply to sound confident. A clear and
                understandable explanation is more valuable than speed.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                ⏸️
              </p>

              <h3 className="text-xl font-bold mt-4">
                Pause With Purpose
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Use short pauses to separate ideas, think through a
                technical problem, and emphasize important points.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🗣️
              </p>

              <h3 className="text-xl font-bold mt-4">
                Practice Naturally
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                The goal is not to speak at exactly one speed. Develop a
                comfortable pace that allows the interviewer to follow you.
              </p>

            </div>

          </div>

        </div>

        {/* Final Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <ShieldCheck size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your speaking pace is becoming more consistent. Continue
                practicing structured answers, use short purposeful pauses,
                and avoid rushing through complex technical explanations.
                The goal is confident, natural, and easy-to-follow
                communication.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎤
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Pace Score
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

export default AIInterviewResponseSpeakingPaceAnalyzer;