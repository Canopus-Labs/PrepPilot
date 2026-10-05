import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Target,
  TrendingUp,
  FileText,
  MessageSquare,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const readinessAreas = [
  {
    name: "Required Skill Coverage",
    score: 88,
    status: "Strong",
    icon: Target,
  },
  {
    name: "Recent Performance",
    score: 82,
    status: "Strong",
    icon: TrendingUp,
  },
  {
    name: "Mock Interview Results",
    score: 76,
    status: "Good",
    icon: MessageSquare,
  },
  {
    name: "Weak Topic Recovery",
    score: 68,
    status: "Needs Attention",
    icon: AlertTriangle,
  },
  {
    name: "Resume & Project Preparation",
    score: 91,
    status: "Strong",
    icon: FileText,
  },
  {
    name: "Behavioral Preparation",
    score: 73,
    status: "Good",
    icon: MessageSquare,
  },
  {
    name: "Final Revision",
    score: 64,
    status: "Needs Attention",
    icon: BookOpen,
  },
];

const actions = [
  {
    title: "Revise Dynamic Programming",
    reason: "Recent performance remains below the target threshold.",
    priority: "High",
    estimatedTime: "45 min",
  },
  {
    title: "Complete One Final Mock Interview",
    reason: "Mock interview performance has not yet reached the target.",
    priority: "High",
    estimatedTime: "40 min",
  },
  {
    title: "Review Behavioral STAR Answers",
    reason: "Several common behavioral questions remain unpracticed.",
    priority: "Medium",
    estimatedTime: "25 min",
  },
  {
    title: "Complete Final Revision",
    reason: "Several high-priority concepts have not been reviewed recently.",
    priority: "Medium",
    estimatedTime: "30 min",
  },
];

export default function AIInterviewPreparationFinalReadinessGate() {
  const [expanded, setExpanded] = useState(null);
  const [completedActions, setCompletedActions] = useState([]);

  const overallScore = Math.round(
    readinessAreas.reduce((sum, item) => sum + item.score, 0) /
      readinessAreas.length
  );

  const toggleAction = (title) => {
    setCompletedActions((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title]
    );
  };

  const getGateStatus = () => {
    if (overallScore >= 85) return "Ready";
    if (overallScore >= 70) return "Mostly Ready";
    return "Needs Final Preparation";
  };

  const gateStatus = getGateStatus();

  const statusConfig = {
    Ready: {
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      badge: "bg-green-100 text-green-700",
      message:
        "Your preparation is at a strong level. Focus only on light revision and maintaining confidence.",
    },
    "Mostly Ready": {
      icon: ShieldCheck,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      badge: "bg-indigo-100 text-indigo-700",
      message:
        "You are close to interview readiness, but a few high-impact gaps should be addressed before the interview.",
    },
    "Needs Final Preparation": {
      icon: AlertTriangle,
      color: "text-orange-600",
      bg: "bg-orange-50",
      badge: "bg-orange-100 text-orange-700",
      message:
        "Several important preparation areas still need attention before the interview.",
    },
  };

  const config = statusConfig[gateStatus];
  const GateIcon = config.icon;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Interview Preparation Final Readiness Gate
          </h1>

          <p className="text-gray-500">
            Complete your final readiness check before the upcoming interview.
          </p>
        </div>

      </div>

      {/* Readiness Gate */}
      <div className={`${config.bg} rounded-2xl p-6`}>

        <div className="flex flex-col md:flex-row gap-6 items-center">

          <div className="p-5 bg-white rounded-2xl">

            <GateIcon
              className={config.color}
              size={52}
            />

          </div>

          <div className="flex-1 text-center md:text-left">

            <p className="text-sm text-gray-500">
              AI Final Readiness Decision
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-2">

              <h2 className={`text-4xl font-black ${config.color}`}>
                {gateStatus}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${config.badge}`}
              >
                {overallScore}% Readiness
              </span>

            </div>

            <p className="text-gray-600 mt-3">
              {config.message}
            </p>

          </div>

        </div>

        <div className="mt-6">

          <div className="flex justify-between text-sm mb-2">
            <span>Overall Readiness</span>
            <strong>{overallScore}%</strong>
          </div>

          <div className="h-4 bg-white rounded-full">

            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${overallScore}%` }}
            />

          </div>

        </div>

      </div>

      {/* Gate Explanation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <ShieldCheck className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              What the Readiness Gate Checks
            </h2>

            <p className="text-sm text-gray-500">
              AI combines multiple preparation signals instead of relying only
              on completion percentage.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-xl p-5">
            <Target className="text-indigo-600" />

            <h3 className="font-bold mt-3">
              Skill Coverage
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Checks whether the important skills for the target role have
              sufficient preparation evidence.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <TrendingUp className="text-green-600" />

            <h3 className="font-bold mt-3">
              Recent Performance
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Gives greater importance to recent assessments and practice
              performance.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <MessageSquare className="text-purple-600" />

            <h3 className="font-bold mt-3">
              Interview Simulation
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Uses mock interview and communication performance as readiness
              evidence.
            </p>
          </div>

        </div>

      </div>

      {/* Readiness Areas */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Readiness Area Breakdown
            </h2>

            <p className="text-sm text-gray-500">
              Review each area contributing to the final readiness decision.
            </p>
          </div>

        </div>

        <div className="space-y-4 mt-6">

          {readinessAreas.map((area) => {

            const Icon = area.icon;
            const isExpanded = expanded === area.name;

            return (
              <button
                type="button"
                key={area.name}
                onClick={() =>
                  setExpanded(isExpanded ? null : area.name)
                }
                className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
              >

                <div className="flex items-center gap-4">

                  <div className="p-3 rounded-xl bg-gray-100">
                    <Icon size={22} className="text-indigo-600" />
                  </div>

                  <div className="flex-1">

                    <div className="flex flex-wrap justify-between gap-3">

                      <h3 className="font-bold">
                        {area.name}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          area.score >= 80
                            ? "bg-green-100 text-green-700"
                            : area.score >= 70
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {area.status}
                      </span>

                    </div>

                    <div className="flex items-center gap-3 mt-3">

                      <div className="flex-1 h-3 bg-gray-200 rounded-full">

                        <div
                          className={`h-full rounded-full ${
                            area.score >= 80
                              ? "bg-green-500"
                              : area.score >= 70
                              ? "bg-indigo-500"
                              : "bg-orange-500"
                          }`}
                          style={{
                            width: `${area.score}%`,
                          }}
                        />

                      </div>

                      <span className="font-bold">
                        {area.score}%
                      </span>

                    </div>

                  </div>

                </div>

                {isExpanded && (
                  <div className="mt-5 bg-gray-50 rounded-xl p-4">

                    <p className="text-sm text-gray-600">
                      AI assessment:{" "}
                      <strong>{area.status}</strong>. This area contributes{" "}
                      <strong>{area.score}%</strong> toward your overall
                      readiness.
                    </p>

                  </div>
                )}

              </button>
            );
          })}

        </div>

      </div>

      {/* Critical Gaps */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <AlertTriangle
            className="text-orange-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-orange-700">
              Highest-Priority Remaining Gaps
            </h2>

            <p className="text-gray-600 mt-2">
              These actions have the greatest potential impact on your final
              readiness.
            </p>

            <div className="space-y-4 mt-5">

              {actions.map((action) => {

                const completed = completedActions.includes(action.title);

                return (
                  <div
                    key={action.title}
                    className="bg-white rounded-xl p-5"
                  >

                    <div className="flex items-start gap-4">

                      <button
                        type="button"
                        onClick={() => toggleAction(action.title)}
                        className={`mt-1 ${
                          completed
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {completed ? (
                          <CheckCircle2 size={24} />
                        ) : (
                          <XCircle size={24} />
                        )}
                      </button>

                      <div className="flex-1">

                        <div className="flex flex-wrap justify-between gap-3">

                          <h3
                            className={`font-bold ${
                              completed
                                ? "line-through text-gray-400"
                                : ""
                            }`}
                          >
                            {action.title}
                          </h3>

                          <div className="flex gap-2">

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                action.priority === "High"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {action.priority}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                              {action.estimatedTime}
                            </span>

                          </div>

                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                          {action.reason}
                        </p>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>

      {/* Final Preparation Checklist */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CheckCircle2 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Final Preparation Checklist
            </h2>

            <p className="text-sm text-gray-500">
              Complete the most important final checks before the interview.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          {[
            "Review high-priority technical topics",
            "Complete one final mock interview",
            "Review resume projects",
            "Prepare behavioral STAR answers",
            "Review recent mistakes",
            "Prepare questions for interviewer",
            "Check weak-topic status",
            "Complete final revision",
          ].map((item) => {

            const completed = completedActions.includes(item);

            return (
              <button
                type="button"
                key={item}
                onClick={() => toggleAction(item)}
                className="border rounded-xl p-4 flex items-center gap-3 text-left hover:border-indigo-400"
              >

                {completed ? (
                  <CheckCircle2 className="text-green-600" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}

                <span
                  className={
                    completed
                      ? "text-gray-400 line-through"
                      : "font-medium"
                  }
                >
                  {item}
                </span>

              </button>
            );
          })}

        </div>

      </div>

      {/* Final AI Decision */}
      <div className={`${config.bg} rounded-2xl p-6`}>

        <div className="flex gap-4">

          <GateIcon
            className={config.color}
            size={32}
          />

          <div className="flex-1">

            <h2 className={`font-bold ${config.color}`}>
              Final AI Decision: {gateStatus}
            </h2>

            <p className="text-gray-600 mt-2">
              Based on your current preparation evidence, your readiness is{" "}
              <strong>{overallScore}%</strong>. Focus on the remaining
              high-priority gaps rather than starting new low-priority topics.
            </p>

            <div className="mt-5 bg-white rounded-xl p-5">

              <p className="text-sm font-semibold">
                Highest-impact next action
              </p>

              <p className="text-lg font-black text-indigo-600 mt-2">
                Revise Dynamic Programming and complete a final mock interview.
              </p>

            </div>

            <button
              type="button"
              className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Start Final Preparation
              <ArrowUpRight size={18} />
            </button>

          </div>

        </div>

      </div>

      {/* Completion */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-green-700">
              Readiness Gate Purpose
            </h2>

            <p className="text-gray-600 mt-2">
              This checkpoint prevents preparation completion percentage from
              being treated as interview readiness. A candidate is considered
              ready only when recent performance, required skills, mock
              interviews, weak areas, and final preparation provide sufficient
              evidence of readiness.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}