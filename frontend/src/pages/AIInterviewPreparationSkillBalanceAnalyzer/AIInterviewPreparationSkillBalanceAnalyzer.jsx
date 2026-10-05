import React, { useMemo, useState } from "react";
import {
  Brain,
  Scale,
  Code2,
  BookOpen,
  MessageSquare,
  UserRound,
  FileText,
  Mic,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Target,
  BarChart3,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Clock3,
} from "lucide-react";

const AIInterviewPreparationSkillBalanceAnalyzer = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const [skills] = useState([
    {
      name: "Coding & Problem Solving",
      shortName: "Problem Solving",
      score: 88,
      hours: 18,
      activities: 42,
      target: 85,
      status: "Strong",
      icon: Code2,
      color: "blue",
      recommendation:
        "Maintain your current coding practice while allocating more time to communication and behavioral preparation.",
    },
    {
      name: "Technical Knowledge",
      shortName: "Technical",
      score: 81,
      hours: 12,
      activities: 31,
      target: 80,
      status: "Balanced",
      icon: BookOpen,
      color: "violet",
      recommendation:
        "Your technical foundation is strong. Continue reviewing weak concepts and system fundamentals.",
    },
    {
      name: "Communication",
      shortName: "Communication",
      score: 62,
      hours: 6,
      activities: 15,
      target: 75,
      status: "Needs Focus",
      icon: MessageSquare,
      color: "orange",
      recommendation:
        "Practice explaining technical solutions aloud and work on concise, structured answers.",
    },
    {
      name: "Behavioral Preparation",
      shortName: "Behavioral",
      score: 55,
      hours: 4,
      activities: 9,
      target: 75,
      status: "Needs Focus",
      icon: UserRound,
      color: "red",
      recommendation:
        "Prepare STAR-based stories for teamwork, conflict, leadership, failure, and problem-solving questions.",
    },
    {
      name: "Resume & Projects",
      shortName: "Resume",
      score: 74,
      hours: 7,
      activities: 12,
      target: 75,
      status: "Balanced",
      icon: FileText,
      color: "green",
      recommendation:
        "Review your projects and prepare measurable explanations for your technical contributions.",
    },
    {
      name: "Mock Interviews",
      shortName: "Mock Interviews",
      score: 68,
      hours: 5,
      activities: 6,
      target: 80,
      status: "Needs Focus",
      icon: Mic,
      color: "indigo",
      recommendation:
        "Increase mock interview frequency to improve time management, communication, and interview confidence.",
    },
  ]);

  const overallBalance = useMemo(() => {
    return Math.round(
      skills.reduce((sum, skill) => sum + skill.score, 0) /
        skills.length
    );
  }, [skills]);

  const totalHours = useMemo(() => {
    return skills.reduce((sum, skill) => sum + skill.hours, 0);
  }, [skills]);

  const totalActivities = useMemo(() => {
    return skills.reduce(
      (sum, skill) => sum + skill.activities,
      0
    );
  }, [skills]);

  const focusAreas = useMemo(() => {
    return skills.filter((skill) => skill.score < skill.target);
  }, [skills]);

  const strongAreas = useMemo(() => {
    return skills.filter((skill) => skill.score >= skill.target);
  }, [skills]);

  const balanceLabel = useMemo(() => {
    if (overallBalance >= 85) return "Excellent Balance";
    if (overallBalance >= 75) return "Good Balance";
    if (overallBalance >= 65) return "Developing Balance";
    return "Needs Attention";
  }, [overallBalance]);

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("recommendations");
    }, 800);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 65) return "text-orange-500";
    return "text-red-600";
  };

  const getStatusClass = (status) => {
    if (status === "Strong") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (status === "Balanced") {
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    }

    return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Scale size={34} className="text-violet-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Preparation Skill Balance Analyzer
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Analyze whether your interview preparation is balanced
              across technical, problem-solving, communication, and
              interview skills.
            </p>
          </div>

        </div>

        {/* Overview Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Scale
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Balance Score
            </p>

            <p className="text-5xl font-black mt-3">
              {overallBalance}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Skills Tracked
            </p>

            <p className="text-5xl font-black mt-3">
              {skills.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Preparation Hours
            </p>

            <p className="text-5xl font-black mt-3">
              {totalHours}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Activities Completed
            </p>

            <p className="text-5xl font-black mt-3">
              {totalActivities}
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-5">

                <Brain size={32} />

                <h2 className="text-2xl sm:text-3xl font-bold">
                  AI Skill Balance Engine
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-4xl">
                AI analyzes your preparation activity across coding,
                technical knowledge, communication, behavioral preparation,
                projects, and mock interviews to identify areas that are
                receiving too much or too little attention.
              </p>

            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition shrink-0 disabled:opacity-60"
            >

              {analyzing ? (
                <>
                  <RefreshCw
                    size={20}
                    className="animate-spin"
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Analyze Balance
                </>
              )}

            </button>

          </div>

        </div>

        {/* Balance Status */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Overall Preparation Balance
                </h2>

              </div>

              <p className="text-gray-500 mt-4 leading-7 max-w-2xl">
                Your current preparation shows a{" "}
                <span className="font-bold text-violet-600">
                  {balanceLabel.toLowerCase()}
                </span>
                . AI recommends increasing focus on areas that are below
                their target readiness levels.
              </p>

            </div>

            <div className="text-center">

              <div
                className={`text-7xl font-black ${getScoreColor(
                  overallBalance
                )}`}
              >
                {overallBalance}%
              </div>

              <p className="text-gray-500 mt-2">
                {balanceLabel}
              </p>

            </div>

          </div>

          <div className="mt-8">

            <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-green-500 transition-all"
                style={{
                  width: `${overallBalance}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["overview", "Skill Overview"],
            ["distribution", "Preparation Distribution"],
            ["recommendations", "AI Recommendations"],
          ].map(([tab, label]) => (

            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Skill Overview */}

        {activeTab === "overview" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-8">

              <Target className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Interview Skill Balance Map
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {skills.map((skill) => {

                const Icon = skill.icon;

                return (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => setSelectedSkill(skill)}
                    className="text-left rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:-translate-y-1 transition"
                  >

                    <div className="flex items-start justify-between gap-5">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                          <Icon
                            className="text-violet-600"
                            size={24}
                          />

                        </div>

                        <div>

                          <h3 className="text-lg font-bold">
                            {skill.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {skill.activities} activities · {skill.hours}{" "}
                            hours
                          </p>

                        </div>

                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(
                          skill.status
                        )}`}
                      >
                        {skill.status}
                      </span>

                    </div>

                    <div className="mt-7">

                      <div className="flex justify-between mb-2">

                        <span className="text-sm text-gray-500">
                          Skill readiness
                        </span>

                        <span
                          className={`font-black ${getScoreColor(
                            skill.score
                          )}`}
                        >
                          {skill.score}%
                        </span>

                      </div>

                      <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                        <div
                          className={`h-full rounded-full ${
                            skill.score >= 85
                              ? "bg-green-500"
                              : skill.score >= 75
                              ? "bg-blue-500"
                              : skill.score >= 65
                              ? "bg-orange-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${skill.score}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div className="flex justify-between mt-5 text-sm">

                      <span className="text-gray-500">
                        Target: {skill.target}%
                      </span>

                      <span className="text-violet-600 font-semibold">
                        View details →
                      </span>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>
        )}

        {/* Distribution */}

        {activeTab === "distribution" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Preparation Time Distribution
                </h2>

              </div>

              <div className="space-y-6">

                {skills.map((skill) => {

                  const percentage = Math.round(
                    (skill.hours / totalHours) * 100
                  );

                  return (
                    <div key={skill.name}>

                      <div className="flex justify-between mb-2">

                        <span className="font-semibold">
                          {skill.shortName}
                        </span>

                        <span className="text-gray-500">
                          {skill.hours}h · {percentage}%
                        </span>

                      </div>

                      <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                        <div
                          className="h-full bg-violet-600 rounded-full"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <TrendingUp className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Skill Readiness
                </h2>

              </div>

              <div className="space-y-6">

                {skills.map((skill) => (

                  <div
                    key={skill.name}
                    className="flex items-center gap-4"
                  >

                    <div className="w-32 sm:w-44 shrink-0">

                      <p className="font-semibold text-sm">
                        {skill.shortName}
                      </p>

                    </div>

                    <div className="flex-1 h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                      <div
                        className={`h-full rounded-full ${
                          skill.score >= 85
                            ? "bg-green-500"
                            : skill.score >= 75
                            ? "bg-blue-500"
                            : skill.score >= 65
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${skill.score}%`,
                        }}
                      />

                    </div>

                    <span
                      className={`font-black w-12 text-right ${getScoreColor(
                        skill.score
                      )}`}
                    >
                      {skill.score}%
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Sparkles className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                AI Personalized Recommendations
              </h2>

            </div>

            <div className="grid lg:grid-cols-3 gap-6">

              <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-6">

                <AlertTriangle
                  className="text-red-600"
                  size={28}
                />

                <h3 className="text-xl font-bold mt-4">
                  Highest Priority
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  Your behavioral preparation has the largest gap from
                  its target score.
                </p>

                <p className="text-3xl font-black text-red-600 mt-5">
                  55%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Target: 75%
                </p>

              </div>

              <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

                <MessageSquare
                  className="text-orange-500"
                  size={28}
                />

                <h3 className="text-xl font-bold mt-4">
                  Communication
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  Practice explaining technical solutions clearly and
                  answering questions concisely.
                </p>

                <p className="text-3xl font-black text-orange-500 mt-5">
                  62%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Target: 75%
                </p>

              </div>

              <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6">

                <Mic
                  className="text-blue-600"
                  size={28}
                />

                <h3 className="text-xl font-bold mt-4">
                  Mock Interviews
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  Increase mock sessions to combine technical knowledge
                  with communication under realistic conditions.
                </p>

                <p className="text-3xl font-black text-blue-600 mt-5">
                  68%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Target: 80%
                </p>

              </div>

            </div>

            <div className="mt-8 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

              <div className="flex items-start gap-4">

                <Brain
                  className="text-violet-600 shrink-0"
                  size={25}
                />

                <div>

                  <h3 className="font-bold">
                    AI Strategy
                  </h3>

                  <p className="text-gray-500 mt-2 leading-7">
                    Spend approximately 60% of your next preparation
                    sessions on behavioral preparation, communication,
                    and mock interviews. Keep the remaining time for
                    coding and technical revision to maintain your strong
                    areas.
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Focus Areas */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-7">

              <AlertTriangle className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Areas Needing Attention
              </h2>

            </div>

            <div className="space-y-4">

              {focusAreas.map((skill) => {

                const Icon = skill.icon;

                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-4 rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-5"
                  >

                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">

                      <Icon
                        className="text-orange-500"
                        size={22}
                      />

                    </div>

                    <div className="flex-1">

                      <h3 className="font-bold">
                        {skill.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {skill.score}% readiness · Target {skill.target}%
                      </p>

                    </div>

                    <ArrowRight
                      className="text-orange-500"
                      size={20}
                    />

                  </div>
                );
              })}

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-7">

              <CheckCircle2 className="text-green-600" />

              <h2 className="text-2xl font-bold">
                Strong Preparation Areas
              </h2>

            </div>

            <div className="space-y-4">

              {strongAreas.map((skill) => {

                const Icon = skill.icon;

                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-4 rounded-2xl bg-green-50 dark:bg-green-900/10 p-5"
                  >

                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">

                      <Icon
                        className="text-green-600"
                        size={22}
                      />

                    </div>

                    <div className="flex-1">

                      <h3 className="font-bold">
                        {skill.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {skill.score}% readiness
                      </p>

                    </div>

                    <CheckCircle2
                      className="text-green-600"
                      size={21}
                    />

                  </div>
                );
              })}

            </div>

          </div>

        </div>

        {/* Skill Detail */}

        {selectedSkill && (
          <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                  <selectedSkill.icon
                    className="text-violet-600"
                    size={28}
                  />

                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    {selectedSkill.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Detailed skill analysis
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold"
              >
                Close
              </button>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Readiness
                </p>

                <p
                  className={`text-3xl font-black mt-2 ${getScoreColor(
                    selectedSkill.score
                  )}`}
                >
                  {selectedSkill.score}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Target
                </p>

                <p className="text-3xl font-black mt-2">
                  {selectedSkill.target}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Study Time
                </p>

                <p className="text-3xl font-black mt-2">
                  {selectedSkill.hours}h
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Activities
                </p>

                <p className="text-3xl font-black mt-2">
                  {selectedSkill.activities}
                </p>

              </div>

            </div>

            <div className="mt-7 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

              <div className="flex items-center gap-3">

                <Lightbulb
                  className="text-violet-600"
                  size={22}
                />

                <h3 className="font-bold">
                  AI Recommendation
                </h3>

              </div>

              <p className="text-gray-500 mt-3 leading-7">
                {selectedSkill.recommendation}
              </p>

            </div>

          </div>
        )}

        {/* Preparation Strategy */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Preparation Strategy
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                💻
              </p>

              <h3 className="text-xl font-bold mt-4">
                Maintain Technical Strength
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Continue coding and technical revision without allowing
                these strong areas to consume all your preparation time.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🗣️
              </p>

              <h3 className="text-xl font-bold mt-4">
                Improve Communication
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Practice explaining your reasoning, projects, and technical
                decisions clearly and confidently.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎤
              </p>

              <h3 className="text-xl font-bold mt-4">
                Increase Mock Practice
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Use realistic mock interviews to combine all preparation
                skills under interview conditions.
              </p>

            </div>

          </div>

        </div>

        {/* Final Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <ShieldCheck size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your preparation is strongest in coding and technical
                knowledge, but communication, behavioral preparation, and
                mock interviews need more attention. A balanced preparation
                strategy will help you perform consistently across both
                technical and non-technical interview rounds.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                ⚖️
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Balance
              </h3>

              <p className="text-5xl font-black">
                {overallBalance}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationSkillBalanceAnalyzer;