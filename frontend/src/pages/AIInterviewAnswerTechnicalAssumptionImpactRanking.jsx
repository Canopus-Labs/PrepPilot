import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  Target,
  TrendingUp,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  BarChart3,
  ShieldAlert,
} from "lucide-react";

const assumptions = [
  {
    id: "A-01",
    assumption: "Input data remains sorted",
    impact: "High",
    score: 94,
    category: "Data",
    consequence:
      "If ordering changes, the binary-search strategy may no longer be valid.",
    followUp:
      "What would you change if the data could be inserted or reordered dynamically?",
  },
  {
    id: "A-02",
    assumption: "Database response stays below 100 ms",
    impact: "High",
    score: 88,
    category: "Performance",
    consequence:
      "Higher database latency could violate the application's response-time requirement.",
    followUp:
      "How would your architecture handle increased database latency?",
  },
  {
    id: "A-03",
    assumption: "Traffic remains relatively stable",
    impact: "Medium",
    score: 61,
    category: "Scalability",
    consequence:
      "Traffic spikes could increase latency and resource consumption.",
    followUp:
      "How would the system behave if traffic suddenly increased by 10x?",
  },
  {
    id: "A-04",
    assumption: "Users provide valid identifiers",
    impact: "Low",
    score: 32,
    category: "Input",
    consequence:
      "Invalid identifiers may cause validation errors or unsuccessful lookups.",
    followUp:
      "How should invalid identifiers be handled?",
  },
  {
    id: "A-05",
    assumption: "External API remains available",
    impact: "High",
    score: 84,
    category: "Dependency",
    consequence:
      "API downtime could prevent the core workflow from completing.",
    followUp:
      "What fallback mechanism would you use if the external API becomes unavailable?",
  },
];

const impactLevels = {
  High: {
    className: "bg-red-100 text-red-700",
    icon: <ShieldAlert size={20} />,
  },
  Medium: {
    className: "bg-orange-100 text-orange-700",
    icon: <AlertTriangle size={20} />,
  },
  Low: {
    className: "bg-green-100 text-green-700",
    icon: <CheckCircle2 size={20} />,
  },
};

const analysisFlow = [
  {
    title: "Extract",
    description: "Identify assumptions from the candidate's answer.",
  },
  {
    title: "Assess",
    description: "Estimate the consequence of each assumption changing.",
  },
  {
    title: "Rank",
    description: "Assign low, medium, or high impact.",
  },
  {
    title: "Explain",
    description: "Describe how the solution could be affected.",
  },
  {
    title: "Challenge",
    description: "Generate follow-up questions for critical assumptions.",
  },
];

const recommendations = [
  {
    title: "Address High-Impact Assumptions First",
    reason:
      "Several assumptions can invalidate major parts of the proposed solution.",
    action:
      "Explicitly state and validate the highest-impact assumptions during the interview.",
  },
  {
    title: "Add Dependency Fallbacks",
    reason:
      "External service availability is a high-impact assumption.",
    action:
      "Discuss caching, retries, fallback behavior, or graceful degradation.",
  },
  {
    title: "Challenge Performance Assumptions",
    reason:
      "Database latency directly affects the response-time requirement.",
    action:
      "Explain what happens when the assumed latency is no longer achievable.",
  },
];

export default function AIInterviewAnswerTechnicalAssumptionImpactRanking() {
  const [selectedAssumption, setSelectedAssumption] = useState(
    assumptions[0]
  );
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const highImpact = assumptions.filter(
    (item) => item.impact === "High"
  ).length;

  const mediumImpact = assumptions.filter(
    (item) => item.impact === "Medium"
  ).length;

  const lowImpact = assumptions.filter(
    (item) => item.impact === "Low"
  ).length;

  const averageImpact = Math.round(
    assumptions.reduce(
      (sum, item) => sum + item.score,
      0
    ) / assumptions.length
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Assumption Impact Ranking
          </h1>

          <p className="text-gray-500">
            Identify and prioritize assumptions according to how strongly
            they can affect a proposed technical solution.
          </p>

        </div>

      </div>

      {/* Main Insight */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {averageImpact}
              </p>

              <p className="text-xs text-gray-500">
                avg impact
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              ASSUMPTION RISK ANALYSIS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {highImpact} High-Impact Assumptions Detected
            </h2>

            <p className="text-gray-600 mt-2">
              The AI ranks assumptions based on how significantly changing
              them could affect correctness, performance, reliability, or
              architecture.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-red-50 rounded-xl p-5">

            <ShieldAlert
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              High Impact
            </p>

            <p className="text-3xl font-black text-red-600">
              {highImpact}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Medium Impact
            </p>

            <p className="text-3xl font-black text-orange-600">
              {mediumImpact}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Low Impact
            </p>

            <p className="text-3xl font-black text-green-600">
              {lowImpact}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <BarChart3
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Assumptions
            </p>

            <p className="text-3xl font-black text-purple-600">
              {assumptions.length}
            </p>

          </div>

        </div>

      </div>

      {/* Assumption Ranking */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Ranked Technical Assumptions
            </h2>

            <p className="text-sm text-gray-500">
              Select an assumption to inspect its impact and consequences.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {assumptions
            .sort((a, b) => b.score - a.score)
            .map((item, index) => {

              const level = impactLevels[item.impact];

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedAssumption(item)}
                  className={`w-full text-left border rounded-2xl p-5 transition ${
                    selectedAssumption.id === item.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "hover:border-indigo-300"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-bold">
                            {item.assumption}
                          </h3>

                          <p className="text-xs text-gray-500 mt-1">
                            {item.id} · {item.category}
                          </p>

                        </div>

                        <span
                          className={`flex items-center gap-1 px-3 py-1 h-fit rounded-full text-xs font-semibold ${level.className}`}
                        >
                          {level.icon}
                          {item.impact}
                        </span>

                      </div>

                      <div className="mt-4">

                        <div className="flex justify-between text-xs mb-1">

                          <span>
                            Impact Score
                          </span>

                          <span>
                            {item.score}/100
                          </span>

                        </div>

                        <div className="h-3 bg-gray-200 rounded-full">

                          <div
                            className={`h-full rounded-full ${
                              item.impact === "High"
                                ? "bg-red-500"
                                : item.impact === "Medium"
                                ? "bg-orange-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${item.score}%`,
                            }}
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                </button>
              );
            })}

        </div>

      </div>

      {/* Selected Assumption */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              ASSUMPTION IMPACT ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedAssumption.assumption}
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  IMPACT
                </p>

                <p
                  className={`text-2xl font-black mt-1 ${
                    selectedAssumption.impact === "High"
                      ? "text-red-600"
                      : selectedAssumption.impact === "Medium"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {selectedAssumption.impact}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  IMPACT SCORE
                </p>

                <p className="text-2xl font-black text-indigo-600 mt-1">
                  {selectedAssumption.score}/100
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  CATEGORY
                </p>

                <p className="text-2xl font-black mt-1">
                  {selectedAssumption.category}
                </p>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 mt-4">

              <p className="text-xs font-bold text-red-600">
                IF THIS ASSUMPTION CHANGES
              </p>

              <p className="text-sm text-gray-600 mt-2">
                {selectedAssumption.consequence}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Follow-up Question */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex gap-3">

            <Lightbulb
              className="text-orange-600"
              size={25}
            />

            <div>

              <p className="text-xs font-bold text-orange-600">
                INTERVIEWER FOLLOW-UP
              </p>

              <h2 className="font-bold text-lg text-orange-800 mt-1">
                Challenge the selected assumption
              </h2>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFollowUp(!showFollowUp)}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-semibold"
          >
            {showFollowUp
              ? "Hide Question"
              : "Show Question"}
          </button>

        </div>

        {showFollowUp && (
          <div className="bg-white rounded-xl p-5 mt-5">

            <p className="text-xs text-gray-500">
              AI-GENERATED QUESTION
            </p>

            <p className="font-bold text-lg mt-2">
              {selectedAssumption.followUp}
            </p>

          </div>
        )}

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Actions for handling high-impact assumptions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRecommendations(!showRecommendations)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showRecommendations
              ? "Hide Recommendations"
              : "Show Recommendations"}
          </button>

        </div>

        {showRecommendations && (
          <div className="space-y-4 mt-6">

            {recommendations.map((recommendation, index) => (

              <div
                key={recommendation.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {recommendation.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {recommendation.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {recommendation.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Analysis Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Assumption Analysis Flow
              </h2>

              <p className="text-sm text-gray-500">
                High-impact assumptions receive deeper analysis and follow-up
                questions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFlow(!showFlow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFlow ? "Hide Flow" : "Show Flow"}
          </button>

        </div>

        {showFlow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {analysisFlow.map((step, index) => (

              <React.Fragment key={step.title}>

                <div className="border rounded-xl p-4 min-w-[155px]">

                  <p className="text-xs font-bold text-indigo-600">
                    STEP {index + 1}
                  </p>

                  <h3 className="font-bold mt-1">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2">
                    {step.description}
                  </p>

                </div>

                {index < analysisFlow.length - 1 && (
                  <ArrowRight
                    className="text-gray-400"
                    size={18}
                  />
                )}

              </React.Fragment>
            ))}

          </div>
        )}

      </div>

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Assumption Impact
          <ArrowRight size={18} />
        </button>

      </div>

      {analyzed && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                ANALYSIS COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Technical assumptions have been ranked by impact.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can extract assumptions from
                candidate answers, evaluate their consequences, prioritize
                them, and generate targeted follow-up questions.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Final Guidance */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Not every assumption deserves equal attention.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong technical reasoning focuses first on assumptions that can
              invalidate the solution, violate requirements, or significantly
              change architecture and performance. Ranking assumptions helps
              candidates prioritize the most important risks during an
              interview.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}