import React, { useMemo, useState } from "react";
import {
  Brain,
  Target,
  Lightbulb,
  Bug,
  Zap,
  Settings2,
  Search,
  UserRound,
  Code2,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Play,
  RefreshCw,
  ArrowRight,
  Clock3,
  Trophy,
  ShieldCheck,
} from "lucide-react";

const AIInterviewQuestionIntentBasedPractice = () => {
  const [selectedIntent, setSelectedIntent] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState("practice");
  const [showAnswer, setShowAnswer] = useState(false);
  const [started, setStarted] = useState(false);

  const intents = [
    {
      name: "Concept Explanation",
      shortName: "Concepts",
      icon: Lightbulb,
      color: "yellow",
      description:
        "Practice explaining technical concepts clearly and concisely.",
      skill: "Technical Communication",
      score: 84,
      questions: [
        {
          question:
            "Explain the difference between a process and a thread.",
          difficulty: "Easy",
          topic: "Operating Systems",
          expected:
            "Explain memory isolation, execution context, resource sharing, and why threads are generally lighter than processes.",
          tip:
            "Start with a simple definition, then compare their memory and resource characteristics.",
        },
        {
          question:
            "What is the purpose of an API?",
          difficulty: "Easy",
          topic: "Web Development",
          expected:
            "Explain that an API provides a defined interface through which software components communicate and access functionality or data.",
          tip:
            "Use a simple real-world example before discussing technical details.",
        },
      ],
    },
    {
      name: "Problem Solving",
      shortName: "Problem Solving",
      icon: Target,
      color: "blue",
      description:
        "Practice questions that require structured algorithmic reasoning.",
      skill: "Logical Reasoning",
      score: 91,
      questions: [
        {
          question:
            "Find the first non-repeating character in a string.",
          difficulty: "Medium",
          topic: "Strings",
          expected:
            "Count character frequencies and then scan the string again to find the first character whose frequency is one.",
          tip:
            "Explain the brute-force approach first, then improve it using a frequency map.",
        },
        {
          question:
            "Find two numbers in an array whose sum equals a target.",
          difficulty: "Easy",
          topic: "Arrays",
          expected:
            "Use a hash map to store previously seen values and check for the required complement during a single traversal.",
          tip:
            "Clearly explain why the complement lookup reduces the time complexity.",
        },
      ],
    },
    {
      name: "Debugging",
      shortName: "Debugging",
      icon: Bug,
      color: "red",
      description:
        "Identify bugs, diagnose root causes, and explain reliable fixes.",
      skill: "Debugging",
      score: 72,
      questions: [
        {
          question:
            "A loop sometimes runs forever. How would you debug it?",
          difficulty: "Medium",
          topic: "Programming",
          expected:
            "Inspect the loop condition, identify variables affecting termination, reproduce the issue, and use logging or a debugger to trace state changes.",
          tip:
            "Explain your debugging process rather than immediately guessing the bug.",
        },
        {
          question:
            "An API request returns stale data. How would you investigate?",
          difficulty: "Medium",
          topic: "Backend",
          expected:
            "Check caching layers, request parameters, database state, cache invalidation, and response headers before identifying the source of stale data.",
          tip:
            "Follow the complete data path from the client to the source of truth.",
        },
      ],
    },
    {
      name: "Optimization",
      shortName: "Optimization",
      icon: Zap,
      color: "orange",
      description:
        "Practice improving performance, efficiency, and resource usage.",
      skill: "Performance Optimization",
      score: 67,
      questions: [
        {
          question:
            "How would you optimize a slow database query?",
          difficulty: "Medium",
          topic: "Databases",
          expected:
            "Inspect the execution plan, evaluate indexes, review joins and filtering, and identify unnecessary operations or data retrieval.",
          tip:
            "Mention measurement and profiling before applying an optimization.",
        },
        {
          question:
            "How would you improve a slow API endpoint?",
          difficulty: "Medium",
          topic: "Backend",
          expected:
            "Measure the endpoint, identify bottlenecks, optimize database access, reduce unnecessary processing, and consider caching where appropriate.",
          tip:
            "Explain how you would verify that the optimization actually improved performance.",
        },
      ],
    },
    {
      name: "Design Decision",
      shortName: "Design",
      icon: Settings2,
      color: "violet",
      description:
        "Evaluate technical choices and explain why one approach is preferable.",
      skill: "System Thinking",
      score: 76,
      questions: [
        {
          question:
            "When would you choose SQL over a NoSQL database?",
          difficulty: "Medium",
          topic: "Databases",
          expected:
            "Compare structured relationships, consistency requirements, query patterns, scalability, and flexibility before selecting an approach.",
          tip:
            "Avoid claiming that one database type is always better.",
        },
        {
          question:
            "When would you introduce caching into a system?",
          difficulty: "Medium",
          topic: "System Design",
          expected:
            "Consider repeated reads, latency requirements, data volatility, cache invalidation complexity, and system load.",
          tip:
            "Discuss the trade-off between performance and data freshness.",
        },
      ],
    },
    {
      name: "Scenario Analysis",
      shortName: "Scenarios",
      icon: Search,
      color: "green",
      description:
        "Practice reasoning through realistic technical and workplace scenarios.",
      skill: "Analytical Thinking",
      score: 79,
      questions: [
        {
          question:
            "Your application suddenly receives ten times more traffic. What would you do?",
          difficulty: "Hard",
          topic: "System Design",
          expected:
            "Measure the bottleneck, scale appropriate components, introduce caching or queues where useful, and verify system health throughout the process.",
          tip:
            "Prioritize diagnosis before blindly adding infrastructure.",
        },
        {
          question:
            "A production deployment causes a sudden error spike. How would you respond?",
          difficulty: "Medium",
          topic: "DevOps",
          expected:
            "Assess impact, inspect monitoring and logs, roll back or mitigate if necessary, identify the root cause, and communicate the incident.",
          tip:
            "Show that you prioritize user impact and service stability first.",
        },
      ],
    },
    {
      name: "Behavioral Reasoning",
      shortName: "Behavioral",
      icon: UserRound,
      color: "pink",
      description:
        "Practice explaining decisions, experiences, teamwork, and behavior.",
      skill: "Communication",
      score: 63,
      questions: [
        {
          question:
            "Tell me about a time you disagreed with a teammate.",
          difficulty: "Medium",
          topic: "Behavioral",
          expected:
            "Describe the situation, disagreement, actions taken, communication approach, and outcome using a structured example.",
          tip:
            "Focus on what you did and what you learned rather than blaming the other person.",
        },
        {
          question:
            "Tell me about a technical mistake you made.",
          difficulty: "Medium",
          topic: "Behavioral",
          expected:
            "Explain the situation honestly, the mistake, its impact, how you fixed it, and what you changed afterward.",
          tip:
            "Demonstrate ownership and learning instead of trying to present yourself as mistake-free.",
        },
      ],
    },
  ];

  const selected = intents[selectedIntent];
  const currentQuestion = selected.questions[selectedQuestion];

  const totalQuestions = useMemo(
    () =>
      intents.reduce(
        (total, intent) => total + intent.questions.length,
        0
      ),
    [intents]
  );

  const averageScore = useMemo(
    () =>
      Math.round(
        intents.reduce((sum, intent) => sum + intent.score, 0) /
          intents.length
      ),
    [intents]
  );

  const weakIntents = useMemo(
    () => intents.filter((intent) => intent.score < 75),
    [intents]
  );

  const handleIntentChange = (index) => {
    setSelectedIntent(index);
    setSelectedQuestion(0);
    setShowAnswer(false);
    setStarted(false);
  };

  const handleQuestionChange = (index) => {
    setSelectedQuestion(index);
    setShowAnswer(false);
    setStarted(false);
  };

  const startPractice = () => {
    setStarted(true);
    setShowAnswer(false);
    setActiveTab("practice");
  };

  const resetPractice = () => {
    setStarted(false);
    setShowAnswer(false);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 65) return "text-orange-500";
    return "text-red-600";
  };

  const getDifficultyClass = (difficulty) => {
    if (difficulty === "Easy") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (difficulty === "Medium") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Brain size={34} className="text-violet-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Question Intent-Based Practice
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Practice interview questions based on the type of reasoning
              and response expected instead of only studying by topic.
            </p>
          </div>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target className="mx-auto text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Practice Intents
            </p>

            <p className="text-5xl font-black mt-3">
              {intents.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Code2 className="mx-auto text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Questions
            </p>

            <p className="text-5xl font-black mt-3">
              {totalQuestions}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3 className="mx-auto text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Average Skill Score
            </p>

            <p className="text-5xl font-black mt-3">
              {averageScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle className="mx-auto text-orange-500" size={30} />

            <p className="text-gray-500 mt-4">
              Focus Areas
            </p>

            <p className="text-5xl font-black mt-3">
              {weakIntents.length}
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-5">

                <Sparkles size={32} />

                <h2 className="text-2xl sm:text-3xl font-bold">
                  AI Intent Classification Engine
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-4xl">
                AI groups interview questions by the reasoning pattern they
                require. Practice exactly the type of thinking you want to
                improve, whether that means debugging, optimization,
                explanation, design, or behavioral reasoning.
              </p>

            </div>

            <button
              type="button"
              onClick={startPractice}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition shrink-0"
            >
              <Play size={20} />
              Start Intent Practice
            </button>

          </div>

        </div>

        {/* Intent Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Choose Practice Intent
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {intents.map((intent, index) => {

              const Icon = intent.icon;

              return (
                <button
                  key={intent.name}
                  type="button"
                  onClick={() => handleIntentChange(index)}
                  className={`text-left rounded-2xl border p-5 transition hover:-translate-y-1 ${
                    selectedIntent === index
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                      : "border-gray-200 dark:border-white/10"
                  }`}
                >

                  <div className="flex items-center justify-between gap-3">

                    <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                      <Icon
                        className="text-violet-600"
                        size={23}
                      />
                    </div>

                    <span
                      className={`font-black ${getScoreColor(
                        intent.score
                      )}`}
                    >
                      {intent.score}%
                    </span>

                  </div>

                  <h3 className="font-bold text-lg mt-5">
                    {intent.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 leading-6">
                    {intent.description}
                  </p>

                </button>
              );
            })}

          </div>

        </div>

        {/* Selected Intent */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                <selected.icon
                  className="text-violet-600"
                  size={28}
                />

              </div>

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {selected.name}
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm font-semibold">
                    {selected.skill}
                  </span>

                </div>

                <p className="text-gray-500 mt-2 leading-6">
                  {selected.description}
                </p>

              </div>

            </div>

            <div className="text-center shrink-0">

              <p
                className={`text-5xl font-black ${getScoreColor(
                  selected.score
                )}`}
              >
                {selected.score}%
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Current skill score
              </p>

            </div>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("practice")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "practice"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Intent Practice
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("progress")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "progress"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Skill Progress
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("recommendations")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "recommendations"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            AI Recommendations
          </button>

        </div>

        {/* Practice */}

        {activeTab === "practice" && (
          <div className="mt-6 grid lg:grid-cols-[280px_1fr] gap-8">

            {/* Question List */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

              <div className="flex items-center gap-3 mb-6">

                <MessageSquare
                  className="text-violet-600"
                  size={22}
                />

                <h2 className="text-xl font-bold">
                  Questions
                </h2>

              </div>

              <div className="space-y-3">

                {selected.questions.map((question, index) => (

                  <button
                    key={question.question}
                    type="button"
                    onClick={() => handleQuestionChange(index)}
                    className={`w-full text-left rounded-xl p-4 border transition ${
                      selectedQuestion === index
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                        : "border-gray-200 dark:border-white/10"
                    }`}
                  >

                    <div className="flex justify-between gap-3">

                      <span className="font-bold">
                        Question {index + 1}
                      </span>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getDifficultyClass(
                          question.difficulty
                        )}`}
                      >
                        {question.difficulty}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                      {question.question}
                    </p>

                  </button>

                ))}

              </div>

            </div>

            {/* Question Practice */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div className="flex items-center gap-3">

                  <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm font-semibold">
                    {currentQuestion.topic}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyClass(
                      currentQuestion.difficulty
                    )}`}
                  >
                    {currentQuestion.difficulty}
                  </span>

                </div>

                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock3 size={16} />
                  Intent: {selected.shortName}
                </span>

              </div>

              <h2 className="text-2xl sm:text-3xl font-bold mt-7 leading-9">
                {currentQuestion.question}
              </h2>

              <div className="mt-8 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

                <div className="flex items-center gap-3">

                  <Brain
                    className="text-violet-600"
                    size={22}
                  />

                  <h3 className="font-bold">
                    AI Intent
                  </h3>

                </div>

                <p className="text-gray-500 mt-3 leading-7">
                  This question primarily evaluates{" "}
                  <span className="font-bold text-violet-600">
                    {selected.name.toLowerCase()}
                  </span>
                  . Focus your answer on the reasoning pattern associated
                  with this intent.
                </p>

              </div>

              <div className="mt-8 flex flex-wrap gap-4">

                <button
                  type="button"
                  onClick={() => setStarted(true)}
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition"
                >
                  <Play size={20} />
                  {started ? "Practice Started" : "Start Question"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowAnswer((value) => !value)}
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 font-bold"
                >
                  {showAnswer ? (
                    <>
                      <RefreshCw size={20} />
                      Hide Guidance
                    </>
                  ) : (
                    <>
                      <Lightbulb size={20} />
                      Show Guidance
                    </>
                  )}
                </button>

                {started && (
                  <button
                    type="button"
                    onClick={resetPractice}
                    className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-gray-200 dark:border-white/10 font-bold"
                  >
                    <RefreshCw size={20} />
                    Reset
                  </button>
                )}

              </div>

              {showAnswer && (
                <div className="mt-8 space-y-5">

                  <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

                    <div className="flex items-center gap-3">

                      <CheckCircle2
                        className="text-green-600"
                        size={23}
                      />

                      <h3 className="font-bold">
                        Expected Reasoning
                      </h3>

                    </div>

                    <p className="text-gray-500 mt-3 leading-7">
                      {currentQuestion.expected}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-6">

                    <div className="flex items-center gap-3">

                      <Lightbulb
                        className="text-yellow-500"
                        size={23}
                      />

                      <h3 className="font-bold">
                        AI Practice Tip
                      </h3>

                    </div>

                    <p className="text-gray-500 mt-3 leading-7">
                      {currentQuestion.tip}
                    </p>

                  </div>

                </div>
              )}

            </div>

          </div>
        )}

        {/* Progress */}

        {activeTab === "progress" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-8">

              <BarChart3 className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Intent Skill Progress
              </h2>

            </div>

            <div className="space-y-6">

              {intents.map((intent) => {

                const Icon = intent.icon;

                return (
                  <div
                    key={intent.name}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                        <Icon
                          className="text-violet-600"
                          size={23}
                        />

                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-4">

                          <h3 className="font-bold">
                            {intent.name}
                          </h3>

                          <span
                            className={`font-black ${getScoreColor(
                              intent.score
                            )}`}
                          >
                            {intent.score}%
                          </span>

                        </div>

                        <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-4 overflow-hidden">

                          <div
                            className={`h-full rounded-full ${
                              intent.score >= 85
                                ? "bg-green-500"
                                : intent.score >= 75
                                ? "bg-blue-500"
                                : intent.score >= 65
                                ? "bg-orange-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${intent.score}%`,
                            }}
                          />

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Sparkles className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Focus Recommendations
                </h2>

              </div>

              <div className="space-y-5">

                {weakIntents.map((intent) => {

                  const Icon = intent.icon;

                  return (
                    <div
                      key={intent.name}
                      className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6"
                    >

                      <div className="flex items-center gap-4">

                        <Icon
                          className="text-orange-500"
                          size={25}
                        />

                        <div>

                          <h3 className="font-bold">
                            Practice {intent.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Current score: {intent.score}%
                          </p>

                        </div>

                      </div>

                      <p className="text-gray-500 mt-4 leading-6">
                        {intent.description}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          const index = intents.findIndex(
                            (item) => item.name === intent.name
                          );

                          handleIntentChange(index);
                          setActiveTab("practice");
                        }}
                        className="inline-flex items-center gap-2 mt-5 text-violet-600 font-bold"
                      >
                        Practice now
                        <ArrowRight size={17} />
                      </button>

                    </div>
                  );
                })}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Trophy className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  Your Strongest Intents
                </h2>

              </div>

              <div className="space-y-4">

                {intents
                  .filter((intent) => intent.score >= 80)
                  .map((intent, index) => {

                    const Icon = intent.icon;

                    return (
                      <div
                        key={intent.name}
                        className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-5"
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-11 h-11 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">

                            <Icon
                              className="text-green-600"
                              size={22}
                            />

                          </div>

                          <div className="flex-1">

                            <h3 className="font-bold">
                              {index + 1}. {intent.name}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              Strong performance in this reasoning style.
                            </p>

                          </div>

                          <span className="text-2xl font-black text-green-600">
                            {intent.score}%
                          </span>

                        </div>

                      </div>
                    );
                  })}

              </div>

            </div>

          </div>
        )}

        {/* Intent Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Interview Intent Coverage
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                label: "Technical Reasoning",
                value: 86,
                icon: "🧠",
              },
              {
                label: "Problem Solving",
                value: 91,
                icon: "🧩",
              },
              {
                label: "Communication",
                value: 68,
                icon: "🗣️",
              },
              {
                label: "Decision Making",
                value: 76,
                icon: "🎯",
              },
            ].map((item) => (

              <div
                key={item.label}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <p className="text-4xl">
                  {item.icon}
                </p>

                <h3 className="font-bold mt-4">
                  {item.label}
                </h3>

                <p className="text-3xl font-black text-violet-600 mt-3">
                  {item.value}%
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                  <div
                    className="h-full bg-violet-600 rounded-full"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* AI Practice Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Brain size={30} />

            <h2 className="text-3xl font-bold">
              AI Intent Practice Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Practice the Skill
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Choose the reasoning intent you want to improve instead of
                relying only on topic-based practice.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🔄
              </p>

              <h3 className="text-xl font-bold mt-4">
                Mix Question Topics
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Practice the same intent across different technical topics
                to build transferable reasoning skills.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                💡
              </p>

              <h3 className="text-xl font-bold mt-4">
                Understand the Intent
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Recognize what the interviewer is actually testing before
                deciding how to structure your answer.
              </p>

            </div>

          </div>

        </div>

        {/* Final AI Insight */}

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
                Interview preparation should not be limited to individual
                technologies. Strong candidates can explain concepts,
                solve problems, debug systems, optimize solutions, make
                design decisions, analyze scenarios, and communicate
                behavioral experiences effectively.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Intent Score
              </h3>

              <p className="text-5xl font-black">
                {averageScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionIntentBasedPractice;