import React, { useMemo, useState } from "react";
import {
  Brain,
  Target,
  BarChart3,
  Scale,
  Sparkles,
  TrendingUp,
  BookOpen,
  Code2,
  Calculator,
  Server,
  MessageSquare,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";

const AIInterviewQuestionTopicBalancer = () => {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [sessionSize, setSessionSize] = useState(20);

  const [topicWeights, setTopicWeights] = useState({
    DSA: 30,
    Aptitude: 15,
    "Core CS": 20,
    Programming: 20,
    Behavioral: 10,
    "Role-specific": 5,
  });

  const topics = [
    {
      name: "DSA",
      icon: Code2,
      color: "violet",
      practiced: 42,
      target: 30,
      questions: 8,
      accuracy: 78,
      lastPracticed: "Today",
      status: "Balanced",
    },
    {
      name: "Aptitude",
      icon: Calculator,
      color: "blue",
      practiced: 12,
      target: 15,
      questions: 3,
      accuracy: 84,
      lastPracticed: "2 days ago",
      status: "Balanced",
    },
    {
      name: "Core CS",
      icon: Server,
      color: "orange",
      practiced: 8,
      target: 20,
      questions: 4,
      accuracy: 64,
      lastPracticed: "6 days ago",
      status: "Needs Attention",
    },
    {
      name: "Programming",
      icon: Code2,
      color: "green",
      practiced: 22,
      target: 20,
      questions: 3,
      accuracy: 88,
      lastPracticed: "Yesterday",
      status: "Balanced",
    },
    {
      name: "Behavioral",
      icon: MessageSquare,
      color: "pink",
      practiced: 7,
      target: 10,
      questions: 1,
      accuracy: 71,
      lastPracticed: "4 days ago",
      status: "Needs Attention",
    },
    {
      name: "Role-specific",
      icon: Briefcase,
      color: "indigo",
      practiced: 9,
      target: 5,
      questions: 1,
      accuracy: 91,
      lastPracticed: "Yesterday",
      status: "Over-practiced",
    },
  ];

  const filteredTopics = useMemo(() => {
    if (selectedTopic === "All") {
      return topics;
    }

    return topics.filter((topic) => topic.name === selectedTopic);
  }, [selectedTopic]);

  const totalWeight = Object.values(topicWeights).reduce(
    (sum, value) => sum + Number(value),
    0
  );

  const updateWeight = (topic, value) => {
    const numericValue = Math.max(
      0,
      Math.min(100, Number(value) || 0)
    );

    setTopicWeights((previous) => ({
      ...previous,
      [topic]: numericValue,
    }));
  };

  const normalizeWeights = () => {
    const entries = Object.entries(topicWeights);

    if (totalWeight === 0) {
      const equalWeight = Math.floor(100 / entries.length);

      const normalized = {};

      entries.forEach(([topic]) => {
        normalized[topic] = equalWeight;
      });

      setTopicWeights(normalized);
      return;
    }

    const normalized = {};
    let assigned = 0;

    entries.forEach(([topic], index) => {
      if (index === entries.length - 1) {
        normalized[topic] = 100 - assigned;
      } else {
        const value = Math.round(
          (topicWeights[topic] / totalWeight) * 100
        );

        normalized[topic] = value;
        assigned += value;
      }
    });

    setTopicWeights(normalized);
  };

  const getStatusClasses = (status) => {
    if (status === "Balanced") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (status === "Over-practiced") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  const getTopicIcon = (topicName) => {
    const topic = topics.find((item) => item.name === topicName);

    if (!topic) {
      return Target;
    }

    return topic.icon;
  };

  const calculateQuestions = (weight) => {
    return Math.max(
      0,
      Math.round((sessionSize * weight) / 100)
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Scale
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Question Topic Balancer
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Automatically balance interview practice across DSA,
              aptitude, core CS, programming, behavioral, and
              role-specific topics.
            </p>
          </div>

        </div>

        {/* Overview Metrics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Topics Tracked
            </p>

            <p className="text-5xl font-black mt-3">
              {topics.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Questions Practiced
            </p>

            <p className="text-5xl font-black mt-3">
              109
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Scale
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Balance Score
            </p>

            <p className="text-5xl font-black mt-3">
              82%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Topics Needing Focus
            </p>

            <p className="text-5xl font-black mt-3">
              2
            </p>

          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Topic Balancing Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI analyzes your preparation history, question frequency,
            accuracy, and time since each topic was practiced. It then
            recommends a balanced question mix so that strong topics
            remain active while neglected topics receive additional
            attention.
          </p>

        </div>

        {/* Current Balance */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

            <div>

              <h2 className="text-2xl font-bold">
                Current Topic Balance
              </h2>

              <p className="text-gray-500 mt-2">
                Compare your actual preparation distribution with your
                preferred topic weights.
              </p>

            </div>

            <div className="px-5 py-3 rounded-2xl bg-violet-50 dark:bg-violet-900/10">

              <p className="text-sm text-gray-500">
                Balance Score
              </p>

              <p className="text-3xl font-black text-violet-600">
                82%
              </p>

            </div>

          </div>

          <div className="space-y-7">

            {topics.map((topic, index) => {

              const percentage = Math.min(
                topic.practiced,
                100
              );

              return (
                <div key={index}>

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-2">

                    <div className="flex items-center gap-3">

                      <topic.icon
                        size={21}
                        className="text-violet-600"
                      />

                      <span className="font-semibold">
                        {topic.name}
                      </span>

                    </div>

                    <span className="text-sm text-gray-500">
                      {topic.practiced}% practiced · {topic.target}% target
                    </span>

                  </div>

                  <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
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

        {/* Topic Filter */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-6">

            <BookOpen className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Topic Preparation History
            </h2>

          </div>

          <div className="flex flex-wrap gap-3">

            {["All", ...topics.map((topic) => topic.name)].map(
              (topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    selectedTopic === topic
                      ? "bg-violet-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {topic}
                </button>
              )
            )}

          </div>

        </div>

        {/* Topic Cards */}

        <div className="mt-10 grid lg:grid-cols-2 gap-6">

          {filteredTopics.map((topic, index) => (

            <div
              key={index}
              className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                    <topic.icon
                      size={24}
                      className="text-violet-600"
                    />

                  </div>

                  <div>

                    <h3 className="text-xl font-bold">
                      {topic.name}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Last practiced {topic.lastPracticed}
                    </p>

                  </div>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                    topic.status
                  )}`}
                >
                  {topic.status}
                </span>

              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-7">

                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                  <p className="text-sm text-gray-500">
                    Practiced
                  </p>

                  <p className="text-2xl font-black mt-1">
                    {topic.practiced}%
                  </p>

                </div>

                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                  <p className="text-sm text-gray-500">
                    Target
                  </p>

                  <p className="text-2xl font-black mt-1">
                    {topic.target}%
                  </p>

                </div>

                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                  <p className="text-sm text-gray-500">
                    Accuracy
                  </p>

                  <p className="text-2xl font-black mt-1">
                    {topic.accuracy}%
                  </p>

                </div>

              </div>

              <div className="mt-6">

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-gray-500">
                    Preparation coverage
                  </span>

                  <span className="font-semibold">
                    {topic.practiced}%
                  </span>

                </div>

                <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${topic.practiced}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* User Topic Weights */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

            <div>

              <div className="flex items-center gap-3">

                <SlidersHorizontal className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Configure Topic Weights
                </h2>

              </div>

              <p className="text-gray-500 mt-2">
                Set how strongly each topic should appear in future
                practice sessions.
              </p>

            </div>

            <button
              type="button"
              onClick={normalizeWeights}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
            >
              <RefreshCw size={18} />
              Normalize to 100%
            </button>

          </div>

          <div className="mb-8 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-gray-500">
                  Current Weight Total
                </p>

                <p
                  className={`text-3xl font-black mt-1 ${
                    totalWeight === 100
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {totalWeight}%
                </p>

              </div>

              <div className="text-right">

                <p className="text-sm text-gray-500">
                  Recommended
                </p>

                <p className="font-bold mt-1">
                  100%
                </p>

              </div>

            </div>

          </div>

          <div className="space-y-7">

            {Object.entries(topicWeights).map(
              ([topic, weight]) => {

                const Icon = getTopicIcon(topic);

                return (
                  <div key={topic}>

                    <div className="flex items-center justify-between gap-4 mb-3">

                      <div className="flex items-center gap-3">

                        <Icon
                          size={20}
                          className="text-violet-600"
                        />

                        <span className="font-semibold">
                          {topic}
                        </span>

                      </div>

                      <span className="font-black text-violet-600">
                        {weight}%
                      </span>

                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={weight}
                      onChange={(event) =>
                        updateWeight(
                          topic,
                          event.target.value
                        )
                      }
                      className="w-full accent-violet-600"
                    />

                  </div>
                );
              }
            )}

          </div>

        </div>

        {/* Practice Session Configuration */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Practice Session Configuration
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <label className="block font-semibold mb-3">
                Questions per session
              </label>

              <input
                type="number"
                min="5"
                max="100"
                value={sessionSize}
                onChange={(event) =>
                  setSessionSize(
                    Math.max(
                      5,
                      Math.min(
                        100,
                        Number(event.target.value) || 5
                      )
                    )
                  )
                }
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 px-4 py-3 outline-none"
              />

              <p className="text-sm text-gray-500 mt-2">
                AI will distribute these questions according to your
                selected topic weights.
              </p>

            </div>

            <div>

              <label className="block font-semibold mb-3">
                Recommended session
              </label>

              <div className="rounded-xl bg-violet-50 dark:bg-violet-900/10 p-5">

                <p className="text-gray-500">
                  Balanced practice
                </p>

                <p className="text-3xl font-black text-violet-600 mt-2">
                  {sessionSize} questions
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* AI Generated Question Distribution */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Recommended Question Distribution
            </h2>

          </div>

          <p className="text-white/90 leading-7 mb-8">
            Based on your configured weights, AI will use the following
            distribution for a {sessionSize}-question practice session.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {Object.entries(topicWeights).map(
              ([topic, weight]) => {

                const Icon = getTopicIcon(topic);
                const questionCount =
                  calculateQuestions(weight);

                return (
                  <div
                    key={topic}
                    className="rounded-2xl bg-white/10 p-6"
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <Icon size={21} />

                        <span className="font-bold">
                          {topic}
                        </span>

                      </div>

                      <span className="text-xl font-black">
                        {weight}%
                      </span>

                    </div>

                    <p className="text-4xl font-black mt-6">
                      {questionCount}
                    </p>

                    <p className="text-white/70">
                      recommended questions
                    </p>

                  </div>
                );
              }
            )}

          </div>

        </div>

        {/* AI Balancing Rules */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Balancing Rules
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                title: "Avoid Topic Neglect",
                description:
                  "Topics that have not been practiced recently receive additional priority.",
                icon: <AlertTriangle className="text-orange-500" />,
              },
              {
                title: "Respect User Preferences",
                description:
                  "Configured topic weights influence how many questions appear in each session.",
                icon: <SlidersHorizontal className="text-violet-600" />,
              },
              {
                title: "Consider Weak Areas",
                description:
                  "Topics with lower accuracy can receive additional practice opportunities.",
                icon: <Target className="text-red-500" />,
              },
              {
                title: "Prevent Over-Practice",
                description:
                  "Topics already receiving excessive attention are temporarily reduced.",
                icon: <Scale className="text-blue-600" />,
              },
              {
                title: "Maintain Variety",
                description:
                  "AI prevents sessions from becoming dominated by a single topic.",
                icon: <RefreshCw className="text-green-600" />,
              },
              {
                title: "Adapt Over Time",
                description:
                  "The question mix changes as preparation history and performance change.",
                icon: <TrendingUp className="text-indigo-600" />,
              },
            ].map((rule, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {rule.icon}
                </div>

                <h3 className="font-bold text-lg mt-5">
                  {rule.title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {rule.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Weak Topics */}

        <div className="mt-10 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-3xl p-8">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center shrink-0">

              <AlertTriangle className="text-red-600" />

            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Topics Requiring More Attention
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
                Your preparation history shows that{" "}
                <strong>Core CS</strong> and{" "}
                <strong>Behavioral</strong> topics are currently
                under-practiced. AI recommends increasing their exposure
                in upcoming sessions.
              </p>

              <div className="flex flex-wrap gap-3 mt-5">

                <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 font-semibold">
                  Core CS · 8% practiced
                </span>

                <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 font-semibold">
                  Behavioral · 7% practiced
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Balanced Preparation Benefits */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Benefits of Balanced Preparation
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: "🎯",
                title: "Complete Coverage",
                description:
                  "Practice all important interview areas instead of repeatedly focusing on one topic.",
              },
              {
                icon: "🧠",
                title: "Stronger Fundamentals",
                description:
                  "Regularly revisit core concepts before moving to advanced topics.",
              },
              {
                icon: "📈",
                title: "Better Readiness",
                description:
                  "Build a more balanced skill profile for real interviews.",
              },
              {
                icon: "⚡",
                title: "Efficient Practice",
                description:
                  "Spend more time on neglected and weak topics automatically.",
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

        {/* AI Personalized Recommendation */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Personalized Recommendation
            </h2>

          </div>

          <p className="text-white/90 leading-8 max-w-4xl">
            Your current preparation is strongest in DSA and Programming,
            but Core CS and Behavioral topics need more attention. AI
            recommends temporarily increasing these areas while reducing
            repeated practice in Role-specific questions. This creates a
            more balanced preparation profile without removing topics you
            are already strong in.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mt-8">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Increase
              </p>

              <p className="text-2xl font-black mt-2">
                Core CS
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Increase
              </p>

              <p className="text-2xl font-black mt-2">
                Behavioral
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Reduce
              </p>

              <p className="text-2xl font-black mt-2">
                Role-specific
              </p>

            </div>

          </div>

        </div>

        {/* Preparation Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <h2 className="text-2xl font-bold mb-8">
            Balanced Preparation Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: "📚",
                title: "Cover All Topics",
                description:
                  "Make sure every important interview category receives regular practice.",
              },
              {
                icon: "⚖️",
                title: "Balance Your Time",
                description:
                  "Avoid spending most of your preparation time on one familiar area.",
              },
              {
                icon: "📊",
                title: "Review Performance",
                description:
                  "Use accuracy and completion history to identify neglected areas.",
              },
              {
                icon: "🔄",
                title: "Adapt Regularly",
                description:
                  "Update your topic weights as your strengths and weaknesses change.",
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

        {/* Final Balance Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Preparation Balance
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your preparation has a good foundation, but additional
                attention to neglected topics will improve overall
                interview readiness. Continue using adaptive topic
                balancing as your performance changes.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                82%
              </p>

              <p className="text-gray-500 mt-2">
                Well Balanced
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: "82%",
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
                Balanced preparation is more effective than repeatedly
                practicing familiar topics. By combining your preferred
                topic weights with preparation history and performance,
                AI can continuously adjust the question mix and help
                ensure that no important interview area is neglected.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                ⚖️
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Balance Score
              </h3>

              <p className="text-5xl font-black">
                82%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionTopicBalancer;