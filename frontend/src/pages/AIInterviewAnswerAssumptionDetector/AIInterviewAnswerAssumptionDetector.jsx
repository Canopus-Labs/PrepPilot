import React, { useMemo, useState } from "react";
import {
  Brain,
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
  CircleAlert,
  BookOpen,
  Mic,
  BarChart3,
  HelpCircle,
  Settings2,
  SlidersHorizontal,
} from "lucide-react";

const AIInterviewAnswerAssumptionDetector = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);
  const [practicing, setPracticing] = useState(false);

  const answers = [
    {
      question:
        "How would you find the largest element in an array?",
      type: "Algorithms",
      awarenessScore: 62,
      assumptionCount: 4,
      riskLevel: "Moderate",

      answer:
        "I would iterate through the array and keep track of the largest value. I would initialize the maximum with the first element and compare every other element against it.",

      improved:
        "Assuming the input is a non-empty array of comparable numeric values, I would initialize the maximum with the first element and scan the remaining elements once. For each element, I would update the maximum when a larger value is found. The time complexity is O(n) and the extra space is O(1).",

      assumptions: [
        {
          assumption: "The array is not empty.",
          impact: "High",
          category: "Input Constraint",
          explanation:
            "Initializing the maximum with the first element fails if the array contains no elements.",
          clarification:
            "What should the algorithm return when the input array is empty?",
          recommendation:
            "Explicitly state whether the input is guaranteed to contain at least one element.",
        },
        {
          assumption: "All elements are comparable.",
          impact: "Medium",
          category: "Data Constraint",
          explanation:
            "The comparison operation requires the elements to have a meaningful ordering.",
          clarification:
            "Are all values guaranteed to be numeric or otherwise comparable?",
          recommendation:
            "Mention the expected data type and comparison rule.",
        },
        {
          assumption: "The input fits in memory.",
          impact: "Low",
          category: "Environment",
          explanation:
            "The approach assumes the complete array is available for iteration.",
          clarification:
            "Is the entire dataset available in memory?",
          recommendation:
            "Mention memory constraints when the input may be extremely large.",
        },
        {
          assumption: "A single maximum value is sufficient.",
          impact: "Low",
          category: "Requirement",
          explanation:
            "The solution returns the largest value but does not address duplicate maximum values or their positions.",
          clarification:
            "Do you need the maximum value, its index, or all positions containing it?",
          recommendation:
            "Clarify the exact expected output.",
        },
      ],

      strengths: [
        "Uses a single-pass approach.",
        "Correctly identifies the need to track a running maximum.",
        "The approach can be implemented with O(1) extra space.",
      ],

      constraints: [
        "Input should be non-empty.",
        "Elements should be comparable.",
        "Expected output should be clearly defined.",
      ],

      questions: [
        "Can the input array be empty?",
        "What data types can the array contain?",
        "Do you need the value or its position?",
      ],
    },

    {
      question:
        "Design a URL shortener system.",
      type: "System Design",
      awarenessScore: 71,
      assumptionCount: 5,
      riskLevel: "High",

      answer:
        "I would create an API that receives a long URL and generates a short ID. The short ID would be stored with the original URL in a database. When someone opens the short URL, the service looks up the original URL and redirects the user.",

      improved:
        "I would first clarify the expected traffic, URL lifetime, uniqueness requirements, read/write ratio, and availability targets. Assuming high read traffic, persistent URLs, and globally unique short codes, I would use a stateless API layer, a scalable database, a unique ID-generation strategy, caching for frequently accessed URLs, and rate limiting to prevent abuse.",

      assumptions: [
        {
          assumption: "The service must support high traffic.",
          impact: "High",
          category: "Scale",
          explanation:
            "Architecture choices such as caching and horizontal scaling depend heavily on expected traffic.",
          clarification:
            "How many URL creation and redirect requests are expected per second?",
          recommendation:
            "State expected request volume and growth before selecting infrastructure.",
        },
        {
          assumption: "Short URLs never expire.",
          impact: "Medium",
          category: "Business Requirement",
          explanation:
            "URL expiration changes storage, cleanup, and redirect behavior.",
          clarification:
            "Should shortened URLs remain valid permanently?",
          recommendation:
            "Clarify URL lifetime and deletion requirements.",
        },
        {
          assumption: "Short codes must be globally unique.",
          impact: "High",
          category: "Data Constraint",
          explanation:
            "The ID-generation strategy depends on whether uniqueness is global or scoped.",
          clarification:
            "Must every short code be globally unique?",
          recommendation:
            "Define uniqueness requirements before designing ID generation.",
        },
        {
          assumption: "Redirect latency should be low.",
          impact: "Medium",
          category: "Performance",
          explanation:
            "Caching and database selection depend on the expected latency target.",
          clarification:
            "What response time should the redirect endpoint achieve?",
          recommendation:
            "Include latency requirements in the system design.",
        },
        {
          assumption: "Users are allowed to shorten any URL.",
          impact: "High",
          category: "Security",
          explanation:
            "A production URL shortener needs policies for malicious or restricted URLs.",
          clarification:
            "Should the system validate or block unsafe URLs?",
          recommendation:
            "Mention validation, abuse prevention, and rate limiting.",
        },
      ],

      strengths: [
        "Identifies the core create-and-redirect workflow.",
        "Recognizes the need to persist the URL mapping.",
        "Understands that short IDs are required.",
      ],

      constraints: [
        "Expected traffic and growth.",
        "URL expiration policy.",
        "Global uniqueness requirements.",
        "Redirect latency target.",
        "Abuse and security requirements.",
      ],

      questions: [
        "How much traffic should the system support?",
        "How long should shortened URLs remain active?",
        "What availability and latency targets are required?",
      ],
    },

    {
      question:
        "How would you implement a cache for an application?",
      type: "Backend",
      awarenessScore: 78,
      assumptionCount: 3,
      riskLevel: "Moderate",

      answer:
        "I would use a key-value cache such as Redis. Before querying the database, the application checks the cache. If the value exists, it returns the cached result. Otherwise, it queries the database and stores the result in the cache.",

      improved:
        "Assuming the cached data can tolerate some staleness, I would use a key-value cache such as Redis. The application would check the cache first, fall back to the database on a miss, populate the cache, and apply an expiration policy. I would also define cache invalidation behavior and consider what should happen if the cache becomes unavailable.",

      assumptions: [
        {
          assumption: "Some stale data is acceptable.",
          impact: "High",
          category: "Consistency",
          explanation:
            "Caching can return outdated data unless invalidation or freshness requirements are defined.",
          clarification:
            "How fresh must cached data be?",
          recommendation:
            "Specify consistency and staleness requirements.",
        },
        {
          assumption: "The cache can be unavailable without breaking the application.",
          impact: "Medium",
          category: "Reliability",
          explanation:
            "The application needs a fallback strategy when the cache service fails.",
          clarification:
            "What should happen when the cache is unavailable?",
          recommendation:
            "Describe cache failure handling and database fallback behavior.",
        },
        {
          assumption: "Cached values can expire.",
          impact: "Medium",
          category: "Data Lifecycle",
          explanation:
            "Without expiration or invalidation, stale data may remain indefinitely.",
          clarification:
            "How long should cached values remain valid?",
          recommendation:
            "Define TTL or explicit invalidation rules.",
        },
      ],

      strengths: [
        "Understands the cache-aside pattern.",
        "Correctly identifies cache hits and misses.",
        "Recognizes the need to populate the cache after a database lookup.",
      ],

      constraints: [
        "Data freshness requirements.",
        "Cache failure behavior.",
        "Expiration or invalidation policy.",
      ],

      questions: [
        "How much stale data is acceptable?",
        "What should happen if Redis goes down?",
        "How long should cached values remain valid?",
      ],
    },
  ];

  const selected = answers[selectedAnswer];

  const overallScore = useMemo(() => {
    return Math.round(
      answers.reduce(
        (sum, answer) => sum + answer.awarenessScore,
        0
      ) / answers.length
    );
  }, []);

  const totalAssumptions = useMemo(() => {
    return answers.reduce(
      (sum, answer) => sum + answer.assumptionCount,
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
    }, 600);
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

  const getImpactColor = (impact) => {
    if (impact === "High") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    if (impact === "Medium") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Settings2
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Answer Assumption Detector
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Identify hidden assumptions, clarify missing constraints,
              and build more robust technical interview answers.
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
              34
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Assumptions Found
            </p>

            <p className="text-5xl font-black mt-3">
              {totalAssumptions}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <ShieldCheck
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Awareness Score
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
              +18%
            </p>
          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Assumption Awareness Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            AI analyzes your interview answer for assumptions about input
            size, constraints, environment, requirements, performance,
            consistency, and system behavior. It explains which assumptions
            matter and suggests what you should clarify before presenting
            your solution.
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
                      answer.awarenessScore
                    )}`}
                  >
                    {answer.awarenessScore}%
                  </span>

                  <span className="text-sm text-gray-500">
                    awareness
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

        {/* Analyze Button */}

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
                Detecting Assumptions...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Analyze Answer Assumptions
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Assumption Analysis"],
            ["answer", "Original Answer"],
            ["assumptions", "Detected Assumptions"],
            ["clarifications", "Clarifications"],
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
                  Assumption Awareness Score
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="relative w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getScoreColor(
                        selected.awarenessScore
                      )}`}
                    >
                      {selected.awarenessScore}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      Awareness
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-violet-600"
                  style={{
                    width: `${selected.awarenessScore}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                This score measures how clearly your answer identifies
                important conditions, constraints, requirements, and
                assumptions that could affect the solution.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <CircleAlert className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Assumption Summary
                </h2>

              </div>

              <div className="text-center py-4">

                <p className="text-6xl font-black text-orange-500">
                  {selected.assumptionCount}
                </p>

                <p className="text-gray-500 mt-2">
                  assumptions detected
                </p>

              </div>

              <div className="space-y-3 mt-5">

                {selected.assumptions.slice(0, 4).map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 p-4"
                    >

                      <div className="flex items-center gap-3">

                        <AlertTriangle
                          size={18}
                          className="text-orange-500 shrink-0"
                        />

                        <span className="font-semibold">
                          {item.category}
                        </span>

                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getImpactColor(
                          item.impact
                        )}`}
                      >
                        {item.impact}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>
        )}

        {/* Original Answer */}

        {activeTab === "answer" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-6">

              <MessageSquare className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Original Answer
              </h2>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.answer}
              </p>

            </div>

            <div className="mt-7 grid sm:grid-cols-3 gap-5">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Awareness
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.awarenessScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Assumptions
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.assumptionCount}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Risk
                </p>

                <p className="text-xl font-black text-orange-500 mt-3">
                  {selected.riskLevel}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Detected Assumptions */}

        {activeTab === "assumptions" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <AlertTriangle className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Detected Assumptions
              </h2>

            </div>

            <div className="space-y-5">

              {selected.assumptions.map(
                (item, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <span className="text-sm font-semibold text-gray-500">
                            Assumption {index + 1}
                          </span>

                          <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-xs font-semibold">
                            {item.category}
                          </span>

                        </div>

                        <h3 className="text-xl font-bold mt-3">
                          {item.assumption}
                        </h3>

                      </div>

                      <span
                        className={`px-4 py-2 rounded-full font-bold self-start ${getImpactColor(
                          item.impact
                        )}`}
                      >
                        {item.impact} Impact
                      </span>

                    </div>

                    <div className="mt-6 grid md:grid-cols-2 gap-5">

                      <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-5">

                        <p className="text-sm text-gray-500">
                          Why It Matters
                        </p>

                        <p className="mt-2 leading-6">
                          {item.explanation}
                        </p>

                      </div>

                      <div className="rounded-xl bg-blue-50 dark:bg-blue-900/10 p-5">

                        <p className="text-sm text-gray-500">
                          Recommended Action
                        </p>

                        <p className="mt-2 leading-6">
                          {item.recommendation}
                        </p>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>
        )}

        {/* Clarifications */}

        {activeTab === "clarifications" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <HelpCircle className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Questions You Should Clarify
                </h2>

              </div>

              <div className="space-y-4">

                {selected.assumptions.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-5"
                    >

                      <div className="flex gap-4">

                        <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">

                          <span className="font-bold text-blue-600">
                            {index + 1}
                          </span>

                        </div>

                        <div>

                          <p className="text-sm text-gray-500">
                            {item.category}
                          </p>

                          <p className="font-bold text-lg mt-1 leading-7">
                            {item.clarification}
                          </p>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <SlidersHorizontal className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Important Constraints
                </h2>

              </div>

              <div className="space-y-4">

                {selected.constraints.map(
                  (constraint, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5"
                    >

                      <CheckCircle2
                        className="text-violet-600 shrink-0"
                        size={22}
                      />

                      <p className="font-semibold">
                        {constraint}
                      </p>

                    </div>

                  )
                )}

              </div>

              <div className="mt-7 rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-6">

                <div className="flex items-center gap-3">

                  <Lightbulb
                    className="text-violet-600"
                    size={22}
                  />

                  <p className="font-bold">
                    Interview Tip
                  </p>

                </div>

                <p className="text-gray-500 mt-3 leading-6">
                  Before solving a technical problem, clarify the
                  requirements and explicitly state assumptions that
                  materially affect your solution.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Improved Answer */}

        {activeTab === "improved" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center justify-between gap-5 mb-6">

              <div className="flex items-center gap-3">

                <ShieldCheck className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Assumption-Aware Answer
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
                  Original Awareness
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.awarenessScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Improved Awareness
                </p>

                <p className="text-3xl font-black text-green-600 mt-2">
                  {Math.min(
                    selected.awarenessScore + 28,
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
                    28,
                    99 - selected.awarenessScore
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
                  Practice Assumption Awareness
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
                  Before answering, identify the assumptions and
                  constraints you would clarify with the interviewer.
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
                    Start Practice
                  </>
                )}

              </button>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Practice Checklist
                </h2>

              </div>

              <div className="space-y-4">

                {[
                  "Clarify the expected input.",
                  "Ask about important constraints.",
                  "Confirm expected output.",
                  "Consider scale and performance.",
                  "Identify environment assumptions.",
                  "Mention edge cases.",
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

        {/* Assumption Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Assumption Awareness Categories
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Input Constraints",
                score: 74,
                example: "Size, type, format",
                icon: "📥",
              },
              {
                title: "Requirements",
                score: 81,
                example: "Expected behavior",
                icon: "🎯",
              },
              {
                title: "Environment",
                score: 67,
                example: "Memory, infrastructure",
                icon: "🖥️",
              },
              {
                title: "Edge Cases",
                score: 59,
                example: "Empty or invalid inputs",
                icon: "⚠️",
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

        {/* Before vs After */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Assumption Awareness Improvement
            </h2>

          </div>

          <div className="space-y-8">

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Original answer
                </span>

                <span className="font-black text-orange-500">
                  {selected.awarenessScore}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                  style={{
                    width: `${selected.awarenessScore}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Assumption-aware answer
                </span>

                <span className="font-black text-green-600">
                  {Math.min(
                    selected.awarenessScore + 28,
                    99
                  )}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  style={{
                    width: `${Math.min(
                      selected.awarenessScore + 28,
                      99
                    )}%`,
                  }}
                />

              </div>

            </div>

          </div>

          <div className="mt-8 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

            <div className="flex items-center gap-3">

              <TrendingUp
                size={22}
                className="text-green-600"
              />

              <p className="font-bold">
                Potential improvement: +
                {Math.min(
                  28,
                  99 - selected.awarenessScore
                )}
                %
              </p>

            </div>

          </div>

        </div>

        {/* AI Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Assumption Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🔍
              </p>

              <h3 className="text-xl font-bold mt-4">
                Clarify Requirements
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Ask questions about input, output, constraints, scale,
                and expected behavior before committing to a solution.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                State Important Assumptions
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Explicitly mention assumptions that materially affect
                correctness, complexity, or architecture.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                💡
              </p>

              <h3 className="text-xl font-bold mt-4">
                Think About Edge Cases
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Consider empty inputs, unusual values, failures, scale,
                and unexpected system behavior.
              </p>

            </div>

          </div>

        </div>

        {/* Common Assumption Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Common Assumptions to Check
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-200 dark:border-white/10">

                  <th className="p-4">
                    Category
                  </th>

                  <th className="p-4">
                    Example Assumption
                  </th>

                  <th className="p-4">
                    Question to Ask
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  [
                    "Input",
                    "Input is never empty.",
                    "Can the input be empty?",
                  ],
                  [
                    "Constraints",
                    "Input size is small.",
                    "What is the maximum input size?",
                  ],
                  [
                    "Performance",
                    "O(n²) is acceptable.",
                    "What are the latency requirements?",
                  ],
                  [
                    "Environment",
                    "All data fits in memory.",
                    "Are there memory limitations?",
                  ],
                  [
                    "Requirements",
                    "Only one result is required.",
                    "What exactly should the output contain?",
                  ],
                  [
                    "Reliability",
                    "External services are always available.",
                    "What happens when a dependency fails?",
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

                    <td className="p-4 text-gray-500">
                      {row[2]}
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
              Assumption Awareness Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 58,
              },
              {
                label: "Week 2",
                score: 65,
              },
              {
                label: "Week 3",
                score: 73,
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
                Problem Solving
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your solutions generally follow a reasonable approach.
                The next step is making the conditions behind those
                solutions explicit.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Requirement Clarification
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Ask about input constraints, expected output, scale,
                performance, and edge cases before finalizing your answer.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                State Your Assumptions
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Practice adding one or two important assumptions to every
                technical answer without making the explanation unnecessarily
                complicated.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Assumption Awareness Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your assumption awareness is developing. Continue
                practicing requirement clarification and explicitly
                identifying constraints that could affect your solution.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {overallScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Developing Awareness
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
                Strong interview answers are not only about finding the
                correct solution. They also show that you understand the
                conditions under which your solution works. Before solving
                a problem, clarify important requirements, identify
                assumptions that affect correctness, and mention relevant
                constraints. This demonstrates analytical thinking and
                makes your answer more robust and practical.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Awareness
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

export default AIInterviewAnswerAssumptionDetector;