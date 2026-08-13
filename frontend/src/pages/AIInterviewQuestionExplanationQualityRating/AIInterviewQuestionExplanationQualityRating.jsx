import React, { useState } from "react";
import {
  Brain,
  Lightbulb,
  Target,
  Code2,
  MessageSquare,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

const AIInterviewQuestionExplanationQualityRating = () => {
  const [stats] = useState({
    overallScore: 88,
    problemUnderstanding: 92,
    approachExplanation: 86,
    logicalReasoning: 89,
  });

  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const questions = [
    {
      title: "Explain your approach to the Two Sum problem.",
      difficulty: "Easy",
      score: 91,
    },
    {
      title: "How would you design an LRU Cache?",
      difficulty: "Hard",
      score: 84,
    },
    {
      title: "Explain how Binary Search works.",
      difficulty: "Medium",
      score: 89,
    },
  ];

  const evaluationCriteria = [
    {
      title: "Problem Understanding",
      score: 92,
      description:
        "Clearly identifies the problem requirements, constraints, and expected output.",
      icon: Target,
    },
    {
      title: "Approach Explanation",
      score: 86,
      description:
        "Explains the proposed solution before moving into implementation details.",
      icon: Lightbulb,
    },
    {
      title: "Logical Reasoning",
      score: 89,
      description:
        "Provides a logical sequence of decisions and explains why the approach works.",
      icon: Brain,
    },
    {
      title: "Technical Terminology",
      score: 85,
      description:
        "Uses appropriate technical concepts and terminology while explaining the solution.",
      icon: Code2,
    },
    {
      title: "Complexity Explanation",
      score: 83,
      description:
        "Explains time and space complexity and connects them to the chosen approach.",
      icon: BarChart3,
    },
    {
      title: "Final Conclusion",
      score: 90,
      description:
        "Clearly summarizes the solution and confirms why it solves the problem.",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Brain
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Question Explanation Quality Rating
            </h1>

            <p className="text-gray-500 mt-2">
              Evaluate how clearly you explain your reasoning, approach,
              technical decisions, and conclusions during technical
              interview questions.
            </p>

          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Overall Rating
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.overallScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Problem Understanding
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.problemUnderstanding}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Lightbulb
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Approach Explanation
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.approachExplanation}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <MessageSquare
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Logical Reasoning
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.logicalReasoning}%
            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            AI Explanation Quality Analysis
          </h2>

          <p className="leading-8 text-white/90">
            Correct answers are only part of a successful technical
            interview. The AI evaluates how clearly you understand the
            problem, explain your approach, justify decisions, describe
            complexity, and communicate your final conclusion.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Questions Evaluated
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {questions.map((question, index) => (

              <button
                key={index}
                onClick={() => setSelectedQuestion(index)}
                className={`text-left rounded-xl border p-6 transition ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <h3 className="font-bold">
                  {question.title}
                </h3>

                <div className="flex justify-between mt-5">

                  <span className="text-sm text-gray-500">
                    {question.difficulty}
                  </span>

                  <span className="font-bold text-violet-600">
                    {question.score}%
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <p className="text-sm text-gray-500">
            Selected Question
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {questions[selectedQuestion].title}
          </h2>

          <div className="mt-6 flex flex-wrap gap-4">

            <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
              {questions[selectedQuestion].difficulty}
            </span>

            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">
              Explanation Score: {questions[selectedQuestion].score}%
            </span>

          </div>

        </div>

        {/* Evaluation Criteria */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Explanation Evaluation Criteria
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {evaluationCriteria.map((criterion, index) => {

              const Icon = criterion.icon;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                        <Icon
                          size={22}
                          className="text-violet-600"
                        />

                      </div>

                      <h3 className="font-bold">
                        {criterion.title}
                      </h3>

                    </div>

                    <span className="text-xl font-black">
                      {criterion.score}%
                    </span>

                  </div>

                  <p className="text-gray-500 mt-5 leading-7">
                    {criterion.description}
                  </p>

                  <div className="mt-5">

                    <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                        style={{
                          width: `${criterion.score}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
                {/* Technical Terminology */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Code2 className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Technical Terminology
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              ["Concept Accuracy", 93],
              ["Terminology Usage", 87],
              ["Technical Precision", 90],
            ].map(([label, value], index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <p className="text-gray-500">
                  {label}
                </p>

                <p className="text-4xl font-black mt-3">
                  {value}%
                </p>

                <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{ width: `${value}%` }}
                  />

                </div>

              </div>

            ))}

          </div>

          <div className="mt-8 rounded-xl bg-blue-50 dark:bg-blue-900/10 p-6">

            <h3 className="font-bold text-lg">
              AI Terminology Feedback
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
              Your technical vocabulary is strong. Continue using
              precise terms such as time complexity, space complexity,
              hash lookup, traversal, recursion, and optimization
              when they directly support your explanation.
            </p>

          </div>

        </div>

        {/* Complexity Explanation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Complexity Explanation
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-gray-500">
                Time Complexity
              </p>

              <p className="text-4xl font-black mt-3">
                88%
              </p>

              <p className="mt-4 text-gray-500 leading-7">
                You usually explain the time complexity correctly.
                Improve by briefly connecting the complexity to the
                operations performed by your algorithm.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-gray-500">
                Space Complexity
              </p>

              <p className="text-4xl font-black mt-3">
                78%
              </p>

              <p className="mt-4 text-gray-500 leading-7">
                Remember to mention additional data structures and
                recursive call-stack memory when explaining space
                complexity.
              </p>

            </div>

          </div>

        </div>

        {/* Final Conclusion */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Final Conclusion Quality
            </h2>

          </div>

          <div className="text-center">

            <p className="text-7xl font-black text-green-600">
              90%
            </p>

            <p className="mt-4 text-gray-500">
              Your conclusions usually summarize the solution clearly.
            </p>

          </div>

          <div className="mt-8 rounded-xl bg-green-50 dark:bg-green-900/10 p-6">

            <h3 className="font-bold text-lg">
              AI Feedback
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
              Your conclusions are effective. After explaining the
              solution, briefly restate the key approach and why it
              satisfies the problem requirements.
            </p>

          </div>

        </div>

        {/* AI Improvement Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Lightbulb size={30} />

            <h2 className="text-3xl font-bold">
              AI Improvement Suggestions
            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Start by restating the problem in your own words.",
              "Explain why you selected your approach before writing code.",
              "State important assumptions and constraints explicitly.",
              "Connect each major implementation decision to the problem.",
              "Always mention time and space complexity.",
              "Finish with a concise explanation of why your solution works.",
            ].map((suggestion, index) => (

              <div
                key={index}
                className="rounded-xl bg-white/10 p-5"
              >

                <span className="font-semibold">
                  💡 {suggestion}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Structured Reasoning Framework */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Recommended Explanation Structure
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              ["1", "Understand", "Restate the problem and constraints."],
              ["2", "Plan", "Explain your selected approach."],
              ["3", "Reason", "Walk through the important decisions."],
              ["4", "Implement", "Explain the key implementation details."],
              ["5", "Analyze", "State time and space complexity."],
              ["6", "Conclude", "Summarize why the solution works."],
            ].map(([number, title, description], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

                  {number}

                </div>

                <h3 className="text-lg font-bold mt-5">
                  {title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Explanation Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Explanation Performance Analytics
          </h2>

          {[
            ["Overall Explanation Quality", stats.overallScore],
            ["Problem Understanding", stats.problemUnderstanding],
            ["Logical Reasoning", stats.logicalReasoning],
            ["Technical Terminology", 87],
            ["Complexity Explanation", 83],
            ["Final Conclusion", 90],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Overall Rating */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Your Explanation Quality Is Strong 🚀
              </h2>

              <p className="leading-8 text-white/90">
                You demonstrate strong technical understanding and
                logical reasoning. Focus on explaining complexity and
                connecting your technical decisions to the problem
                requirements to make your interview explanations even
                stronger.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🧠
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Overall Rating
              </h3>

              <p className="text-5xl font-black">
                {stats.overallScore}%
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AIInterviewQuestionExplanationQualityRating;