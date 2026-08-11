import React, { useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  MessageSquare,
  Code2,
  Lightbulb,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Target,
  TrendingUp,
  Clock3,
  Award,
  Play,
  Mic,
  Zap,
} from "lucide-react";

const AIInterviewSessionWarmUpMode = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [activeTab, setActiveTab] = useState("warmup");
  const [answers, setAnswers] = useState({});
  const [analyzing, setAnalyzing] = useState(false);
  const [started, setStarted] = useState(false);

  const exercises = [
    {
      type: "Technical",
      title: "Easy Technical Question",
      icon: Code2,
      color: "blue",
      question: "What is the purpose of a variable in programming?",
      prompt:
        "Give a short explanation in your own words. Focus on the core idea rather than trying to give a perfect interview answer.",
      placeholder:
        "A variable is used to store a value that can be...",
      targetTime: "60 sec",
      skill: "Technical Knowledge",
      difficulty: "Easy",
    },
    {
      type: "Reasoning",
      title: "Quick Reasoning Exercise",
      icon: Lightbulb,
      color: "yellow",
      question:
        "If an algorithm processes 10 items in 1 second, what would you expect if the input becomes 20 items for an O(n) algorithm?",
      prompt:
        "Think aloud briefly and explain how the input size affects the expected processing time.",
      placeholder:
        "Since the algorithm is O(n), doubling the input would...",
      targetTime: "45 sec",
      skill: "Logical Reasoning",
      difficulty: "Easy",
    },
    {
      type: "Communication",
      title: "Communication Exercise",
      icon: MessageSquare,
      color: "green",
      question:
        "Explain a technical concept you know as if you were explaining it to a non-technical interviewer.",
      prompt:
        "Choose one concept and explain it clearly using simple language and one practical example.",
      placeholder:
        "The concept I would explain is...",
      targetTime: "60 sec",
      skill: "Communication",
      difficulty: "Easy",
    },
    {
      type: "Project",
      title: "Project-Related Question",
      icon: Briefcase,
      color: "violet",
      question:
        "Tell me about one project you worked on and the main problem it solved.",
      prompt:
        "Keep your response concise. Mention the problem, your contribution, and the result.",
      placeholder:
        "One project I worked on was...",
      targetTime: "90 sec",
      skill: "Project Communication",
      difficulty: "Easy",
    },
    {
      type: "Confidence",
      title: "Confidence Preparation",
      icon: ShieldCheck,
      color: "indigo",
      question:
        "What is one thing you want to remember during today's interview?",
      prompt:
        "Write one short statement that will help you stay calm, honest, and focused.",
      placeholder:
        "During the interview, I will remember to...",
      targetTime: "30 sec",
      skill: "Interview Confidence",
      difficulty: "Warm-up",
    },
  ];

  const readinessFactors = [
    {
      label: "Technical Readiness",
      score: 84,
      icon: Code2,
    },
    {
      label: "Reasoning Readiness",
      score: 79,
      icon: Lightbulb,
    },
    {
      label: "Communication",
      score: 87,
      icon: MessageSquare,
    },
    {
      label: "Confidence",
      score: 82,
      icon: ShieldCheck,
    },
  ];

  const current = exercises[currentExercise];
  const CurrentIcon = current.icon;

  const completedCount = Object.keys(answers).length;

  const readinessScore = useMemo(() => {
    if (completedCount === 0) return 0;

    const baseScore = Math.round(
      readinessFactors.reduce(
        (sum, factor) => sum + factor.score,
        0
      ) / readinessFactors.length
    );

    const completionBonus = Math.round(
      (completedCount / exercises.length) * 8
    );

    return Math.min(baseScore + completionBonus, 100);
  }, [completedCount]);

  const handleAnswerChange = (value) => {
    setAnswers((previous) => ({
      ...previous,
      [currentExercise]: value,
    }));
  };

  const handleStartWarmup = () => {
    setStarted(true);
    setActiveTab("warmup");
    setCurrentExercise(0);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
    }, 700);
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise((previous) => previous + 1);
    } else {
      setActiveTab("readiness");
    }
  };

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise((previous) => previous - 1);
    }
  };

  const getReadinessLabel = (score) => {
    if (score >= 90) return "Interview Ready";
    if (score >= 80) return "Almost Ready";
    if (score >= 65) return "Building Readiness";
    return "Needs Warm-Up";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Zap size={34} className="text-violet-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Session Warm-Up Mode
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Complete a short preparation routine to activate your
              technical skills, reasoning, communication, and confidence
              before starting a mock interview.
            </p>
          </div>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Warm-Up Duration
            </p>

            <p className="text-4xl font-black mt-3">
              4-5 min
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Exercises
            </p>

            <p className="text-5xl font-black mt-3">
              {exercises.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Completed
            </p>

            <p className="text-5xl font-black mt-3">
              {completedCount}/{exercises.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Readiness
            </p>

            <p className="text-5xl font-black mt-3">
              {readinessScore}%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Warm-Up Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            A short warm-up helps you transition from everyday thinking
            into interview mode. These exercises are intentionally easy
            and focused so you can activate your skills without feeling
            like you are starting another full practice session.
          </p>

        </div>

        {/* Start Section */}

        {!started && (
          <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8 sm:p-10">

            <div className="max-w-3xl mx-auto text-center">

              <div className="w-20 h-20 rounded-3xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center mx-auto">

                <Play
                  size={38}
                  className="text-violet-600 ml-1"
                />

              </div>

              <h2 className="text-3xl font-bold mt-7">
                Ready for a Quick Warm-Up?
              </h2>

              <p className="text-gray-500 mt-4 leading-7">
                Complete five short exercises before your mock interview.
                The goal is not to score perfectly. The goal is to get
                comfortable, activate your thinking, and prepare yourself
                for the interview.
              </p>

              <div className="grid sm:grid-cols-3 gap-5 mt-8">

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <Clock3 className="mx-auto text-blue-600" />

                  <p className="font-bold mt-3">
                    4-5 Minutes
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Keep it short
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <Target className="mx-auto text-violet-600" />

                  <p className="font-bold mt-3">
                    5 Exercises
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Focused preparation
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <ShieldCheck className="mx-auto text-green-600" />

                  <p className="font-bold mt-3">
                    Build Confidence
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Start calmly
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={handleStartWarmup}
                className="mt-9 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-violet-600 text-white font-bold text-lg hover:bg-violet-700 transition"
              >
                <Play size={22} />
                Start Warm-Up
              </button>

            </div>

          </div>
        )}

        {/* Warm-Up */}

        {started && activeTab === "warmup" && (
          <div className="mt-10">

            {/* Progress */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

              <div className="flex flex-col sm:flex-row justify-between gap-4">

                <div>

                  <p className="text-sm text-gray-500">
                    Warm-Up Progress
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    Exercise {currentExercise + 1} of{" "}
                    {exercises.length}
                  </h2>

                </div>

                <div className="text-right">

                  <p className="text-sm text-gray-500">
                    Estimated Time
                  </p>

                  <p className="font-bold mt-2">
                    {current.targetTime}
                  </p>

                </div>

              </div>

              <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-6 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 transition-all"
                  style={{
                    width: `${
                      ((currentExercise + 1) /
                        exercises.length) *
                      100
                    }%`,
                  }}
                />

              </div>

              <div className="grid grid-cols-5 gap-2 mt-6">

                {exercises.map((exercise, index) => (

                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentExercise(index)}
                    className={`h-2 rounded-full transition ${
                      answers[index]
                        ? "bg-green-500"
                        : index === currentExercise
                        ? "bg-violet-600"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                    aria-label={`Exercise ${index + 1}`}
                  />

                ))}

              </div>

            </div>

            {/* Exercise Card */}

            <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7 sm:p-9">

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                    <CurrentIcon
                      size={28}
                      className="text-violet-600"
                    />

                  </div>

                  <div>

                    <span className="text-sm text-violet-600 font-semibold">
                      {current.type}
                    </span>

                    <h2 className="text-2xl font-bold mt-1">
                      {current.title}
                    </h2>

                  </div>

                </div>

                <div className="flex flex-wrap gap-2">

                  <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">
                    {current.difficulty}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm">
                    {current.targetTime}
                  </span>

                </div>

              </div>

              <div className="mt-8 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-7">

                <p className="text-sm text-violet-600 font-semibold">
                  Your Exercise
                </p>

                <h3 className="text-2xl font-bold mt-3 leading-8">
                  {current.question}
                </h3>

                <p className="text-gray-500 mt-4 leading-7">
                  {current.prompt}
                </p>

              </div>

              <div className="mt-7">

                <label className="flex items-center gap-2 font-bold mb-3">

                  <Mic
                    size={20}
                    className="text-violet-600"
                  />

                  Your Response

                </label>

                <textarea
                  value={answers[currentExercise] || ""}
                  onChange={(event) =>
                    handleAnswerChange(event.target.value)
                  }
                  placeholder={current.placeholder}
                  rows={6}
                  className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 p-5 outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />

              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-7">

                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentExercise === 0}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10 font-semibold disabled:opacity-40"
                >
                  <ArrowLeft size={18} />
                  Previous
                </button>

                <div className="flex flex-col sm:flex-row gap-3">

                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={
                      analyzing ||
                      !(answers[currentExercise] || "").trim()
                    }
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold disabled:opacity-40"
                  >

                    {analyzing ? (
                      <>
                        <RefreshCw
                          size={18}
                          className="animate-spin"
                        />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Quick AI Feedback
                      </>
                    )}

                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition"
                  >

                    {currentExercise ===
                    exercises.length - 1
                      ? "Finish Warm-Up"
                      : "Next Exercise"}

                    <ArrowRight size={18} />

                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Readiness */}

        {started && activeTab === "readiness" && (
          <div className="mt-10">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7 sm:p-9">

              <div className="text-center max-w-3xl mx-auto">

                <div className="w-20 h-20 rounded-3xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto">

                  <CheckCircle2
                    size={42}
                    className="text-green-600"
                  />

                </div>

                <h2 className="text-3xl font-bold mt-6">
                  Warm-Up Complete
                </h2>

                <p className="text-gray-500 mt-3 leading-7">
                  You have completed your pre-interview warm-up. Review
                  your readiness summary before starting the mock
                  interview.
                </p>

                <div className="mt-8">

                  <p className="text-7xl font-black text-violet-600">
                    {readinessScore}%
                  </p>

                  <p className="text-gray-500 mt-2">
                    {getReadinessLabel(readinessScore)}
                  </p>

                </div>

                <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 mt-7 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-green-500"
                    style={{
                      width: `${readinessScore}%`,
                    }}
                  />

                </div>

              </div>

              {/* Factors */}

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

                {readinessFactors.map((factor) => {

                  const Icon = factor.icon;

                  return (
                    <div
                      key={factor.label}
                      className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center"
                    >

                      <Icon
                        className="mx-auto text-violet-600"
                        size={28}
                      />

                      <p className="font-semibold mt-4">
                        {factor.label}
                      </p>

                      <p className="text-4xl font-black text-violet-600 mt-3">
                        {factor.score}%
                      </p>

                      <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                        <div
                          className="h-full bg-violet-600 rounded-full"
                          style={{
                            width: `${factor.score}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                })}

              </div>

              {/* Completed Exercises */}

              <div className="mt-10">

                <h3 className="text-xl font-bold mb-5">
                  Completed Warm-Up Exercises
                </h3>

                <div className="space-y-3">

                  {exercises.map((exercise, index) => {

                    const Icon = exercise.icon;

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">

                            <Icon
                              size={22}
                              className="text-green-600"
                            />

                          </div>

                          <div>

                            <p className="font-bold">
                              {exercise.title}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                              {exercise.skill}
                            </p>

                          </div>

                        </div>

                        <CheckCircle2
                          className="text-green-600 shrink-0"
                          size={25}
                        />

                      </div>
                    );
                  })}

                </div>

              </div>

              {/* Start Mock */}

              <div className="mt-10 rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white text-center">

                <div className="flex justify-center">
                  <Award size={38} />
                </div>

                <h3 className="text-2xl font-bold mt-4">
                  You're Ready to Begin
                </h3>

                <p className="text-white/80 mt-3 max-w-2xl mx-auto leading-7">
                  Take a breath, stay honest, and explain your reasoning
                  clearly. Your mock interview can now begin.
                </p>

                <button
                  type="button"
                  onClick={() => setActiveTab("mock")}
                  className="mt-7 inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition"
                >
                  <Play size={21} />
                  Start Mock Interview
                  <ArrowRight size={19} />
                </button>

              </div>

            </div>

          </div>
        )}

        {/* Mock Interview Transition */}

        {started && activeTab === "mock" && (
          <div className="mt-10">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8 sm:p-10 text-center">

              <div className="w-24 h-24 rounded-3xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto">

                <Mic
                  size={46}
                  className="text-green-600"
                />

              </div>

              <h2 className="text-3xl font-bold mt-7">
                Mock Interview Ready
              </h2>

              <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-7">
                Your warm-up is complete. You have activated your
                technical knowledge, reasoning, communication, and
                confidence. The full mock interview can now begin.
              </p>

              <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto mt-9">

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <CheckCircle2
                    className="mx-auto text-green-600"
                    size={26}
                  />

                  <p className="font-bold mt-3">
                    Skills Activated
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <ShieldCheck
                    className="mx-auto text-green-600"
                    size={26}
                  />

                  <p className="font-bold mt-3">
                    Confidence Ready
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <Target
                    className="mx-auto text-green-600"
                    size={26}
                  />

                  <p className="font-bold mt-3">
                    Interview Focused
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-violet-600 text-white font-bold text-lg hover:bg-violet-700 transition"
              >
                <Play size={22} />
                Enter Mock Interview
                <ArrowRight size={20} />
              </button>

              <p className="text-sm text-gray-500 mt-5">
                Connect this button to your existing mock interview flow.
              </p>

            </div>

          </div>
        )}

        {/* Warm-Up Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Warm-Up Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Activate Your Thinking
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Start with simple questions to transition your mind into
                problem-solving mode.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                💬
              </p>

              <h3 className="text-xl font-bold mt-4">
                Practice Communication
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Practice explaining your ideas clearly before facing more
                challenging interview questions.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Build Confidence
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                The goal is preparation, not perfection. Enter the mock
                interview calmly and confidently.
              </p>

            </div>

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Personalized Warm-Up Recommendation
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Before the Interview
              </p>

              <h3 className="text-xl font-bold mt-2">
                Start Simple
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Begin with an easy technical question to activate your
                knowledge without creating unnecessary pressure.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                During Warm-Up
              </p>

              <h3 className="text-xl font-bold mt-2">
                Think Aloud
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Practice explaining your reasoning naturally instead of
                trying to memorize perfect answers.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Before Starting
              </p>

              <h3 className="text-xl font-bold mt-2">
                Stay Honest
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                If you do not know something, explain your reasoning and
                describe how you would find the answer.
              </p>

            </div>

          </div>

        </div>

        {/* Final Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                A short warm-up can make the transition into a mock
                interview smoother. Focus on clear communication,
                structured reasoning, and honest answers rather than
                trying to perform perfectly. Use the warm-up to become
                comfortable, then carry that mindset into the full
                interview.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Readiness
              </h3>

              <p className="text-5xl font-black">
                {readinessScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewSessionWarmUpMode;