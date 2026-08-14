import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  RefreshCw,
} from "lucide-react";

const revisionSections = [
  {
    title: "Short Concept Summary",
    icon: BookOpen,
    content:
      "Dynamic Programming solves problems by breaking them into overlapping subproblems and storing previously computed results to avoid repeated work.",
  },
  {
    title: "Recall Question",
    icon: HelpCircle,
    content:
      "What two properties usually indicate that Dynamic Programming may be useful?",
  },
  {
    title: "Mini Example",
    icon: Sparkles,
    content:
      "In a Fibonacci calculation, previously computed values can be stored and reused instead of recalculating the same values repeatedly.",
  },
  {
    title: "Common Mistake",
    icon: AlertTriangle,
    content:
      "A common mistake is using Dynamic Programming without identifying the state and transition clearly.",
  },
  {
    title: "Quick Practice",
    icon: CheckCircle2,
    content:
      "Given a sequence of values, identify the DP state, transition, base case, and expected time complexity.",
  },
  {
    title: "Comparison Question",
    icon: Lightbulb,
    content:
      "When would you prefer memoization over tabulation, and what are the trade-offs?",
  },
];

export default function AIInterviewPreparationConceptRevisionGenerator() {
  const [concept, setConcept] = useState("");
  const [generated, setGenerated] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Concept Revision Generator
          </h1>

          <p className="text-gray-500">
            Generate personalized revision material for concepts you struggle
            with.
          </p>
        </div>

      </div>

      {/* Concept Selection */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Sparkles className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Personalized Revision
            </h2>

            <p className="text-sm text-gray-500">
              AI uses your mistakes, recall performance, and recent practice
              results to customize revision material.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Weak Concept
            </p>
            <p className="font-bold text-orange-700">
              Dynamic Programming
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Recall Score
            </p>
            <p className="font-bold text-yellow-700">
              61%
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Common Issue
            </p>
            <p className="font-bold text-red-700">
              State Definition
            </p>
          </div>

        </div>

        <label className="block text-sm font-semibold mt-6">
          Concept to Revise
        </label>

        <input
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="Example: Dynamic Programming"
          className="w-full border rounded-xl p-4 mt-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setGenerated(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          <Sparkles size={18} />
          Generate Revision Material
        </button>

      </div>

      {generated && (
        <>
          {/* Overview */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-4 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <RefreshCw
                  className="text-indigo-600"
                  size={40}
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  AI Revision Plan
                </p>

                <h2 className="text-3xl font-black text-indigo-700">
                  Targeted Revision
                </h2>

                <p className="text-gray-600 mt-2">
                  The generated material focuses on your difficulty with state
                  definition, recall, and application rather than repeating
                  the entire topic.
                </p>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">
              <BookOpen className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Revision Items
              </p>

              <p className="text-3xl font-black text-indigo-600">
                6
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Weak Areas
              </p>

              <p className="text-3xl font-black text-orange-600">
                3
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <HelpCircle className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Recall Tasks
              </p>

              <p className="text-3xl font-black text-indigo-600">
                2
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Estimated Time
              </p>

              <p className="text-3xl font-black text-green-600">
                12 min
              </p>
            </div>

          </div>

          {/* Revision Material */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Personalized Revision Material
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Each item targets a specific weakness identified from your
              preparation history.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              {revisionSections.map((section, index) => {
                const Icon = section.icon;

                return (
                  <button
                    type="button"
                    key={section.title}
                    onClick={() =>
                      setSelected(
                        selected === index
                          ? null
                          : index
                      )
                    }
                    className="text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                  >

                    <div className="flex gap-4">

                      <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 h-fit">
                        <Icon size={22} />
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-3">

                          <h3 className="font-bold">
                            {section.title}
                          </h3>

                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                            {index + 1}
                          </span>

                        </div>

                        <p className="text-gray-600 mt-3 text-sm leading-6">
                          {section.content}
                        </p>

                        {selected === index && (
                          <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                            <p className="text-xs text-indigo-600 font-semibold">
                              Why AI generated this
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              This item is based on your recent difficulty with
                              {index === 3
                                ? " identifying Dynamic Programming states."
                                : " recalling and applying the concept independently."}
                            </p>

                          </div>
                        )}

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>

          {/* Misconception Analysis */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Detected Misconceptions
                </h2>

                <div className="space-y-3 mt-4">

                  <div className="bg-white rounded-xl p-4">
                    <p className="font-semibold">
                      State Definition
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      You frequently identify the algorithm correctly but have
                      difficulty defining what each DP state represents.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <p className="font-semibold">
                      Transition Logic
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Your recent answers sometimes skip the reasoning behind
                      how one state leads to another.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <p className="font-semibold">
                      Complexity Recall
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Revisit how the number of states and transitions affect
                      the final complexity.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Comparison */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Confusing Concepts Comparison
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Compare concepts that are frequently mixed up during practice.
            </p>

            <div className="grid md:grid-cols-2 gap-5 mt-5">

              <div className="border rounded-2xl p-5">

                <h3 className="font-bold text-indigo-700">
                  Memoization
                </h3>

                <p className="text-sm text-gray-600 mt-3">
                  Top-down approach that stores results as recursive states
                  are calculated.
                </p>

                <div className="mt-4 px-3 py-2 rounded-lg bg-indigo-50 text-sm">
                  Ask yourself: "Do I need recursion to naturally express the
                  state transitions?"
                </div>

              </div>

              <div className="border rounded-2xl p-5">

                <h3 className="font-bold text-indigo-700">
                  Tabulation
                </h3>

                <p className="text-sm text-gray-600 mt-3">
                  Bottom-up approach that fills a table from smaller states to
                  larger states.
                </p>

                <div className="mt-4 px-3 py-2 rounded-lg bg-indigo-50 text-sm">
                  Ask yourself: "Can I determine a safe order for building all
                  required states?"
                </div>

              </div>

            </div>

          </div>

          {/* Quick Practice */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  Quick Practice Challenge
                </h2>

                <p className="text-gray-600 mt-2">
                  You have 2 minutes. Given a problem where each step can be
                  reached from one or two previous steps, define the DP state,
                  transition, and base case.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold"
                >
                  Start Quick Practice
                </button>

              </div>

            </div>

          </div>

          {/* Revision Strategy */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-lg">
                  AI Revision Strategy
                </h2>

                <p className="text-gray-600 mt-2">
                  Do not repeat the entire Dynamic Programming module. Spend
                  the next few minutes on state definition, transition logic,
                  and one application problem. After that, test recall again.
                </p>

                <div className="flex flex-wrap gap-2 mt-4">

                  <span className="px-3 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm">
                    3 min summary
                  </span>

                  <span className="px-3 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm">
                    3 recall questions
                  </span>

                  <span className="px-3 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm">
                    1 mini problem
                  </span>

                  <span className="px-3 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm">
                    2 min review
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Regeneration */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Need Another Revision Set?
            </h2>

            <p className="text-gray-600 mt-2">
              Generate a new set with different questions and examples while
              keeping the same weak concepts as the focus.
            </p>

            <button
              type="button"
              onClick={() => setGenerated(false)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Generate New Revision Set
            </button>

          </div>

        </>
      )}

    </div>
  );
}