import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  Briefcase,
  AlertTriangle,
  Clock,
  Users,
  Server,
  CheckCircle2,
  Lightbulb,
  RefreshCw,
  MessageSquare,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const scenarios = [
  {
    title: "Production Performance Issue",
    category: "Technical",
    icon: Server,
    difficulty: "Hard",
    description:
      "Your production API response time has increased significantly after a new release. Users are reporting slow page loads.",
    objective:
      "Explain how you would investigate the issue, prioritize actions, and communicate with the team.",
  },
  {
    title: "Changing Project Requirements",
    category: "Product",
    icon: Target,
    difficulty: "Medium",
    description:
      "Two days before delivery, the product team changes an important requirement that affects your current implementation.",
    objective:
      "Explain how you would assess the impact and decide what should change.",
  },
  {
    title: "Tight Delivery Deadline",
    category: "Planning",
    icon: Clock,
    difficulty: "Medium",
    description:
      "Your team has three days remaining before a critical release, but several important features are incomplete.",
    objective:
      "Explain how you would prioritize work while maintaining acceptable quality.",
  },
  {
    title: "Technical Team Disagreement",
    category: "Behavioral",
    icon: Users,
    difficulty: "Medium",
    description:
      "Two engineers strongly disagree about whether the team should use a relational or NoSQL database.",
    objective:
      "Explain how you would help the team reach a technically sound decision.",
  },
];

const feedback = [
  {
    title: "Problem Analysis",
    score: 88,
    description:
      "You identified the main production symptoms and started with evidence-based investigation.",
  },
  {
    title: "Decision Making",
    score: 82,
    description:
      "Your response prioritizes immediate mitigation before deeper optimization.",
  },
  {
    title: "Communication",
    score: 76,
    description:
      "You mentioned informing stakeholders, but could explain the communication timeline more clearly.",
  },
  {
    title: "Technical Reasoning",
    score: 85,
    description:
      "Your proposed investigation covers logs, metrics, recent deployments, and service dependencies.",
  },
];

