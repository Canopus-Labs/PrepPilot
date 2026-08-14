import React, { useState } from "react";
import {
  Brain,
  Scale,
  CheckCircle2,
  Target,
  Lightbulb,
  ArrowRight,
  BarChart3,
  RefreshCw,
} from "lucide-react";

const alternatives = [
  {
    name: "Approach A",
    description: "Simple in-memory solution",
    scores: {
      performance: 88,
      scalability: 62,
      complexity: 91,
      maintainability: 86,
      reliability: 72,
      cost: 94,
    },
    recommendation: "Best for small-to-medium workloads.",
  },
  {
    name: "Approach B",
    description: "Distributed service architecture",
    scores: {
      performance: 91,
      scalability: 95,
      complexity: 54,
      maintainability: 68,
      reliability: 89,
      cost: 61,
    },
    recommendation: "Best for large-scale workloads.",
  },
  {
    name: "Approach C",
    description: "Managed cloud-based solution",
    scores: {
      performance: 84,
      scalability: 92,
      complexity: 76,
      maintainability: 90,
      reliability: 94,
      cost: 70,
    },
    recommendation: "Best balance for production systems.",
  },
];

const criteria = [
  {
    key: "performance",
    label: "Performance",
  },
  {
    key: "scalability",
    label: "Scalability",
  },
  {
    key: "complexity",
    label: "Complexity",
  },
  {
    key: "maintainability",
    label: "Maintainability",
  },
  {
    key: "reliability",
    label: "Reliability",
  },
  {
    key: "cost",
    label: "Cost Efficiency",
  },
];

const coachingQuestions = [
  "Which criterion matters most for the stated requirements?",
  "Why is your preferred approach better than the closest alternative?",
  "What trade-off are you accepting with your decision?",
  "What would make you choose a different approach?",
  "How would the decision change if the workload increased?",
  "Which weakness of your preferred approach is most important?",
];

const recommendations = [
  {
    title: "Prioritize Requirements",
    reason:
      "Technical decisions should be evaluated against the actual problem requirements.",
    action:
      "Identify the most important constraints before comparing alternatives.",
  },
  {
    title: "Explain Accepted Trade-Offs",
    reason:
      "A strong interview answer acknowledges the weaknesses of the selected approach.",
    action:
      "State what you gain, what you sacrifice, and why the trade-off is acceptable.",
  },
  {
    title: "Compare Before Choosing",
    reason:
      "Considering alternatives demonstrates engineering judgment.",
    action:
      "Briefly compare at least one realistic alternative before defending your decision.",
  },
];

const workflow = [
  {
    title: "Identify",
    description: "Extract possible technical approaches.",
  },
  {
    title: "Define",
    description: "Select decision criteria.",
  },
  {
    title: "Compare",
    description: "Score each alternative.",
  },
  {
    title: "Justify",
    description: "Explain the preferred option.",
  },
  {
    title: "Adapt",
    description: "Test the decision against changed requirements.",
  },
];

export default function AIInterviewAnswerTechnicalDecisionTradeOffMatrix() {
  const [selectedAlternative, setSelectedAlternative] =
    useState(alternatives[2]);

  const [selectedCriteria, setSelectedCriteria] =
    useState(criteria[0]);

  const [showMatrix, setShowMatrix] = useState(false);
  const [showCoaching, setShowCoaching] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [generated, setGenerated] = useState(false);

  const calculateAverage = (alternative) => {
    const values = Object.values(alternative.scores);

    return Math.round(
      values.reduce((sum, value) => sum + value, 0) /
        values.length
    );
  };

  const winner = [...alternatives].sort(
    (a, b) => calculateAverage(b) - calculateAverage(a)
  )[0];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Decision Trade-Off Matrix
          </h1>

          <p className="text-gray-500">
            Compare technical alternatives systematically and explain why
            one decision is preferable.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {calculateAverage(selectedAlternative)}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              DECISION QUALITY SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Structured Trade-Off Analysis
            </h2>

            <p className="text-gray-600 mt-2">
              The selected approach is evaluated across multiple engineering
              criteria instead of relying on a simple pros-and-cons list.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Scale className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Alternatives
            </p>

            <p className="text-3xl font-black text-indigo-600">
              3
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Criteria
            </p>

            <p className="text-3xl font-black text-green-600">
              6
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Target
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Preferred
            </p>

            <p className="text-xl font-black text-orange-600 mt-1">
              {winner.name}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <BarChart3
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Avg. Score
            </p>

            <p className="text-3xl font-black text-purple-600">
              {calculateAverage(winner)}
            </p>

          </div>

        </div>

      </div>

      {/* Candidate Decision */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Candidate Technical Decision
            </h2>

            <p className="text-sm text-gray-500">
              Explain which approach you would select and why.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-6">

          <p className="text-xs font-bold text-gray-500">
            CANDIDATE
          </p>

          <p className="text-gray-700 leading-7 mt-3">
            "I would choose the managed cloud-based solution because it gives
            us strong reliability and scalability without requiring us to
            maintain a large distributed infrastructure ourselves."
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              DECISION CLARITY
            </p>

            <p className="text-3xl font-black text-green-600">
              91%
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              TRADE-OFF AWARENESS
            </p>

            <p className="text-3xl font-black text-indigo-600">
              86%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              AREA TO IMPROVE
            </p>

            <p className="font-black text-orange-600 mt-2">
              Cost justification
            </p>

          </div>

        </div>

      </div>

      {/* Matrix */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Scale className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Technical Decision Matrix
              </h2>

              <p className="text-sm text-gray-500">
                Compare alternatives across six engineering criteria.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowMatrix(!showMatrix)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showMatrix ? "Hide Matrix" : "Show Matrix"}
          </button>

        </div>

        {showMatrix && (
          <div className="overflow-x-auto mt-6">

            <table className="w-full border-collapse min-w-[850px]">

              <thead>

                <tr className="bg-gray-50">

                  <th className="text-left p-4 border">
                    Criterion
                  </th>

                  {alternatives.map((alternative) => (

                    <th
                      key={alternative.name}
                      className="text-left p-4 border"
                    >
                      {alternative.name}
                    </th>

                  ))}

                </tr>

              </thead>

              <tbody>

                {criteria.map((criterion) => (

                  <tr key={criterion.key}>

                    <td className="p-4 border font-semibold">
                      {criterion.label}
                    </td>

                    {alternatives.map((alternative) => {

                      const score =
                        alternative.scores[criterion.key];

                      return (
                        <td
                          key={alternative.name}
                          className="p-4 border"
                        >

                          <div className="flex items-center gap-3">

                            <div className="flex-1 h-3 bg-gray-200 rounded-full">

                              <div
                                className="h-full bg-indigo-500 rounded-full"
                                style={{
                                  width: `${score}%`,
                                }}
                              />

                            </div>

                            <span className="font-bold">
                              {score}
                            </span>

                          </div>

                        </td>
                      );
                    })}

                  </tr>
                ))}

                <tr className="bg-indigo-50">

                  <td className="p-4 border font-black">
                    Overall
                  </td>

                  {alternatives.map((alternative) => (

                    <td
                      key={alternative.name}
                      className="p-4 border font-black text-indigo-700"
                    >
                      {calculateAverage(alternative)}
                    </td>

                  ))}

                </tr>

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* Selected Criterion */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              CRITERION ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedCriteria.label}
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              {alternatives.map((alternative) => (

                <button
                  type="button"
                  key={alternative.name}
                  onClick={() =>
                    setSelectedAlternative(alternative)
                  }
                  className={`text-left bg-white rounded-xl p-5 border transition ${
                    selectedAlternative.name ===
                    alternative.name
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                >

                  <p className="text-xs text-gray-500">
                    {alternative.name}
                  </p>

                  <p className="text-3xl font-black text-indigo-600 mt-1">
                    {alternative.scores[selectedCriteria.key]}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {alternative.description}
                  </p>

                </button>
              ))}

            </div>

            <p className="text-gray-600 mt-5">
              The AI should not automatically choose the highest score.
              Criteria must be interpreted according to the actual interview
              requirements and constraints.
            </p>

          </div>

        </div>

      </div>

      {/* Selected Approach */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              CURRENT PREFERRED APPROACH
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              {selectedAlternative.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedAlternative.recommendation}
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                AI DECISION SUMMARY
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                {selectedAlternative.name} provides an overall score of{" "}
                {calculateAverage(selectedAlternative)}. The final decision
                should prioritize the criteria most important to the problem
                requirements.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Coaching Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Trade-Off Coaching
              </h2>

              <p className="text-sm text-gray-500">
                Practice defending technical decisions systematically.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowCoaching(!showCoaching)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showCoaching
              ? "Hide Questions"
              : "Show Questions"}
          </button>

        </div>

        {showCoaching && (
          <div className="space-y-3 mt-6">

            {coachingQuestions.map((question, index) => (

              <div
                key={question}
                className="border rounded-xl p-4 flex gap-3"
              >

                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>

                <p className="text-sm text-gray-700 pt-1">
                  {question}
                </p>

              </div>
            ))}

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
                Improve structured technical decision-making.
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

            {recommendations.map((item, index) => (

              <div
                key={item.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {item.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Trade-Off Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                From alternative identification to decision justification.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow
              ? "Hide Workflow"
              : "Show Workflow"}
          </button>

        </div>

        {showWorkflow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {workflow.map((step, index) => (

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

                {index < workflow.length - 1 && (
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

      {/* Generate */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setGenerated(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Generate Trade-Off Analysis
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {generated && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                ANALYSIS GENERATED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Technical alternatives compared successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                The matrix shows how each approach performs across performance,
                scalability, complexity, maintainability, reliability, and
                cost. The candidate should now explain which criteria matter
                most and justify the final decision.
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
              A strong decision explains both the choice and the trade-off.
            </h2>

            <p className="text-gray-600 mt-2">
              Candidates should not simply claim that one approach is "better."
              They should connect the decision to requirements, compare
              alternatives, acknowledge weaknesses, and explain why the
              accepted trade-offs are reasonable.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}