import React, { useState } from "react";
import {
  Brain,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Target,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const trendData = [
  { session: "Session 1", critical: 4, major: 5, minor: 3 },
  { session: "Session 2", critical: 3, major: 5, minor: 4 },
  { session: "Session 3", critical: 2, major: 4, minor: 5 },
  { session: "Session 4", critical: 1, major: 3, minor: 6 },
];

const severityTypes = [
  {
    name: "Critical Errors",
    count: 1,
    color: "red",
    description: "Errors that fundamentally affect the solution.",
  },
  {
    name: "Major Errors",
    count: 3,
    color: "orange",
    description: "Errors that significantly reduce answer quality.",
  },
  {
    name: "Minor Errors",
    count: 6,
    color: "yellow",
    description: "Small issues with limited impact.",
  },
];

export default function AIInterviewPreparationMistakeSeverityTrend() {
  const [showTrend, setShowTrend] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Mistake Severity Trend
          </h1>

          <p className="text-gray-500">
            Track whether interview mistakes are becoming less severe over
            time.
          </p>
        </div>

      </div>

      {/* Main Result */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <TrendingDown className="text-green-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-green-600">
              SEVERITY TREND
            </p>

            <h2 className="text-2xl font-black text-green-800 mt-1">
              Mistake Severity Improving
            </h2>

            <p className="text-gray-600 mt-2">
              Critical mistakes decreased from 4 to 1 while minor mistakes
              increased from 3 to 6, indicating qualitative improvement.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Critical
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Major
            </p>

            <p className="text-3xl font-black text-orange-600">
              3
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5">
            <Target className="text-yellow-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Minor
            </p>

            <p className="text-3xl font-black text-yellow-600">
              6
            </p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-5">
            <BarChart3 className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Total Errors
            </p>

            <p className="text-3xl font-black text-indigo-600">
              10
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <TrendingDown className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Severity Improvement
            </p>

            <p className="text-3xl font-black text-green-600">
              52%
            </p>
          </div>

        </div>

      </div>

      {/* Severity Distribution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Current Mistake Severity
              </h2>

              <p className="text-sm text-gray-500">
                Current distribution of mistakes by impact.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          {severityTypes.map((item) => (

            <div
              key={item.name}
              className="border rounded-2xl p-5"
            >

              <div className="flex justify-between">

                <h3 className="font-bold">
                  {item.name}
                </h3>

                <span className="text-2xl font-black text-indigo-600">
                  {item.count}
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-3">
                {item.description}
              </p>

            </div>

          ))}

        </div>

        {showDetails && (
          <div className="bg-indigo-50 rounded-xl p-5 mt-5">

            <p className="text-sm text-gray-700">
              The current error profile is healthier than earlier sessions:
              most remaining mistakes are minor rather than fundamental.
            </p>

          </div>
        )}

      </div>

      {/* Trend Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <TrendingDown className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Severity Trend
              </h2>

              <p className="text-sm text-gray-500">
                Compare mistake severity across recent preparation sessions.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowTrend(!showTrend)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showTrend ? "Hide Trend" : "Show Trend"}
          </button>

        </div>

        {showTrend && (
          <div className="space-y-5 mt-6">

            {trendData.map((session) => (

              <div
                key={session.session}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between mb-4">

                  <h3 className="font-bold">
                    {session.session}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {session.critical +
                      session.major +
                      session.minor}{" "}
                    total mistakes
                  </span>

                </div>

                <div className="space-y-3">

                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600 font-semibold">
                        Critical
                      </span>
                      <span>{session.critical}</span>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-full rounded-full bg-red-500"
                        style={{
                          width: `${session.critical * 20}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-600 font-semibold">
                        Major
                      </span>
                      <span>{session.major}</span>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-full rounded-full bg-orange-500"
                        style={{
                          width: `${session.major * 20}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-yellow-600 font-semibold">
                        Minor
                      </span>
                      <span>{session.minor}</span>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-full rounded-full bg-yellow-500"
                        style={{
                          width: `${session.minor * 12}%`,
                        }}
                      />
                    </div>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Improvement Insight */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI IMPROVEMENT INSIGHT
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Your mistakes are becoming less consequential.
            </h2>

            <p className="text-gray-600 mt-2">
              Although mistakes are still occurring, the frequency of critical
              errors has decreased substantially. Focus now on converting
              remaining major mistakes into minor mistakes and eventually
              eliminating them.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  CRITICAL ERRORS
                </p>
                <p className="font-bold text-green-700 mt-1">
                  ↓ 75%
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  MAJOR ERRORS
                </p>
                <p className="font-bold text-green-700 mt-1">
                  ↓ 40%
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  MINOR ERRORS
                </p>
                <p className="font-bold text-indigo-700 mt-1">
                  ↑ 100%
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Recovery After Feedback */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <RefreshCw className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Recovery After Feedback
            </h2>

            <p className="text-sm text-gray-500">
              Measure whether mistakes become less severe after receiving AI
              feedback.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              BEFORE FEEDBACK
            </p>
            <p className="text-3xl font-black text-indigo-600 mt-1">
              7.8/10
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              AFTER FEEDBACK
            </p>
            <p className="text-3xl font-black text-orange-600 mt-1">
              5.1/10
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              RECOVERY
            </p>
            <p className="text-3xl font-black text-green-600 mt-1">
              35%
            </p>
          </div>

        </div>

      </div>

      {/* Update Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Update Severity Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate the mistake severity trend using your latest
              interview performance.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Refresh Analysis
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Mistake severity analysis updated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Final Guidance */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Fewer serious mistakes matter more than fewer mistakes overall.
            </h2>

            <p className="text-gray-600 mt-2">
              Progress should be measured by whether your mistakes are becoming
              less impactful. Moving from critical errors to major errors, and
              from major errors to minor issues, is meaningful improvement even
              when mistakes have not disappeared completely.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}