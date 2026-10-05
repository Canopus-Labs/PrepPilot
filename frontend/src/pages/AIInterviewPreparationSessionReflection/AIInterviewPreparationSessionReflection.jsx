import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  BookOpen,
  Target,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  CalendarDays,
  Clock,
  BarChart3,
  RefreshCw,
  Award,
} from "lucide-react";

const AIInterviewPreparationSessionReflection = () => {
  const [reflection, setReflection] = useState({
    difficult:
      "Dynamic programming questions were difficult because I struggled to identify the correct state.",
    learned:
      "I learned how to break a problem into smaller states and compare recursive and iterative approaches.",
    improve:
      "I need more practice identifying DP patterns and explaining my approach before coding.",
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("reflection");
  const [analyzing, setAnalyzing] = useState(false);

  const sessionStats = {
    questions: 12,
    solved: 9,
    accuracy: 75,
    duration: "52 min",
    topics: ["Arrays", "Dynamic Programming", "Trees"],
    hints: 3,
    difficulty: "Medium",
  };

  const learningPoints = [
    "You improved your understanding of dynamic programming state selection.",
    "You successfully solved most array and tree questions independently.",
    "Your problem-solving accuracy remained above 70% during the session.",
  ];

  const improvementAreas = [
    "Practice identifying common dynamic programming patterns.",
    "Reduce dependency on hints for medium-level problems.",
    "Explain the solution approach before moving to implementation.",
  ];

  const nextSteps = [
    "Complete 5 medium-level dynamic programming questions.",
    "Review memoization and tabulation patterns.",
    "Attempt one timed DSA practice session tomorrow.",
  ];

  const reflectionHistory = [
    {
      date: "Aug 10, 2026",
      topic: "Dynamic Programming",
      reflection:
        "I struggled with recognizing the right state and recurrence relation.",
      score: 72,
    },
    {
      date: "Aug 7, 2026",
      topic: "Trees",
      reflection:
        "Tree traversal questions became easier after practicing recursive patterns.",
      score: 81,
    },
    {
      date: "Aug 4, 2026",
      topic: "Arrays",
      reflection:
        "I need to improve my speed on sliding window problems.",
      score: 76,
    },
  ];

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setSubmitted(true);
      setActiveTab("insights");
    }, 700);
  };

  const updateReflection = (field, value) => {
    setReflection((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <Brain size={34} className="text-violet-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Preparation Session Reflection
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Reflect on your preparation session and combine your personal
                experience with AI-powered performance insights.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Generating Reflection...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Generate AI Reflection
              </>
            )}
          </button>

        </div>

        {/* Session Summary */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <MessageSquare className="text-blue-600" size={28} />
            <p className="text-gray-500 mt-4">Questions</p>
            <p className="text-4xl font-black mt-2">
              {sessionStats.questions}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <CheckCircle2 className="text-green-600" size={28} />
            <p className="text-gray-500 mt-4">Solved</p>
            <p className="text-4xl font-black mt-2">
              {sessionStats.solved}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <BarChart3 className="text-violet-600" size={28} />
            <p className="text-gray-500 mt-4">Accuracy</p>
            <p className="text-4xl font-black mt-2">
              {sessionStats.accuracy}%
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <Clock className="text-orange-500" size={28} />
            <p className="text-gray-500 mt-4">Duration</p>
            <p className="text-3xl font-black mt-3">
              {sessionStats.duration}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <Lightbulb className="text-yellow-500" size={28} />
            <p className="text-gray-500 mt-4">Hints Used</p>
            <p className="text-4xl font-black mt-2">
              {sessionStats.hints}
            </p>
          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Reflect. Learn. Improve.
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI combines your personal reflection with objective session data
            to identify what you learned, where you struggled, and what you
            should focus on next.
          </p>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("reflection")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "reflection"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Session Reflection
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("insights")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "insights"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            AI Insights
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "history"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Reflection History
          </button>

        </div>

        {/* Reflection Form */}

        {activeTab === "reflection" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <MessageSquare className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Your Reflection
                </h2>

              </div>

              <div className="space-y-7">

                <div>

                  <label className="font-bold block mb-3">
                    What felt difficult?
                  </label>

                  <textarea
                    value={reflection.difficult}
                    onChange={(e) =>
                      updateReflection("difficult", e.target.value)
                    }
                    rows={5}
                    className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    placeholder="Describe what you found difficult..."
                  />

                </div>

                <div>

                  <label className="font-bold block mb-3">
                    What did you learn?
                  </label>

                  <textarea
                    value={reflection.learned}
                    onChange={(e) =>
                      updateReflection("learned", e.target.value)
                    }
                    rows={5}
                    className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    placeholder="Describe what you learned..."
                  />

                </div>

                <div>

                  <label className="font-bold block mb-3">
                    What should you improve?
                  </label>

                  <textarea
                    value={reflection.improve}
                    onChange={(e) =>
                      updateReflection("improve", e.target.value)
                    }
                    rows={5}
                    className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    placeholder="Describe what you want to improve..."
                  />

                </div>

              </div>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={analyzing}
                className="mt-8 w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition disabled:opacity-60"
              >
                <Sparkles size={20} />
                {analyzing
                  ? "Analyzing Your Reflection..."
                  : "Analyze My Reflection"}
              </button>

            </div>

            {/* Session Data */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Session Performance
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  ["Questions Attempted", "12"],
                  ["Questions Solved", "9"],
                  ["Accuracy", "75%"],
                  ["Hints Used", "3"],
                  ["Session Duration", "52 min"],
                  ["Difficulty", "Medium"],
                ].map(([label, value]) => (

                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl bg-gray-50 dark:bg-gray-800 p-5"
                  >

                    <span className="text-gray-500">
                      {label}
                    </span>

                    <span className="font-bold">
                      {value}
                    </span>

                  </div>

                ))}

              </div>

              <div className="mt-7">

                <p className="text-sm text-gray-500 mb-3">
                  Topics Practiced
                </p>

                <div className="flex flex-wrap gap-3">

                  {sessionStats.topics.map((topic) => (

                    <span
                      key={topic}
                      className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold"
                    >
                      {topic}
                    </span>

                  ))}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* AI Insights */}

        {activeTab === "insights" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Sparkles className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Reflection Summary
                </h2>

              </div>

              <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-7">

                <p className="text-lg leading-8">
                  Based on your reflection and session performance, your
                  biggest challenge was identifying dynamic programming
                  patterns. However, your accuracy remained strong and your
                  reflection shows that you understand the specific area
                  requiring improvement. Your next sessions should focus on
                  pattern recognition and explaining your approach before
                  implementation.
                </p>

              </div>

              <div className="mt-6 flex items-center gap-3 text-green-600 font-semibold">

                <CheckCircle2 size={20} />

                Reflection successfully combined with performance data.

              </div>

            </div>

            {/* Learning Points */}

            <div className="grid lg:grid-cols-3 gap-6">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3">

                  <BookOpen className="text-blue-600" />

                  <h2 className="text-xl font-bold">
                    Key Learning Points
                  </h2>

                </div>

                <div className="mt-6 space-y-4">

                  {learningPoints.map((point, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-2xl bg-blue-50 dark:bg-blue-900/10 p-4"
                    >

                      <CheckCircle2
                        size={20}
                        className="text-blue-600 shrink-0"
                      />

                      <p className="text-sm leading-6">
                        {point}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

              {/* Improvements */}

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3">

                  <Target className="text-orange-500" />

                  <h2 className="text-xl font-bold">
                    Improvement Areas
                  </h2>

                </div>

                <div className="mt-6 space-y-4">

                  {improvementAreas.map((area, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-4"
                    >

                      <Target
                        size={20}
                        className="text-orange-500 shrink-0"
                      />

                      <p className="text-sm leading-6">
                        {area}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

              {/* Next Steps */}

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3">

                  <ArrowRight className="text-green-600" />

                  <h2 className="text-xl font-bold">
                    Suggested Next Steps
                  </h2>

                </div>

                <div className="mt-6 space-y-4">

                  {nextSteps.map((step, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-2xl bg-green-50 dark:bg-green-900/10 p-4"
                    >

                      <span className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {index + 1}
                      </span>

                      <p className="text-sm leading-6">
                        {step}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Reflection History */}

        {activeTab === "history" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <CalendarDays className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Reflection History
              </h2>

            </div>

            <div className="space-y-5">

              {reflectionHistory.map((item, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <span className="font-bold">
                          {item.date}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                          {item.topic}
                        </span>

                      </div>

                      <p className="text-gray-500 mt-4 leading-6">
                        {item.reflection}
                      </p>

                    </div>

                    <div className="text-center shrink-0">

                      <p className="text-sm text-gray-500">
                        Session Score
                      </p>

                      <p className="text-3xl font-black text-violet-600 mt-1">
                        {item.score}%
                      </p>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* Reflection vs Performance */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Reflection + Performance Analysis
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Objective Performance
              </p>

              <p className="text-4xl font-black text-blue-600 mt-3">
                75%
              </p>

              <p className="text-gray-500 mt-3 leading-6">
                Your measurable performance based on accuracy, solved
                questions, hints, and session difficulty.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Self-Identified Challenge
              </p>

              <p className="text-2xl font-black text-orange-500 mt-3">
                Dynamic Programming
              </p>

              <p className="text-gray-500 mt-3 leading-6">
                Your reflection identifies DP pattern recognition as your
                primary challenge.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                AI Conclusion
              </p>

              <p className="text-2xl font-black text-green-600 mt-3">
                Focused Practice
              </p>

              <p className="text-gray-500 mt-3 leading-6">
                Both your performance and reflection point toward targeted
                dynamic programming practice.
              </p>

            </div>

          </div>

        </div>

        {/* Self Assessment Benefits */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Why Session Reflection Matters
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              {
                icon: "🧠",
                title: "Self-Awareness",
                description:
                  "Recognize challenges that statistics alone cannot reveal.",
              },
              {
                icon: "📊",
                title: "Better Feedback",
                description:
                  "Combine subjective experience with objective performance.",
              },
              {
                icon: "🔁",
                title: "Find Patterns",
                description:
                  "Identify recurring difficulties across multiple sessions.",
              },
              {
                icon: "🎯",
                title: "Better Planning",
                description:
                  "Turn reflection insights into focused next steps.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {item.icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* AI Reflection Process */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Reflection Process
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              ["1", "Collect", "Capture the user's reflection."],
              ["2", "Analyze", "Review session performance data."],
              ["3", "Combine", "Connect subjective and objective insights."],
              ["4", "Recommend", "Generate personalized next steps."],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl bg-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-white text-violet-600 flex items-center justify-center font-black">
                  {number}
                </div>

                <h3 className="text-xl font-bold mt-5">
                  {title}
                </h3>

                <p className="text-white/80 mt-3 leading-6">
                  {description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Reflection-Based Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 64,
              },
              {
                label: "Week 2",
                score: 71,
              },
              {
                label: "Week 3",
                score: 78,
              },
              {
                label: "Current",
                score: 86,
              },
            ].map((item) => (

              <div
                key={item.label}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center"
              >

                <p className="text-sm text-gray-500">
                  {item.label}
                </p>

                <p className="text-4xl font-black text-violet-600 mt-3">
                  {item.score}%
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                  <div
                    className="h-full bg-violet-600 rounded-full"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Personalized Recommendation
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Focus Area
              </p>

              <h3 className="text-xl font-bold mt-2">
                Dynamic Programming
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your reflection and performance both indicate that DP
                pattern recognition deserves additional practice.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Recommended Activity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Targeted Practice
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Complete several medium-level problems and explain the
                recurrence before writing code.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Reflection
              </p>

              <h3 className="text-xl font-bold mt-2">
                Reassess After Practice
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Reflect again after your next targeted session to determine
                whether the difficulty has decreased.
              </p>

            </div>

          </div>

        </div>

        {/* Final Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your reflection adds important context to your performance
                data. While your overall accuracy was good, you personally
                identified dynamic programming as difficult. AI therefore
                recommends targeted practice instead of simply increasing
                the overall difficulty of your preparation.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Session Score
              </h3>

              <p className="text-5xl font-black">
                {sessionStats.accuracy}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationSessionReflection;