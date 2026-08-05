import React, { useState } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  FileText,
  Brain,
  Code2,
  Building2,
  CalendarDays,
} from "lucide-react";

const InterviewReadinessChecklist = () => {

  const [stats] = useState({
    readiness: 82,
    completed: 5,
    pending: 2,
    interviewDays: 3,
  });

  const [tasks, setTasks] = useState([
    {
      title: "Resume Updated",
      icon: FileText,
      completed: true,
    },
    {
      title: "Mock Interview Completed",
      icon: Brain,
      completed: true,
    },
    {
      title: "DSA Revision",
      icon: Code2,
      completed: false,
    },
    {
      title: "HR Interview Preparation",
      icon: CheckCircle2,
      completed: true,
    },
    {
      title: "Aptitude Practice",
      icon: Brain,
      completed: false,
    },
    {
      title: "Company Research",
      icon: Building2,
      completed: true,
    },
    {
      title: "Documents Prepared",
      icon: ClipboardCheck,
      completed: true,
    },
  ]);

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <ClipboardCheck
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              Interview Readiness Checklist

            </h1>

            <p className="text-gray-500 mt-2">

              Complete every important preparation task
              before your interview.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ClipboardCheck
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Readiness

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.readiness}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Completed

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completed}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Pending

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.pending}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CalendarDays
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Interview In

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.interviewDays} Days

            </p>

          </div>

        </div>

        {/* Interactive Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Preparation Checklist

          </h2>

          <div className="space-y-5">

            {tasks.map((task, index) => {

              const Icon = task.icon;

              return (

                <div
                  key={index}
                  className="flex items-center justify-between border border-gray-200 dark:border-white/10 rounded-2xl p-5"
                >

                  <div className="flex items-center gap-4">

                    <Icon
                      size={24}
                      className="text-violet-600"
                    />

                    <span className="font-semibold">

                      {task.title}

                    </span>

                  </div>

                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(index)}
                    className="w-5 h-5"
                  />

                </div>

              );

            })}

          </div>

        </div>

        {/* Readiness Score */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Overall Interview Readiness

          </h2>

          <div className="flex flex-col lg:flex-row justify-between items-center">

            <div>

              <p className="text-lg text-white/90">

                AI estimates your interview readiness at

              </p>

              <h1 className="text-7xl font-black mt-5">

                82%

              </h1>

            </div>

            <div className="text-center">

              <div className="text-7xl">

                ✅

              </div>

              <p className="mt-4 text-xl font-bold">

                Almost Ready

              </p>

            </div>

          </div>

        </div>

        {/* Interview Day Timeline */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Interview Day Timeline

          </h2>

          <div className="space-y-5">

            {[
              "Review resume",
              "Practice HR questions",
              "Revise key DSA topics",
              "Research the company",
              "Prepare required documents",
              "Join interview 15 minutes early",
            ].map((step, index) => (

              <div
                key={index}
                className="flex items-center gap-4 border-l-4 border-violet-600 pl-5 py-2"
              >

                <span className="font-bold">

                  {index + 1}.

                </span>

                <span>{step}</span>

              </div>

            ))}

          </div>

        </div>
                {/* AI Preparation Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Preparation Suggestions

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Complete one more mock interview before your interview day.</li>

            <li>• Revise Dynamic Programming and Graph algorithms.</li>

            <li>• Practice common HR questions with concise answers.</li>

            <li>• Research the company's latest products and interview experiences.</li>

            <li>• Keep multiple copies of your resume and required documents ready.</li>

          </ul>

        </div>

        {/* Readiness Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Readiness Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your preparation is progressing well. Most essential
            interview tasks have been completed, while DSA revision
            and aptitude practice still need additional attention.
            Completing these remaining tasks will significantly
            improve your overall interview readiness.

          </p>

        </div>

        {/* Last Minute Tips */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Last-minute Interview Tips

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Review your resume before the interview.",
              "Prepare 2–3 project explanations.",
              "Practice introducing yourself confidently.",
              "Keep a stable internet connection for virtual interviews.",
              "Sleep well before interview day.",
              "Stay calm and communicate clearly.",
            ].map((tip, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                {tip}

              </div>

            ))}

          </div>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                You're Almost Ready! 🚀

              </h2>

              <p className="leading-8 text-white/90">

                A successful interview starts with good preparation.
                Complete your checklist, stay confident, and trust
                your hard work. Every completed task brings you one
                step closer to your dream job.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🎯

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Ready Score

              </h3>

              <p className="text-5xl font-black">

                82%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default InterviewReadinessChecklist;