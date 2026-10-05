import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  BriefcaseBusiness,
  MessageSquare,
  Clock3,
  Lightbulb,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const weakConcepts = [
  {
    title: "Dynamic Programming",
    priority: "High",
    score: 52,
    action: "Review state definition and transition logic.",
  },
  {
    title: "Graph Algorithms",
    priority: "High",
    score: 58,
    action: "Revise BFS, DFS, shortest paths, and complexity.",
  },
  {
    title: "System Scalability",
    priority: "Medium",
    score: 66,
    action: "Review caching, load balancing, and bottlenecks.",
  },
];

const repeatedMistakes = [
  {
    title: "Complexity Justification",
    count: 5,
    impact: "High",
  },
  {
    title: "Edge Case Handling",
    count: 4,
    impact: "High",
  },
  {
    title: "Technical Trade-Off Explanation",
    count: 3,
    impact: "Medium",
  },
];

const patterns = [
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "BFS / DFS",
  "Dynamic Programming",
  "Hashing",
];

const formulas = [
  "Binary Search → O(log n)",
  "BFS / DFS → O(V + E)",
  "Hash Map Lookup → O(1) average",
  "Merge Sort → O(n log n)",
  "Heap Operations → O(log n)",
];

const projectTalkingPoints = [
  {
    title: "Project Objective",
    description:
      "Clearly explain the problem your project was designed to solve.",
  },
  {
    title: "Your Contribution",
    description:
      "Be specific about the components, features, or technical decisions you personally handled.",
  },
  {
    title: "Technical Challenge",
    description:
      "Prepare one difficult technical problem and explain how you solved it.",
  },
  {
    title: "Result",
    description:
      "Mention measurable outcomes, improvements, or lessons learned.",
  },
];

const behavioralReminders = [
  "Use STAR structure for behavioral answers.",
  "Keep examples specific and evidence-based.",
  "Explain your individual contribution clearly.",
  "Mention what you learned from failures.",
  "Avoid memorized answers; keep responses conversational.",
];

const difficultQuestions = [
  {
    question:
      "How would your architecture change if the traffic increased by 100x?",
    topic: "System Design",
    difficulty: "Hard",
  },
  {
    question:
      "Why did you choose this algorithm instead of a simpler alternative?",
    topic: "Algorithms",
    difficulty: "Hard",
  },
  {
    question:
      "What happens when one of your dependencies fails?",
    topic: "Reliability",
    difficulty: "Hard",
  },
];

const recommendations = [
  {
    title: "Review Your Top Weaknesses",
    reason:
      "Dynamic programming and graph algorithms remain below your target mastery level.",
    action:
      "Spend the next revision block on core patterns rather than starting new topics.",
  },
  {
    title: "Rehearse Complexity Explanations",
    reason:
      "Complexity justification appeared repeatedly in recent mistakes.",
    action:
      "Practice explaining time and space complexity aloud for five representative problems.",
  },
  {
    title: "Prepare Project Stories",
    reason:
      "Project questions are likely to test both technical decisions and personal contribution.",
    action:
      "Prepare concise explanations for your role, architecture, challenges, and outcomes.",
  },
];

const workflow = [
  {
    title: "Analyze",
    description: "Review preparation history.",
  },
  {
    title: "Prioritize",
    description: "Find remaining weaknesses.",
  },
  {
    title: "Compress",
    description: "Select only essential material.",
  },
  {
    title: "Personalize",
    description: "Add projects and mistakes.",
  },
  {
    title: "Revise",
    description: "Use the final preparation pack.",
  },
];

