import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Search,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  "Empty Input",
  "Minimum / Maximum",
  "Duplicates",
  "Invalid Input",
  "Ordering",
  "Large Input",
];

const aiCases = [
  {
    category: "Empty Input",
    case: "Input array contains zero elements.",
    severity: "High",
  },
  {
    category: "Minimum / Maximum",
    case: "Array contains exactly one element.",
    severity: "High",
  },
  {
    category: "Duplicates",
    case: "All elements contain the same value.",
    severity: "Medium",
  },
  {
    category: "Ordering",
    case: "Input is already sorted in descending order.",
    severity: "Medium",
  },
  {
    category: "Large Input",
    case: "Input contains the maximum allowed number of elements.",
    severity: "High",
  },
  {
    category: "Invalid Input",
    case: "Input contains values outside the expected range.",
    severity: "Medium",
  },
];

const previousMistakes = [
  {
    type: "Empty Input",
    count: 4,
    lastSeen: "Aug 10, 2026",
  },
  {
    type: "Maximum Constraints",
    count: 3,
    lastSeen: "Aug 08, 2026",
  },
  {
    type: "Duplicate Values",
    count: 2,
    lastSeen: "Aug 05, 2026",
  },
];

export default function AIInterviewQuestionEdgeCaseDiscoveryCoach() {
  const [answer, setAnswer] = useState("");
  const [submittedCases, setSubmittedCases] = useState([]);
  const [checked, setChecked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addCase = (category) => {
    setSubmittedCases((current) =>
      current.includes(category)
        ? current
        : [...current, category]
    );
  };

  const analyzeCases = () => {
    if (!answer.trim() && submittedCases.length === 0) return;
    setChecked(true);
  };

  const visibleCases =
    selectedCategory === "All"
      ? aiCases
      : aiCases.filter((item) => item.category === selectedCategory);

  const discovered = submittedCases.length;
  const total = aiCases.length;

  const matchedCases = submittedCases.filter((item) =>
    aiCases.some((aiCase) => aiCase.category === item)
  ).length;

  const discoveryScore = Math.min(
    100,
    Math.round((matchedCases / total) * 100)
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Interview Question Edge Case Discovery Coach
          </h1>

          <p className="text-gray-500">
            Discover boundary conditions before submitting your solution and
            learn from the edge cases you miss.
          </p>

        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Problem
            </h2>

            <p className="text-sm text-gray-500">
              Given an array of integers, find the two values whose sum equals
              a target value.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Input
            </p>
            <p className="font-semibold mt-1">
              Integer array
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Constraint
            </p>
            <p className="font-semibold mt-1">
              Up to 100,000 elements
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Goal
            </p>
            <p className="font-semibold mt-1">
              Return a valid pair
            </p>
          </div>

        </div>

      </div>

      {/* Step 1 */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Search
            className="text-indigo-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-indigo-700">
              Step 1: Discover Edge Cases Yourself
            </h2>

            <p className="text-gray-600 mt-2">
              Before seeing AI suggestions, think about situations where your
              solution could fail or behave differently.
            </p>

            <div className="grid md:grid-cols-3 gap-3 mt-5">

              {categories.map((category) => {

                const selected = submittedCases.includes(category);

                return (
                  <button
                    type="button"
                    key={category}
                    onClick={() => addCase(category)}
                    className={`p-4 rounded-xl text-left border-2 transition ${
                      selected
                        ? "border-indigo-500 bg-white"
                        : "border-transparent bg-white"
                    }`}
                  >

                    <div className="flex items-center gap-2">

                      {selected ? (
                        <CheckCircle2
                          className="text-green-600"
                          size={20}
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}

                      <span className="font-semibold">
                        {category}
                      </span>

                    </div>

                  </button>
                );
              })}

            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={6}
              placeholder="Describe the specific edge cases you think your solution should handle..."
              className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              disabled={!answer.trim() && submittedCases.length === 0}
              onClick={analyzeCases}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              Analyze My Edge Cases
            </button>

          </div>

        </div>

      </div>

      {/* Results */}
      {checked && (
        <>
          {/* Discovery Score */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-indigo-50 rounded-2xl">

                <TrendingUp
                  className="text-indigo-600"
                  size={40}
                />

              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Edge Case Discovery Score
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    {discoveryScore}%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                    {total - matchedCases} Cases Missed
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Your score measures how many important edge-case categories
                  you identified before receiving AI assistance.
                </p>

                <div className="h-4 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{
                      width: `${discoveryScore}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Comparison */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Your Cases vs AI-Discovered Cases
                </h2>

                <p className="text-sm text-gray-500">
                  Compare what you identified with the cases the AI considers
                  important.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <div className="border rounded-2xl p-5">

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    Your Edge Cases
                  </h3>

                  <span className="text-indigo-600 font-bold">
                    {discovered}
                  </span>

                </div>

                <div className="space-y-3 mt-5">

                  {submittedCases.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No categories identified.
                    </p>
                  ) : (
                    submittedCases.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 bg-green-50 rounded-xl p-3"
                      >
                        <CheckCircle2
                          className="text-green-600"
                          size={18}
                        />
                        <span className="text-sm font-semibold">
                          {item}
                        </span>
                      </div>
                    ))
                  )}

                </div>

              </div>

              <div className="border rounded-2xl p-5">

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    AI Important Cases
                  </h3>

                  <span className="text-indigo-600 font-bold">
                    {total}
                  </span>

                </div>

                <div className="space-y-3 mt-5">

                  {aiCases.map((item) => {

                    const found = submittedCases.includes(
                      item.category
                    );

                    return (
                      <div
                        key={item.category}
                        className={`flex items-center gap-3 rounded-xl p-3 ${
                          found
                            ? "bg-green-50"
                            : "bg-orange-50"
                        }`}
                      >

                        {found ? (
                          <CheckCircle2
                            className="text-green-600"
                            size={18}
                          />
                        ) : (
                          <AlertTriangle
                            className="text-orange-600"
                            size={18}
                          />
                        )}

                        <span className="text-sm font-semibold">
                          {item.category}
                        </span>

                      </div>
                    );
                  })}

                </div>

              </div>

            </div>

          </div>

          {/* AI Cases */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Brain className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Edge Case Generator
                </h2>

                <p className="text-sm text-gray-500">
                  Additional cases generated after your independent attempt.
                </p>

              </div>

            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mt-6">

              {["All", ...categories].map((category) => (

                <button
                  type="button"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {category}
                </button>

              ))}

            </div>

            <div className="space-y-4 mt-5">

              {visibleCases.map((item) => {

                const found = submittedCases.includes(
                  item.category
                );

                return (
                  <div
                    key={item.case}
                    className="border rounded-xl p-5"
                  >

                    <div className="flex items-start gap-4">

                      {found ? (
                        <CheckCircle2
                          className="text-green-600 mt-1"
                        />
                      ) : (
                        <AlertTriangle
                          className="text-orange-600 mt-1"
                        />
                      )}

                      <div className="flex-1">

                        <div className="flex flex-wrap justify-between gap-3">

                          <h3 className="font-bold">
                            {item.case}
                          </h3>

                          <div className="flex gap-2">

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                              {item.category}
                            </span>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                item.severity === "High"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {item.severity}
                            </span>

                          </div>

                        </div>

                        <p className="text-sm text-gray-500 mt-2">

                          {found
                            ? "You identified this category."
                            : "You missed this category during your first attempt."}

                        </p>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* Missed Cases */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Edge Cases You Missed
                </h2>

                <p className="text-gray-600 mt-2">
                  These cases were generated after your independent attempt
                  and should be added to your testing checklist.
                </p>

                <div className="space-y-3 mt-5">

                  {aiCases
                    .filter(
                      (item) =>
                        !submittedCases.includes(item.category)
                    )
                    .map((item) => (
                      <div
                        key={item.case}
                        className="bg-white rounded-xl p-4"
                      >

                        <p className="font-semibold">
                          {item.case}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Category: {item.category}
                        </p>

                      </div>
                    ))}

                </div>

              </div>

            </div>

          </div>

          {/* Recurring Mistakes */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Recurring Edge-Case Mistakes
                </h2>

                <p className="text-sm text-gray-500">
                  Patterns from previous practice sessions.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              {previousMistakes.map((mistake) => (

                <div
                  key={mistake.type}
                  className="border rounded-xl p-5"
                >

                  <p className="font-bold">
                    {mistake.type}
                  </p>

                  <p className="text-3xl font-black text-orange-600 mt-2">
                    {mistake.count}x
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Last seen: {mistake.lastSeen}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* AI Coaching */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Coaching Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  You are consistently missing empty-input and maximum-size
                  cases. Before submitting future solutions, use a quick
                  checklist covering minimum input, maximum input, empty
                  input, duplicates, invalid values, ordering, and unusual
                  constraints.
                </p>

              </div>

            </div>

          </div>

          {/* Practice Checklist */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Pre-Submission Edge Case Checklist
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              {[
                "What happens with empty input?",
                "What happens with one element?",
                "What happens at minimum constraints?",
                "What happens at maximum constraints?",
                "Are duplicate values handled?",
                "What happens with invalid values?",
                "Does input ordering matter?",
                "What happens with very large input?",
              ].map((question) => (

                <div
                  key={question}
                  className="border rounded-xl p-4 flex gap-3"
                >

                  <CheckCircle2
                    className="text-indigo-600"
                    size={20}
                  />

                  <span className="text-sm font-medium">
                    {question}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Next Practice */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  Recommended Next Practice
                </h2>

                <p className="text-gray-600 mt-2">
                  Practice problems where the interviewer intentionally tests
                  boundary conditions. Focus especially on empty inputs,
                  maximum constraints, and duplicate values.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Edge Case Challenge
                  <ArrowUpRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}