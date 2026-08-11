import React, { useState } from "react";
import {
  Brain,
  TrendingDown,
  Target,
  BookOpen,
  BarChart3,
} from "lucide-react";

const WeakTopicsDashboard = () => {

  const [stats] = useState({
    readiness: 78,
    weakTopics: 5,
    practiceCompleted: 42,
    streak: 14,
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Brain
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                Personalized Weak Topics Dashboard

              </h1>

              <p className="text-gray-500 mt-2">

                AI identifies your weakest interview topics
                and recommends where to focus next.

              </p>

            </div>

          </div>

        </div>

        {/* Overview Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Readiness Score

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.readiness}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <TrendingDown
              size={30}
              className="mx-auto text-red-500 mb-3"
            />

            <h3 className="text-gray-500">

              Weak Topics

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.weakTopics}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <BookOpen
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              Practice Sessions

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.practiceCompleted}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <BarChart3
              size={30}
              className="mx-auto text-orange-500 mb-3"
            />

            <h3 className="text-gray-500">

              Study Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

        </div>
                {/* Weak Topics Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingDown
              size={26}
              className="text-red-500"
            />

            <h2 className="text-2xl font-bold">
              Weak Topics Analysis
            </h2>

          </div>

          <div className="space-y-8">

            {[
              {
                topic: "Dynamic Programming",
                accuracy: 42,
                confidence: "Low",
              },
              {
                topic: "Operating Systems",
                accuracy: 55,
                confidence: "Medium",
              },
              {
                topic: "Computer Networks",
                accuracy: 59,
                confidence: "Medium",
              },
              {
                topic: "System Design",
                accuracy: 35,
                confidence: "Low",
              },
              {
                topic: "Behavioral Interviews",
                accuracy: 63,
                confidence: "Good",
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between items-center mb-3">

                  <div>

                    <h3 className="text-lg font-bold">
                      {item.topic}
                    </h3>

                    <p className="text-gray-500">

                      Accuracy: {item.accuracy}%

                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      item.confidence === "Low"
                        ? "bg-red-100 text-red-700"
                        : item.confidence === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >

                    {item.confidence}

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
                    style={{
                      width: `${item.accuracy}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Topic Ranking */}

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            {
              rank: "#1",
              topic: "System Design",
              score: "35%",
            },
            {
              rank: "#2",
              topic: "Dynamic Programming",
              score: "42%",
            },
            {
              rank: "#3",
              topic: "Operating Systems",
              score: "55%",
            },
          ].map((item, index) => (

            <div
              key={index}
              className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 text-center"
            >

              <div className="text-5xl font-black text-violet-600">

                {item.rank}

              </div>

              <h3 className="text-2xl font-bold mt-5">

                {item.topic}

              </h3>

              <p className="mt-4 text-gray-500">

                Current Accuracy

              </p>

              <p className="text-4xl font-black text-red-500 mt-3">

                {item.score}

              </p>

            </div>

          ))}

        </div>
                {/* AI Improvement Suggestions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain
              size={26}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              AI Improvement Suggestions
            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Spend 30 minutes daily solving Dynamic Programming problems.",
              "Revise Operating Systems process scheduling and memory management.",
              "Practice Computer Networks interview questions twice a week.",
              "Learn System Design fundamentals with small-scale design problems.",
              "Take one mock interview every weekend to improve confidence.",
            ].map((item, index) => (

              <div
                key={index}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

                  {index + 1}

                </div>

                <p className="leading-7">

                  {item}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Recommended Practice Plan */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Recommended Practice Plan

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                day: "Monday",
                task: "Dynamic Programming Practice",
              },
              {
                day: "Tuesday",
                task: "Operating Systems Revision",
              },
              {
                day: "Wednesday",
                task: "Computer Networks Quiz",
              },
              {
                day: "Thursday",
                task: "System Design Basics",
              },
              {
                day: "Friday",
                task: "Behavioral Interview Questions",
              },
              {
                day: "Weekend",
                task: "Mock Interview Session",
              },
            ].map((plan, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <h3 className="text-lg font-bold">

                  {plan.day}

                </h3>

                <p className="text-gray-500 mt-3">

                  {plan.task}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Weekly Improvement Trend */}

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Weekly Improvement

            </h3>

            <p className="text-5xl font-black text-green-600 mt-4">

              +12%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Problems Solved

            </h3>

            <p className="text-5xl font-black text-violet-600 mt-4">

              87

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              AI Confidence

            </h3>

            <p className="text-5xl font-black text-blue-600 mt-4">

              91%

            </p>

          </div>

        </div>

        {/* Personalized Action Plan */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            Personalized Action Plan

          </h2>

          <p className="leading-8 text-white/90">

            Your strongest opportunity for improvement is
            Dynamic Programming and System Design.
            Following the recommended weekly practice plan
            consistently can significantly improve your
            interview readiness over the coming weeks.

          </p>

        </div>
                {/* AI Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Weak Topics Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Based on your recent interview preparation,
            your weakest areas are Dynamic Programming,
            System Design, and Operating Systems.

            Focusing on these topics with consistent
            daily practice and mock interviews can
            significantly improve your overall interview
            readiness score and confidence.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Turn Weakness Into Strength 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every expert once struggled with difficult
                topics. Practice consistently, review your
                mistakes, and trust the learning process.

                Small improvements every day lead to
                outstanding interview performance.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📈

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Improvement Potential

              </h3>

              <p className="text-5xl font-black">

                93%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default WeakTopicsDashboard;