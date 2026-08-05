import React, { useState } from "react";
import {
  Brain,
  Calendar,
  Target,
  Code2,
  BookOpen,
  Trophy,
  Flame,
} from "lucide-react";

const WeeklySummary = () => {
  const [summary] = useState({
    questionsSolved: 128,
    mockInterviews: 6,
    assessments: 4,
    flashcards: 320,
    studyStreak: 18,
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
                AI Weekly Preparation Summary
              </h1>

              <p className="text-gray-500 mt-2">

                View your interview preparation progress,
                achievements, and AI recommendations
                for the upcoming week.

              </p>

            </div>

          </div>

          <button className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold">

            Generate New Report

          </button>

        </div>

        {/* Weekly Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Code2
              size={32}
              className="mx-auto text-violet-600 mb-4"
            />

            <h3 className="text-gray-500">
              Questions Solved
            </h3>

            <p className="text-4xl font-black mt-3">
              {summary.questionsSolved}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Target
              size={32}
              className="mx-auto text-blue-600 mb-4"
            />

            <h3 className="text-gray-500">
              Mock Interviews
            </h3>

            <p className="text-4xl font-black mt-3">
              {summary.mockInterviews}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <BookOpen
              size={32}
              className="mx-auto text-green-600 mb-4"
            />

            <h3 className="text-gray-500">
              Assessments
            </h3>

            <p className="text-4xl font-black mt-3">
              {summary.assessments}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Trophy
              size={32}
              className="mx-auto text-yellow-500 mb-4"
            />

            <h3 className="text-gray-500">
              Flashcards
            </h3>

            <p className="text-4xl font-black mt-3">
              {summary.flashcards}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Flame
              size={32}
              className="mx-auto text-red-500 mb-4"
            />

            <h3 className="text-gray-500">
              Study Streak
            </h3>

            <p className="text-4xl font-black mt-3">
              🔥 {summary.studyStreak}
            </p>

          </div>

        </div>
                {/* AI Weekly Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Brain
              size={28}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              AI Weekly Analysis
            </h2>

          </div>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            This week you demonstrated consistent progress in
            interview preparation. Your DSA practice improved,
            mock interview participation increased,
            and your study streak remained active.

            Continue focusing on difficult topics while
            maintaining your current learning consistency.

          </p>

        </div>

        {/* Weekly Activity Overview */}

        <div className="mt-10 grid md:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <h2 className="text-2xl font-bold mb-6">
              Weekly Activities
            </h2>

            <div className="space-y-5">

              {[
                {
                  title: "DSA Practice",
                  progress: 88,
                },
                {
                  title: "Mock Interviews",
                  progress: 70,
                },
                {
                  title: "Resume Improvements",
                  progress: 92,
                },
                {
                  title: "Flashcard Revision",
                  progress: 80,
                },
              ].map((item, index) => (

                <div key={index}>

                  <div className="flex justify-between mb-2">

                    <span className="font-semibold">
                      {item.title}
                    </span>

                    <span className="font-bold">
                      {item.progress}%
                    </span>

                  </div>

                  <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                      style={{
                        width: `${item.progress}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Weakest Topics */}

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <h2 className="text-2xl font-bold mb-6">
              Weakest Topics
            </h2>

            <div className="space-y-4">

              {[
                "Dynamic Programming",
                "Operating Systems",
                "Computer Networks",
                "System Design",
                "Behavioral Interviews",
              ].map((topic, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center rounded-xl border border-gray-200 dark:border-white/10 p-4"
                >

                  <span className="font-medium">
                    {topic}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">

                    Needs Practice

                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Performance Insight */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white">

          <h2 className="text-3xl font-bold mb-5">
            AI Performance Insight
          </h2>

          <p className="leading-8 text-white/90">

            Your preparation consistency is excellent.
            Solving more advanced DSA problems and increasing
            mock interview practice will significantly improve
            your interview readiness score next week.

          </p>

        </div>
                {/* Personalized Goals */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Target
              size={28}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              Personalized Goals for Next Week
            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Solve 50 additional DSA questions.",
              "Complete 3 mock interviews.",
              "Revise Dynamic Programming concepts.",
              "Practice 30 HR interview questions.",
              "Maintain a 7-day study streak.",
              "Review 150 flashcards.",
            ].map((goal, index) => (

              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="w-7 h-7 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

                  {index + 1}

                </div>

                <p className="leading-7">
                  {goal}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Weekly Progress Dashboard */}

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-gray-500">
              Overall Progress
            </h3>

            <p className="text-5xl font-black mt-4 text-violet-600">
              87%
            </p>

            <p className="mt-4 text-gray-500">
              Excellent weekly improvement.
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-gray-500">
              Interview Readiness
            </h3>

            <p className="text-5xl font-black mt-4 text-green-600">
              82%
            </p>

            <p className="mt-4 text-gray-500">
              Almost interview ready.
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-gray-500">
              Productivity
            </h3>

            <p className="text-5xl font-black mt-4 text-orange-600">
              91%
            </p>

            <p className="mt-4 text-gray-500">
              Consistent daily learning.
            </p>

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Recommendations
          </h2>

          <div className="space-y-5">

            {[
              "Increase mock interview frequency to improve communication confidence.",
              "Spend more time practicing Dynamic Programming problems.",
              "Revise Operating Systems before technical interviews.",
              "Continue maintaining your study streak.",
              "Review flashcards daily for better retention.",
            ].map((item, index) => (

              <div
                key={index}
                className="flex gap-4 items-start"
              >

                <div className="w-3 h-3 rounded-full bg-violet-600 mt-2"></div>

                <p className="leading-7">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Export Weekly Report */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-5">
            Export Weekly Report
          </h2>

          <p className="leading-8 text-white/90 mb-8">

            Download your AI-generated weekly preparation
            summary as a PDF or share it with mentors,
            friends, or career coaches.

          </p>

          <div className="flex flex-wrap gap-4">

            <button className="px-6 py-3 rounded-xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition">

              Export PDF

            </button>

            <button className="px-6 py-3 rounded-xl border border-white hover:bg-white hover:text-violet-700 font-bold transition">

              Share Report

            </button>

          </div>

        </div>
                {/* AI Conclusion */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Weekly Conclusion
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            This week you demonstrated strong consistency in your
            interview preparation journey. Your DSA practice,
            flashcard revision, and mock interview participation
            have improved significantly.

            Continue focusing on your weaker topics while
            maintaining your current study streak. Small,
            consistent improvements each week will greatly
            increase your interview readiness.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Keep Growing Every Week 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every week is another opportunity to become a
                better engineer. Stay disciplined, keep solving
                problems, practice interviews consistently,
                and never stop learning.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📈

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Weekly Score

              </h3>

              <p className="text-5xl font-black">

                89%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default WeeklySummary;