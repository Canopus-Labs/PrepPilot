import React, { useMemo, useState } from "react";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  Award,
  CheckCircle2,
  Sparkles,
  Clock3,
  MessageSquare,
  BookOpen,
  RefreshCw,
  ArrowUpRight,
  CalendarDays,
  Activity,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

const AIInterviewAnswerPersonalProgressBenchmark = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [refreshing, setRefreshing] = useState(false);

  const periods = {
    week: {
      label: "This Week",
      previous: "Last Week",
      overall: 76,
      previousOverall: 69,
      technical: 81,
      previousTechnical: 73,
      communication: 74,
      previousCommunication: 68,
      accuracy: 79,
      previousAccuracy: 72,
      speed: 71,
      previousSpeed: 66,
      mastery: 77,
      previousMastery: 70,
    },
    month: {
      label: "This Month",
      previous: "Previous Month",
      overall: 84,
      previousOverall: 71,
      technical: 89,
      previousTechnical: 71,
      communication: 82,
      previousCommunication: 70,
      accuracy: 87,
      previousAccuracy: 74,
      speed: 78,
      previousSpeed: 68,
      mastery: 86,
      previousMastery: 72,
    },
    quarter: {
      label: "This Quarter",
      previous: "Previous Quarter",
      overall: 88,
      previousOverall: 75,
      technical: 91,
      previousTechnical: 76,
      communication: 86,
      previousCommunication: 73,
      accuracy: 90,
      previousAccuracy: 78,
      speed: 82,
      previousSpeed: 70,
      mastery: 89,
      previousMastery: 77,
    },
  };

  const current = periods[selectedPeriod];

  const metrics = [
    {
      title: "Overall Performance",
      current: current.overall,
      previous: current.previousOverall,
      icon: Target,
      description: "Overall interview performance",
    },
    {
      title: "Technical Explanation",
      current: current.technical,
      previous: current.previousTechnical,
      icon: Brain,
      description: "Technical answer quality",
    },
    {
      title: "Communication",
      current: current.communication,
      previous: current.previousCommunication,
      icon: MessageSquare,
      description: "Clarity and communication",
    },
    {
      title: "Accuracy",
      current: current.accuracy,
      previous: current.previousAccuracy,
      icon: CheckCircle2,
      description: "Correctness of responses",
    },
    {
      title: "Solving Speed",
      current: current.speed,
      previous: current.previousSpeed,
      icon: Clock3,
      description: "Question-solving efficiency",
    },
    {
      title: "Topic Mastery",
      current: current.mastery,
      previous: current.previousMastery,
      icon: BookOpen,
      description: "Concept mastery progress",
    },
  ];

  const progressHistory = [
    {
      month: "January",
      score: 58,
      technical: 61,
      communication: 55,
      accuracy: 60,
    },
    {
      month: "February",
      score: 64,
      technical: 66,
      communication: 61,
      accuracy: 65,
    },
    {
      month: "March",
      score: 69,
      technical: 71,
      communication: 66,
      accuracy: 70,
    },
    {
      month: "April",
      score: 74,
      technical: 77,
      communication: 71,
      accuracy: 75,
    },
    {
      month: "May",
      score: 79,
      technical: 83,
      communication: 77,
      accuracy: 81,
    },
    {
      month: "June",
      score: 84,
      technical: 89,
      communication: 82,
      accuracy: 87,
    },
  ];

  const topicProgress = [
    {
      topic: "Data Structures",
      current: 91,
      previous: 73,
      questions: 48,
    },
    {
      topic: "Algorithms",
      current: 86,
      previous: 69,
      questions: 42,
    },
    {
      topic: "System Design",
      current: 78,
      previous: 62,
      questions: 24,
    },
    {
      topic: "DBMS",
      current: 88,
      previous: 76,
      questions: 31,
    },
    {
      topic: "Operating Systems",
      current: 74,
      previous: 68,
      questions: 27,
    },
    {
      topic: "Computer Networks",
      current: 81,
      previous: 64,
      questions: 29,
    },
  ];

  const insights = [
    {
      title: "Technical explanation improved",
      value: "+18%",
      text: "Your technical explanations are clearer and more structured than your previous month.",
      icon: Brain,
      type: "positive",
    },
    {
      title: "Accuracy improved",
      value: "+13%",
      text: "You are making fewer conceptual mistakes when answering technical questions.",
      icon: CheckCircle2,
      type: "positive",
    },
    {
      title: "Communication improved",
      value: "+12%",
      text: "Your answers are becoming more direct and easier to follow.",
      icon: MessageSquare,
      type: "positive",
    },
    {
      title: "Speed still needs attention",
      value: "+10%",
      text: "Your solving speed improved, but you can continue practicing timed questions.",
      icon: Clock3,
      type: "warning",
    },
  ];

  const averageImprovement = useMemo(() => {
    return Math.round(
      metrics.reduce(
        (sum, metric) => sum + (metric.current - metric.previous),
        0
      ) / metrics.length
    );
  }, [current]);

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const getImprovement = (currentScore, previousScore) => {
    return currentScore - previousScore;
  };

  const getProgressColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-violet-600";
    if (score >= 60) return "text-orange-500";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <TrendingUp
                size={34}
                className="text-violet-600"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Answer Personal Progress Benchmark
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Measure your improvement against your own previous
                performance instead of relying only on absolute scores.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-[#111827] shadow font-semibold hover:-translate-y-0.5 transition disabled:opacity-60"
          >
            <RefreshCw
              size={19}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh Benchmark
          </button>

        </div>

        {/* Period Selector */}

        <div className="flex flex-wrap gap-3 mb-8">

          {Object.entries(periods).map(([key, period]) => (

            <button
              key={key}
              type="button"
              onClick={() => setSelectedPeriod(key)}
              className={`px-5 py-3 rounded-xl font-semibold transition ${
                selectedPeriod === key
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {period.label}
            </button>

          ))}

        </div>

        {/* Overview Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                <Target
                  className="text-violet-600"
                  size={25}
                />
              </div>

              <ArrowUpRight
                className="text-green-600"
                size={23}
              />

            </div>

            <p className="text-gray-500 mt-5">
              Current Score
            </p>

            <p className="text-5xl font-black mt-2">
              {current.overall}%
            </p>

            <p className="text-green-600 font-semibold mt-3">
              +{current.overall - current.previousOverall}% from previous
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <TrendingUp
                  className="text-green-600"
                  size={25}
                />
              </div>

              <span className="text-sm font-bold text-green-600">
                IMPROVING
              </span>

            </div>

            <p className="text-gray-500 mt-5">
              Average Improvement
            </p>

            <p className="text-5xl font-black mt-2">
              +{averageImprovement}%
            </p>

            <p className="text-gray-500 mt-3">
              Across tracked metrics
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Activity
                  className="text-blue-600"
                  size={25}
                />
              </div>

              <BarChart3
                className="text-blue-600"
                size={23}
              />

            </div>

            <p className="text-gray-500 mt-5">
              Questions Practiced
            </p>

            <p className="text-5xl font-black mt-2">
              156
            </p>

            <p className="text-gray-500 mt-3">
              This {selectedPeriod === "quarter" ? "quarter" : selectedPeriod === "month" ? "month" : "week"}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <Award
                  className="text-orange-500"
                  size={25}
                />
              </div>

              <span className="text-sm font-bold text-orange-500">
                PERSONAL BEST
              </span>

            </div>

            <p className="text-gray-500 mt-5">
              Best Score
            </p>

            <p className="text-5xl font-black mt-2">
              91%
            </p>

            <p className="text-gray-500 mt-3">
              Highest recorded performance
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
                  AI Personal Progress Engine
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-4xl">
                Your progress is measured against your own previous
                performance. This helps identify meaningful improvement even
                when your absolute score has not yet reached an advanced
                level.
              </p>

            </div>

            <div className="text-center shrink-0">

              <p className="text-6xl font-black">
                +{averageImprovement}%
              </p>

              <p className="text-white/80 mt-2">
                Average improvement
              </p>

            </div>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "overview"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Personal Benchmark
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("metrics")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "metrics"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Performance Metrics
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("topics")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "topics"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Topic Mastery
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "history"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Progress History
          </button>

        </div>

        {/* Personal Benchmark */}

        {activeTab === "overview" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Your Personal Benchmark
                </h2>

              </div>

              <div className="grid lg:grid-cols-3 gap-7">

                <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-7">

                  <p className="text-sm text-gray-500">
                    Current Performance
                  </p>

                  <p className="text-6xl font-black text-violet-600 mt-3">
                    {current.overall}%
                  </p>

                  <p className="text-gray-500 mt-3">
                    {current.label}
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-7">

                  <p className="text-sm text-gray-500">
                    Previous Performance
                  </p>

                  <p className="text-6xl font-black mt-3">
                    {current.previousOverall}%
                  </p>

                  <p className="text-gray-500 mt-3">
                    {current.previous}
                  </p>

                </div>

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-7">

                  <p className="text-sm text-gray-500">
                    Personal Improvement
                  </p>

                  <p className="text-6xl font-black text-green-600 mt-3">
                    +{current.overall - current.previousOverall}%
                  </p>

                  <p className="text-green-700 dark:text-green-400 mt-3 font-semibold">
                    Keep building on your progress
                  </p>

                </div>

              </div>

            </div>

            {/* Personalized Statement */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Sparkles className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  Your Personalized Progress Statement
                </h2>

              </div>

              <div className="rounded-2xl bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/10 dark:to-blue-900/10 border border-violet-200 dark:border-violet-900/30 p-7">

                <p className="text-xl sm:text-2xl font-bold leading-9">
                  Your technical explanation improved by{" "}
                  <span className="text-violet-600">
                    {current.technical - current.previousTechnical}%
                  </span>{" "}
                  compared with your {selectedPeriod === "quarter" ? "previous quarter" : selectedPeriod === "month" ? "previous month" : "previous week"}.
                </p>

                <p className="text-gray-500 mt-4 leading-7">
                  You are showing stronger technical reasoning, improved
                  accuracy, and clearer communication. Your progress is
                  meaningful because it is measured against your own history.
                </p>

              </div>

            </div>

            {/* Top Improvements */}

            <div className="grid md:grid-cols-2 gap-8">

              {insights.map((insight) => {

                const Icon = insight.icon;

                return (
                  <div
                    key={insight.title}
                    className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                  >

                    <div className="flex items-start justify-between gap-5">

                      <div className="flex items-center gap-4">

                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            insight.type === "positive"
                              ? "bg-green-100 dark:bg-green-900/20"
                              : "bg-orange-100 dark:bg-orange-900/20"
                          }`}
                        >

                          <Icon
                            className={
                              insight.type === "positive"
                                ? "text-green-600"
                                : "text-orange-500"
                            }
                            size={25}
                          />

                        </div>

                        <div>

                          <h3 className="font-bold text-lg">
                            {insight.title}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Personal comparison
                          </p>

                        </div>

                      </div>

                      <p
                        className={`text-2xl font-black ${
                          insight.type === "positive"
                            ? "text-green-600"
                            : "text-orange-500"
                        }`}
                      >
                        {insight.value}
                      </p>

                    </div>

                    <p className="text-gray-500 mt-5 leading-7">
                      {insight.text}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>
        )}

        {/* Metrics */}

        {activeTab === "metrics" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <BarChart3 className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Current vs Previous Performance
              </h2>

            </div>

            <div className="space-y-7">

              {metrics.map((metric) => {

                const Icon = metric.icon;
                const improvement = getImprovement(
                  metric.current,
                  metric.previous
                );

                return (
                  <div
                    key={metric.title}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                          <Icon
                            className="text-violet-600"
                            size={24}
                          />

                        </div>

                        <div>

                          <h3 className="font-bold text-lg">
                            {metric.title}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {metric.description}
                          </p>

                        </div>

                      </div>

                      <div className="text-left sm:text-right">

                        <p
                          className={`text-3xl font-black ${getProgressColor(
                            metric.current
                          )}`}
                        >
                          {metric.current}%
                        </p>

                        <p className="text-green-600 font-semibold mt-1">
                          +{improvement}% improvement
                        </p>

                      </div>

                    </div>

                    <div className="mt-6">

                      <div className="flex justify-between text-sm mb-2">

                        <span className="text-gray-500">
                          Previous: {metric.previous}%
                        </span>

                        <span className="font-semibold">
                          Current: {metric.current}%
                        </span>

                      </div>

                      <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
                          style={{
                            width: `${metric.current}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        )}

        {/* Topic Mastery */}

        {activeTab === "topics" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BookOpen className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Topic Mastery Changes
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {topicProgress.map((topic) => {

                  const improvement =
                    topic.current - topic.previous;

                  return (
                    <div
                      key={topic.topic}
                      className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                    >

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-bold text-lg">
                            {topic.topic}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {topic.questions} questions practiced
                          </p>

                        </div>

                        <div className="text-right">

                          <p
                            className={`text-2xl font-black ${getProgressColor(
                              topic.current
                            )}`}
                          >
                            {topic.current}%
                          </p>

                          <p className="text-sm text-green-600 font-semibold">
                            +{improvement}%
                          </p>

                        </div>

                      </div>

                      <div className="mt-5">

                        <div className="flex justify-between text-sm mb-2">

                          <span className="text-gray-500">
                            Previous {topic.previous}%
                          </span>

                          <span className="font-semibold">
                            Current {topic.current}%
                          </span>

                        </div>

                        <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                          <div
                            className="h-full bg-violet-600 rounded-full"
                            style={{
                              width: `${topic.current}%`,
                            }}
                          />

                        </div>

                      </div>

                      <div className="mt-5 flex items-center gap-2 text-green-600">

                        <ArrowUpRight size={18} />

                        <span className="font-semibold">
                          Improving steadily
                        </span>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-6">

                <Lightbulb className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  AI Topic Recommendation
                </h2>

              </div>

              <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

                <p className="font-bold text-lg">
                  Focus next on Operating Systems and System Design.
                </p>

                <p className="text-gray-500 mt-3 leading-7">
                  These areas have improved, but their mastery scores are
                  currently below your strongest topics. Targeted practice
                  could help create a more balanced preparation profile.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* History */}

        {activeTab === "history" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <CalendarDays className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Personal Progress History
                </h2>

              </div>

              <div className="space-y-5">

                {progressHistory.map((item, index) => {

                  const previous =
                    index > 0
                      ? progressHistory[index - 1].score
                      : null;

                  const improvement =
                    previous !== null
                      ? item.score - previous
                      : 0;

                  return (
                    <div
                      key={item.month}
                      className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                    >

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                        <div>

                          <p className="text-sm text-gray-500">
                            Progress Period
                          </p>

                          <h3 className="text-xl font-bold mt-1">
                            {item.month}
                          </h3>

                        </div>

                        <div className="text-left sm:text-right">

                          <p className="text-4xl font-black text-violet-600">
                            {item.score}%
                          </p>

                          {previous !== null && (
                            <p className="text-green-600 font-semibold mt-1">
                              +{improvement}% from previous month
                            </p>
                          )}

                        </div>

                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 mt-6">

                        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                          <p className="text-xs text-gray-500">
                            Technical
                          </p>

                          <p className="font-black text-lg mt-1">
                            {item.technical}%
                          </p>

                        </div>

                        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                          <p className="text-xs text-gray-500">
                            Communication
                          </p>

                          <p className="font-black text-lg mt-1">
                            {item.communication}%
                          </p>

                        </div>

                        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                          <p className="text-xs text-gray-500">
                            Accuracy
                          </p>

                          <p className="font-black text-lg mt-1">
                            {item.accuracy}%
                          </p>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Trend */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <TrendingUp className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Long-Term Improvement Trend
                </h2>

              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">

                {progressHistory.map((item) => (

                  <div
                    key={item.month}
                    className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5 text-center"
                  >

                    <p className="text-sm text-gray-500">
                      {item.month}
                    </p>

                    <p className="text-3xl font-black text-violet-600 mt-3">
                      {item.score}%
                    </p>

                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-4">

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

          </div>
        )}

        {/* AI Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Personalized Recommendations
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <TrendingUp
                className="text-green-600"
                size={27}
              />

              <p className="text-sm text-gray-500 mt-5">
                Strongest Improvement
              </p>

              <h3 className="text-xl font-bold mt-2">
                Technical Explanations
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Continue explaining technical concepts using structured
                reasoning and concrete examples.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <Target
                className="text-orange-500"
                size={27}
              />

              <p className="text-sm text-gray-500 mt-5">
                Next Focus Area
              </p>

              <h3 className="text-xl font-bold mt-2">
                System Design
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Practice architecture questions and explain scalability,
                reliability, and trade-offs more consistently.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <Clock3
                className="text-blue-600"
                size={27}
              />

              <p className="text-sm text-gray-500 mt-5">
                Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Improve Speed
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Add timed practice sessions while maintaining your current
                accuracy level.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3">

                <Award className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Personal Progress Score
                </h2>

              </div>

              <p className="text-gray-500 mt-4 leading-7 max-w-2xl">
                Your current performance is stronger than your previous
                benchmark across technical knowledge, communication,
                accuracy, speed, and topic mastery.
              </p>

            </div>

            <div className="text-center shrink-0">

              <p className="text-7xl font-black text-violet-600">
                {current.overall}%
              </p>

              <p className="text-green-600 font-bold mt-2">
                +{current.overall - current.previousOverall}% improvement
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
              style={{
                width: `${current.overall}%`,
              }}
            />

          </div>

        </div>

        {/* Final AI Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-5">

                <Sparkles size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your progress should be measured by how much you have
                improved, not only by where your score stands today. Your
                technical explanations, accuracy, and communication have
                improved compared with your previous performance. Continue
                practicing consistently and use your personal benchmark to
                identify the next area for improvement.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                📈
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Personal Growth
              </h3>

              <p className="text-5xl font-black">
                +{averageImprovement}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerPersonalProgressBenchmark;