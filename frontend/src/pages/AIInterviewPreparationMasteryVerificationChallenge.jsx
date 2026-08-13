import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Trophy,
  RotateCcw,
} from "lucide-react";

const verificationAreas = [
  {
    name: "Concept Recall",
    score: 88,
    status: "Strong",
    description: "Can recall the main concepts without assistance.",
  },
  {
    name: "New Questions",
    score: 82,
    status: "Strong",
    description: "Successfully applies the concept to unfamiliar questions.",
  },
  {
    name: "Application",
    score: 76,
    status: "Ready",
    description: "Can use the concept in practical problem-solving.",
  },
  {
    name: "Edge-Case Reasoning",
    score: 64,
    status: "Developing",
    description: "Needs more practice identifying unusual cases.",
  },
  {
    name: "Explanation",
    score: 86,
    status: "Strong",
    description: "Can explain why the approach works.",
  },
];

const challenges = [
  {
    type: "Concept Recall",
    question:
      "Explain the main idea behind the technique without looking at your notes.",
  },
  {
    type: "New Question",
    question:
      "Solve a previously unseen problem that requires this concept.",
  },
  {
    type: "Application",
    question:
      "Describe how you would apply this concept in a real interview scenario.",
  },
  {
    type: "Edge Case",
    question:
      "What happens when the input violates the assumptions of your normal solution?",
  },
  {
    type: "Explanation",
    question:
      "Explain why your solution works and why its complexity is acceptable.",
  },
];

