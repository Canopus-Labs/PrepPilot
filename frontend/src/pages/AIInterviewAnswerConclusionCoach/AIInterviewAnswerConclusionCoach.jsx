import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  MessageSquare,
  BarChart3,
  Flag,
  ListChecks,
  TrendingUp,
} from "lucide-react";

const AIInterviewAnswerConclusionCoach = () => {
  const [answer, setAnswer] = useState(
    "I would use a hash map to store the values we have already seen. This allows us to check whether the required value exists in constant time. We can iterate through the array once and store each value as we process it."
  );

  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("analysis");

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("analysis");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
              <Flag size={34} className="text-indigo-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Answer Conclusion Coach
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Improve how you finish interview answers with concise,
                confident, and question-focused conclusions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing || !answer.trim()}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Analyzing Conclusion...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Conclusion
              </>
            )}
          </button>

        </div>

        {/* Hero */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Finish Strong
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            A strong interview answer should not simply stop after the
            explanation. AI checks whether you answered the original question,
            identifies missing conclusions, and suggests a concise closing
            statement.
          </p>

        </div>

        {/* Answer Input */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-6">

            <MessageSquare className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Your Interview Answer
            </h2>

          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5 mb-5">

            <p className="text-sm text-gray-500 font-semibold">
              Interview Question
            </p>

            <p className="mt-2 font-semibold leading-7">
              "How would you solve the Two Sum problem and what is the
              complexity of your solution?"
            </p>

          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={8}
            placeholder="Paste your interview answer here..."
            className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-7"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5">

            <p className="text-sm text-gray-500">
              AI focuses specifically on how your answer ends.
            </p>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing || !answer.trim()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              <Sparkles size={18} />
              Improve Conclusion
            </button>

          </div>

        </div>

        {/* Score Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target className="text-indigo-600" size={30} />

            <p className="text-gray-500 mt-4">
              Conclusion Score
            </p>

            <p className="text-5xl font-black text-indigo-600 mt-2">
              61%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <CheckCircle2 className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Question Coverage
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              82%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Flag className="text-orange-600" size={30} />

            <p className="text-gray-500 mt-4">
              Closing Clarity
            </p>

            <p className="text-5xl font-black text-orange-600 mt-2">
              54%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <TrendingUp className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Answer Completeness
            </p>

            <p className="text-5xl font-black text-blue-600 mt-2">
              76%
            </p>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Conclusion Analysis"],
            ["comparison", "Before vs After"],
            ["structures", "Closing Structures"],
            ["tips", "AI Coaching Tips"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <Brain className="text-indigo-600" size={30} />

                    <h2 className="text-2xl font-bold">
                      AI Conclusion Analysis
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-5 max-w-3xl leading-7">
                    Your explanation covers most of the requested approach, but
                    it ends without explicitly summarizing the solution or
                    stating its time and space complexity.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-7xl font-black text-orange-600">
                    61%
                  </p>

                  <p className="text-gray-500 mt-2">
                    Conclusion Quality
                  </p>

                </div>

              </div>

            </div>

            {/* Issues */}

            <div className="grid lg:grid-cols-3 gap-6">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">

                  <AlertTriangle
                    size={28}
                    className="text-red-600"
                  />

                </div>

                <h3 className="text-xl font-bold mt-6">
                  Missing Conclusion
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  The response stops after explaining the implementation
                  without giving a final summary.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">

                  <BarChart3
                    size={28}
                    className="text-orange-600"
                  />

                </div>

                <h3 className="text-xl font-bold mt-6">
                  Complexity Missing
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  The question asks for complexity, but the answer does not
                  explicitly state time or space complexity.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">

                  <Target
                    size={28}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="text-xl font-bold mt-6">
                  Final Answer Needed
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  End with a short statement that connects the approach back
                  to the original question.
                </p>

              </div>

            </div>

            {/* Coverage */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <ListChecks className="text-indigo-600" />

                <h2 className="text-2xl font-bold">
                  Question Coverage
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  ["Problem understanding", true],
                  ["Chosen approach", true],
                  ["Implementation idea", true],
                  ["Time complexity", false],
                  ["Space complexity", false],
                  ["Final summary", false],
                ].map(([item, completed]) => (

                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl bg-gray-50 dark:bg-gray-800 p-5"
                  >

                    <div className="flex items-center gap-3">

                      {completed ? (
                        <CheckCircle2
                          size={22}
                          className="text-green-600"
                        />
                      ) : (
                        <AlertTriangle
                          size={22}
                          className="text-orange-600"
                        />
                      )}

                      <span className="font-semibold">
                        {item}
                      </span>

                    </div>

                    <span
                      className={`text-sm font-bold ${
                        completed
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {completed ? "Covered" : "Missing"}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* Recommended Conclusion */}

            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-6">

                <CheckCircle2 size={30} />

                <h2 className="text-3xl font-bold">
                  AI Recommended Conclusion
                </h2>

              </div>

              <p className="text-lg leading-8 text-white/95">
                "So overall, I would use a hash map to solve Two Sum in O(n)
                time by storing previously seen values and checking for the
                required complement. The additional space complexity is O(n)."
              </p>

              <div className="flex flex-wrap gap-3 mt-7">

                <span className="px-4 py-2 rounded-full bg-white/15 font-semibold">
                  Complete
                </span>

                <span className="px-4 py-2 rounded-full bg-white/15 font-semibold">
                  Concise
                </span>

                <span className="px-4 py-2 rounded-full bg-white/15 font-semibold">
                  Technical
                </span>

                <span className="px-4 py-2 rounded-full bg-white/15 font-semibold">
                  Confident
                </span>

              </div>

            </div>

          </div>
        )}

        {/* Comparison */}

        {activeTab === "comparison" && (
          <div className="mt-6 space-y-8">

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center justify-between mb-7">

                  <h2 className="text-2xl font-bold">
                    Original Ending
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 text-sm font-bold">
                    61%
                  </span>

                </div>

                <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 p-6">

                  <p className="text-gray-700 dark:text-gray-300 leading-8">
                    "We can iterate through the array once and store each value
                    as we process it."
                  </p>

                </div>

                <div className="mt-6 space-y-3">

                  {[
                    "Ends without a summary",
                    "Does not state complexity",
                    "Does not explicitly answer the full question",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3 text-red-600"
                    >
                      <AlertTriangle size={18} />
                      <span>{item}</span>
                    </div>

                  ))}

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center justify-between mb-7">

                  <h2 className="text-2xl font-bold">
                    Improved Ending
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm font-bold">
                    95%
                  </span>

                </div>

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-6">

                  <p className="text-gray-700 dark:text-gray-300 leading-8">
                    "So overall, I would use a hash map to solve Two Sum in
                    O(n) time, with O(n) additional space."
                  </p>

                </div>

                <div className="mt-6 space-y-3">

                  {[
                    "Summarizes the solution",
                    "Answers the complexity requirement",
                    "Ends with a confident statement",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3 text-green-600"
                    >
                      <CheckCircle2 size={18} />
                      <span>{item}</span>
                    </div>

                  ))}

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3">

                <TrendingUp className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Improvement
                </h2>

              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 mt-7">

                <div className="text-center">

                  <p className="text-gray-500">
                    Original
                  </p>

                  <p className="text-5xl font-black text-orange-600 mt-2">
                    61%
                  </p>

                </div>

                <ArrowRight
                  size={35}
                  className="text-gray-400"
                />

                <div className="text-center">

                  <p className="text-gray-500">
                    Improved
                  </p>

                  <p className="text-5xl font-black text-green-600 mt-2">
                    95%
                  </p>

                </div>

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 px-6 py-4">

                  <p className="text-green-700 dark:text-green-400 font-bold">
                    +34% Conclusion Quality
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Structures */}

        {activeTab === "structures" && (
          <div className="mt-6">

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {[
                {
                  title: "Summary + Complexity",
                  description:
                    "Summarize the solution and finish with time and space complexity.",
                  example:
                    "Overall, this approach solves the problem in O(n) time and O(n) space.",
                },
                {
                  title: "Answer + Reason",
                  description:
                    "Restate your answer and briefly reinforce why it is appropriate.",
                  example:
                    "Therefore, I would choose this approach because it provides the required performance while keeping the implementation simple.",
                },
                {
                  title: "Trade-Off Conclusion",
                  description:
                    "Useful when an interviewer asks you to compare multiple approaches.",
                  example:
                    "Although the alternative uses less memory, I would choose the hash-map approach because its faster lookup time is more important here.",
                },
                {
                  title: "System Design Summary",
                  description:
                    "Summarize the architecture and mention the most important scalability decision.",
                  example:
                    "In summary, the load balancer, stateless services, cache, and database provide a scalable foundation for the expected traffic.",
                },
                {
                  title: "Behavioral Conclusion",
                  description:
                    "End with the result and what you learned from the experience.",
                  example:
                    "The project was delivered successfully, and I learned to communicate technical disagreements earlier with the team.",
                },
                {
                  title: "Decision Conclusion",
                  description:
                    "Clearly state the final decision after discussing alternatives.",
                  example:
                    "Given these constraints, I would use PostgreSQL because consistency is more important than horizontal write scalability.",
                },
              ].map((structure) => (

                <div
                  key={structure.title}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">

                    <Lightbulb
                      size={28}
                      className="text-indigo-600"
                    />

                  </div>

                  <h3 className="text-xl font-bold mt-6">
                    {structure.title}
                  </h3>

                  <p className="text-gray-500 mt-3 leading-7">
                    {structure.description}
                  </p>

                  <div className="mt-5 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                    <p className="text-sm font-bold text-indigo-600">
                      Example
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 mt-2 leading-7">
                      "{structure.example}"
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* Coaching Tips */}

        {activeTab === "tips" && (
          <div className="mt-6 space-y-6">

            {[
              {
                title: "Always Close the Loop",
                description:
                  "Return to the original question before ending your answer so the interviewer knows you addressed the requirement.",
                priority: "High",
              },
              {
                title: "Mention Complexity",
                description:
                  "For algorithm and coding questions, explicitly state time and space complexity when relevant.",
                priority: "High",
              },
              {
                title: "Keep It Concise",
                description:
                  "A conclusion should reinforce the important point rather than introduce another long explanation.",
                priority: "Medium",
              },
              {
                title: "Use Confident Language",
                description:
                  "Finish with a clear statement such as 'Therefore, I would choose...' instead of simply stopping.",
                priority: "Medium",
              },
            ].map((tip, index) => (

              <div
                key={tip.title}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
              >

                <div className="flex flex-col sm:flex-row gap-5">

                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">

                    <span className="font-black text-indigo-600">
                      {index + 1}
                    </span>

                  </div>

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-xl font-bold">
                        {tip.title}
                      </h3>

                      <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 text-xs font-bold">
                        {tip.priority}
                      </span>

                    </div>

                    <p className="text-gray-500 mt-3 leading-7">
                      {tip.description}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* How It Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              How AI Conclusion Coaching Works
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Analyze",
                "AI reads the complete response and original interview question.",
              ],
              [
                "2",
                "Check",
                "Determines whether the response actually answers the question.",
              ],
              [
                "3",
                "Detect",
                "Finds missing conclusions, unfinished explanations, and missing details.",
              ],
              [
                "4",
                "Improve",
                "Generates a concise and confident closing statement.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black">
                  {number}
                </div>

                <h3 className="font-bold text-lg mt-5">
                  {title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Benefits */}

        <div className="mt-10 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 size={30} />

            <h2 className="text-3xl font-bold">
              Benefits
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              [
                "🎯",
                "Complete Answers",
                "Ensures responses address the original interview question.",
              ],
              [
                "🧩",
                "Better Structure",
                "Creates a clear beginning, explanation, and conclusion.",
              ],
              [
                "💪",
                "Confident Finish",
                "Helps candidates finish their answers without abrupt endings.",
              ],
              [
                "✨",
                "Clear Communication",
                "Makes technical explanations easier for interviewers to follow.",
              ],
            ].map(([icon, title, description]) => (

              <div
                key={title}
                className="rounded-2xl bg-white/10 p-6"
              >

                <div className="text-4xl">
                  {icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {title}
                </h3>

                <p className="text-white/80 mt-3 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Final Recommendation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Recommendation
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your explanation is mostly complete, but the ending should
                explicitly summarize the solution and answer the complexity
                requirement. Finish with a concise statement covering the
                approach, time complexity, and space complexity.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🏁
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Conclusion Quality
              </h3>

              <p className="text-5xl font-black">
                61%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerConclusionCoach;