import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  Database,
  Server,
  Code2,
  MessageSquare,
} from "lucide-react";

const assumptions = [
  {
    title: "Database remains available",
    category: "Infrastructure",
    status: "Reasonable",
    score: 88,
    description:
      "The response assumes the database is available during normal operation.",
    impact:
      "This is reasonable for a standard system-design scenario, but failure handling should still be discussed.",
    icon: Database,
  },
  {
    title: "API response time is stable",
    category: "API",
    status: "Needs Validation",
    score: 61,
    description:
      "The answer assumes that the external API consistently responds within an acceptable time.",
    impact:
      "If the API becomes slow or unavailable, the proposed flow may block or degrade.",
    icon: Server,
  },
  {
    title: "Input size is manageable",
    category: "Input",
    status: "Risky",
    score: 46,
    description:
      "The response does not define a maximum input size.",
    impact:
      "Large inputs could change memory requirements and algorithm selection.",
    icon: Code2,
  },
];

const AIInterviewAnswerTechnicalAssumptionValidator = () => {
  const [answer, setAnswer] = useState(
    "I would store the user data in a relational database and expose it through a REST API. I assume the database will remain available and the API will respond quickly enough for normal requests. Since the expected input is manageable, I would process the data synchronously and return the result directly to the client."
  );

  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);
  const [validated, setValidated] = useState(true);

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setValidated(true);
      setActiveTab("analysis");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
              <ShieldCheck size={34} className="text-amber-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                AI Interview Answer Technical Assumption Validator
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Detect, validate, and improve the technical assumptions hidden
                inside interview answers.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing || !answer.trim()}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Validating Assumptions...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Validate Assumptions
              </>
            )}
          </button>

        </div>

        {/* Hero */}

        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">
            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Don't Let Hidden Assumptions Break Your Solution
            </h2>
          </div>

          <p className="leading-8 text-white/90">
            AI identifies technical assumptions in your response, evaluates
            their reasonableness, highlights risky assumptions, and suggests
            clarification questions before those assumptions affect your
            proposed solution.
          </p>

        </div>

        {/* Score Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <ShieldCheck className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Validation Score
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              72%
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <AlertTriangle className="text-orange-600" size={30} />

            <p className="text-gray-500 mt-4">
              Assumptions Found
            </p>

            <p className="text-5xl font-black text-orange-600 mt-2">
              3
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <CheckCircle2 className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Reasonable
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              1
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <Target className="text-red-600" size={30} />

            <p className="text-gray-500 mt-4">
              Needs Review
            </p>

            <p className="text-5xl font-black text-red-600 mt-2">
              2
            </p>
          </div>

        </div>

        {/* Question + Answer */}

        <div className="mt-10 grid lg:grid-cols-2 gap-7">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-6">
              <Target className="text-amber-600" />

              <h2 className="text-2xl font-bold">
                Interview Question
              </h2>
            </div>

            <div className="rounded-2xl bg-amber-50 dark:bg-amber-900/10 p-6">

              <p className="text-lg font-semibold leading-8">
                "Design an API that allows users to retrieve and process
                large amounts of data efficiently."
              </p>

            </div>

            <div className="mt-7">

              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                AI should validate
              </p>

              <div className="flex flex-wrap gap-3 mt-4">

                {[
                  "Input size",
                  "Database",
                  "API latency",
                  "Failure handling",
                  "Scalability",
                  "Infrastructure",
                ].map((item) => (

                  <span
                    key={item}
                    className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-medium"
                  >
                    {item}
                  </span>

                ))}

              </div>

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-purple-600" />

              <h2 className="text-2xl font-bold">
                Your Response
              </h2>
            </div>

            <textarea
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setValidated(false);
              }}
              rows={10}
              placeholder="Enter your technical interview response..."
              className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-amber-500 resize-none leading-7"
            />

            <div className="flex items-center justify-between gap-4 mt-5">

              <p className="text-sm text-gray-500">
                AI checks assumptions about inputs, infrastructure, APIs,
                databases, and system behavior.
              </p>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={analyzing || !answer.trim()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 disabled:opacity-50"
              >
                <Sparkles size={18} />
                Analyze
              </button>

            </div>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Assumption Analysis"],
            ["questions", "Clarification Questions"],
            ["risks", "Risk Analysis"],
            ["improve", "Improvement Suggestions"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-amber-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <Brain className="text-amber-600" />

                    <h2 className="text-2xl font-bold">
                      AI Assumption Analysis
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-5 max-w-3xl leading-7">
                    Your answer contains three identifiable technical
                    assumptions. One is reasonable, while two require
                    additional validation because they could affect the
                    proposed architecture.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-7xl font-black text-amber-600">
                    72%
                  </p>

                  <p className="text-gray-500 mt-2">
                    Assumption Validation Score
                  </p>

                </div>

              </div>

            </div>

            {/* Assumption Cards */}

            <div className="space-y-5">

              {assumptions.map((item) => {

                const Icon = item.icon;

                const statusClass =
                  item.status === "Reasonable"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : item.status === "Needs Validation"
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";

                return (
                  <div
                    key={item.title}
                    className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                  >

                    <div className="flex flex-col lg:flex-row gap-6">

                      <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-3">

                          <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">

                            <Icon
                              size={23}
                              className="text-amber-600"
                            />

                          </div>

                          <h3 className="text-xl font-bold">
                            {item.title}
                          </h3>

                          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold">
                            {item.category}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${statusClass}`}
                          >
                            {item.status}
                          </span>

                        </div>

                        <p className="text-gray-500 mt-5 leading-7">
                          {item.description}
                        </p>

                        <div className="mt-5 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                          <p className="font-bold">
                            Potential Impact
                          </p>

                          <p className="text-gray-500 mt-2 leading-6">
                            {item.impact}
                          </p>

                        </div>

                      </div>

                      <div className="lg:w-40 shrink-0">

                        <p className="text-sm text-gray-500">
                          Validation
                        </p>

                        <p
                          className={`text-4xl font-black mt-2 ${
                            item.score >= 80
                              ? "text-green-600"
                              : item.score >= 60
                              ? "text-orange-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.score}%
                        </p>

                        <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-3">

                          <div
                            className={`h-full rounded-full ${
                              item.score >= 80
                                ? "bg-green-600"
                                : item.score >= 60
                                ? "bg-orange-600"
                                : "bg-red-600"
                            }`}
                            style={{
                              width: `${item.score}%`,
                            }}
                          />

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        )}

        {/* Questions */}

        {activeTab === "questions" && (
          <div className="mt-6 space-y-7">

            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-3xl p-7">

              <div className="flex items-center gap-3">

                <HelpCircle
                  className="text-purple-600"
                  size={30}
                />

                <h2 className="text-2xl font-bold">
                  AI Clarification Questions
                </h2>

              </div>

              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-7">
                Before finalizing your solution, an interviewer may expect you
                to clarify these assumptions.
              </p>

            </div>

            <div className="space-y-5">

              {[
                [
                  "What is the expected maximum input size?",
                  "The answer assumes that the input is manageable, but the correct architecture may change significantly for very large datasets.",
                ],
                [
                  "What happens if the external API is unavailable?",
                  "The response depends on stable API behavior but does not define a fallback or failure strategy.",
                ],
                [
                  "What latency is considered acceptable?",
                  "Knowing the response-time requirement helps determine whether synchronous processing is appropriate.",
                ],
                [
                  "What availability requirement does the system have?",
                  "The database assumption should be validated against the expected availability and reliability requirements.",
                ],
              ].map(([question, explanation], index) => (

                <div
                  key={question}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="flex gap-5">

                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-black shrink-0">
                      {index + 1}
                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        {question}
                      </h3>

                      <p className="text-gray-500 mt-3 leading-7">
                        {explanation}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* Risks */}

        {activeTab === "risks" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <AlertTriangle className="text-red-600" />

                <h2 className="text-2xl font-bold">
                  Assumption Risk Analysis
                </h2>

              </div>

              <div className="grid md:grid-cols-3 gap-5">

                {[
                  [
                    "Low Risk",
                    "Database availability",
                    "The assumption is common but should still include failure handling.",
                    "green",
                  ],
                  [
                    "Medium Risk",
                    "API latency",
                    "Unexpected latency could affect synchronous processing.",
                    "orange",
                  ],
                  [
                    "High Risk",
                    "Input size",
                    "Large inputs could make the proposed approach inefficient or impossible.",
                    "red",
                  ],
                ].map(([level, title, description, color]) => (

                  <div
                    key={title}
                    className={`rounded-2xl p-6 ${
                      color === "green"
                        ? "bg-green-50 dark:bg-green-900/10"
                        : color === "orange"
                        ? "bg-orange-50 dark:bg-orange-900/10"
                        : "bg-red-50 dark:bg-red-900/10"
                    }`}
                  >

                    <span
                      className={`text-sm font-bold ${
                        color === "green"
                          ? "text-green-600"
                          : color === "orange"
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {level}
                    </span>

                    <h3 className="text-xl font-bold mt-3">
                      {title}
                    </h3>

                    <p className="text-gray-500 mt-3 leading-6">
                      {description}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-red-50 dark:bg-red-900/10 rounded-3xl p-7">

              <div className="flex items-center gap-3">

                <AlertTriangle
                  className="text-red-600"
                  size={28}
                />

                <h2 className="text-xl font-bold text-red-700 dark:text-red-400">
                  Highest-Risk Assumption
                </h2>

              </div>

              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-7">
                The assumption that the input size will remain manageable is the
                most significant risk. If the dataset becomes much larger,
                synchronous processing and the selected data structures may no
                longer meet performance requirements.
              </p>

            </div>

          </div>
        )}

        {/* Improve */}

        {activeTab === "improve" && (
          <div className="mt-6 space-y-7">

            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-3xl p-7">

              <div className="flex items-start gap-4">

                <Lightbulb
                  size={30}
                  className="text-amber-600 shrink-0"
                />

                <div>

                  <h2 className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                    AI Improvement Recommendations
                  </h2>

                  <p className="text-amber-700/80 dark:text-amber-300/80 mt-3 leading-7">
                    Make your assumptions explicit and explain what you would
                    do if those assumptions are no longer true.
                  </p>

                </div>

              </div>

            </div>

            <div className="space-y-5">

              {[
                [
                  "State assumptions explicitly",
                  "Instead of saying the input is manageable, specify the expected input range or ask the interviewer for the constraint.",
                ],
                [
                  "Discuss failure scenarios",
                  "Explain how your system behaves when the database or external API becomes unavailable.",
                ],
                [
                  "Define performance requirements",
                  "Ask about latency, throughput, availability, and expected traffic before choosing an architecture.",
                ],
                [
                  "Explain how the solution changes",
                  "Mention what architectural change you would make if the input size or traffic increased significantly.",
                ],
              ].map(([title, description], index) => (

                <div
                  key={title}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="flex gap-5">

                    <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-black shrink-0">
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

            <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl p-8 text-white">

              <div className="flex items-center gap-3 mb-5">

                <Sparkles size={30} />

                <h2 className="text-2xl font-bold">
                  Stronger Interview Response
                </h2>

              </div>

              <p className="text-lg leading-8 text-white/95">
                "Before choosing the architecture, I would clarify the expected
                input size, request volume, latency, and availability
                requirements. If the input is relatively small, synchronous
                processing may be sufficient. For larger datasets, I would
                consider asynchronous processing or partitioning. I would also
                define a fallback for external API failures and include
                appropriate database availability and recovery mechanisms."
              </p>

            </div>

          </div>
        )}

        {/* How It Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-amber-600" />

            <h2 className="text-2xl font-bold">
              How AI Assumption Validation Works
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Detect Assumptions",
                "AI identifies statements that depend on unstated technical conditions.",
              ],
              [
                "2",
                "Validate",
                "Each assumption is evaluated against the problem context and common engineering constraints.",
              ],
              [
                "3",
                "Assess Impact",
                "AI determines whether an assumption could change the proposed solution.",
              ],
              [
                "4",
                "Improve",
                "The system suggests clarification questions and safer alternatives.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-black">
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

        <div className="mt-10 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl p-8 sm:p-10 text-white">

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
                "Better Reasoning",
                "Encourages candidates to validate assumptions before committing to a solution.",
              ],
              [
                "🔍",
                "Hidden Flaws",
                "Identifies assumptions that could create unexpected system behavior.",
              ],
              [
                "💬",
                "Requirement Clarification",
                "Helps candidates ask stronger questions during system-design interviews.",
              ],
              [
                "🛡️",
                "Safer Solutions",
                "Encourages candidates to consider failures and alternative conditions.",
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
                Your response contains reasonable assumptions, but input size
                and API behavior need further validation. Before finalizing
                your solution, clarify performance requirements, failure
                handling, and scalability constraints.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🛡️
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Validation Score
              </h3>

              <p className="text-5xl font-black">
                72%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerTechnicalAssumptionValidator;