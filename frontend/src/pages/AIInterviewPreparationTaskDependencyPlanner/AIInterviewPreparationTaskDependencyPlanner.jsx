import React, { useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  CheckCircle2,
  Lock,
  Unlock,
  ArrowDown,
  GitBranch,
  BookOpen,
  Code2,
  Trophy,
  Clock,
  RefreshCw,
  AlertTriangle,
  ListChecks,
  Network,
  ChevronRight,
} from "lucide-react";

const initialTasks = [
  {
    id: 1,
    title: "Programming Fundamentals",
    category: "Foundation",
    duration: "3 days",
    status: "Completed",
    dependencies: [],
    description: "Build a strong foundation in programming concepts.",
  },
  {
    id: 2,
    title: "DSA Basics",
    category: "Data Structures",
    duration: "5 days",
    status: "Completed",
    dependencies: [1],
    description: "Learn arrays, strings, stacks, queues, and basic algorithms.",
  },
  {
    id: 3,
    title: "Advanced DSA",
    category: "Algorithms",
    duration: "7 days",
    status: "In Progress",
    dependencies: [2],
    description: "Practice trees, graphs, dynamic programming, and advanced patterns.",
  },
  {
    id: 4,
    title: "Coding Practice",
    category: "Practice",
    duration: "10 days",
    status: "Blocked",
    dependencies: [3],
    description: "Solve role-relevant coding problems using learned patterns.",
  },
  {
    id: 5,
    title: "System Design Basics",
    category: "System Design",
    duration: "5 days",
    status: "Available",
    dependencies: [2],
    description: "Learn scalability, APIs, databases, caching, and architecture.",
  },
  {
    id: 6,
    title: "Behavioral Preparation",
    category: "Behavioral",
    duration: "3 days",
    status: "Available",
    dependencies: [],
    description: "Prepare STAR-based behavioral interview responses.",
  },
  {
    id: 7,
    title: "Resume & Project Preparation",
    category: "Career",
    duration: "2 days",
    status: "Available",
    dependencies: [1],
    description: "Prepare project explanations and resume-based questions.",
  },
  {
    id: 8,
    title: "Mock Interview",
    category: "Interview",
    duration: "1 day",
    status: "Blocked",
    dependencies: [4, 5, 6, 7],
    description: "Simulate a complete technical and behavioral interview.",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    case "In Progress":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    case "Blocked":
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
  }
};

const getCategoryIcon = (category) => {
  if (category === "Foundation") return BookOpen;
  if (category === "Data Structures" || category === "Algorithms") return Code2;
  if (category === "Practice") return Target;
  if (category === "Interview") return Trophy;
  return GitBranch;
};

const AIInterviewPreparationTaskDependencyPlanner = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState("planner");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const blockedCount = tasks.filter(
    (task) => task.status === "Blocked"
  ).length;

  const progress = Math.round((completedCount / tasks.length) * 100);

  const availableTasks = tasks.filter(
    (task) => task.status === "Available"
  );

  const getTask = (id) => tasks.find((task) => task.id === id);

  const dependencyDetails = useMemo(() => {
    return tasks.map((task) => ({
      ...task,
      dependencyTasks: task.dependencies.map((id) => getTask(id)),
    }));
  }, [tasks]);

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const handleComplete = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, status: "Completed" }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <Network size={34} className="text-violet-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Preparation Task Dependency Planner
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Build the right preparation sequence by identifying
                prerequisites and dependency relationships between tasks.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-60"
          >
            <RefreshCw
              size={19}
              className={isRefreshing ? "animate-spin" : ""}
            />
            {isRefreshing ? "Updating Plan..." : "Update AI Plan"}
          </button>

        </div>

        {/* Hero */}

        <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Follow the Right Preparation Path
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI analyzes your preparation tasks and determines which activities
            should be completed first. Prerequisites are automatically connected
            so you can build knowledge progressively instead of practicing in
            an ineffective order.
          </p>

        </div>

        {/* Summary Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <ListChecks className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Total Tasks
            </p>

            <p className="text-5xl font-black text-violet-600 mt-2">
              {tasks.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <CheckCircle2 className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Completed
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              {completedCount}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Lock className="text-red-600" size={30} />

            <p className="text-gray-500 mt-4">
              Blocked Tasks
            </p>

            <p className="text-5xl font-black text-red-600 mt-2">
              {blockedCount}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Plan Progress
            </p>

            <p className="text-5xl font-black text-blue-600 mt-2">
              {progress}%
            </p>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["planner", "Dependency Planner"],
            ["sequence", "Recommended Sequence"],
            ["blocked", "Blocked Tasks"],
            ["insights", "AI Insights"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Planner */}

        {activeTab === "planner" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

                <div>

                  <div className="flex items-center gap-3">

                    <GitBranch className="text-violet-600" />

                    <h2 className="text-2xl font-bold">
                      Preparation Dependency Map
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-3">
                    Complete tasks from left to right to unlock the next
                    preparation stage.
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    Completed
                  </span>

                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    Active
                  </span>

                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    Blocked
                  </span>

                </div>

              </div>

              {/* Visual Dependency Flow */}

              <div className="mt-10 overflow-x-auto pb-5">

                <div className="min-w-[900px]">

                  <div className="grid grid-cols-4 gap-8">

                    {[
                      {
                        title: "Foundation",
                        ids: [1, 2],
                      },
                      {
                        title: "Advanced Skills",
                        ids: [3, 5],
                      },
                      {
                        title: "Practice",
                        ids: [4, 6, 7],
                      },
                      {
                        title: "Interview Ready",
                        ids: [8],
                      },
                    ].map((column) => (

                      <div key={column.title}>

                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-5">
                          {column.title}
                        </h3>

                        <div className="space-y-5">

                          {column.ids.map((id) => {

                            const task = getTask(id);
                            const Icon = getCategoryIcon(task.category);

                            return (
                              <React.Fragment key={task.id}>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedTask(task.id)
                                  }
                                  className={`w-full text-left rounded-2xl border-2 p-5 transition hover:-translate-y-1 hover:shadow-lg ${
                                    task.status === "Completed"
                                      ? "border-green-300 bg-green-50 dark:border-green-900/40 dark:bg-green-900/10"
                                      : task.status === "Blocked"
                                      ? "border-red-300 bg-red-50 dark:border-red-900/40 dark:bg-red-900/10"
                                      : task.status === "In Progress"
                                      ? "border-blue-300 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-900/10"
                                      : "border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-gray-800"
                                  }`}
                                >

                                  <div className="flex items-start justify-between gap-3">

                                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center shadow-sm">

                                      <Icon
                                        size={23}
                                        className={
                                          task.status === "Completed"
                                            ? "text-green-600"
                                            : task.status === "Blocked"
                                            ? "text-red-600"
                                            : "text-violet-600"
                                        }
                                      />

                                    </div>

                                    {task.status === "Completed" ? (
                                      <CheckCircle2
                                        size={21}
                                        className="text-green-600"
                                      />
                                    ) : task.status === "Blocked" ? (
                                      <Lock
                                        size={21}
                                        className="text-red-600"
                                      />
                                    ) : (
                                      <Unlock
                                        size={21}
                                        className="text-blue-600"
                                      />
                                    )}

                                  </div>

                                  <h4 className="font-bold mt-4">
                                    {task.title}
                                  </h4>

                                  <p className="text-xs text-gray-500 mt-2">
                                    {task.category}
                                  </p>

                                  <div className="flex items-center justify-between mt-5">

                                    <span
                                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                                        task.status
                                      )}`}
                                    >
                                      {task.status}
                                    </span>

                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                      <Clock size={13} />
                                      {task.duration}
                                    </span>

                                  </div>

                                </button>

                                {column.ids.indexOf(id) <
                                  column.ids.length - 1 && (
                                  <div className="flex justify-center">

                                    <ArrowDown
                                      size={20}
                                      className="text-gray-400"
                                    />

                                  </div>
                                )}

                              </React.Fragment>
                            );
                          })}

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>

            {/* Selected Task */}

            {selectedTask && (
              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                {(() => {

                  const task = getTask(selectedTask);

                  return (
                    <>

                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

                        <div>

                          <div className="flex flex-wrap items-center gap-3">

                            <h2 className="text-2xl font-bold">
                              {task.title}
                            </h2>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                                task.status
                              )}`}
                            >
                              {task.status}
                            </span>

                          </div>

                          <p className="text-gray-500 mt-3 leading-7">
                            {task.description}
                          </p>

                        </div>

                        {task.status !== "Completed" && (
                          <button
                            type="button"
                            onClick={() => handleComplete(task.id)}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
                          >
                            <CheckCircle2 size={18} />
                            Mark Complete
                          </button>
                        )}

                      </div>

                      <div className="grid md:grid-cols-3 gap-5 mt-7">

                        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                          <p className="text-sm text-gray-500">
                            Duration
                          </p>

                          <p className="font-bold text-lg mt-2">
                            {task.duration}
                          </p>

                        </div>

                        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                          <p className="text-sm text-gray-500">
                            Category
                          </p>

                          <p className="font-bold text-lg mt-2">
                            {task.category}
                          </p>

                        </div>

                        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                          <p className="text-sm text-gray-500">
                            Prerequisites
                          </p>

                          <p className="font-bold text-lg mt-2">
                            {task.dependencies.length || "None"}
                          </p>

                        </div>

                      </div>

                      {task.dependencies.length > 0 && (
                        <div className="mt-7">

                          <h3 className="font-bold text-lg">
                            Required Before Starting
                          </h3>

                          <div className="flex flex-wrap gap-3 mt-4">

                            {task.dependencies.map((dependencyId) => {

                              const dependency = getTask(dependencyId);

                              return (
                                <div
                                  key={dependency.id}
                                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-violet-50 dark:bg-violet-900/10 text-violet-700 dark:text-violet-300"
                                >
                                  {dependency.status === "Completed" ? (
                                    <CheckCircle2 size={17} />
                                  ) : (
                                    <Lock size={17} />
                                  )}

                                  {dependency.title}

                                </div>
                              );
                            })}

                          </div>

                        </div>
                      )}

                    </>
                  );
                })()}

              </div>
            )}

          </div>
        )}

        {/* Recommended Sequence */}

        {activeTab === "sequence" && (
          <div className="mt-6 space-y-6">

            {dependencyDetails.map((task, index) => (

              <div
                key={task.id}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-7"
              >

                <div className="flex flex-col md:flex-row gap-6">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-black">
                      {index + 1}
                    </div>

                    <ChevronRight
                      size={22}
                      className="text-gray-400 hidden md:block"
                    />

                  </div>

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-xl font-bold">
                        {task.title}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>

                    </div>

                    <p className="text-gray-500 mt-3 leading-7">
                      {task.description}
                    </p>

                    {task.dependencyTasks.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mt-5">

                        <span className="text-sm text-gray-500">
                          Depends on:
                        </span>

                        {task.dependencyTasks.map((dependency) => (

                          <span
                            key={dependency.id}
                            className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm"
                          >
                            {dependency.title}
                          </span>

                        ))}

                      </div>
                    )}

                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 shrink-0">

                    <Clock size={17} />
                    {task.duration}

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* Blocked Tasks */}

        {activeTab === "blocked" && (
          <div className="mt-6 space-y-6">

            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-3xl p-7">

              <div className="flex items-start gap-4">

                <AlertTriangle
                  className="text-red-600 shrink-0"
                  size={30}
                />

                <div>

                  <h2 className="text-2xl font-bold text-red-700 dark:text-red-400">
                    {blockedCount} Tasks Are Currently Blocked
                  </h2>

                  <p className="text-red-600/80 dark:text-red-400/80 mt-2 leading-7">
                    Complete the prerequisite tasks before starting these
                    activities.
                  </p>

                </div>

              </div>

            </div>

            {tasks
              .filter((task) => task.status === "Blocked")
              .map((task) => (

                <div
                  key={task.id}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

                    <div>

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">

                          <Lock
                            size={25}
                            className="text-red-600"
                          />

                        </div>

                        <div>

                          <h2 className="text-xl font-bold">
                            {task.title}
                          </h2>

                          <span className="text-sm text-red-600 font-semibold">
                            Blocked
                          </span>

                        </div>

                      </div>

                      <p className="text-gray-500 mt-5 leading-7">
                        {task.description}
                      </p>

                    </div>

                    <div className="lg:text-right">

                      <p className="text-sm text-gray-500">
                        Prerequisites
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">

                        {task.dependencies.map((id) => {

                          const dependency = getTask(id);

                          return (
                            <span
                              key={id}
                              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold"
                            >
                              {dependency.title}
                            </span>
                          );
                        })}

                      </div>

                    </div>

                  </div>

                </div>
              ))}

          </div>
        )}

        {/* AI Insights */}

        {activeTab === "insights" && (
          <div className="mt-6 space-y-8">

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">

                  <CheckCircle2
                    size={28}
                    className="text-green-600"
                  />

                </div>

                <h2 className="text-xl font-bold mt-6">
                  Strong Foundation
                </h2>

                <p className="text-gray-500 mt-3 leading-7">
                  Programming Fundamentals and DSA Basics are already
                  completed, giving you the foundation required for advanced
                  preparation.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">

                  <Target
                    size={28}
                    className="text-orange-600"
                  />

                </div>

                <h2 className="text-xl font-bold mt-6">
                  Current Focus
                </h2>

                <p className="text-gray-500 mt-3 leading-7">
                  Advanced DSA is the current dependency bottleneck. Completing
                  it will unlock Coding Practice and move you closer to mock
                  interview readiness.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">

                  <GitBranch
                    size={28}
                    className="text-blue-600"
                  />

                </div>

                <h2 className="text-xl font-bold mt-6">
                  Parallel Learning
                </h2>

                <p className="text-gray-500 mt-3 leading-7">
                  Behavioral Preparation and Resume & Project Preparation have
                  fewer dependencies and can be completed alongside technical
                  preparation.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                  <Trophy
                    size={28}
                    className="text-violet-600"
                  />

                </div>

                <h2 className="text-xl font-bold mt-6">
                  Final Milestone
                </h2>

                <p className="text-gray-500 mt-3 leading-7">
                  Mock Interview should be completed after coding practice,
                  system design, behavioral preparation, and project
                  preparation are sufficiently developed.
                </p>

              </div>

            </div>

            {/* AI Recommendation */}

            <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-5">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Recommended Next Step
                </h2>

              </div>

              <p className="text-lg leading-8 text-white/90">
                Focus on completing Advanced DSA first. Once it is completed,
                begin Coding Practice while continuing System Design and
                Behavioral Preparation in parallel. This sequence maximizes
                progress toward becoming mock-interview ready.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                <span className="px-4 py-2 rounded-full bg-white/15 font-semibold">
                  Priority: High
                </span>

                <span className="px-4 py-2 rounded-full bg-white/15 font-semibold">
                  Current Task: Advanced DSA
                </span>

                <span className="px-4 py-2 rounded-full bg-white/15 font-semibold">
                  Next Unlock: Coding Practice
                </span>

              </div>

            </div>

          </div>
        )}

        {/* Dependency Logic */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <GitBranch className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              How AI Dependency Planning Works
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Identify",
                "AI detects prerequisite relationships between preparation tasks.",
              ],
              [
                "2",
                "Sequence",
                "Tasks are arranged into a logical learning progression.",
              ],
              [
                "3",
                "Unlock",
                "Completing prerequisites automatically unlocks dependent tasks.",
              ],
              [
                "4",
                "Adapt",
                "The dependency plan changes as preparation progress changes.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-black">
                  {number}
                </div>

                <h3 className="font-bold text-lg mt-5">
                  {title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Benefits */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 size={30} />

            <h2 className="text-3xl font-bold">
              Benefits
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              [
                "🧩",
                "Logical Sequence",
                "Creates a structured preparation path based on prerequisites.",
              ],
              [
                "🔓",
                "Smart Unlocking",
                "Prevents users from starting tasks before required foundations are ready.",
              ],
              [
                "🗺️",
                "Visual Planning",
                "Makes complex preparation dependencies easy to understand.",
              ],
              [
                "⚡",
                "Efficient Learning",
                "Reduces wasted effort and encourages prerequisite-first learning.",
              ],
            ].map(([icon, title, description]) => (

              <div
                key={title}
                className="rounded-2xl bg-white/10 p-6"
              >

                <div className="text-4xl">
                  {icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {title}
                </h3>

                <p className="text-white/80 mt-3 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationTaskDependencyPlanner;