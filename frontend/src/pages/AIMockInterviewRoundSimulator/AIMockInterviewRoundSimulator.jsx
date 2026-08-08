import React, { useState } from "react";
import {
  Brain,
  Laptop,
  Code2,
  Cpu,
  Timer,
  Target,
  UserRound,
} from "lucide-react";

const AIMockInterviewRoundSimulator = () => {

  const [stats] = useState({
    completedRounds: 3,
    readiness: 87,
    averageScore: 84,
    totalSimulations: 12,
  });

  const [pipeline] = useState([
    {
      round: "Online Assessment",
      duration: "60 min",
      status: "Completed",
      score: 88,
    },
    {
      round: "Technical Round 1",
      duration: "45 min",
      status: "Completed",
      score: 82,
    },
    {
      round: "Technical Round 2",
      duration: "60 min",
      status: "In Progress",
      score: "--",
    },
    {
      round: "HR Interview",
      duration: "30 min",
      status: "Pending",
      score: "--",
    },
  ]);

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

              AI Mock Interview Round Simulator

            </h1>

            <p className="text-gray-500 mt-2">

              Experience a complete company hiring pipeline with
              AI-powered interview rounds, timers, scoring,
              personalized feedback, and final evaluation.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Laptop
              size={30}
              className="mx-auto text-violet-600"
            />

            <h3 className="mt-4 text-gray-500">

              Simulations

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.totalSimulations}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Readiness

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.readiness}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Code2
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Avg. Score

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.averageScore}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Cpu
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Completed

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completedRounds}

            </p>

          </div>

        </div>

        {/* Pipeline */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-8">

            Interview Pipeline

          </h2>

          <div className="space-y-5">

            {pipeline.map((item, index) => (

              <div
                key={index}
                className="bg-white/10 rounded-2xl p-6 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-bold text-xl">

                    {item.round}

                  </h3>

                  <p className="text-white/80 mt-2">

                    Duration: {item.duration}

                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold">

                    {item.status}

                  </p>

                  <p className="mt-2">

                    Score: {item.score}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Online Assessment */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Laptop className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Online Assessment

            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-6">

              <Timer className="text-red-500 mb-3" />

              <h3 className="font-bold">

                Timer

              </h3>

              <p className="mt-3">

                60 Minutes

              </p>

            </div>

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-6">

              <Code2 className="text-green-600 mb-3" />

              <h3 className="font-bold">

                Questions

              </h3>

              <p className="mt-3">

                3 Coding + 20 MCQs

              </p>

            </div>

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-6">

              <Target className="text-blue-600 mb-3" />

              <h3 className="font-bold">

                Score

              </h3>

              <p className="mt-3">

                88%

              </p>

            </div>

          </div>

        </div>

        {/* Technical Round 1 */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Technical Interview Round 1

          </h2>

          <div className="space-y-5">

            {[
              "Arrays & Strings",
              "Binary Trees",
              "Dynamic Programming",
              "Time Complexity Discussion",
            ].map((topic, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                💻 {topic}

              </div>

            ))}

          </div>

        </div>

        {/* Technical Round 2 */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Technical Interview Round 2

          </h2>

          <div className="space-y-5">

            {[
              "System Design",
              "Database Design",
              "Operating Systems",
              "Computer Networks",
            ].map((topic, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                🧠 {topic}

              </div>

            ))}

          </div>

        </div>
                {/* HR Interview */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <UserRound className="text-green-600" />

            <h2 className="text-2xl font-bold">

              HR Interview

            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Tell me about yourself",
              "Why do you want to join our company?",
              "Describe a challenging project.",
              "Where do you see yourself in 5 years?",
              "How do you handle conflicts within a team?",
            ].map((question, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                👤 {question}

              </div>

            ))}

          </div>

        </div>

        {/* Final Evaluation */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-8">

            Final Evaluation Report

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              ["Overall Score", "84%"],
              ["Communication", "86%"],
              ["Technical Skills", "82%"],
              ["Confidence", "88%"],
            ].map(([title, value], index) => (

              <div
                key={index}
                className="bg-white/10 rounded-2xl p-6 text-center"
              >

                <h3 className="text-white/80">

                  {title}

                </h3>

                <p className="text-4xl font-black mt-3">

                  {value}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* AI Feedback */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Feedback & Suggestions

          </h2>

          <div className="space-y-5">

            {[
              "Improve explanations during System Design discussions.",
              "Practice Dynamic Programming problems regularly.",
              "Increase confidence while answering HR questions.",
              "Speak more clearly during technical explanations.",
              "Attempt one complete mock interview every week.",
            ].map((feedback, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                💡 {feedback}

              </div>

            ))}

          </div>

        </div>

        {/* Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Performance Analytics

          </h2>

          {[
            ["Online Assessment", 88],
            ["Technical Round 1", 82],
            ["Technical Round 2", 79],
            ["HR Interview", 86],
            ["Overall Readiness", stats.readiness],
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

                Practice Like It's the Real Interview 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Simulate complete hiring pipelines, identify your
                strengths, improve weak areas, and gain confidence
                through realistic AI-powered interview experiences.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🎯

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Readiness

              </h3>

              <p className="text-5xl font-black">

                {stats.readiness}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIMockInterviewRoundSimulator;