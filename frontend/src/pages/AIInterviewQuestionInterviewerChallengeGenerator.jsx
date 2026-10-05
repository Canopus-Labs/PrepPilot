import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  Target,
  Zap,
  Server,
  RefreshCw,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const challenges = [
  {
    type: "Performance",
    icon: Zap,
    severity: "High",
    question:
      "Your solution performs well for 100,000 records. What happens when the dataset grows to 100 million records?",
    focus: "Complexity and resource usage",
    insight:
      "The interviewer is testing whether you understand how the current approach behaves as input size increases.",
  },
  {
    type: "Edge Case",
    icon: AlertTriangle,
    severity: "Medium",
    question:
      "How would your solution behave if the input is empty, contains duplicate values, or contains only one element?",
    focus: "Boundary conditions",
    insight:
      "Your proposed approach should explicitly define behavior for unusual or minimal inputs.",
  },
  {
    type: "Scalability",
    icon: Server,
    severity: "High",
    question:
      "Suppose the number of concurrent users increases by 10x. Which component becomes the bottleneck first?",
    focus: "System scalability",
    insight:
      "The interviewer wants you to identify the first scalability constraint and explain how you would address it.",
  },
  {
    type: "Failure Scenario",
    icon: AlertTriangle,
    severity: "High",
    question:
      "What happens if the primary dependency used by your solution becomes unavailable?",
    focus: "Reliability and recovery",
    insight:
      "A strong answer should explain failure detection, fallback behavior, and recovery.",
  },
  {
    type: "Alternative Approach",
    icon: RefreshCw,
    severity: "Medium",
    question:
      "Can you think of another approach? Under what conditions would you choose it instead?",
    focus: "Trade-off analysis",
    insight:
      "The interviewer is testing whether your choice was deliberate rather than simply the first solution you considered.",
  },
  {
    type: "Requirement Change",
    icon: Target,
    severity: "High",
    question:
      "If the requirements change so that results must now be returned in real time, how would you modify your solution?",
    focus: "Adaptability",
    insight:
      "This tests whether your architecture can adapt when an important requirement changes.",
  },
];

const weaknesses = [
  {
    title: "Scalability Assumption",
    severity: "High",
    description:
      "The proposed solution assumes the current processing capacity will remain sufficient as usage increases.",
  },
  {
    title: "Failure Handling",
    severity: "High",
    description:
      "The response does not clearly describe what happens when a critical dependency fails.",
  },
  {
    title: "Alternative Comparison",
    severity: "Medium",
    description:
      "The solution is justified, but alternative approaches and their trade-offs are not discussed.",
  },
];

export default function AIInterviewQuestionInterviewerChallengeGenerator() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Interviewer Challenge Generator
          </h1>

          <p className="text-gray-500">
            Generate personalized interviewer-style challenges directly from
            the strengths, assumptions, and weaknesses in your solution.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Design a system that processes and stores user activity events.
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {[
            "System Design",
            "Scalability",
            "Performance",
            "Reliability",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}

        </div>

      </div>

      {/* Solution Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Candidate Solution
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Enter your proposed solution. AI will create challenges based on
          your specific architecture and assumptions.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Describe your proposed solution..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          disabled={!answer.trim()}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Generate Interview Challenges
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Challenge Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Target
                  className="text-indigo-600"
                  size={42}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Challenge Coverage
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    92%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                    Personalized
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  AI identified multiple areas where an interviewer could
                  challenge your proposed solution.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "92%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <Zap className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Challenges Generated
              </p>

              <p className="text-3xl font-black text-indigo-600">
                6
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                High-Risk Areas
              </p>

              <p className="text-3xl font-black text-red-600">
                3
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Server className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Challenge Types
              </p>

              <p className="text-3xl font-black text-orange-600">
                6
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Solution Coverage
              </p>

              <p className="text-3xl font-black text-green-600">
                Strong
              </p>

            </div>

          </div>

          {/* Solution Weaknesses */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Areas the Interviewer May Challenge
                </h2>

                <p className="text-gray-600 mt-2">
                  Challenges are generated from specific assumptions and
                  weaknesses detected in your proposed solution.
                </p>

                <div className="space-y-4 mt-5">

                  {weaknesses.map((weakness) => (
                    <div
                      key={weakness.title}
                      className="bg-white rounded-xl p-5"
                    >

                      <div className="flex justify-between gap-4">

                        <h3 className="font-bold">
                          {weakness.title}
                        </h3>

                        <span
                          className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                            weakness.severity === "High"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {weakness.severity}
                        </span>

                      </div>

                      <p className="text-sm text-gray-600 mt-2">
                        {weakness.description}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Challenges */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Personalized Interview Challenges
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              These questions are generated from your proposed solution rather
              than selected from a generic follow-up list.
            </p>

            <div className="space-y-4 mt-6">

              {challenges.map((challenge, index) => {
                const Icon = challenge.icon;

                return (
                  <button
                    type="button"
                    key={challenge.type}
                    onClick={() =>
                      setSelectedChallenge(
                        selectedChallenge === index ? null : index
                      )
                    }
                    className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                  >

                    <div className="flex gap-4">

                      <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 h-fit">
                        <Icon size={23} />
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-4">

                          <div>

                            <p className="text-xs text-gray-500">
                              Challenge {index + 1}
                            </p>

                            <h3 className="font-bold mt-1">
                              {challenge.type}
                            </h3>

                          </div>

                          <span
                            className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                              challenge.severity === "High"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {challenge.severity}
                          </span>

                        </div>

                        <p className="text-gray-700 mt-3">
                          {challenge.question}
                        </p>

                        <div className="flex items-center gap-2 mt-4">

                          <Target
                            size={17}
                            className="text-indigo-600"
                          />

                          <p className="text-sm text-gray-500">
                            Focus: {challenge.focus}
                          </p>

                        </div>

                        {selectedChallenge === index && (
                          <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                            <p className="text-xs font-semibold text-indigo-700">
                              Why the interviewer is asking this
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              {challenge.insight}
                            </p>

                            <button
                              type="button"
                              className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold"
                            >
                              Practice This Challenge
                            </button>

                          </div>
                        )}

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>

          {/* Challenge Flow */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              AI Interview Challenge Flow
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              The system progressively challenges the assumptions behind your
              solution.
            </p>

            <div className="flex flex-col items-center mt-7">

              {[
                "Candidate Solution",
                "Detect Assumptions",
                "Identify Weaknesses",
                "Generate Challenge",
                "Candidate Defense",
                "AI Evaluation",
              ].map((step, index, array) => (
                <React.Fragment key={step}>

                  <div
                    className={`px-6 py-3 rounded-xl font-semibold ${
                      index === 0
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {step}
                  </div>

                  {index < array.length - 1 && (
                    <ArrowRight
                      className="rotate-90 text-indigo-400 my-2"
                      size={20}
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* Challenge Categories */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Challenge Coverage
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              {[
                ["Performance", "Tests complexity and resource usage.", Zap],
                ["Edge Cases", "Tests unusual and boundary inputs.", AlertTriangle],
                ["Scalability", "Tests behavior under increased load.", Server],
                ["Failure Scenarios", "Tests reliability and recovery.", AlertTriangle],
                ["Alternatives", "Tests trade-off analysis.", RefreshCw],
                ["Changing Requirements", "Tests adaptability.", Target],
              ].map(([title, description, Icon]) => (
                <div
                  key={title}
                  className="border rounded-xl p-5"
                >

                  <Icon className="text-indigo-600" />

                  <h3 className="font-bold mt-3">
                    {title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {description}
                  </p>

                  <div className="h-2 bg-gray-200 rounded-full mt-4">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: "88%" }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* AI Strategy */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Interview Strategy
                </h2>

                <p className="text-gray-600 mt-2">
                  Do not defend your solution by simply repeating why it works
                  under the original requirements. Address what changes when
                  scale, reliability, constraints, or requirements change.
                  Strong candidates explain both where their solution works and
                  where they would modify it.
                </p>

              </div>

            </div>

          </div>

          {/* Final Recommendation */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Start with the high-severity scalability and failure
                  challenges. Your solution appears reasonable under normal
                  conditions, but an interviewer is likely to test whether you
                  can identify its limits and adapt the design when assumptions
                  change.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}