import React, { useState } from "react";
import {
  Brain,
  Target,
  UserRound,
  Code2,
  MessageSquare,
  FolderKanban,
  Mic2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const questionBank = [
  {
    type: "Technical",
    question: "Explain the difference between an array and a linked list.",
    focus: "Data Structures",
    difficulty: "Medium",
  },
  {
    type: "Coding",
    question: "How would you optimize a solution that currently runs in O(n²)?",
    focus: "Optimization",
    difficulty: "Hard",
  },
  {
    type: "Project",
    question:
      "Describe one important technical decision you made in a recent project.",
    focus: "Project Experience",
    difficulty: "Medium",
  },
  {
    type: "Behavioral",
    question:
      "Tell me about a time when you had to solve a difficult technical problem.",
    focus: "Problem Solving",
    difficulty: "Medium",
  },
];

const profile = {
  role: "Software Engineer",
  experience: "Entry Level",
  strengths: ["DSA", "Technical Knowledge"],
  weaknesses: ["Communication", "System Design"],
  projects: ["Smart Irrigation System", "AI Interview Platform"],
};

export default function AIInterviewPreparationInterviewSimulationPersonalizer() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState("");

  const question = questionBank[currentQuestion];

  const startSimulation = () => {
    setStarted(true);
  };

  const submitAnswer = () => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: answer,
    }));

    setAnswer("");

    if (currentQuestion === questionBank.length - 1) {
      setCompleted(true);
    } else {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const restartSimulation = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setAnswer("");
    setCompleted(false);
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
            AI Interview Simulation Personalizer
          </h1>

          <p className="text-gray-500">
            Experience a mock interview adapted to your role, skills,
            weaknesses, and previous preparation.
          </p>

        </div>

      </div>

      {!started && (
        <>
          {/* Personalization Profile */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Sparkles className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Personalization Profile
                </h2>

                <p className="text-sm text-gray-500">
                  The simulation will use this information to select questions
                  and follow-ups.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <div className="border rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <Target className="text-indigo-600" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Target Role
                    </p>

                    <p className="font-bold">
                      {profile.role}
                    </p>

                  </div>

                </div>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <UserRound className="text-purple-600" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Experience Level
                    </p>

                    <p className="font-bold">
                      {profile.experience}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Strengths and Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-green-50 rounded-2xl p-6">

              <div className="flex items-center gap-3">

                <CheckCircle2 className="text-green-600" />

                <h2 className="font-bold text-green-700">
                  Strengths
                </h2>

              </div>

              <div className="flex flex-wrap gap-2 mt-4">

                {profile.strengths.map((skill) => (

                  <span
                    key={skill}
                    className="px-3 py-2 rounded-full bg-white text-green-700 text-sm font-semibold"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

            <div className="bg-orange-50 rounded-2xl p-6">

              <div className="flex items-center gap-3">

                <Target className="text-orange-600" />

                <h2 className="font-bold text-orange-700">
                  Weak Areas
                </h2>

              </div>

              <div className="flex flex-wrap gap-2 mt-4">

                {profile.weaknesses.map((skill) => (

                  <span
                    key={skill}
                    className="px-3 py-2 rounded-full bg-white text-orange-700 text-sm font-semibold"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

          </div>

          {/* Personalization Factors */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Brain className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Personalization Factors
                </h2>

                <p className="text-sm text-gray-500">
                  AI considers multiple signals before and during the
                  simulation.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <Target className="text-indigo-600" />

                <h3 className="font-bold mt-3">
                  Target Role
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Questions are aligned with expected responsibilities and
                  skills.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Code2 className="text-purple-600" />

                <h3 className="font-bold mt-3">
                  Skill Profile
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Strong and weak concepts influence question selection.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Mic2 className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Previous Performance
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Previous mock interview results influence difficulty and
                  follow-ups.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <MessageSquare className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Weak Areas
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  AI intentionally includes questions that exercise identified
                  weaknesses.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <FolderKanban className="text-pink-600" />

                <h3 className="font-bold mt-3">
                  Project Background
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Project-specific questions are generated from the candidate's
                  experience.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Brain className="text-cyan-600" />

                <h3 className="font-bold mt-3">
                  Dynamic Follow-ups
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Follow-up questions adapt to each answer instead of following
                  a fixed script.
                </p>

              </div>

            </div>

          </div>

          {/* Projects */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <FolderKanban className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Project Context
                </h2>

                <p className="text-sm text-gray-500">
                  The AI may use these projects to create personalized
                  interview questions.
                </p>

              </div>

            </div>

            <div className="flex flex-wrap gap-3 mt-5">

              {profile.projects.map((project) => (

                <span
                  key={project}
                  className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold"
                >
                  {project}
                </span>

              ))}

            </div>

          </div>

          {/* Start */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex items-center gap-4">

              <div className="p-4 bg-white rounded-2xl">

                <Mic2
                  className="text-indigo-600"
                  size={34}
                />

              </div>

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700 text-xl">
                  Personalized Mock Interview Ready
                </h2>

                <p className="text-gray-600 mt-1">
                  AI will dynamically select questions and adjust follow-ups
                  based on your responses.
                </p>

              </div>

              <button
                type="button"
                onClick={startSimulation}
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
              >
                Start Interview
                <ArrowRight size={18} />
              </button>

            </div>

          </div>
        </>
      )}

      {started && !completed && (
        <>
          {/* Progress */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Personalized Interview
                </p>

                <h2 className="font-bold text-lg">
                  Question {currentQuestion + 1} of{" "}
                  {questionBank.length}
                </h2>

              </div>

              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 h-fit text-sm font-semibold">
                {question.type}
              </span>

            </div>

            <div className="h-3 bg-gray-200 rounded-full mt-5">

              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{
                  width: `${
                    ((currentQuestion + 1) /
                      questionBank.length) *
                    100
                  }%`,
                }}
              />

            </div>

          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Brain className="text-indigo-600" />

              <div>

                <p className="text-xs text-gray-500">
                  AI Selected Question
                </p>

                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                  {question.difficulty}
                </span>

              </div>

            </div>

            <h2 className="text-2xl font-bold mt-5">
              {question.question}
            </h2>

            <div className="flex gap-2 mt-4">

              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                Focus: {question.focus}
              </span>

              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                Personalized
              </span>

            </div>

            <textarea
              rows={9}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Answer as you would during a real interview..."
              className="w-full border rounded-xl p-4 mt-6 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              disabled={!answer.trim()}
              onClick={submitAnswer}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              Submit Answer
              <ArrowRight size={18} />
            </button>

          </div>

          {/* Dynamic AI Context */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Sparkles
                className="text-indigo-600"
                size={25}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  Dynamic Simulation
                </h2>

                <p className="text-gray-600 mt-2">
                  After you submit your answer, AI can adjust the next question
                  based on your performance. A weak response may trigger a
                  reinforcement question, while a strong response can lead to a
                  deeper follow-up.
                </p>

              </div>

            </div>

          </div>
        </>
      )}

      {completed && (
        <>
          {/* Completion */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-white rounded-2xl">

                <CheckCircle2
                  className="text-green-600"
                  size={42}
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Simulation Complete
                </p>

                <h2 className="text-3xl font-black text-green-700">
                  Personalized Interview Finished
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answers have been collected for personalized interview
                  analysis.
                </p>

              </div>

            </div>

          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Simulation Summary
                </h2>

                <p className="text-sm text-gray-500">
                  Overview of the personalized interview.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">

              <div className="bg-indigo-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Questions
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  {questionBank.length}
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Answered
                </p>

                <p className="text-3xl font-black text-green-600">
                  {Object.keys(answers).length}
                </p>

              </div>

              <div className="bg-orange-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Weak Areas Tested
                </p>

                <p className="text-3xl font-black text-orange-600">
                  2
                </p>

              </div>

              <div className="bg-purple-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Personalization
                </p>

                <p className="text-xl font-black text-purple-600 mt-2">
                  High
                </p>

              </div>

            </div>

          </div>

          {/* Personalized Insights */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Brain className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Personalized Insights
                </h2>

                <p className="text-sm text-gray-500">
                  Recommended focus areas based on the simulation.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              <div className="border rounded-xl p-5">

                <div className="flex gap-3">

                  <MessageSquare className="text-orange-600" />

                  <div>

                    <h3 className="font-bold">
                      Improve Technical Communication
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Practice explaining technical decisions with clearer
                      structure and concrete examples.
                    </p>

                  </div>

                </div>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex gap-3">

                  <Target className="text-purple-600" />

                  <div>

                    <h3 className="font-bold">
                      Practice System Design
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Include more architecture and scalability questions in
                      upcoming simulations.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Why Personalized */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Sparkles
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  Why This Simulation Was Personalized
                </h2>

                <div className="space-y-2 mt-3 text-gray-600">

                  <p>
                    • Questions matched your target Software Engineer role.
                  </p>

                  <p>
                    • Difficulty was selected for your entry-level experience.
                  </p>

                  <p>
                    • Communication and system-design weaknesses were included.
                  </p>

                  <p>
                    • Project questions were based on your project background.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Restart */}
          <div className="bg-white rounded-2xl shadow p-6 text-center">

            <button
              type="button"
              onClick={restartSimulation}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Start Another Personalized Interview
            </button>

          </div>
        </>
      )}

    </div>
  );
}