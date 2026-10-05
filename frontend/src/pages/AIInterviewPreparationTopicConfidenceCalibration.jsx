import React, { useState } from "react";
import {
  Brain,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const topics = [
  {
    name: "Data Structures",
    expectedScore: 85,
    actualScore: 82,
    confidence: 90,
    predictedDifficulty: "Medium",
    actualDifficulty: "Medium",
    status: "Well Calibrated",
  },
  {
    name: "Dynamic Programming",
    expectedScore: 88,
    actualScore: 64,
    confidence: 92,
    predictedDifficulty: "Medium",
    actualDifficulty: "Hard",
    status: "Overconfident",
  },
  {
    name: "SQL",
    expectedScore: 65,
    actualScore: 84,
    confidence: 60,
    predictedDifficulty: "Hard",
    actualDifficulty: "Medium",
    status: "Underconfident",
  },
];

const workflow = [
  "Predict Performance",
  "Practice Topic",
  "Measure Actual Result",
  "Compare Predictions",
  "Track Calibration",
];

export default function AIInterviewPreparationTopicConfidenceCalibration() {
  const [selected, setSelected] = useState(1);
  const [showTopics, setShowTopics] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const topic = topics[selected];
  const scoreGap = Math.abs(topic.expectedScore - topic.actualScore);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Topic Confidence Calibration
          </h1>

          <p className="text-gray-500">
            Compare predicted confidence and performance with actual interview
            preparation results.
          </p>
        </div>

      </div>

      {/* Main Result */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
            <Target className="text-orange-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-orange-600">
              CALIBRATION INSIGHT
            </p>

            <h2 className="text-2xl font-black text-orange-800 mt-1">
              Dynamic Programming: Overconfident
            </h2>

            <p className="text-gray-600 mt-2">
              You expected an 88% score with 92% confidence, but achieved 64%.
              Your prediction was 24 points above the actual result.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Target className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Topics Tracked
            </p>

            <p className="text-3xl font-black text-indigo-600">
              3
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Overconfident
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5">
            <TrendingUp className="text-yellow-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Underconfident
            </p>

            <p className="text-3xl font-black text-yellow-600">
              1
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Well Calibrated
            </p>

            <p className="text-3xl font-black text-green-600">
              1
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <BarChart3 className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Calibration Score
            </p>

            <p className="text-3xl font-black text-purple-600">
              74%
            </p>
          </div>

        </div>

      </div>

      {/* Topic Selector */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Topic Calibration
              </h2>

              <p className="text-sm text-gray-500">
                Select a topic to inspect prediction accuracy.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowTopics(!showTopics)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showTopics ? "Hide Topics" : "Show Topics"}
          </button>

        </div>

        {showTopics && (
          <div className="grid md:grid-cols-3 gap-5 mt-6">

            {topics.map((item, index) => (

              <button
                type="button"
                key={item.name}
                onClick={() => setSelected(index)}
                className={`text-left border rounded-2xl p-5 ${
                  selected === index
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    {item.name}
                  </h3>

                  {item.status === "Well Calibrated" && (
                    <CheckCircle2
                      className="text-green-600"
                      size={20}
                    />
                  )}

                  {item.status === "Overconfident" && (
                    <AlertTriangle
                      className="text-orange-600"
                      size={20}
                    />
                  )}

                  {item.status === "Underconfident" && (
                    <TrendingUp
                      className="text-yellow-600"
                      size={20}
                    />
                  )}

                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">

                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-500">
                      EXPECTED
                    </p>
                    <p className="font-black text-indigo-600">
                      {item.expectedScore}%
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-500">
                      ACTUAL
                    </p>
                    <p className="font-black text-green-600">
                      {item.actualScore}%
                    </p>
                  </div>

                </div>

                <p className="text-xs font-bold mt-4">
                  {item.status}
                </p>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Prediction vs Actual */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Prediction vs Actual Performance
            </h2>

            <p className="text-sm text-gray-500">
              Compare what you expected with what actually happened.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="bg-indigo-50 rounded-2xl p-6">
            <p className="text-xs text-gray-500">
              EXPECTED SCORE
            </p>

            <p className="text-4xl font-black text-indigo-600 mt-2">
              {topic.expectedScore}%
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Before practice
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6">
            <p className="text-xs text-gray-500">
              ACTUAL SCORE
            </p>

            <p className="text-4xl font-black text-green-600 mt-2">
              {topic.actualScore}%
            </p>

            <p className="text-sm text-gray-500 mt-2">
              After practice
            </p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-6">
            <p className="text-xs text-gray-500">
              PREDICTION GAP
            </p>

            <p className="text-4xl font-black text-orange-600 mt-2">
              {scoreGap} pts
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Difference between prediction and result
            </p>
          </div>

        </div>

      </div>

      {/* Confidence Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Confidence Analysis
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Compare confidence, predicted difficulty, and actual performance.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="border rounded-2xl p-5">

            <p className="text-xs text-gray-500">
              CONFIDENCE
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-2">
              {topic.confidence}%
            </p>

            <div className="h-3 bg-gray-200 rounded-full mt-4">

              <div
                className="h-full rounded-full bg-indigo-500"
                style={{
                  width: `${topic.confidence}%`,
                }}
              />

            </div>

          </div>

          <div className="border rounded-2xl p-5">

            <p className="text-xs text-gray-500">
              PREDICTED DIFFICULTY
            </p>

            <p className="text-2xl font-black text-purple-600 mt-2">
              {topic.predictedDifficulty}
            </p>

          </div>

          <div className="border rounded-2xl p-5">

            <p className="text-xs text-gray-500">
              ACTUAL DIFFICULTY
            </p>

            <p className="text-2xl font-black text-orange-600 mt-2">
              {topic.actualDifficulty}
            </p>

          </div>

        </div>

      </div>

      {/* AI Diagnosis */}
      <div
        className={`rounded-2xl p-6 ${
          topic.status === "Overconfident"
            ? "bg-orange-50"
            : topic.status === "Underconfident"
              ? "bg-yellow-50"
              : "bg-green-50"
        }`}
      >

        <div className="flex gap-4">

          {topic.status === "Well Calibrated" ? (
            <CheckCircle2
              className="text-green-600 shrink-0"
              size={30}
            />
          ) : (
            <AlertTriangle
              className="text-orange-600 shrink-0"
              size={30}
            />
          )}

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI CALIBRATION DIAGNOSIS
            </p>

            <h2 className="text-xl font-bold mt-1">
              {topic.status}
            </h2>

            <p className="text-gray-600 mt-2">
              {topic.status === "Overconfident"
                ? "Your confidence and expected score were substantially higher than your actual performance. Use unseen practice questions to verify mastery before marking this topic as strong."
                : topic.status === "Underconfident"
                  ? "Your actual performance exceeded your expectations. You may know this topic better than you believe."
                  : "Your predicted performance closely matches your actual result. Your confidence appears reasonably calibrated."}
            </p>

          </div>

        </div>

      </div>

      {/* Calibration Scale */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Confidence Calibration Scale
            </h2>

            <p className="text-sm text-gray-500">
              Understand how prediction gaps are interpreted.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />
            <h3 className="font-bold text-green-700 mt-3">
              Well Calibrated
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Predicted performance is close to actual performance.
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle className="text-orange-600" size={22} />
            <h3 className="font-bold text-orange-700 mt-3">
              Overconfident
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Expected performance is significantly higher than actual
              performance.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5">
            <TrendingUp className="text-yellow-600" size={22} />
            <h3 className="font-bold text-yellow-700 mt-3">
              Underconfident
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Actual performance is significantly higher than predicted.
            </p>
          </div>

        </div>

      </div>

      {/* Analyze */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Analyze Confidence Calibration
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Compare your prediction with actual performance for the selected
              topic.
            </p>

            <button
              type="button"
              onClick={() => setAnalyzed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Run Calibration Analysis
              <ArrowRight size={18} />
            </button>

            {analyzed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Confidence calibration analysis completed.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Refresh */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Refresh Calibration Data
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate confidence calibration using your latest practice
              results.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Calibration
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Confidence calibration data updated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Calibration Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI measures confidence accuracy.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow ? "Hide Workflow" : "Show Workflow"}
          </button>

        </div>

        {showWorkflow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {workflow.map((item, index) => (

              <React.Fragment key={item}>

                <div className="border rounded-xl p-4 min-w-[150px]">

                  <p className="text-xs font-bold text-indigo-600">
                    STEP {index + 1}
                  </p>

                  <p className="font-bold mt-1">
                    {item}
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

      {/* Final Guidance */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Confidence should be supported by evidence.
            </h2>

            <p className="text-gray-600 mt-2">
              A high confidence rating is useful only when it consistently
              matches performance on unseen problems. Use calibration results
              to decide where you should revise, practice, or trust your
              current preparation level.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}