export default function AIInterviewPreparationMasteryVerificationChallenge() {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);

  const nextChallenge = () => {
    if (current < challenges.length - 1) {
      setCurrent((prev) => prev + 1);
      setAnswer("");
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Mastery Verification Challenge
          </h1>

          <p className="text-gray-500">
            Verify genuine topic mastery before marking preparation complete.
          </p>
        </div>

      </div>

      {/* Topic */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Topic Under Verification
        </p>

        <h2 className="text-2xl font-bold mt-2">
          Dynamic Programming
        </h2>

        <p className="text-gray-600 mt-3">
          Your previous learning activities are complete. Before this topic is
          marked as mastered, AI will verify whether you can independently
          recall, apply, explain, and reason about the concept.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mt-5">

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Lesson Completion
            </p>
            <p className="text-2xl font-black text-indigo-600">
              100%
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Previous Score
            </p>
            <p className="text-2xl font-black text-green-600">
              91%
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Recent Accuracy
            </p>
            <p className="text-2xl font-black text-indigo-600">
              84%
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Mastery Status
            </p>
            <p className="text-2xl font-black text-yellow-600">
              Unverified
            </p>
          </div>

        </div>

      </div>

      {/* Verification Rules */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <ShieldCheck
            className="text-indigo-600"
            size={28}
          />

          <div>

            <h2 className="font-bold text-indigo-700">
              How Mastery Is Verified
            </h2>

            <p className="text-gray-600 mt-2">
              AI evaluates multiple forms of evidence instead of trusting one
              score or completion percentage.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">

              {[
                "Concept Recall",
                "New Questions",
                "Application",
                "Edge Cases",
                "Explanation",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-white text-indigo-700 text-sm font-semibold"
                >
                  {item}
                </span>
              ))}

            </div>

          </div>

        </div>

      </div>

      {!started && !completed && (
        <div className="bg-white rounded-2xl shadow p-6">

          <div className="text-center">

            <Trophy
              className="mx-auto text-indigo-600"
              size={48}
            />

            <h2 className="text-2xl font-bold mt-4">
              Ready for Verification?
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              This challenge contains five short tasks designed to determine
              whether your understanding transfers beyond the activities you
              have already completed.
            </p>

            <button
              type="button"
              onClick={() => setStarted(true)}
              className="mt-6 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Start Mastery Challenge
            </button>

          </div>

        </div>
      )}

      {/* Challenge */}
      {started && !completed && (
        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                Verification Challenge
              </p>

              <h2 className="text-xl font-bold mt-1">
                {challenges[current].type}
              </h2>
            </div>

            <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
              {current + 1} / {challenges.length}
            </span>

          </div>

          <div className="h-2 bg-gray-200 rounded-full mt-5">

            <div
              className="h-full bg-indigo-600 rounded-full"
              style={{
                width: `${((current + 1) / challenges.length) * 100}%`,
              }}
            />

          </div>

          <div className="bg-indigo-50 rounded-2xl p-6 mt-6">

            <p className="text-lg font-semibold text-gray-800">
              {challenges[current].question}
            </p>

          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={7}
            placeholder="Write your answer here..."
            className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex justify-between mt-5">

            <span className="text-sm text-gray-500">
              AI will evaluate reasoning, correctness, and independence.
            </span>

            <button
              type="button"
              disabled={!answer.trim()}
              onClick={nextChallenge}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              {current === challenges.length - 1
                ? "Finish Verification"
                : "Submit & Continue"}
            </button>

          </div>

        </div>
      )}

      {/* Result */}
      {completed && (
        <>
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Trophy
                  className="text-green-600"
                  size={42}
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Mastery Verification Result
                </p>

                <h2 className="text-3xl font-black text-green-700">
                  Ready
                </h2>

                <p className="text-gray-600 mt-2">
                  You demonstrated sufficient understanding to progress, but
                  edge-case reasoning should continue to be reinforced.
                </p>

              </div>

            </div>

          </div>

          {/* Score */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">
              <Target className="text-indigo-600" />
              <p className="text-sm text-gray-500 mt-4">
                Verification Score
              </p>
              <p className="text-3xl font-black text-indigo-600">
                82%
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <CheckCircle2 className="text-green-600" />
              <p className="text-sm text-gray-500 mt-4">
                Strong Areas
              </p>
              <p className="text-3xl font-black text-green-600">
                4/5
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <AlertTriangle className="text-orange-600" />
              <p className="text-sm text-gray-500 mt-4">
                Needs Reinforcement
              </p>
              <p className="text-3xl font-black text-orange-600">
                1
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <ShieldCheck className="text-indigo-600" />
              <p className="text-sm text-gray-500 mt-4">
                Mastery Confidence
              </p>
              <p className="text-3xl font-black text-indigo-600">
                86%
              </p>
            </div>

          </div>

          {/* Verification Evidence */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Mastery Evidence
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Review the evidence behind the verification result.
            </p>

            <div className="space-y-4 mt-5">

              {verificationAreas.map((area) => (
                <button
                  type="button"
                  key={area.name}
                  onClick={() =>
                    setSelected(
                      selected?.name === area.name
                        ? null
                        : area
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex items-center gap-4">

                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        area.score >= 80
                          ? "bg-green-100 text-green-600"
                          : area.score >= 60
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {area.score >= 80 ? (
                        <CheckCircle2 size={24} />
                      ) : (
                        <AlertTriangle size={24} />
                      )}
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between">

                        <h3 className="font-semibold">
                          {area.name}
                        </h3>

                        <span className="font-bold text-indigo-600">
                          {area.score}%
                        </span>

                      </div>

                      <div className="h-3 bg-gray-200 rounded-full mt-3">

                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{
                            width: `${area.score}%`,
                          }}
                        />

                      </div>

                      <span className="inline-block mt-3 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                        {area.status}
                      </span>

                      {selected?.name === area.name && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-sm text-gray-600">
                            {area.description}
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Classification */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Mastery Classification
            </h2>

            <div className="grid md:grid-cols-4 gap-4 mt-5">

              {[
                ["Not Ready", "0–49%", "Foundation revision"],
                ["Developing", "50–69%", "Targeted practice"],
                ["Ready", "70–84%", "Progress to next stage"],
                ["Mastered", "85–100%", "Advanced practice"],
              ].map(([level, range, action]) => (
                <div
                  key={level}
                  className={`rounded-xl p-4 border ${
                    level === "Ready"
                      ? "border-green-400 bg-green-50"
                      : "bg-gray-50"
                  }`}
                >

                  <p className="font-bold">
                    {level}
                  </p>

                  <p className="text-2xl font-black text-indigo-600 mt-2">
                    {range}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {action}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Weak Area */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Recommended Reinforcement
                </h2>

                <p className="text-gray-600 mt-2">
                  Your weakest verification area is{" "}
                  <strong>edge-case reasoning</strong>. Complete a few
                  counterexample and boundary-condition exercises before
                  attempting advanced Dynamic Programming challenges.
                </p>

              </div>

            </div>

          </div>

          {/* Final Recommendation */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Your topic is classified as{" "}
                  <strong>Ready</strong>. You can progress to the next
                  preparation stage while continuing lightweight edge-case
                  practice.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  Continue Learning Path
                </button>

              </div>

            </div>

          </div>

          {/* Retry */}
          <div className="flex justify-center">

            <button
              type="button"
              onClick={() => {
                setStarted(false);
                setCompleted(false);
                setCurrent(0);
                setAnswer("");
              }}
              className="px-5 py-3 rounded-xl border font-semibold flex items-center gap-2"
            >
              <RotateCcw size={18} />
              Retake Verification
            </button>

          </div>
        </>
      )}

    </div>
  );
}