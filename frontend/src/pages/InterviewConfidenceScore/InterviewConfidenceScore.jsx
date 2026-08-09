import React, { useState } from "react";
import {
  ShieldCheck,
  Brain,
  Mic,
  CheckCircle2,
  MessageSquare,
  BarChart3,
  Award,
} from "lucide-react";

const InterviewConfidenceScore = () => {

  const [stats] = useState({
    confidence: 91,
    interviews: 24,
    improvement: 18,
    readiness: 94,
  });

  const [analysis] = useState([
    {
      title: "Answer Completeness",
      score: 92,
    },
    {
      title: "Communication Quality",
      score: 89,
    },
    {
      title: "Technical Accuracy",
      score: 94,
    },
    {
      title: "Response Structure",
      score: 87,
    },
    {
      title: "Speaking Clarity",
      score: 90,
    },
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <ShieldCheck
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Interview Confidence Score

            </h1>

            <p className="text-gray-500 mt-2">

              Measure your interview confidence using AI-powered
              communication and technical analysis.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ShieldCheck
              size={30}
              className="mx-auto text-violet-600"
            />

            <h3 className="mt-4 text-gray-500">

              Confidence

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.confidence}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Award
              size={30}
              className="mx-auto text-yellow-500"
            />

            <h3 className="mt-4 text-gray-500">

              Interviews

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.interviews}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Improvement

            </h3>

            <p className="text-5xl font-black mt-3">

              +{stats.improvement}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Readiness

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.readiness}%

            </p>

          </div>

        </div>

        {/* Overall Confidence */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Overall Confidence Score

          </h2>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

            <div>

              <p className="text-lg leading-8 text-white/90">

                Based on your latest mock interview,
                AI estimates that your confidence level is

              </p>

              <h1 className="text-7xl font-black mt-6">

                91%

              </h1>

            </div>

            <div className="text-center">

              <div className="text-7xl">

                🎤

              </div>

              <p className="mt-5 font-bold text-xl">

                Excellent Performance

              </p>

            </div>

          </div>

        </div>

        {/* Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Interview Analysis

          </h2>

          {analysis.map((item, index) => (

            <div
              key={index}
              className="mb-8"
            >

              <div className="flex justify-between mb-2">

                <span className="font-semibold">

                  {item.title}

                </span>

                <span>

                  {item.score}%

                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

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

        {/* Communication */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <Mic className="text-green-600" />

              <h2 className="text-2xl font-bold">

                Communication Quality

              </h2>

            </div>

            <ul className="space-y-4 text-gray-600 dark:text-gray-300">

              <li>✅ Clear pronunciation</li>
              <li>✅ Confident speaking pace</li>
              <li>✅ Good explanation flow</li>
              <li>⚠ Add more examples while answering</li>

            </ul>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <CheckCircle2 className="text-blue-600" />

              <h2 className="text-2xl font-bold">

                Technical Accuracy

              </h2>

            </div>

            <ul className="space-y-4 text-gray-600 dark:text-gray-300">

              <li>✅ Correct algorithm explanation</li>
              <li>✅ Proper complexity analysis</li>
              <li>✅ Good problem-solving approach</li>
              <li>⚠ Explain trade-offs more clearly</li>

            </ul>

          </div>

        </div>

        {/* Response Structure */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <MessageSquare className="text-orange-500" />

            <h2 className="text-2xl font-bold">

              Response Structure

            </h2>

          </div>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            AI detected that your answers generally follow a logical
            sequence. To improve further, begin with a concise summary,
            explain your approach step by step, discuss complexity,
            and conclude with edge cases or possible optimizations.

          </p>

        </div>
                {/* Confidence Trend */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Confidence Trend

          </h2>

          {[
            ["Interview 1", 72],
            ["Interview 2", 78],
            ["Interview 3", 84],
            ["Interview 4", 88],
            ["Latest Interview", 91],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Strengths & Weaknesses */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold text-green-600 mb-6">

              Strengths

            </h2>

            <ul className="space-y-4">

              <li>✅ Excellent technical knowledge</li>

              <li>✅ Strong communication skills</li>

              <li>✅ Clear problem-solving approach</li>

              <li>✅ Good confidence while answering</li>

              <li>✅ Effective explanation of algorithms</li>

            </ul>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold text-red-500 mb-6">

              Improvement Areas

            </h2>

            <ul className="space-y-4">

              <li>• Add more real-world examples</li>

              <li>• Discuss trade-offs more clearly</li>

              <li>• Improve response conclusion</li>

              <li>• Reduce filler words</li>

              <li>• Increase eye contact during interviews</li>

            </ul>

          </div>

        </div>

        {/* AI Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Improvement Suggestions

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Structure every answer using the STAR method when appropriate.</li>

            <li>• Begin answers with a short summary before explaining details.</li>

            <li>• Support technical explanations with practical examples.</li>

            <li>• Maintain a consistent speaking pace and confident tone.</li>

            <li>• End answers with key takeaways or optimization ideas.</li>

          </ul>

        </div>

        {/* Interview Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Interview Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your latest mock interview demonstrated strong
            technical knowledge, clear communication, and
            logical thinking. AI estimates your confidence
            score at <strong>91%</strong>, indicating excellent
            interview readiness. Continue refining your
            communication with more examples and structured
            conclusions to achieve even higher performance.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Confidence Builds Success 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Strong interview performance is a combination
                of technical knowledge, communication, and
                confidence. Keep practicing consistently and
                use AI feedback to improve after every mock
                interview.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🏆

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Confidence Index

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

export default InterviewConfidenceScore;