import React, { useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  BriefcaseBusiness,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Code2,
  Database,
  Server,
  Layers,
  MessageSquare,
  Award,
} from "lucide-react";

const AIInterviewAnswerComparisonByRole = () => {
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const [activeTab, setActiveTab] = useState("comparison");
  const [analyzing, setAnalyzing] = useState(false);

  const [answer, setAnswer] = useState(
    "I improved the application's performance by optimizing the API calls and reducing unnecessary data processing. I also improved the user experience by making the interface more responsive."
  );

  const roles = {
    "Frontend Developer": {
      icon: Code2,
      color: "blue",
      score: 84,
      focus: [
        "Component architecture",
        "Rendering performance",
        "State management",
        "Accessibility",
        "Responsive UI",
      ],
      strengths: [
        "Good mention of user experience.",
        "Performance improvement is relevant.",
        "Response demonstrates awareness of frontend optimization.",
      ],
      missing: [
        "Specific rendering optimization technique",
        "Framework-specific implementation details",
        "Accessibility considerations",
        "Before-and-after UI performance metrics",
      ],
      recommendation:
        "Explain how you optimized rendering, state updates, component structure, or network requests and include measurable frontend performance improvements.",
    },

    "Backend Developer": {
      icon: Server,
      color: "green",
      score: 91,
      focus: [
        "API design",
        "Database optimization",
        "Scalability",
        "Caching",
        "Backend performance",
      ],
      strengths: [
        "API optimization is directly relevant.",
        "Performance improvement is clearly mentioned.",
        "The response shows awareness of backend efficiency.",
      ],
      missing: [
        "Database or query optimization details",
        "API latency metrics",
        "Caching strategy",
        "Scalability considerations",
      ],
      recommendation:
        "Add API response-time metrics, database optimization details, caching decisions, and explain how your changes affected scalability.",
    },

    "Data Scientist": {
      icon: Database,
      color: "violet",
      score: 68,
      focus: [
        "Data quality",
        "Feature engineering",
        "Statistical reasoning",
        "Model evaluation",
        "Experimentation",
      ],
      strengths: [
        "The answer demonstrates performance-oriented thinking.",
        "Optimization is a transferable engineering skill.",
      ],
      missing: [
        "Data processing methodology",
        "Metrics and statistical evidence",
        "Experiment design",
        "Model or pipeline impact",
      ],
      recommendation:
        "For a Data Scientist role, connect the improvement to data processing, model performance, experiment results, or measurable analytical outcomes.",
    },

    "ML Engineer": {
      icon: Brain,
      color: "orange",
      score: 74,
      focus: [
        "Model serving",
        "ML pipelines",
        "Inference performance",
        "Monitoring",
        "Scalability",
      ],
      strengths: [
        "Performance optimization is relevant.",
        "The answer shows awareness of system efficiency.",
      ],
      missing: [
        "Model inference details",
        "Pipeline optimization",
        "Latency or throughput metrics",
        "Model monitoring",
      ],
      recommendation:
        "Mention inference latency, model serving, pipeline optimization, deployment architecture, or monitoring metrics to make the answer stronger for an ML Engineer role.",
    },
  };

  const currentRole = roles[selectedRole];

  const roleComparisons = Object.entries(roles).map(
    ([role, data]) => ({
      role,
      score: data.score,
      focus: data.focus.slice(0, 3),
    })
  );

  const roleIconMap = {
    "Frontend Developer": Code2,
    "Backend Developer": Server,
    "Data Scientist": Database,
    "ML Engineer": Brain,
  };

  const analysisStats = useMemo(
    () => ({
      roleMatch: currentRole.score,
      technicalDepth: selectedRole === "Backend Developer" ? 88 : 76,
      relevance: currentRole.score - 3,
      completeness: currentRole.score - 8,
    }),
    [selectedRole, currentRole.score]
  );

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("comparison");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <BriefcaseBusiness
                size={34}
                className="text-violet-600"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Answer Comparison by Role
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Evaluate the same interview response against the expectations
                of different technical roles.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Analyzing Role Fit...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Role Fit
              </>
            )}
          </button>

        </div>

        {/* Role Selection */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-7">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Target Role
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {Object.entries(roles).map(([role, data]) => {

              const Icon = data.icon;

              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`text-left rounded-2xl border p-5 transition ${
                    selectedRole === role
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10 ring-2 ring-violet-500"
                      : "border-gray-200 dark:border-white/10 hover:border-violet-400"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                      <Icon
                        size={25}
                        className="text-violet-600"
                      />

                    </div>

                    {selectedRole === role && (
                      <CheckCircle2
                        className="text-violet-600"
                        size={22}
                      />
                    )}

                  </div>

                  <h3 className="font-bold text-lg mt-5">
                    {role}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    Role-specific answer evaluation
                  </p>

                </button>
              );
            })}

          </div>

        </div>

        {/* Answer Input */}

        <div className="mt-8 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-6">

            <MessageSquare className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Your Interview Answer
            </h2>

          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={7}
            className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-violet-500 resize-none leading-7"
            placeholder="Enter your interview answer..."
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5">

            <p className="text-sm text-gray-500">
              Currently evaluating for:
              <span className="font-bold text-violet-600 ml-1">
                {selectedRole}
              </span>
            </p>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing || !answer.trim()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-50"
            >
              <Sparkles size={18} />
              Evaluate Answer
            </button>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Role Match
            </p>

            <p className="text-5xl font-black text-violet-600 mt-2">
              {analysisStats.roleMatch}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Brain className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Technical Depth
            </p>

            <p className="text-5xl font-black mt-2">
              {analysisStats.technicalDepth}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <CheckCircle2 className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Relevance
            </p>

            <p className="text-5xl font-black mt-2">
              {analysisStats.relevance}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <BarChart3 className="text-orange-500" size={30} />

            <p className="text-gray-500 mt-4">
              Completeness
            </p>

            <p className="text-5xl font-black mt-2">
              {analysisStats.completeness}%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Same Answer, Different Expectations
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            A strong interview answer depends on the target role. AI
            compares your response against role-specific technical depth,
            terminology, concepts, expected detail, and missing points so
            your preparation matches the position you want.
          </p>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("comparison")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "comparison"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Role Evaluation
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("comparison-chart")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "comparison-chart"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Compare Roles
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("recommendations")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "recommendations"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Recommendations
          </button>

        </div>

        {/* Role Evaluation */}

        {activeTab === "comparison" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <currentRole.icon
                      className="text-violet-600"
                      size={30}
                    />

                    <h2 className="text-3xl font-bold">
                      {selectedRole}
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-5 max-w-3xl leading-7">
                    Your answer is being evaluated against the technical
                    expectations and competencies commonly emphasized for
                    this role.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-7xl font-black text-violet-600">
                    {currentRole.score}%
                  </p>

                  <p className="text-gray-500 mt-2">
                    Role Match
                  </p>

                </div>

              </div>

            </div>

            {/* Role Focus */}

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <Target className="text-blue-600" />

                  <h2 className="text-2xl font-bold">
                    Role-Specific Focus
                  </h2>

                </div>

                <div className="space-y-4">

                  {currentRole.focus.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 p-5"
                    >

                      <CheckCircle2
                        size={21}
                        className="text-blue-600 shrink-0"
                      />

                      <p className="font-semibold">
                        {item}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

              {/* Strengths */}

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <CheckCircle2 className="text-green-600" />

                  <h2 className="text-2xl font-bold">
                    Answer Strengths
                  </h2>

                </div>

                <div className="space-y-4">

                  {currentRole.strengths.map((strength, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-2xl bg-green-50 dark:bg-green-900/10 p-5"
                    >

                      <CheckCircle2
                        size={21}
                        className="text-green-600 shrink-0"
                      />

                      <p className="leading-7">
                        {strength}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

            {/* Missing Points */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <AlertTriangle className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Missing Role-Specific Points
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {currentRole.missing.map((item, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-orange-200 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/10 p-6"
                  >

                    <div className="flex items-start gap-4">

                      <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">
                        {index + 1}
                      </span>

                      <p className="font-semibold leading-7">
                        {item}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* Role Comparison */}

        {activeTab === "comparison-chart" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Same Answer Across Roles
                </h2>

              </div>

              <div className="space-y-7">

                {roleComparisons.map((item) => {

                  const Icon = roleIconMap[item.role];

                  return (
                    <div key={item.role}>

                      <div className="flex items-center justify-between gap-4 mb-3">

                        <div className="flex items-center gap-3">

                          <Icon
                            size={22}
                            className="text-violet-600"
                          />

                          <span className="font-bold">
                            {item.role}
                          </span>

                        </div>

                        <span className="font-black text-violet-600">
                          {item.score}%
                        </span>

                      </div>

                      <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                        <div
                          className="h-full bg-violet-600 rounded-full"
                          style={{
                            width: `${item.score}%`,
                          }}
                        />

                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">

                        {item.focus.map((focus) => (

                          <span
                            key={focus}
                            className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs"
                          >
                            {focus}
                          </span>
                        ))}

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Comparison Table */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7 overflow-x-auto">

              <div className="flex items-center gap-3 mb-7">

                <Layers className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Role Expectation Comparison
                </h2>

              </div>

              <table className="w-full min-w-[800px]">

                <thead>

                  <tr className="border-b border-gray-200 dark:border-white/10">

                    <th className="text-left p-4">
                      Role
                    </th>

                    <th className="text-left p-4">
                      Role Match
                    </th>

                    <th className="text-left p-4">
                      Primary Focus
                    </th>

                    <th className="text-left p-4">
                      Recommendation
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {Object.entries(roles).map(([role, data]) => (

                    <tr
                      key={role}
                      className="border-b border-gray-100 dark:border-white/5"
                    >

                      <td className="p-4 font-bold">
                        {role}
                      </td>

                      <td className="p-4 font-black text-violet-600">
                        {data.score}%
                      </td>

                      <td className="p-4 text-gray-500">
                        {data.focus.slice(0, 2).join(" • ")}
                      </td>

                      <td className="p-4 text-gray-500">
                        {data.missing[0]}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Lightbulb className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  AI Role-Specific Recommendations
                </h2>

              </div>

              <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-7">

                <p className="text-lg leading-8">
                  {currentRole.recommendation}
                </p>

              </div>

              <div className="mt-7 space-y-4">

                {currentRole.missing.map((item, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                  >

                    <span className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold shrink-0">
                      {index + 1}
                    </span>

                    <div>

                      <p className="font-bold">
                        Add: {item}
                      </p>

                      <p className="text-gray-500 mt-1 leading-6">
                        Including this point can make your answer more
                        aligned with {selectedRole} expectations.
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* Improvement Path */}

            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-7">

                <Award size={30} />

                <h2 className="text-3xl font-bold">
                  Recommended Answer Improvement
                </h2>

              </div>

              <div className="grid md:grid-cols-4 gap-5">

                {[
                  [
                    "1",
                    "Context",
                    "Explain the technical problem and why it mattered.",
                  ],
                  [
                    "2",
                    "Action",
                    "Describe exactly what you implemented.",
                  ],
                  [
                    "3",
                    "Role Depth",
                    `Add concepts expected from a ${selectedRole}.`,
                  ],
                  [
                    "4",
                    "Result",
                    "Provide measurable evidence of the improvement.",
                  ],
                ].map(([number, title, description]) => (

                  <div
                    key={number}
                    className="rounded-2xl bg-white/10 p-6"
                  >

                    <div className="w-10 h-10 rounded-full bg-white text-green-600 flex items-center justify-center font-black">
                      {number}
                    </div>

                    <h3 className="text-xl font-bold mt-5">
                      {title}
                    </h3>

                    <p className="text-white/80 mt-3 leading-6">
                      {description}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* Role Skill Matrix */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Role Skill Matrix
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {Object.entries(roles).map(([role, data]) => {

              const Icon = data.icon;

              return (
                <div
                  key={role}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex items-center gap-3">

                    <Icon
                      size={25}
                      className="text-violet-600"
                    />

                    <h3 className="font-bold">
                      {role}
                    </h3>

                  </div>

                  <div className="mt-5 space-y-3">

                    {data.focus.map((skill) => (

                      <div
                        key={skill}
                        className="flex items-center gap-2 text-sm text-gray-500"
                      >

                        <CheckCircle2
                          size={16}
                          className="text-green-600"
                        />

                        {skill}

                      </div>
                    ))}

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* AI Evaluation Process */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              How AI Evaluates by Role
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Select Role",
                "Identify the target position and expected competency level.",
              ],
              [
                "2",
                "Analyze Answer",
                "Extract technical concepts, terminology, and claims.",
              ],
              [
                "3",
                "Compare",
                "Compare the response against role-specific expectations.",
              ],
              [
                "4",
                "Recommend",
                "Suggest missing points and targeted improvements.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl bg-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-white text-violet-600 flex items-center justify-center font-black">
                  {number}
                </div>

                <h3 className="text-xl font-bold mt-5">
                  {title}
                </h3>

                <p className="text-white/80 mt-3 leading-6">
                  {description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Benefits */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Benefits of Role-Based Evaluation
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                icon: "🎯",
                title: "Relevant Feedback",
                description:
                  "Receive feedback aligned with your target job role.",
              },
              {
                icon: "🧠",
                title: "Better Preparation",
                description:
                  "Focus on concepts that matter for the position you want.",
              },
              {
                icon: "💼",
                title: "Employer Alignment",
                description:
                  "Understand what interviewers may expect from your role.",
              },
              {
                icon: "📈",
                title: "Personalized Growth",
                description:
                  "Identify role-specific gaps and improve them systematically.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {item.icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Final Recommendation */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Recommendation
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your current answer is reasonably aligned with{" "}
                <strong>{selectedRole}</strong> expectations. To make it
                stronger, add role-specific technical depth, explain your
                implementation decisions, and include measurable evidence of
                the result.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Role Match
              </h3>

              <p className="text-5xl font-black">
                {currentRole.score}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerComparisonByRole;