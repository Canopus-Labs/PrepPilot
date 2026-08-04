import React, { useState } from "react";
import {
  Brain,
  MessageSquare,
  TrendingUp,
  Target,
  CheckCircle,
} from "lucide-react";

const FollowUpQuestionGenerator = () => {

  const [stats] = useState({
    followUps: 42,
    confidence: 91,
    consistency: 87,
    difficulty: "Medium",
  });

  const [answer, setAnswer] = useState("");

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Brain
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                AI Follow-up Question Generator

              </h1>

              <p className="text-gray-500 mt-2">

                Simulate real interview conversations by
                generating intelligent follow-up questions
                based on your answers.

              </p>

            </div>

          </div>

        </div>

        {/* Answer Input */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-xl font-bold mb-5">

            Your Interview Answer

          </h2>

          <textarea
            rows={6}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your interview answer here..."
            className="w-full rounded-2xl border border-gray-300 dark:border-white/10 p-4 bg-white dark:bg-[#1f2937] outline-none resize-none"
          />

          <button className="mt-6 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition">

            Analyze Answer

          </button>

        </div>

        {/* Dashboard */}

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <MessageSquare
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Follow-ups

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.followUps}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              AI Confidence

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.confidence}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <CheckCircle
              size={30}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="text-gray-500">

              Consistency

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.consistency}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <TrendingUp
              size={30}
              className="mx-auto text-orange-500 mb-3"
            />

            <h3 className="text-gray-500">

              Difficulty

            </h3>

            <p className="text-4xl font-black mt-4">

              {stats.difficulty}

            </p>

          </div>

        </div>
                {/* AI Answer Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Answer Analysis

          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                title: "Technical Accuracy",
                value: "92%",
              },
              {
                title: "Communication",
                value: "88%",
              },
              {
                title: "Confidence",
                value: "91%",
              },
              {
                title: "Completeness",
                value: "84%",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <h3 className="text-gray-500">

                  {item.title}

                </h3>

                <p className="text-4xl font-black text-violet-600 mt-4">

                  {item.value}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* AI Follow-up Questions */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-8">

            AI Generated Follow-up Questions

          </h2>

          <div className="space-y-6">

            {[
              {
                difficulty: "Medium",
                question:
                  "Can you explain why you chose this approach instead of an alternative solution?",
              },
              {
                difficulty: "Medium",
                question:
                  "What trade-offs did you consider while designing this solution?",
              },
              {
                difficulty: "Hard",
                question:
                  "How would your solution scale if the input size increased by 1000x?",
              },
              {
                difficulty: "Hard",
                question:
                  "Can you optimize the time or space complexity further?",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8"
              >

                <div className="flex justify-between items-center">

                  <h3 className="text-xl font-bold">

                    Follow-up #{index + 1}

                  </h3>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      item.difficulty === "Hard"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {item.difficulty}

                  </span>

                </div>

                <p className="mt-5 text-gray-600 dark:text-gray-300 leading-8">

                  {item.question}

                </p>

                <button className="mt-6 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition">

                  Practice Answer

                </button>

              </div>

            ))}

          </div>

        </div>

        {/* Conversation Depth */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Depth of Understanding

          </h2>

          <div className="space-y-6">

            {[
              {
                topic: "Problem Understanding",
                score: 95,
              },
              {
                topic: "Algorithm Knowledge",
                score: 87,
              },
              {
                topic: "Optimization",
                score: 76,
              },
              {
                topic: "Real-world Applications",
                score: 82,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.topic}

                  </span>

                  <span className="font-bold">

                    {item.score}%

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>
                {/* AI Consistency Feedback */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Consistency Feedback

          </h2>

          <div className="space-y-5">

            {[
              {
                title: "Technical Consistency",
                feedback:
                  "Your explanation remained technically accurate throughout the answer.",
                score: 91,
              },
              {
                title: "Logical Flow",
                feedback:
                  "Ideas were presented in a clear sequence with minor gaps.",
                score: 87,
              },
              {
                title: "Confidence",
                feedback:
                  "Responses sounded confident but could include more real examples.",
                score: 89,
              },
              {
                title: "Detail Level",
                feedback:
                  "Consider explaining implementation decisions in greater depth.",
                score: 83,
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex justify-between items-center">

                  <h3 className="text-lg font-bold">

                    {item.title}

                  </h3>

                  <span className="text-xl font-bold text-violet-600">

                    {item.score}%

                  </span>

                </div>

                <p className="mt-3 text-gray-600 dark:text-gray-300 leading-7">

                  {item.feedback}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Difficulty Progression */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Difficulty Progression

          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                level: "Easy",
                status: "Completed",
              },
              {
                level: "Medium",
                status: "Current",
              },
              {
                level: "Hard",
                status: "Next",
              },
              {
                level: "Expert",
                status: "Locked",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <h3 className="text-xl font-bold">

                  {item.level}

                </h3>

                <span className="inline-block mt-5 px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-semibold">

                  {item.status}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* AI Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Improvement Suggestions

          </h2>

          <div className="space-y-4 text-white/90 leading-8">

            <p>

              • Explain the reasoning behind every design decision.

            </p>

            <p>

              • Mention trade-offs between different approaches.

            </p>

            <p>

              • Support answers with practical project examples.

            </p>

            <p>

              • Practice optimization-related follow-up questions.

            </p>

            <p>

              • Be prepared to discuss edge cases and scalability.

            </p>

          </div>

        </div>

        {/* Recommended Resources */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Recommended Learning Resources

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "System Design Primer",
              "LeetCode Top Interview Questions",
              "Behavioral Interview Guide",
              "High Scalability Articles",
            ].map((resource, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 flex justify-between items-center"
              >

                <span className="font-semibold">

                  {resource}

                </span>

                <button className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold">

                  View

                </button>

              </div>

            ))}

          </div>

        </div>
                {/* AI Interview Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Interview Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your responses demonstrate a solid understanding of
            core interview concepts. AI identified strengths in
            technical accuracy and communication while suggesting
            deeper explanations for design decisions, scalability,
            and optimization.

            Continue practicing contextual follow-up questions to
            improve consistency and confidence in real interviews.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Think Beyond the First Answer 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Great interviewers don't stop after one answer.
                Practice explaining your reasoning, defending
                your decisions, and discussing trade-offs to
                build confidence for real technical interviews.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🤖

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Readiness Score

              </h3>

              <p className="text-5xl font-black">

                91%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default FollowUpQuestionGenerator;