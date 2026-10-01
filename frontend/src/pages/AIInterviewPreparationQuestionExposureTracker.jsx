import React, { useState } from "react";
import {
  Brain,
  Target,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Layers,
  BookOpen,
} from "lucide-react";

const exposureAreas = [
  {
    name: "Algorithmic Questions",
    category: "Question Type",
    exposure: 86,
    target: 90,
    status: "Good",
    details: "Strong exposure to standard algorithmic problem solving.",
  },
  {
    name: "System Design",
    category: "Question Type",
    exposure: 58,
    target: 85,
    status: "Gap",
    details: "Limited exposure to architecture and scalability scenarios.",
  },
  {
    name: "Debugging Scenarios",
    category: "Scenario Type",
    exposure: 47,
    target: 75,
    status: "Gap",
    details: "Few practice sessions involve diagnosing existing failures.",
  },
  {
    name: "Behavioral Follow-ups",
    category: "Follow-up Style",
    exposure: 72,
    target: 80,
    status: "Watch",
    details: "Reasonable exposure, but deeper follow-up practice is limited.",
  },
  {
    name: "Hard Problems",
    category: "Difficulty",
    exposure: 41,
    target: 65,
    status: "Gap",
    details: "Hard-level practice is underrepresented.",
  },
  {
    name: "Constraint Changes",
    category: "Problem Format",
    exposure: 38,
    target: 70,
    status: "Gap",
    details: "Few problems require adapting a solution after requirements change.",
  },
];

const exposureCategories = [
  {
    name: "Question Types",
    score: 78,
    description:
      "Coverage across algorithmic, system-design, behavioral, debugging, and conceptual questions.",
  },
  {
    name: "Difficulty Levels",
    score: 69,
    description:
      "Balance between easy, medium, and hard interview questions.",
  },
  {
    name: "Topics",
    score: 84,
    description:
      "Breadth of technical topics practiced during preparation.",
  },
  {
    name: "Scenario Types",
    score: 61,
    description:
      "Coverage of debugging, optimization, design, failure, and constraint-change scenarios.",
  },
  {
    name: "Problem Formats",
    score: 66,
    description:
      "Exposure to different ways interview problems can be presented.",
  },
  {
    name: "Follow-up Styles",
    score: 73,
    description:
      "Experience responding to interviewer clarification and challenge questions.",
  },
];

const coachingQuestions = [
  "Which question type have you practiced the least?",
  "Are you practicing enough hard-level problems?",
  "Which scenario type would feel unfamiliar in a real interview?",
  "Have you practiced changing your solution after a new constraint is introduced?",
  "How often do you practice interviewer follow-up questions?",
  "Are your practice questions concentrated around one topic or source?",
];

const recommendations = [
  {
    title: "Increase System Design Exposure",
    reason:
      "System-design practice is significantly below the recommended coverage for a balanced interview preparation profile.",
    action:
      "Complete architecture, scalability, reliability, and trade-off scenarios.",
  },
  {
    title: "Practice More Constraint Changes",
    reason:
      "Requirement changes test whether the candidate understands why a solution works.",
    action:
      "Revisit solved problems with stricter memory, latency, or data-volume constraints.",
  },
  {
    title: "Add More Hard Problems",
    reason:
      "Low hard-question exposure can leave candidates unprepared for difficult interview rounds.",
    action:
      "Gradually introduce hard questions while maintaining medium-level practice.",
  },
];

const workflow = [
  {
    title: "Collect",
    description: "Record completed interview activities.",
  },
  {
    title: "Classify",
    description: "Tag question characteristics.",
  },
  {
    title: "Measure",
    description: "Calculate exposure coverage.",
  },
  {
    title: "Detect",
    description: "Find underrepresented areas.",
  },
  {
    title: "Diversify",
    description: "Recommend missing practice types.",
  },
];

