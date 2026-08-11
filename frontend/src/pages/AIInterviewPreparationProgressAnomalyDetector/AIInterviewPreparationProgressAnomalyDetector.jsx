import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Brain,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Clock,
  Target,
  CheckCircle2,
  BarChart3,
  RefreshCw,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const AIInterviewPreparationProgressAnomalyDetector = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [analyzing, setAnalyzing] = useState(false);

  const anomalies = [
    {
      title: "Sudden Accuracy Drop",
      value: "-16%",
      severity: "High",
      description:
        "Your accuracy in recent practice sessions has dropped significantly compared with your previous baseline.",
      recommendation:
        "Review recently practiced concepts before attempting more difficult questions.",
      icon: TrendingDown,
    },
    {
      title: "Increased Skip Rate",
      value: "+21%",
      severity: "Medium",
      description:
        "The number of skipped questions has increased during your recent sessions.",
      recommendation:
        "Practice weaker topics with easier questions to rebuild confidence.",
      icon: Activity,
    },
    {
      title: "Solving Time Change",
      value: "+34%",
      severity: "Medium",
      description:
        "Average solving time has increased noticeably for questions in one topic.",
      recommendation:
        "Review the underlying problem-solving patterns and practice timed questions.",
      icon: Clock,
    },
    {
      title: "Previously Mastered Topic",
      value: "5 fails",
      severity: "High",
      description:
        "You recently failed multiple questions from a topic that previously showed strong performance.",
      recommendation:
        "Revisit this topic and verify whether the recent questions introduced unfamiliar concepts.",
      icon: Target,
    },
  ];

  const weeklyPerformance = [
    { week: "Week 1", accuracy: 86, speed: 78, activity: 82 },
    { week: "Week 2", accuracy: 89, speed: 81, activity: 86 },
    { week: "Week 3", accuracy: 87, speed: 84, activity: 79 },
    { week: "Current", accuracy: 71, speed: 57, activity: 61 },
  ];

  const topicData = [
    { topic: "Arrays", previous: 91, current: 88 },
    { topic: "Strings", previous: 87, current: 82 },
    { topic: "Trees", previous: 84, current: 69 },
    { topic: "Graphs", previous: 79, current: 62 },
    { topic: "Dynamic Programming", previous: 74, current: 58 },
  ];

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("overview");
    }, 700);
  };

  const severityClass = (severity) => {
    if (severity === "High") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
              <Activity size={34} className="text-orange-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Preparation Progress Anomaly Detector
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Detect unusual changes in preparation performance and receive
                proactive recommendations.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Detecting Anomalies...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Progress
              </>
            )}
          </button>

        </div>

        {/* AI Status */}

        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-3xl p-6 sm:p-7">

          <div className="flex items-start gap-4">

            <AlertTriangle
              className="text-orange-600 shrink-0"
              size={28}
            />

            <div>

              <h2 className="font-bold text-lg">
                AI detected 4 unusual performance patterns
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-2 leading-7">
                Recent preparation activity differs from your historical
                performance baseline. Review the detected patterns below and
                consider the recommended actions.
              </p>

            </div>

          </div>

        </div>

        {/* Summary */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <AlertTriangle className="text-orange-600" size={30} />

            <p className="text-gray-500 mt-4">
              Anomalies Detected
            </p>

            <p className="text-5xl font-black mt-2">
              4
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <TrendingDown className="text-red-600" size={30} />

            <p className="text-gray-500 mt-4">
              Accuracy Change
            </p>

            <p className="text-5xl font-black text-red-600 mt-2">
              -16%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Clock className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Solving Time
            </p>

            <p className="text-5xl font-black mt-2">
              +34%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Affected Topics
            </p>

            <p className="text-5xl font-black mt-2">
              3
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Detect Changes Before They Become Problems
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            Instead of showing only historical statistics, AI compares recent
            preparation activity with your normal performance patterns and
            highlights unusual changes that may require attention.
          </p>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "overview"
                ? "bg-orange-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("anomalies")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "anomalies"
                ? "bg-orange-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Detected Anomalies
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("topics")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "topics"
                ? "bg-orange-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Topic Changes
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("recommendations")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "recommendations"
                ? "bg-orange-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Recommendations
          </button>

        </div>

        {/* Overview */}

        {activeTab === "overview" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Preparation Performance Trend
                </h2>

              </div>

              <div className="space-y-7">

                {weeklyPerformance.map((item) => (

                  <div key={item.week}>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">

                      <span className="font-bold">
                        {item.week}
                      </span>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>
                          Accuracy: {item.accuracy}%
                        </span>
                        <span>
                          Speed: {item.speed}%
                        </span>
                        <span>
                          Activity: {item.activity}%
                        </span>
                      </div>

                    </div>

                    <div className="grid grid-cols-3 gap-2">

                      <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{
                            width: `${item.accuracy}%`,
                          }}
                        />

                      </div>

                      <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                        <div
                          className="h-full bg-violet-500 rounded-full"
                          style={{
                            width: `${item.speed}%`,
                          }}
                        />

                      </div>

                      <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{
                            width: `${item.activity}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                ))}

              </div>

              <div className="flex flex-wrap gap-5 mt-8 text-sm">

                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  Accuracy
                </span>

                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-violet-500" />
                  Solving Speed
                </span>

                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500" />
                  Activity
                </span>

              </div>

            </div>

            {/* Main Detection */}

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <TrendingDown className="text-red-600" />

                  <h2 className="text-2xl font-bold">
                    Current Performance Shift
                  </h2>

                </div>

                <div className="text-center">

                  <p className="text-7xl font-black text-red-600">
                    -16%
                  </p>

                  <p className="text-gray-500 mt-3">
                    Accuracy compared with historical baseline
                  </p>

                </div>

                <div className="mt-8 space-y-4">

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Historical baseline
                    </span>

                    <strong>
                      87%
                    </strong>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Current performance
                    </span>

                    <strong className="text-red-600">
                      71%
                    </strong>

                  </div>

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <Lightbulb className="text-yellow-500" />

                  <h2 className="text-2xl font-bold">
                    AI Interpretation
                  </h2>

                </div>

                <p className="text-gray-500 leading-8">
                  The current decline appears concentrated around more
                  advanced topics. Your recent solving time has also increased,
                  suggesting that you may benefit from reviewing foundational
                  concepts before increasing question difficulty.
                </p>

                <div className="mt-7 rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-5">

                  <p className="font-bold text-violet-700 dark:text-violet-300">
                    Suggested next action
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 mt-2 leading-7">
                    Revisit weak concepts and complete a short targeted
                    practice session before returning to advanced questions.
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Anomalies */}

        {activeTab === "anomalies" && (
          <div className="mt-6 space-y-6">

            {anomalies.map((anomaly) => {

              const Icon = anomaly.icon;

              return (
                <div
                  key={anomaly.title}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">

                    <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">

                      <Icon
                        size={28}
                        className="text-orange-600"
                      />

                    </div>

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="text-xl font-bold">
                          {anomaly.title}
                        </h2>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${severityClass(
                            anomaly.severity
                          )}`}
                        >
                          {anomaly.severity} Anomaly
                        </span>

                      </div>

                      <p className="text-gray-500 mt-3 leading-7">
                        {anomaly.description}
                      </p>

                      <div className="mt-5 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                        <p className="text-sm text-gray-500">
                          AI Recommended Action
                        </p>

                        <p className="font-semibold mt-2 leading-7">
                          {anomaly.recommendation}
                        </p>

                      </div>

                    </div>

                    <div className="text-center shrink-0">

                      <p className="text-4xl font-black text-orange-600">
                        {anomaly.value}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* Topic Changes */}

        {activeTab === "topics" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7 overflow-x-auto">

              <div className="flex items-center gap-3 mb-8">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Topic Performance Changes
                </h2>

              </div>

              <table className="w-full min-w-[700px]">

                <thead>

                  <tr className="border-b border-gray-200 dark:border-white/10">

                    <th className="text-left p-4">
                      Topic
                    </th>

                    <th className="text-left p-4">
                      Previous
                    </th>

                    <th className="text-left p-4">
                      Current
                    </th>

                    <th className="text-left p-4">
                      Change
                    </th>

                    <th className="text-left p-4">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {topicData.map((topic) => {

                    const change = topic.current - topic.previous;

                    return (
                      <tr
                        key={topic.topic}
                        className="border-b border-gray-100 dark:border-white/5"
                      >

                        <td className="p-4 font-bold">
                          {topic.topic}
                        </td>

                        <td className="p-4">
                          {topic.previous}%
                        </td>

                        <td className="p-4">
                          {topic.current}%
                        </td>

                        <td className="p-4 font-bold text-red-600">
                          {change}%
                        </td>

                        <td className="p-4">

                          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-xs font-bold">
                            Needs Review
                          </span>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {topicData.slice(2).map((topic) => (

                <div
                  key={topic.topic}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <h3 className="text-xl font-bold">
                    {topic.topic}
                  </h3>

                  <div className="mt-6">

                    <div className="flex justify-between text-sm mb-2">

                      <span className="text-gray-500">
                        Previous
                      </span>

                      <span className="font-bold">
                        {topic.previous}%
                      </span>

                    </div>

                    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${topic.previous}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div className="mt-5">

                    <div className="flex justify-between text-sm mb-2">

                      <span className="text-gray-500">
                        Current
                      </span>

                      <span className="font-bold text-red-600">
                        {topic.current}%
                      </span>

                    </div>

                    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{
                          width: `${topic.current}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>
              ))}

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
                  AI Recommended Actions
                </h2>

              </div>

              <div className="grid lg:grid-cols-3 gap-6">

                {[
                  {
                    icon: Brain,
                    title: "Review Weak Concepts",
                    description:
                      "Revisit Graphs and Dynamic Programming before increasing question difficulty.",
                  },
                  {
                    icon: Target,
                    title: "Targeted Practice",
                    description:
                      "Complete a short set of easier questions in the affected topics.",
                  },
                  {
                    icon: Clock,
                    title: "Use Timed Practice",
                    description:
                      "Gradually rebuild solving speed with controlled timed sessions.",
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
                        Start Action
                        <ArrowRight size={17} />
                      </button>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Action Plan */}

            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-7">

                <CheckCircle2 size={30} />

                <h2 className="text-3xl font-bold">
                  Suggested Recovery Plan
                </h2>

              </div>

              <div className="grid md:grid-cols-4 gap-5">

                {[
                  [
                    "1",
                    "Review",
                    "Revisit the concepts behind the recent failures.",
                  ],
                  [
                    "2",
                    "Practice",
                    "Solve a small number of targeted questions.",
                  ],
                  [
                    "3",
                    "Measure",
                    "Check whether accuracy and speed return to baseline.",
                  ],
                  [
                    "4",
                    "Progress",
                    "Gradually increase difficulty after improvement.",
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

        {/* Detection Metrics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Metrics Used for Anomaly Detection
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {[
              ["Accuracy Changes", "Sudden performance drops"],
              ["Skip Rate", "Unexpected increase in skipped questions"],
              ["Solving Time", "Significant speed changes"],
              ["Repeated Failures", "Failures in previously mastered topics"],
              ["Practice Activity", "Unexpected changes in session activity"],
              ["Historical Baseline", "Comparison against previous performance"],
            ].map(([title, description]) => (

              <div
                key={title}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <h3 className="font-bold text-lg">
                  {title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* How It Works */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              How AI Detects Anomalies
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Collect",
                "Gather recent preparation performance data.",
              ],
              [
                "2",
                "Establish Baseline",
                "Compare activity with the user's historical patterns.",
              ],
              [
                "3",
                "Detect",
                "Identify statistically or noticeably unusual changes.",
              ],
              [
                "4",
                "Recommend",
                "Suggest an appropriate next preparation action.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl bg-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-white text-violet-600 flex items-center justify-center font-black">
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
                Your recent performance shows a noticeable decline compared
                with your historical baseline, particularly in Graphs and
                Dynamic Programming. Revisit these topics with targeted
                practice before increasing difficulty.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                ⚠️
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Attention Needed
              </h3>

              <p className="text-4xl font-black">
                4 Signals
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationProgressAnomalyDetector;