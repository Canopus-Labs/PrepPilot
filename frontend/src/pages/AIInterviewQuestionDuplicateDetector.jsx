import React from "react";
import { Brain, Copy, AlertTriangle, CheckCircle2 } from "lucide-react";

const questions = [
  {
    question: "What is the difference between an array and a linked list?",
    similarity: 96,
    status: "Potential Duplicate",
  },
  {
    question: "How does a linked list differ from an array?",
    similarity: 96,
    status: "Potential Duplicate",
  },
  {
    question: "Explain binary search and its time complexity.",
    similarity: 32,
    status: "Unique",
  },
];

export default function AIInterviewQuestionDuplicateDetector() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Question Duplicate Detector
          </h1>
          <p className="text-gray-500">
            Find exact and semantically similar interview questions.
          </p>
        </div>
      </div>

      <div className="bg-orange-50 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <Copy className="text-orange-600" />

          <div>
            <p className="text-gray-500">
              Potential Duplicates Found
            </p>

            <p className="text-4xl font-black text-orange-600">
              2
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 space-y-4">
        <h2 className="text-lg font-bold">
          AI Similarity Analysis
        </h2>

        {questions.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4"
          >
            <div className="flex justify-between gap-4">

              <p className="font-medium">
                {item.question}
              </p>

              {item.status === "Unique" ? (
                <CheckCircle2 className="text-green-600 shrink-0" />
              ) : (
                <AlertTriangle className="text-orange-600 shrink-0" />
              )}

            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">
                Semantic Similarity
              </span>

              <span className="font-bold">
                {item.similarity}%
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full mt-2">
              <div
                className={`h-full rounded-full ${
                  item.similarity >= 80
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${item.similarity}%` }}
              />
            </div>

            <p
              className={`text-sm font-semibold mt-3 ${
                item.status === "Unique"
                  ? "text-green-600"
                  : "text-orange-600"
              }`}
            >
              {item.status}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-2xl p-5">
        <h2 className="font-bold">
          AI Recommendation
        </h2>

        <p className="text-gray-600 mt-2">
          Questions 1 and 2 appear to test the same concept. Consider merging
          them or linking them as alternative versions to reduce repetitive
          practice.
        </p>
      </div>

    </div>
  );
}