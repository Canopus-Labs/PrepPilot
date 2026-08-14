import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

const parts = [
  { name: "Situation", score: 90 },
  { name: "Task / Challenge", score: 82 },
  { name: "Action", score: 76 },
  { name: "Result", score: 64 },
];

export default function AIInterviewAnswerStorytellingCoach() {
  const [story, setStory] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Interview Storytelling Coach
          </h1>

          <p className="text-gray-500">
            Turn your experiences into clear and structured interview stories.
          </p>
        </div>
      </div>

      {/* Story Input */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Experience
        </h2>

        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={6}
          placeholder="Describe an experience or challenge you faced..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          disabled={!story.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50"
        >
          <Sparkles size={18} />
          Analyze Story
        </button>

      </div>

      {/* Story Structure */}
      {analyzed && (
        <>
          <div className="bg-purple-50 rounded-2xl p-6">

            <h2 className="font-bold text-lg">
              AI Story Structure
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-5">

              {parts.map((part) => (
                <div
                  key={part.name}
                  className="bg-white rounded-xl p-4"
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      {part.name}
                    </span>

                    <span className="font-bold">
                      {part.score}%
                    </span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-3">
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${part.score}%` }}
                    />
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Feedback */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Your situation and actions are clear. Add a measurable
                  result to make the story more convincing and complete.
                </p>
              </div>
            </div>

          </div>

          {/* Follow-up */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex items-center gap-2">
              <MessageSquare className="text-purple-600" />
              <h2 className="font-bold">
                Possible Follow-up Questions
              </h2>
            </div>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li>• What was the biggest challenge you faced?</li>
              <li>• Why did you choose that approach?</li>
              <li>• What would you do differently next time?</li>
              <li>• What was the measurable outcome?</li>
            </ul>

          </div>
        </>
      )}

    </div>
  );
}