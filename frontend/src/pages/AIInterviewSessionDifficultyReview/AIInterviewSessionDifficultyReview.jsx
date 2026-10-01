import React, { useMemo, useState } from "react";
import {
  Brain,
  Gauge,
  Target,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  Lightbulb,
  Sparkles,
  TrendingUp,
  BarChart3,
  RefreshCw,
  ArrowRight,
  Award,
  HelpCircle,
  SkipForward,
  Trophy,
  Zap,
  CircleAlert,
  SlidersHorizontal,
} from "lucide-react";

const AIInterviewSessionDifficultyReview = () => {
  const [selectedSession, setSelectedSession] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [analyzing, setAnalyzing] = useState(false);

  const sessions = [
    {
      id: 1,
      title: "Frontend Development Mock Interview",
      date: "Today",
      role: "Frontend Developer",
      difficulty: "Medium",
      difficultyScore: 58,
      accuracy: 91,
      completionTime: 24,
      expectedTime: 30,
      hintsUsed: 1,
      skippedQuestions: 0,
      questionsTotal: 12,
      questionsAnswered: 12,
      score: 91,
      classification: "Too Easy",
      recommendation:
        "Increase the difficulty by introducing more advanced JavaScript, React architecture, and debugging questions.",
      strengths: [
        "High accuracy across the session.",
        "Completed every question.",
        "Used very few hints.",
      ],
      challenges: [
        "Most questions were answered quickly.",
        "Limited exposure to advanced scenarios.",
        "Question difficulty was below your current ability.",
      ],
      nextDifficulty: "Medium-Hard",
      nextFocus: [
        "Advanced React patterns",
        "Performance optimization",
        "Complex debugging scenarios",
      ],
    },
    {
      id: 2,
      title: "Data Structures & Algorithms Interview",
      date: "Yesterday",
      role: "Software Engineer",
      difficulty: "Medium-Hard",
      difficultyScore: 76,
      accuracy: 79,
      completionTime: 34,
      expectedTime: 35,
      hintsUsed: 3,
      skippedQuestions: 1,
      questionsTotal: 15,
      questionsAnswered: 14,
      score: 79,
      classification: "Well Balanced",
      recommendation:
        "Maintain the current difficulty and gradually introduce more graph and dynamic programming problems.",
      strengths: [
        "Good balance between speed and accuracy.",
        "Successfully solved several challenging problems.",
        "Used hints strategically.",
      ],
      challenges: [
        "Dynamic programming questions took longer.",
        "One question was skipped.",
        "Graph problems require more practice.",
      ],
      nextDifficulty: "Medium-Hard",
      nextFocus: [
        "Graph algorithms",
        "Dynamic programming",
        "Time complexity analysis",
      ],
    },
    {
      id: 3,
      title: "Backend Engineering Mock Interview",
      date: "3 days ago",
      role: "Backend Developer",
      difficulty: "Hard",
      difficultyScore: 88,
      accuracy: 67,
      completionTime: 44,
      expectedTime: 35,
      hintsUsed: 7,
      skippedQuestions: 2,
      questionsTotal: 15,
      questionsAnswered: 13,
      score: 67,
      classification: "Challenging",
      recommendation:
        "Keep the challenging level but focus on system design and database fundamentals before increasing difficulty further.",
      strengths: [
        "Attempted most difficult questions.",
        "Demonstrated strong problem-solving persistence.",
        "Completed several advanced backend scenarios.",
      ],
      challenges: [
        "Several questions required multiple hints.",
        "Completion time exceeded the target.",
        "Two questions were skipped.",
      ],
      nextDifficulty: "Hard",
      nextFocus: [
        "System design",
        "Database optimization",
        "API architecture",
      ],
    },
    {
      id: 4,
      title: "System Design Advanced Interview",
      date: "1 week ago",
      role: "Software Engineer",
      difficulty: "Expert",
      difficultyScore: 96,
      accuracy: 42,
      completionTime: 52,
      expectedTime: 35,
      hintsUsed: 11,
      skippedQuestions: 4,
      questionsTotal: 14,
      questionsAnswered: 10,
      score: 42,
      classification: "Too Difficult",
      recommendation:
        "Reduce the difficulty temporarily and strengthen system design fundamentals before returning to expert-level questions.",
      strengths: [
        "Attempted complex architecture questions.",
        "Showed willingness to solve difficult problems.",
        "Identified several important system components.",
      ],
      challenges: [
        "Accuracy dropped significantly.",
        "Many hints were required.",
        "Several questions were skipped.",
      ],
      nextDifficulty: "Medium-Hard",
      nextFocus: [
        "System design fundamentals",
        "Scalability concepts",
        "Database architecture",
      ],
    },
  ];

  const selected = sessions[selectedSession];

  const averageAccuracy = useMemo(() => {
    return Math.round(
      sessions.reduce(
        (sum, session) => sum + session.accuracy,
        0
      ) / sessions.length
    );
  }, []);

  const averageDifficulty = useMemo(() => {
    return Math.round(
      sessions.reduce(
        (sum, session) => sum + session.difficultyScore,
        0
      ) / sessions.length
    );
  }, []);

  const balancedSessions = sessions.filter(
    (session) => session.classification === "Well Balanced"
  ).length;

  const challengingSessions = sessions.filter(
    (session) =>
      session.classification === "Challenging"
  ).length;

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("overview");
    }, 800);
  };

  const getClassificationColor = (classification) => {
    switch (classification) {
      case "Too Easy":
        return "text-blue-600";
      case "Well Balanced":
        return "text-green-600";
      case "Challenging":
        return "text-orange-500";
      case "Too Difficult":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const getClassificationBg = (classification) => {
    switch (classification) {
      case "Too Easy":
        return "bg-blue-100 dark:bg-blue-900/20";
      case "Well Balanced":
        return "bg-green-100 dark:bg-green-900/20";
      case "Challenging":
        return "bg-orange-100 dark:bg-orange-900/20";
      case "Too Difficult":
        return "bg-red-100 dark:bg-red-900/20";
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  const getDifficultyBar = (score) => {
    if (score >= 85) return "bg-red-500";
    if (score >= 70) return "bg-orange-500";
    if (score >= 50) return "bg-violet-500";
    return "bg-blue-500";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Gauge
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Session Difficulty Review
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Understand whether your mock interview was too easy,
              well balanced, challenging, or too difficult.
            </p>
          </div>

        </div>

        {/* Overview Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Sessions Reviewed
            </p>

            <p className="text-5xl font-black mt-3">
              {sessions.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Average Accuracy
            </p>

            <p className="text-5xl font-black mt-3">
              {averageAccuracy}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Gauge
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Avg Difficulty
            </p>

            <p className="text-5xl font-black mt-3">
              {averageDifficulty}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Balanced Sessions
            </p>

            <p className="text-5xl font-black mt-3">
              {balancedSessions}
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Difficulty Review Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            The AI evaluates question difficulty, accuracy, completion
            time, hints used, and skipped questions to determine whether
            each mock interview provided an appropriate level of challenge.
          </p>

        </div>

        {/* Session Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Session
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {sessions.map((session, index) => (

              <button
                key={session.id}
                type="button"
                onClick={() => {
                  setSelectedSession(index);
                  setActiveTab("overview");
                }}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedSession === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-start justify-between gap-5">

                  <div>

                    <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm font-semibold">
                      {session.difficulty}
                    </span>

                    <h3 className="font-bold text-lg mt-4">
                      {session.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {session.role} • {session.date}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-2 rounded-xl text-sm font-bold ${getClassificationBg(
                      session.classification
                    )} ${getClassificationColor(
                      session.classification
                    )}`}
                  >
                    {session.classification}
                  </span>

                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">

                  <div>

                    <p className="text-sm text-gray-500">
                      Accuracy
                    </p>

                    <p className="text-xl font-black mt-1">
                      {session.accuracy}%
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Time
                    </p>

                    <p className="text-xl font-black mt-1">
                      {session.completionTime}m
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Hints
                    </p>

                    <p className="text-xl font-black mt-1">
                      {session.hintsUsed}
                    </p>

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Session */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row justify-between gap-6">

            <div>

              <p className="text-sm text-gray-500">
                Selected Interview Session
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {selected.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {selected.role} • {selected.date}
              </p>

            </div>

            <div className="text-center">

              <span
                className={`inline-block px-5 py-3 rounded-2xl text-lg font-bold ${getClassificationBg(
                  selected.classification
                )} ${getClassificationColor(
                  selected.classification
                )}`}
              >
                {selected.classification}
              </span>

              <p className="text-gray-500 mt-3">
                AI Session Classification
              </p>

            </div>

          </div>

        </div>

        {/* Review Tabs */}

        <div className="mt-8 flex flex-wrap gap-3">

          {[
            ["overview", "AI Review"],
            ["metrics", "Session Metrics"],
            ["strengths", "Strengths & Challenges"],
            ["recommendation", "Next Session"],
          ].map(([value, label]) => (

            <button
              key={value}
              type="button"
              onClick={() => setActiveTab(value)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === value
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* AI Review */}

        {activeTab === "overview" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Sparkles className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Difficulty Assessment
                </h2>

              </div>

              <div className="flex justify-center py-6">

                <div
                  className={`w-56 h-56 rounded-full flex items-center justify-center ${getClassificationBg(
                    selected.classification
                  )}`}
                >

                  <div className="text-center">

                    <Gauge
                      size={42}
                      className={`mx-auto ${getClassificationColor(
                        selected.classification
                      )}`}
                    />

                    <p
                      className={`text-3xl font-black mt-4 ${getClassificationColor(
                        selected.classification
                      )}`}
                    >
                      {selected.classification}
                    </p>

                    <p className="text-gray-500 mt-2">
                      Difficulty Fit
                    </p>

                  </div>

                </div>

              </div>

              <p className="text-gray-500 leading-7">
                Based on your accuracy, time management, hint usage,
                skipped questions, and the difficulty of the questions,
                this session was classified as{" "}
                <strong>
                  {selected.classification.toLowerCase()}
                </strong>.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Brain className="text-indigo-600" />

                <h2 className="text-2xl font-bold">
                  Why This Classification?
                </h2>

              </div>

              <div className="space-y-4">

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <div className="flex items-center gap-3">

                    <Target
                      size={21}
                      className="text-violet-600"
                    />

                    <span className="font-semibold">
                      Accuracy
                    </span>

                    <span className="ml-auto font-black">
                      {selected.accuracy}%
                    </span>

                  </div>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <div className="flex items-center gap-3">

                    <Clock3
                      size={21}
                      className="text-blue-600"
                    />

                    <span className="font-semibold">
                      Completion Time
                    </span>

                    <span className="ml-auto font-black">
                      {selected.completionTime}m
                    </span>

                  </div>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <div className="flex items-center gap-3">

                    <HelpCircle
                      size={21}
                      className="text-orange-500"
                    />

                    <span className="font-semibold">
                      Hints Used
                    </span>

                    <span className="ml-auto font-black">
                      {selected.hintsUsed}
                    </span>

                  </div>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <div className="flex items-center gap-3">

                    <SkipForward
                      size={21}
                      className="text-red-500"
                    />

                    <span className="font-semibold">
                      Skipped Questions
                    </span>

                    <span className="ml-auto font-black">
                      {selected.skippedQuestions}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Metrics */}

        {activeTab === "metrics" && (

          <div className="mt-6 grid md:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Target className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Accuracy
                </h2>

              </div>

              <div className="flex items-center justify-between">

                <p className="text-6xl font-black text-green-600">
                  {selected.accuracy}%
                </p>

                <Award
                  size={55}
                  className="text-green-600"
                />

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 mt-7 overflow-hidden">

                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${selected.accuracy}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5">
                Higher accuracy generally indicates that the current
                difficulty is manageable.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Clock3 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Completion Time
                </h2>

              </div>

              <div className="flex items-center justify-between">

                <p className="text-6xl font-black text-blue-600">
                  {selected.completionTime}m
                </p>

                <Clock3
                  size={55}
                  className="text-blue-600"
                />

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 mt-7 overflow-hidden">

                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${Math.min(
                      (selected.completionTime /
                        selected.expectedTime) *
                        100,
                      100
                    )}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5">
                Expected completion time:{" "}
                <strong>
                  {selected.expectedTime} minutes
                </strong>
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <HelpCircle className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Hint Usage
                </h2>

              </div>

              <p className="text-6xl font-black text-orange-500">
                {selected.hintsUsed}
              </p>

              <p className="text-gray-500 mt-3">
                hints used during the session
              </p>

              <div className="grid grid-cols-2 gap-4 mt-7">

                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                  <p className="text-sm text-gray-500">
                    Questions
                  </p>

                  <p className="text-2xl font-black mt-1">
                    {selected.questionsTotal}
                  </p>

                </div>

                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                  <p className="text-sm text-gray-500">
                    Hint Rate
                  </p>

                  <p className="text-2xl font-black mt-1">
                    {Math.round(
                      (selected.hintsUsed /
                        selected.questionsTotal) *
                        100
                    )}%
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <SkipForward className="text-red-500" />

                <h2 className="text-2xl font-bold">
                  Skipped Questions
                </h2>

              </div>

              <p className="text-6xl font-black text-red-500">
                {selected.skippedQuestions}
              </p>

              <p className="text-gray-500 mt-3">
                questions skipped during the session
              </p>

              <div className="mt-7 rounded-xl bg-red-50 dark:bg-red-900/10 p-5">

                <p className="font-semibold text-red-700 dark:text-red-400">
                  Completion Rate
                </p>

                <p className="text-3xl font-black text-red-600 mt-2">
                  {Math.round(
                    (selected.questionsAnswered /
                      selected.questionsTotal) *
                      100
                  )}%
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Strengths & Challenges */}

        {activeTab === "strengths" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <CheckCircle2 className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  What Went Well
                </h2>

              </div>

              <div className="space-y-4">

                {selected.strengths.map((strength, index) => (

                  <div
                    key={index}
                    className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-5"
                  >

                    <div className="flex items-start gap-3">

                      <CheckCircle2
                        size={22}
                        className="text-green-600 shrink-0 mt-0.5"
                      />

                      <p className="font-semibold leading-6">
                        {strength}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <CircleAlert className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Areas to Improve
                </h2>

              </div>

              <div className="space-y-4">

                {selected.challenges.map((challenge, index) => (

                  <div
                    key={index}
                    className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-5"
                  >

                    <div className="flex items-start gap-3">

                      <AlertTriangle
                        size={22}
                        className="text-orange-500 shrink-0 mt-0.5"
                      />

                      <p className="font-semibold leading-6">
                        {challenge}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Recommendation */}

        {activeTab === "recommendation" && (

          <div className="mt-6">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Lightbulb className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  AI Recommendation for Next Session
                </h2>

              </div>

              <div
                className={`rounded-2xl p-7 ${getClassificationBg(
                  selected.classification
                )}`}
              >

                <div className="flex items-center gap-4">

                  <Sparkles
                    size={30}
                    className={getClassificationColor(
                      selected.classification
                    )}
                  />

                  <h3 className="text-xl font-bold">
                    Recommended Difficulty:{" "}
                    {selected.nextDifficulty}
                  </h3>

                </div>

                <p className="leading-7 text-gray-600 dark:text-gray-300 mt-5">
                  {selected.recommendation}
                </p>

              </div>

              <div className="mt-8">

                <h3 className="text-xl font-bold">
                  Recommended Focus Areas
                </h3>

                <div className="grid md:grid-cols-3 gap-5 mt-5">

                  {selected.nextFocus.map((focus, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                    >

                      <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                        <Target
                          size={21}
                          className="text-violet-600"
                        />

                      </div>

                      <h4 className="font-bold mt-4">
                        {focus}
                      </h4>

                      <p className="text-gray-500 text-sm mt-2">
                        Include targeted practice in this area before
                        increasing the interview difficulty.
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Difficulty Scale */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <SlidersHorizontal className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Difficulty Classification Scale
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                title: "Too Easy",
                description:
                  "High accuracy, fast completion, and minimal hint usage.",
                icon: "🟦",
                color: "text-blue-600",
              },
              {
                title: "Well Balanced",
                description:
                  "Good accuracy with reasonable time and moderate challenge.",
                icon: "🟢",
                color: "text-green-600",
              },
              {
                title: "Challenging",
                description:
                  "Lower accuracy or higher time, but the session remains productive.",
                icon: "🟠",
                color: "text-orange-500",
              },
              {
                title: "Too Difficult",
                description:
                  "Low accuracy, excessive hints, long completion time, or many skips.",
                icon: "🔴",
                color: "text-red-600",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-3xl">
                  {item.icon}
                </div>

                <h3
                  className={`text-xl font-bold mt-4 ${item.color}`}
                >
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Difficulty Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Session Difficulty Comparison
            </h2>

          </div>

          <div className="space-y-7">

            {sessions.map((session) => (

              <div key={session.id}>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">

                  <span className="font-semibold">
                    {session.title}
                  </span>

                  <span
                    className={`font-bold ${getClassificationColor(
                      session.classification
                    )}`}
                  >
                    {session.classification}
                  </span>

                </div>

                <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className={`h-full rounded-full ${getDifficultyBar(
                      session.difficultyScore
                    )}`}
                    style={{
                      width: `${session.difficultyScore}%`,
                    }}
                  />

                </div>

                <div className="flex justify-between mt-2 text-sm text-gray-500">

                  <span>
                    Difficulty: {session.difficultyScore}/100
                  </span>

                  <span>
                    Accuracy: {session.accuracy}%
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Session Trend */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Interview Difficulty Trend
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {sessions.map((session) => (

              <div
                key={session.id}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center"
              >

                <p className="text-sm text-gray-500">
                  {session.date}
                </p>

                <p className="text-4xl font-black text-violet-600 mt-3">
                  {session.difficultyScore}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  difficulty score
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                  <div
                    className={`h-full rounded-full ${getDifficultyBar(
                      session.difficultyScore
                    )}`}
                    style={{
                      width: `${session.difficultyScore}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Difficulty Review Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Accuracy Matters
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                High accuracy may indicate that the current interview
                difficulty is below your ability level.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                ⏱️
              </p>

              <h3 className="text-xl font-bold mt-4">
                Time Reveals Challenge
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Completion time helps identify whether questions require
                an appropriate amount of reasoning.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Use Challenge Strategically
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                The goal is not maximum difficulty. The goal is productive
                challenge that improves your skills.
              </p>

            </div>

          </div>

        </div>

        {/* Personalized Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Personalized Session Strategy
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Current Performance
              </p>

              <h3 className="text-xl font-bold mt-2">
                {selected.accuracy}% Accuracy
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your current accuracy suggests that the selected session
                provides a{" "}
                {selected.classification.toLowerCase()} level of challenge.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Recommended Difficulty
              </p>

              <h3 className="text-xl font-bold mt-2">
                {selected.nextDifficulty}
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                This level should provide a productive challenge without
                overwhelming your current skill level.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Main Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Improve Consistency
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Maintain accuracy while gradually improving speed,
                independence, and performance on challenging questions.
              </p>

            </div>

          </div>

        </div>

        {/* Analyze Button */}

        <div className="mt-10 flex justify-center">

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-violet-600 text-white font-bold text-lg hover:bg-violet-700 transition disabled:opacity-60"
          >

            {analyzing ? (
              <>
                <RefreshCw
                  size={22}
                  className="animate-spin"
                />
                Reviewing Session...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Re-analyze Session Difficulty
              </>
            )}

          </button>

        </div>

        {/* Final Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Zap size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your interview difficulty should adapt to your actual
                performance rather than relying only on predefined
                difficulty labels. Based on this session, the AI recommends
                <strong> {selected.nextDifficulty}</strong> for your next
                interview and suggests focusing on{" "}
                {selected.nextFocus.join(", ")}.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Next Level
              </h3>

              <p className="text-4xl font-black">
                {selected.nextDifficulty}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewSessionDifficultyReview;