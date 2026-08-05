import React, { useState } from "react";
import {
  FileDown,
  FileText,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const StatisticsExport = () => {

  const [stats] = useState({
    questionsSolved: 486,
    interviewScore: 91,
    skillAssessments: 18,
    studyStreak: 26,
  });

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <FileDown
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                Preparation Statistics Export

              </h1>

              <p className="text-gray-500 mt-2">

                Export your preparation statistics,
                interview performance, assessments,
                and study analytics as PDF or CSV.

              </p>

            </div>

          </div>

        </div>

        {/* Statistics Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <BarChart3
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Questions Solved

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.questionsSolved}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <TrendingUp
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              Interview Score

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.interviewScore}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <FileText
              size={30}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="text-gray-500">

              Assessments

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.skillAssessments}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <FileSpreadsheet
              size={30}
              className="mx-auto text-orange-500 mb-3"
            />

            <h3 className="text-gray-500">

              Study Streak

            </h3>

            <p className="text-5xl font-black mt-4">

              🔥 {stats.studyStreak}

            </p>

          </div>

        </div>
                {/* Export Actions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div>

              <h2 className="text-2xl font-bold">

                Export Preparation Report

              </h2>

              <p className="text-gray-500 mt-2">

                Download your preparation statistics and
                analytics in your preferred format.

              </p>

            </div>

            <div className="flex gap-4">

              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition">

                <FileText size={20} />

                Export PDF

              </button>

              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition">

                <FileSpreadsheet size={20} />

                Export CSV

              </button>

            </div>

          </div>

        </div>

        {/* Statistics Dashboard */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-8">

            Preparation Statistics

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              {
                title: "Questions Solved",
                value: "486",
                color: "text-violet-600",
              },
              {
                title: "Mock Interviews",
                value: "24",
                color: "text-green-600",
              },
              {
                title: "Skill Assessments",
                value: "18",
                color: "text-blue-600",
              },
              {
                title: "Resume Completion",
                value: "100%",
                color: "text-orange-500",
              },
              {
                title: "Flashcards Reviewed",
                value: "620",
                color: "text-pink-600",
              },
              {
                title: "Study Streak",
                value: "26 Days",
                color: "text-red-500",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 hover:shadow-lg transition"
              >

                <h3 className="text-gray-500">

                  {item.title}

                </h3>

                <p className={`text-5xl font-black mt-4 ${item.color}`}>

                  {item.value}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Performance Overview */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Performance Overview

          </h2>

          <div className="space-y-6">

            {[
              {
                label: "Interview Performance",
                progress: 91,
              },
              {
                label: "Technical Skills",
                progress: 87,
              },
              {
                label: "Aptitude",
                progress: 82,
              },
              {
                label: "Problem Solving",
                progress: 94,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.label}

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
                {/* Analytics Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Analytics Summary

          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <h3 className="text-gray-500">

                Weekly Growth

              </h3>

              <p className="text-5xl font-black text-green-600 mt-4">

                +12%

              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <h3 className="text-gray-500">

                Monthly Progress

              </h3>

              <p className="text-5xl font-black text-violet-600 mt-4">

                88%

              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <h3 className="text-gray-500">

                AI Readiness

              </h3>

              <p className="text-5xl font-black text-blue-600 mt-4">

                93%

              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <h3 className="text-gray-500">

                Consistency

              </h3>

              <p className="text-5xl font-black text-orange-500 mt-4">

                95%

              </p>

            </div>

          </div>

        </div>

        {/* Export History */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Export History

          </h2>

          <div className="space-y-5">

            {[
              {
                file: "Preparation_Report_July.pdf",
                date: "30 Jul 2026",
                type: "PDF",
              },
              {
                file: "Interview_Statistics.csv",
                date: "22 Jul 2026",
                type: "CSV",
              },
              {
                file: "Monthly_Report.pdf",
                date: "15 Jul 2026",
                type: "PDF",
              },
              {
                file: "Skill_Assessments.csv",
                date: "09 Jul 2026",
                type: "CSV",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div>

                  <h3 className="font-bold">

                    {item.file}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    {item.date}

                  </p>

                </div>

                <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-semibold">

                  {item.type}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* AI Report */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Report Insights

          </h2>

          <p className="leading-8 text-white/90">

            Your preparation has shown strong consistency over
            the last month. Technical interview performance,
            study streak, and assessment scores continue to
            improve steadily.

            AI recommends increasing Hard-level practice
            questions and participating in more mock interviews
            to further improve interview readiness.

          </p>

        </div>

        {/* Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Recommendations

          </h2>

          <div className="space-y-5">

            {[
              "Complete one mock interview every week.",
              "Maintain your study streak above 30 days.",
              "Practice 20 Hard-level DSA questions weekly.",
              "Review flashcards daily for better retention.",
              "Export your progress report every month to monitor improvements.",
            ].map((tip, index) => (

              <div
                key={index}
                className="flex gap-4 items-start rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

                  {index + 1}

                </div>

                <p className="leading-7">

                  {tip}

                </p>

              </div>

            ))}

          </div>

        </div>
                {/* AI Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Preparation Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Based on your preparation statistics, you have
            demonstrated consistent progress across interview
            practice, technical assessments, and study habits.

            Your strongest areas include interview performance,
            study consistency, and problem-solving accuracy.
            Continue reviewing your exported reports regularly
            to monitor long-term improvement and identify areas
            that need additional focus.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Track Progress, Achieve Success 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Your preparation data tells the story of your
                growth. Export your reports regularly, review
                your progress, and use those insights to make
                every study session more effective.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📊

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Overall Progress

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

export default StatisticsExport;