export default function AIInterviewPreparationQuestionExposureTracker() {
  const [selectedArea, setSelectedArea] = useState(
    exposureAreas[1]
  );

  const [showAreas, setShowAreas] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const overallExposure = 68;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Question Exposure Tracker
          </h1>

          <p className="text-gray-500">
            Measure how broadly you have been exposed to different interview
            questions, scenarios, difficulties, and follow-up styles.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {overallExposure}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              INTERVIEW EXPOSURE SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Moderate Practice Diversity
            </h2>

            <p className="text-gray-600 mt-2">
              Your preparation covers several important areas, but system
              design, hard problems, debugging, and constraint-change
              scenarios need broader exposure.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <BookOpen className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Questions Tracked
            </p>

            <p className="text-3xl font-black text-indigo-600">
              124
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Well Covered
            </p>

            <p className="text-3xl font-black text-green-600">
              2
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Exposure Gaps
            </p>

            <p className="text-3xl font-black text-red-600">
              4
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <Layers className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Coverage
            </p>

            <p className="text-3xl font-black text-orange-600">
              68%
            </p>
          </div>

        </div>

      </div>

      {/* Exposure Areas */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Question Exposure Areas
              </h2>

              <p className="text-sm text-gray-500">
                Identify which interview formats are well practiced and which
                remain underrepresented.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowAreas(!showAreas)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAreas ? "Hide Areas" : "Show Areas"}
          </button>

        </div>

        {showAreas && (
          <div className="space-y-4 mt-6">

            {exposureAreas.map((area, index) => (

              <button
                type="button"
                key={area.name}
                onClick={() => setSelectedArea(area)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedArea.name === area.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h3 className="font-bold">
                          {area.name}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {area.category}
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          area.status === "Gap"
                            ? "bg-red-100 text-red-700"
                            : area.status === "Watch"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {area.status}
                      </span>

                    </div>

                    <div className="flex items-center gap-4 mt-4">

                      <div className="flex-1 h-3 bg-gray-200 rounded-full">

                        <div
                          className={`h-full rounded-full ${
                            area.exposure >= 80
                              ? "bg-green-500"
                              : area.exposure >= 60
                              ? "bg-orange-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${area.exposure}%`,
                          }}
                        />

                      </div>

                      <span className="font-black text-indigo-700">
                        {area.exposure}%
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      {area.details}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Area */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              SELECTED EXPOSURE AREA
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedArea.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedArea.details}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  CURRENT EXPOSURE
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  {selectedArea.exposure}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  TARGET
                </p>

                <p className="text-3xl font-black text-green-600">
                  {selectedArea.target}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  GAP
                </p>

                <p className="text-3xl font-black text-red-600">
                  {selectedArea.target - selectedArea.exposure}%
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Category Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Exposure Category Analysis
              </h2>

              <p className="text-sm text-gray-500">
                See how balanced your overall question exposure is.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowCategories(!showCategories)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showCategories ? "Hide Analysis" : "Show Analysis"}
          </button>

        </div>

        {showCategories && (
          <div className="space-y-4 mt-6">

            {exposureCategories.map((category) => (

              <div
                key={category.name}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {category.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {category.score}/100
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-3">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${category.score}%`,
                    }}
                  />

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {category.description}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Coaching Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Exposure Reflection Questions
              </h2>

              <p className="text-sm text-gray-500">
                Use these questions to identify hidden preparation gaps.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowQuestions(!showQuestions)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showQuestions ? "Hide Questions" : "Show Questions"}
          </button>

        </div>

        {showQuestions && (
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
                AI Exposure Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Recommended practice areas based on missing exposure.
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
                Exposure Tracking Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI identifies gaps in question diversity.
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
            {showWorkflow ? "Hide Workflow" : "Show Workflow"}
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

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Question Exposure
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
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
                Question exposure analyzed successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                Your overall exposure score is{" "}
                <strong>{overallExposure}/100</strong>. The largest gaps are
                currently in system design, debugging, hard questions, and
                constraint-change scenarios.
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
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Do not measure preparation only by questions solved.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong interview preparation requires exposure to different
              topics, difficulty levels, scenarios, formats, and follow-up
              styles so that candidates can adapt when the interview does not
              resemble familiar practice questions.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}