import React, { useState } from "react";
import {
  Clock3,
  Brain,
  Calendar,
  BarChart3,
  Target,
  Flame,
} from "lucide-react";

const TimeManagementAdvisor = () => {

  const [stats] = useState({
    studyHours: 32,
    productivity: 91,
    streak: 18,
    efficiency: 88,
  });

  const [schedule] = useState([
    {
      topic: "Data Structures",
      hours: 8,
      progress: 85,
    },
    {
      topic: "Algorithms",
      hours: 6,
      progress: 72,
    },
    {
      topic: "System Design",
      hours: 5,
      progress: 60,
    },
    {
      topic: "Operating Systems",
      hours: 4,
      progress: 70,
    },
    {
      topic: "DBMS",
      hours: 5,
      progress: 78,
    },
    {
      topic: "Computer Networks",
      hours: 4,
      progress: 65,
    },
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Clock3
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Time Management Advisor

            </h1>

            <p className="text-gray-500 mt-2">

              Optimize your interview preparation schedule
              using AI-powered study recommendations.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              size={30}
              className="mx-auto text-violet-600"
            />

            <h3 className="mt-4 text-gray-500">

              Study Hours

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.studyHours}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Productivity

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.productivity}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Flame
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Study Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Efficiency

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.efficiency}%

            </p>

          </div>

        </div>

        {/* Topic Allocation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Recommended Time Per Topic

          </h2>

          {schedule.map((item, index) => (

            <div
              key={index}
              className="mb-8"
            >

              <div className="flex justify-between mb-2">

                <span className="font-semibold">

                  {item.topic}

                </span>

                <span>

                  {item.hours} hrs/week

                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

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

        {/* Daily Study Schedule */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Calendar className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Daily Study Schedule

            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              ["09:00 - 10:30", "Data Structures"],
              ["10:45 - 12:00", "Algorithms"],
              ["02:00 - 03:30", "System Design"],
              ["04:00 - 05:00", "DBMS Revision"],
              ["07:00 - 08:00", "Mock Interview"],
              ["08:15 - 09:00", "Flashcard Revision"],
            ].map(([time, task], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-bold">

                    {task}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    {time}

                  </p>

                </div>

                <Target className="text-violet-600" />

              </div>

            ))}

          </div>

        </div>

        {/* Weekly Balance */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white">

          <h2 className="text-2xl font-bold mb-6">

            Weekly Study Balance

          </h2>

          <p className="leading-8 text-white/90">

            AI recommends maintaining a balance of
            40% coding practice,
            25% core CS subjects,
            20% mock interviews,
            and 15% revision to maximize
            interview performance.

          </p>

        </div>
                {/* Weak Topic Focus */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Weak Topic Focus

          </h2>

          <div className="space-y-6">

            {[
              {
                topic: "System Design",
                recommendation: "Increase practice by 2 hours this week.",
                score: "60%",
              },
              {
                topic: "Computer Networks",
                recommendation: "Revise networking protocols and solve interview questions.",
                score: "65%",
              },
              {
                topic: "Algorithms",
                recommendation: "Practice Dynamic Programming and Graph problems.",
                score: "72%",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 flex flex-col lg:flex-row justify-between gap-6"
              >

                <div>

                  <h3 className="text-xl font-bold">

                    {item.topic}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    {item.recommendation}

                  </p>

                </div>

                <span className="px-5 py-3 rounded-full bg-red-100 text-red-700 font-semibold h-fit">

                  {item.score}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Revision Planner */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Revision Planner

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Monday • Data Structures Revision",
              "Tuesday • DBMS + SQL",
              "Wednesday • Operating Systems",
              "Thursday • Algorithms",
              "Friday • System Design",
              "Saturday • Mock Interview",
              "Sunday • Weekly Revision",
            ].map((plan, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                {plan}

              </div>

            ))}

          </div>

        </div>

        {/* Productivity */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Productivity Analytics

          </h2>

          {[
            ["Focus Time", 92],
            ["Revision Completion", 87],
            ["Mock Interview Practice", 81],
            ["Coding Consistency", 89],
          ].map(([title, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{title}</span>

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

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Recommendations

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Spend 30% more time on System Design this week.</li>

            <li>• Revise Computer Networks before attempting mock interviews.</li>

            <li>• Schedule coding practice during your most productive hours.</li>

            <li>• Reserve Sunday for complete weekly revision.</li>

            <li>• Maintain at least one mock interview every week.</li>

          </ul>

        </div>

        {/* Personalized Study Plan */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Personalized Study Plan

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Based on your preparation history, AI recommends
            allocating more time to weak subjects while
            maintaining regular revision for stronger topics.
            This balanced schedule is expected to improve your
            interview readiness and long-term retention.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Study Smarter, Not Longer 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Effective time management is the key to interview
                success. Focus more on weaker topics, revise
                consistently, and trust AI recommendations to
                maximize your productivity.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                ⏰

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Time Score

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

export default TimeManagementAdvisor;