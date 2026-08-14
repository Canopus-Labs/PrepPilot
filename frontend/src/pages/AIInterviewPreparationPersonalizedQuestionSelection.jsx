import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Clock,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const questions = [
  {
    title: "Design a Scalable URL Shortener",
    topic: "System Design",
    difficulty: "Medium",
    score: 94,
    reason: "Targets your current system-design weakness.",
  },
  {
    title: "Find the First Non-Repeating Character",
    topic: "Hashing",
    difficulty: "Easy",
    score: 78,
    reason: "Reinforces a recent hashing mistake.",
  },
  {
    title: "LRU Cache Implementation",
    topic: "Data Structures",
    difficulty: "Hard",
    score: 69,
    reason: "Tests an already strong skill at a higher difficulty.",
  },
];

const factors = [
  {
    name: "Recent Mistakes",
    score: 91,
    description: "Prioritizes concepts connected to recent errors.",
  },
  {
    name: "Skill Gap",
    score: 88,
    description: "Targets skills with the greatest improvement opportunity.",
  },
  {
    name: "Role Relevance",
    score: 94,
    description: "Matches questions to the selected target role.",
  },
  {
    name: "Difficulty Fit",
    score: 86,
    description: "Keeps the next question appropriate for current ability.",
  },
];

const workflow = [
  "Analyze Performance",
  "Identify Needs",
  "Rank Questions",
  "Select Best Match",
  "Update After Attempt",
];

export default function AIInterviewPreparationPersonalizedQuestionSelection() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [generated, setGenerated] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const question = questions[selectedQuestion];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Personalized Question Selection
          </h1>

          <p className="text-gray-500">
            Select the most valuable next interview question based on recent
            performance and preparation goals.
          </p>
        </div>

      </div>

      {/* Main Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <Sparkles className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI NEXT QUESTION
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Design a Scalable URL Shortener
            </h2>

            <p className="text-gray-600 mt-2">
              Recommended because System Design is currently your highest-impact
              weakness for the selected Software Engineer role.
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
              Current Skill
            </p>
            <p className="text-3xl font-black text-indigo-600">
              68%
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Recent Mistakes
            </p>
            <p className="text-3xl font-black text-red-600">
              4
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Topic Mastery
            </p>
            <p className="text-3xl font-black text-green-600">
              72%
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <BarChart3 className="text-purple-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Role Match
            </p>
            <p className="text-3xl font-black text-purple-600">
              94%
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <Sparkles className="text-orange-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Selection Score
            </p>
            <p className="text-3xl font-black text-orange-600">
              94%
            </p>
          </div>

        </div>

      </div>

      {/* Candidate Context */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Current Preparation Context
            </h2>

            <p className="text-sm text-gray-500">
              Signals used by the AI to select the next question.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="border rounded-xl p-5">
            <p className="text-xs text-gray-500">
              TARGET ROLE
            </p>
            <p className="font-bold mt-2">
              Software Engineer
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-xs text-gray-500">
              PRACTICE GOAL
            </p>
            <p className="font-bold mt-2">
              Improve System Design
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-xs text-gray-500">
              LAST DIFFICULTY
            </p>
            <p className="font-bold mt-2">
              Medium
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-xs text-gray-500">
              LAST RESULT
            </p>
            <p className="font-bold text-orange-600 mt-2">
              Needs Review
            </p>
          </div>

        </div>

      </div>

      {/* Recommended Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Sparkles className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Recommended Next Question
            </h2>

            <p className="text-sm text-gray-500">
              The question with the highest estimated preparation value.
            </p>
          </div>

        </div>

        <div className="bg-indigo-50 rounded-2xl p-6 mt-5">

          <div className="flex justify-between gap-5">

            <div>

              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                Medium
              </span>

              <h2 className="text-xl font-black text-indigo-800 mt-4">
                Design a Scalable URL Shortener
              </h2>

              <p className="text-gray-600 mt-2">
                Design the architecture, explain the major components, and
                discuss how the system should scale as traffic increases.
              </p>

            </div>

            <div className="text-right">

              <p className="text-xs text-gray-500">
                AI VALUE SCORE
              </p>

              <p className="text-4xl font-black text-indigo-600">
                94
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div className="bg-white rounded-xl p-4 mt-5">

            <p className="text-xs font-bold text-indigo-600">
              WHY THIS QUESTION?
            </p>

            <p className="text-sm text-gray-600 mt-2">
              It directly targets a recent weakness while keeping difficulty
              manageable enough to encourage meaningful progress.
            </p>

          </div>

        </div>

      </div>

      {/* Question Alternatives */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Ranked Question Alternatives
              </h2>

              <p className="text-sm text-gray-500">
                Other questions considered by the selection engine.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowQuestions(!showQuestions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showQuestions ? "Hide Questions" : "Show Questions"}
          </button>

        </div>

        {showQuestions && (
          <div className="space-y-4 mt-6">

            {questions.map((item, index) => (

              <button
                type="button"
                key={item.title}
                onClick={() => setSelectedQuestion(index)}
                className={`w-full text-left border rounded-2xl p-5 ${
                  selectedQuestion === index
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="font-black text-indigo-600">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <span className="font-black text-indigo-600">
                        {item.score}/100
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.topic} · {item.difficulty}
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      {item.reason}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Selected Question Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Why this question was ranked at this position.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              QUESTION
            </p>
            <p className="font-bold mt-2">
              {question.title}
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              TOPIC
            </p>
            <p className="font-bold text-purple-700 mt-2">
              {question.topic}
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              DIFFICULTY
            </p>
            <p className="font-bold text-orange-700 mt-2">
              {question.difficulty}
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              VALUE SCORE
            </p>
            <p className="text-3xl font-black text-green-600 mt-1">
              {question.score}
            </p>
          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-5">

          <p className="text-xs font-bold text-gray-500">
            SELECTION REASON
          </p>

          <p className="text-gray-700 mt-2">
            {question.reason}
          </p>

        </div>

      </div>

      {/* Selection Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Selection Factors
              </h2>

              <p className="text-sm text-gray-500">
                Signals used to rank potential questions.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors ? "Hide Factors" : "Show Factors"}
          </button>

        </div>

        {showFactors && (
          <div className="grid md:grid-cols-2 gap-5 mt-6">

            {factors.map((factor) => (

              <div
                key={factor.name}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    {factor.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {factor.score}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{
                      width: `${factor.score}%`,
                    }}
                  />

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {factor.description}
                </p>

              </div>

            ))}

          </div>
        )}

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
              Target weaknesses without overwhelming the candidate.
            </h2>

            <p className="text-gray-600 mt-2">
              The best next question is not always the hardest question. Select
              a problem that addresses an important gap while remaining
              appropriate for the candidate's current skill level.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  CURRENT NEED
                </p>
                <p className="font-bold mt-1">
                  System Design
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  DIFFICULTY
                </p>
                <p className="font-bold mt-1">
                  Medium
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  EXPECTED VALUE
                </p>
                <p className="font-bold text-green-700 mt-1">
                  Very High
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
              Generate Next Question
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate the best question using your latest preparation data.
            </p>

            <button
              type="button"
              onClick={() => setGenerated(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Select Next Question
              <ArrowRight size={18} />
            </button>

            {generated && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Personalized next question selected successfully.
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
              Update Question Recommendation
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate recommendations after completing a new question.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Refresh Recommendation
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Question recommendation updated successfully.
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
                Personalized Selection Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI chooses the next practice question.
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
              The next question should have a purpose.
            </h2>

            <p className="text-gray-600 mt-2">
              Personalized practice should continuously respond to what the
              candidate has recently learned, struggled with, and mastered.
              This makes every question an intentional step toward interview
              readiness.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}