const AIInterviewPreparationScenarioGenerator = () => {
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [answer, setAnswer] = useState(
    "I would first verify the performance issue using monitoring metrics and application logs. I would compare the current metrics with the previous release to determine whether the deployment caused the regression. If users are being significantly affected, I would consider rolling back or mitigating the problematic change before investigating the root cause. I would communicate the impact and proposed actions to the team while continuing the investigation."
  );

  const [activeTab, setActiveTab] = useState("scenario");
  const [generating, setGenerating] = useState(false);
  const [submitted, setSubmitted] = useState(true);

  const generateScenario = () => {
    setGenerating(true);

    setTimeout(() => {
      const nextIndex =
        (scenarios.findIndex(
          (item) => item.title === selectedScenario.title
        ) +
          1) %
        scenarios.length;

      setSelectedScenario(scenarios[nextIndex]);
      setAnswer("");
      setSubmitted(false);
      setGenerating(false);
      setActiveTab("scenario");
    }, 700);
  };

  const submitAnswer = () => {
    if (!answer.trim()) return;

    setSubmitted(true);
    setActiveTab("feedback");
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
              <Brain size={34} className="text-indigo-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                AI Interview Preparation Scenario Generator
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Practice realistic workplace situations and improve your
                decision-making, reasoning, and communication skills.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={generateScenario}
            disabled={generating}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {generating ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Generate Scenario
              </>
            )}
          </button>
        </div>

        {/* Hero */}

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">
            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Think Like an Engineer, Not Just a Candidate
            </h2>
          </div>

          <p className="leading-8 text-white/90">
            AI generates realistic workplace situations based on your target
            role and asks you to explain how you would analyze the problem,
            make decisions, communicate with others, and handle uncertainty.
          </p>

        </div>

        {/* Scenario Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-7">
            <Target className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Choose a Scenario Type
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              const selected =
                selectedScenario.title === scenario.title;

              return (
                <button
                  key={scenario.title}
                  type="button"
                  onClick={() => {
                    setSelectedScenario(scenario);
                    setAnswer("");
                    setSubmitted(false);
                  }}
                  className={`text-left rounded-2xl border-2 p-5 transition ${
                    selected
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10"
                      : "border-gray-200 dark:border-white/10"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                      <Icon size={23} className="text-indigo-600" />
                    </div>

                    {selected && (
                      <CheckCircle2
                        size={21}
                        className="text-indigo-600"
                      />
                    )}

                  </div>

                  <h3 className="font-bold text-lg mt-5">
                    {scenario.title}
                  </h3>

                  <div className="flex gap-2 mt-3">

                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold">
                      {scenario.category}
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 text-xs font-semibold">
                      {scenario.difficulty}
                    </span>

                  </div>

                </button>
              );
            })}

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["scenario", "Current Scenario"],
            ["feedback", "AI Feedback"],
            ["reasoning", "Decision Reasoning"],
            ["improve", "Improvement Tips"],
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

        {/* Scenario */}

        {activeTab === "scenario" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3 mb-5">

                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 text-sm font-bold">
                      {selectedScenario.category}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 text-sm font-bold">
                      {selectedScenario.difficulty}
                    </span>

                  </div>

                  <h2 className="text-3xl font-black">
                    {selectedScenario.title}
                  </h2>

                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 leading-8">
                    {selectedScenario.description}
                  </p>

                </div>

                <div className="w-20 h-20 rounded-2xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">

                  {React.createElement(selectedScenario.icon, {
                    size: 40,
                    className: "text-indigo-600",
                  })}

                </div>

              </div>

              <div className="mt-8 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 p-6">

                <div className="flex items-center gap-3">

                  <Target className="text-indigo-600" />

                  <h3 className="font-bold text-lg">
                    Your Objective
                  </h3>

                </div>

                <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
                  {selectedScenario.objective}
                </p>

              </div>

            </div>

            {/* Candidate Response */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-6">

                <MessageSquare className="text-purple-600" />

                <h2 className="text-2xl font-bold">
                  How Would You Handle It?
                </h2>

              </div>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={10}
                placeholder="Explain how you would analyze the situation, make decisions, communicate with the team, and resolve the problem..."
                className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-7"
              />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-5">

                <p className="text-sm text-gray-500">
                  Focus on your reasoning, priorities, assumptions, and
                  communication—not just the final action.
                </p>

                <button
                  type="button"
                  onClick={submitAnswer}
                  disabled={!answer.trim()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
                >
                  <Sparkles size={18} />
                  Get AI Feedback
                </button>

              </div>

            </div>

            {/* Interviewer Follow-up */}

            <div className="bg-gray-900 rounded-3xl p-7 text-white">

              <div className="flex items-center gap-3">

                <MessageSquare size={27} />

                <h2 className="text-2xl font-bold">
                  Interviewer Follow-up
                </h2>

              </div>

              <p className="text-gray-300 mt-5 leading-8">
                "You have identified the immediate mitigation steps. What
                metrics would you monitor to confirm that your fix actually
                resolved the production issue?"
              </p>

              <button
                type="button"
                onClick={() => setActiveTab("feedback")}
                className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-white text-gray-900 font-semibold"
              >
                Practice Follow-up
                <ArrowRight size={18} />
              </button>

            </div>

          </div>
        )}

        {/* Feedback */}

        {activeTab === "feedback" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <Sparkles className="text-indigo-600" />

                    <h2 className="text-2xl font-bold">
                      AI Scenario Performance
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-5 max-w-3xl leading-7">
                    Your response demonstrates strong incident analysis and
                    prioritization. You can improve further by making your
                    communication plan and success criteria more explicit.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-7xl font-black text-indigo-600">
                    83
                  </p>

                  <p className="text-gray-500 mt-2">
                    Scenario Score
                  </p>

                </div>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {feedback.map((item) => (

                <div
                  key={item.title}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <CheckCircle2
                        className="text-green-600"
                        size={25}
                      />

                      <h3 className="text-xl font-bold">
                        {item.title}
                      </h3>

                    </div>

                    <span className="text-2xl font-black text-indigo-600">
                      {item.score}%
                    </span>

                  </div>

                  <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{
                        width: `${item.score}%`,
                      }}
                    />

                  </div>

                  <p className="text-gray-500 mt-5 leading-7">
                    {item.description}
                  </p>

                </div>

              ))}

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-green-50 dark:bg-green-900/10 rounded-3xl p-7">

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    className="text-green-600"
                    size={28}
                  />

                  <h2 className="text-xl font-bold text-green-700 dark:text-green-400">
                    What You Did Well
                  </h2>

                </div>

                <ul className="mt-5 space-y-3 text-gray-600 dark:text-gray-300">

                  <li>• Started with evidence instead of assumptions.</li>
                  <li>• Considered immediate user impact.</li>
                  <li>• Included rollback as a mitigation option.</li>
                  <li>• Mentioned team communication.</li>

                </ul>

              </div>

              <div className="bg-orange-50 dark:bg-orange-900/10 rounded-3xl p-7">

                <div className="flex items-center gap-3">

                  <AlertTriangle
                    className="text-orange-600"
                    size={28}
                  />

                  <h2 className="text-xl font-bold text-orange-700 dark:text-orange-400">
                    What Could Improve
                  </h2>

                </div>

                <ul className="mt-5 space-y-3 text-gray-600 dark:text-gray-300">

                  <li>• Define concrete success metrics.</li>
                  <li>• Explain stakeholder communication more clearly.</li>
                  <li>• Mention how you would prevent recurrence.</li>
                  <li>• State decision criteria before choosing rollback.</li>

                </ul>

              </div>

            </div>

          </div>
        )}

        {/* Reasoning */}

        {activeTab === "reasoning" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Brain className="text-indigo-600" />

                <h2 className="text-2xl font-bold">
                  AI Decision Reasoning Breakdown
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  [
                    "1",
                    "Identify the problem",
                    "Confirm the reported performance degradation using logs, monitoring, traces, and user-impact data.",
                  ],
                  [
                    "2",
                    "Determine the scope",
                    "Check whether the issue affects all users, a specific service, region, endpoint, or deployment.",
                  ],
                  [
                    "3",
                    "Mitigate impact",
                    "If the release is responsible and users are significantly affected, consider rollback or another safe mitigation.",
                  ],
                  [
                    "4",
                    "Find root cause",
                    "Compare the latest release with the previous stable state and investigate the relevant service dependencies.",
                  ],
                  [
                    "5",
                    "Verify recovery",
                    "Use measurable metrics to confirm that latency and error rates return to acceptable levels.",
                  ],
                  [
                    "6",
                    "Prevent recurrence",
                    "Add tests, monitoring, alerts, documentation, or deployment safeguards where appropriate.",
                  ],
                ].map(([number, title, description]) => (

                  <div
                    key={number}
                    className="flex gap-5 rounded-2xl bg-gray-50 dark:bg-gray-800 p-6"
                  >

                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black shrink-0">
                      {number}
                    </div>

                    <div>

                      <h3 className="text-lg font-bold">
                        {title}
                      </h3>

                      <p className="text-gray-500 mt-2 leading-7">
                        {description}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-7">

              <div className="flex items-center gap-3">

                <Lightbulb className="text-indigo-600" />

                <h2 className="text-xl font-bold">
                  Interviewer Insight
                </h2>

              </div>

              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-8">
                Strong situational answers usually explain not only what you
                would do, but why you would do it, what information you need,
                how you would measure success, and how you would communicate
                the decision.
              </p>

            </div>

          </div>
        )}

        {/* Improvement */}

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
                    AI Improvement Recommendations
                  </h2>

                  <p className="text-orange-700/80 dark:text-orange-300/80 mt-3 leading-7">
                    Your response is solid, but these additions would make it
                    more structured and interview-ready.
                  </p>

                </div>

              </div>

            </div>

            <div className="space-y-5">

              {[
                [
                  "Explain your priorities",
                  "Explicitly state why protecting users and service availability comes before deeper root-cause investigation.",
                ],
                [
                  "Use measurable success criteria",
                  "Mention latency, error rate, throughput, or another relevant metric to verify recovery.",
                ],
                [
                  "Discuss communication",
                  "Explain who you would notify, what information you would provide, and when you would provide updates.",
                ],
                [
                  "Include prevention",
                  "Finish by explaining how you would reduce the chance of the same issue happening again.",
                ],
              ].map(([title, description], index) => (

                <div
                  key={title}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="flex gap-5">

                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black shrink-0">
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

            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white">

              <div className="flex items-center gap-3 mb-5">

                <Sparkles size={30} />

                <h2 className="text-2xl font-bold">
                  Stronger Response Structure
                </h2>

              </div>

              <p className="text-lg leading-8 text-white/95">
                "First, I would confirm the issue using production metrics,
                logs, and traces. Then I would determine the scope and whether
                the latest deployment is responsible. If users are severely
                affected, I would prioritize a safe mitigation such as a
                rollback while keeping the team and stakeholders informed. Once
                the service is stable, I would identify the root cause, verify
                the fix using latency and error-rate metrics, and finally add
                safeguards such as tests or monitoring to prevent recurrence."
              </p>

            </div>

          </div>
        )}

        {/* How It Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              How AI Scenario Generation Works
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Select Role",
                "AI considers the user's target role and relevant competencies.",
              ],
              [
                "2",
                "Generate Scenario",
                "A realistic workplace situation is created with requirements and constraints.",
              ],
              [
                "3",
                "Evaluate Response",
                "AI analyzes reasoning, decisions, technical depth, and communication.",
              ],
              [
                "4",
                "Provide Feedback",
                "The system provides structured feedback and actionable improvements.",
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

        <div className="mt-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 size={30} />

            <h2 className="text-3xl font-bold">
              Benefits
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              [
                "🧠",
                "Decision Making",
                "Develops practical reasoning skills through realistic situations.",
              ],
              [
                "🎯",
                "Situational Practice",
                "Prepares candidates for open-ended interview questions.",
              ],
              [
                "🏢",
                "Workplace Simulation",
                "Connects interview preparation with real engineering challenges.",
              ],
              [
                "💬",
                "Reasoning Communication",
                "Encourages candidates to explain why they would choose an approach.",
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
                Your response demonstrates strong situational reasoning.
                Continue practicing scenarios that require prioritization,
                stakeholder communication, measurable decision criteria, and
                prevention of recurring problems.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🚀
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Scenario Score
              </h3>

              <p className="text-5xl font-black">
                83%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationScenarioGenerator;