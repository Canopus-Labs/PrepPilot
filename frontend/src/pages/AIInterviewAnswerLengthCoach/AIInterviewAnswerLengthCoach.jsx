import React, { useState } from "react";
import {
  Brain,
  Clock3,
  MessageSquare,
  Target,
  Scissors,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

const AIInterviewAnswerLengthCoach = () => {
  const [stats] = useState({
    answerScore: 86,
    averageDuration: "1m 48s",
    idealDuration: "1m 30s",
    clarityScore: 89,
  });

  const [answerType, setAnswerType] = useState("Technical");

  const technicalAnswers = [
    {
      question: "Explain how a hash table works.",
      duration: "2m 10s",
      score: 82,
      status: "Slightly Long",
    },
    {
      question: "What is the difference between BFS and DFS?",
      duration: "1m 22s",
      score: 94,
      status: "Excellent",
    },
    {
      question: "Explain database indexing.",
      duration: "2m 05s",
      score: 81,
      status: "Needs Concision",
    },
  ];

  const behavioralAnswers = [
    {
      question: "Tell me about yourself.",
      duration: "1m 35s",
      score: 91,
      status: "Excellent",
    },
    {
      question: "Describe a difficult team situation.",
      duration: "2m 20s",
      score: 78,
      status: "Too Long",
    },
    {
      question: "What is your greatest strength?",
      duration: "1m 12s",
      score: 88,
      status: "Good",
    },
  ];

  const answers =
    answerType === "Technical"
      ? technicalAnswers
      : behavioralAnswers;

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Brain
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Answer Length Coach
            </h1>

            <p className="text-gray-500 mt-2">
              Learn to deliver concise, complete, and well-structured
              interview answers with AI-powered response coaching.
            </p>

          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <MessageSquare
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Answer Quality
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.answerScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Avg. Duration
            </h3>

            <p className="text-4xl font-black mt-3">
              {stats.averageDuration}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Ideal Duration
            </h3>

            <p className="text-4xl font-black mt-3">
              {stats.idealDuration}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Clarity Score
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.clarityScore}%
            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            AI Answer Length Analysis
          </h2>

          <p className="leading-8 text-white/90">
            The AI coach evaluates how long your answers are, detects
            unnecessary repetition, identifies missing key points,
            and recommends an ideal response duration based on the
            interview question and question type.
          </p>

        </div>

        {/* Answer Type Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Answer Type
            </h2>

          </div>

          <div className="flex flex-wrap gap-4">

            {["Technical", "Behavioral"].map((type) => (

              <button
                key={type}
                onClick={() => setAnswerType(type)}
                className={`px-6 py-3 rounded-xl font-semibold transition ${
                  answerType === type
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                }`}
              >
                {type}
              </button>

            ))}

          </div>

        </div>

        {/* Response Length Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Clock3 className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Response Length Analysis
            </h2>

          </div>

          <div className="space-y-6">

            {answers.map((answer, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                  <div>

                    <h3 className="font-bold text-lg">
                      {answer.question}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Response duration: {answer.duration}
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
                      {answer.score}%
                    </span>

                    <span className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      {answer.status}
                    </span>

                  </div>

                </div>

                <div className="mt-5">

                  <div className="flex justify-between mb-2">

                    <span className="text-sm">
                      Answer Efficiency
                    </span>

                    <span className="text-sm">
                      {answer.score}%
                    </span>

                  </div>

                  <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                      style={{
                        width: `${answer.score}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Technical Answer Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Technical Answer Analysis
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              ["Average Duration", "1m 52s"],
              ["Technical Accuracy", "91%"],
              ["Conciseness", "84%"],
            ].map(([label, value], index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <p className="text-gray-500">
                  {label}
                </p>

                <p className="text-4xl font-black mt-3">
                  {value}
                </p>

              </div>

            ))}

          </div>

          <div className="mt-8 rounded-xl bg-blue-50 dark:bg-blue-900/10 p-6">

            <h3 className="font-bold text-lg">
              Technical Coaching
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
              Your technical answers demonstrate strong understanding.
              Focus on presenting the main concept first, followed by
              one relevant example instead of explaining every detail.
            </p>

          </div>

        </div>

        {/* Behavioral Answer Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Behavioral Answer Analysis
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              ["Average Duration", "1m 41s"],
              ["Structure Quality", "88%"],
              ["Clarity", "92%"],
            ].map(([label, value], index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <p className="text-gray-500">
                  {label}
                </p>

                <p className="text-4xl font-black mt-3">
                  {value}
                </p>

              </div>

            ))}

          </div>

          <div className="mt-8 rounded-xl bg-green-50 dark:bg-green-900/10 p-6">

            <h3 className="font-bold text-lg">
              Behavioral Coaching
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
              Your behavioral responses are generally well structured.
              Use a clear Situation, Task, Action, and Result structure
              and avoid repeating the same context multiple times.
            </p>

          </div>

        </div>
                {/* Repetition Detection */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Scissors className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Repetition Detection
            </h2>

          </div>

          <div className="space-y-5">

            {[
              "The phrase 'basically' was repeated 4 times.",
              "The explanation of the project background was repeated twice.",
              "The same technical example appeared in multiple responses.",
              "Several filler phrases can be removed for a more direct answer.",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-orange-200 dark:border-orange-900/20 p-5"
              >

                🔁 {item}

              </div>

            ))}

          </div>

        </div>

        {/* Missing Important Points */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-red-500" />

            <h2 className="text-2xl font-bold">
              Missing Important Points
            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Mention the time complexity when explaining algorithms.",
              "Include the measurable result when describing projects.",
              "Connect your technical explanation to a practical example.",
              "Clearly state your individual contribution in team projects.",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-red-200 dark:border-red-900/20 p-5"
              >

                ⚠️ {item}

              </div>

            ))}

          </div>

        </div>

        {/* AI Concise Answer */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Scissors />

            <h2 className="text-3xl font-bold">
              AI Concise Answer Suggestion
            </h2>

          </div>

          <div className="rounded-2xl bg-white/10 p-6">

            <p className="leading-8">
              Instead of explaining every implementation detail,
              start with the core concept, explain the key approach,
              provide one short example, and finish with the
              complexity or result. This keeps the answer complete
              while reducing unnecessary explanation.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            {[
              ["Current", "2m 10s"],
              ["Recommended", "1m 30s"],
              ["Time Saved", "40s"],
            ].map(([label, value], index) => (

              <div
                key={index}
                className="bg-white/10 rounded-2xl p-6 text-center"
              >

                <p className="text-white/70">
                  {label}
                </p>

                <p className="text-3xl font-black mt-2">
                  {value}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Ideal Response Duration */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Ideal Response Duration
          </h2>

          {[
            ["Technical Concept", "60–90 seconds", 75],
            ["Coding Explanation", "90–120 seconds", 85],
            ["Behavioral Question", "90–120 seconds", 82],
            ["Tell Me About Yourself", "60–90 seconds", 78],
          ].map(([label, duration, score], index) => (

            <div key={index} className="mb-7">

              <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-2">

                <span className="font-semibold">
                  {label}
                </span>

                <span className="text-gray-500">
                  {duration}
                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${score}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Communication Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            AI Communication Recommendations
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Start with the direct answer before adding details.",
              "Use short examples instead of multiple examples.",
              "Avoid filler words and repeated phrases.",
              "Pause briefly instead of using unnecessary words.",
              "Use STAR structure for behavioral questions.",
              "End answers confidently without unnecessary summaries.",
            ].map((tip, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                💡 {tip}

              </div>

            ))}

          </div>

        </div>

        {/* Answer Efficiency Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Answer Efficiency Analytics
          </h2>

          {[
            ["Answer Quality", stats.answerScore],
            ["Response Conciseness", 84],
            ["Key Point Coverage", 91],
            ["Communication Clarity", stats.clarityScore],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Say More With Less 🚀
              </h2>

              <p className="leading-8 text-white/90">
                Strong interview answers are not about speaking for
                the longest time. They are about communicating the
                right information clearly, confidently, and efficiently.
                Use AI coaching to make every answer more focused.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                ⏱️
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Ideal Duration
              </h3>

              <p className="text-5xl font-black">
                {stats.idealDuration}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIInterviewAnswerLengthCoach;