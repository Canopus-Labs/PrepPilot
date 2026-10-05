import React, { useState } from "react";
import {
  Brain,
  Code2,
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  Eye,
  RefreshCw,
  ArrowRight,
  Target,
} from "lucide-react";

const originalCode = `function findDuplicates(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        if (!result.includes(arr[i])) {
          result.push(arr[i]);
        }
      }
    }
  }

  return result;
}`;

const expectedIssues = [
  {
    title: "Nested Loop",
    type: "Efficiency",
    severity: "High",
    description:
      "The solution uses nested loops, resulting in O(n²) time complexity.",
  },
  {
    title: "Repeated includes()",
    type: "Efficiency",
    severity: "Medium",
    description:
      "Checking result.includes() repeatedly adds additional linear scanning.",
  },
  {
    title: "Unnecessary Mutation",
    type: "Maintainability",
    severity: "Low",
    description:
      "The result array is repeatedly mutated instead of using a more direct data structure.",
  },
  {
    title: "Missing Input Contract",
    type: "Readability",
    severity: "Low",
    description:
      "The function does not document or validate the expected input.",
  },
];

const improvedCode = `function findDuplicates(arr) {
  const counts = new Map();
  const duplicates = [];

  for (const value of arr) {
    counts.set(value, (counts.get(value) || 0) + 1);
  }

  for (const [value, count] of counts) {
    if (count > 1) {
      duplicates.push(value);
    }
  }

  return duplicates;
}`;

export default function AIInterviewQuestionSolutionRefactoringPractice() {
  const [code, setCode] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [refactored, setRefactored] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [identifiedIssues, setIdentifiedIssues] = useState([]);

  const analyzeCode = () => {
    setAnalyzed(true);
  };

  const identifyIssue = (title) => {
    if (!identifiedIssues.includes(title)) {
      setIdentifiedIssues((current) => [...current, title]);
    }
  };

  const resetPractice = () => {
    setCode("");
    setAnalyzed(false);
    setRefactored(false);
    setSelectedIssue(null);
    setIdentifiedIssues([]);
  };

  const score = Math.round(
    (identifiedIssues.length / expectedIssues.length) * 100
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
            AI Solution Refactoring Practice
          </h1>

          <p className="text-gray-500">
            Review, improve, and defend changes to an already-working
            implementation.
          </p>
        </div>

      </div>

      {/* Practice Goal */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              PRACTICE OBJECTIVE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Improve a working solution without changing its intended behavior
            </h2>

            <p className="text-gray-600 mt-2">
              Identify engineering weaknesses, propose refactoring changes,
              improve efficiency, and explain why your version is better.
            </p>

          </div>

        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Code2 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Refactoring Challenge
            </h2>

            <p className="text-sm text-gray-500">
              The following function finds duplicate values in an array. It
              works, but it may have engineering weaknesses.
            </p>

          </div>

        </div>

        <div className="mt-5 grid md:grid-cols-3 gap-4">

          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Task
            </p>
            <p className="font-bold mt-1">
              Find duplicate values
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Input
            </p>
            <p className="font-bold mt-1">
              Array of values
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Goal
            </p>
            <p className="font-bold mt-1">
              Refactor, don't rewrite blindly
            </p>
          </div>

        </div>

      </div>

      {/* Original Code */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Code2 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Original Implementation
              </h2>

              <p className="text-sm text-gray-500">
                Review the implementation before changing anything.
              </p>

            </div>

          </div>

          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
            Needs Review
          </span>

        </div>

        <pre className="mt-5 bg-gray-950 text-gray-100 rounded-xl p-5 overflow-x-auto text-sm leading-6">
          {originalCode}
        </pre>

      </div>

      {/* Issue Identification */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Search className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Step 1: Identify Weaknesses
            </h2>

            <p className="text-sm text-gray-500">
              Select the issues you believe should be addressed.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          {expectedIssues.map((issue) => (

            <button
              type="button"
              key={issue.title}
              onClick={() => {
                identifyIssue(issue.title);
                setSelectedIssue(issue);
              }}
              className={`text-left border rounded-xl p-5 transition ${
                identifiedIssues.includes(issue.title)
                  ? "border-green-500 bg-green-50"
                  : selectedIssue?.title === issue.title
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex justify-between gap-3">

                <div className="flex gap-3">

                  {identifiedIssues.includes(issue.title) ? (
                    <CheckCircle2
                      className="text-green-600"
                      size={22}
                    />
                  ) : (
                    <AlertTriangle
                      className="text-orange-600"
                      size={22}
                    />
                  )}

                  <div>

                    <h3 className="font-bold">
                      {issue.title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {issue.type}
                    </p>

                  </div>

                </div>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold h-fit ${
                    issue.severity === "High"
                      ? "bg-red-100 text-red-700"
                      : issue.severity === "Medium"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {issue.severity}
                </span>

              </div>

              <p className="text-sm text-gray-600 mt-3">
                {issue.description}
              </p>

            </button>
          ))}

        </div>

        <div className="mt-5 flex items-center justify-between">

          <p className="text-sm text-gray-500">
            Issues identified:{" "}
            <strong>
              {identifiedIssues.length}/{expectedIssues.length}
            </strong>
          </p>

          <button
            type="button"
            onClick={analyzeCode}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Analyze My Review
          </button>

        </div>

      </div>

      {analyzed && (
        <>
          {/* Review Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <Eye
                className="text-indigo-600"
                size={30}
              />

              <div className="flex-1">

                <p className="text-xs font-bold text-indigo-600">
                  CODE REVIEW SCORE
                </p>

                <h2 className="text-2xl font-black text-indigo-800 mt-1">
                  {score}% Weakness Detection
                </h2>

                <p className="text-gray-600 mt-2">
                  You identified {identifiedIssues.length} of{" "}
                  {expectedIssues.length} important issues in the original
                  implementation.
                </p>

                <div className="h-4 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${score}%` }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Selected Issue */}
          {selectedIssue && (
            <div className="bg-orange-50 rounded-2xl p-6">

              <div className="flex gap-4">

                <AlertTriangle
                  className="text-orange-600"
                  size={28}
                />

                <div>

                  <p className="text-xs font-bold text-orange-600">
                    ISSUE INSPECTION
                  </p>

                  <h2 className="text-xl font-bold text-orange-800 mt-1">
                    {selectedIssue.title}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {selectedIssue.description}
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* Refactoring Editor */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <RefreshCw className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Step 2: Refactor the Solution
                </h2>

                <p className="text-sm text-gray-500">
                  Write your improved implementation and preserve the original
                  behavior.
                </p>

              </div>

            </div>

            <textarea
              rows={16}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Write your refactored implementation here...

Focus on:
- Better time complexity
- Better readability
- Appropriate data structures
- Clear naming
- Maintainable logic`}
              className="w-full border rounded-xl p-4 mt-5 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              disabled={!code.trim()}
              onClick={() => setRefactored(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              Review Refactoring
            </button>

          </div>

          {/* AI Reference */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Sparkles className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Reference Refactoring
                </h2>

                <p className="text-sm text-gray-500">
                  Compare your thinking with one possible improved approach.
                </p>

              </div>

            </div>

            <pre className="mt-5 bg-gray-950 text-gray-100 rounded-xl p-5 overflow-x-auto text-sm leading-6">
              {improvedCode}
            </pre>

          </div>

          {/* Comparison */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Zap className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Before vs After
                </h2>

                <p className="text-sm text-gray-500">
                  Evaluate the engineering impact of the refactoring.
                </p>

              </div>

            </div>

            <div className="overflow-x-auto mt-6">

              <table className="w-full text-sm">

                <thead>

                  <tr className="border-b">

                    <th className="text-left p-3">
                      Metric
                    </th>

                    <th className="text-left p-3">
                      Original
                    </th>

                    <th className="text-left p-3">
                      Refactored
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-b">

                    <td className="p-3 font-semibold">
                      Time Complexity
                    </td>

                    <td className="p-3 text-red-600">
                      O(n²)
                    </td>

                    <td className="p-3 text-green-600">
                      O(n)
                    </td>

                  </tr>

                  <tr className="border-b">

                    <td className="p-3 font-semibold">
                      Lookup
                    </td>

                    <td className="p-3">
                      Repeated array scan
                    </td>

                    <td className="p-3">
                      Hash-based lookup
                    </td>

                  </tr>

                  <tr className="border-b">

                    <td className="p-3 font-semibold">
                      Readability
                    </td>

                    <td className="p-3 text-orange-600">
                      Moderate
                    </td>

                    <td className="p-3 text-green-600">
                      Clear
                    </td>

                  </tr>

                  <tr>

                    <td className="p-3 font-semibold">
                      Maintainability
                    </td>

                    <td className="p-3 text-orange-600">
                      Moderate
                    </td>

                    <td className="p-3 text-green-600">
                      Improved
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

          {/* Refactoring Result */}
          {refactored && (
            <div className="bg-green-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <CheckCircle2
                  className="text-green-600"
                  size={28}
                />

                <div>

                  <p className="text-xs font-bold text-green-600">
                    REFACTORING REVIEW
                  </p>

                  <h2 className="text-xl font-bold text-green-800 mt-1">
                    Refactoring Submitted Successfully
                  </h2>

                  <p className="text-gray-600 mt-2">
                    AI can now compare your implementation with the original
                    behavior, complexity, readability, and maintainability
                    requirements.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* Change Explanation */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Step 3: Explain Your Changes
                </h2>

                <p className="text-sm text-gray-500">
                  A good refactoring answer should explain why each change was
                  made.
                </p>

              </div>

            </div>

            <textarea
              rows={7}
              placeholder={`Explain:
1. What was wrong with the original solution?
2. What did you change?
3. Why is the new approach better?
4. What trade-offs did you introduce?`}
              className="w-full border rounded-xl p-4 mt-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

          {/* Refactoring Skills */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Brain className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Skills Evaluated
                </h2>

                <p className="text-sm text-gray-500">
                  AI evaluates multiple engineering competencies during the
                  refactoring exercise.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <Search className="text-indigo-600" />

                <h3 className="font-bold mt-3">
                  Code Review
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Identifying weaknesses in existing code.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Zap className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Optimization
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Improving time and space efficiency.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Code2 className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Readability
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Improving naming, structure, and clarity.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Brain className="text-purple-600" />

                <h3 className="font-bold mt-3">
                  Engineering Judgment
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Choosing improvements without unnecessary complexity.
                </p>

              </div>

            </div>

          </div>

          {/* Interview Follow-Ups */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={28}
              />

              <div>

                <p className="text-xs font-bold text-indigo-600">
                  INTERVIEWER FOLLOW-UPS
                </p>

                <h2 className="text-xl font-bold text-indigo-800 mt-1">
                  Be ready to defend your refactoring decisions.
                </h2>

                <div className="space-y-2 mt-4 text-gray-600">

                  <p>
                    • Why did you choose this data structure?
                  </p>

                  <p>
                    • What is the new time and space complexity?
                  </p>

                  <p>
                    • Did the refactoring introduce any trade-offs?
                  </p>

                  <p>
                    • How would you test that behavior stayed unchanged?
                  </p>

                  <p>
                    • When would the original implementation actually be
                    acceptable?
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Workflow */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <RefreshCw className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Recommended Refactoring Workflow
                </h2>

                <p className="text-sm text-gray-500">
                  Use this sequence during real code-review interviews.
                </p>

              </div>

            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">

              {[
                "Understand Existing Code",
                "Identify Weaknesses",
                "Prioritize Changes",
                "Refactor",
                "Compare Complexity",
                "Explain Trade-Offs",
                "Validate Behavior",
              ].map((step, index, array) => (

                <React.Fragment key={step}>

                  <span className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm">
                    {step}
                  </span>

                  {index < array.length - 1 && (
                    <ArrowRight
                      className="text-gray-400"
                      size={18}
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* Reset */}
          <div className="flex justify-end">

            <button
              type="button"
              onClick={resetPractice}
              className="px-5 py-3 rounded-xl border font-semibold flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Restart Practice
            </button>

          </div>

        </>
      )}

    </div>
  );
}