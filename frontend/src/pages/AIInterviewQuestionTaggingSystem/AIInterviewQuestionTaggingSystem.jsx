import React, { useState } from "react";
import {
  Brain,
  Tags,
  Filter,
  Database,
  BarChart3,
  Layers,
  Search,
} from "lucide-react";

const AIInterviewQuestionTaggingSystem = () => {

  const [stats] = useState({
    totalQuestions: 1284,
    totalTags: 54,
    aiTagged: 1198,
    filterAccuracy: 96,
  });

  const [filters, setFilters] = useState({
    topic: "All Topics",
    difficulty: "All Levels",
    round: "All Rounds",
  });

  const topicTags = [
    "Data Structures",
    "Algorithms",
    "System Design",
    "Behavioral",
    "HR",
    "Database",
    "Operating Systems",
    "Computer Networks",
  ];

  const difficultyTags = [
    "Easy",
    "Medium",
    "Hard",
  ];

  const roundTags = [
    "Online Assessment",
    "Technical",
    "Managerial",
    "HR",
  ];

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Tags
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Interview Question Tagging System

            </h1>

            <p className="text-gray-500 mt-2">

              Automatically organize interview questions using
              AI-generated tags for easier searching, filtering,
              and navigation.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Database
              size={30}
              className="mx-auto text-violet-600"
            />

            <h3 className="mt-4 text-gray-500">

              Questions

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.totalQuestions}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Tags
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              AI Tags

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.totalTags}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Tagged

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.aiTagged}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Accuracy

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.filterAccuracy}%

            </p>

          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Tagging Overview

          </h2>

          <p className="leading-8 text-white/90">

            AI automatically analyzes interview questions and
            assigns relevant topic, company, difficulty,
            and interview-round tags to improve search,
            recommendation, and organization.

          </p>

        </div>

        {/* Filters */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Filter className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Multi-Tag Filters

            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <select
              value={filters.topic}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  topic: e.target.value,
                })
              }
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            >
              <option>All Topics</option>
              {topicTags.map((tag) => (
                <option key={tag}>{tag}</option>
              ))}
            </select>

            <select
              value={filters.difficulty}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  difficulty: e.target.value,
                })
              }
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            >
              <option>All Levels</option>
              {difficultyTags.map((tag) => (
                <option key={tag}>{tag}</option>
              ))}
            </select>

            <select
              value={filters.round}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  round: e.target.value,
                })
              }
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            >
              <option>All Rounds</option>
              {roundTags.map((tag) => (
                <option key={tag}>{tag}</option>
              ))}
            </select>

          </div>

        </div>

        {/* Topic Tags */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Layers className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Topic Tags

            </h2>

          </div>

          <div className="flex flex-wrap gap-4">

            {topicTags.map((tag, index) => (

              <span
                key={index}
                className="px-5 py-3 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-medium"
              >

                #{tag}

              </span>

            ))}

          </div>

        </div>

        {/* Difficulty & Round Tags */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Difficulty Tags

            </h2>

            <div className="flex flex-wrap gap-4">

              {difficultyTags.map((tag, index) => (

                <span
                  key={index}
                  className="px-5 py-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                >

                  {tag}

                </span>

              ))}

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Interview Round Tags

            </h2>

            <div className="flex flex-wrap gap-4">

              {roundTags.map((tag, index) => (

                <span
                  key={index}
                  className="px-5 py-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                >

                  {tag}

                </span>

              ))}

            </div>

          </div>

        </div>
                {/* Company-Specific Tags */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Search className="text-blue-600" />

            <h2 className="text-2xl font-bold">

              Company-Specific Tags

            </h2>

          </div>

          <div className="flex flex-wrap gap-4">

            {[
              "Google",
              "Amazon",
              "Microsoft",
              "Meta",
              "Apple",
              "Netflix",
              "Adobe",
              "Flipkart",
              "Uber",
              "Goldman Sachs",
            ].map((company, index) => (

              <span
                key={index}
                className="px-5 py-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              >

                #{company}

              </span>

            ))}

          </div>

        </div>

        {/* Tag Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Tag Usage Analytics

          </h2>

          {[
            ["Data Structures", 92],
            ["Algorithms", 88],
            ["System Design", 73],
            ["Behavioral", 65],
            ["HR", 61],
          ].map(([tag, usage], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{tag}</span>

                <span>{usage}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{ width: `${usage}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Tag Recommendations

          </h2>

          <ul className="space-y-4">

            <li>• Add "Dynamic Programming" tags to graph-related questions.</li>

            <li>• Include company-specific tags for recent interview experiences.</li>

            <li>• Apply interview-round tags to improve search precision.</li>

            <li>• Tag behavioral questions by leadership and teamwork themes.</li>

            <li>• Review untagged questions for automatic categorization.</li>

          </ul>

        </div>

        {/* Popular Tags */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Most Popular Tags

          </h2>

          <div className="flex flex-wrap gap-4">

            {[
              "#Arrays",
              "#DynamicProgramming",
              "#Trees",
              "#Graphs",
              "#Recursion",
              "#Google",
              "#Amazon",
              "#TechnicalRound",
              "#Behavioral",
              "#Medium",
            ].map((tag, index) => (

              <span
                key={index}
                className="px-5 py-3 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 font-medium"
              >

                {tag}

              </span>

            ))}

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Find Questions Faster 🚀

              </h2>

              <p className="leading-8 text-white/90">

                AI-powered tagging makes it easier to discover relevant
                interview questions, organize preparation efficiently,
                and focus on the topics that matter most for your target
                companies and interview rounds.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🏷️

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Tagged

              </h3>

              <p className="text-5xl font-black">

                {stats.aiTagged}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIInterviewQuestionTaggingSystem;