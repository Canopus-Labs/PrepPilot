import React, { useState } from "react";
import {
  Brain,
  Target,
  MessageSquareText,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Search,
  TrendingUp,
} from "lucide-react";

const AIInterviewQuestionIntentAnalyzer = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const stats = {
    intentScore: 91,
    skillsDetected: 4,
    conceptsDetected: 6,
    strategyScore: 88,
  };

  const questions = [
    {
      title: "Tell me about a challenging project you worked on.",
      category: "Behavioral",
      type: "Experience & Problem Solving",
    },
    {
      title: "Why did you choose this approach to solve the problem?",
      category: "Technical",
      type: "Reasoning & Decision Making",
    },
    {
      title: "Why should we hire you?",
      category: "HR",
      type: "Self-Evaluation",
    },
  ];

  const intentData = [
    {
      title: "Primary Intent",
      value: "Evaluate problem-solving ability",
      description:
        "The interviewer wants to understand how you approach challenges, make decisions, and handle difficult situations.",
      icon: <Target size={24} />,
    },
    {
      title: "Skill Being Evaluated",
      value: "Problem Solving",
      description:
        "The question evaluates your ability to identify problems, develop solutions, and explain the decisions you made.",
      icon: <Brain size={24} />,
    },
    {
      title: "Expected Reasoning",
      value: "Situation → Action → Result",
      description:
        "A strong response should explain the challenge, your specific actions, and the outcome.",
      icon: <TrendingUp size={24} />,
    },
  ];

  const concepts = [
    "Problem identification",
    "Decision making",
    "Technical reasoning",
    "Communication",
    "Ownership",
    "Learning from challenges",
  ];

  const getCategoryClasses = (category) => {
    if (category === "Behavioral") {
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    }

    if (category === "Technical") {
      return "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400";
    }

    return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
            <Search
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Question Intent Analyzer
            </h1>

            <p className="text-gray-500 mt-2">
              Understand what interviewers are actually evaluating behind
              each interview question and learn how to answer strategically.
            </p>

          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Intent Confidence
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.intentScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Skills Detected
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.skillsDetected}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Concepts Detected
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.conceptsDetected}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Sparkles
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Strategy Score
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.strategyScore}%
            </p>

          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-3xl font-bold">
              AI Question Intent Analysis
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            Interview questions often have a deeper purpose than their
            literal wording. The AI identifies the competency being
            evaluated, the reasoning an interviewer expects, important
            concepts to mention, and the best strategy for constructing
            your response.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquareText className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {questions.map((question, index) => (

              <button
                key={index}
                onClick={() => setSelectedQuestion(index)}
                className={`text-left rounded-2xl border p-6 transition ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${getCategoryClasses(
                    question.category
                  )}`}
                >
                  {question.category}
                </span>

                <h3 className="font-bold text-lg mt-4">
                  {question.title}
                </h3>

                <p className="text-gray-500 mt-3">
                  {question.type}
                </p>

              </button>

            ))}

          </div>

        </div>

        {/* Interview Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <p className="text-sm text-gray-500">
            Interview Question
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {questions[selectedQuestion].title}
          </h2>

          <div className="flex flex-wrap gap-3 mt-6">

            <span
              className={`px-4 py-2 rounded-full ${getCategoryClasses(
                questions[selectedQuestion].category
              )}`}
            >
              {questions[selectedQuestion].category}
            </span>

            <span className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              {questions[selectedQuestion].type}
            </span>

          </div>

        </div>

        {/* Primary Intent */}

        <div className="mt-10 grid lg:grid-cols-3 gap-6">

          {intentData.map((item, index) => (

            <div
              key={index}
              className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
            >

              <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                {item.icon}
              </div>

              <p className="text-sm text-gray-500 mt-5">
                {item.title}
              </p>

              <h3 className="text-xl font-bold mt-2">
                {item.value}
              </h3>

              <p className="text-gray-500 mt-4 leading-7">
                {item.description}
              </p>

            </div>

          ))}

        </div>

        {/* Intent Confidence */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3">

                <Sparkles className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Intent Confidence
                </h2>

              </div>

              <p className="text-gray-500 mt-4 leading-7 max-w-2xl">
                The AI is highly confident that this question is primarily
                evaluating your problem-solving ability, ownership,
                decision-making, and ability to communicate the outcome of
                a challenging experience.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {stats.intentScore}%
              </p>

              <p className="text-gray-500 mt-2">
                High Confidence
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: `${stats.intentScore}%`,
              }}
            />

          </div>

        </div>

        {/* Important Concepts */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Important Concepts to Address
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {concepts.map((concept, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    size={22}
                    className="text-green-600"
                  />

                  <span className="font-semibold">
                    {concept}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Expected Reasoning */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Expected Interviewer Reasoning
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                step: "01",
                title: "Situation",
                description:
                  "Did you understand the challenge and explain the context clearly?",
              },
              {
                step: "02",
                title: "Action",
                description:
                  "Did you personally take meaningful actions to solve the problem?",
              },
              {
                step: "03",
                title: "Result",
                description:
                  "Can you explain the outcome, learning, and impact of your actions?",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <span className="text-sm font-bold text-violet-600">
                  {item.step}
                </span>

                <h3 className="text-xl font-bold mt-3">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>
                {/* Common Mistakes */}

        <div className="mt-10 bg-orange-50 dark:bg-orange-900/10 rounded-3xl border border-orange-200 dark:border-orange-900/30 p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Common Mistakes to Avoid
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                title: "Answering Only the Literal Question",
                description:
                  "Candidates may describe what happened without explaining the skills or decisions demonstrated by the experience.",
              },
              {
                title: "Using Generic Examples",
                description:
                  "Avoid vague statements that do not provide evidence of your actual skills or experience.",
              },
              {
                title: "Not Explaining Your Role",
                description:
                  "Clearly distinguish your own contribution from what the overall team accomplished.",
              },
              {
                title: "Skipping the Result",
                description:
                  "Always explain the outcome, impact, or lesson learned from the situation.",
              },
              {
                title: "Overexplaining Background",
                description:
                  "Keep the context concise and spend more time explaining your actions and reasoning.",
              },
              {
                title: "Ignoring the Evaluated Skill",
                description:
                  "Make sure your answer demonstrates the competency the interviewer is trying to assess.",
              },
            ].map((mistake, index) => (

              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-[#111827] p-6"
              >

                <div className="flex items-start gap-4">

                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">

                    <AlertTriangle
                      size={20}
                      className="text-orange-500"
                    />

                  </div>

                  <div>

                    <h3 className="font-bold">
                      {mistake.title}
                    </h3>

                    <p className="text-gray-500 mt-2 leading-6">
                      {mistake.description}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Recommended Answer Strategy */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Recommended Answer Strategy
            </h2>

          </div>

          <div className="space-y-5">

            {[
              {
                number: "01",
                title: "Identify the Competency",
                description:
                  "Before answering, recognize that the interviewer is evaluating problem-solving, ownership, decision-making, or another specific competency.",
              },
              {
                number: "02",
                title: "Choose a Relevant Experience",
                description:
                  "Select a real project, internship, academic experience, or challenge that directly demonstrates the required skill.",
              },
              {
                number: "03",
                title: "Explain Your Actions",
                description:
                  "Focus on what you personally did, why you made those decisions, and how you approached the problem.",
              },
              {
                number: "04",
                title: "Show the Result",
                description:
                  "End with the outcome, measurable impact, or important lesson you gained from the experience.",
              },
            ].map((strategy, index) => (

              <div
                key={index}
                className="flex items-start gap-5 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 text-violet-600 flex items-center justify-center font-black shrink-0">
                  {strategy.number}
                </div>

                <div>

                  <h3 className="text-lg font-bold">
                    {strategy.title}
                  </h3>

                  <p className="text-gray-500 mt-2 leading-7">
                    {strategy.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Interviewer Expectations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Brain size={30} />

            <h2 className="text-3xl font-bold">
              What Is the Interviewer Looking For?
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                title: "Ownership",
                description:
                  "Did you take responsibility for solving the problem?",
              },
              {
                title: "Reasoning",
                description:
                  "Can you explain why you made particular decisions?",
              },
              {
                title: "Communication",
                description:
                  "Can you explain the situation clearly and concisely?",
              },
              {
                title: "Learning",
                description:
                  "Can you identify what you learned from the experience?",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl bg-white/10 p-6"
              >

                <h3 className="text-lg font-bold">
                  {item.title}
                </h3>

                <p className="text-white/80 mt-3 leading-6">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Question Intent Breakdown */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Question Intent Breakdown
            </h2>

          </div>

          <div className="space-y-6">

            {[
              ["Problem-Solving Ability", 94],
              ["Decision Making", 91],
              ["Technical Reasoning", 87],
              ["Communication", 85],
              ["Ownership", 92],
              ["Learning Ability", 81],
            ].map(([label, value], index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span>
                    {label}
                  </span>

                  <span className="font-bold">
                    {value}%
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Answering Recommendations
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Start with a concise description of the challenge rather than giving unnecessary background.",
              "Use a real experience that demonstrates the competency being evaluated.",
              "Use 'I' when describing your individual contribution and decisions.",
              "Explain why you selected your approach instead of only describing what you did.",
              "Include a measurable result whenever possible.",
              "Finish by explaining what the experience taught you.",
            ].map((recommendation, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex items-start gap-3">

                  <Sparkles
                    size={21}
                    className="text-violet-600 shrink-0"
                  />

                  <p className="leading-7">
                    {recommendation}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Answering Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Interview Intent Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: "🎯",
                title: "Identify Intent",
                description:
                  "Understand what competency the interviewer is testing.",
              },
              {
                icon: "🧠",
                title: "Show Reasoning",
                description:
                  "Explain your thinking and decision-making process.",
              },
              {
                icon: "💬",
                title: "Communicate Clearly",
                description:
                  "Keep your answer structured and easy to follow.",
              },
              {
                icon: "🏆",
                title: "Show Evidence",
                description:
                  "Support your claims with real experiences and results.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {item.icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Strategic Answer Preview */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquareText className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Strategic Answer Preview
            </h2>

          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-7">

            <p className="leading-8">

              <strong>Situation:</strong> "During a smart irrigation
              project, we needed to combine sensor readings with weather
              information to make reliable irrigation decisions."

              <br />
              <br />

              <strong>Action:</strong> "I worked on integrating the ESP32,
              sensors, and weather API. One challenge was making sure the
              system could handle different inputs reliably, so I tested
              the components individually before integrating them."

              <br />
              <br />

              <strong>Reasoning:</strong> "I chose this approach because
              separating the components made it easier to identify
              failures and debug the system."

              <br />
              <br />

              <strong>Result:</strong> "This gave me practical experience
              in debugging, system integration, and solving problems
              involving both hardware and software."

            </p>

          </div>

        </div>

        {/* Strategy Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Strategic Answering Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your understanding of the question's underlying intent is
                strong. Focus on explicitly connecting your experience,
                reasoning, and results to the competency being evaluated.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {stats.strategyScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Strong Strategy
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: `${stats.strategyScore}%`,
              }}
            />

          </div>

        </div>

        {/* Final AI Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Do not focus only on answering what the interviewer
                literally asked. Think about why they asked it. Identify
                the competency being evaluated, choose relevant evidence,
                explain your reasoning, and finish with a meaningful
                result or lesson.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🧠
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Intent Confidence
              </h3>

              <p className="text-5xl font-black">
                {stats.intentScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionIntentAnalyzer;