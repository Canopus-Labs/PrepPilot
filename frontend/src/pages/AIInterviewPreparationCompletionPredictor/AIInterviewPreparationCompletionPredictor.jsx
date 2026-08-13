import React, { useMemo, useState } from "react";
import {
  Brain,
  CalendarCheck,
  Target,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Sparkles,
  BarChart3,
  RefreshCw,
  ArrowRight,
  BookOpen,
  Timer,
  CalendarDays,
  Flame,
  CircleAlert,
  Gauge,
  ListChecks,
  GraduationCap,
} from "lucide-react";

const AIInterviewPreparationCompletionPredictor = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const preparationTasks = [
    {
      id: 1,
      title: "Data Structures",
      category: "Algorithms",
      completed: 18,
      total: 25,
      difficulty: "Medium",
      estimatedHours: 10,
      completedHours: 7,
      priority: "High",
      risk: "Low",
    },
    {
      id: 2,
      title: "Algorithms",
      category: "Algorithms",
      completed: 14,
      total: 30,
      difficulty: "Hard",
      estimatedHours: 18,
      completedHours: 8,
      priority: "High",
      risk: "High",
    },
    {
      id: 3,
      title: "Database Management",
      category: "DBMS",
      completed: 16,
      total: 20,
      difficulty: "Medium",
      estimatedHours: 8,
      completedHours: 6,
      priority: "Medium",
      risk: "Low",
    },
    {
      id: 4,
      title: "Operating Systems",
      category: "Core CS",
      completed: 10,
      total: 20,
      difficulty: "Medium",
      estimatedHours: 10,
      completedHours: 5,
      priority: "High",
      risk: "Medium",
    },
    {
      id: 5,
      title: "Computer Networks",
      category: "Core CS",
      completed: 5,
      total: 20,
      difficulty: "Hard",
      estimatedHours: 14,
      completedHours: 3,
      priority: "High",
      risk: "High",
    },
    {
      id: 6,
      title: "System Design",
      category: "Advanced",
      completed: 6,
      total: 15,
      difficulty: "Hard",
      estimatedHours: 12,
      completedHours: 4,
      priority: "High",
      risk: "High",
    },
    {
      id: 7,
      title: "Behavioral Interview",
      category: "Interview Skills",
      completed: 8,
      total: 10,
      difficulty: "Easy",
      estimatedHours: 4,
      completedHours: 3,
      priority: "Medium",
      risk: "Low",
    },
    {
      id: 8,
      title: "Mock Interviews",
      category: "Practice",
      completed: 3,
      total: 8,
      difficulty: "Hard",
      estimatedHours: 8,
      completedHours: 3,
      priority: "High",
      risk: "Medium",
    },
  ];

  const dailyHistory = [
    {
      day: "Mon",
      hours: 2.5,
      tasks: 5,
    },
    {
      day: "Tue",
      hours: 3,
      tasks: 6,
    },
    {
      day: "Wed",
      hours: 2,
      tasks: 4,
    },
    {
      day: "Thu",
      hours: 3.5,
      tasks: 7,
    },
    {
      day: "Fri",
      hours: 2.5,
      tasks: 5,
    },
    {
      day: "Sat",
      hours: 4,
      tasks: 8,
    },
    {
      day: "Sun",
      hours: 3,
      tasks: 6,
    },
  ];

  const interview = {
    date: "September 15, 2026",
    daysRemaining: 36,
    role: "Software Engineer",
    companyType: "Product-Based Company",
  };

  const completedTasks = preparationTasks.reduce(
    (sum, task) => sum + task.completed,
    0
  );

  const totalTasks = preparationTasks.reduce(
    (sum, task) => sum + task.total,
    0
  );

  const remainingTasks = totalTasks - completedTasks;

  const totalEstimatedHours = preparationTasks.reduce(
    (sum, task) => sum + task.estimatedHours,
    0
  );

  const completedHours = preparationTasks.reduce(
    (sum, task) => sum + task.completedHours,
    0
  );

  const remainingHours = totalEstimatedHours - completedHours;

  const averageDailyHours = useMemo(() => {
    return (
      dailyHistory.reduce(
        (sum, day) => sum + day.hours,
        0
      ) / dailyHistory.length
    );
  }, []);

  const historicalCompletionRate = useMemo(() => {
    const totalHistoricalTasks = dailyHistory.reduce(
      (sum, day) => sum + day.tasks,
      0
    );

    return Math.round(
      (totalHistoricalTasks /
        (totalHistoricalTasks + 18)) *
        100
    );
  }, []);

  const estimatedCompletionDays = Math.ceil(
    remainingHours / Math.max(averageDailyHours, 0.5)
  );

  const estimatedCompletionDate = useMemo(() => {
    const date = new Date("2026-08-10T00:00:00");
    date.setDate(
      date.getDate() + estimatedCompletionDays
    );

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [estimatedCompletionDays]);

  const completionProbability = useMemo(() => {
    const deadlineFactor = Math.min(
      interview.daysRemaining / estimatedCompletionDays,
      1
    );

    const probability = Math.round(
      Math.min(
        98,
        Math.max(
          20,
          deadlineFactor * 75 +
            historicalCompletionRate * 0.2
        )
      )
    );

    return probability;
  }, [
    estimatedCompletionDays,
    historicalCompletionRate,
    interview.daysRemaining,
  ]);

  const requiredDailyHours = useMemo(() => {
    return Math.ceil(
      (remainingHours / interview.daysRemaining) * 10
    ) / 10;
  }, [remainingHours]);

  const currentCompletionPercentage = Math.round(
    (completedTasks / totalTasks) * 100
  );

  const atRiskTasks = preparationTasks.filter(
    (task) =>
      task.risk === "High" ||
      task.completed / task.total < 0.5
  );

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("overview");
    }, 800);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-orange-500";
      case "High":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const getRiskBg = (risk) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 dark:bg-green-900/20";
      case "Medium":
        return "bg-orange-100 dark:bg-orange-900/20";
      case "High":
        return "bg-red-100 dark:bg-red-900/20";
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600";
      case "Medium":
        return "text-orange-500";
      case "Hard":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <CalendarCheck
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Preparation Completion Predictor
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Predict whether you can complete your preparation before
              your interview deadline and identify schedule risks early.
            </p>
          </div>

        </div>

        {/* Overview Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Preparation Complete
            </p>

            <p className="text-5xl font-black mt-3">
              {currentCompletionPercentage}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CalendarDays
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Days Remaining
            </p>

            <p className="text-5xl font-black mt-3">
              {interview.daysRemaining}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Gauge
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Completion Probability
            </p>

            <p className="text-5xl font-black mt-3">
              {completionProbability}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Daily Hours Needed
            </p>

            <p className="text-5xl font-black mt-3">
              {requiredDailyHours}h
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Preparation Completion Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            The AI compares your remaining preparation tasks with your
            historical study pace, daily study time, topic difficulty,
            and interview deadline to estimate whether your current plan
            is realistic.
          </p>

        </div>

        {/* Interview Deadline */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row justify-between gap-8">

            <div>

              <p className="text-sm text-gray-500">
                Interview Deadline
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {interview.date}
              </h2>

              <p className="text-gray-500 mt-2">
                {interview.role} • {interview.companyType}
              </p>

            </div>

            <div className="flex items-center gap-5">

              <div className="text-center">

                <p className="text-5xl font-black text-violet-600">
                  {interview.daysRemaining}
                </p>

                <p className="text-gray-500 mt-1">
                  days remaining
                </p>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                <CalendarDays
                  size={28}
                  className="text-violet-600"
                />

              </div>

            </div>

          </div>

          <div className="mt-8">

            <div className="flex justify-between mb-3">

              <span className="font-semibold">
                Preparation Progress
              </span>

              <span className="font-black text-violet-600">
                {currentCompletionPercentage}%
              </span>

            </div>

            <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                style={{
                  width: `${currentCompletionPercentage}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* Prediction Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Completion Prediction
            </h2>

          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="rounded-3xl bg-violet-50 dark:bg-violet-900/10 p-7 text-center">

              <CalendarCheck
                size={40}
                className="mx-auto text-violet-600"
              />

              <p className="text-sm text-gray-500 mt-5">
                Estimated Completion Date
              </p>

              <p className="text-2xl font-black mt-3">
                {estimatedCompletionDate}
              </p>

              <p className="text-gray-500 mt-3">
                Based on your current study pace.
              </p>

            </div>

            <div className="rounded-3xl bg-green-50 dark:bg-green-900/10 p-7 text-center">

              <Gauge
                size={40}
                className="mx-auto text-green-600"
              />

              <p className="text-sm text-gray-500 mt-5">
                Completion Probability
              </p>

              <p className="text-5xl font-black text-green-600 mt-3">
                {completionProbability}%
              </p>

              <p className="text-gray-500 mt-3">
                Probability of finishing before the deadline.
              </p>

            </div>

            <div className="rounded-3xl bg-orange-50 dark:bg-orange-900/10 p-7 text-center">

              <Timer
                size={40}
                className="mx-auto text-orange-500"
              />

              <p className="text-sm text-gray-500 mt-5">
                Recommended Daily Workload
              </p>

              <p className="text-5xl font-black text-orange-500 mt-3">
                {requiredDailyHours}h
              </p>

              <p className="text-gray-500 mt-3">
                Study time required to stay on schedule.
              </p>

            </div>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["overview", "AI Overview"],
            ["tasks", "Preparation Tasks"],
            ["risk", "At-Risk Areas"],
            ["workload", "Daily Workload"],
            ["recommendation", "AI Recommendation"],
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

        {/* Overview */}

        {activeTab === "overview" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Preparation Completion
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="w-52 h-52 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p className="text-6xl font-black text-violet-600">
                      {currentCompletionPercentage}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      completed
                    </p>

                  </div>

                </div>

              </div>

              <p className="text-gray-500 leading-7">
                You have completed{" "}
                <strong>
                  {completedTasks}
                </strong>{" "}
                of{" "}
                <strong>
                  {totalTasks}
                </strong>{" "}
                planned preparation tasks.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Brain className="text-indigo-600" />

                <h2 className="text-2xl font-bold">
                  AI Schedule Assessment
                </h2>

              </div>

              <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

                <div className="flex items-center gap-3">

                  <CircleAlert
                    className="text-orange-500"
                    size={25}
                  />

                  <h3 className="font-bold text-lg">
                    Schedule Requires Attention
                  </h3>

                </div>

                <p className="text-gray-600 dark:text-gray-300 mt-4 leading-7">
                  You currently have{" "}
                  <strong>
                    {remainingHours} hours
                  </strong>{" "}
                  of estimated preparation remaining. At your current
                  average study pace of{" "}
                  <strong>
                    {averageDailyHours.toFixed(1)} hours/day
                  </strong>
                  , you are projected to finish around{" "}
                  <strong>
                    {estimatedCompletionDate}
                  </strong>
                  .
                </p>

              </div>

              <div className="mt-6 grid grid-cols-2 gap-5">

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Current Pace
                  </p>

                  <p className="text-3xl font-black mt-2">
                    {averageDailyHours.toFixed(1)}h
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Required Pace
                  </p>

                  <p className="text-3xl font-black text-orange-500 mt-2">
                    {requiredDailyHours}h
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Preparation Tasks */}

        {activeTab === "tasks" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-8">

              <ListChecks className="text-violet-600" />

              <div>

                <h2 className="text-2xl font-bold">
                  Remaining Preparation Tasks
                </h2>

                <p className="text-gray-500 mt-1">
                  Track your progress across all preparation areas.
                </p>

              </div>

            </div>

            <div className="space-y-5">

              {preparationTasks.map((task) => {

                const percentage = Math.round(
                  (task.completed / task.total) * 100
                );

                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => setSelectedTopic(task)}
                    className={`w-full text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                      selectedTopic?.id === task.id
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                        : "border-gray-200 dark:border-white/10"
                    }`}
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                      <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-3">

                          <h3 className="text-xl font-bold">
                            {task.title}
                          </h3>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskBg(
                              task.risk
                            )} ${getRiskColor(task.risk)}`}
                          >
                            {task.risk} Risk
                          </span>

                          <span
                            className={`text-sm font-semibold ${getDifficultyColor(
                              task.difficulty
                            )}`}
                          >
                            {task.difficulty}
                          </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                          {task.category} • Priority:{" "}
                          {task.priority}
                        </p>

                        <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                        <div className="flex justify-between mt-2 text-sm text-gray-500">

                          <span>
                            {task.completed}/{task.total} completed
                          </span>

                          <span>
                            {percentage}%
                          </span>

                        </div>

                      </div>

                      <div className="text-center lg:w-36">

                        <p className="text-sm text-gray-500">
                          Hours Remaining
                        </p>

                        <p className="text-3xl font-black mt-2">
                          {task.estimatedHours -
                            task.completedHours}
                          h
                        </p>

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>
        )}

        {/* Selected Task */}

        {activeTab === "tasks" && selectedTopic && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex flex-col lg:flex-row justify-between gap-6">

              <div>

                <span
                  className={`inline-block px-4 py-2 rounded-full font-semibold ${getRiskBg(
                    selectedTopic.risk
                  )} ${getRiskColor(selectedTopic.risk)}`}
                >
                  {selectedTopic.risk} Risk
                </span>

                <h2 className="text-3xl font-bold mt-4">
                  {selectedTopic.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {selectedTopic.category}
                </p>

              </div>

              <div className="text-center">

                <p className="text-5xl font-black text-violet-600">
                  {Math.round(
                    (selectedTopic.completed /
                      selectedTopic.total) *
                      100
                  )}%
                </p>

                <p className="text-gray-500 mt-2">
                  Complete
                </p>

              </div>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Completed
                </p>

                <p className="text-3xl font-black mt-2">
                  {selectedTopic.completed}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Remaining
                </p>

                <p className="text-3xl font-black mt-2">
                  {selectedTopic.total -
                    selectedTopic.completed}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Difficulty
                </p>

                <p
                  className={`text-xl font-black mt-3 ${getDifficultyColor(
                    selectedTopic.difficulty
                  )}`}
                >
                  {selectedTopic.difficulty}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Hours Remaining
                </p>

                <p className="text-3xl font-black mt-2">
                  {selectedTopic.estimatedHours -
                    selectedTopic.completedHours}
                  h
                </p>

              </div>

            </div>

          </div>
        )}

        {/* At Risk */}

        {activeTab === "risk" && (

          <div className="mt-6">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

              <div className="flex items-center gap-3 mb-8">

                <AlertTriangle className="text-red-500" />

                <div>

                  <h2 className="text-2xl font-bold">
                    AI At-Risk Areas
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Topics that may prevent you from finishing on time.
                  </p>

                </div>

              </div>

              <div className="space-y-5">

                {atRiskTasks.map((task) => {

                  const percentage = Math.round(
                    (task.completed / task.total) * 100
                  );

                  return (
                    <div
                      key={task.id}
                      className="rounded-2xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 p-6"
                    >

                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                        <div>

                          <div className="flex items-center gap-3">

                            <AlertTriangle
                              className="text-red-500"
                              size={22}
                            />

                            <h3 className="text-xl font-bold">
                              {task.title}
                            </h3>

                          </div>

                          <p className="text-gray-500 mt-2">
                            {task.category} • {task.difficulty} difficulty
                          </p>

                        </div>

                        <div className="flex items-center gap-5">

                          <div className="text-right">

                            <p className="text-sm text-gray-500">
                              Completion
                            </p>

                            <p className="text-3xl font-black text-red-600">
                              {percentage}%
                            </p>

                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTopic(task);
                              setActiveTab("tasks");
                            }}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition"
                          >
                            Focus
                            <ArrowRight size={18} />
                          </button>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        )}

        {/* Daily Workload */}

        {activeTab === "workload" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Clock3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Current vs Required Workload
                </h2>

              </div>

              <div className="space-y-8">

                <div>

                  <div className="flex justify-between mb-3">

                    <span className="font-semibold">
                      Current Daily Average
                    </span>

                    <span className="font-black text-blue-600">
                      {averageDailyHours.toFixed(1)}h
                    </span>

                  </div>

                  <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${Math.min(
                          (averageDailyHours /
                            Math.max(
                              requiredDailyHours,
                              1
                            )) *
                            100,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-3">

                    <span className="font-semibold">
                      Required Daily Average
                    </span>

                    <span className="font-black text-orange-500">
                      {requiredDailyHours}h
                    </span>

                  </div>

                  <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full bg-orange-500"
                      style={{
                        width: "100%",
                      }}
                    />

                  </div>

                </div>

              </div>

              <div className="mt-8 rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

                <div className="flex items-center gap-3">

                  <TrendingUp
                    className="text-orange-500"
                    size={22}
                  />

                  <p className="font-bold">
                    Additional{" "}
                    {Math.max(
                      0,
                      requiredDailyHours -
                        averageDailyHours
                    ).toFixed(1)}
                    h/day may be needed.
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-indigo-600" />

                <h2 className="text-2xl font-bold">
                  Historical Study Pattern
                </h2>

              </div>

              <div className="space-y-5">

                {dailyHistory.map((day) => (

                  <div key={day.day}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {day.day}
                      </span>

                      <span className="text-gray-500">
                        {day.hours}h • {day.tasks} tasks
                      </span>

                    </div>

                    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                      <div
                        className="h-full bg-violet-500 rounded-full"
                        style={{
                          width: `${Math.min(
                            (day.hours / 5) * 100,
                            100
                          )}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

              <div className="mt-7 rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-5">

                <p className="text-sm text-gray-500">
                  Historical Average
                </p>

                <p className="text-3xl font-black text-violet-600 mt-2">
                  {averageDailyHours.toFixed(1)} hours/day
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Recommendation */}

        {activeTab === "recommendation" && (

          <div className="mt-6">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Lightbulb className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  AI Personalized Preparation Recommendation
                </h2>

              </div>

              <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-7">

                <div className="flex items-center gap-3">

                  <CircleAlert
                    size={28}
                    className="text-orange-500"
                  />

                  <h3 className="text-xl font-bold">
                    Increase Your Daily Study Workload
                  </h3>

                </div>

                <p className="text-gray-600 dark:text-gray-300 mt-5 leading-7">
                  Your current average of{" "}
                  <strong>
                    {averageDailyHours.toFixed(1)} hours/day
                  </strong>{" "}
                  is below the estimated{" "}
                  <strong>
                    {requiredDailyHours} hours/day
                  </strong>{" "}
                  needed to finish all planned preparation before the
                  interview.
                </p>

              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">

                <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

                  <Flame
                    size={28}
                    className="text-orange-500"
                  />

                  <p className="text-sm text-gray-500 mt-5">
                    Daily Target
                  </p>

                  <p className="text-3xl font-black mt-2">
                    {requiredDailyHours}h
                  </p>

                  <p className="text-gray-500 mt-2">
                    Minimum recommended study time.
                  </p>

                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

                  <BookOpen
                    size={28}
                    className="text-violet-600"
                  />

                  <p className="text-sm text-gray-500 mt-5">
                    Priority Topics
                  </p>

                  <p className="text-xl font-black mt-2">
                    {atRiskTasks.length}
                  </p>

                  <p className="text-gray-500 mt-2">
                    Areas need focused attention.
                  </p>

                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

                  <CalendarCheck
                    size={28}
                    className="text-green-600"
                  />

                  <p className="text-sm text-gray-500 mt-5">
                    Target Completion
                  </p>

                  <p className="text-xl font-black mt-2">
                    {estimatedCompletionDate}
                  </p>

                  <p className="text-gray-500 mt-2">
                    Based on current study behavior.
                  </p>

                </div>

              </div>

              <div className="mt-8">

                <h3 className="text-xl font-bold">
                  Recommended Strategy
                </h3>

                <div className="grid md:grid-cols-3 gap-5 mt-5">

                  {[
                    {
                      title: "Prioritize High-Risk Topics",
                      text: "Spend the first part of each study session on algorithms, networking, and system design.",
                      icon: "🎯",
                    },
                    {
                      title: "Protect Daily Study Time",
                      text: "Reserve a fixed daily study block to avoid falling further behind schedule.",
                      icon: "⏰",
                    },
                    {
                      title: "Use Mock Interviews",
                      text: "Keep mock interviews in the plan so your preparation includes realistic interview practice.",
                      icon: "🎤",
                    },
                  ].map((item) => (

                    <div
                      key={item.title}
                      className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6"
                    >

                      <div className="text-4xl">
                        {item.icon}
                      </div>

                      <h4 className="font-bold text-lg mt-4">
                        {item.title}
                      </h4>

                      <p className="text-gray-500 mt-3 leading-6">
                        {item.text}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Risk Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Preparation Risk Summary
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-6">

              <CheckCircle2
                className="text-green-600"
                size={28}
              />

              <p className="text-sm text-gray-500 mt-5">
                Low Risk
              </p>

              <p className="text-4xl font-black text-green-600 mt-2">
                {
                  preparationTasks.filter(
                    (task) => task.risk === "Low"
                  ).length
                }
              </p>

              <p className="text-gray-500 mt-2">
                Topics progressing according to plan.
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-6">

              <Clock3
                className="text-orange-500"
                size={28}
              />

              <p className="text-sm text-gray-500 mt-5">
                Medium Risk
              </p>

              <p className="text-4xl font-black text-orange-500 mt-2">
                {
                  preparationTasks.filter(
                    (task) => task.risk === "Medium"
                  ).length
                }
              </p>

              <p className="text-gray-500 mt-2">
                Topics that require closer monitoring.
              </p>

            </div>

            <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 p-6">

              <TrendingDown
                className="text-red-600"
                size={28}
              />

              <p className="text-sm text-gray-500 mt-5">
                High Risk
              </p>

              <p className="text-4xl font-black text-red-600 mt-2">
                {
                  preparationTasks.filter(
                    (task) => task.risk === "High"
                  ).length
                }
              </p>

              <p className="text-gray-500 mt-2">
                Topics most likely to affect the deadline.
              </p>

            </div>

          </div>

        </div>

        {/* AI Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Preparation Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                📅
              </p>

              <h3 className="text-xl font-bold mt-4">
                Plan Realistically
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                A good preparation plan should fit the time available
                instead of assuming unlimited study hours.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                📈
              </p>

              <h3 className="text-xl font-bold mt-4">
                Follow Your Pace
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Historical completion behavior provides a more realistic
                prediction than manually estimating your speed.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Focus on Risk
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Prioritize difficult and incomplete topics that could
                prevent you from finishing before the interview.
              </p>

            </div>

          </div>

        </div>

        {/* Progress Tracking */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Preparation Completion Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 28,
              },
              {
                label: "Week 2",
                score: 39,
              },
              {
                label: "Week 3",
                score: 48,
              },
              {
                label: "Current",
                score: currentCompletionPercentage,
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
                Recalculating Prediction...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Recalculate Completion Prediction
              </>
            )}

          </button>

        </div>

        {/* Final AI Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <GraduationCap size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                You have{" "}
                <strong>
                  {remainingHours} hours
                </strong>{" "}
                of estimated preparation remaining and{" "}
                <strong>
                  {interview.daysRemaining} days
                </strong>{" "}
                until your interview. To improve your{" "}
                <strong>
                  {completionProbability}%
                </strong>{" "}
                completion probability, target approximately{" "}
                <strong>
                  {requiredDailyHours} hours per day
                </strong>{" "}
                and prioritize your high-risk topics first.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Completion Probability
              </h3>

              <p className="text-5xl font-black">
                {completionProbability}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationCompletionPredictor;