import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

const fields = [
  "What is being asked?",
  "What information is available?",
  "What is the expected output?",
  "What constraints exist?",
  "What assumptions need clarification?",
];

export default function AIInterviewAnswerQuestionReframingCoach() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const completed = fields.filter((_, i) => answers[i]?.trim()).length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Question Reframing Coach
          </h1>

          <p className="text-gray-500">
            Reframe the interview question before attempting the solution.
          </p>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Find the longest substring without repeating characters.
        </h2>
      </div>

      {/* Reframing */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-2 mb-5">
          <Target className="text-indigo-600" />
          <h2 className="font-bold text-lg">
            Reframe the Problem
          </h2>
        </div>

        <div className="space-y-4">

          {fields.map((field, index) => (
            <div key={field}>

              <label className="font-semibold">
                {index + 1}. {field}
              </label>

              <textarea
                rows={2}
                value={answers[index] || ""}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    [index]: e.target.value,
                  })
                }
                placeholder="Write your understanding..."
                className="w-full mt-2 border rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>
          ))}

        </div>

        <button
          disabled={completed < fields.length}
          onClick={() => setChecked(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Check My Reframing
        </button>

      </div>

      {/* Feedback */}
      {checked && (
        <>

          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Reframing Feedback
                </h2>

                <p className="text-gray-600 mt-2">
                  Your problem interpretation covers the main objective and
                  expected output. Consider clarifying the input constraints
                  before selecting an algorithm.
                </p>

                <p className="font-bold text-green-700 mt-3">
                  Reframing Score: 84%
                </p>
              </div>
            </div>

          </div>

          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <Lightbulb className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  AI Hint
                </h2>

                <p className="text-gray-600 mt-2">
                  Before coding, clarify the maximum input size and whether
                  characters are case-sensitive. These details can affect the
                  implementation.
                </p>
              </div>
            </div>

          </div>

        </>
      )}

    </div>
  );
}