import React, { useState } from "react";
import {
  Brain,
  Search,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  MessageSquare,
  ArrowRight,
  Target,
} from "lucide-react";

const terminology = [
  {
    generic: "It makes the application faster.",
    term: "Caching",
    category: "Performance",
    explanation:
      "Caching stores frequently accessed data closer to the consumer so repeated requests can avoid expensive processing or database access.",
    context:
      "Appropriate when discussing repeated reads, latency reduction, or reducing database load.",
    confidence: "High",
  },
  {
    generic: "The servers can handle more users.",
    term: "Horizontal Scaling",
    category: "Scalability",
    explanation:
      "Horizontal scaling means adding more application instances instead of relying on a single larger machine.",
    context:
      "Useful when explaining how a stateless service handles increasing traffic.",
    confidence: "High",
  },
  {
    generic: "It keeps the system working if something fails.",
    term: "Fault Tolerance",
    category: "Reliability",
    explanation:
      "Fault tolerance describes the ability of a system to continue operating despite failures in individual components.",
    context:
      "Useful when discussing redundancy, replication, failover, or resilient architecture.",
    confidence: "High",
  },
  {
    generic: "We split the database to handle more data.",
    term: "Database Sharding",
    category: "Data Architecture",
    explanation:
      "Sharding distributes data across multiple database partitions or nodes to improve scalability.",
    context:
      "Appropriate when discussing very large datasets or workloads that exceed a single database node.",
    confidence: "Medium",
  },
];

const practiceQuestions = [
  "Replace 'make it faster' with a specific performance technique.",
  "Explain when horizontal scaling is preferable to vertical scaling.",
  "Describe the difference between fault tolerance and simple error handling.",
];

export default function AIInterviewAnswerTechnicalTerminologyExpansionCoach() {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [showPractice, setShowPractice] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [answer, setAnswer] = useState("");

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Terminology Expansion Coach
          </h1>

          <p className="text-gray-500">
            Improve technical precision by replacing generic descriptions with
            context-appropriate engineering terminology.
          </p>
        </div>

      </div>

      {/* Introduction */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              TECHNICAL VOCABULARY COACH
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Say exactly what you mean.
            </h2>

            <p className="text-gray-600 mt-2">
              AI detects vague technical descriptions and suggests terminology
              that communicates the underlying engineering concept more clearly.
            </p>

          </div>

        </div>

      </div>

      {/* Example Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <MessageSquare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Candidate Answer
            </h2>

            <p className="text-sm text-gray-500">
              Example technical response analyzed by AI.
            </p>

          </div>

        </div>

        <div className="mt-5 bg-gray-50 rounded-xl p-5">

          <p className="text-gray-700 leading-7">
            "To make the application faster, we can keep frequently used data
            somewhere closer to the application. Also, we can add more servers
            when the number of users increases. If one server fails, another
            server can continue handling requests."
          </p>

        </div>

        <div className="mt-5">

          <p className="text-sm font-semibold mb-2">
            Try your own answer
          </p>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Paste or write a technical interview answer here..."
            className="w-full min-h-[130px] border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={() => setAnalyzed(true)}
            className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
          >
            Analyze Terminology
            <ArrowRight size={18} />
          </button>

        </div>

      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Search
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Opportunities
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {terminology.length}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Generic Phrases
            </p>

            <p className="text-3xl font-black text-orange-600">
              4
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              High Confidence
            </p>

            <p className="text-3xl font-black text-green-600">
              3
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <BookOpen
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Categories
            </p>

            <p className="text-3xl font-black text-purple-600">
              4
            </p>

          </div>

        </div>

      </div>

      {/* Terminology Opportunities */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Search className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Terminology Opportunities
            </h2>

            <p className="text-sm text-gray-500">
              Generic statements that could be made more technically precise.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {terminology.map((item) => (

            <button
              type="button"
              key={item.term}
              onClick={() => setSelectedTerm(item)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedTerm?.term === item.term
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <BookOpen size={22} />
                </div>

                <div className="flex-1">

                  <p className="text-sm text-gray-500">
                    Generic phrase
                  </p>

                  <p className="font-semibold mt-1">
                    "{item.generic}"
                  </p>

                </div>

                <ArrowRight
                  className="text-gray-400"
                  size={20}
                />

                <div className="text-right">

                  <p className="text-xs text-gray-500">
                    Suggested term
                  </p>

                  <p className="font-black text-indigo-700 mt-1">
                    {item.term}
                  </p>

                  <span className="text-xs text-gray-500">
                    {item.category}
                  </span>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Term */}
      {selectedTerm && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <Lightbulb
              className="text-indigo-600"
              size={30}
            />

            <div className="flex-1">

              <p className="text-xs font-bold text-indigo-600">
                TERMINOLOGY EXPLANATION
              </p>

              <h2 className="text-2xl font-black text-indigo-800 mt-1">
                {selectedTerm.term}
              </h2>

              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white text-indigo-700 text-xs font-semibold">
                {selectedTerm.category}
              </span>

              <div className="grid md:grid-cols-2 gap-4 mt-5">

                <div className="bg-white rounded-xl p-5">

                  <p className="text-xs font-bold text-gray-500">
                    WHAT IT MEANS
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    {selectedTerm.explanation}
                  </p>

                </div>

                <div className="bg-white rounded-xl p-5">

                  <p className="text-xs font-bold text-gray-500">
                    WHEN TO USE IT
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    {selectedTerm.context}
                  </p>

                </div>

              </div>

              <div className="bg-white rounded-xl p-5 mt-4">

                <p className="text-xs font-bold text-indigo-600">
                  CONTEXT CHECK
                </p>

                <div className="flex items-center gap-2 mt-2">

                  <CheckCircle2
                    className="text-green-600"
                    size={20}
                  />

                  <p className="text-sm font-semibold">
                    {selectedTerm.confidence} confidence that this term fits
                    the example context.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Before / After */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Before vs. After
            </h2>

            <p className="text-sm text-gray-500">
              See how precise terminology improves technical communication.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="border rounded-2xl p-5">

            <p className="text-xs font-bold text-orange-600">
              GENERIC
            </p>

            <p className="font-semibold text-gray-700 mt-3">
              "We can make the application faster by storing frequently used
              data closer to the application."
            </p>

            <p className="text-sm text-gray-500 mt-3">
              The idea is understandable, but the technical mechanism is not
              explicitly named.
            </p>

          </div>

          <div className="border rounded-2xl p-5">

            <p className="text-xs font-bold text-green-600">
              PRECISE
            </p>

            <p className="font-semibold text-gray-700 mt-3">
              "We can use a Redis cache to reduce repeated database reads and
              lower redirect latency."
            </p>

            <p className="text-sm text-gray-500 mt-3">
              The specific technology and the reason for using it are now
              clearly communicated.
            </p>

          </div>

        </div>

      </div>

      {/* Terminology Categories */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BookOpen className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Terminology Categories
            </h2>

            <p className="text-sm text-gray-500">
              AI organizes terminology by the technical concept it represents.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          {[
            {
              name: "Performance",
              examples: "Caching, indexing, batching",
            },
            {
              name: "Scalability",
              examples: "Sharding, replication, load balancing",
            },
            {
              name: "Reliability",
              examples: "Failover, redundancy, fault tolerance",
            },
            {
              name: "Architecture",
              examples: "Stateless, decoupling, abstraction",
            },
          ].map((category) => (

            <div
              key={category.name}
              className="border rounded-xl p-5"
            >

              <h3 className="font-bold">
                {category.name}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {category.examples}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Practice */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex gap-4">

            <MessageSquare
              className="text-orange-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-orange-600">
                OPTIONAL PRACTICE
              </p>

              <h2 className="text-xl font-bold text-orange-800 mt-1">
                Practice using precise terminology.
              </h2>

              <p className="text-gray-600 mt-2">
                Convert generic explanations into technically specific
                interview responses.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowPractice(!showPractice)}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-semibold"
          >
            {showPractice ? "Hide Practice" : "Start Practice"}
          </button>

        </div>

        {showPractice && (
          <div className="space-y-4 mt-6">

            {practiceQuestions.map((question, index) => (

              <div
                key={question}
                className="bg-white rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <p className="font-semibold">
                    {question}
                  </p>

                </div>

                <textarea
                  placeholder="Write your answer..."
                  className="w-full mt-4 min-h-[90px] border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
                />

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Coaching Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Terminology Coaching Flow
            </h2>

            <p className="text-sm text-gray-500">
              Suggestions are context-aware rather than based on a fixed
              vocabulary list.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Analyze Answer",
            "Detect Generic Language",
            "Identify Concept",
            "Suggest Term",
            "Check Context",
            "Practice",
          ].map((step, index, array) => (

            <React.Fragment key={step}>

              <span
                className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                  index === array.length - 1
                    ? "bg-green-100 text-green-700"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
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

      {/* Recommendation */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={28}
          />

          <div>

            <h2 className="font-bold text-green-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Prefer precise terminology when it adds useful technical
              information, but do not use complex terms simply to sound
              technical. Every suggested term should accurately match the
              context of your explanation.
            </p>

          </div>

        </div>

      </div>

      {/* Analysis Complete */}
      {analyzed && (
        <div className="bg-green-50 rounded-xl p-4">

          <div className="flex gap-3">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-green-700">
              Technical terminology analysis completed successfully.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}