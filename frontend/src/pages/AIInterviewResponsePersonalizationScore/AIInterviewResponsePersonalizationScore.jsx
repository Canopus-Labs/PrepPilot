import React, { useState } from "react";
import {
  UserRound,
  Sparkles,
  Target,
  Briefcase,
  Code2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Lightbulb,
  FileText,
  BarChart3,
  ArrowRight,
  Star,
} from "lucide-react";

const personalizationFactors = [
  {
    title: "Personal Examples",
    score: 88,
    description: "Uses a real project experience instead of a generic example.",
    icon: UserRound,
  },
  {
    title: "Project Connection",
    score: 82,
    description: "Connects the answer with a relevant project from the candidate's background.",
    icon: Briefcase,
  },
  {
    title: "Technical Contribution",
    score: 74,
    description: "Explains what the candidate personally implemented or improved.",
    icon: Code2,
  },
  {
    title: "Skill Connection",
    score: 79,
    description: "Links the response with skills claimed in the candidate profile.",
    icon: Target,
  },
];

const AIInterviewResponsePersonalizationScore = () => {
  const [answer, setAnswer] = useState(
    "In my smart irrigation project, I worked on the ESP32-based automation system. I integrated the soil moisture sensor with the water pump and used weather information to avoid unnecessary watering. This helped me understand how IoT sensors and automation can be combined to solve a practical problem."
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

            <div className="w-16 h-16 rounded-2xl bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center shrink-0">
              <UserRound size={34} className="text-pink-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Response Personalization Score
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Measure how effectively your interview answers connect with
                your own experience, projects, and skills.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing || !answer.trim()}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Analyzing Response...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Personalization
              </>
            )}
          </button>

        </div>

        {/* Hero */}

        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Make Your Answers Uniquely Yours
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI evaluates whether your responses demonstrate your own
            experience, project contributions, technical skills, and relevance
            to your target role instead of relying on generic answers.
          </p>

        </div>

        {/* Question + Answer */}

        <div className="mt-10 grid lg:grid-cols-2 gap-7">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-6">

              <Briefcase className="text-pink-600" />

              <h2 className="text-2xl font-bold">
                Interview Question
              </h2>

            </div>

            <div className="rounded-2xl bg-pink-50 dark:bg-pink-900/10 p-6">

              <p className="text-lg font-semibold leading-8">
                "Tell me about a technical project you are proud of."
              </p>

            </div>

            <div className="mt-7">

              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                Expected Personalization
              </p>

              <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                Connect the answer to a real project, explain your personal
                contribution, mention relevant technologies, and describe the
                impact or learning outcome.
              </p>

            </div>

            <div className="flex flex-wrap gap-3 mt-6">

              {[
                "Personal Experience",
                "Project",
                "Technical Skills",
                "Impact",
              ].map((item) => (

                <span
                  key={item}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium"
                >
                  {item}
                </span>

              ))}

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-6">

              <FileText className="text-purple-600" />

              <h2 className="text-2xl font-bold">
                Your Response
              </h2>

            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={9}
              placeholder="Enter your interview response..."
              className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-pink-500 resize-none leading-7"
            />

            <div className="flex items-center justify-between gap-4 mt-5">

              <p className="text-sm text-gray-500">
                AI checks your response against your profile and project
                information.
              </p>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={analyzing || !answer.trim()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 disabled:opacity-50"
              >
                <Sparkles size={18} />
                Check Score
              </button>

            </div>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Star className="text-pink-600" size={30} />

            <p className="text-gray-500 mt-4">
              Personalization Score
            </p>

            <p className="text-5xl font-black text-pink-600 mt-2">
              82%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Briefcase className="text-purple-600" size={30} />

            <p className="text-gray-500 mt-4">
              Project Connection
            </p>

            <p className="text-5xl font-black text-purple-600 mt-2">
              82%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Code2 className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Skill Connection
            </p>

            <p className="text-5xl font-black text-blue-600 mt-2">
              79%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Role Relevance
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              High
            </p>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Personalization Analysis"],
            ["profile", "Profile Connections"],
            ["improve", "Improve Your Answer"],
            ["progress", "Personalization Progress"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-pink-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Personalization Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <BrainIcon />

                    <h2 className="text-2xl font-bold">
                      AI Personalization Analysis
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-5 max-w-3xl leading-7">
                    Your answer is strongly personalized because it references
                    a real project, your specific implementation work, and
                    technologies you used. Adding a measurable result would
                    make the answer even more convincing.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-7xl font-black text-pink-600">
                    82%
                  </p>

                  <p className="text-gray-500 mt-2">
                    Personalization Score
                  </p>

                </div>

              </div>

            </div>

            {/* Factor Breakdown */}

            <div className="space-y-5">

              {personalizationFactors.map((factor) => {

                const Icon = factor.icon;

                return (
                  <div
                    key={factor.title}
                    className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                  >

                    <div className="flex flex-col lg:flex-row gap-6">

                      <div className="flex-1">

                        <div className="flex items-center gap-4">

                          <div className="w-11 h-11 rounded-xl bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center">

                            <Icon
                              size={23}
                              className="text-pink-600"
                            />

                          </div>

                          <h3 className="text-xl font-bold">
                            {factor.title}
                          </h3>

                        </div>

                        <p className="text-gray-500 mt-4 leading-7">
                          {factor.description}
                        </p>

                      </div>

                      <div className="lg:w-48 shrink-0">

                        <div className="flex items-center justify-between mb-2">

                          <span className="text-sm text-gray-500">
                            Score
                          </span>

                          <span className="font-bold text-pink-600">
                            {factor.score}%
                          </span>

                        </div>

                        <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                          <div
                            className="h-full rounded-full bg-pink-600"
                            style={{
                              width: `${factor.score}%`,
                            }}
                          />

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* Strengths */}

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-green-50 dark:bg-green-900/10 rounded-3xl p-7">

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    className="text-green-600"
                    size={28}
                  />

                  <h2 className="text-xl font-bold text-green-700 dark:text-green-400">
                    Strong Personalization
                  </h2>

                </div>

                <ul className="mt-5 space-y-3 text-gray-600 dark:text-gray-300">

                  <li>• References a real project.</li>
                  <li>• Explains your personal contribution.</li>
                  <li>• Includes relevant technical technologies.</li>
                  <li>• Connects experience with practical problem solving.</li>

                </ul>

              </div>

              <div className="bg-orange-50 dark:bg-orange-900/10 rounded-3xl p-7">

                <div className="flex items-center gap-3">

                  <AlertTriangle
                    className="text-orange-600"
                    size={28}
                  />

                  <h2 className="text-xl font-bold text-orange-700 dark:text-orange-400">
                    Improvement Opportunity
                  </h2>

                </div>

                <ul className="mt-5 space-y-3 text-gray-600 dark:text-gray-300">

                  <li>• Add a measurable project outcome.</li>
                  <li>• Mention one specific technical challenge.</li>
                  <li>• Explain how your contribution affected the result.</li>
                  <li>• Connect the experience to the target role.</li>

                </ul>

              </div>

            </div>

          </div>
        )}

        {/* Profile Connections */}

        {activeTab === "profile" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <UserRound className="text-pink-600" />

                <h2 className="text-2xl font-bold">
                  Profile-to-Answer Connections
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {[
                  [
                    "Project",
                    "Smart Irrigation System",
                    "Strong Match",
                    "You directly referenced a project from your experience.",
                  ],
                  [
                    "Technology",
                    "ESP32 + IoT Sensors",
                    "Strong Match",
                    "The technologies mentioned are connected to your project.",
                  ],
                  [
                    "Skill",
                    "IoT / Automation",
                    "Good Match",
                    "The answer demonstrates practical application of this skill.",
                  ],
                  [
                    "Target Role",
                    "Technical / AI & DS",
                    "Needs More",
                    "Add role-relevant technical impact to strengthen the connection.",
                  ],
                ].map(([category, value, match, description]) => (

                  <div
                    key={category}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <p className="text-sm text-gray-500">
                      {category}
                    </p>

                    <h3 className="text-xl font-bold mt-2">
                      {value}
                    </h3>

                    <span className="inline-block mt-4 px-3 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400 text-sm font-bold">
                      {match}
                    </span>

                    <p className="text-gray-500 mt-4 leading-6">
                      {description}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white">

              <div className="flex items-center gap-3 mb-5">

                <Sparkles size={30} />

                <h2 className="text-2xl font-bold">
                  AI Profile Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90">
                Your project reference makes this response substantially more
                authentic than a generic interview answer. Strengthen it by
                explicitly stating what you personally built, the challenge
                you solved, and the measurable result.
              </p>

            </div>

          </div>
        )}

        {/* Improve */}

        {activeTab === "improve" && (
          <div className="mt-6 space-y-7">

            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-3xl p-7">

              <div className="flex items-start gap-4">

                <Lightbulb
                  size={30}
                  className="text-orange-600 shrink-0"
                />

                <div>

                  <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                    AI Personalization Recommendations
                  </h2>

                  <p className="text-orange-700/80 dark:text-orange-300/80 mt-3 leading-7">
                    Your response already feels personal. Add concrete
                    evidence and role-specific relevance to make it stronger.
                  </p>

                </div>

              </div>

            </div>

            <div className="space-y-5">

              {[
                [
                  "Add a measurable result",
                  "Instead of only saying the project helped reduce unnecessary watering, mention a measurable improvement such as reduced pump runtime or water usage.",
                ],
                [
                  "Explain your exact contribution",
                  "Clearly separate what you personally implemented from what the rest of the team handled.",
                ],
                [
                  "Mention a technical challenge",
                  "Describe one problem you encountered and how you solved it.",
                ],
                [
                  "Connect to the target role",
                  "Explain why this experience makes you a strong candidate for the role you are applying for.",
                ],
              ].map(([title, description], index) => (

                <div
                  key={title}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="flex gap-5">

                    <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-black shrink-0">
                      {index + 1}
                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        {title}
                      </h3>

                      <p className="text-gray-500 mt-3 leading-7">
                        {description}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 text-white">

              <div className="flex items-center gap-3 mb-5">

                <CheckCircle2 size={30} />

                <h2 className="text-2xl font-bold">
                  More Personalized Version
                </h2>

              </div>

              <p className="text-lg leading-8 text-white/95">
                "One project I'm particularly proud of is my smart irrigation
                system. I worked on the ESP32-based automation logic and
                integrated the soil moisture sensor with the water pump. I also
                connected weather information so the system could avoid
                unnecessary watering. One challenge was making the automation
                respond reliably to changing sensor readings. Solving that
                helped me strengthen my IoT and problem-solving skills, which
                are directly relevant to this role."
              </p>

            </div>

          </div>
        )}

        {/* Progress */}

        {activeTab === "progress" && (
          <div className="mt-6 space-y-7">

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Star className="text-pink-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Current Score
                </p>

                <p className="text-5xl font-black text-pink-600 mt-2">
                  82%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <BarChart3 className="text-purple-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Previous Score
                </p>

                <p className="text-5xl font-black text-purple-600 mt-2">
                  70%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <ArrowRight className="text-green-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Improvement
                </p>

                <p className="text-5xl font-black text-green-600 mt-2">
                  +12%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Briefcase className="text-blue-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Answers Analyzed
                </p>

                <p className="text-5xl font-black text-blue-600 mt-2">
                  24
                </p>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-pink-600" />

                <h2 className="text-2xl font-bold">
                  Personalization Score History
                </h2>

              </div>

              <div className="space-y-6">

                {[
                  ["Session 1", 56],
                  ["Session 6", 64],
                  ["Session 12", 70],
                  ["Session 18", 76],
                  ["Session 24", 82],
                ].map(([session, score]) => (

                  <div key={session}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {session}
                      </span>

                      <span className="font-bold text-pink-600">
                        {score}%
                      </span>

                    </div>

                    <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="h-full rounded-full bg-pink-600"
                        style={{
                          width: `${score}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white">

              <div className="flex items-center gap-3 mb-5">

                <Sparkles size={30} />

                <h2 className="text-2xl font-bold">
                  AI Progress Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90">
                Your answers are becoming more personalized over time. You are
                increasingly using concrete project examples and connecting
                your technical experience to interview questions.
              </p>

            </div>

          </div>
        )}

        {/* How It Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BrainIcon />

            <h2 className="text-2xl font-bold">
              How AI Personalization Scoring Works
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Analyze Response",
                "AI identifies personal experiences, projects, skills, and contributions mentioned in the answer.",
              ],
              [
                "2",
                "Match Profile",
                "The response is compared with the candidate's stored profile and relevant experience.",
              ],
              [
                "3",
                "Score",
                "AI calculates how strongly the answer demonstrates authentic personal experience.",
              ],
              [
                "4",
                "Improve",
                "The system recommends concrete details that can make the response more personalized.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-black">
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

        <div className="mt-10 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 size={30} />

            <h2 className="text-3xl font-bold">
              Benefits
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              [
                "👤",
                "Authentic Answers",
                "Encourages candidates to use their own experiences instead of generic responses.",
              ],
              [
                "🚀",
                "Stand Out",
                "Helps candidates demonstrate what makes their background unique.",
              ],
              [
                "🛠️",
                "Project Evidence",
                "Connects interview answers directly with real project contributions.",
              ],
              [
                "🎯",
                "Role Relevance",
                "Encourages candidates to connect experience and skills with the target role.",
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

                <BrainIcon white />

                <h2 className="text-3xl font-bold">
                  AI Final Recommendation
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your response demonstrates strong personalization through a
                real project and specific technical contributions. To reach a
                higher score, add a measurable result, describe a technical
                challenge you solved, and explicitly connect the experience to
                your target role.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                ⭐
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Personalization
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

const BrainIcon = ({ white = false }) => (
  <div
    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
      white
        ? "bg-white/15"
        : "bg-pink-100 dark:bg-pink-900/20"
    }`}
  >
    <Sparkles
      size={23}
      className={white ? "text-white" : "text-pink-600"}
    />
  </div>
);

export default AIInterviewResponsePersonalizationScore;