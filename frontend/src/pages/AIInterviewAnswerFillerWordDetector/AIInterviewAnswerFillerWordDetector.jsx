import React, { useState } from "react";
import {
  Brain,
  Mic,
  MessageSquareText,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Target,
  Sparkles,
  Repeat2,
  Volume2,
} from "lucide-react";

const AIInterviewAnswerFillerWordDetector = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const stats = {
    clarityScore: 84,
    fillerWords: 8,
    fillerRate: 4.8,
    repeatedPhrases: 3,
  };

  const questions = [
    {
      title: "Tell me about a challenging project you worked on.",
      category: "Behavioral",
    },
    {
      title: "Explain how a Hash Map works.",
      category: "Technical",
    },
    {
      title: "Why should we hire you?",
      category: "HR",
    },
  ];

  const fillerWords = [
    {
      word: "um",
      count: 3,
      percentage: 37.5,
      severity: "High",
    },
    {
      word: "like",
      count: 2,
      percentage: 25,
      severity: "Medium",
    },
    {
      word: "you know",
      count: 2,
      percentage: 25,
      severity: "Medium",
    },
    {
      word: "uh",
      count: 1,
      percentage: 12.5,
      severity: "Low",
    },
  ];

  const repeatedPhrases = [
    {
      phrase: "I think",
      count: 3,
      suggestion: "Use a direct statement when you are confident.",
    },
    {
      phrase: "basically",
      count: 2,
      suggestion: "Remove it unless it adds useful meaning.",
    },
    {
      phrase: "so",
      count: 4,
      suggestion: "Pause briefly instead of repeatedly using a transition word.",
    },
  ];

  const transcript = [
    { text: "I", filler: false },
    { text: "um", filler: true },
    { text: "worked", filler: false },
    { text: "on", filler: false },
    { text: "a", filler: false },
    { text: "smart", filler: false },
    { text: "irrigation", filler: false },
    { text: "project", filler: false },
    { text: "and", filler: false },
    { text: "like", filler: true },
    { text: "the", filler: false },
    { text: "main", filler: false },
    { text: "challenge", filler: false },
    { text: "was", filler: false },
    { text: "integrating", filler: false },
    { text: "different", filler: false },
    { text: "sensors", filler: false },
    { text: "with", filler: false },
    { text: "the", filler: false },
    { text: "ESP32.", filler: false },
    { text: "Um", filler: true },
    { text: "you", filler: false },
    { text: "know", filler: false },
    { text: "we", filler: false },
    { text: "also", filler: false },
    { text: "had", filler: false },
    { text: "to", filler: false },
    { text: "use", filler: false },
    { text: "weather", filler: false },
    { text: "data", filler: false },
    { text: "to", filler: false },
    { text: "make", filler: false },
    { text: "better", filler: false },
    { text: "decisions.", filler: false },
  ];

  const getSeverityClasses = (severity) => {
    if (severity === "High") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    if (severity === "Medium") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
            <Mic
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Answer Filler Word Detector
            </h1>

            <p className="text-gray-500 mt-2">
              Detect filler words, repeated phrases, and communication
              habits that may make your interview answers sound less
              confident.
            </p>
          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Clarity Score
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.clarityScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Filler Words
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.fillerWords}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Volume2
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Filler Rate
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.fillerRate}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Repeat2
              className="mx-auto text-red-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Repeated Phrases
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.repeatedPhrases}
            </p>

          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-3xl font-bold">
              AI Communication Analysis
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            The AI analyzes your interview response for filler words,
            repeated phrases, unnecessary verbal habits, and overall
            communication clarity. It then provides practical suggestions
            to help you speak more naturally and confidently.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquareText className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {questions.map((question, index) => (

              <button
                key={index}
                onClick={() => setSelectedQuestion(index)}
                className={`text-left rounded-2xl border p-6 transition ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                  {question.category}
                </span>

                <h3 className="font-bold text-lg mt-4">
                  {question.title}
                </h3>

              </button>

            ))}

          </div>

        </div>

        {/* Transcript */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <Mic className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Interview Response Transcript
            </h2>

          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-7">

            <p className="text-lg leading-10">

              {transcript.map((item, index) => (

                <React.Fragment key={index}>

                  {item.filler ? (
                    <span className="mx-1 px-2 py-1 rounded-md bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-semibold">
                      {item.text}
                    </span>
                  ) : (
                    <span className="mx-1">
                      {item.text}
                    </span>
                  )}

                </React.Fragment>

              ))}

            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-8">

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Total Words
              </p>

              <p className="font-bold text-lg mt-2">
                67
              </p>

            </div>

            <div className="rounded-xl border border-red-200 dark:border-red-900/30 p-5">

              <p className="text-gray-500">
                Filler Words
              </p>

              <p className="font-bold text-lg mt-2 text-red-500">
                8
              </p>

            </div>

            <div className="rounded-xl border border-orange-200 dark:border-orange-900/30 p-5">

              <p className="text-gray-500">
                Repetitions
              </p>

              <p className="font-bold text-lg mt-2 text-orange-500">
                3
              </p>

            </div>

            <div className="rounded-xl border border-green-200 dark:border-green-900/30 p-5">

              <p className="text-gray-500">
                Clear Words
              </p>

              <p className="font-bold text-lg mt-2 text-green-600">
                59
              </p>

            </div>

          </div>

        </div>

        {/* Communication Clarity */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Communication Clarity
                </h2>

              </div>

              <p className="text-gray-500 mt-4 leading-7 max-w-2xl">
                Your response is generally clear, but frequent filler
                words interrupt the flow slightly. Reducing them will
                make your delivery sound more confident and deliberate.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {stats.clarityScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Good Clarity
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: `${stats.clarityScore}%`,
              }}
            />

          </div>

        </div>

        {/* Filler Word Frequency */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Filler Word Frequency
            </h2>

          </div>

          <div className="space-y-6">

            {fillerWords.map((item, index) => (

              <div key={index}>

                <div className="flex justify-between items-center mb-2">

                  <div className="flex items-center gap-3">

                    <span className="font-bold text-lg">
                      "{item.word}"
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getSeverityClasses(
                        item.severity
                      )}`}
                    >
                      {item.severity}
                    </span>

                  </div>

                  <span className="font-bold">
                    {item.count} times
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                    style={{
                      width: `${item.percentage * 2}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Repeated Phrases */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Repeat2 className="text-red-500" />

            <h2 className="text-2xl font-bold">
              Repeated Phrase Analysis
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {repeatedPhrases.map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex justify-between items-start">

                  <h3 className="text-xl font-bold">
                    "{item.phrase}"
                  </h3>

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                    {item.count}x
                  </span>

                </div>

                <p className="text-gray-500 mt-5 leading-6">
                  {item.suggestion}
                </p>

              </div>

            ))}

          </div>

        </div>
                {/* Detected Filler Word Breakdown */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Filler Word Breakdown
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {fillerWords.map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex items-center justify-between">

                  <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <Volume2
                      size={22}
                      className="text-red-500"
                    />
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityClasses(
                      item.severity
                    )}`}
                  >
                    {item.severity}
                  </span>

                </div>

                <h3 className="text-2xl font-black mt-5">
                  "{item.word}"
                </h3>

                <p className="text-gray-500 mt-2">
                  Used {item.count} times
                </p>

                <div className="mt-5">

                  <div className="flex justify-between text-sm mb-2">

                    <span>
                      Frequency
                    </span>

                    <span className="font-semibold">
                      {item.percentage}%
                    </span>

                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                      style={{
                        width: `${item.percentage * 2}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Cleaner Alternative Phrasing */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Cleaner Alternative Phrasing
            </h2>

          </div>

          <div className="space-y-6">

            {[
              {
                filler: "Um, I worked on...",
                replacement: "I worked on...",
                reason:
                  "Remove the filler and begin directly with your experience.",
              },
              {
                filler: "It was, like, a difficult project...",
                replacement:
                  "It was a challenging project because...",
                reason:
                  "Replace informal filler language with a specific statement.",
              },
              {
                filler: "You know, we had to...",
                replacement:
                  "Our team had to...",
                reason:
                  "Use precise language that clearly identifies the action.",
              },
              {
                filler: "So, basically, the system...",
                replacement:
                  "The system...",
                reason:
                  "Start with the main point instead of using multiple fillers.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <p className="text-sm text-gray-500">
                      Detected phrasing
                    </p>

                    <p className="mt-2 font-semibold text-red-600">
                      {item.filler}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Suggested phrasing
                    </p>

                    <p className="mt-2 font-semibold text-green-600">
                      {item.replacement}
                    </p>

                  </div>

                </div>

                <div className="mt-5 rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                  <p className="text-sm text-gray-500">
                    Why?
                  </p>

                  <p className="mt-1">
                    {item.reason}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Communication Improvement Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Communication Recommendations
            </h2>

          </div>

          <p className="text-white/90 leading-7 mb-7">
            Focus on replacing filler words with intentional pauses and
            clearer sentence structures. You do not need to speak faster;
            deliberate pauses can make your answer sound more confident.
          </p>

          <div className="grid md:grid-cols-2 gap-5">

            {[
              "Pause for one or two seconds when you need time to think.",
              "Avoid using 'um' or 'uh' while searching for your next point.",
              "Replace repeated transition words with direct statements.",
              "Practice answering common questions out loud before interviews.",
              "Record mock interviews and review your filler-word frequency.",
              "Focus on communicating one idea at a time.",
            ].map((recommendation, index) => (

              <div
                key={index}
                className="rounded-xl bg-white/10 p-5"
              >

                <span className="font-semibold">
                  💡 {recommendation}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Highlighted Transcript */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquareText className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Highlighted Response Analysis
            </h2>

          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-7">

            <p className="text-lg leading-10">

              {transcript.map((item, index) => (

                <React.Fragment key={index}>

                  {item.filler ? (
                    <span className="mx-1 px-2 py-1 rounded-md bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-bold">
                      {item.text}
                    </span>
                  ) : (
                    <span className="mx-1">
                      {item.text}
                    </span>
                  )}

                </React.Fragment>

              ))}

            </p>

          </div>

          <div className="flex flex-wrap gap-5 mt-6">

            <div className="flex items-center gap-2">

              <span className="w-4 h-4 rounded bg-red-500" />

              <span className="text-sm text-gray-500">
                Filler word
              </span>

            </div>

            <div className="flex items-center gap-2">

              <span className="w-4 h-4 rounded bg-gray-300" />

              <span className="text-sm text-gray-500">
                Normal speech
              </span>

            </div>

          </div>

        </div>

        {/* Filler Word Trend */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Filler Word Improvement Trend
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">

            {[
              {
                session: "Session 1",
                fillers: 18,
                clarity: 68,
              },
              {
                session: "Session 2",
                fillers: 15,
                clarity: 72,
              },
              {
                session: "Session 3",
                fillers: 12,
                clarity: 76,
              },
              {
                session: "Session 4",
                fillers: 10,
                clarity: 80,
              },
              {
                session: "Current",
                fillers: 8,
                clarity: 84,
              },
            ].map((session, index) => (

              <div
                key={index}
                className={`rounded-2xl border p-6 ${
                  index === 4
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <p className="text-sm text-gray-500">
                  {session.session}
                </p>

                <p className="text-3xl font-black mt-4">
                  {session.fillers}
                </p>

                <p className="text-sm text-gray-500">
                  filler words
                </p>

                <div className="mt-5">

                  <p className="text-sm text-gray-500">
                    Clarity
                  </p>

                  <p className="font-bold text-green-600 mt-1">
                    {session.clarity}%
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Progress Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Communication Progress Analytics
          </h2>

          {[
            ["Filler Word Reduction", 82],
            ["Speech Clarity", 84],
            ["Response Confidence", 87],
            ["Phrase Variety", 79],
            ["Overall Communication", 84],
          ].map(([label, value], index) => (

            <div
              key={index}
              className="mb-7"
            >

              <div className="flex justify-between mb-2">

                <span>
                  {label}
                </span>

                <span className="font-semibold">
                  {value}%
                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{
                    width: `${value}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Improvement Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Filler Word Reduction Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: "⏸️",
                title: "Use Pauses",
                description:
                  "Pause naturally instead of filling silence with words.",
              },
              {
                icon: "🎯",
                title: "Think Before Speaking",
                description:
                  "Take a moment to organize your answer before responding.",
              },
              {
                icon: "🗣️",
                title: "Practice Out Loud",
                description:
                  "Practice speaking answers rather than only reading them.",
              },
              {
                icon: "🎙️",
                title: "Record Yourself",
                description:
                  "Review recordings to identify recurring speech habits.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {item.icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Communication Readiness */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Interview Communication Readiness
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your communication is already clear and understandable.
                Reducing frequent filler words and repeated phrases will
                help your answers sound more polished, confident, and
                professional.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                84%
              </p>

              <p className="text-gray-500 mt-2">
                Good Readiness
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: "84%",
              }}
            />

          </div>

        </div>

        {/* Final AI Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                You have reduced filler words significantly across your
                practice sessions. Continue replacing filler words with
                intentional pauses and direct statements. Your goal is
                not to eliminate every natural pause, but to make your
                speech more deliberate and confident.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🎤
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Filler Reduction
              </h3>

              <p className="text-5xl font-black">
                56%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerFillerWordDetector;