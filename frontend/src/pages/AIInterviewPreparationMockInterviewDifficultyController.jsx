import React, { useState } from "react";
import {
  Brain,
  Gauge,
  TrendingUp,
  TrendingDown,
  Target,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

const questions = [
  {
    number: 1,
    difficulty: "Medium",
    topic: "Data Structures",
    score: 86,
    outcome: "Strong",
    action: "Increase Difficulty",
    feedback:
      "Strong explanation and correct data-structure selection. The next question should introduce an additional constraint.",
  },
  {
    number: 2,
    difficulty: "Hard",
    topic: "Algorithms",
    score: 74,
    outcome: "Good",
    action: "Maintain Difficulty",
    feedback:
      "The candidate handled the main problem correctly but needed more guidance around complexity.",
  },
  {
    number: 3,
    difficulty: "Hard",
    topic: "System Design",
    score: 48,
    outcome: "Weak",
    action: "Reinforce",
    feedback:
      "The candidate struggled with scalability and should receive a targeted reinforcement question.",
  },
  {
    number: 4,
    difficulty: "Medium",
    topic: "System Design",
    score: 79,
    outcome: "Improved",
    action: "Increase Difficulty",
    feedback:
      "The reinforcement question improved understanding. The controller can gradually increase challenge again.",
  },
];

const difficultyLevels = [
  {
    level: "Easy",
    description: "Core concepts and direct questions",
  },
  {
    level: "Medium",
    description: "Multi-step reasoning and moderate constraints",
  },
  {
    level: "Hard",
    description: "Complex constraints and deeper follow-ups",
  },
  {
    level: "Expert",
    description: "Ambiguous requirements and advanced trade-offs",
  },
];

export default function AIInterviewPreparationMockInterviewDifficultyController() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentDifficulty, setCurrentDifficulty] = useState("Hard");
  const [showHistory, setShowHistory] = useState(false);
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState("");

  const averageScore = Math.round(
    questions.reduce((sum, q) => sum + q.score, 0) /
      questions.length
  );

  const strongAnswers = questions.filter(
    (q) => q.score >= 75
  ).length;

  const weakAnswers = questions.filter(
    (q) => q.score < 60
  ).length;

  const increaseDifficulty = () => {
    const order = ["Easy", "Medium", "Hard", "Expert"];
    const index = order.indexOf(currentDifficulty);

    if (index < order.length - 1) {
      setCurrentDifficulty(order[index + 1]);
    }
  };

  const decreaseDifficulty = () => {
    const order = ["Easy", "Medium", "Hard", "Expert"];
    const index = order.indexOf(currentDifficulty);

    if (index > 0) {
      setCurrentDifficulty(order[index - 1]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Mock Interview Difficulty Controller
          </h1>

          <p className="text-gray-500">
            Dynamically adjust interview difficulty based on candidate
            performance throughout the session.
          </p>
        </div>

      </div>

      {/* Adaptive Status */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-5 items-center">

          <div className="w-24 h-24 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-xs text-gray-500">
                LEVEL
              </p>

              <p className="font-black text-indigo-700">
                {currentDifficulty}
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              ADAPTIVE INTERVIEW MODE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Difficulty: {currentDifficulty}
            </h2>

            <p className="text-gray-600 mt-2">
              The AI is continuously evaluating answer quality and adjusting
              question difficulty to maintain an appropriate challenge.
            </p>

          </div>

        </div>

      </div>

      {/* Session Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <MessageSquare
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Questions
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {questions.length}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <Target
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Average Score
            </p>

            <p className="text-3xl font-black text-green-600">
              {averageScore}%
            </p>

          </div>

          <div className="bg-blue-50 rounded-xl p-5">

            <TrendingUp
              className="text-blue-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Strong Answers
            </p>

            <p className="text-3xl font-black text-blue-600">
              {strongAnswers}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <TrendingDown
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Weak Answers
            </p>

            <p className="text-3xl font-black text-red-600">
              {weakAnswers}
            </p>

          </div>

        </div>

      </div>

      {/* Difficulty Levels */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Gauge className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Difficulty Levels
            </h2>

            <p className="text-sm text-gray-500">
              The controller can move between levels according to performance.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          {difficultyLevels.map((level) => (

            <div
              key={level.level}
              className={`border rounded-xl p-5 ${
                currentDifficulty === level.level
                  ? "border-indigo-500 bg-indigo-50"
                  : ""
              }`}
            >

              <div className="flex items-center justify-between">

                <h3 className="font-bold">
                  {level.level}
                </h3>

                {currentDifficulty === level.level && (
                  <CheckCircle2
                    className="text-indigo-600"
                    size={20}
                  />
                )}

              </div>

              <p className="text-sm text-gray-500 mt-2">
                {level.description}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Performance History */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Adaptive Performance History
              </h2>

              <p className="text-sm text-gray-500">
                See how answer quality influenced the next question.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showHistory ? "Hide History" : "Show History"}
          </button>

        </div>

        {showHistory && (
          <div className="space-y-4 mt-6">

            {questions.map((question) => (

              <button
                type="button"
                key={question.number}
                onClick={() => setSelectedQuestion(question)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedQuestion?.number === question.number
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {question.number}
                  </div>

                  <div className="flex-1">

                    <h3 className="font-bold">
                      {question.topic}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Difficulty: {question.difficulty}
                    </p>

                  </div>

                  <div className="text-center">

                    <p className="text-xs text-gray-500">
                      Score
                    </p>

                    <p className="font-black">
                      {question.score}%
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      question.action === "Increase Difficulty"
                        ? "bg-green-100 text-green-700"
                        : question.action === "Reinforce"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {question.action}
                  </span>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Question */}
      {selectedQuestion && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-4">

            {selectedQuestion.action === "Reinforce" ? (
              <AlertTriangle
                className="text-orange-600"
                size={30}
              />
            ) : (
              <CheckCircle2
                className="text-green-600"
                size={30}
              />
            )}

            <div>

              <p className="text-xs font-bold text-indigo-600">
                ADAPTIVE DECISION
              </p>

              <h2 className="text-xl font-bold text-indigo-800 mt-1">
                Question {selectedQuestion.number}:{" "}
                {selectedQuestion.action}
              </h2>

              <p className="text-gray-600 mt-2">
                {selectedQuestion.feedback}
              </p>

              <div className="bg-white rounded-xl p-5 mt-5">

                <p className="text-xs font-bold text-indigo-600">
                  CONTROLLER LOGIC
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {selectedQuestion.score >= 75
                    ? "Strong performance detected. Increase complexity or add a deeper follow-up."
                    : selectedQuestion.score < 60
                    ? "Weak performance detected. Reduce difficulty and reinforce the underlying concept."
                    : "Performance is within the target range. Maintain the current difficulty."}
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Adaptive Logic */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Adaptive Difficulty Logic
            </h2>

            <p className="text-sm text-gray-500">
              The AI changes the interview based on performance signals.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="border rounded-2xl p-5">

            <TrendingUp
              className="text-green-600"
              size={26}
            />

            <h3 className="font-bold mt-3">
              Strong Response
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Increase question complexity, introduce additional constraints,
              or ask deeper technical follow-ups.
            </p>

          </div>

          <div className="border rounded-2xl p-5">

            <Target
              className="text-blue-600"
              size={26}
            />

            <h3 className="font-bold mt-3">
              Average Response
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Maintain the current challenge level and test another aspect of
              the same competency.
            </p>

          </div>

          <div className="border rounded-2xl p-5">

            <TrendingDown
              className="text-orange-600"
              size={26}
            />

            <h3 className="font-bold mt-3">
              Weak Response
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Introduce reinforcement questions and provide targeted practice
              before returning to harder questions.
            </p>

          </div>

        </div>

      </div>

      {/* Live Controller */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <p className="text-xs font-bold text-indigo-600">
              LIVE DIFFICULTY CONTROLLER
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Current Level: {currentDifficulty}
            </h2>

            <p className="text-gray-600 mt-2">
              Use the controls to simulate how the AI adapts difficulty during
              an interview.
            </p>

          </div>

          <Gauge
            className="text-indigo-600"
            size={50}
          />

        </div>

        <div className="flex gap-3 mt-6">

          <button
            type="button"
            onClick={decreaseDifficulty}
            className="px-5 py-3 rounded-xl bg-white border font-semibold flex items-center gap-2"
          >
            <TrendingDown size={18} />
            Reduce Difficulty
          </button>

          <button
            type="button"
            onClick={increaseDifficulty}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
          >
            <TrendingUp size={18} />
            Increase Difficulty
          </button>

        </div>

      </div>

      {/* Mock Interview */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <MessageSquare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Adaptive Mock Interview
            </h2>

            <p className="text-sm text-gray-500">
              Answer the current question and let the controller decide what
              comes next.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-6">

          <p className="text-xs font-bold text-gray-500">
            CURRENT QUESTION
          </p>

          <h3 className="text-lg font-bold mt-2">
            Design a URL shortening service that can handle increasing traffic.
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Difficulty:{" "}
            <strong>{currentDifficulty}</strong>
          </p>

        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Explain your approach..."
          className="w-full mt-5 min-h-[150px] border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setStarted(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Submit Answer
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Controller Result */}
      {started && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                AI CONTROLLER RESPONSE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Answer received. Difficulty will adapt based on performance.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can send the answer to the AI
                evaluator, calculate answer quality, and dynamically select the
                next question difficulty.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Adaptive Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Adaptive Interview Flow
            </h2>

            <p className="text-sm text-gray-500">
              Difficulty changes continuously throughout the simulation.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Ask Question",
            "Analyze Answer",
            "Measure Performance",
            "Adjust Difficulty",
            "Select Follow-up",
            "Continue Interview",
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

      {/* Final Guidance */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI COACHING PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Stay challenged without becoming overwhelmed.
            </h2>

            <p className="text-gray-600 mt-2">
              The goal is not to make every question harder. The controller
              should increase difficulty when performance demonstrates
              readiness and temporarily reinforce concepts when performance
              indicates a gap.
            </p>

          </div>

        </div>

      </div>

      {/* Reset */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => {
            setCurrentDifficulty("Hard");
            setSelectedQuestion(null);
            setSelectedQuestion(null);
            setShowHistory(false);
            setStarted(false);
            setAnswer("");
          }}
          className="px-5 py-3 rounded-xl border font-semibold flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Reset Simulation
        </button>

      </div>

    </div>
  );
}