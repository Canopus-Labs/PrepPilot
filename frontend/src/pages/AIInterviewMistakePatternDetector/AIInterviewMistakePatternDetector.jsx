import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Clock3,
  CheckCircle2,
  Sparkles,
  MessageSquareText,
  Lightbulb,
  RotateCcw,
  FileWarning,
  Search,
} from "lucide-react";

const AIInterviewMistakePatternDetector = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const stats = {
    sessionsAnalyzed: 24,
    recurringMistakes: 7,
    improvementScore: 72,
    highImpactIssues: 3,
  };

  const mistakeCategories = [
    {
      name: "Incorrect Complexity Analysis",
      shortName: "Complexity",
      occurrences: 8,
      severity: "High",
      trend: "Improving",
      score: 68,
      description:
        "You frequently identify the correct solution but occasionally provide incorrect time or space complexity.",
      recommendation:
        "Practice analyzing complexity immediately after explaining an algorithm.",
    },
    {
      name: "Missing Edge Cases",
      shortName: "Edge Cases",
      occurrences: 6,
      severity: "High",
      trend: "Needs Attention",
      score: 61,
      description:
        "Solutions sometimes focus on the normal input without explicitly considering boundary or unusual cases.",
      recommendation:
        "Use a short edge-case checklist before finalizing every coding solution.",
    },
    {
      name: "Incomplete Explanations",
      shortName: "Explanation",
      occurrences: 5,
      severity: "Medium",
      trend: "Improving",
      score: 76,
      description:
        "Your final answers are often correct, but some responses do not fully explain the reasoning behind your approach.",
      recommendation:
        "Explain why you selected an approach instead of only describing what the code does.",
    },
    {
      name: "Conceptual Errors",
      shortName: "Concepts",
      occurrences: 4,
      severity: "High",
      trend: "Needs Attention",
      score: 57,
      description:
        "Some incorrect responses are caused by gaps in foundational concepts.",
      recommendation:
        "Review prerequisite concepts before attempting advanced interview questions.",
    },
    {
      name: "Poor Answer Structure",
      shortName: "Structure",
      occurrences: 3,
      severity: "Medium",
      trend: "Improving",
      score: 82,
      description:
        "Some answers contain the correct information but present it in an unclear sequence.",
      recommendation:
        "Use a consistent structure: understanding, approach, implementation, complexity, conclusion.",
    },
    {
      name: "Time Management Issues",
      shortName: "Time",
      occurrences: 5,
      severity: "Medium",
      trend: "Improving",
      score: 79,
      description:
        "You occasionally spend too much time on difficult questions before moving forward.",
      recommendation:
        "Set checkpoints and move on temporarily when a question exceeds its target time.",
    },
    {
      name: "Insufficient Technical Examples",
      shortName: "Examples",
      occurrences: 2,
      severity: "Low",
      trend: "Improving",
      score: 88,
      description:
        "Some technical explanations would be stronger with a concrete example.",
      recommendation:
        "Add a small example whenever explaining an abstract technical concept.",
    },
  ];

  const sessions = [
    {
      session: "Mock Interview #24",
      date: "Today",
      mistakes: 3,
      accuracy: 84,
      topIssue: "Missing Edge Cases",
    },
    {
      session: "Mock Interview #23",
      date: "2 days ago",
      mistakes: 4,
      accuracy: 81,
      topIssue: "Complexity Analysis",
    },
    {
      session: "Technical Round #22",
      date: "5 days ago",
      mistakes: 5,
      accuracy: 76,
      topIssue: "Conceptual Errors",
    },
    {
      session: "Mock Interview #21",
      date: "1 week ago",
      mistakes: 6,
      accuracy: 72,
      topIssue: "Time Management",
    },
    {
      session: "Technical Round #20",
      date: "10 days ago",
      mistakes: 7,
      accuracy: 68,
      topIssue: "Complexity Analysis",
    },
  ];

  const filteredMistakes =
    selectedCategory === "All"
      ? mistakeCategories
      : mistakeCategories.filter(
          (mistake) => mistake.shortName === selectedCategory
        );

  const getSeverityClasses = (severity) => {
    if (severity === "High") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    if (severity === "Medium") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
  };

  const getTrendClasses = (trend) => {
    if (trend === "Improving") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center shrink-0">
            <Search
              size={34}
              className="text-red-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Mistake Pattern Detector
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Identify recurring mistakes across interview sessions and
              focus your preparation on the weaknesses that have the
              greatest impact on your performance.
            </p>
          </div>

        </div>

        {/* Overview Metrics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <BarChart3
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Sessions Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              {stats.sessionsAnalyzed}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <RotateCcw
              className="mx-auto text-red-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Recurring Mistakes
            </p>

            <p className="text-5xl font-black mt-3">
              {stats.recurringMistakes}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <TrendingUp
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Improvement Score
            </p>

            <p className="text-5xl font-black mt-3">
              {stats.improvementScore}%
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              High-Impact Issues
            </p>

            <p className="text-5xl font-black mt-3">
              {stats.highImpactIssues}
            </p>
          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Mistake Pattern Analysis
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            Instead of reviewing interview feedback one session at a
            time, AI compares your historical performance and identifies
            mistakes that repeatedly appear. This helps distinguish
            isolated mistakes from recurring weaknesses that require
            focused practice.
          </p>

        </div>

        {/* Top Priority Warning */}

        <div className="mt-10 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-3xl p-8">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="text-orange-500" />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Highest-Priority Improvement Area
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
                Your most recurring high-impact pattern is{" "}
                <strong>Incorrect Complexity Analysis</strong>. It has
                appeared in 8 sessions. Improving this single area could
                significantly strengthen your technical interview
                performance.
              </p>

            </div>

          </div>

        </div>

        {/* Category Filter */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

            <div>

              <h2 className="text-2xl font-bold">
                Mistake Categories
              </h2>

              <p className="text-gray-500 mt-2">
                Filter recurring mistakes by category.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              {[
                "All",
                "Complexity",
                "Edge Cases",
                "Explanation",
                "Concepts",
                "Structure",
                "Time",
                "Examples",
              ].map((category) => (

                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    selectedCategory === category
                      ? "bg-violet-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {category}
                </button>

              ))}

            </div>

          </div>

        </div>

        {/* Recurring Mistake Cards */}

        <div className="mt-10 grid lg:grid-cols-2 gap-6">

          {filteredMistakes.map((mistake, index) => (

            <div
              key={index}
              className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                    <FileWarning
                      size={24}
                      className="text-red-500"
                    />
                  </div>

                  <div>

                    <h3 className="text-xl font-bold">
                      {mistake.name}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {mistake.occurrences} occurrences across recent
                      sessions
                    </p>

                  </div>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityClasses(
                    mistake.severity
                  )}`}
                >
                  {mistake.severity}
                </span>

              </div>

              <p className="text-gray-500 mt-6 leading-7">
                {mistake.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                  <p className="text-sm text-gray-500">
                    Pattern Score
                  </p>

                  <p className="text-2xl font-black mt-1">
                    {mistake.score}%
                  </p>

                </div>

                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                  <p className="text-sm text-gray-500">
                    Trend
                  </p>

                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getTrendClasses(
                      mistake.trend
                    )}`}
                  >
                    {mistake.trend}
                  </span>

                </div>

              </div>

              <div className="mt-6 rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-5">

                <div className="flex items-center gap-2">

                  <Lightbulb
                    size={20}
                    className="text-violet-600"
                  />

                  <p className="font-bold">
                    AI Recommendation
                  </p>

                </div>

                <p className="text-gray-600 dark:text-gray-300 mt-2 leading-6">
                  {mistake.recommendation}
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* Pattern Frequency */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Mistake Frequency Analysis
            </h2>

          </div>

          <div className="space-y-7">

            {mistakeCategories.map((mistake, index) => (

              <div key={index}>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-2">

                  <span className="font-semibold">
                    {mistake.name}
                  </span>

                  <span className="text-gray-500">
                    {mistake.occurrences} occurrences
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                    style={{
                      width: `${Math.min(
                        mistake.occurrences * 10,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Session History */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquareText className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Interview Session History
            </h2>

          </div>

          <div className="space-y-4">

            {sessions.map((session, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                  <div>

                    <h3 className="font-bold text-lg">
                      {session.session}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {session.date}
                    </p>

                  </div>

                  <div className="grid grid-cols-3 gap-5">

                    <div>

                      <p className="text-sm text-gray-500">
                        Mistakes
                      </p>

                      <p className="font-black text-xl mt-1 text-red-500">
                        {session.mistakes}
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Accuracy
                      </p>

                      <p className="font-black text-xl mt-1 text-green-600">
                        {session.accuracy}%
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Top Issue
                      </p>

                      <p className="font-semibold mt-1">
                        {session.topIssue}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Improvement Trend */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Recurring Mistake Improvement Trend
            </h2>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

            {[
              {
                session: "Session 20",
                mistakes: 7,
                score: 54,
              },
              {
                session: "Session 21",
                mistakes: 6,
                score: 60,
              },
              {
                session: "Session 22",
                mistakes: 5,
                score: 65,
              },
              {
                session: "Session 23",
                mistakes: 4,
                score: 69,
              },
              {
                session: "Current",
                mistakes: 3,
                score: 72,
              },
            ].map((item, index) => (

              <div
                key={index}
                className={`rounded-2xl border p-5 ${
                  index === 4
                    ? "border-green-500 bg-green-50 dark:bg-green-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <p className="text-sm text-gray-500">
                  {item.session}
                </p>

                <p className="text-3xl font-black mt-4">
                  {item.mistakes}
                </p>

                <p className="text-sm text-gray-500">
                  recurring mistakes
                </p>

                <div className="mt-5">

                  <p className="text-sm text-gray-500">
                    Improvement
                  </p>

                  <p className="font-bold text-green-600 mt-1">
                    {item.score}%
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* High Impact Improvements */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              High-Impact Improvement Plan
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                priority: "01",
                title: "Master Complexity Analysis",
                description:
                  "After every algorithm, state time and space complexity and explain why.",
                impact: "High Impact",
              },
              {
                priority: "02",
                title: "Use an Edge-Case Checklist",
                description:
                  "Before submitting a solution, test empty, single-element, duplicate, boundary, and extreme inputs.",
                impact: "High Impact",
              },
              {
                priority: "03",
                title: "Review Weak Concepts",
                description:
                  "Identify foundational concepts behind incorrect answers and revise them before retrying.",
                impact: "High Impact",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex items-center justify-between">

                  <span className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center font-black">
                    {item.priority}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 text-xs font-semibold">
                    {item.impact}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* AI Personalized Report */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Personalized Mistake Report
            </h2>

          </div>

          <p className="text-white/90 leading-8">
            Your overall mistake frequency is decreasing, which indicates
            positive progress. However, complexity analysis, edge-case
            handling, and conceptual understanding remain the highest
            priority areas. Concentrating your next preparation sessions
            on these three areas should provide the greatest improvement
            in interview performance.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mt-8">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Strongest Improvement
              </p>

              <p className="text-2xl font-black mt-2">
                Time Management
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Biggest Weakness
              </p>

              <p className="text-2xl font-black mt-2">
                Complexity Analysis
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Next Priority
              </p>

              <p className="text-2xl font-black mt-2">
                Edge Cases
              </p>

            </div>

          </div>

        </div>

        {/* Mistake Prevention Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <h2 className="text-2xl font-bold mb-8">
            Interview Mistake Prevention Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: "🧠",
                title: "Understand First",
                description:
                  "Restate the problem and confirm assumptions before solving.",
              },
              {
                icon: "⚙️",
                title: "Explain Approach",
                description:
                  "Describe your solution before writing the implementation.",
              },
              {
                icon: "📊",
                title: "Check Complexity",
                description:
                  "Always verify time and space complexity before finishing.",
              },
              {
                icon: "🧪",
                title: "Test Edge Cases",
                description:
                  "Try boundary and unusual inputs before submitting.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {item.icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Overall Improvement Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Mistake Improvement
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your recurring mistake frequency has improved across
                recent sessions. Continue targeting high-impact patterns
                until they consistently disappear from your interview
                feedback.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-green-600">
                {stats.improvementScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Improving
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
              style={{
                width: `${stats.improvementScore}%`,
              }}
            />

          </div>

        </div>

        {/* Final AI Insight */}

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
                The goal is not to eliminate every individual mistake.
                The important step is identifying patterns that repeatedly
                affect your performance. Focus your preparation on the
                highest-impact recurring weaknesses, then use future
                interview sessions to verify whether those patterns are
                improving.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Improvement
              </h3>

              <p className="text-5xl font-black">
                {stats.improvementScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewMistakePatternDetector;