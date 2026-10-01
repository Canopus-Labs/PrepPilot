import React, { useMemo, useState } from "react";
import {
  Brain,
  Lightbulb,
  Target,
  Search,
  ListChecks,
  Code2,
  Bug,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Sparkles,
  RefreshCw,
  Play,
  Eye,
  EyeOff,
  Clock3,
  Zap,
  ShieldCheck,
} from "lucide-react";

const AIInterviewQuestionSolutionPathVisualizer = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("path");

  const questions = [
    {
      title: "Find the Two Numbers That Add Up to a Target",
      category: "Arrays",
      difficulty: "Easy",
      description:
        "Given an array of integers and a target value, find the two indices whose values add up to the target.",
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      steps: [
        {
          title: "Problem Interpretation",
          icon: Search,
          description:
            "We need to find two different elements whose values sum to the given target and return their indices.",
          insight:
            "The important part is that we need a pair, not every possible combination.",
        },
        {
          title: "Key Observation",
          icon: Lightbulb,
          description:
            "For every number x, the number we need is target - x.",
          insight:
            "Instead of checking every pair, we can remember values we have already seen.",
        },
        {
          title: "Choose the Approach",
          icon: Target,
          description:
            "Use a hash map to store each previously visited number and its index.",
          insight:
            "A hash map gives approximately O(1) lookup time.",
        },
        {
          title: "Algorithm Steps",
          icon: ListChecks,
          description:
            "Traverse the array once. For each number, calculate its complement and check whether that complement already exists in the map.",
          insight:
            "If the complement exists, the required pair has been found.",
        },
        {
          title: "Edge Cases",
          icon: Bug,
          description:
            "Consider duplicate values, negative numbers, an empty array, and cases where no valid pair exists.",
          insight:
            "The implementation should never assume that a valid pair always exists.",
        },
        {
          title: "Complexity Analysis",
          icon: BarChart3,
          description:
            "The array is scanned once and each hash-map lookup is approximately O(1).",
          insight:
            "Overall time complexity is O(n), with O(n) additional space.",
        },
        {
          title: "Final Solution",
          icon: Code2,
          description:
            "Return the current index and the stored index whenever the required complement is found.",
          insight:
            "The hash-map approach is more efficient than checking every possible pair.",
        },
      ],
    },
    {
      title: "Reverse a Linked List",
      category: "Linked Lists",
      difficulty: "Medium",
      description:
        "Reverse a singly linked list and return the new head of the reversed list.",
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      steps: [
        {
          title: "Problem Interpretation",
          icon: Search,
          description:
            "We need to reverse the direction of every link in a singly linked list.",
          insight:
            "The original head becomes the tail after the reversal.",
        },
        {
          title: "Key Observation",
          icon: Lightbulb,
          description:
            "Each node needs to point to its previous node instead of its next node.",
          insight:
            "We must save the original next node before changing the pointer.",
        },
        {
          title: "Choose the Approach",
          icon: Target,
          description:
            "Use an iterative approach with previous, current, and next pointers.",
          insight:
            "This allows the list to be reversed without creating another list.",
        },
        {
          title: "Algorithm Steps",
          icon: ListChecks,
          description:
            "Store the next node, reverse the current pointer, move previous forward, and continue until the list ends.",
          insight:
            "The process repeats once for every node.",
        },
        {
          title: "Edge Cases",
          icon: Bug,
          description:
            "Handle an empty list and a list containing only one node.",
          insight:
            "Both cases are already handled naturally by the iterative approach.",
        },
        {
          title: "Complexity Analysis",
          icon: BarChart3,
          description:
            "Every node is visited exactly once and only a constant number of pointers are maintained.",
          insight:
            "Time complexity is O(n) and auxiliary space is O(1).",
        },
        {
          title: "Final Solution",
          icon: Code2,
          description:
            "Return the previous pointer after the traversal because it represents the new head.",
          insight:
            "The original head has become the final node in the reversed list.",
        },
      ],
    },
    {
      title: "Find the Maximum Subarray Sum",
      category: "Dynamic Programming",
      difficulty: "Medium",
      description:
        "Find the contiguous subarray with the largest possible sum.",
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      steps: [
        {
          title: "Problem Interpretation",
          icon: Search,
          description:
            "We need to identify a contiguous portion of the array whose elements produce the maximum sum.",
          insight:
            "The subarray must contain consecutive elements.",
        },
        {
          title: "Key Observation",
          icon: Lightbulb,
          description:
            "At every position, decide whether extending the previous subarray is better than starting a new one.",
          insight:
            "A negative running sum can make future results worse.",
        },
        {
          title: "Choose the Approach",
          icon: Target,
          description:
            "Use Kadane's algorithm to maintain the best sum ending at the current position.",
          insight:
            "Only the previous best ending-at-current value is required.",
        },
        {
          title: "Algorithm Steps",
          icon: ListChecks,
          description:
            "Update the current sum using the current value and update the global maximum whenever a better result is found.",
          insight:
            "The array only needs to be traversed once.",
        },
        {
          title: "Edge Cases",
          icon: Bug,
          description:
            "Consider arrays containing all negative values, a single element, and arrays with zeros.",
          insight:
            "For an all-negative array, the largest individual value is the answer.",
        },
        {
          title: "Complexity Analysis",
          icon: BarChart3,
          description:
            "The algorithm makes one pass and stores only two running values.",
          insight:
            "Time complexity is O(n) and auxiliary space is O(1).",
        },
        {
          title: "Final Solution",
          icon: Code2,
          description:
            "Return the maximum value recorded during the traversal.",
          insight:
            "Kadane's algorithm avoids generating every possible subarray.",
        },
      ],
    },
  ];

  const selected = questions[selectedQuestion];

  const progress = useMemo(() => {
    return Math.round((visibleSteps / selected.steps.length) * 100);
  }, [visibleSteps, selected.steps.length]);

  const showNextStep = () => {
    setVisibleSteps((current) =>
      Math.min(current + 1, selected.steps.length)
    );
  };

  const resetPath = () => {
    setVisibleSteps(1);
    setActiveTab("path");
  };

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setVisibleSteps(selected.steps.length);
      setActiveTab("path");
    }, 900);
  };

  const changeQuestion = (index) => {
    setSelectedQuestion(index);
    setVisibleSteps(1);
    setActiveTab("path");
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
              AI Interview Question Solution Path Visualizer
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Understand how an interviewer expects you to reason from
              the problem statement to the final solution.
            </p>
          </div>

        </div>

        {/* Overview Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Questions
            </p>

            <p className="text-5xl font-black mt-3">
              {questions.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ListChecks
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Reasoning Steps
            </p>

            <p className="text-5xl font-black mt-3">
              {selected.steps.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Zap
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Time Complexity
            </p>

            <p className="text-4xl font-black mt-4">
              {selected.complexity.time}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Path Progress
            </p>

            <p className="text-5xl font-black mt-3">
              {progress}%
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
                  AI Solution Reasoning Engine
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-4xl">
                AI breaks technical interview problems into progressive
                reasoning stages so you can understand not only the final
                solution, but also why each decision is made.
              </p>

            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition shrink-0 disabled:opacity-60"
            >
              {analyzing ? (
                <>
                  <RefreshCw
                    size={20}
                    className="animate-spin"
                  />
                  Building Path...
                </>
              ) : (
                <>
                  <Play size={20} />
                  Generate Solution Path
                </>
              )}
            </button>

          </div>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Code2 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {questions.map((question, index) => (

              <button
                key={question.title}
                type="button"
                onClick={() => changeQuestion(index)}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-center justify-between gap-3">

                  <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                    {question.category}
                  </span>

                  <span className="text-sm font-semibold text-orange-500">
                    {question.difficulty}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {question.title}
                </h3>

                <p className="text-sm text-gray-500 mt-3 leading-6">
                  {question.description}
                </p>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

          <div className="flex flex-wrap items-center gap-3">

            <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
              {selected.category}
            </span>

            <span className="px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400">
              {selected.difficulty}
            </span>

          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mt-5">
            {selected.title}
          </h2>

          <p className="text-gray-500 mt-4 leading-7 max-w-4xl">
            {selected.description}
          </p>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("path")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "path"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Solution Path
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("complexity")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "complexity"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Complexity
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("interview")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "interview"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Interview Explanation
          </button>

        </div>

        {/* Solution Path */}

        {activeTab === "path" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

              <div className="flex items-center gap-3">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Progressive Solution Path
                </h2>

              </div>

              <button
                type="button"
                onClick={resetPath}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold"
              >
                <RefreshCw size={17} />
                Reset
              </button>

            </div>

            {/* Progress */}

            <div className="mb-10">

              <div className="flex justify-between mb-3">

                <span className="text-sm text-gray-500">
                  Reasoning progress
                </span>

                <span className="font-bold">
                  {visibleSteps} / {selected.steps.length}
                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

            {/* Steps */}

            <div className="space-y-4">

              {selected.steps.map((step, index) => {

                const Icon = step.icon;
                const isVisible = index < visibleSteps;

                return (
                  <React.Fragment key={step.title}>

                    <div
                      className={`rounded-2xl border transition-all duration-500 ${
                        isVisible
                          ? "border-violet-200 dark:border-violet-900/30 bg-violet-50/50 dark:bg-violet-900/5"
                          : "border-gray-200 dark:border-white/10 opacity-50"
                      }`}
                    >

                      <div className="p-6">

                        <div className="flex items-start gap-5">

                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                              isVisible
                                ? "bg-violet-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                            }`}
                          >
                            {isVisible ? (
                              <Icon size={23} />
                            ) : (
                              <EyeOff size={21} />
                            )}
                          </div>

                          <div className="flex-1">

                            <div className="flex flex-wrap items-center gap-3">

                              <span className="text-sm font-bold text-violet-600">
                                STEP {index + 1}
                              </span>

                              <h3 className="text-xl font-bold">
                                {isVisible
                                  ? step.title
                                  : "Locked Step"}
                              </h3>

                            </div>

                            {isVisible && (
                              <>
                                <p className="text-gray-600 dark:text-gray-300 mt-4 leading-7">
                                  {step.description}
                                </p>

                                <div className="mt-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 p-4">

                                  <div className="flex items-center gap-2">

                                    <Lightbulb
                                      size={18}
                                      className="text-yellow-500"
                                    />

                                    <p className="font-semibold">
                                      Key Insight
                                    </p>

                                  </div>

                                  <p className="text-gray-500 mt-2 leading-6">
                                    {step.insight}
                                  </p>

                                </div>
                              </>
                            )}

                            {!isVisible && (
                              <p className="text-gray-500 mt-3">
                                Reveal this reasoning step to continue.
                              </p>
                            )}

                          </div>

                          <div className="hidden sm:block">

                            {isVisible ? (
                              <Eye
                                className="text-green-600"
                                size={21}
                              />
                            ) : (
                              <EyeOff
                                className="text-gray-400"
                                size={21}
                              />
                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                    {index < selected.steps.length - 1 &&
                      index < visibleSteps - 1 && (
                        <div className="flex justify-center">

                          <ArrowDown
                            className="text-violet-400"
                            size={25}
                          />

                        </div>
                      )}

                  </React.Fragment>
                );
              })}

            </div>

            {/* Reveal Button */}

            <div className="flex justify-center mt-10">

              {visibleSteps < selected.steps.length ? (
                <button
                  type="button"
                  onClick={showNextStep}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-violet-600 text-white font-bold text-lg hover:bg-violet-700 transition"
                >
                  Reveal Next Step
                  <ArrowRight size={21} />
                </button>
              ) : (
                <div className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-bold">
                  <CheckCircle2 size={22} />
                  Complete Solution Path
                </div>
              )}

            </div>

          </div>
        )}

        {/* Complexity */}

        {activeTab === "complexity" && (
          <div className="mt-6 grid md:grid-cols-2 gap-6">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3">

                <Clock3 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Time Complexity
                </h2>

              </div>

              <p className="text-6xl font-black text-blue-600 mt-8">
                {selected.complexity.time}
              </p>

              <p className="text-gray-500 mt-5 leading-7">
                The solution processes the input efficiently without
                repeatedly scanning the same data unnecessarily.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Space Complexity
                </h2>

              </div>

              <p className="text-6xl font-black text-violet-600 mt-8">
                {selected.complexity.space}
              </p>

              <p className="text-gray-500 mt-5 leading-7">
                This represents the additional memory required by the
                solution apart from the input data.
              </p>

            </div>

            <div className="md:col-span-2 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Sparkles className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  Why This Approach?
                </h2>

              </div>

              <div className="grid md:grid-cols-3 gap-5">

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

                  <p className="text-3xl">
                    ⚡
                  </p>

                  <h3 className="font-bold text-lg mt-4">
                    Efficient
                  </h3>

                  <p className="text-gray-500 mt-2 leading-6">
                    Avoids unnecessary repeated work and provides an
                    efficient solution for the given constraints.
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

                  <p className="text-3xl">
                    🧠
                  </p>

                  <h3 className="font-bold text-lg mt-4">
                    Reasoned
                  </h3>

                  <p className="text-gray-500 mt-2 leading-6">
                    Every algorithmic decision follows from an observation
                    about the problem.
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

                  <p className="text-3xl">
                    🎯
                  </p>

                  <h3 className="font-bold text-lg mt-4">
                    Interview Ready
                  </h3>

                  <p className="text-gray-500 mt-2 leading-6">
                    The reasoning can be communicated clearly during an
                    interview.
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Interview Explanation */}

        {activeTab === "interview" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <ShieldCheck className="text-green-600" />

              <h2 className="text-2xl font-bold">
                How to Explain This in an Interview
              </h2>

            </div>

            <div className="space-y-5">

              {[
                {
                  number: "01",
                  title: "Clarify the Problem",
                  text:
                    "Start by restating the problem in your own words and confirming the important constraints.",
                },
                {
                  number: "02",
                  title: "Explain Your Observation",
                  text:
                    "Describe the key property of the problem that leads you toward the selected approach.",
                },
                {
                  number: "03",
                  title: "Present the Approach",
                  text:
                    "Explain the data structure or algorithm you selected and why it is appropriate.",
                },
                {
                  number: "04",
                  title: "Walk Through the Algorithm",
                  text:
                    "Describe the major steps before writing code so the interviewer can follow your reasoning.",
                },
                {
                  number: "05",
                  title: "Discuss Edge Cases",
                  text:
                    "Mention unusual inputs and explain how your solution handles them.",
                },
                {
                  number: "06",
                  title: "State Complexity",
                  text:
                    "Finish by clearly stating the time and space complexity and why they have those values.",
                },
              ].map((item) => (

                <div
                  key={item.number}
                  className="flex gap-5 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 text-violet-600 flex items-center justify-center font-black shrink-0">
                    {item.number}
                  </div>

                  <div>

                    <h3 className="text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 mt-2 leading-7">
                      {item.text}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* Final Learning Tips */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Solution Reasoning Tips
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-6">

              <p className="text-4xl">
                🧩
              </p>

              <h3 className="text-xl font-bold mt-4">
                Think Before Coding
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Understand the problem and identify important observations
                before immediately writing code.
              </p>

            </div>

            <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6">

              <p className="text-4xl">
                🔎
              </p>

              <h3 className="text-xl font-bold mt-4">
                Explain Decisions
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Explain why you selected a particular algorithm instead of
                only describing what the code does.
              </p>

            </div>

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Connect the Steps
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Make sure each observation naturally leads to the next
                algorithmic decision.
              </p>

            </div>

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
                Strong interview problem solving is not only about reaching
                the correct answer. Explain how you interpreted the problem,
                what you observed, why you selected your approach, how it
                handles edge cases, and what its complexity is.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🧠
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Steps Revealed
              </h3>

              <p className="text-5xl font-black">
                {visibleSteps}/{selected.steps.length}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionSolutionPathVisualizer;