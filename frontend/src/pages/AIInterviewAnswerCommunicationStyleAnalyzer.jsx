import React from "react";
import {
  Brain,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const styles = [
  { name: "Professional Tone", score: 88 },
  { name: "Clarity", score: 82 },
  { name: "Directness", score: 76 },
  { name: "Confidence", score: 84 },
  { name: "Formality", score: 79 },
  { name: "Conciseness", score: 68 },
];

export default function AIInterviewAnswerCommunicationStyleAnalyzer() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Communication Style Analyzer
          </h1>

          <p className="text-gray-500">
            Understand how your communication style affects your interview
            responses.
          </p>
        </div>

      </div>

      {/* Profile */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <MessageSquare
          className="mx-auto text-indigo-600"
          size={30}
        />

        <p className="text-gray-500 mt-3">
          Communication Style Score
        </p>

        <p className="text-6xl font-black text-indigo-600">
          81%
        </p>

        <p className="text-gray-600 mt-2">
          Professional and generally clear communication style.
        </p>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Communication Profile
        </h2>

        {styles.map((style) => (
          <div key={style.name} className="border rounded-xl p-4">

            <div className="flex justify-between">
              <span className="font-semibold">
                {style.name}
              </span>

              <span className="font-bold text-indigo-600">
                {style.score}%
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full mt-3">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${style.score}%` }}
              />
            </div>

          </div>
        ))}

      </div>

      {/* Insights */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <TrendingUp className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              Strong Communication Areas
            </h2>

            <p className="text-gray-600 mt-2">
              Your professional tone and confidence are strong. Your answers
              generally communicate technical ideas clearly.
            </p>
          </div>
        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <CheckCircle2 className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Reduce unnecessary explanations and conversational filler.
              Focus on concise statements that directly address the
              interviewer's question.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}