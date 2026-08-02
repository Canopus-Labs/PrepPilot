import React, { useState } from "react";
import {
  Brain,
  MessageSquare,
  Target,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const BehavioralCoach = () => {
  const questions = [
    "Tell me about yourself.",
    "Describe a time you handled conflict in your team.",
    "Tell me about a difficult project you completed.",
    "Describe a situation where you showed leadership.",
    "Tell me about a time you failed and what you learned.",
    "Describe a time when you worked under pressure.",
    "Tell me about a time you solved a difficult problem.",
    "Describe a situation where you disagreed with your manager.",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeAnswer = async () => {
    if (!answer.trim()) return;

    setLoading(true);

    try {
      const res = await axiosInstance.post(
        API_PATHS.BEHAVIORAL.ANALYZE,
        {
          question: currentQuestion,
          answer,
        }
      );

      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    const random =
      questions[Math.floor(Math.random() * questions.length)];

    setCurrentQuestion(random);
    setAnswer("");
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-4 mb-10">

          <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
            <Brain className="text-violet-600" size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Behavioral Interview Coach
            </h1>

            <p className="text-gray-500 mt-1">
              Practice behavioral interviews using the STAR framework.
            </p>
          </div>

        </div>

        <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 shadow">

          <div className="flex items-center gap-3 mb-5">

            <MessageSquare
              className="text-violet-500"
              size={22}
            />

            <h2 className="text-xl font-semibold">
              Interview Question
            </h2>

          </div>

          <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-5 mb-6">

            <p className="text-lg font-medium">
              {currentQuestion}
            </p>

          </div>

          <textarea
            rows={8}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] p-4 outline-none"
          />

          <div className="flex gap-4 mt-6">

            <button
              onClick={analyzeAnswer}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700"
            >
              {loading ? "Analyzing..." : "Analyze Answer"}
            </button>

            <button
              onClick={nextQuestion}
              className="px-6 py-3 rounded-xl border border-gray-300"
            >
              Next Question
            </button>

          </div>
          {analysis && (
            <div className="mt-10 space-y-8">

              {/* Score */}
              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

                <div className="flex items-center gap-3 mb-5">
                  <Target className="text-violet-600" size={24} />
                  <h2 className="text-2xl font-bold">
                    Overall Score
                  </h2>
                </div>

                <div className="text-6xl font-black text-violet-600">
                  {analysis.score}%
                </div>

              </div>

              {/* STAR Analysis */}

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

                <h2 className="text-2xl font-bold mb-6">
                  STAR Framework Analysis
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                  <div className="p-5 rounded-xl bg-violet-50 dark:bg-violet-900/20">
                    <h3 className="font-bold mb-2">
                      Situation
                    </h3>

                    <p>{analysis.star.Situation}</p>
                  </div>

                  <div className="p-5 rounded-xl bg-violet-50 dark:bg-violet-900/20">
                    <h3 className="font-bold mb-2">
                      Task
                    </h3>

                    <p>{analysis.star.Task}</p>
                  </div>

                  <div className="p-5 rounded-xl bg-violet-50 dark:bg-violet-900/20">
                    <h3 className="font-bold mb-2">
                      Action
                    </h3>

                    <p>{analysis.star.Action}</p>
                  </div>

                  <div className="p-5 rounded-xl bg-violet-50 dark:bg-violet-900/20">
                    <h3 className="font-bold mb-2">
                      Result
                    </h3>

                    <p>{analysis.star.Result}</p>
                  </div>

                </div>

              </div>

              {/* Communication */}

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

                <h2 className="text-2xl font-bold mb-5">
                  Communication Quality
                </h2>

                <p className="text-gray-700 dark:text-gray-300">
                  {analysis.communication}
                </p>

              </div>
              {/* Strengths & Weak Areas */}

              <div className="grid md:grid-cols-2 gap-6">

                {/* Strengths */}

                <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

                  <div className="flex items-center gap-3 mb-5">
                    <CheckCircle2 className="text-green-500" size={22} />
                    <h2 className="text-xl font-bold">
                      Strengths
                    </h2>
                  </div>

                  <div className="space-y-4">

                    {analysis.strengths?.map((item, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-green-500 mt-1"
                        />

                        <p>{item}</p>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Weak Areas */}

                <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

                  <div className="flex items-center gap-3 mb-5">
                    <AlertTriangle
                      className="text-yellow-500"
                      size={22}
                    />

                    <h2 className="text-xl font-bold">
                      Weak Areas
                    </h2>

                  </div>

                  <div className="space-y-4">

                    {analysis.weaknesses?.map((item, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <AlertTriangle
                          size={18}
                          className="text-yellow-500 mt-1"
                        />

                        <p>{item}</p>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

              {/* Suggestions */}

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

                <div className="flex items-center gap-3 mb-6">

                  <Sparkles
                    className="text-violet-500"
                    size={22}
                  />

                  <h2 className="text-2xl font-bold">
                    AI Suggestions
                  </h2>

                </div>

                <div className="space-y-4">

                  {analysis.suggestions?.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <Sparkles
                        size={18}
                        className="text-violet-500 mt-1"
                      />

                      <p>{item}</p>

                    </div>

                  ))}

                </div>

              </div>
              {/* Follow-up Question */}

              <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg">

                <h2 className="text-2xl font-bold mb-4">
                  AI Follow-up Question
                </h2>

                <p className="text-lg leading-relaxed">
                  {analysis.followUpQuestion}
                </p>

              </div>

            </div>
          )}

        </div> {/* End Question Card */}

      </div> {/* End max-w-6xl */}

    </div> /* End Page */ 



  );
};

export default BehavioralCoach;