export default function AIInterviewPreparationPersonalizedFinalRevisionPack() {
  const [showWeaknesses, setShowWeaknesses] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);
  const [showPatterns, setShowPatterns] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showBehavioral, setShowBehavioral] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
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
            AI Personalized Final Revision Pack
          </h1>

          <p className="text-gray-500">
            Your compact, AI-generated revision resource based on your actual
            preparation history and remaining weaknesses.
          </p>

        </div>

      </div>

      {/* Main Summary */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                82%
              </p>

              <p className="text-xs text-gray-500">
                Readiness
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              FINAL REVISION READINESS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Focused Final Preparation
            </h2>

            <p className="text-gray-600 mt-2">
              Your preparation is strong overall. The final revision should
              focus on a small number of recurring weaknesses rather than
              introducing new material.
            </p>

          </div>

        </div>

      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-orange-50 rounded-xl p-5">

            <Target className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Weak Concepts
            </p>

            <p className="text-3xl font-black text-orange-600">
              3
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Repeated Mistakes
            </p>

            <p className="text-3xl font-black text-red-600">
              3
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <BookOpen className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Key Patterns
            </p>

            <p className="text-3xl font-black text-indigo-600">
              6
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <BriefcaseBusiness className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Project Topics
            </p>

            <p className="text-3xl font-black text-purple-600">
              4
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <Clock3 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Pack Size
            </p>

            <p className="text-3xl font-black text-green-600">
              25
            </p>

          </div>

        </div>

      </div>

      {/* Weak Concepts */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-orange-600" />

            <div>

              <h2 className="font-bold text-lg">
                High-Priority Weak Concepts
              </h2>

              <p className="text-sm text-gray-500">
                Topics that deserve final revision attention.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowWeaknesses(!showWeaknesses)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWeaknesses
              ? "Hide Weaknesses"
              : "Show Weaknesses"}
          </button>

        </div>

        {showWeaknesses && (
          <div className="space-y-4 mt-6">

            {weakConcepts.map((concept) => (

              <div
                key={concept.title}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-3">

                      <h3 className="font-bold">
                        {concept.title}
                      </h3>

                      <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                        {concept.priority}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {concept.action}
                    </p>

                  </div>

                  <span className="text-2xl font-black text-orange-600">
                    {concept.score}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{
                      width: `${concept.score}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Repeated Mistakes */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-red-600" />

            <div>

              <h2 className="font-bold text-lg text-red-800">
                Frequently Repeated Mistakes
              </h2>

              <p className="text-sm text-gray-600">
                Mistakes that appeared multiple times during preparation.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowMistakes(!showMistakes)
            }
            className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold"
          >
            {showMistakes
              ? "Hide Mistakes"
              : "Show Mistakes"}
          </button>

        </div>

        {showMistakes && (
          <div className="space-y-3 mt-6">

            {repeatedMistakes.map((mistake) => (

              <div
                key={mistake.title}
                className="bg-white rounded-xl p-5 flex justify-between gap-4"
              >

                <div>

                  <h3 className="font-bold">
                    {mistake.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Appeared {mistake.count} times during preparation.
                  </p>

                </div>

                <span className="px-3 py-1 h-fit rounded-full bg-red-100 text-red-700 text-xs font-bold">
                  {mistake.impact} Impact
                </span>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Patterns + Formulas */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BookOpen className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Important Patterns & Formulas
              </h2>

              <p className="text-sm text-gray-500">
                Compact reference material selected from your preparation gaps.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowPatterns(!showPatterns)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showPatterns
              ? "Hide Reference"
              : "Show Reference"}
          </button>

        </div>

        {showPatterns && (
          <div className="grid md:grid-cols-2 gap-6 mt-6">

            <div className="border rounded-2xl p-5">

              <h3 className="font-bold">
                Key Patterns
              </h3>

              <div className="flex flex-wrap gap-2 mt-4">

                {patterns.map((pattern) => (

                  <span
                    key={pattern}
                    className="px-3 py-2 rounded-xl bg-indigo-100 text-indigo-700 text-sm font-semibold"
                  >
                    {pattern}
                  </span>

                ))}

              </div>

            </div>

            <div className="border rounded-2xl p-5">

              <h3 className="font-bold">
                Quick Complexity Reference
              </h3>

              <div className="space-y-3 mt-4">

                {formulas.map((formula) => (

                  <div
                    key={formula}
                    className="bg-gray-50 rounded-xl p-3 text-sm font-medium"
                  >
                    {formula}
                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Project Talking Points */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BriefcaseBusiness className="text-purple-600" />

            <div>

              <h2 className="font-bold text-lg">
                Project-Specific Talking Points
              </h2>

              <p className="text-sm text-gray-500">
                Prepare concise explanations for project-focused questions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowProjects(!showProjects)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showProjects
              ? "Hide Talking Points"
              : "Show Talking Points"}
          </button>

        </div>

        {showProjects && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">

            {projectTalkingPoints.map((point, index) => (

              <div
                key={point.title}
                className="border rounded-2xl p-5"
              >

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {point.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {point.description}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Behavioral */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <MessageSquare className="text-green-600" />

            <div>

              <h2 className="font-bold text-lg">
                Behavioral Interview Reminders
              </h2>

              <p className="text-sm text-gray-500">
                Last-minute reminders for behavioral and HR discussions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowBehavioral(!showBehavioral)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showBehavioral
              ? "Hide Reminders"
              : "Show Reminders"}
          </button>

        </div>

        {showBehavioral && (
          <div className="space-y-3 mt-6">

            {behavioralReminders.map((item, index) => (

              <div
                key={item}
                className="flex gap-3 border rounded-xl p-4"
              >

                <CheckCircle2
                  className="text-green-600 shrink-0"
                  size={20}
                />

                <p className="text-sm text-gray-700">
                  {index + 1}. {item}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Difficult Questions */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-orange-600" />

            <div>

              <h2 className="font-bold text-lg text-orange-800">
                Recent Difficult Questions
              </h2>

              <p className="text-sm text-gray-600">
                Questions that recently challenged you.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowQuestions(!showQuestions)
            }
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-semibold"
          >
            {showQuestions
              ? "Hide Questions"
              : "Show Questions"}
          </button>

        </div>

        {showQuestions && (
          <div className="space-y-4 mt-6">

            {difficultQuestions.map((item, index) => (

              <div
                key={item.question}
                className="bg-white rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <span className="text-xs font-bold text-orange-600">
                    QUESTION {index + 1}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                    {item.difficulty}
                  </span>

                </div>

                <p className="font-semibold mt-3">
                  {item.question}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Topic: {item.topic}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Final Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              AI FINAL REVISION STRATEGY
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Do not start large new topics now
            </h2>

            <p className="text-gray-600 mt-2">
              Your highest-value revision comes from strengthening recurring
              weaknesses, reviewing difficult questions, and rehearsing your
              own project and behavioral answers.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                RECOMMENDED ORDER
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Weak Concepts → Repeated Mistakes → Difficult Questions →
                Projects → Behavioral → Quick Reference
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Last-Minute AI Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Focus your remaining preparation time where it has the most
                value.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRecommendations(
                !showRecommendations
              )
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

      {/* Refresh */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Refresh Final Revision Pack
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update the pack whenever new practice changes your weaknesses or
              priorities.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Generate Updated Pack
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Final revision pack updated using your latest preparation
                activity.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Final Revision Pack Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI converts preparation history into a compact final
                revision resource.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowWorkflow(!showWorkflow)
            }
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
              Final revision should be targeted, not exhaustive.
            </h2>

            <p className="text-gray-600 mt-2">
              The best last-minute revision resource is not the largest one.
              It should contain the concepts, mistakes, patterns, projects, and
              questions that are most relevant to your current preparation
              state.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}