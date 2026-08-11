import React, { useMemo, useState } from "react";
import {
  Brain,
  BriefcaseBusiness,
  Target,
  Building2,
  Code2,
  Database,
  Globe,
  Server,
  Users,
  Settings2,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  Play,
  RefreshCw,
  ArrowRight,
  BarChart3,
  Clock3,
  ShieldCheck,
  MessageSquare,
  Layers3,
} from "lucide-react";

const AIInterviewQuestionContextGenerator = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [activeTab, setActiveTab] = useState("context");
  const [generating, setGenerating] = useState(false);
  const [started, setStarted] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const scenarios = [
    {
      title: "Slow E-Commerce Database",
      role: "Backend Engineer",
      company: "Online Retail Platform",
      category: "Database Optimization",
      difficulty: "Medium",
      icon: Database,
      score: 84,
      time: "15 min",
      question:
        "How would you optimize a slow database query used by an e-commerce application?",
      scenario:
        "You are working as a backend engineer for a growing online retail platform. During a promotional campaign, users report that product search and checkout pages are becoming noticeably slower.",
      requirement:
        "The engineering team needs to reduce database response time while keeping the existing application behavior unchanged.",
      objective:
        "Identify the likely database bottleneck and propose a practical optimization strategy.",
      constraints: [
        "The database contains more than 10 million product records.",
        "The application is receiving significantly higher traffic.",
        "Existing API behavior should remain unchanged.",
        "The solution should avoid unnecessary infrastructure changes.",
      ],
      hints: [
        "Start by measuring the query instead of guessing the bottleneck.",
        "Consider the execution plan and indexes.",
        "Review filtering, joins, sorting, and returned data.",
      ],
      expected:
        "A strong answer should discuss profiling, execution plans, indexing, query structure, unnecessary joins, filtering, caching where appropriate, and how the improvement would be measured.",
    },
    {
      title: "High-Traffic API",
      role: "Software Engineer",
      company: "FinTech Application",
      category: "System Design",
      difficulty: "Hard",
      icon: Server,
      score: 76,
      time: "20 min",
      question:
        "How would you design an API that can handle a sudden increase in traffic?",
      scenario:
        "You are responsible for a payment-related API used by a financial application. A new product launch is expected to increase traffic by nearly ten times during the first few hours.",
      requirement:
        "The API must remain available and responsive while handling a large increase in concurrent requests.",
      objective:
        "Design a scalable approach and explain how you would protect the system from overload.",
      constraints: [
        "Requests may arrive in large bursts.",
        "Payment-related operations require strong consistency.",
        "The system must provide useful monitoring and alerts.",
        "A single server should not become a critical bottleneck.",
      ],
      hints: [
        "Think about horizontal scaling and load balancing.",
        "Identify which components can be cached and which cannot.",
        "Consider rate limiting, queues, monitoring, and graceful degradation.",
      ],
      expected:
        "A strong answer should cover load balancing, horizontal scaling, caching where safe, rate limiting, queues for asynchronous work, database scaling, monitoring, and failure handling.",
    },
    {
      title: "Unreliable Weather Service",
      role: "Full-Stack Developer",
      company: "Smart Agriculture Platform",
      category: "API Reliability",
      difficulty: "Medium",
      icon: Globe,
      score: 81,
      time: "15 min",
      question:
        "How would you make an external weather API integration more reliable?",
      scenario:
        "You are developing a smart agriculture dashboard that uses an external weather API to recommend irrigation schedules. The weather provider occasionally becomes unavailable.",
      requirement:
        "Farmers should continue receiving useful recommendations even when the external weather service is temporarily unavailable.",
      objective:
        "Design a reliable integration that handles API failures without breaking the application.",
      constraints: [
        "The external API has occasional outages.",
        "Weather data becomes stale after a certain period.",
        "The application should avoid excessive API calls.",
        "Users should be informed when recommendations use older data.",
      ],
      hints: [
        "Consider caching recent successful responses.",
        "Think about retry and timeout strategies.",
        "Design an appropriate fallback behavior.",
      ],
      expected:
        "A strong answer should mention timeouts, retries with limits, caching, stale-data policies, fallback behavior, monitoring, and clear communication to users.",
    },
    {
      title: "Team Collaboration Dashboard",
      role: "Frontend Engineer",
      company: "Project Management SaaS",
      category: "Frontend Performance",
      difficulty: "Medium",
      icon: Users,
      score: 69,
      time: "15 min",
      question:
        "How would you improve the performance of a dashboard containing many interactive components?",
      scenario:
        "You are working on a project management application where users see tasks, notifications, analytics, activity feeds, and team information on one dashboard.",
      requirement:
        "The dashboard should remain responsive even when users have hundreds of tasks and many live updates.",
      objective:
        "Identify frontend bottlenecks and propose a practical performance improvement plan.",
      constraints: [
        "The dashboard contains multiple independent widgets.",
        "Some data changes frequently.",
        "Users should not lose existing functionality.",
        "The solution should work on lower-powered devices as well.",
      ],
      hints: [
        "Consider rendering only what is visible.",
        "Look for unnecessary component re-renders.",
        "Think about data fetching and update frequency.",
      ],
      expected:
        "A strong answer should discuss profiling, memoization where appropriate, virtualization, pagination or lazy loading, efficient state management, and controlled data updates.",
    },
    {
      title: "Authentication Design Decision",
      role: "Security Engineer",
      company: "Enterprise SaaS Platform",
      category: "Security Design",
      difficulty: "Hard",
      icon: ShieldCheck,
      score: 73,
      time: "20 min",
      question:
        "How would you design authentication for an enterprise application?",
      scenario:
        "Your team is building an enterprise SaaS platform used by multiple organizations. Each organization needs secure access control while employees should be able to sign in conveniently.",
      requirement:
        "The authentication system must provide strong security, support multiple organizations, and integrate with existing enterprise identity providers.",
      objective:
        "Propose an authentication architecture and explain the major security decisions.",
      constraints: [
        "Different organizations may have different identity providers.",
        "Sensitive business information is stored in the platform.",
        "Sessions must be securely managed.",
        "Administrators need control over user access.",
      ],
      hints: [
        "Consider centralized identity management.",
        "Think about session security and token handling.",
        "Include authorization separately from authentication.",
      ],
      expected:
        "A strong answer should discuss secure authentication protocols, identity providers, session management, authorization, MFA, token security, audit logging, and tenant isolation.",
    },
    {
      title: "Production Deployment Failure",
      role: "DevOps Engineer",
      company: "Cloud Software Company",
      category: "Incident Response",
      difficulty: "Medium",
      icon: Settings2,
      score: 78,
      time: "15 min",
      question:
        "A deployment causes a sudden increase in production errors. What would you do?",
      scenario:
        "Your team deploys a new version of a web application. Within minutes, monitoring shows a significant increase in failed requests and user complaints.",
      requirement:
        "Restore service quickly while collecting enough information to identify the cause of the incident.",
      objective:
        "Explain your incident response process from detection through resolution.",
      constraints: [
        "Users are actively affected.",
        "The previous deployment was stable.",
        "The new release contains several independent changes.",
        "The incident needs to be communicated to the team.",
      ],
      hints: [
        "Prioritize user impact and service restoration.",
        "Use logs and monitoring to compare versions.",
        "Consider rollback before attempting a complex live fix.",
      ],
      expected:
        "A strong answer should cover impact assessment, monitoring, rollback or mitigation, logs, root-cause analysis, communication, and post-incident improvements.",
    },
  ];

  const selected = scenarios[selectedScenario];
  const SelectedIcon = selected.icon;

  const averageScore = useMemo(() => {
    return Math.round(
      scenarios.reduce((sum, item) => sum + item.score, 0) /
        scenarios.length
    );
  }, []);

  const difficultScenarios = useMemo(() => {
    return scenarios.filter((item) => item.difficulty === "Hard").length;
  }, []);

  const handleGenerate = () => {
    setGenerating(true);

    setTimeout(() => {
      setGenerating(false);
      setActiveTab("context");
    }, 800);
  };

  const handleScenarioChange = (index) => {
    setSelectedScenario(index);
    setStarted(false);
    setShowHints(false);
    setActiveTab("context");
  };

  const getDifficultyClass = (difficulty) => {
    if (difficulty === "Easy") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (difficulty === "Medium") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 65) return "text-orange-500";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Brain size={34} className="text-violet-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Question Context Generator
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Practice interview questions inside realistic workplace
              scenarios with role context, requirements, objectives, and
              technical constraints.
            </p>
          </div>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BriefcaseBusiness
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Context Scenarios
            </p>

            <p className="text-5xl font-black mt-3">
              {scenarios.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Avg. Readiness
            </p>

            <p className="text-5xl font-black mt-3">
              {averageScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Layers3
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Hard Scenarios
            </p>

            <p className="text-5xl font-black mt-3">
              {difficultScenarios}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Context Coverage
            </p>

            <p className="text-5xl font-black mt-3">
              92%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-5">

                <Sparkles size={32} />

                <h2 className="text-2xl sm:text-3xl font-bold">
                  AI Interview Context Engine
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-4xl">
                AI transforms isolated interview questions into realistic
                workplace scenarios by adding role context, business
                requirements, candidate objectives, and practical
                constraints.
              </p>

            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition shrink-0 disabled:opacity-60"
            >

              {generating ? (
                <>
                  <RefreshCw
                    size={20}
                    className="animate-spin"
                  />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Context
                </>
              )}

            </button>

          </div>

        </div>

        {/* Scenario Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BriefcaseBusiness className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Scenario
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {scenarios.map((scenario, index) => {

              const Icon = scenario.icon;

              return (
                <button
                  key={scenario.title}
                  type="button"
                  onClick={() => handleScenarioChange(index)}
                  className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                    selectedScenario === index
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                      : "border-gray-200 dark:border-white/10"
                  }`}
                >

                  <div className="flex items-center justify-between gap-4">

                    <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                      <Icon
                        className="text-violet-600"
                        size={24}
                      />

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyClass(
                        scenario.difficulty
                      )}`}
                    >
                      {scenario.difficulty}
                    </span>

                  </div>

                  <h3 className="text-lg font-bold mt-5">
                    {scenario.title}
                  </h3>

                  <p className="text-sm text-violet-600 font-semibold mt-2">
                    {scenario.category}
                  </p>

                  <p className="text-sm text-gray-500 mt-3 leading-6">
                    {scenario.role} · {scenario.company}
                  </p>

                  <div className="flex items-center justify-between mt-5">

                    <span className="text-sm text-gray-500">
                      {scenario.time}
                    </span>

                    <span
                      className={`font-black ${getScoreColor(
                        scenario.score
                      )}`}
                    >
                      {scenario.score}%
                    </span>

                  </div>

                </button>
              );
            })}

          </div>

        </div>

        {/* Selected Scenario */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-7">

            <div className="flex items-start gap-5">

              <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">

                <SelectedIcon
                  className="text-violet-600"
                  size={30}
                />

              </div>

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {selected.title}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyClass(
                      selected.difficulty
                    )}`}
                  >
                    {selected.difficulty}
                  </span>

                </div>

                <div className="flex flex-wrap gap-3 mt-3">

                  <span className="inline-flex items-center gap-2 text-sm text-gray-500">
                    <BriefcaseBusiness size={16} />
                    {selected.role}
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm text-gray-500">
                    <Building2 size={16} />
                    {selected.company}
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm text-gray-500">
                    <Clock3 size={16} />
                    {selected.time}
                  </span>

                </div>

              </div>

            </div>

            <div className="text-center shrink-0">

              <p
                className={`text-5xl font-black ${getScoreColor(
                  selected.score
                )}`}
              >
                {selected.score}%
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Preparation readiness
              </p>

            </div>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("context")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "context"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Interview Context
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("constraints")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "constraints"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Requirements & Constraints
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("hints")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "hints"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            AI Hints
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("strategy")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "strategy"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            AI Strategy
          </button>

        </div>

        {/* Context */}

        {activeTab === "context" && (
          <div className="mt-6 space-y-8">

            {/* Scenario */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-6">

                <Globe className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Interview Scenario
                </h2>

              </div>

              <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-7">

                <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
                  {selected.scenario}
                </p>

              </div>

            </div>

            {/* Role Context */}

            <div className="grid lg:grid-cols-3 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3">

                  <BriefcaseBusiness className="text-violet-600" />

                  <h2 className="text-xl font-bold">
                    Role Context
                  </h2>

                </div>

                <p className="text-2xl font-black mt-5">
                  {selected.role}
                </p>

                <p className="text-gray-500 mt-3 leading-6">
                  Answer as an engineer responsible for solving the
                  technical problem within the given organization.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3">

                  <Building2 className="text-blue-600" />

                  <h2 className="text-xl font-bold">
                    Organization
                  </h2>

                </div>

                <p className="text-2xl font-black mt-5">
                  {selected.company}
                </p>

                <p className="text-gray-500 mt-3 leading-6">
                  Consider the organization's users, technical
                  environment, and practical business requirements.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3">

                  <Target className="text-green-600" />

                  <h2 className="text-xl font-bold">
                    Candidate Objective
                  </h2>

                </div>

                <p className="text-gray-500 mt-5 leading-7">
                  {selected.objective}
                </p>

              </div>

            </div>

            {/* Requirement */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-6">

                <Target className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Business / Technical Requirement
                </h2>

              </div>

              <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-7">

                <p className="text-lg leading-8">
                  {selected.requirement}
                </p>

              </div>

            </div>

            {/* Question */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-6">

                <MessageSquare className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Interview Question
                </h2>

              </div>

              <h3 className="text-2xl sm:text-3xl font-bold leading-9">
                {selected.question}
              </h3>

              <div className="mt-8 flex flex-wrap gap-4">

                <button
                  type="button"
                  onClick={() => setStarted(true)}
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition"
                >
                  <Play size={20} />
                  {started ? "Practice Started" : "Start Practice"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowHints((value) => !value)}
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 font-bold"
                >
                  <Lightbulb size={20} />
                  {showHints ? "Hide Hints" : "Need a Hint?"}
                </button>

              </div>

            </div>

          </div>
        )}

        {/* Constraints */}

        {activeTab === "constraints" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Settings2 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Relevant Constraints
                </h2>

              </div>

              <div className="space-y-4">

                {selected.constraints.map((constraint, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-5"
                  >

                    <AlertTriangle
                      className="text-orange-500 shrink-0 mt-1"
                      size={21}
                    />

                    <p className="leading-7">
                      {constraint}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Target className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  What You Need to Solve
                </h2>

              </div>

              <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

                <p className="text-lg leading-8">
                  {selected.objective}
                </p>

              </div>

              <div className="mt-6 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

                <div className="flex items-center gap-3">

                  <Brain
                    className="text-violet-600"
                    size={23}
                  />

                  <h3 className="font-bold">
                    AI Evaluation Focus
                  </h3>

                </div>

                <p className="text-gray-500 mt-3 leading-7">
                  Your response should connect the proposed technical
                  solution to the business requirement and explain why
                  your approach works under the stated constraints.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Hints */}

        {activeTab === "hints" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Lightbulb className="text-yellow-500" />

              <h2 className="text-2xl font-bold">
                AI Context-Aware Hints
              </h2>

            </div>

            <div className="space-y-5">

              {selected.hints.map((hint, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">

                      <span className="font-black text-yellow-600">
                        {index + 1}
                      </span>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Hint {index + 1}
                      </p>

                      <p className="font-semibold mt-1 leading-7">
                        {hint}
                      </p>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            <div className="mt-8 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6">

              <div className="flex items-start gap-4">

                <Brain
                  className="text-blue-600 shrink-0"
                  size={24}
                />

                <div>

                  <h3 className="font-bold">
                    Interviewer Perspective
                  </h3>

                  <p className="text-gray-500 mt-2 leading-7">
                    The goal is not simply to produce a technically valid
                    solution. Explain how you reason about the situation,
                    clarify assumptions, evaluate alternatives, and connect
                    your solution to the actual requirement.
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Strategy */}

        {activeTab === "strategy" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Brain className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Recommended Approach
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  {
                    number: "01",
                    title: "Understand the Context",
                    text:
                      "Identify the role, business problem, users, and expected outcome before proposing a solution.",
                  },
                  {
                    number: "02",
                    title: "Clarify Requirements",
                    text:
                      "Identify important functional and technical requirements and make reasonable assumptions explicit.",
                  },
                  {
                    number: "03",
                    title: "Analyze Constraints",
                    text:
                      "Consider scale, performance, reliability, security, cost, and existing system limitations.",
                  },
                  {
                    number: "04",
                    title: "Propose the Solution",
                    text:
                      "Explain your approach step by step and connect each decision to the requirements.",
                  },
                  {
                    number: "05",
                    title: "Discuss Trade-Offs",
                    text:
                      "Explain alternatives and why your selected solution is appropriate for the scenario.",
                  },
                ].map((step) => (

                  <div
                    key={step.number}
                    className="flex gap-5 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                  >

                    <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">

                      <span className="font-black text-violet-600">
                        {step.number}
                      </span>

                    </div>

                    <div>

                      <h3 className="font-bold">
                        {step.title}
                      </h3>

                      <p className="text-gray-500 mt-2 leading-6">
                        {step.text}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <CheckCircle2 className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Expected Answer Quality
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  ["Problem understanding", 92],
                  ["Requirement coverage", 88],
                  ["Technical reasoning", 85],
                  ["Constraint awareness", 79],
                  ["Trade-off discussion", 74],
                ].map(([label, score]) => (

                  <div key={label}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {label}
                      </span>

                      <span className="font-black text-violet-600">
                        {score}%
                      </span>

                    </div>

                    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                      <div
                        className="h-full bg-violet-600 rounded-full"
                        style={{
                          width: `${score}%`,
                        }}
                      />

                    </div>

                  </div>
                ))}

              </div>

              <div className="mt-8 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    className="text-green-600"
                    size={23}
                  />

                  <h3 className="font-bold">
                    AI Expected Answer
                  </h3>

                </div>

                <p className="text-gray-500 mt-3 leading-7">
                  {selected.expected}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Practice Workspace */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Code2 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Context-Based Practice Workspace
            </h2>

          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="text-sm text-gray-500">
                Role
              </p>

              <p className="text-xl font-bold mt-2">
                {selected.role}
              </p>

            </div>

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="text-sm text-gray-500">
                Requirement
              </p>

              <p className="font-bold mt-2 leading-6">
                {selected.requirement}
              </p>

            </div>

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="text-sm text-gray-500">
                Time Available
              </p>

              <p className="text-xl font-bold mt-2">
                {selected.time}
              </p>

            </div>

          </div>

          <div className="mt-7 rounded-2xl border-2 border-dashed border-violet-300 dark:border-violet-700 p-8 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <MessageSquare
                className="text-violet-600"
                size={30}
              />

            </div>

            <h3 className="text-2xl font-bold mt-5">
              Ready to solve the contextual problem?
            </h3>

            <p className="text-gray-500 mt-3 max-w-2xl mx-auto leading-7">
              Approach this as if you were in a real interview. Explain
              your assumptions, reasoning, proposed solution, and trade-offs
              before looking at the AI guidance.
            </p>

            <button
              type="button"
              onClick={() => setStarted(true)}
              className="inline-flex items-center gap-3 px-7 py-4 mt-6 rounded-2xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition"
            >
              <Play size={20} />
              {started ? "Practice In Progress" : "Begin Scenario"}
            </button>

          </div>

        </div>

        {/* Scenario Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Context Scenario Coverage
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {scenarios.map((scenario) => {

              const Icon = scenario.icon;

              return (
                <div
                  key={scenario.title}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                      <Icon
                        className="text-violet-600"
                        size={20}
                      />

                    </div>

                    <div>

                      <h3 className="font-bold">
                        {scenario.category}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {scenario.role}
                      </p>

                    </div>

                  </div>

                  <p
                    className={`text-3xl font-black mt-5 ${getScoreColor(
                      scenario.score
                    )}`}
                  >
                    {scenario.score}%
                  </p>

                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-4 overflow-hidden">

                    <div
                      className="h-full bg-violet-600 rounded-full"
                      style={{
                        width: `${scenario.score}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* AI Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Context Practice Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🌍
              </p>

              <h3 className="text-xl font-bold mt-4">
                Think in Context
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Consider the users, business goals, technical environment,
                and real-world constraints surrounding the problem.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Connect Decisions
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Explain why each technical decision helps satisfy the
                requirement instead of listing technologies without context.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Think Like an Engineer
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Balance performance, reliability, maintainability, security,
                scalability, and cost when evaluating a solution.
              </p>

            </div>

          </div>

        </div>

        {/* Final Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <ShieldCheck size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Real interviews rarely present technical problems without
                context. Practice understanding the business requirement,
                identifying constraints, explaining assumptions, and
                selecting solutions that fit the actual situation. This
                will help you move from theoretical answers toward practical
                engineering reasoning.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🌍
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Context Readiness
              </h3>

              <p className="text-5xl font-black">
                {averageScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionContextGenerator;