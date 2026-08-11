import React, { useState } from "react";
import {
  Sparkles,
  MessageSquare,
  Brain,
  FileText,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
} from "lucide-react";

const InterviewAnswerImprovement = () => {

  const [answer, setAnswer] = useState(`A binary search works by checking the middle element of a sorted array. If the element is greater than the target we search the left side, otherwise we search the right side until the element is found.`);

  const [stats] = useState({
    quality: 84,
    communication: 88,
    technical: 91,
    improvement: 18,
  });

  const [weakSentences] = useState([
    {
      sentence: "A binary search works by checking the middle element.",
      issue: "Needs a stronger technical explanation.",
    },
    {
      sentence: "We search the left side otherwise the right side.",
      issue: "Can be more concise and structured.",
    },
    {
      sentence: "Until the element is found.",
      issue: "Missing termination condition explanation.",
    },
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Sparkles
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Interview Answer Improvement

            </h1>

            <p className="text-gray-500 mt-2">

              Receive detailed AI suggestions to improve
              interview answers with better clarity,
              technical depth, and communication.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Quality Score

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.quality}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <MessageSquare
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Communication

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.communication}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Technical

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.technical}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Sparkles
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Improvement

            </h3>

            <p className="text-5xl font-black mt-3">

              +{stats.improvement}%

            </p>

          </div>

        </div>

        {/* Answer */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <FileText className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Your Interview Answer

            </h2>

          </div>

          <textarea
            rows={8}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full rounded-2xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-5"
          />

          <button className="mt-6 px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold">

            Analyze Answer

          </button>

        </div>

        {/* Quality Score */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Answer Quality Score

          </h2>

          <div className="flex flex-col lg:flex-row justify-between items-center">

            <div>

              <p className="text-white/90">

                Overall Answer Quality

              </p>

              <h1 className="text-7xl font-black mt-4">

                84%

              </h1>

            </div>

            <div className="text-center">

              <div className="text-7xl">

                ✨

              </div>

              <p className="mt-4 text-xl font-bold">

                Good Answer

              </p>

            </div>

          </div>

        </div>

        {/* Weak Sentences */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-orange-500" />

            <h2 className="text-2xl font-bold">

              Weak Sentence Analysis

            </h2>

          </div>

          <div className="space-y-6">

            {weakSentences.map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <p className="font-semibold">

                  {item.sentence}

                </p>

                <p className="text-orange-500 mt-3">

                  {item.issue}

                </p>

              </div>

            ))}

          </div>

        </div>
                {/* Technical Suggestions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-blue-600" />

            <h2 className="text-2xl font-bold">

              Technical Improvement Suggestions

            </h2>

          </div>

          <ul className="space-y-4">

            <li>✅ Explain that Binary Search requires a sorted array.</li>

            <li>✅ Mention the O(log n) time complexity.</li>

            <li>✅ Describe the role of low, high, and mid pointers.</li>

            <li>✅ Explain the termination condition when the element is absent.</li>

            <li>✅ Mention why Binary Search is faster than Linear Search.</li>

          </ul>

        </div>

        {/* Missing Concepts */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Missing Concepts

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Sorted array requirement",
              "Time Complexity O(log n)",
              "Space Complexity O(1)",
              "Edge cases",
              "Termination condition",
              "Advantages over Linear Search",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 flex items-center gap-3"
              >

                <CheckCircle2 className="text-green-600" />

                <span>{item}</span>

              </div>

            ))}

          </div>

        </div>

        {/* Improved Answer */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Improved Sample Answer

          </h2>

          <div className="bg-white/10 rounded-2xl p-6 leading-8">

            Binary Search is an efficient searching algorithm that
            works only on sorted arrays. It repeatedly compares the
            target element with the middle element and eliminates half
            of the remaining search space after each comparison.
            If the target is smaller than the middle element, the
            search continues in the left half; otherwise, it searches
            the right half. This process repeats until the element is
            found or the search interval becomes empty. Binary Search
            has a time complexity of <strong>O(log n)</strong> and a
            space complexity of <strong>O(1)</strong>, making it much
            faster than Linear Search for large sorted datasets.

          </div>

        </div>

        {/* Why Better */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Why the Improved Answer is Better

          </h2>

          <ul className="space-y-4">

            <li>✔ Uses stronger technical terminology.</li>

            <li>✔ Explains the algorithm step-by-step.</li>

            <li>✔ Includes complexity analysis.</li>

            <li>✔ Covers important edge conditions.</li>

            <li>✔ Provides a complete interview-quality explanation.</li>

          </ul>

        </div>

        {/* Communication */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Communication Score

          </h2>

          {[
            ["Clarity", 90],
            ["Technical Accuracy", 91],
            ["Conciseness", 86],
            ["Structure", 88],
            ["Confidence", 89],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Improve Every Answer 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Great interview answers are built through continuous
                practice and feedback. Learn from every suggestion,
                strengthen your explanations, and communicate your
                technical knowledge with confidence.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                💡

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Answer Score

              </h3>

              <p className="text-5xl font-black">

                84%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default InterviewAnswerImprovement;