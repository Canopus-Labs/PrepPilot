import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  MessageSquare,
} from "lucide-react";

const vocabularyItems = [
  {
    term: "scalable architecture",
    level: "Appropriate",
    score: 92,
    feedback:
      "This terminology matches the expected vocabulary for a Software Engineer interview.",
  },
  {
    term: "make the database faster",
    level: "Too Basic",
    score: 54,
    feedback:
      "Use more precise terminology such as query optimization, indexing, or database performance tuning.",
  },
  {
    term: "horizontal scaling",
    level: "Appropriate",
    score: 95,
    feedback:
      "This is a precise and role-appropriate technical term.",
  },
  {
    term: "distributed consensus orchestration",
    level: "Unnecessary Jargon",
    score: 48,
    feedback:
      "This terminology may sound unnecessarily advanced unless the architecture specifically requires it.",
  },
  {
    term: "API endpoint",
    level: "Appropriate",
    score: 90,
    feedback:
      "Clear and commonly understood terminology for the target role.",
  },
];

const levels = [
  {
    title: "Too Basic",
    description: "Uses everyday wording where technical precision is expected.",
    color: "orange",
  },
  {
    title: "Appropriate",
    description: "Matches the expected technical vocabulary for the role.",
    color: "green",
  },
  {
    title: "Advanced",
    description: "Uses advanced terminology when it adds meaningful precision.",
    color: "blue",
  },
  {
    title: "Unnecessary Jargon",
    description: "Uses complex terminology without adding useful meaning.",
    color: "red",
  },
];

export default function AIInterviewAnswerTechnicalVocabularyLevelAnalyzer() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Vocabulary Level Analyzer
          </h1>

          <p className="text-gray-500">
            Check whether your technical vocabulary matches the expectations
            of your target interview role.
          </p>
        </div>

      </div>

      {/* Target Role */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <p className="text-sm text-gray-500">
              Target Role
            </p>

            <h2 className="text-xl font-bold">
              Software Engineer
            </h2>
          </div>

        </div>

        <p className="text-gray-600 mt-4">
          AI will evaluate whether your terminology is precise enough for the
          role without introducing unnecessary jargon.
        </p>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Interview Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Paste or write your technical interview answer..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Vocabulary
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-4 items-center">

              <MessageSquare
                className="text-indigo-600"
                size={38}
              />

              <div>

                <p className="text-sm text-gray-500">
                  Vocabulary Role Alignment
                </p>

                <p className="text-5xl font-black text-indigo-600">
                  82%
                </p>

                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                  Mostly Appropriate
                </span>

              </div>

            </div>

            <p className="text-gray-600 mt-4">
              Your technical vocabulary generally matches the Software
              Engineer role, but some phrases should be made more precise and
              a few advanced terms can be simplified.
            </p>

          </div>

          {/* Vocabulary Stats */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Technical Terms
              </p>

              <p className="text-3xl font-black text-indigo-600 mt-2">
                18
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Appropriate
              </p>

              <p className="text-3xl font-black text-green-600 mt-2">
                13
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Too Basic
              </p>

              <p className="text-3xl font-black text-orange-600 mt-2">
                3
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Unnecessary Jargon
              </p>

              <p className="text-3xl font-black text-red-600 mt-2">
                2
              </p>

            </div>

          </div>

          {/* Vocabulary Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Vocabulary Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a term to view role-specific feedback.
            </p>

            <div className="space-y-4 mt-5">

              {vocabularyItems.map((item) => (
                <button
                  type="button"
                  key={item.term}
                  onClick={() =>
                    setSelected(
                      selected?.term === item.term
                        ? null
                        : item
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-3">

                    {item.level === "Appropriate" ? (
                      <CheckCircle2
                        className="text-green-600 mt-1"
                        size={21}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-600 mt-1"
                        size={21}
                      />
                    )}

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-semibold">
                            "{item.term}"
                          </h3>

                          <span
                            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                              item.level === "Appropriate"
                                ? "bg-green-100 text-green-700"
                                : item.level === "Too Basic"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.level}
                          </span>

                        </div>

                        <span className="font-bold text-indigo-600">
                          {item.score}%
                        </span>

                      </div>

                      <div className="h-2 bg-gray-200 rounded-full mt-4">

                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{
                            width: `${item.score}%`,
                          }}
                        />

                      </div>

                      {selected?.term === item.term && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-sm text-gray-600">
                            {item.feedback}
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Vocabulary Levels */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Vocabulary Level Guide
            </h2>

            <div className="grid md:grid-cols-4 gap-4 mt-5">

              {levels.map((level) => (
                <div
                  key={level.title}
                  className="border rounded-xl p-4"
                >

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      level.color === "green"
                        ? "bg-green-100 text-green-700"
                        : level.color === "orange"
                        ? "bg-orange-100 text-orange-700"
                        : level.color === "blue"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {level.title}
                  </span>

                  <p className="text-sm text-gray-600 mt-3">
                    {level.description}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Before / After */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-orange-600"
                size={26}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Vocabulary Improvement
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mt-4">

                  <div className="bg-white rounded-xl p-4">

                    <p className="text-sm text-gray-500">
                      Less Precise
                    </p>

                    <p className="font-semibold mt-2">
                      "We need to make the database faster."
                    </p>

                  </div>

                  <div className="bg-white rounded-xl p-4">

                    <p className="text-sm text-gray-500">
                      More Technical
                    </p>

                    <p className="font-semibold mt-2">
                      "We can optimize database queries and add appropriate
                      indexes to reduce query latency."
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={26}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Prefer terminology that communicates technical meaning
                  precisely. Avoid replacing simple concepts with complex
                  jargon just to sound advanced. Use advanced vocabulary only
                  when it adds useful information.
                </p>

              </div>

            </div>

          </div>

          {/* Practice */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Vocabulary Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Rewrite technically vague statements using precise,
              role-appropriate terminology without making the explanation
              unnecessarily complicated.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Start Vocabulary Practice
            </button>

          </div>

        </>
      )}

    </div>
  );
}