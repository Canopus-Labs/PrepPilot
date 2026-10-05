import React, { useState } from "react";
import {
  Brain,
  Network,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Target,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const AIInterviewTopicDependencyGraph = () => {
  const [selectedTopic, setSelectedTopic] = useState("Arrays");

  const [stats] = useState({
    completedTopics: 8,
    totalTopics: 14,
    weakTopics: 3,
    readiness: 78,
  });

  const topics = [
    {
      id: "Arrays",
      name: "Arrays",
      level: "Foundation",
      status: "completed",
      mastery: 94,
      description:
        "Fundamental data structure used as the basis for many searching, sorting, and algorithmic techniques.",
      prerequisites: [],
      next: "Searching",
    },
    {
      id: "Searching",
      name: "Searching",
      level: "Foundation",
      status: "completed",
      mastery: 88,
      description:
        "Techniques for efficiently locating values within collections of data.",
      prerequisites: ["Arrays"],
      next: "Binary Search",
    },
    {
      id: "Binary Search",
      name: "Binary Search",
      level: "Intermediate",
      status: "weak",
      mastery: 61,
      description:
        "A divide-and-conquer searching technique that repeatedly reduces the search space.",
      prerequisites: ["Arrays", "Searching"],
      next: "Trees",
    },
    {
      id: "Trees",
      name: "Trees",
      level: "Intermediate",
      status: "locked",
      mastery: 35,
      description:
        "Hierarchical data structures that introduce concepts such as traversal, recursion, and tree-based searching.",
      prerequisites: ["Binary Search"],
      next: "Graphs",
    },
    {
      id: "Graphs",
      name: "Graphs",
      level: "Advanced",
      status: "locked",
      mastery: 20,
      description:
        "Non-linear structures used to model relationships, networks, paths, and connected systems.",
      prerequisites: ["Trees"],
      next: "Dynamic Programming",
    },
    {
      id: "Dynamic Programming",
      name: "Dynamic Programming",
      level: "Advanced",
      status: "locked",
      mastery: 12,
      description:
        "An optimization technique based on solving overlapping subproblems and storing intermediate results.",
      prerequisites: ["Graphs"],
      next: null,
    },
  ];

  const selected = topics.find(
    (topic) => topic.id === selectedTopic
  );

  const getStatusClasses = (status) => {
    if (status === "completed") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (status === "weak") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  };

  const getNodeClasses = (status, active) => {
    if (active) {
      return "border-violet-500 bg-violet-50 dark:bg-violet-900/20 shadow-lg shadow-violet-500/10";
    }

    if (status === "completed") {
      return "border-green-300 bg-green-50 dark:border-green-900/40 dark:bg-green-900/10";
    }

    if (status === "weak") {
      return "border-orange-300 bg-orange-50 dark:border-orange-900/40 dark:bg-orange-900/10";
    }

    return "border-gray-300 bg-gray-50 dark:border-white/10 dark:bg-gray-800";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Network
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Topic Dependency Graph
            </h1>

            <p className="text-gray-500 mt-2">
              Explore how interview concepts are connected and discover
              which prerequisites you should master before moving to
              advanced topics.
            </p>

          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Completed Topics
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.completedTopics}/{stats.totalTopics}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Weak Topics
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.weakTopics}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Learning Paths
            </h3>

            <p className="text-5xl font-black mt-3">
              4
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Interview Readiness
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.readiness}%
            </p>

          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-3xl font-bold">
              AI Learning Dependency Analysis
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            The dependency graph maps foundational concepts to advanced
            interview topics. AI identifies completed skills, weak areas,
            missing prerequisites, and recommends the next concept you
            should study.
          </p>

        </div>

        {/* Graph Legend */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-wrap gap-5">

            <div className="flex items-center gap-2">

              <span className="w-4 h-4 rounded-full bg-green-500" />

              <span className="text-sm">
                Completed
              </span>

            </div>

            <div className="flex items-center gap-2">

              <span className="w-4 h-4 rounded-full bg-orange-500" />

              <span className="text-sm">
                Weak
              </span>

            </div>

            <div className="flex items-center gap-2">

              <span className="w-4 h-4 rounded-full bg-gray-400" />

              <span className="text-sm">
                Locked
              </span>

            </div>

            <div className="flex items-center gap-2">

              <span className="w-4 h-4 rounded-full bg-violet-600" />

              <span className="text-sm">
                Selected
              </span>

            </div>

          </div>

        </div>

        {/* Dependency Graph */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Network className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Interview Topic Dependency Graph
            </h2>

          </div>

          <div className="overflow-x-auto pb-6">

            <div className="min-w-[1050px]">

              {/* Foundation */}

              <div className="flex items-center justify-center gap-5">

                {topics.slice(0, 2).map((topic) => (

                  <React.Fragment key={topic.id}>

                    <button
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`w-52 min-h-[150px] rounded-2xl border-2 p-5 text-left transition ${getNodeClasses(
                        topic.status,
                        selectedTopic === topic.id
                      )}`}
                    >

                      <div className="flex justify-between items-start">

                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center">

                          {topic.status === "completed" ? (
                            <CheckCircle2
                              size={21}
                              className="text-green-600"
                            />
                          ) : (
                            <Target
                              size={21}
                              className="text-violet-600"
                            />
                          )}

                        </div>

                        <span className="text-xs font-semibold">
                          {topic.mastery}%
                        </span>

                      </div>

                      <h3 className="font-bold mt-5">
                        {topic.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {topic.level}
                      </p>

                    </button>

                    {topic.next && (
                      <ArrowRight
                        className="text-gray-400 shrink-0"
                        size={26}
                      />
                    )}

                  </React.Fragment>

                ))}

              </div>

              {/* Connector */}

              <div className="flex justify-center my-8">

                <div className="w-px h-14 bg-gray-300 dark:bg-gray-700" />

              </div>

              {/* Intermediate */}

              <div className="flex items-center justify-center gap-5">

                {topics.slice(2, 4).map((topic) => (

                  <React.Fragment key={topic.id}>

                    <button
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`w-52 min-h-[150px] rounded-2xl border-2 p-5 text-left transition ${getNodeClasses(
                        topic.status,
                        selectedTopic === topic.id
                      )}`}
                    >

                      <div className="flex justify-between items-start">

                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center">

                          {topic.status === "weak" ? (
                            <AlertTriangle
                              size={21}
                              className="text-orange-500"
                            />
                          ) : (
                            <Lock
                              size={21}
                              className="text-gray-500"
                            />
                          )}

                        </div>

                        <span className="text-xs font-semibold">
                          {topic.mastery}%
                        </span>

                      </div>

                      <h3 className="font-bold mt-5">
                        {topic.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {topic.level}
                      </p>

                    </button>

                    {topic.next && (
                      <ArrowRight
                        className="text-gray-400 shrink-0"
                        size={26}
                      />
                    )}

                  </React.Fragment>

                ))}

              </div>

              {/* Connector */}

              <div className="flex justify-center my-8">

                <div className="w-px h-14 bg-gray-300 dark:bg-gray-700" />

              </div>

              {/* Advanced */}

              <div className="flex items-center justify-center gap-5">

                {topics.slice(4).map((topic, index) => (

                  <React.Fragment key={topic.id}>

                    <button
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`w-52 min-h-[150px] rounded-2xl border-2 p-5 text-left transition ${getNodeClasses(
                        topic.status,
                        selectedTopic === topic.id
                      )}`}
                    >

                      <div className="flex justify-between items-start">

                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center">

                          <Lock
                            size={21}
                            className="text-gray-500"
                          />

                        </div>

                        <span className="text-xs font-semibold">
                          {topic.mastery}%
                        </span>

                      </div>

                      <h3 className="font-bold mt-5">
                        {topic.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {topic.level}
                      </p>

                    </button>

                    {index === 0 && (
                      <ArrowRight
                        className="text-gray-400 shrink-0"
                        size={26}
                      />
                    )}

                  </React.Fragment>

                ))}

              </div>

            </div>

          </div>

        </div>

        {/* Selected Topic Details */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

            <div>

              <div className="flex items-center gap-3">

                <Sparkles className="text-violet-600" />

                <p className="text-sm text-gray-500">
                  Selected Topic
                </p>

              </div>

              <h2 className="text-3xl font-bold mt-2">
                {selected.name}
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-3xl">
                {selected.description}
              </p>

            </div>

            <div className="text-center">

              <p className="text-6xl font-black text-violet-600">
                {selected.mastery}%
              </p>

              <p className="text-gray-500 mt-2">
                Topic Mastery
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-gray-500">
                Level
              </p>

              <p className="font-bold text-lg mt-2">
                {selected.level}
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-gray-500">
                Status
              </p>

              <span
                className={`inline-block mt-2 px-4 py-2 rounded-full ${getStatusClasses(
                  selected.status
                )}`}
              >
                {selected.status}
              </span>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-gray-500">
                Recommended Next
              </p>

              <p className="font-bold text-lg mt-2">
                {selected.next || "Maintenance Practice"}
              </p>

            </div>

          </div>

        </div>

        {/* Prerequisites */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Topic Prerequisites
            </h2>

          </div>

          {selected.prerequisites.length === 0 ? (

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-6">

              <div className="flex items-center gap-3">

                <CheckCircle2 className="text-green-600" />

                <p className="font-semibold">
                  This is a foundation topic with no prerequisites.
                </p>

              </div>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              {selected.prerequisites.map((prerequisite, index) => {

                const prerequisiteTopic = topics.find(
                  (topic) => topic.id === prerequisite
                );

                return (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedTopic(prerequisite)
                    }
                    className="text-left rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:border-violet-400 transition"
                  >

                    <div className="flex items-center justify-between">

                      <h3 className="font-bold">
                        {prerequisite}
                      </h3>

                      {prerequisiteTopic?.status === "completed" ? (
                        <CheckCircle2
                          size={22}
                          className="text-green-600"
                        />
                      ) : (
                        <AlertTriangle
                          size={22}
                          className="text-orange-500"
                        />
                      )}

                    </div>

                    <p className="text-gray-500 mt-3">
                      Mastery: {prerequisiteTopic?.mastery || 0}%
                    </p>

                  </button>
                );
              })}

            </div>

          )}

        </div>
                {/* Missing Prerequisite Warning */}

        {selected.status === "locked" && (
          <div className="mt-10 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-200 dark:border-red-900/30 p-8">

            <div className="flex items-start gap-4">

              <AlertTriangle
                className="text-red-500 shrink-0"
                size={30}
              />

              <div>

                <h2 className="text-2xl font-bold">
                  Missing Prerequisites
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
                  You should strengthen the prerequisite concepts before
                  starting <strong>{selected.name}</strong>. Completing
                  these foundational topics will make this advanced topic
                  easier to understand.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">

              {selected.prerequisites.map((prerequisite, index) => {

                const prerequisiteTopic = topics.find(
                  (topic) => topic.id === prerequisite
                );

                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-white dark:bg-[#111827] p-6"
                  >

                    <div className="flex justify-between items-center">

                      <h3 className="font-bold">
                        {prerequisite}
                      </h3>

                      <span className="font-bold text-red-500">
                        {prerequisiteTopic?.mastery || 0}%
                      </span>

                    </div>

                    <div className="mt-4 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                        style={{
                          width: `${prerequisiteTopic?.mastery || 0}%`,
                        }}
                      />

                    </div>

                    <button
                      onClick={() =>
                        setSelectedTopic(prerequisite)
                      }
                      className="mt-5 w-full px-4 py-2 rounded-xl bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold"
                    >
                      Explore Prerequisite
                    </button>

                  </div>
                );
              })}

            </div>

          </div>
        )}

        {/* Weak Topic Warning */}

        {selected.status === "weak" && (
          <div className="mt-10 bg-orange-50 dark:bg-orange-900/10 rounded-3xl border border-orange-200 dark:border-orange-900/30 p-8">

            <div className="flex items-start gap-4">

              <AlertTriangle
                className="text-orange-500 shrink-0"
                size={30}
              />

              <div>

                <h2 className="text-2xl font-bold">
                  AI Weak Topic Alert
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
                  Your mastery of <strong>{selected.name}</strong> is
                  currently below the recommended level. Strengthen this
                  topic before progressing further through the dependency
                  graph.
                </p>

              </div>

            </div>

            <div className="mt-6 rounded-2xl bg-white dark:bg-[#111827] p-6">

              <div className="flex justify-between">

                <span>
                  Current Mastery
                </span>

                <span className="font-bold">
                  {selected.mastery}%
                </span>

              </div>

              <div className="mt-4 w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                  style={{
                    width: `${selected.mastery}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-4">
                Recommended mastery before advancing: 80%
              </p>

            </div>

          </div>
        )}

        {/* Recommended Next Topic */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Recommended Next Topic
            </h2>

          </div>

          <div className="rounded-3xl bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/10 dark:to-indigo-900/10 p-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              <div>

                <p className="text-sm text-violet-600 font-semibold">
                  NEXT BEST TOPIC
                </p>

                <h3 className="text-3xl font-black mt-2">
                  {selected.next || "Maintenance Practice"}
                </h3>

                <p className="text-gray-500 mt-3 max-w-2xl leading-7">
                  Based on your current mastery, prerequisite completion,
                  and interview preparation progress, this is the most
                  suitable next learning target.
                </p>

              </div>

              <button
                onClick={() =>
                  selected.next && setSelectedTopic(selected.next)
                }
                disabled={!selected.next}
                className="px-7 py-4 rounded-2xl bg-violet-600 text-white font-bold disabled:opacity-50"
              >
                Explore Topic
              </button>

            </div>

          </div>

        </div>

        {/* Learning Path */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Recommended Learning Path
            </h2>

          </div>

          <div className="space-y-4">

            {topics.map((topic, index) => (

              <div
                key={topic.id}
                className="flex items-center gap-4"
              >

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    topic.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : topic.status === "weak"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >

                  {topic.status === "completed" ? (
                    <CheckCircle2 size={24} />
                  ) : topic.status === "weak" ? (
                    <AlertTriangle size={24} />
                  ) : (
                    <Lock size={22} />
                  )}

                </div>

                <button
                  onClick={() =>
                    setSelectedTopic(topic.id)
                  }
                  className="flex-1 text-left"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="font-bold">
                        {index + 1}. {topic.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {topic.level}
                      </p>

                    </div>

                    <span className="font-bold">
                      {topic.mastery}%
                    </span>

                  </div>

                  <div className="mt-3 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                    <div
                      className={`h-full ${
                        topic.status === "completed"
                          ? "bg-green-500"
                          : topic.status === "weak"
                          ? "bg-orange-500"
                          : "bg-gray-400"
                      }`}
                      style={{
                        width: `${topic.mastery}%`,
                      }}
                    />

                  </div>

                </button>

              </div>

            ))}

          </div>

        </div>

        {/* Topic Mastery Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Topic Mastery Analytics
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {topics.map((topic) => (

              <button
                key={topic.id}
                onClick={() =>
                  setSelectedTopic(topic.id)
                }
                className="text-left rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="font-bold">
                      {topic.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {topic.level}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusClasses(
                      topic.status
                    )}`}
                  >
                    {topic.status}
                  </span>

                </div>

                <div className="mt-5 flex items-center gap-4">

                  <div className="flex-1 h-4 rounded-full bg-gray-200 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
                      style={{
                        width: `${topic.mastery}%`,
                      }}
                    />

                  </div>

                  <span className="font-bold">
                    {topic.mastery}%
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Learning Recommendations
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Strengthen Binary Search before moving deeper into tree-based problems.",
              "Maintain your Arrays and Searching knowledge through weekly revision.",
              "Complete prerequisite topics before unlocking advanced Graph problems.",
              "Practice at least five Binary Search questions before advancing.",
              "Use spaced revision to prevent completed foundation topics from becoming weak.",
              "Focus on prerequisite mastery rather than simply progressing through the graph.",
            ].map((recommendation, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex gap-3">

                  <Sparkles
                    className="text-violet-600 shrink-0"
                    size={22}
                  />

                  <p className="leading-7">
                    {recommendation}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Progress Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Dependency Progress Summary
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="rounded-2xl border border-green-200 dark:border-green-900/30 p-6">

              <CheckCircle2
                className="text-green-600"
                size={30}
              />

              <p className="text-gray-500 mt-4">
                Foundations Complete
              </p>

              <p className="text-4xl font-black mt-2">
                2
              </p>

            </div>

            <div className="rounded-2xl border border-orange-200 dark:border-orange-900/30 p-6">

              <AlertTriangle
                className="text-orange-500"
                size={30}
              />

              <p className="text-gray-500 mt-4">
                Topics Needing Attention
              </p>

              <p className="text-4xl font-black mt-2">
                3
              </p>

            </div>

            <div className="rounded-2xl border border-blue-200 dark:border-blue-900/30 p-6">

              <Network
                className="text-blue-600"
                size={30}
              />

              <p className="text-gray-500 mt-4">
                Dependencies Mapped
              </p>

              <p className="text-4xl font-black mt-2">
                14
              </p>

            </div>

            <div className="rounded-2xl border border-violet-200 dark:border-violet-900/30 p-6">

              <Target
                className="text-violet-600"
                size={30}
              />

              <p className="text-gray-500 mt-4">
                Overall Readiness
              </p>

              <p className="text-4xl font-black mt-2">
                {stats.readiness}%
              </p>

            </div>

          </div>

        </div>

        {/* Learning Strategy */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Smart Learning Strategy
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              [
                "🧱",
                "Build Foundations",
                "Master fundamental topics before progressing.",
              ],
              [
                "🔗",
                "Follow Dependencies",
                "Use prerequisite relationships to guide learning.",
              ],
              [
                "⚠️",
                "Fix Weak Areas",
                "Revisit topics with low mastery scores.",
              ],
              [
                "🚀",
                "Advance",
                "Move to advanced concepts once prerequisites are strong.",
              ],
            ].map(([icon, title, description], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Final Readiness */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-10 text-white">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Your Interview Learning Path
              </h2>

              <p className="leading-8 text-white/90 max-w-3xl">
                Follow the dependency graph instead of jumping randomly
                between topics. Strengthen weak prerequisites first, then
                progress toward advanced interview concepts.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black">
                {stats.readiness}%
              </p>

              <p className="text-white/70 mt-2">
                Interview Readiness
              </p>

            </div>

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Master the Path, Not Just the Topic 🚀
              </h2>

              <p className="leading-8 text-white/90">
                Strong interview preparation comes from understanding
                how concepts connect. Build your fundamentals, follow
                prerequisites, strengthen weak areas, and let the
                dependency graph guide your next step.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🧠
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Topics Complete
              </h3>

              <p className="text-5xl font-black">
                {stats.completedTopics}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewTopicDependencyGraph;