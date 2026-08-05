import React, { useState } from "react";
import {
  Brain,
  Target,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Briefcase,
  Clock3,
} from "lucide-react";

const AILearningPathRecommendations = () => {

  const [goal, setGoal] = useState("Software Engineer");

  const [stats] = useState({
    completed: 26,
    progress: 81,
    readiness: 87,
    nextTime: "4 hrs",
  });

  const [completedTopics] = useState([
    {
      topic: "Arrays",
      progress: 100,
    },
    {
      topic: "Strings",
      progress: 100,
    },
    {
      topic: "Linked Lists",
      progress: 95,
    },
    {
      topic: "Trees",
      progress: 88,
    },
    {
      topic: "Sorting",
      progress: 92,
    },
  ]);

  const [weakAreas] = useState([
    "Dynamic Programming",
    "Graphs",
    "System Design",
    "Concurrency",
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

              AI Learning Path Recommendations

            </h1>

            <p className="text-gray-500 mt-2">

              Discover your next best learning topic using
              AI-powered recommendations based on your
              preparation history.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              size={30}
              className="mx-auto text-violet-600"
            />

            <h3 className="mt-4 text-gray-500">

              Topics Completed

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completed}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Progress

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.progress}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Readiness

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.readiness}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Next Module

            </h3>

            <p className="text-4xl font-black mt-3">

              {stats.nextTime}

            </p>

          </div>

        </div>

        {/* Career Goal */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Briefcase className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Career Goal

            </h2>

          </div>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full rounded-xl border dark:border-white/10 p-4 bg-white dark:bg-[#1f2937]"
          >

            <option>Software Engineer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
            <option>Machine Learning Engineer</option>
            <option>Data Scientist</option>

          </select>

        </div>

        {/* Completed Topics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Completed Topics

          </h2>

          {completedTopics.map((item, index) => (

            <div key={index} className="mb-7">

              <div className="flex justify-between mb-2">

                <span>{item.topic}</span>

                <span>{item.progress}%</span>

              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{
                    width: `${item.progress}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Weak Areas */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-orange-500" />

            <h2 className="text-2xl font-bold">

              Weak Areas

            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {weakAreas.map((topic, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                {topic}

              </div>

            ))}

          </div>

        </div>

        {/* Recommendation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Next Learning Recommendation

          </h2>

          <h1 className="text-5xl font-black">

            Dynamic Programming

          </h1>

          <p className="mt-5 text-lg leading-8">

            Based on your completed topics, assessment scores,
            and career goal of becoming a <strong>{goal}</strong>,
            AI recommends studying Dynamic Programming next.

          </p>

          <p className="mt-4">

            Estimated Completion Time:
            <strong> 4 Hours</strong>

          </p>

        </div>
                {/* Study Time Planner */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Available Study Time

          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {["1 Hour", "2 Hours", "4 Hours", "6+ Hours"].map((time, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center hover:border-violet-500 cursor-pointer transition"
              >

                <Clock3 className="mx-auto text-violet-600 mb-4" />

                <h3 className="font-semibold">{time}</h3>

              </div>

            ))}

          </div>

        </div>

        {/* Learning Timeline */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Estimated Learning Timeline

          </h2>

          {[
            ["Dynamic Programming", "4 hrs"],
            ["Graphs", "5 hrs"],
            ["System Design Basics", "6 hrs"],
            ["Concurrency", "3 hrs"],
          ].map(([topic, duration], index) => (

            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 py-5"
            >

              <span className="font-medium">{topic}</span>

              <span className="text-violet-600 font-bold">

                {duration}

              </span>

            </div>

          ))}

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Study Recommendations

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Complete Dynamic Programming before moving to Graphs.</li>

            <li>• Spend extra practice time on System Design concepts.</li>

            <li>• Solve at least 10 medium-level DP problems this week.</li>

            <li>• Revise previously completed topics every weekend.</li>

            <li>• Schedule one mock interview after completing each module.</li>

          </ul>

        </div>

        {/* Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Learning Progress Analytics

          </h2>

          {[
            ["Completed Topics", 81],
            ["Assessment Performance", 86],
            ["Revision Progress", 74],
            ["Interview Readiness", 87],
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

                Keep Learning Smarter 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Personalized learning paths help you focus on the
                right topics at the right time. Follow AI
                recommendations, strengthen weak areas, and build
                confidence for your upcoming interviews.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🎯

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Learning Score

              </h3>

              <p className="text-5xl font-black">

                87%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AILearningPathRecommendations;