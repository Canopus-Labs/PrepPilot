import React, { useMemo, useState } from "react";
import {
  Brain,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle2,
  Target,
  TrendingUp,
  BookOpen,
  MessageSquare,
  FileText,
  Mic,
  Code2,
  Clock3,
  Sparkles,
  ChevronRight,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

const AIInterviewPreparationGapReport = () => {
  const [filter, setFilter] = useState("All");
  const [showCompleted, setShowCompleted] = useState(true);

  const preparationAreas = [
    {
      id: 1,
      title: "DSA & Problem Solving",
      category: "Technical",
      icon: Code2,
      completion: 72,
      priority: "High",
      status: "Gap",
      impact: "High",
      description:
        "Several important algorithm patterns still require practice.",
      missing: [
        "Dynamic Programming",
        "Graph Algorithms",
        "Advanced Binary Search",
      ],
      recommendation:
        "Complete at least two practice problems from each weak pattern and review previous mistakes.",
    },
    {
      id: 2,
      title: "Core Computer Science",
      category: "Technical",
      icon: BookOpen,
      completion: 58,
      priority: "High",
      status: "Gap",
      impact: "High",
      description:
        "Core CS concepts have lower preparation coverage than recommended.",
      missing: [
        "Operating Systems",
        "Computer Networks",
        "DBMS Transactions",
      ],
      recommendation:
        "Review high-frequency interview concepts before starting additional advanced topics.",
    },
    {
      id: 3,
      title: "Programming Skills",
      category: "Technical",
      icon: Code2,
      completion: 84,
      priority: "Medium",
      status: "Good",
      impact: "Medium",
      description:
        "Programming fundamentals are well covered with a few areas remaining.",
      missing: [
        "Exception Handling",
        "Advanced OOP",
      ],
      recommendation:
        "Review advanced concepts and solve a few implementation-focused questions.",
    },
    {
      id: 4,
      title: "Behavioral Preparation",
      category: "Behavioral",
      icon: MessageSquare,
      completion: 46,
      priority: "High",
      status: "Gap",
      impact: "High",
      description:
        "Behavioral preparation is incomplete and several common questions have not been practiced.",
      missing: [
        "Leadership examples",
        "Conflict resolution",
        "Failure experience",
        "Teamwork examples",
      ],
      recommendation:
        "Prepare structured STAR responses for the most common behavioral categories.",
    },
    {
      id: 5,
      title: "Resume Preparation",
      category: "Resume",
      icon: FileText,
      completion: 67,
      priority: "Medium",
      status: "Gap",
      impact: "High",
      description:
        "Some resume projects and technical decisions have not been fully prepared for discussion.",
      missing: [
        "Project metrics",
        "Technical challenges",
        "Architecture decisions",
      ],
      recommendation:
        "Prepare a clear explanation for every major project and resume claim.",
    },
    {
      id: 6,
      title: "Mock Interview Practice",
      category: "Practice",
      icon: Mic,
      completion: 40,
      priority: "High",
      status: "Gap",
      impact: "High",
      description:
        "You need more realistic interview simulations before the final interview.",
      missing: [
        "Technical mock interview",
        "Behavioral mock interview",
        "Timed coding session",
      ],
      recommendation:
        "Complete at least two full mock interviews and review the resulting feedback.",
    },
    {
      id: 7,
      title: "Revision",
      category: "Revision",
      icon: RefreshCw,
      completion: 52,
      priority: "High",
      status: "Gap",
      impact: "High",
      description:
        "Several previously studied topics have not been reviewed recently.",
      missing: [
        "DSA revision",
        "Core CS revision",
        "Previous mistakes",
      ],
      recommendation:
        "Use spaced revision to revisit weak concepts and previously incorrect answers.",
    },
    {
      id: 8,
      title: "Interview Communication",
      category: "Behavioral",
      icon: MessageSquare,
      completion: 78,
      priority: "Medium",
      status: "Good",
      impact: "Medium",
      description:
        "Communication skills are progressing well but can still be refined.",
      missing: [
        "Concise technical explanations",
        "Answer structure",
      ],
      recommendation:
        "Practice explaining technical concepts clearly within a limited time.",
    },
  ];

  const filteredAreas = useMemo(() => {
    let result = preparationAreas;

    if (filter !== "All") {
      result = result.filter(
        (area) => area.category === filter
      );
    }

    if (!showCompleted) {
      result = result.filter(
        (area) => area.status !== "Good"
      );
    }

    return result;
  }, [filter, showCompleted]);

  const gapCount = preparationAreas.filter(
    (area) => area.status === "Gap"
  ).length;

  const highPriorityGaps = preparationAreas.filter(
    (area) =>
      area.status === "Gap" &&
      area.priority === "High"
  ).length;

  const averageCompletion = Math.round(
    preparationAreas.reduce(
      (sum, area) => sum + area.completion,
      0
    ) / preparationAreas.length
  );

  const getPriorityClasses = (priority) => {
    if (priority === "High") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    if (priority === "Medium") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
  };

  const getStatusClasses = (status) => {
    if (status === "Good") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  const getProgressColor = (completion) => {
    if (completion >= 80) {
      return "from-green-500 to-emerald-600";
    }

    if (completion >= 60) {
      return "from-blue-500 to-indigo-600";
    }

    if (completion >= 40) {
      return "from-orange-500 to-amber-600";
    }

    return "from-red-500 to-rose-600";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center shrink-0">
            <ClipboardCheck
              size={34}
              className="text-red-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Preparation Gap Report
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Get a complete preparation audit that identifies the most
              important gaps before your interview.
            </p>
          </div>

        </div>

        {/* Overview Metrics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ClipboardCheck
              className="mx-auto text-indigo-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Overall Preparation
            </p>

            <p className="text-5xl font-black mt-3">
              {averageCompletion}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-red-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Preparation Gaps
            </p>

            <p className="text-5xl font-black mt-3">
              {gapCount}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              High Priority Gaps
            </p>

            <p className="text-5xl font-black mt-3">
              {highPriorityGaps}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ShieldCheck
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Readiness Score
            </p>

            <p className="text-5xl font-black mt-3">
              74%
            </p>

          </div>

        </div>

        {/* AI Report Banner */}

        <div className="mt-10 bg-gradient-to-r from-red-600 via-orange-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Preparation Audit
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            Your preparation is progressing, but AI has identified several
            high-impact gaps that should be addressed before the interview.
            Focus first on technical weaknesses, behavioral preparation,
            mock interview practice, and revision of previously studied
            concepts.
          </p>

        </div>

        {/* Readiness Status */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3">

                <Gauge
                  className="text-indigo-600"
                />

                <h2 className="text-2xl font-bold">
                  Interview Readiness
                </h2>

              </div>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                You have a strong foundation, but several high-impact
                areas remain incomplete. Closing these gaps can
                significantly improve your interview readiness.
              </p>

              <span className="inline-block mt-5 px-4 py-2 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 font-semibold">
                Almost Ready
              </span>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-indigo-600">
                74%
              </p>

              <p className="text-gray-500 mt-2">
                Readiness Score
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-600"
              style={{
                width: "74%",
              }}
            />

          </div>

        </div>

        {/* High Priority Gaps */}

        <div className="mt-10 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-3xl p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-red-600" />

            <h2 className="text-2xl font-bold">
              High-Priority Preparation Gaps
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {preparationAreas
              .filter(
                (area) =>
                  area.status === "Gap" &&
                  area.priority === "High"
              )
              .map((area) => (

                <div
                  key={area.id}
                  className="bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-sm"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">

                        <area.icon
                          size={22}
                          className="text-red-600"
                        />

                      </div>

                      <div>

                        <h3 className="font-bold">
                          {area.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {area.category}
                        </p>

                      </div>

                    </div>

                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-xs font-semibold">
                      High Impact
                    </span>

                  </div>

                  <p className="text-gray-500 mt-5 leading-6">
                    {area.description}
                  </p>

                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 text-red-600 font-semibold"
                  >
                    View Gap Details
                    <ChevronRight size={17} />
                  </button>

                </div>

              ))}

          </div>

        </div>

        {/* Gap Filters */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div>

              <h2 className="text-2xl font-bold">
                Preparation Gap Breakdown
              </h2>

              <p className="text-gray-500 mt-2">
                Review incomplete areas and prioritize your remaining
                preparation time.
              </p>

            </div>

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(event) =>
                  setShowCompleted(event.target.checked)
                }
                className="w-5 h-5 accent-indigo-600"
              />

              <span className="text-sm font-semibold">
                Show completed areas
              </span>

            </label>

          </div>

          <div className="flex flex-wrap gap-3 mt-7">

            {[
              "All",
              "Technical",
              "Behavioral",
              "Resume",
              "Practice",
              "Revision",
            ].map((category) => (

              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  filter === category
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                {category}
              </button>

            ))}

          </div>

        </div>

        {/* Preparation Areas */}

        <div className="mt-8 space-y-6">

          {filteredAreas.map((area) => (

            <div
              key={area.id}
              className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8"
            >

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">

                <div className="flex items-start gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">

                    <area.icon
                      size={27}
                      className="text-indigo-600"
                    />

                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-xl font-bold">
                        {area.title}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                          area.status
                        )}`}
                      >
                        {area.status}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityClasses(
                          area.priority
                        )}`}
                      >
                        {area.priority} Priority
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {area.category} · {area.impact} interview impact
                    </p>

                    <p className="text-gray-500 mt-4 leading-6">
                      {area.description}
                    </p>

                  </div>

                </div>

                <div className="text-center shrink-0">

                  <p
                    className={`text-4xl font-black ${
                      area.completion >= 80
                        ? "text-green-600"
                        : area.completion >= 60
                        ? "text-blue-600"
                        : area.completion >= 40
                        ? "text-orange-500"
                        : "text-red-600"
                    }`}
                  >
                    {area.completion}%
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    complete
                  </p>

                </div>

              </div>

              {/* Progress */}

              <div className="mt-7">

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-gray-500">
                    Preparation coverage
                  </span>

                  <span className="font-semibold">
                    {area.completion}%
                  </span>

                </div>

                <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className={`h-full bg-gradient-to-r ${getProgressColor(
                      area.completion
                    )}`}
                    style={{
                      width: `${area.completion}%`,
                    }}
                  />

                </div>

              </div>

              {/* Missing Areas */}

              {area.status === "Gap" && (
                <div className="mt-7">

                  <div className="flex items-center gap-2 mb-4">

                    <AlertTriangle
                      size={19}
                      className="text-orange-500"
                    />

                    <h3 className="font-bold">
                      Missing or Incomplete Areas
                    </h3>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    {area.missing.map((item) => (

                      <span
                        key={item}
                        className="px-4 py-2 rounded-full bg-orange-50 text-orange-700 dark:bg-orange-900/10 dark:text-orange-400 border border-orange-200 dark:border-orange-900/30 font-medium"
                      >
                        {item}
                      </span>

                    ))}

                  </div>

                </div>
              )}

              {/* Recommendation */}

              <div className="mt-7 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20 p-6">

                <div className="flex items-start gap-4">

                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">

                    <Sparkles
                      size={20}
                      className="text-indigo-600"
                    />

                  </div>

                  <div>

                    <h3 className="font-bold">
                      AI Recommendation
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mt-2 leading-6">
                      {area.recommendation}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Technical Gap Summary */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-7">

              <Code2 className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Technical Preparation Gaps
              </h2>

            </div>

            <div className="space-y-5">

              {[
                {
                  topic: "DSA & Problem Solving",
                  value: 72,
                },
                {
                  topic: "Core Computer Science",
                  value: 58,
                },
                {
                  topic: "Programming",
                  value: 84,
                },
              ].map((item) => (

                <div key={item.topic}>

                  <div className="flex justify-between mb-2">

                    <span className="font-semibold">
                      {item.topic}
                    </span>

                    <span className="text-gray-500">
                      {item.value}%
                    </span>

                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(
                        item.value
                      )}`}
                      style={{
                        width: `${item.value}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Behavioral */}

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-7">

              <MessageSquare className="text-pink-600" />

              <h2 className="text-2xl font-bold">
                Behavioral Preparation Gaps
              </h2>

            </div>

            <div className="space-y-4">

              {[
                "Leadership examples",
                "Conflict resolution",
                "Failure experience",
                "Teamwork examples",
                "STAR response practice",
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-pink-50 dark:bg-pink-900/10 p-4"
                >

                  <AlertTriangle
                    size={19}
                    className="text-pink-600"
                  />

                  <span>
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Resume Audit */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <FileText className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Resume Interview Readiness
            </h2>

          </div>

          <p className="text-gray-500 leading-7 mb-7">
            Interviewers can ask questions about almost anything included
            on your resume. Make sure every major project, skill, and
            achievement can be explained confidently.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Projects",
                score: 72,
                status: "Review Needed",
              },
              {
                title: "Technical Skills",
                score: 86,
                status: "Ready",
              },
              {
                title: "Achievements",
                score: 61,
                status: "Review Needed",
              },
              {
                title: "Experience",
                score: 68,
                status: "Review Needed",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <h3 className="font-bold">
                  {item.title}
                </h3>

                <p className="text-3xl font-black text-indigo-600 mt-4">
                  {item.score}%
                </p>

                <span
                  className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    item.score >= 80
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                  }`}
                >
                  {item.status}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Mock Interview Readiness */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Mic className="text-red-600" />

            <h2 className="text-2xl font-bold">
              Mock Interview Readiness
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-6">

              <p className="text-sm text-gray-500">
                Technical Mocks
              </p>

              <p className="text-4xl font-black mt-3">
                2 / 5
              </p>

              <p className="text-red-600 font-semibold mt-3">
                More Practice Needed
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

              <p className="text-sm text-gray-500">
                Behavioral Mocks
              </p>

              <p className="text-4xl font-black mt-3">
                1 / 3
              </p>

              <p className="text-orange-600 font-semibold mt-3">
                More Practice Needed
              </p>

            </div>

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

              <p className="text-sm text-gray-500">
                Average Mock Score
              </p>

              <p className="text-4xl font-black mt-3">
                76%
              </p>

              <p className="text-green-600 font-semibold mt-3">
                Good Progress
              </p>

            </div>

          </div>

        </div>

        {/* Final Revision Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <ClipboardCheck className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Final Interview Preparation Checklist
            </h2>

          </div>

          <div className="space-y-4">

            {[
              {
                text: "Review weak DSA patterns",
                done: false,
              },
              {
                text: "Revise Core CS fundamentals",
                done: false,
              },
              {
                text: "Prepare STAR behavioral stories",
                done: false,
              },
              {
                text: "Review every major resume project",
                done: false,
              },
              {
                text: "Complete technical mock interview",
                done: false,
              },
              {
                text: "Complete behavioral mock interview",
                done: false,
              },
              {
                text: "Review previous interview mistakes",
                done: true,
              },
              {
                text: "Practice concise technical explanations",
                done: true,
              },
            ].map((item, index) => (

              <div
                key={index}
                className={`flex items-center gap-4 rounded-2xl p-5 ${
                  item.done
                    ? "bg-green-50 dark:bg-green-900/10"
                    : "bg-orange-50 dark:bg-orange-900/10"
                }`}
              >

                {item.done ? (
                  <CheckCircle2
                    size={23}
                    className="text-green-600 shrink-0"
                  />
                ) : (
                  <AlertTriangle
                    size={23}
                    className="text-orange-500 shrink-0"
                  />
                )}

                <span
                  className={`font-semibold ${
                    item.done
                      ? "line-through text-gray-500"
                      : ""
                  }`}
                >
                  {item.text}
                </span>

                <span className="ml-auto text-sm font-semibold">

                  {item.done ? (
                    <span className="text-green-600">
                      Complete
                    </span>
                  ) : (
                    <span className="text-orange-600">
                      Pending
                    </span>
                  )}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* AI Priority Plan */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Priority Plan
            </h2>

          </div>

          <p className="text-white/90 leading-8 max-w-4xl">
            Do not try to close every gap at the same time. Focus first
            on areas with the highest interview impact and lowest
            preparation coverage.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Priority 1
              </p>

              <h3 className="text-2xl font-black mt-2">
                Technical Gaps
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Revise DSA and Core CS concepts that are currently weak.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Priority 2
              </p>

              <h3 className="text-2xl font-black mt-2">
                Mock Interviews
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Complete realistic technical and behavioral mock sessions.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Priority 3
              </p>

              <h3 className="text-2xl font-black mt-2">
                Resume & Behavioral
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Prepare strong explanations for projects and behavioral
                experiences.
              </p>

            </div>

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              AI Gap-Close Recommendations
            </h2>

          </div>

          <div className="space-y-5">

            {[
              {
                number: "01",
                title: "Strengthen Core CS",
                description:
                  "Spend focused revision time on Operating Systems, DBMS, and Computer Networks.",
                time: "3–4 hours",
              },
              {
                number: "02",
                title: "Practice DSA Weaknesses",
                description:
                  "Complete targeted Dynamic Programming and Graph problems.",
                time: "4–6 hours",
              },
              {
                number: "03",
                title: "Prepare Behavioral Stories",
                description:
                  "Create STAR-based responses for leadership, conflict, failure, and teamwork questions.",
                time: "2–3 hours",
              },
              {
                number: "04",
                title: "Complete Mock Interviews",
                description:
                  "Run technical and behavioral simulations and review feedback afterward.",
                time: "3–4 hours",
              },
              {
                number: "05",
                title: "Audit Your Resume",
                description:
                  "Make sure every project, technology, and achievement can be explained with specific details.",
                time: "1–2 hours",
              },
            ].map((item) => (

              <div
                key={item.number}
                className="flex items-start gap-5 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">

                  <span className="font-black text-indigo-600">
                    {item.number}
                  </span>

                </div>

                <div className="flex-1">

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

                    <h3 className="font-bold text-lg">
                      {item.title}
                    </h3>

                    <span className="text-sm font-semibold text-indigo-600">
                      {item.time}
                    </span>

                  </div>

                  <p className="text-gray-500 mt-2 leading-6">
                    {item.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Overall Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Preparation Gap Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your preparation is progressing well, but the remaining
                gaps could affect interview performance if they are not
                addressed. Closing the highest-impact gaps should be your
                primary focus.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-orange-500">
                26%
              </p>

              <p className="text-gray-500 mt-2">
                Preparation Gap
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-orange-500 to-red-600"
              style={{
                width: "26%",
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
                You do not need to complete every possible preparation
                activity before your interview. Focus on closing the gaps
                with the highest interview impact: strengthen weak
                technical concepts, prepare behavioral stories, review
                your resume, complete realistic mock interviews, and
                revisit previous mistakes. This approach gives you the
                highest return from your remaining preparation time.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Focused Preparation
              </h3>

              <p className="text-5xl font-black">
                74%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationGapReport;