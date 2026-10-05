import React, { useState } from "react";
import {
  Brain,
  Lightbulb,
  Target,
  CheckCircle2,
  Sparkles,
  Briefcase,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const examples = [
  {
    concept: "Hash Table",
    simple:
      "A phone contact list lets you quickly find a person's number using their name.",
    project:
      "A backend can use a hash map to quickly find a user's session or cached data.",
    role: "Software Engineer",
    score: 94,
  },
  {
    concept: "Caching",
    simple:
      "Keeping frequently used books on your desk avoids repeatedly visiting the library.",
    project:
      "Redis can store frequently requested API results to reduce database queries.",
    role: "Backend Engineer",
    score: 89,
  },
  {
    concept: "Load Balancing",
    simple:
      "A receptionist distributes customers among available service counters.",
    project:
      "A load balancer distributes incoming requests across multiple application servers.",
    role: "System Engineer",
    score: 86,
  },
];

const workflow = [
  "Identify Concept",
  "Generate Examples",
  "Match Target Role",
  "Practice Explanation",
  "Evaluate Response",
];

export default function AIInterviewAnswerTechnicalExampleGenerator() {
  const [selected, setSelected] = useState(0);
  const [showExamples, setShowExamples] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const example = examples[selected];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Example Generator
          </h1>

          <p className="text-gray-500">
            Generate practical examples that make technical interview
            explanations clearer and easier to understand.
          </p>
        </div>

      </div>

      {/* Main Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <Lightbulb className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI EXAMPLE RECOMMENDATION
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Use a practical Hash Table example
            </h2>

            <p className="text-gray-600 mt-2">
              A practical example can make the concept easier to communicate
              and demonstrate genuine understanding.
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
              Concepts
            </p>
            <p className="text-3xl font-black text-indigo-600">
              3
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <Sparkles className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Examples
            </p>
            <p className="text-3xl font-black text-green-600">
              9
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <Briefcase className="text-purple-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Role Match
            </p>
            <p className="text-3xl font-black text-purple-600">
              92%
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <Lightbulb className="text-orange-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Example Quality
            </p>
            <p className="text-3xl font-black text-orange-600">
              90%
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Practice Ready
            </p>
            <p className="text-3xl font-black text-green-600">
              Yes
            </p>
          </div>

        </div>

      </div>

      {/* Concept */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Concept Requiring an Example
            </h2>

            <p className="text-sm text-gray-500">
              The AI identifies technical concepts where an example can
              improve explanation quality.
            </p>
          </div>

        </div>

        <div className="bg-indigo-50 rounded-2xl p-6 mt-5">

          <p className="text-xs font-bold text-indigo-600">
            SELECTED CONCEPT
          </p>

          <h2 className="text-2xl font-black text-indigo-800 mt-1">
            {example.concept}
          </h2>

          <p className="text-gray-600 mt-2">
            Target role: <strong>{example.role}</strong>
          </p>

        </div>

      </div>

      {/* Generated Examples */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Sparkles className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Generated Examples
              </h2>

              <p className="text-sm text-gray-500">
                Choose an example style suitable for your explanation.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowExamples(!showExamples)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showExamples ? "Hide Examples" : "Show Examples"}
          </button>

        </div>

        {showExamples && (
          <div className="grid md:grid-cols-2 gap-5 mt-6">

            <div className="border rounded-2xl p-5">

              <p className="text-xs font-bold text-indigo-600">
                SIMPLE ANALOGY
              </p>

              <h3 className="font-bold text-lg mt-2">
                Everyday Example
              </h3>

              <p className="text-gray-600 mt-3">
                {example.simple}
              </p>

            </div>

            <div className="border rounded-2xl p-5">

              <p className="text-xs font-bold text-green-600">
                PROJECT EXAMPLE
              </p>

              <h3 className="font-bold text-lg mt-2">
                Technical Example
              </h3>

              <p className="text-gray-600 mt-3">
                {example.project}
              </p>

            </div>

          </div>
        )}

      </div>

      {/* Role Matching */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Briefcase className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Target Role Matching
            </h2>

            <p className="text-sm text-gray-500">
              Examples are adapted to the candidate's expected interview role.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              TARGET ROLE
            </p>
            <p className="font-bold mt-2">
              {example.role}
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              RELEVANCE
            </p>
            <p className="text-3xl font-black text-green-600 mt-1">
              {example.score}%
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              EXAMPLE STYLE
            </p>
            <p className="font-bold text-purple-700 mt-2">
              Practical + Project
            </p>
          </div>

        </div>

      </div>

      {/* Practice Prompt */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              PRACTICE CHALLENGE
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Explain {example.concept} using the generated example.
            </h2>

            <p className="text-gray-600 mt-2">
              Start with the technical definition, introduce the example, and
              explain exactly how the example represents the concept.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                INTERVIEW PROMPT
              </p>

              <p className="font-semibold text-orange-700 mt-2">
                "Can you explain {example.concept} with a practical example?"
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Practice Evaluation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              CONCEPT CLARITY
            </p>
            <p className="text-3xl font-black text-indigo-600 mt-1">
              88%
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              EXAMPLE RELEVANCE
            </p>
            <p className="text-3xl font-black text-green-600 mt-1">
              94%
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              TECHNICAL CONNECTION
            </p>
            <p className="text-3xl font-black text-purple-600 mt-1">
              82%
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              OVERALL
            </p>
            <p className="text-3xl font-black text-orange-600 mt-1">
              88%
            </p>
          </div>

        </div>

      </div>

      {/* AI Recommendation */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI RECOMMENDATION
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Connect the example directly to the technical concept.
            </h2>

            <p className="text-gray-600 mt-2">
              Do not provide an example only for storytelling. Explain which
              part of the example represents the underlying technical idea and
              why it behaves similarly.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  STEP 1
                </p>
                <p className="font-bold mt-1">
                  Define Concept
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  STEP 2
                </p>
                <p className="font-bold mt-1">
                  Give Example
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  STEP 3
                </p>
                <p className="font-bold mt-1">
                  Explain Connection
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Generate */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Sparkles
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Generate New Examples
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Generate role-specific examples for the selected technical
              concept.
            </p>

            <button
              type="button"
              onClick={() => setGenerated(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Generate Examples
              <ArrowRight size={18} />
            </button>

            {generated && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                New practical and project-oriented examples generated.
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
              Refresh Recommendations
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate examples using the latest target-role and
              preparation information.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Examples
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Example recommendations updated successfully.
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
                Example Generation Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI creates and evaluates technical examples.
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

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              A strong example should clarify the concept, not replace it.
            </h2>

            <p className="text-gray-600 mt-2">
              Start with the technical explanation, use the example to make it
              concrete, and then connect the example back to the underlying
              technical behavior.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}