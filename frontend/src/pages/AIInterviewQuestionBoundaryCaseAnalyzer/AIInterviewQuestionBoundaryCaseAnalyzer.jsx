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
  BarChart3,
  Bug,
  Code2,
  CircleAlert,
  TestTube2,
  Check,
  X,
  Play,
  ListChecks,
  Zap,
  Database,
} from "lucide-react";

const AIInterviewQuestionBoundaryCaseAnalyzer = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const questions = [
    {
      question:
        "Find the maximum element in an array of integers.",
      type: "Array / Algorithms",
      difficulty: "Easy",
      robustnessScore: 72,
      boundaryCases: 6,
      coveredCases: 3,

      constraints: [
        "Array may contain positive and negative integers.",
        "The array may contain duplicate values.",
        "The input array should contain at least one element.",
        "The solution should run in O(n) time.",
      ],

      solution:
        "Initialize the maximum value using the first element, then iterate through the remaining elements and update the maximum whenever a larger value is found.",

      boundaryCasesList: [
        {
          title: "Single Element",
          input: "[7]",
          expected: "7",
          severity: "High",
          category: "Minimum Input",
          explanation:
            "Tests whether the algorithm handles the smallest valid input without accessing an invalid index.",
        },
        {
          title: "All Negative Values",
          input: "[-8, -3, -15, -2]",
          expected: "-2",
          severity: "High",
          category: "Negative Values",
          explanation:
            "Prevents incorrect implementations that initialize the maximum to zero.",
        },
        {
          title: "Duplicate Maximum",
          input: "[4, 9, 2, 9, 1]",
          expected: "9",
          severity: "Medium",
          category: "Duplicates",
          explanation:
            "Checks that repeated maximum values are handled correctly.",
        },
        {
          title: "Already Sorted",
          input: "[1, 3, 5, 8, 10]",
          expected: "10",
          severity: "Medium",
          category: "Ordering",
          explanation:
            "Validates the algorithm when the maximum appears at the end.",
        },
        {
          title: "Reverse Sorted",
          input: "[10, 8, 5, 3, 1]",
          expected: "10",
          severity: "Medium",
          category: "Ordering",
          explanation:
            "Checks whether the algorithm correctly preserves the first maximum.",
        },
        {
          title: "Maximum at Middle",
          input: "[2, 4, 15, 3, 7]",
          expected: "15",
          severity: "Low",
          category: "Position",
          explanation:
            "Ensures the algorithm can discover a maximum regardless of its position.",
        },
      ],

      commonMistakes: [
        "Initializing the maximum value to 0.",
        "Failing on arrays containing only negative values.",
        "Starting iteration from an incorrect index.",
      ],

      strengths: [
        "Uses a linear traversal strategy.",
        "Matches the required O(n) time complexity.",
        "Correctly updates the maximum during traversal.",
      ],
    },

    {
      question:
        "Check whether a string is a palindrome.",
      type: "Strings",
      difficulty: "Easy",
      robustnessScore: 78,
      boundaryCases: 7,
      coveredCases: 4,

      constraints: [
        "The input may contain one or more characters.",
        "Case sensitivity should be considered according to the question.",
        "The string may contain repeated characters.",
        "The solution should avoid unnecessary nested loops.",
      ],

      solution:
        "Use two pointers from the beginning and end of the string and compare corresponding characters while moving both pointers toward the center.",

      boundaryCasesList: [
        {
          title: "Single Character",
          input: '"a"',
          expected: "true",
          severity: "High",
          category: "Minimum Input",
          explanation:
            "A one-character string is always a palindrome and tests the smallest valid input.",
        },
        {
          title: "Two Different Characters",
          input: '"ab"',
          expected: "false",
          severity: "High",
          category: "Small Input",
          explanation:
            "Tests the earliest possible non-palindrome case.",
        },
        {
          title: "Even Length Palindrome",
          input: '"abba"',
          expected: "true",
          severity: "High",
          category: "Length",
          explanation:
            "Checks matching pairs when there is no center character.",
        },
        {
          title: "Odd Length Palindrome",
          input: '"racecar"',
          expected: "true",
          severity: "High",
          category: "Length",
          explanation:
            "Validates handling of a center character.",
        },
        {
          title: "Case Difference",
          input: '"Racecar"',
          expected: "Depends on rules",
          severity: "Medium",
          category: "Case",
          explanation:
            "Forces the candidate to clarify whether comparison is case-sensitive.",
        },
        {
          title: "Repeated Characters",
          input: '"aaaa"',
          expected: "true",
          severity: "Medium",
          category: "Duplicates",
          explanation:
            "Tests whether repeated values are processed correctly.",
        },
        {
          title: "Almost Palindrome",
          input: '"racecarx"',
          expected: "false",
          severity: "Low",
          category: "Near Boundary",
          explanation:
            "Checks whether a single mismatch is detected correctly.",
        },
      ],

      commonMistakes: [
        "Ignoring case requirements.",
        "Incorrectly handling even-length strings.",
        "Comparing only half of the string incorrectly.",
      ],

      strengths: [
        "Two-pointer approach is efficient.",
        "Works for both odd and even lengths.",
        "Provides O(n) time complexity.",
      ],
    },

    {
      question:
        "Find two numbers in an array that add up to a target.",
      type: "Hashing / Arrays",
      difficulty: "Medium",
      robustnessScore: 69,
      boundaryCases: 8,
      coveredCases: 3,

      constraints: [
        "The array may contain positive and negative integers.",
        "Duplicate values may exist.",
        "There may be no valid pair.",
        "The expected solution should be approximately O(n).",
      ],

      solution:
        "Use a hash map to store previously seen values and check whether target minus the current value has already been encountered.",

      boundaryCasesList: [
        {
          title: "No Pair Exists",
          input: "[1, 2, 3], target = 10",
          expected: "No pair",
          severity: "High",
          category: "No Solution",
          explanation:
            "Ensures the implementation handles unsuccessful searches gracefully.",
        },
        {
          title: "Duplicate Values",
          input: "[3, 3], target = 6",
          expected: "[3, 3]",
          severity: "High",
          category: "Duplicates",
          explanation:
            "Tests whether two occurrences of the same value can form the answer.",
        },
        {
          title: "Negative Numbers",
          input: "[-4, 7, 2, -2], target = -6",
          expected: "[-4, -2]",
          severity: "High",
          category: "Negative Values",
          explanation:
            "Prevents solutions that incorrectly assume all numbers are positive.",
        },
        {
          title: "Zero Pair",
          input: "[0, 0], target = 0",
          expected: "[0, 0]",
          severity: "High",
          category: "Zero",
          explanation:
            "Tests duplicate zeros and target-zero behavior.",
        },
        {
          title: "Single Element",
          input: "[5], target = 5",
          expected: "No pair",
          severity: "Medium",
          category: "Minimum Input",
          explanation:
            "A single element cannot form a pair with itself unless explicitly allowed.",
        },
        {
          title: "Pair at Beginning",
          input: "[4, 6, 10], target = 10",
          expected: "[4, 6]",
          severity: "Medium",
          category: "Position",
          explanation:
            "Tests whether the algorithm recognizes an early valid pair.",
        },
        {
          title: "Pair at End",
          input: "[1, 8, 5, 7], target = 12",
          expected: "[5, 7]",
          severity: "Medium",
          category: "Position",
          explanation:
            "Ensures the search continues until the end when necessary.",
        },
        {
          title: "Large Magnitude",
          input: "[1000000000, -1000000000], target = 0",
          expected: "Pair exists",
          severity: "Low",
          category: "Integer Range",
          explanation:
            "Tests whether numeric handling remains correct for large values.",
        },
      ],

      commonMistakes: [
        "Using nested loops and exceeding O(n) expectations.",
        "Using the same element twice.",
        "Ignoring negative numbers or duplicates.",
        "Not handling the no-solution case.",
      ],

      strengths: [
        "Hash-map approach supports near O(n) time.",
        "Can handle negative values.",
        "Works efficiently with large inputs.",
      ],
    },
  ];

  const selected = questions[selectedQuestion];

  const overallScore = useMemo(() => {
    return Math.round(
      questions.reduce(
        (sum, question) => sum + question.robustnessScore,
        0
      ) / questions.length
    );
  }, []);

  const totalBoundaryCases = useMemo(() => {
    return questions.reduce(
      (sum, question) => sum + question.boundaryCases,
      0
    );
  }, []);

  const totalCoveredCases = useMemo(() => {
    return questions.reduce(
      (sum, question) => sum + question.coveredCases,
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

  const handleRunTests = () => {
    setTesting(true);

    setTimeout(() => {
      setTesting(false);
      setTestResults({
        passed: selected.coveredCases,
        failed:
          selected.boundaryCases - selected.coveredCases,
      });
      setActiveTab("tests");
    }, 900);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getSeverityColor = (severity) => {
    if (severity === "High") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    if (severity === "Medium") {
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
            <Bug
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Question Boundary Case Analyzer
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Discover unusual inputs, hidden constraints, and edge cases
              that can make your interview solution more robust.
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
              Questions Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              42
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Boundary Cases
            </p>

            <p className="text-5xl font-black mt-3">
              {totalBoundaryCases}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ShieldCheck
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Robustness Score
            </p>

            <p className="text-5xl font-black mt-3">
              {overallScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Cases Covered
            </p>

            <p className="text-5xl font-black mt-3">
              {totalCoveredCases}
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Boundary Case Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            AI analyzes interview questions and their constraints to
            identify minimum inputs, maximum values, duplicates, empty
            cases, negative values, unusual ordering, invalid assumptions,
            and other scenarios that can expose weaknesses in a solution.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Search className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {questions.map((question, index) => (

              <button
                key={index}
                type="button"
                onClick={() => {
                  setSelectedQuestion(index);
                  setTestResults(null);
                }}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-center justify-between gap-3">

                  <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                    {question.type}
                  </span>

                  <span className="text-xs font-bold text-gray-500">
                    {question.difficulty}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {question.question}
                </h3>

                <div className="flex items-center gap-2 mt-5">

                  <span
                    className={`font-bold ${getScoreColor(
                      question.robustnessScore
                    )}`}
                  >
                    {question.robustnessScore}%
                  </span>

                  <span className="text-sm text-gray-500">
                    robustness
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

            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
              {selected.difficulty}
            </span>

            <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
              {selected.boundaryCases} boundary cases
            </span>

          </div>

        </div>

        {/* Analyze Button */}

        <div className="mt-8 flex flex-wrap justify-center gap-4">

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
                Analyzing Boundary Cases...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Analyze Boundary Cases
              </>
            )}

          </button>

          <button
            type="button"
            onClick={handleRunTests}
            disabled={testing}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-green-600 text-white font-bold text-lg hover:bg-green-700 transition disabled:opacity-60"
          >

            {testing ? (
              <>
                <RefreshCw
                  size={22}
                  className="animate-spin"
                />
                Running Test Cases...
              </>
            ) : (
              <>
                <Play size={22} />
                Validate Solution
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Boundary Analysis"],
            ["cases", "Boundary Cases"],
            ["constraints", "Constraints"],
            ["solution", "Solution Review"],
            ["tests", "Test Results"],
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
                  Solution Robustness Score
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getScoreColor(
                        selected.robustnessScore
                      )}`}
                    >
                      {selected.robustnessScore}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {selected.robustnessScore >= 85
                        ? "Excellent"
                        : selected.robustnessScore >= 70
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
                    width: `${selected.robustnessScore}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                This score estimates how well your solution handles
                unusual, minimum, maximum, and boundary inputs.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <AlertTriangle className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Boundary Coverage
                </h2>

              </div>

              <div className="flex items-center justify-center py-4">

                <div className="text-center">

                  <p className="text-6xl font-black text-orange-500">
                    {selected.coveredCases}/
                    {selected.boundaryCases}
                  </p>

                  <p className="text-gray-500 mt-2">
                    identified cases covered
                  </p>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-green-500"
                  style={{
                    width: `${
                      (selected.coveredCases /
                        selected.boundaryCases) *
                      100
                    }%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                The remaining cases should be tested before considering
                the solution robust.
              </p>

            </div>

          </div>
        )}

        {/* Boundary Cases */}

        {activeTab === "cases" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <TestTube2 className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                AI-Generated Boundary Cases
              </h2>

            </div>

            <div className="space-y-5">

              {selected.boundaryCasesList.map(
                (item, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                      <div>

                        <div className="flex items-center gap-3">

                          <span className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center font-bold text-violet-600">
                            {index + 1}
                          </span>

                          <h3 className="text-xl font-bold">
                            {item.title}
                          </h3>

                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">

                          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">
                            {item.category}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(
                              item.severity
                            )}`}
                          >
                            {item.severity} Priority
                          </span>

                        </div>

                      </div>

                      <div className="rounded-xl bg-gray-900 text-white px-5 py-3 font-mono text-sm">
                        {item.input}
                      </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mt-6">

                      <div className="rounded-xl bg-blue-50 dark:bg-blue-900/10 p-5">

                        <p className="text-sm font-semibold text-blue-600">
                          Expected Result
                        </p>

                        <p className="mt-2 font-mono font-bold">
                          {item.expected}
                        </p>

                      </div>

                      <div className="rounded-xl bg-orange-50 dark:bg-orange-900/10 p-5">

                        <p className="text-sm font-semibold text-orange-600">
                          Why It Matters
                        </p>

                        <p className="mt-2 leading-6">
                          {item.explanation}
                        </p>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>
        )}

        {/* Constraints */}

        {activeTab === "constraints" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <ListChecks className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Question Constraints
                </h2>

              </div>

              <div className="space-y-4">

                {selected.constraints.map(
                  (constraint, index) => (

                    <div
                      key={index}
                      className="flex gap-4 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5"
                    >

                      <CheckCircle2
                        className="text-green-600 shrink-0"
                        size={22}
                      />

                      <p className="leading-6">
                        {constraint}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <CircleAlert className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Common Failure Points
                </h2>

              </div>

              <div className="space-y-4">

                {selected.commonMistakes.map(
                  (mistake, index) => (

                    <div
                      key={index}
                      className="rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-5"
                    >

                      <div className="flex gap-3">

                        <X
                          className="text-red-600 shrink-0"
                          size={22}
                        />

                        <p className="leading-6">
                          {mistake}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>
        )}

        {/* Solution Review */}

        {activeTab === "solution" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-7">

              <Code2 className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                AI Solution Review
              </h2>

            </div>

            <div className="rounded-2xl bg-gray-900 text-gray-100 p-7">

              <p className="text-sm text-gray-400 mb-3">
                Recommended Approach
              </p>

              <p className="leading-8 font-mono text-sm sm:text-base">
                {selected.solution}
              </p>

            </div>

            <div className="mt-7 grid md:grid-cols-3 gap-5">

              <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-6">

                <CheckCircle2
                  className="text-green-600"
                  size={25}
                />

                <h3 className="font-bold text-lg mt-4">
                  Strong Areas
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  Your approach handles the normal input path efficiently.
                </p>

              </div>

              <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-6">

                <AlertTriangle
                  className="text-orange-500"
                  size={25}
                />

                <h3 className="font-bold text-lg mt-4">
                  Watch Out
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  Boundary inputs should be tested before finalizing the
                  solution.
                </p>

              </div>

              <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-6">

                <Lightbulb
                  className="text-violet-600"
                  size={25}
                />

                <h3 className="font-bold text-lg mt-4">
                  AI Recommendation
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  Explicitly mention important constraints during the
                  interview.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Test Results */}

        {activeTab === "tests" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Play className="text-green-600" />

              <h2 className="text-2xl font-bold">
                Boundary Test Results
              </h2>

            </div>

            {!testResults ? (

              <div className="text-center py-12">

                <TestTube2
                  size={52}
                  className="mx-auto text-gray-400"
                />

                <h3 className="text-xl font-bold mt-5">
                  No test run yet
                </h3>

                <p className="text-gray-500 mt-2">
                  Run the boundary test suite to validate the solution.
                </p>

                <button
                  type="button"
                  onClick={handleRunTests}
                  className="mt-6 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700"
                >
                  Run Test Suite
                </button>

              </div>

            ) : (

              <>
                <div className="grid sm:grid-cols-2 gap-6">

                  <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6 text-center">

                    <Check
                      size={30}
                      className="mx-auto text-green-600"
                    />

                    <p className="text-5xl font-black text-green-600 mt-4">
                      {testResults.passed}
                    </p>

                    <p className="text-gray-500 mt-2">
                      Test cases passed
                    </p>

                  </div>

                  <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-6 text-center">

                    <X
                      size={30}
                      className="mx-auto text-red-600"
                    />

                    <p className="text-5xl font-black text-red-600 mt-4">
                      {testResults.failed}
                    </p>

                    <p className="text-gray-500 mt-2">
                      Cases requiring attention
                    </p>

                  </div>

                </div>

                <div className="mt-7 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

                  <div className="flex items-center gap-3">

                    <Brain className="text-violet-600" />

                    <p className="font-bold">
                      AI Validation Insight
                    </p>

                  </div>

                  <p className="mt-3 text-gray-600 dark:text-gray-300 leading-7">
                    {testResults.failed === 0
                      ? "Excellent. Your solution passed all generated boundary cases."
                      : `Your solution passed ${testResults.passed} cases, but ${testResults.failed} cases should receive additional attention before the solution is considered fully robust.`}
                  </p>

                </div>
              </>

            )}

          </div>
        )}

        {/* Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">
              What Your Solution Does Well
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

        {/* Boundary Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Boundary Case Categories
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Minimum Input",
                score: 91,
                example: "Empty or smallest valid input",
                icon: "📉",
              },
              {
                title: "Maximum Input",
                score: 84,
                example: "Largest allowed values",
                icon: "📈",
              },
              {
                title: "Special Values",
                score: 78,
                example: "Zero, negative, duplicates",
                icon: "🔢",
              },
              {
                title: "Unusual Structure",
                score: 73,
                example: "Sorted or unexpected ordering",
                icon: "🧩",
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

        {/* AI Tips */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Boundary Case Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🔍
              </p>

              <h3 className="text-xl font-bold mt-4">
                Question Constraints
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Read constraints carefully and convert them into cases
                that could challenge your algorithm.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧪
              </p>

              <h3 className="text-xl font-bold mt-4">
                Test the Extremes
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Test minimum input, maximum input, unusual values,
                duplicates, and cases with no valid solution.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🛡️
              </p>

              <h3 className="text-xl font-bold mt-4">
                Think Beyond Happy Paths
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                A robust solution should continue working when normal
                assumptions are challenged.
              </p>

            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Boundary Case Thinking Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 55,
              },
              {
                label: "Week 2",
                score: 63,
              },
              {
                label: "Week 3",
                score: 71,
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
                Normal Cases
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your solutions generally handle expected inputs correctly.
                Continue applying the same reasoning to unusual cases.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Test Extremes
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Pay more attention to minimum values, negative numbers,
                duplicates, empty cases, and no-solution scenarios.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Explain Your Cases
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                During interviews, explain why each boundary case matters
                instead of simply listing test inputs.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Boundary Case Robustness
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your boundary-case thinking is developing. Continue
                challenging your solutions with extreme inputs and unusual
                conditions before considering an algorithm complete.
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
                Strong interview solutions do more than solve the normal
                case. They account for the smallest valid input, unusual
                values, duplicate data, extreme constraints, and situations
                where no valid result exists. Before submitting a solution,
                actively ask yourself: "What input would break my
                assumptions?"
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🧪
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Robustness
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

export default AIInterviewQuestionBoundaryCaseAnalyzer;