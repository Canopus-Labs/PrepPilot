import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Shuffle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  MessageSquare,
  Code2,
  Database,
  Users,
  RefreshCw,
  AlertTriangle,
  BarChart3,
  Lightbulb,
} from "lucide-react";

const AIInterviewQuestionContextSwitchingPractice = () => {
  const [activeTab, setActiveTab] = useState("session");
  const [currentTopic, setCurrentTopic] = useState("Data Structures");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [switchCount, setSwitchCount] = useState(2);
  const [isSwitching, setIsSwitching] = useState(false);

  const topics = [
    {
      name: "Data Structures",
      icon: Code2,
      color: "blue",
      question:
        "How would you detect a cycle in a linked list?",
    },
    {
      name: "System Design",
      icon: Database,
      color: "violet",
      question:
        "How would you design a scalable URL shortening service?",
    },
    {
      name: "Behavioral",
      icon: Users,
      color: "green",
      question:
        "Tell me about a time you had to solve a difficult problem under pressure.",
    },
    {
      name: "Databases",
      icon: Database,
      color: "orange",
      question:
        "What is the difference between indexing and partitioning?",
    },
  ];

  const transitions = [
    {
      from: "Data Structures",
      to: "System Design",
      adaptation: 86,
      responseTime: "18 sec",
      status: "Strong",
    },
    {
      from: "System Design",
      to: "Behavioral",
      adaptation: 79,
      responseTime: "24 sec",
      status: "Good",
    },
    {
      from: "Behavioral",
      to: "Databases",
      adaptation: 68,
      responseTime: "31 sec",
      status: "Needs Practice",
    },
  ];

  const performance = [
    {
      topic: "Data Structures",
      accuracy: 91,
      responseTime: 22,
    },
    {
      topic: "System Design",
      accuracy: 84,
      responseTime: 28,
    },
    {
      topic: "Behavioral",
      accuracy: 88,
      responseTime: 24,
    },
    {
      topic: "Databases",
      accuracy: 72,
      responseTime: 35,
    },
  ];

  const currentTopicData =
    topics.find((topic) => topic.name === currentTopic) || topics[0];

  const CurrentIcon = currentTopicData.icon;

  const handleContextSwitch = () => {
    setIsSwitching(true);

    setTimeout(() => {
      const currentIndex = topics.findIndex(
        (topic) => topic.name === currentTopic
      );

      const nextIndex = (currentIndex + 1) % topics.length;

      setCurrentTopic(topics[nextIndex].name);
      setQuestionIndex((previous) => previous + 1);
      setSwitchCount((previous) => previous + 1);
      setIsSwitching(false);
    }, 600);
  };

  const handleNextQuestion = () => {
    setQuestionIndex((previous) => previous + 1);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <Shuffle size={34} className="text-violet-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Context Switching Practice
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Practice adapting quickly when an interviewer unexpectedly
                switches between technical and behavioral topics.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleContextSwitch}
            disabled={isSwitching}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-60"
          >
            {isSwitching ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Switching Topic...
              </>
            ) : (
              <>
                <Shuffle size={19} />
                Switch Topic
              </>
            )}
          </button>

        </div>

        {/* AI Banner */}

        <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Think Fast. Adapt Faster.
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            Real interviews rarely follow a perfectly predictable topic
            sequence. This practice mode intentionally changes subjects so
            you can develop the ability to quickly reset your thinking and
            respond confidently.
          </p>

        </div>

        {/* Session Status */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                <CurrentIcon
                  size={28}
                  className="text-violet-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Current Topic
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {currentTopic}
                </h2>

              </div>

            </div>

            <div className="flex flex-wrap gap-4">

              <div className="px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800">

                <p className="text-xs text-gray-500">
                  Question
                </p>

                <p className="font-bold">
                  {questionIndex + 1}
                </p>

              </div>

              <div className="px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800">

                <p className="text-xs text-gray-500">
                  Topic Switches
                </p>

                <p className="font-bold">
                  {switchCount}
                </p>

              </div>

              <div className="px-5 py-3 rounded-xl bg-green-100 dark:bg-green-900/20">

                <p className="text-xs text-green-600">
                  Adaptation
                </p>

                <p className="font-bold text-green-600">
                  81%
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("session")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "session"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Practice Session
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("transitions")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "transitions"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Transition Analytics
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("performance")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "performance"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Performance
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

        {/* Practice Session */}

        {activeTab === "session" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7 sm:p-10">

              <div className="flex flex-col lg:flex-row justify-between gap-8">

                <div className="max-w-3xl">

                  <div className="flex flex-wrap items-center gap-3">

                    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300 text-sm font-bold">
                      {currentTopic}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 text-sm font-bold">
                      Context Switch Practice
                    </span>

                  </div>

                  <h2 className="text-3xl font-bold mt-7 leading-tight">
                    {currentTopicData.question}
                  </h2>

                  <p className="text-gray-500 mt-5 leading-7">
                    Take a moment to understand the new context, then answer
                    as if you were in a real interview.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-sm text-gray-500">
                    Adaptation Score
                  </p>

                  <p className="text-6xl font-black text-violet-600 mt-2">
                    81%
                  </p>

                  <p className="text-green-600 font-semibold mt-2">
                    Good Adaptability
                  </p>

                </div>

              </div>

              <textarea
                rows={7}
                placeholder="Type your interview response..."
                className="w-full mt-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-violet-500 resize-none leading-7"
              />

              <div className="flex flex-col sm:flex-row gap-4 justify-end mt-5">

                <button
                  type="button"
                  onClick={handleContextSwitch}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <Shuffle size={18} />
                  Switch Topic
                </button>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
                >
                  Submit & Continue
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

            {/* Topic Queue */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Shuffle className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Dynamic Topic Queue
                </h2>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {topics.map((topic, index) => {

                  const Icon = topic.icon;
                  const active = topic.name === currentTopic;

                  return (
                    <div
                      key={topic.name}
                      className={`rounded-2xl border p-5 transition ${
                        active
                          ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                          : "border-gray-200 dark:border-white/10"
                      }`}
                    >

                      <div className="flex items-center justify-between">

                        <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                          <Icon
                            size={23}
                            className="text-violet-600"
                          />

                        </div>

                        {active && (
                          <span className="text-xs font-bold text-violet-600">
                            ACTIVE
                          </span>
                        )}

                      </div>

                      <h3 className="font-bold mt-5">
                        {topic.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">
                        Question {index + 1}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        )}

        {/* Transition Analytics */}

        {activeTab === "transitions" && (
          <div className="mt-6 space-y-8">

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Shuffle className="text-violet-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Topic Switches
                </p>

                <p className="text-5xl font-black mt-2">
                  3
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <TrendingUp className="text-green-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Adaptation Score
                </p>

                <p className="text-5xl font-black text-green-600 mt-2">
                  81%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Clock className="text-blue-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Avg. Adaptation Time
                </p>

                <p className="text-5xl font-black mt-2">
                  24s
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Target className="text-orange-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Transition Accuracy
                </p>

                <p className="text-5xl font-black text-orange-600 mt-2">
                  82%
                </p>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7 overflow-x-auto">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Context Switch Performance
                </h2>

              </div>

              <table className="w-full min-w-[750px]">

                <thead>

                  <tr className="border-b border-gray-200 dark:border-white/10">

                    <th className="text-left p-4">
                      From
                    </th>

                    <th className="text-left p-4">
                      To
                    </th>

                    <th className="text-left p-4">
                      Adaptation
                    </th>

                    <th className="text-left p-4">
                      Response Time
                    </th>

                    <th className="text-left p-4">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {transitions.map((transition) => (

                    <tr
                      key={`${transition.from}-${transition.to}`}
                      className="border-b border-gray-100 dark:border-white/5"
                    >

                      <td className="p-4 font-semibold">
                        {transition.from}
                      </td>

                      <td className="p-4">

                        <div className="flex items-center gap-2">

                          <ArrowRight size={16} />

                          <span className="font-semibold">
                            {transition.to}
                          </span>

                        </div>

                      </td>

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <div className="w-28 h-2 rounded-full bg-gray-200 dark:bg-gray-700">

                            <div
                              className="h-full rounded-full bg-violet-600"
                              style={{
                                width: `${transition.adaptation}%`,
                              }}
                            />

                          </div>

                          <span className="font-bold">
                            {transition.adaptation}%
                          </span>

                        </div>

                      </td>

                      <td className="p-4">
                        {transition.responseTime}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            transition.status === "Strong"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : transition.status === "Good"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                              : "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                          }`}
                        >
                          {transition.status}
                        </span>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* Performance */}

        {activeTab === "performance" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Topic Performance
                </h2>

              </div>

              <div className="space-y-7">

                {performance.map((item) => (

                  <div key={item.topic}>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">

                      <span className="font-bold">
                        {item.topic}
                      </span>

                      <div className="flex gap-4 text-sm text-gray-500">

                        <span>
                          Accuracy: {item.accuracy}%
                        </span>

                        <span>
                          Time: {item.responseTime}s
                        </span>

                      </div>

                    </div>

                    <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                      <div
                        className={`h-full rounded-full ${
                          item.accuracy >= 85
                            ? "bg-green-500"
                            : item.accuracy >= 75
                            ? "bg-blue-500"
                            : "bg-orange-500"
                        }`}
                        style={{
                          width: `${item.accuracy}%`,
                        }}
                      />

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* Adaptability Score */}

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <TrendingUp className="text-green-600" />

                  <h2 className="text-2xl font-bold">
                    Adaptability Score
                  </h2>

                </div>

                <div className="text-center">

                  <p className="text-7xl font-black text-green-600">
                    81%
                  </p>

                  <p className="text-gray-500 mt-3">
                    Overall context-switching ability
                  </p>

                </div>

                <div className="mt-8 space-y-4">

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Topic switching
                    </span>

                    <strong>
                      86%
                    </strong>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Technical adaptation
                    </span>

                    <strong>
                      83%
                    </strong>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Behavioral transition
                    </span>

                    <strong>
                      75%
                    </strong>

                  </div>

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <AlertTriangle className="text-orange-500" />

                  <h2 className="text-2xl font-bold">
                    Area Needing Attention
                  </h2>

                </div>

                <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-6">

                  <h3 className="text-xl font-bold">
                    Database → Technical Topics
                  </h3>

                  <p className="text-gray-500 mt-4 leading-7">
                    Your response time increases when switching from
                    behavioral questions to database-related questions.
                    Additional mixed-topic practice may improve adaptation.
                  </p>

                  <div className="mt-6">

                    <p className="text-sm text-gray-500">
                      Current transition score
                    </p>

                    <p className="text-4xl font-black text-orange-600 mt-2">
                      68%
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Lightbulb className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  AI Recommendations
                </h2>

              </div>

              <div className="grid lg:grid-cols-3 gap-6">

                {[
                  {
                    title: "Practice Mixed Topics",
                    description:
                      "Combine DSA, databases, system design, and behavioral questions in the same session.",
                    icon: Shuffle,
                  },
                  {
                    title: "Improve Transition Speed",
                    description:
                      "Practice answering within a short preparation window after each topic switch.",
                    icon: Clock,
                  },
                  {
                    title: "Strengthen Databases",
                    description:
                      "Your lowest transition score occurs when database questions appear unexpectedly.",
                    icon: Brain,
                  },
                ].map((item) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-gray-200 dark:border-white/10 p-7"
                    >

                      <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                        <Icon
                          size={28}
                          className="text-violet-600"
                        />

                      </div>

                      <h3 className="text-xl font-bold mt-6">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 mt-3 leading-7">
                        {item.description}
                      </p>

                      <button
                        type="button"
                        className="mt-6 inline-flex items-center gap-2 text-violet-600 font-semibold hover:gap-3 transition-all"
                      >
                        Start Practice
                        <ArrowRight size={17} />
                      </button>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Training Plan */}

            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-7">

                <Target size={30} />

                <h2 className="text-3xl font-bold">
                  Recommended Practice Plan
                </h2>

              </div>

              <div className="grid md:grid-cols-4 gap-5">

                {[
                  [
                    "1",
                    "Technical",
                    "Start with one familiar technical topic.",
                  ],
                  [
                    "2",
                    "Switch",
                    "Move unexpectedly to an unrelated subject.",
                  ],
                  [
                    "3",
                    "Behavioral",
                    "Mix behavioral questions into technical practice.",
                  ],
                  [
                    "4",
                    "Review",
                    "Analyze adaptation speed after each transition.",
                  ],
                ].map(([number, title, description]) => (

                  <div
                    key={number}
                    className="rounded-2xl bg-white/10 p-6"
                  >

                    <div className="w-10 h-10 rounded-full bg-white text-green-600 flex items-center justify-center font-black">
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

          </div>
        )}

        {/* How It Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              How Context Switching Practice Works
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              {
                number: "1",
                title: "Start Topic",
                description:
                  "Begin with a technical or behavioral question.",
              },
              {
                number: "2",
                title: "Switch",
                description:
                  "AI introduces an unrelated topic without warning.",
              },
              {
                number: "3",
                title: "Measure",
                description:
                  "Track response accuracy and adaptation time.",
              },
              {
                number: "4",
                title: "Improve",
                description:
                  "AI recommends targeted mixed-topic practice.",
              },
            ].map((item) => (

              <div
                key={item.number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-black">
                  {item.number}
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
                "🎯",
                "Realistic Practice",
                "Simulates unpredictable interview conversations.",
              ],
              [
                "🧠",
                "Better Adaptability",
                "Trains users to quickly change their thinking context.",
              ],
              [
                "🔀",
                "Multi-Topic Skills",
                "Tests knowledge across unrelated technical areas.",
              ],
              [
                "💬",
                "Interview Confidence",
                "Reduces hesitation when unexpected questions appear.",
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

        {/* Final Recommendation */}

        <div className="mt-10 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Recommendation
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your overall context-switching ability is strong at 81%.
                Continue practicing unexpected transitions, especially between
                behavioral questions and database or other technical topics.
                Focus on reducing response preparation time after each switch.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🔀
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Adaptability
              </h3>

              <p className="text-5xl font-black">
                81%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionContextSwitchingPractice;