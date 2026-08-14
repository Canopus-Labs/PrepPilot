import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Users,
  MessageSquare,
  Clock,
  Target,
  Zap,
  Code2,
  Database,
  HeartHandshake,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  RefreshCw,
} from "lucide-react";

const personas = [
  {
    id: "friendly",
    name: "Friendly Interviewer",
    icon: HeartHandshake,
    color: "green",
    description:
      "Supportive and conversational interviewer who helps candidates feel comfortable.",
    style: "Supportive",
    pacing: "Relaxed",
    followUps: "Moderate",
    example:
      "That's a good start. Can you walk me through why you chose that approach?",
  },
  {
    id: "strict",
    name: "Strict Technical",
    icon: ShieldCheck,
    color: "red",
    description:
      "Direct interviewer who challenges assumptions and expects precise technical explanations.",
    style: "Challenging",
    pacing: "Moderate",
    followUps: "High",
    example:
      "You mentioned scalability. What specifically changes when the system reaches 10 million users?",
  },
  {
    id: "rapid",
    name: "Rapid-Fire",
    icon: Zap,
    color: "orange",
    description:
      "Fast-paced interviewer who moves quickly between short technical questions.",
    style: "Fast",
    pacing: "Very Fast",
    followUps: "High",
    example:
      "What's the complexity? Why? What is the alternative? Next question.",
  },
  {
    id: "system",
    name: "System Design",
    icon: Database,
    color: "violet",
    description:
      "Focuses on architecture, scalability, reliability, trade-offs, and system decisions.",
    style: "Analytical",
    pacing: "Moderate",
    followUps: "Very High",
    example:
      "How would your architecture change if traffic increased by 100x?",
  },
  {
    id: "behavioral",
    name: "Behavioral",
    icon: Users,
    color: "blue",
    description:
      "Focuses on experiences, decision-making, teamwork, leadership, and communication.",
    style: "Conversational",
    pacing: "Relaxed",
    followUps: "High",
    example:
      "What did you personally contribute, and what would you do differently?",
  },
];

const performance = [
  {
    persona: "Friendly Interviewer",
    score: 91,
    confidence: 94,
    followUp: 88,
  },
  {
    persona: "Strict Technical",
    score: 76,
    confidence: 71,
    followUp: 68,
  },
  {
    persona: "Rapid-Fire",
    score: 72,
    confidence: 66,
    followUp: 74,
  },
  {
    persona: "System Design",
    score: 84,
    confidence: 79,
    followUp: 91,
  },
  {
    persona: "Behavioral",
    score: 87,
    confidence: 90,
    followUp: 82,
  },
];

