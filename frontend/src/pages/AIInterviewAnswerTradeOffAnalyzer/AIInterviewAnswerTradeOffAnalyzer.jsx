import React, { useMemo, useState } from "react";
import {
  Brain,
  Scale,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Target,
  RefreshCw,
  ArrowRight,
  Award,
  Lightbulb,
  ShieldCheck,
  Search,
  BarChart3,
  Zap,
  Database,
  Server,
  Clock3,
  Wrench,
  Layers3,
  GitCompare,
  CircleAlert,
  BookOpen,
  Mic,
} from "lucide-react";

const AIInterviewAnswerTradeOffAnalyzer = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);
  const [practicing, setPracticing] = useState(false);

  const answers = [
    {
      question:
        "How would you design a system for storing and retrieving user sessions?",
      type: "System Design",
      tradeOffScore: 64,
      alternativesDiscussed: 1,
      riskLevel: "Moderate",

      original:
        "I would use Redis to store user sessions because it is fast and provides low-latency access. The application would retrieve the session from Redis whenever a request arrives and update it when necessary.",

      improved:
        "I would use Redis for session storage because it provides low-latency reads and supports automatic expiration. The trade-off is that Redis requires additional infrastructure and can be more expensive than storing sessions in a relational database. A database-backed session store provides stronger durability and simpler persistence, but may increase latency. For a high-traffic application where session speed is important, I would choose Redis while adding replication and a fallback strategy.",

      solution: "Redis Session Store",

      tradeoffs: [
        {
          category: "Performance",
          score: 91,
          icon: Zap,
          advantage:
            "Redis provides very fast in-memory reads and writes.",
          disadvantage:
            "Memory-based storage can become expensive at large scale.",
          decision:
            "Good choice when low-latency session access is important.",
        },
        {
          category: "Scalability",
          score: 84,
          icon: Server,
          advantage:
            "Redis can scale through replication and clustering.",
          disadvantage:
            "Distributed Redis introduces additional operational complexity.",
          decision:
            "Suitable for high-traffic applications with proper infrastructure.",
        },
        {
          category: "Durability",
          score: 62,
          icon: Database,
          advantage:
            "Redis supports persistence mechanisms.",
          disadvantage:
            "It is not inherently equivalent to a durable relational database.",
          decision:
            "Use replication and persistence when session recovery matters.",
        },
        {
          category: "Maintainability",
          score: 76,
          icon: Wrench,
          advantage:
            "Session operations are straightforward.",
          disadvantage:
            "The team must operate another infrastructure component.",
          decision:
            "Worth the complexity when performance requirements justify it.",
        },
      ],

      alternatives: [
        {
          name: "Relational Database",
          advantage:
            "Strong durability and familiar transactional guarantees.",
          disadvantage:
            "Usually higher latency for frequent session reads and writes.",
          bestFor:
            "Applications prioritizing durability and simpler infrastructure.",
        },
        {
          name: "In-Memory Application Store",
          advantage:
            "Very simple and extremely fast.",
          disadvantage:
            "Sessions are lost when the application instance restarts.",
          bestFor:
            "Small or temporary applications where session persistence is not critical.",
        },
        {
          name: "Distributed Cache",
          advantage:
            "Fast access with horizontal scaling.",
          disadvantage:
            "Requires careful consistency and eviction management.",
          bestFor:
            "High-scale applications with distributed workloads.",
        },
      ],

      strengths: [
        "Identifies Redis as a low-latency session store.",
        "Recognizes the need for session retrieval and updates.",
        "Chooses a practical technology for high-throughput workloads.",
      ],

      missingTradeoffs: [
        "Cost of memory-based infrastructure.",
        "Durability versus performance.",
        "Operational complexity.",
      ],
    },

    {
      question:
        "Which database would you choose for an e-commerce application?",
      type: "Database Design",
      tradeOffScore: 72,
      alternativesDiscussed: 2,
      riskLevel: "Moderate",

      original:
        "I would use PostgreSQL because it is reliable and supports relationships. It would work well for products, orders, customers, and payments.",

      improved:
        "I would use PostgreSQL as the primary transactional database because e-commerce data contains strong relationships and requires transactional consistency. The trade-off is that relational databases can become more difficult to scale horizontally than some NoSQL systems. A document database could provide flexible schemas and easier horizontal scaling, but it may make complex transactional relationships harder to model. For orders and payments, I would prioritize consistency and choose PostgreSQL, while using caching and read replicas to improve scalability.",

      solution: "PostgreSQL",

      tradeoffs: [
        {
          category: "Consistency",
          score: 94,
          icon: ShieldCheck,
          advantage:
            "Strong transactions and consistency are valuable for orders and payments.",
          disadvantage:
            "Strict consistency can introduce coordination overhead.",
          decision:
            "Excellent fit for transactional e-commerce workloads.",
        },
        {
          category: "Scalability",
          score: 78,
          icon: TrendingUp,
          advantage:
            "Read replicas and partitioning can support significant scale.",
          disadvantage:
            "Very large horizontal write scaling can require more engineering.",
          decision:
            "Good default choice with an appropriate scaling strategy.",
        },
        {
          category: "Schema Flexibility",
          score: 69,
          icon: Layers3,
          advantage:
            "Structured schemas improve data integrity.",
          disadvantage:
            "Frequent schema changes require migrations.",
          decision:
            "Preferable when business entities have stable relationships.",
        },
        {
          category: "Query Complexity",
          score: 89,
          icon: Search,
          advantage:
            "SQL is powerful for joins, filtering, aggregation, and reporting.",
          disadvantage:
            "Complex queries may need optimization as data grows.",
          decision:
            "Strong fit for reporting and relationship-heavy queries.",
        },
      ],

      alternatives: [
        {
          name: "MongoDB",
          advantage:
            "Flexible document model and strong horizontal scaling options.",
          disadvantage:
            "Complex relational workflows can require additional modeling.",
          bestFor:
            "Flexible product catalogs and document-oriented workloads.",
        },
        {
          name: "DynamoDB",
          advantage:
            "Highly scalable managed key-value/document storage.",
          disadvantage:
            "Access patterns need to be designed carefully in advance.",
          bestFor:
            "Very high-scale workloads with predictable access patterns.",
        },
      ],

      strengths: [
        "Selects a strong transactional database.",
        "Recognizes relationships between e-commerce entities.",
        "Connects database choice with reliability requirements.",
      ],

      missingTradeoffs: [
        "Horizontal scaling limitations.",
        "Schema flexibility.",
        "Comparison with NoSQL alternatives.",
      ],
    },

    {
      question:
        "How would you choose between REST and GraphQL for a new API?",
      type: "API Design",
      tradeOffScore: 81,
      alternativesDiscussed: 3,
      riskLevel: "Low",

      original:
        "I would probably choose REST because it is widely used and easy for developers to understand. It also works well with standard HTTP methods.",

      improved:
        "I would choose REST when the API has predictable resources, simple client requirements, and strong HTTP semantics are useful. GraphQL can reduce over-fetching and under-fetching by allowing clients to request exactly the fields they need, but it adds schema, caching, query-complexity, and operational considerations. For a straightforward public API I would generally prefer REST, while a highly dynamic client ecosystem with complex data requirements may benefit from GraphQL.",

      solution: "REST API",

      tradeoffs: [
        {
          category: "Simplicity",
          score: 92,
          icon: Wrench,
          advantage:
            "REST uses familiar HTTP concepts and resource-oriented endpoints.",
          disadvantage:
            "Complex client data requirements can require multiple endpoints.",
          decision:
            "Strong choice for simple and predictable APIs.",
        },
        {
          category: "Client Flexibility",
          score: 84,
          icon: GitCompare,
          advantage:
            "GraphQL allows clients to request specific fields.",
          disadvantage:
            "REST can result in over-fetching or under-fetching.",
          decision:
            "GraphQL is stronger when clients have highly variable data needs.",
        },
        {
          category: "Caching",
          score: 79,
          icon: Database,
          advantage:
            "REST works naturally with HTTP caching semantics.",
          disadvantage:
            "GraphQL caching can require additional strategies.",
          decision:
            "REST has a simpler caching model for many applications.",
        },
        {
          category: "Operational Complexity",
          score: 86,
          icon: SettingsIcon,
          advantage:
            "REST is generally easier to monitor and reason about.",
          disadvantage:
            "GraphQL requires query-complexity controls and careful resolver design.",
          decision:
            "REST is often preferable when operational simplicity matters.",
        },
      ],

      alternatives: [
        {
          name: "GraphQL",
          advantage:
            "Flexible queries and reduced over-fetching.",
          disadvantage:
            "Adds schema and resolver complexity.",
          bestFor:
            "Applications with complex and changing client data requirements.",
        },
        {
          name: "gRPC",
          advantage:
            "Efficient strongly typed service-to-service communication.",
          disadvantage:
            "Less convenient for browser-facing public APIs.",
          bestFor:
            "Internal microservice communication.",
        },
      ],

      strengths: [
        "Recognizes REST's simplicity.",
        "Understands standard HTTP semantics.",
        "Chooses a practical default for many API designs.",
      ],

      missingTradeoffs: [
        "Client flexibility.",
        "Caching behavior.",
        "GraphQL operational complexity.",
      ],
    },
  ];

  const selected = answers[selectedAnswer];

  const overallScore = useMemo(() => {
    return Math.round(
      answers.reduce(
        (sum, answer) => sum + answer.tradeOffScore,
        0
      ) / answers.length
    );
  }, []);

  const totalAlternatives = useMemo(() => {
    return answers.reduce(
      (sum, answer) => sum + answer.alternativesDiscussed,
      0
    );
  }, []);

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("analysis");
    }, 800);
  };

  const handlePractice = () => {
    setPracticing(true);

    setTimeout(() => {
      setPracticing(false);
      setActiveTab("practice");
    }, 700);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getRiskColor = (risk) => {
    if (risk === "Low") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (risk === "Moderate") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Scale
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Answer Trade-Off Analyzer
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Evaluate your technical decisions, compare alternatives,
              and learn how to communicate engineering trade-offs clearly.
            </p>
          </div>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <MessageSquare
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Answers Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              36
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <GitCompare
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Alternatives Compared
            </p>

            <p className="text-5xl font-black mt-3">
              {totalAlternatives}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Scale
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Trade-Off Score
            </p>

            <p className="text-5xl font-black mt-3">
              {overallScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Improvement
            </p>

            <p className="text-5xl font-black mt-3">
              +21%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Engineering Trade-Off Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            AI analyzes the solution you propose, identifies whether you
            considered meaningful alternatives, and evaluates trade-offs
            involving performance, scalability, complexity, cost,
            maintainability, reliability, and consistency.
          </p>

        </div>

        {/* Answer Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Search className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Answer
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {answers.map((answer, index) => (

              <button
                key={index}
                type="button"
                onClick={() => setSelectedAnswer(index)}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedAnswer === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-center justify-between gap-3">

                  <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                    {answer.type}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(
                      answer.riskLevel
                    )}`}
                  >
                    {answer.riskLevel}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {answer.question}
                </h3>

                <div className="flex items-center gap-2 mt-5">

                  <span
                    className={`font-bold ${getScoreColor(
                      answer.tradeOffScore
                    )}`}
                  >
                    {answer.tradeOffScore}%
                  </span>

                  <span className="text-sm text-gray-500">
                    trade-off score
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <p className="text-sm text-gray-500">
            Interview Question
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-3">
            {selected.question}
          </h2>

          <div className="flex flex-wrap gap-3 mt-5">

            <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
              {selected.type}
            </span>

            <span
              className={`px-4 py-2 rounded-full font-semibold ${getRiskColor(
                selected.riskLevel
              )}`}
            >
              {selected.riskLevel} Risk
            </span>

          </div>

        </div>

        {/* Analyze */}

        <div className="mt-8 flex justify-center">

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-violet-600 text-white font-bold text-lg hover:bg-violet-700 transition disabled:opacity-60"
          >

            {analyzing ? (
              <>
                <RefreshCw
                  size={22}
                  className="animate-spin"
                />
                Analyzing Trade-Offs...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Analyze Technical Trade-Offs
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Trade-Off Analysis"],
            ["original", "Original Answer"],
            ["comparison", "Solution Comparison"],
            ["alternatives", "Alternatives"],
            ["improved", "Improved Answer"],
            ["practice", "Practice"],
          ].map(([value, label]) => (

            <button
              key={value}
              type="button"
              onClick={() => setActiveTab(value)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === value
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Analysis */}

        {activeTab === "analysis" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Trade-Off Analysis Score
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="relative w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getScoreColor(
                        selected.tradeOffScore
                      )}`}
                    >
                      {selected.tradeOffScore}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {selected.tradeOffScore >= 85
                        ? "Excellent"
                        : selected.tradeOffScore >= 70
                        ? "Developing"
                        : "Needs Improvement"}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-violet-600"
                  style={{
                    width: `${selected.tradeOffScore}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                The score measures how effectively your answer compares
                alternatives and explains the consequences of your
                engineering decision.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <CircleAlert className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Missing Trade-Offs
                </h2>

              </div>

              <div className="text-center py-4">

                <p className="text-6xl font-black text-orange-500">
                  {selected.missingTradeoffs.length}
                </p>

                <p className="text-gray-500 mt-2">
                  areas could be discussed
                </p>

              </div>

              <div className="space-y-3 mt-5">

                {selected.missingTradeoffs.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 p-4"
                    >

                      <AlertTriangle
                        size={18}
                        className="text-orange-500 shrink-0"
                      />

                      <span className="font-semibold">
                        {item}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>
        )}

        {/* Original */}

        {activeTab === "original" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-6">

              <MessageSquare className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Original Answer
              </h2>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.original}
              </p>

            </div>

            <div className="mt-7 grid sm:grid-cols-3 gap-5">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Trade-Off Score
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.tradeOffScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Alternatives
                </p>

                <p className="text-3xl font-black text-violet-600 mt-2">
                  {selected.alternativesDiscussed}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="text-xl font-black text-orange-500 mt-3">
                  {selected.tradeOffScore >= 80
                    ? "Strong"
                    : "Needs Improvement"}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Comparison */}

        {activeTab === "comparison" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <GitCompare className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Engineering Trade-Off Comparison
              </h2>

            </div>

            <div className="space-y-6">

              {selected.tradeoffs.map(
                (item, index) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                            <Icon
                              size={22}
                              className="text-violet-600"
                            />

                          </div>

                          <h3 className="text-xl font-bold">
                            {item.category}
                          </h3>

                        </div>

                        <span className="text-2xl font-black text-violet-600">
                          {item.score}%
                        </span>

                      </div>

                      <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                          style={{
                            width: `${item.score}%`,
                          }}
                        />

                      </div>

                      <div className="grid md:grid-cols-2 gap-5 mt-6">

                        <div className="rounded-xl bg-green-50 dark:bg-green-900/10 p-5">

                          <p className="text-sm font-semibold text-green-600">
                            Advantage
                          </p>

                          <p className="mt-2 leading-6">
                            {item.advantage}
                          </p>

                        </div>

                        <div className="rounded-xl bg-red-50 dark:bg-red-900/10 p-5">

                          <p className="text-sm font-semibold text-red-600">
                            Disadvantage
                          </p>

                          <p className="mt-2 leading-6">
                            {item.disadvantage}
                          </p>

                        </div>

                      </div>

                      <div className="mt-5 rounded-xl bg-blue-50 dark:bg-blue-900/10 p-5">

                        <p className="text-sm font-semibold text-blue-600">
                          Engineering Decision
                        </p>

                        <p className="mt-2 leading-6">
                          {item.decision}
                        </p>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>
        )}

        {/* Alternatives */}

        {activeTab === "alternatives" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <GitCompare className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                AI Recommended Alternatives
              </h2>

            </div>

            <div className="space-y-5">

              {selected.alternatives.map(
                (item, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                      <div>

                        <p className="text-sm text-gray-500">
                          Alternative {index + 1}
                        </p>

                        <h3 className="text-xl font-bold mt-1">
                          {item.name}
                        </h3>

                      </div>

                      <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold">
                        Alternative Approach
                      </span>

                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mt-6">

                      <div className="rounded-xl bg-green-50 dark:bg-green-900/10 p-5">

                        <p className="text-sm font-semibold text-green-600">
                          Advantages
                        </p>

                        <p className="mt-2 leading-6">
                          {item.advantage}
                        </p>

                      </div>

                      <div className="rounded-xl bg-red-50 dark:bg-red-900/10 p-5">

                        <p className="text-sm font-semibold text-red-600">
                          Disadvantages
                        </p>

                        <p className="mt-2 leading-6">
                          {item.disadvantage}
                        </p>

                      </div>

                    </div>

                    <div className="mt-5 rounded-xl bg-gray-50 dark:bg-gray-800 p-5">

                      <p className="text-sm text-gray-500">
                        Best Used For
                      </p>

                      <p className="mt-2 font-semibold">
                        {item.bestFor}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>
        )}

        {/* Improved */}

        {activeTab === "improved" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center justify-between gap-5 mb-6">

              <div className="flex items-center gap-3">

                <ShieldCheck className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Improved Trade-Off Explanation
                </h2>

              </div>

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-semibold">
                AI Improved
              </span>

            </div>

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.improved}
              </p>

            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-5">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Original Score
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.tradeOffScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Improved Score
                </p>

                <p className="text-3xl font-black text-green-600 mt-2">
                  {Math.min(
                    selected.tradeOffScore + 25,
                    99
                  )}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Improvement
                </p>

                <p className="text-3xl font-black text-violet-600 mt-2">
                  +
                  {Math.min(
                    25,
                    99 - selected.tradeOffScore
                  )}
                  %
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Practice */}

        {activeTab === "practice" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Mic className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Practice Trade-Off Reasoning
                </h2>

              </div>

              <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

                <p className="text-sm text-gray-500">
                  Practice Question
                </p>

                <p className="text-xl font-bold mt-3 leading-8">
                  {selected.question}
                </p>

                <p className="text-gray-500 mt-4 leading-6">
                  Explain your chosen solution, then compare it with at
                  least one alternative and describe when you would choose
                  each approach.
                </p>

              </div>

              <button
                type="button"
                onClick={handlePractice}
                disabled={practicing}
                className="w-full mt-6 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-violet-600 text-white font-bold hover:bg-violet-700 disabled:opacity-60"
              >

                {practicing ? (
                  <>
                    <RefreshCw
                      size={20}
                      className="animate-spin"
                    />
                    Preparing Practice...
                  </>
                ) : (
                  <>
                    <Mic size={20} />
                    Start Trade-Off Practice
                  </>
                )}

              </button>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Trade-Off Checklist
                </h2>

              </div>

              <div className="space-y-4">

                {[
                  "State your proposed solution.",
                  "Explain why you selected it.",
                  "Mention at least one alternative.",
                  "Compare performance and complexity.",
                  "Discuss scalability and cost.",
                  "Explain maintainability and reliability.",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="flex gap-4 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5"
                  >

                    <CheckCircle2
                      className="text-green-600 shrink-0"
                      size={22}
                    />

                    <p className="leading-6">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">
              What You Are Already Doing Well
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            {selected.strengths.map(
              (strength, index) => (

                <div
                  key={index}
                  className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6"
                >

                  <CheckCircle2
                    className="text-green-600"
                    size={24}
                  />

                  <p className="font-semibold mt-4 leading-6">
                    {strength}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

        {/* Trade-Off Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Trade-Off Categories
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Performance",
                score: 91,
                example: "Latency and throughput",
                icon: "⚡",
              },
              {
                title: "Scalability",
                score: 84,
                example: "Growth and traffic",
                icon: "📈",
              },
              {
                title: "Maintainability",
                score: 76,
                example: "Complexity and operations",
                icon: "🛠️",
              },
              {
                title: "Reliability",
                score: 81,
                example: "Failures and recovery",
                icon: "🛡️",
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

                <p className="text-3xl font-black text-violet-600 mt-3">
                  {item.score}%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {item.example}
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Common Trade-Offs */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Common Engineering Trade-Offs
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-200 dark:border-white/10">

                  <th className="p-4">
                    Trade-Off
                  </th>

                  <th className="p-4">
                    Option A
                  </th>

                  <th className="p-4">
                    Option B
                  </th>

                  <th className="p-4">
                    Consider When
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  [
                    "Performance vs Cost",
                    "Higher performance",
                    "Lower infrastructure cost",
                    "Budget and latency requirements differ.",
                  ],
                  [
                    "Consistency vs Availability",
                    "Strong consistency",
                    "Higher availability",
                    "Distributed systems have failure scenarios.",
                  ],
                  [
                    "Simplicity vs Flexibility",
                    "Simple architecture",
                    "More configurable architecture",
                    "Requirements may change over time.",
                  ],
                  [
                    "SQL vs NoSQL",
                    "Relationships and transactions",
                    "Flexible scaling and schema",
                    "Data model and access patterns matter.",
                  ],
                  [
                    "Caching vs Freshness",
                    "Fast cached reads",
                    "Always-fresh data",
                    "Staleness tolerance is important.",
                  ],
                ].map((row, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-white/5"
                  >

                    <td className="p-4 font-semibold text-violet-600">
                      {row[0]}
                    </td>

                    <td className="p-4">
                      {row[1]}
                    </td>

                    <td className="p-4">
                      {row[2]}
                    </td>

                    <td className="p-4 text-gray-500">
                      {row[3]}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Trade-Off Reasoning Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 59,
              },
              {
                label: "Week 2",
                score: 67,
              },
              {
                label: "Week 3",
                score: 74,
              },
              {
                label: "Current",
                score: overallScore,
              },
            ].map((item) => (

              <div
                key={item.label}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center"
              >

                <p className="text-sm text-gray-500">
                  {item.label}
                </p>

                <p className="text-4xl font-black text-violet-600 mt-3">
                  {item.score}%
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                  <div
                    className="h-full bg-violet-600 rounded-full"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Personalized Recommendation
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Current Strength
              </p>

              <h3 className="text-xl font-bold mt-2">
                Solution Selection
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                You can identify practical technical solutions. The next
                step is explaining why your choice is preferable under
                specific constraints.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Compare Alternatives
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Interviewers want to understand why you selected one
                approach instead of another. Mention at least one realistic
                alternative.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Explain Consequences
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Practice connecting each engineering decision to its
                impact on performance, cost, scalability, reliability,
                and maintainability.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Trade-Off Analysis Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your technical decision-making is developing. Continue
                comparing alternatives and explain why your chosen approach
                is appropriate for the given requirements.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {overallScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Developing
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
              style={{
                width: `${overallScore}%`,
              }}
            />

          </div>

        </div>

        {/* Final AI Insight */}

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
                A strong technical interview answer does not simply present
                a solution. It explains why that solution is appropriate,
                what alternatives were considered, and what is sacrificed
                by choosing one approach over another. When discussing
                trade-offs, connect your decision to concrete requirements
                such as performance, scalability, reliability, cost,
                complexity, and maintainability.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                ⚖️
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Trade-Offs
              </h3>

              <p className="text-5xl font-black">
                {overallScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

/*
  Small local icon fallback used by the API Design example.
  Keeping it here avoids adding another dependency.
*/
const SettingsIcon = ({ size = 24, className = "" }) => (
  <Wrench size={size} className={className} />
);

export default AIInterviewAnswerTradeOffAnalyzer;