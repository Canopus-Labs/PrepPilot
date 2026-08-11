import React, { useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  TrendingUp,
  CheckCircle2,
  Clock3,
  Award,
  AlertTriangle,
  BookOpen,
  Code2,
  Mic,
  FileText,
  Flame,
  BarChart3,
  Lightbulb,
  CalendarDays,
  ArrowRight,
  RefreshCw,
  Trophy,
  Zap,
} from "lucide-react";

const AIInterviewPreparationMilestoneRecommendations = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [generating, setGenerating] = useState(false);

  const milestones = [
    {
      id: 1,
      title: "Complete Arrays & Strings Practice",
      description:
        "Solve targeted Arrays and Strings questions to strengthen your DSA fundamentals.",
      category: "Technical",
      priority: "Critical",
      progress: 72,
      current: 18,
      target: 25,
      unit: "questions",
      daysLeft: 5,
      icon: Code2,
      color: "red",
      reason:
        "Your recent DSA performance shows that Arrays and Strings are important improvement areas.",
    },
    {
      id: 2,
      title: "Complete 3 Technical Mock Interviews",
      description:
        "Practice realistic technical interviews and improve your ability to explain solutions under pressure.",
      category: "Mock Interviews",
      priority: "High Priority",
      progress: 67,
      current: 2,
      target: 3,
      unit: "interviews",
      daysLeft: 8,
      icon: Mic,
      color: "orange",
      reason:
        "Additional mock interviews will help improve technical communication and interview confidence.",
    },
    {
      id: 3,
      title: "Achieve 80% in DSA Assessment",
      description:
        "Complete a timed DSA assessment and reach the recommended target score.",
      category: "Assessment",
      priority: "High Priority",
      progress: 81,
      current: 81,
      target: 80,
      unit: "%",
      daysLeft: 7,
      icon: BarChart3,
      color: "orange",
      reason:
        "Your assessment accuracy is already close to the recommended target.",
    },
    {
      id: 4,
      title: "Complete System Design Fundamentals",
      description:
        "Study core system design concepts including scalability, caching, databases, and load balancing.",
      category: "Technical",
      priority: "Recommended",
      progress: 45,
      current: 9,
      target: 20,
      unit: "topics",
      daysLeft: 12,
      icon: BookOpen,
      color: "yellow",
      reason:
        "System design is an important skill for your target software engineering role.",
    },
    {
      id: 5,
      title: "Finalize Resume Preparation",
      description:
        "Review your resume and ensure projects, achievements, and technical skills are clearly presented.",
      category: "Resume",
      priority: "Recommended",
      progress: 60,
      current: 3,
      target: 5,
      unit: "tasks",
      daysLeft: 10,
      icon: FileText,
      color: "yellow",
      reason:
        "Completing your resume preparation will improve readiness for recruiter and behavioral discussions.",
    },
    {
      id: 6,
      title: "Maintain a 7-Day Preparation Streak",
      description:
        "Complete at least one meaningful preparation activity every day for seven consecutive days.",
      category: "Consistency",
      priority: "Optional",
      progress: 71,
      current: 5,
      target: 7,
      unit: "days",
      daysLeft: 3,
      icon: Flame,
      color: "green",
      reason:
        "Consistent preparation helps maintain momentum and reduces last-minute preparation pressure.",
    },
  ];

  const categories = [
    "All",
    "Technical",
    "Mock Interviews",
    "Assessment",
    "Resume",
    "Consistency",
  ];

  const filteredMilestones =
    activeFilter === "All"
      ? milestones
      : milestones.filter(
          (milestone) => milestone.category === activeFilter
        );

  const completedMilestones = milestones.filter(
    (milestone) => milestone.progress >= 100
  ).length;

  const averageProgress = useMemo(() => {
    return Math.round(
      milestones.reduce(
        (sum, milestone) => sum + milestone.progress,
        0
      ) / milestones.length
    );
  }, []);

  const criticalCount = milestones.filter(
    (milestone) => milestone.priority === "Critical"
  ).length;

  const handleGenerateRecommendations = () => {
    setGenerating(true);

    setTimeout(() => {
      setGenerating(false);
    }, 900);
  };

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";

      case "High Priority":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";

      case "Recommended":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";

      default:
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Target
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Preparation Milestone Recommendations
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Get personalized, measurable preparation milestones based on
              your target role, current skills, progress, weaknesses, and
              interview timeline.
            </p>
          </div>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Active Milestones
            </p>

            <p className="text-5xl font-black mt-3">
              {milestones.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Completed
            </p>

            <p className="text-5xl font-black mt-3">
              {completedMilestones}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Average Progress
            </p>

            <p className="text-5xl font-black mt-3">
              {averageProgress}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-red-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Critical
            </p>

            <p className="text-5xl font-black mt-3">
              {criticalCount}
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
                  AI Personalized Milestone Engine
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-4xl">
                AI analyzes your target role, preparation history,
                performance, weak areas, and interview deadline to
                recommend milestones that represent meaningful progress
                toward interview readiness.
              </p>

            </div>

            <button
              type="button"
              onClick={handleGenerateRecommendations}
              disabled={generating}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition shrink-0 disabled:opacity-60"
            >

              {generating ? (
                <>
                  <RefreshCw
                    size={20}
                    className="animate-spin"
                  />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Recommendations
                </>
              )}

            </button>

          </div>

        </div>

        {/* User Preparation Profile */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Your Preparation Profile
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="text-sm text-gray-500">
                Target Role
              </p>

              <h3 className="text-xl font-bold mt-2">
                Software Engineer
              </h3>

            </div>

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="text-sm text-gray-500">
                Skill Level
              </p>

              <h3 className="text-xl font-bold mt-2">
                Intermediate
              </h3>

            </div>

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="text-sm text-gray-500">
                Interview Timeline
              </p>

              <h3 className="text-xl font-bold mt-2">
                21 Days
              </h3>

            </div>

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="text-sm text-gray-500">
                Preparation Streak
              </p>

              <h3 className="text-xl font-bold mt-2 flex items-center gap-2">
                <Flame
                  size={20}
                  className="text-orange-500"
                />
                5 Days
              </h3>

            </div>

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              AI Recommendation
            </h2>

          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
                <Zap size={24} />
              </div>

              <div>

                <p className="font-bold text-lg">
                  Focus on DSA and Mock Interviews
                </p>

                <p className="text-gray-600 dark:text-gray-300 mt-2 leading-7">
                  Your current preparation is progressing well, but your
                  DSA practice and mock interview experience should be
                  prioritized during the next two weeks. Completing these
                  milestones will provide the highest expected improvement
                  before your interview.
                </p>

                <div className="flex flex-wrap gap-3 mt-5">

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-sm font-semibold">
                    DSA
                  </span>

                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 text-sm font-semibold">
                    Mock Interviews
                  </span>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm font-semibold">
                    High Impact
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Filters */}

        <div className="mt-10 flex flex-wrap gap-3">

          {categories.map((category) => (

            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-3 rounded-xl font-semibold transition ${
                activeFilter === category
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

        {/* Milestones */}

        <div className="mt-6 grid lg:grid-cols-2 gap-6">

          {filteredMilestones.map((milestone) => {

            const Icon = milestone.icon;

            return (
              <div
                key={milestone.id}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7 hover:-translate-y-1 transition"
              >

                <div className="flex items-start justify-between gap-5">

                  <div className="flex items-start gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">

                      <Icon
                        size={28}
                        className="text-violet-600"
                      />

                    </div>

                    <div>

                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getPriorityClasses(
                          milestone.priority
                        )}`}
                      >
                        {milestone.priority}
                      </span>

                      <h3 className="text-xl font-bold mt-3">
                        {milestone.title}
                      </h3>

                      <p className="text-sm text-violet-600 font-semibold mt-2">
                        {milestone.category}
                      </p>

                    </div>

                  </div>

                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {milestone.daysLeft} days
                  </span>

                </div>

                <p className="text-gray-500 mt-6 leading-6">
                  {milestone.description}
                </p>

                <div className="mt-6">

                  <div className="flex justify-between mb-3">

                    <span className="font-semibold">
                      Progress
                    </span>

                    <span className="font-black text-violet-600">
                      {milestone.progress}%
                    </span>

                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className={`h-full rounded-full ${getProgressColor(
                        milestone.progress
                      )}`}
                      style={{
                        width: `${milestone.progress}%`,
                      }}
                    />

                  </div>

                  <p className="text-sm text-gray-500 mt-3">
                    {milestone.current} / {milestone.target}{" "}
                    {milestone.unit}
                  </p>

                </div>

                <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <div className="flex items-start gap-3">

                    <Lightbulb
                      className="text-yellow-500 shrink-0"
                      size={20}
                    />

                    <div>

                      <p className="text-sm font-bold">
                        Why AI Recommended This
                      </p>

                      <p className="text-sm text-gray-500 mt-2 leading-6">
                        {milestone.reason}
                      </p>

                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedMilestone(milestone)
                  }
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition"
                >
                  View Milestone Details
                  <ArrowRight size={18} />
                </button>

              </div>
            );
          })}

        </div>

        {/* Upcoming Milestone */}

        <div className="mt-10 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Clock3 size={30} />

                <h2 className="text-3xl font-bold">
                  Upcoming Milestone
                </h2>

              </div>

              <h3 className="text-2xl font-bold">
                Complete Arrays & Strings Practice
              </h3>

              <p className="text-white/90 mt-3 leading-7 max-w-2xl">
                You are 72% complete. Solve 7 more targeted questions to
                finish this high-impact milestone.
              </p>

            </div>

            <div className="text-center shrink-0">

              <p className="text-6xl font-black">
                72%
              </p>

              <p className="text-white/80 mt-2">
                Complete
              </p>

            </div>

          </div>

        </div>

        {/* Timeline */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <CalendarDays className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Preparation Timeline
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                title: "21+ Days",
                focus: "Build Foundations",
                description:
                  "Complete broad topic coverage and strengthen fundamentals.",
              },
              {
                title: "14–21 Days",
                focus: "Target Weak Areas",
                description:
                  "Focus on weak topics and begin regular mock interviews.",
              },
              {
                title: "7–14 Days",
                focus: "Practice & Assess",
                description:
                  "Increase timed assessments and realistic interview practice.",
              },
              {
                title: "< 7 Days",
                focus: "Final Review",
                description:
                  "Revise important concepts and focus on high-impact activities.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                  <span className="font-black text-violet-600">
                    {index + 1}
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-5">
                  {item.title}
                </p>

                <h3 className="font-bold text-lg mt-2">
                  {item.focus}
                </h3>

                <p className="text-gray-500 mt-3 leading-6 text-sm">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Milestone Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Milestone Progress by Category
            </h2>

          </div>

          <div className="space-y-6">

            {[
              {
                label: "Technical Skills",
                score: 58,
                icon: Code2,
              },
              {
                label: "Mock Interviews",
                score: 67,
                icon: Mic,
              },
              {
                label: "Assessments",
                score: 81,
                icon: BarChart3,
              },
              {
                label: "Resume Preparation",
                score: 60,
                icon: FileText,
              },
              {
                label: "Consistency",
                score: 71,
                icon: Flame,
              },
            ].map((item) => {

              const Icon = item.icon;

              return (
                <div key={item.label}>

                  <div className="flex justify-between items-center mb-3">

                    <div className="flex items-center gap-3">

                      <Icon
                        size={20}
                        className="text-violet-600"
                      />

                      <span className="font-semibold">
                        {item.label}
                      </span>

                    </div>

                    <span className="font-black text-violet-600">
                      {item.score}%
                    </span>

                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
                      style={{
                        width: `${item.score}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Benefits */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Why Personalized Milestones Matter
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

              <Target
                className="text-green-600"
                size={28}
              />

              <h3 className="text-xl font-bold mt-4">
                Clear Goals
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Convert broad preparation plans into specific and
                measurable activities.
              </p>

            </div>

            <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6">

              <TrendingUp
                className="text-blue-600"
                size={28}
              />

              <h3 className="text-xl font-bold mt-4">
                Measurable Progress
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Track meaningful progress instead of relying only on the
                number of questions completed.
              </p>

            </div>

            <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

              <Brain
                className="text-violet-600"
                size={28}
              />

              <h3 className="text-xl font-bold mt-4">
                Personalized Direction
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                AI continuously adjusts milestones according to changing
                preparation needs.
              </p>

            </div>

          </div>

        </div>

        {/* AI Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Milestone Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Be Specific
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Milestones should define exactly what the user needs to
                accomplish.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                📊
              </p>

              <h3 className="text-xl font-bold mt-4">
                Make Progress Measurable
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Every milestone should have a clear target that users can
                track.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Adapt to the User
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Recommendations should change as preparation performance
                and interview timelines change.
              </p>

            </div>

          </div>

        </div>

        {/* Progress Tracking */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Preparation Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 42,
              },
              {
                label: "Week 2",
                score: 56,
              },
              {
                label: "Week 3",
                score: 68,
              },
              {
                label: "Current",
                score: averageProgress,
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

        {/* Final Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Personalized Preparation Plan
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Current Strength
              </p>

              <h3 className="text-xl font-bold mt-2">
                Assessment Performance
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your assessment performance is currently above the
                recommended target. Maintain this level while focusing on
                weaker areas.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                DSA & Mock Interviews
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Completing targeted DSA practice and additional mock
                interviews should provide the highest preparation impact.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Milestone
              </p>

              <h3 className="text-xl font-bold mt-2">
                Finish Arrays & Strings
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Solve seven more targeted questions to complete your
                highest-priority technical milestone.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Preparation Milestone Progress
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your preparation is progressing steadily. Focus on
                completing critical milestones first, then move toward
                mock interviews and final review activities.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {averageProgress}%
              </p>

              <p className="text-gray-500 mt-2">
                Overall Progress
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
              style={{
                width: `${averageProgress}%`,
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
                Interview preparation becomes more effective when progress
                is measured through meaningful milestones rather than only
                counting completed questions. Focus on the highest-impact
                milestones first, monitor your progress, and let your
                preparation priorities change as your interview gets
                closer.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🏆
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Milestone Progress
              </h3>

              <p className="text-5xl font-black">
                {averageProgress}%
              </p>

            </div>

          </div>

        </div>

        {/* Milestone Detail Modal */}

        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            <div className="w-full max-w-2xl bg-white dark:bg-[#111827] rounded-3xl shadow-2xl p-7 sm:p-9">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getPriorityClasses(
                      selectedMilestone.priority
                    )}`}
                  >
                    {selectedMilestone.priority}
                  </span>

                  <h2 className="text-2xl font-bold mt-4">
                    {selectedMilestone.title}
                  </h2>

                  <p className="text-violet-600 font-semibold mt-2">
                    {selectedMilestone.category}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMilestone(null)}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold"
                  aria-label="Close"
                >
                  ×
                </button>

              </div>

              <p className="text-gray-500 mt-6 leading-7">
                {selectedMilestone.description}
              </p>

              <div className="mt-7">

                <div className="flex justify-between mb-3">

                  <span className="font-semibold">
                    Current Progress
                  </span>

                  <span className="font-black text-violet-600">
                    {selectedMilestone.progress}%
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className={`h-full ${getProgressColor(
                      selectedMilestone.progress
                    )}`}
                    style={{
                      width: `${selectedMilestone.progress}%`,
                    }}
                  />

                </div>

              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-7">

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Current
                  </p>

                  <p className="text-2xl font-black mt-2">
                    {selectedMilestone.current}
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Target
                  </p>

                  <p className="text-2xl font-black mt-2">
                    {selectedMilestone.target}
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Days Left
                  </p>

                  <p className="text-2xl font-black mt-2">
                    {selectedMilestone.daysLeft}
                  </p>

                </div>

              </div>

              <div className="mt-7 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-5">

                <div className="flex items-start gap-3">

                  <Sparkles
                    className="text-violet-600 shrink-0"
                    size={22}
                  />

                  <div>

                    <p className="font-bold">
                      AI Recommendation Reason
                    </p>

                    <p className="text-gray-500 mt-2 leading-6">
                      {selectedMilestone.reason}
                    </p>

                  </div>

                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedMilestone(null)}
                className="mt-7 w-full px-6 py-4 rounded-2xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition"
              >
                Continue Preparation
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AIInterviewPreparationMilestoneRecommendations;