const AIInterviewQuestionInterviewerPersonaMode = () => {
  const [selectedPersona, setSelectedPersona] = useState("friendly");
  const [activeTab, setActiveTab] = useState("personas");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  const persona =
    personas.find((item) => item.id === selectedPersona) || personas[0];

  const PersonaIcon = persona.icon;

  const handlePersonaChange = (id) => {
    setIsChanging(true);

    setTimeout(() => {
      setSelectedPersona(id);
      setQuestionIndex(0);
      setAnswer("");
      setIsChanging(false);
    }, 400);
  };

  const startSession = () => {
    setSessionStarted(true);
    setActiveTab("practice");
  };

  const nextQuestion = () => {
    setQuestionIndex((previous) => previous + 1);
    setAnswer("");
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <Users size={34} className="text-violet-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interviewer Persona Mode
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Practice with different interviewer personalities, questioning
                styles, pacing, and follow-up patterns.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={startSession}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
          >
            <Sparkles size={19} />
            Start Persona Interview
          </button>

        </div>

        {/* Banner */}

        <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Meet Different Interviewers
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            Every interviewer has a different style. Practice with supportive,
            strict, rapid-fire, system-design, and behavioral personas to
            become comfortable in unfamiliar interview situations.
          </p>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["personas", "Interviewer Personas"],
            ["practice", "Practice Session"],
            ["analytics", "Performance"],
            ["recommendations", "AI Recommendations"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Persona Selection */}

        {activeTab === "personas" && (
          <div className="mt-6 space-y-8">

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {personas.map((item) => {

                const Icon = item.icon;
                const selected = selectedPersona === item.id;

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handlePersonaChange(item.id)}
                    className={`text-left rounded-3xl p-7 border transition ${
                      selected
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10 shadow-lg"
                        : "border-gray-200 dark:border-white/10 bg-white dark:bg-[#111827] shadow"
                    }`}
                  >

                    <div className="flex items-start justify-between">

                      <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                        <Icon
                          size={29}
                          className="text-violet-600"
                        />

                      </div>

                      {selected && (
                        <CheckCircle2
                          size={24}
                          className="text-violet-600"
                        />
                      )}

                    </div>

                    <h3 className="text-xl font-bold mt-6">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 mt-3 leading-7">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mt-6">

                      <div className="rounded-xl bg-gray-100 dark:bg-gray-800 p-3">

                        <p className="text-xs text-gray-500">
                          Style
                        </p>

                        <p className="text-sm font-bold mt-1">
                          {item.style}
                        </p>

                      </div>

                      <div className="rounded-xl bg-gray-100 dark:bg-gray-800 p-3">

                        <p className="text-xs text-gray-500">
                          Pace
                        </p>

                        <p className="text-sm font-bold mt-1">
                          {item.pacing}
                        </p>

                      </div>

                      <div className="rounded-xl bg-gray-100 dark:bg-gray-800 p-3">

                        <p className="text-xs text-gray-500">
                          Follow-ups
                        </p>

                        <p className="text-sm font-bold mt-1">
                          {item.followUps}
                        </p>

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

            {/* Selected Persona */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-7">

                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                    <PersonaIcon
                      size={32}
                      className="text-violet-600"
                    />

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Selected Persona
                    </p>

                    <h2 className="text-2xl font-bold mt-1">
                      {persona.name}
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={startSession}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
                >
                  Start With This Persona
                  <ChevronRight size={18} />
                </button>

              </div>

              <div className="mt-7 rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-6">

                <p className="text-sm font-bold text-violet-700 dark:text-violet-400">
                  Example Interviewer Response
                </p>

                <p className="text-gray-700 dark:text-gray-300 mt-3 leading-7">
                  "{persona.example}"
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Practice Session */}

        {activeTab === "practice" && (
          <div className="mt-6 space-y-8">

            {isChanging ? (
              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-16 text-center">

                <RefreshCw
                  size={42}
                  className="animate-spin text-violet-600 mx-auto"
                />

                <h2 className="text-2xl font-bold mt-6">
                  Changing Interviewer Persona...
                </h2>

                <p className="text-gray-500 mt-2">
                  Adjusting questioning style and follow-up behavior.
                </p>

              </div>
            ) : (
              <>
                <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7 sm:p-10">

                  <div className="flex flex-col lg:flex-row justify-between gap-8">

                    <div className="max-w-3xl">

                      <div className="flex flex-wrap items-center gap-3">

                        <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300 text-sm font-bold">
                          {persona.name}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 text-sm font-bold">
                          Question {questionIndex + 1}
                        </span>

                      </div>

                      <h2 className="text-3xl font-bold mt-7 leading-tight">
                        {selectedPersona === "system"
                          ? "How would you design a scalable notification system for millions of users?"
                          : selectedPersona === "behavioral"
                          ? "Tell me about a time you disagreed with a teammate and how you handled it."
                          : selectedPersona === "rapid"
                          ? "What is the time complexity of binary search?"
                          : selectedPersona === "strict"
                          ? "Explain why your chosen approach is better than the alternatives."
                          : "Walk me through a technical problem you solved recently."}
                      </h2>

                      <p className="text-gray-500 mt-5 leading-7">
                        The AI interviewer will adapt its next question based
                        on your answer and the selected persona.
                      </p>

                    </div>

                    <div className="text-center shrink-0">

                      <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center mx-auto">

                        <PersonaIcon
                          size={38}
                          className="text-violet-600"
                        />

                      </div>

                      <p className="font-bold mt-4">
                        {persona.name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {persona.style} style
                      </p>

                    </div>

                  </div>

                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={7}
                    placeholder="Type your interview response..."
                    className="w-full mt-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-violet-500 resize-none leading-7"
                  />

                  <div className="flex flex-col sm:flex-row justify-end gap-4 mt-5">

                    <button
                      type="button"
                      onClick={() =>
                        handlePersonaChange(
                          personas[
                            (personas.findIndex(
                              (item) => item.id === selectedPersona
                            ) +
                              1) %
                              personas.length
                          ].id
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10 font-semibold"
                    >
                      <RefreshCw size={18} />
                      Change Persona
                    </button>

                    <button
                      type="button"
                      onClick={nextQuestion}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
                    >
                      Submit Answer
                      <ChevronRight size={18} />
                    </button>

                  </div>

                </div>

                {/* Persona Behavior */}

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                  <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                    <MessageSquare
                      className="text-blue-600"
                      size={30}
                    />

                    <p className="text-gray-500 mt-4">
                      Question Style
                    </p>

                    <p className="text-xl font-black mt-2">
                      {persona.style}
                    </p>

                  </div>

                  <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                    <Clock
                      className="text-orange-600"
                      size={30}
                    />

                    <p className="text-gray-500 mt-4">
                      Pacing
                    </p>

                    <p className="text-xl font-black mt-2">
                      {persona.pacing}
                    </p>

                  </div>

                  <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                    <Target
                      className="text-violet-600"
                      size={30}
                    />

                    <p className="text-gray-500 mt-4">
                      Follow-ups
                    </p>

                    <p className="text-xl font-black mt-2">
                      {persona.followUps}
                    </p>

                  </div>

                  <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                    <Zap
                      className="text-green-600"
                      size={30}
                    />

                    <p className="text-gray-500 mt-4">
                      Adaptation
                    </p>

                    <p className="text-xl font-black text-green-600 mt-2">
                      84%
                    </p>

                  </div>

                </div>
              </>
            )}

          </div>
        )}

        {/* Analytics */}

        {activeTab === "analytics" && (
          <div className="mt-6 space-y-8">

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <BarChart3 className="text-violet-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Overall Persona Score
                </p>

                <p className="text-5xl font-black text-violet-600 mt-2">
                  82%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Target className="text-blue-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Follow-up Readiness
                </p>

                <p className="text-5xl font-black text-blue-600 mt-2">
                  79%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Zap className="text-orange-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Adaptability
                </p>

                <p className="text-5xl font-black text-orange-600 mt-2">
                  84%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Clock className="text-green-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Avg. Response Time
                </p>

                <p className="text-5xl font-black mt-2">
                  26s
                </p>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7 overflow-x-auto">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Performance by Interviewer Persona
                </h2>

              </div>

              <table className="w-full min-w-[750px]">

                <thead>

                  <tr className="border-b border-gray-200 dark:border-white/10">

                    <th className="text-left p-4">
                      Persona
                    </th>

                    <th className="text-left p-4">
                      Overall Score
                    </th>

                    <th className="text-left p-4">
                      Confidence
                    </th>

                    <th className="text-left p-4">
                      Follow-up Readiness
                    </th>

                    <th className="text-left p-4">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {performance.map((item) => (

                    <tr
                      key={item.persona}
                      className="border-b border-gray-100 dark:border-white/5"
                    >

                      <td className="p-4 font-semibold">
                        {item.persona}
                      </td>

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <div className="w-24 h-2 rounded-full bg-gray-200 dark:bg-gray-700">

                            <div
                              className="h-full rounded-full bg-violet-600"
                              style={{
                                width: `${item.score}%`,
                              }}
                            />

                          </div>

                          <span className="font-bold">
                            {item.score}%
                          </span>

                        </div>

                      </td>

                      <td className="p-4">
                        {item.confidence}%
                      </td>

                      <td className="p-4">
                        {item.followUp}%
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.score >= 85
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : item.score >= 75
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                              : "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                          }`}
                        >
                          {item.score >= 85
                            ? "Strong"
                            : item.score >= 75
                            ? "Good"
                            : "Needs Practice"}
                        </span>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <TrendingUpIcon />

                  <h2 className="text-2xl font-bold">
                    Strongest Persona
                  </h2>

                </div>

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-6">

                  <p className="text-sm text-green-600 font-bold">
                    BEST PERFORMANCE
                  </p>

                  <h3 className="text-2xl font-bold mt-3">
                    Friendly Interviewer
                  </h3>

                  <p className="text-gray-500 mt-3 leading-7">
                    You communicate confidently and maintain strong answer
                    structure when the interviewer uses a supportive style.
                  </p>

                  <p className="text-5xl font-black text-green-600 mt-5">
                    91%
                  </p>

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <Lightbulb className="text-yellow-500" />

                  <h2 className="text-2xl font-bold">
                    Focus Area
                  </h2>

                </div>

                <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-6">

                  <p className="text-sm text-orange-600 font-bold">
                    NEEDS ATTENTION
                  </p>

                  <h3 className="text-2xl font-bold mt-3">
                    Rapid-Fire Interviewer
                  </h3>

                  <p className="text-gray-500 mt-3 leading-7">
                    Your confidence and response speed decrease when questions
                    arrive rapidly. Practice short, structured responses under
                    time pressure.
                  </p>

                  <p className="text-5xl font-black text-orange-600 mt-5">
                    72%
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Lightbulb className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  AI Recommendations
                </h2>

              </div>

              <div className="grid lg:grid-cols-3 gap-6">

                {[
                  {
                    title: "Practice Rapid-Fire Sessions",
                    description:
                      "Use short-answer drills to improve response speed and confidence under pressure.",
                    icon: Zap,
                  },
                  {
                    title: "Strengthen Technical Follow-ups",
                    description:
                      "Practice explaining why you chose an approach and defending technical decisions.",
                    icon: Code2,
                  },
                  {
                    title: "Rotate Personas",
                    description:
                      "Complete mixed persona sessions instead of practicing with only one interviewer style.",
                    icon: Users,
                  },
                ].map((item) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-gray-200 dark:border-white/10 p-7"
                    >

                      <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                        <Icon
                          size={28}
                          className="text-violet-600"
                        />

                      </div>

                      <h3 className="text-xl font-bold mt-6">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 mt-3 leading-7">
                        {item.description}
                      </p>

                      <button
                        type="button"
                        className="mt-6 inline-flex items-center gap-2 text-violet-600 font-semibold hover:gap-3 transition-all"
                      >
                        Start Practice
                        <ChevronRight size={17} />
                      </button>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Persona Rotation Plan */}

            <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-7">

                <Target size={30} />

                <h2 className="text-3xl font-bold">
                  Recommended Persona Rotation
                </h2>

              </div>

              <div className="grid md:grid-cols-5 gap-4">

                {personas.map((item, index) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-white/10 p-5 text-center"
                    >

                      <div className="w-11 h-11 rounded-full bg-white text-violet-600 flex items-center justify-center mx-auto font-black">
                        {index + 1}
                      </div>

                      <Icon
                        size={25}
                        className="mx-auto mt-5"
                      />

                      <p className="font-bold mt-3">
                        {item.name}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        )}

        {/* How It Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              How Interviewer Personas Work
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              {
                number: "1",
                title: "Choose Persona",
                description:
                  "Select the interviewer style you want to practice with.",
              },
              {
                number: "2",
                title: "Adapt Questions",
                description:
                  "AI changes questions, pacing, and follow-ups according to the persona.",
              },
              {
                number: "3",
                title: "Practice",
                description:
                  "Answer questions as if you were in a real interview.",
              },
              {
                number: "4",
                title: "Review",
                description:
                  "Analyze performance across different interviewer styles.",
              },
            ].map((item) => (

              <div
                key={item.number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-black">
                  {item.number}
                </div>

                <h3 className="font-bold text-lg mt-5">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Benefits */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 size={30} />

            <h2 className="text-3xl font-bold">
              Benefits
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              [
                "🎭",
                "Different Styles",
                "Experience multiple interviewer personalities and questioning approaches.",
              ],
              [
                "🔄",
                "Better Adaptability",
                "Learn to adjust your communication style to different interviewers.",
              ],
              [
                "🎯",
                "Realistic Practice",
                "Practice with persona-specific follow-ups and pacing.",
              ],
              [
                "💪",
                "More Confidence",
                "Become comfortable when interviews do not go as expected.",
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
                Your strongest performance is with supportive interviewers,
                while rapid-fire questioning reduces your confidence and
                response speed. Rotate between friendly, strict, rapid-fire,
                system-design, and behavioral personas to build stronger
                interview adaptability.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎭
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Persona Readiness
              </h3>

              <p className="text-5xl font-black">
                82%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

const TrendingUpIcon = () => (
  <TrendingUp className="text-green-600" />
);

export default AIInterviewQuestionInterviewerPersonaMode;