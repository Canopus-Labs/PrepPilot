import React, { useMemo, useState } from "react";
import {
  Brain,
  BookOpen,
  Target,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Lightbulb,
  RefreshCw,
  TrendingUp,
  Award,
  Layers,
  FileText,
  Code2,
  FolderKanban,
  ArrowRight,
  Star,
  Clock,
} from "lucide-react";

const AIInterviewPreparationResourceDifficultyMatching = () => {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [activeTab, setActiveTab] = useState("recommendations");
  const [analyzing, setAnalyzing] = useState(false);

  const topics = [
    {
      name: "Data Structures & Algorithms",
      level: "Intermediate",
      mastery: 72,
      readiness: 84,
      recommendedDifficulty: "Medium",
      performance: 78,
      reason:
        "Your recent DSA performance shows strong fundamentals but some difficulty with advanced optimization problems.",
      resources: [
        {
          title: "Intermediate DSA Practice Sheet",
          type: "DSA Sheet",
          difficulty: "Medium",
          match: 96,
          duration: "8-12 hours",
          description:
            "Practice arrays, strings, hashing, stacks, queues, trees, and common interview patterns.",
        },
        {
          title: "Algorithm Pattern Challenges",
          type: "Questions",
          difficulty: "Medium",
          match: 92,
          duration: "6-8 hours",
          description:
            "Targeted problems covering sliding window, two pointers, binary search, and recursion.",
        },
        {
          title: "Advanced Graph Problems",
          type: "Questions",
          difficulty: "Hard",
          match: 71,
          duration: "10-14 hours",
          description:
            "A challenging set of graph problems recommended after completing the medium-level set.",
        },
      ],
      strengths: [
        "Strong understanding of common data structures.",
        "Good performance on standard interview patterns.",
        "Consistent practice across multiple DSA topics.",
      ],
      gaps: [
        "Advanced graph algorithms.",
        "Dynamic programming optimization.",
        "Complex time-complexity analysis.",
      ],
    },
    {
      name: "System Design",
      level: "Beginner-Intermediate",
      mastery: 61,
      readiness: 74,
      recommendedDifficulty: "Beginner → Medium",
      performance: 68,
      reason:
        "You understand core system-design components but need more guided practice before attempting complex architecture problems.",
      resources: [
        {
          title: "System Design Fundamentals",
          type: "Book",
          difficulty: "Beginner",
          match: 97,
          duration: "5-7 hours",
          description:
            "Learn scalability, databases, caching, load balancing, APIs, and basic architecture patterns.",
        },
        {
          title: "URL Shortener Design Practice",
          type: "Project",
          difficulty: "Medium",
          match: 94,
          duration: "4-6 hours",
          description:
            "Build a small system-design solution while practicing scalability and storage decisions.",
        },
        {
          title: "Distributed Systems Deep Dive",
          type: "Reading",
          difficulty: "Hard",
          match: 62,
          duration: "12-16 hours",
          description:
            "Advanced material covering distributed consistency, partitioning, and fault tolerance.",
        },
      ],
      strengths: [
        "Understands basic architecture components.",
        "Recognizes common scalability requirements.",
        "Can explain simple system-design decisions.",
      ],
      gaps: [
        "Distributed system concepts.",
        "Database scaling strategies.",
        "Advanced fault-tolerance patterns.",
      ],
    },
    {
      name: "Technical Communication",
      level: "Advanced",
      mastery: 86,
      readiness: 91,
      recommendedDifficulty: "Advanced",
      performance: 89,
      reason:
        "Your communication performance is strong, so advanced explanation and mock-interview resources will provide the most value.",
      resources: [
        {
          title: "Advanced Technical Explanation Practice",
          type: "Practice",
          difficulty: "Advanced",
          match: 98,
          duration: "3-5 hours",
          description:
            "Practice explaining complex technical concepts clearly to different audiences.",
        },
        {
          title: "Technical Mock Interview Pack",
          type: "Questions",
          difficulty: "Advanced",
          match: 95,
          duration: "5-8 hours",
          description:
            "Practice realistic technical questions requiring structured and concise explanations.",
        },
        {
          title: "Communication Fundamentals",
          type: "Book",
          difficulty: "Beginner",
          match: 48,
          duration: "4-6 hours",
          description:
            "Basic communication exercises that are below your current skill level.",
        },
      ],
      strengths: [
        "Strong technical explanation skills.",
        "Good answer structure and clarity.",
        "Consistent communication performance.",
      ],
      gaps: [
        "Handling highly ambiguous questions.",
        "Explaining complex trade-offs under time pressure.",
        "Adapting explanations for non-technical audiences.",
      ],
    },
  ];

  const selected = topics[selectedTopic];

  const overallScore = useMemo(() => {
    return Math.round(
      topics.reduce((sum, topic) => sum + topic.readiness, 0) /
        topics.length
    );
  }, []);

  const averageMatch = useMemo(() => {
    const allResources = topics.flatMap((topic) => topic.resources);
    return Math.round(
      allResources.reduce((sum, resource) => sum + resource.match, 0) /
        allResources.length
    );
  }, []);

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("recommendations");
    }, 700);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getLevelClass = (difficulty) => {
    if (difficulty === "Beginner") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (difficulty === "Medium" || difficulty === "Beginner → Medium") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400";
  };

  const getResourceIcon = (type) => {
    if (type === "Book" || type === "Reading") {
      return <BookOpen size={24} className="text-blue-600" />;
    }

    if (type === "Project") {
      return <FolderKanban size={24} className="text-violet-600" />;
    }

    if (type === "Questions" || type === "DSA Sheet") {
      return <Code2 size={24} className="text-green-600" />;
    }

    return <FileText size={24} className="text-orange-500" />;
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <Layers size={34} className="text-violet-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Preparation Resource Difficulty Matching
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Get learning resources that match your current skill level,
                topic mastery, and preparation progress.
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
                Matching Resources...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Match My Resources
              </>
            )}
          </button>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <BookOpen className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Resources Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              126
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Recommended Resources
            </p>

            <p className="text-5xl font-black mt-3">
              24
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <TrendingUp className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Average Resource Match
            </p>

            <p className="text-5xl font-black mt-3">
              {averageMatch}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Award className="text-orange-500" size={30} />

            <p className="text-gray-500 mt-4">
              Preparation Readiness
            </p>

            <p className="text-5xl font-black mt-3">
              {overallScore}%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Resource Difficulty Matching Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI analyzes your skill assessment results, recent question
            performance, topic mastery, and preparation history to recommend
            resources that are neither too easy nor unnecessarily difficult.
            Recommendations can include books, DSA sheets, questions,
            projects, and practice materials.
          </p>

        </div>

        {/* Topic Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Preparation Topic
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {topics.map((topic, index) => (

              <button
                key={index}
                type="button"
                onClick={() => setSelectedTopic(index)}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedTopic === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                  {topic.level}
                </span>

                <h3 className="font-bold text-lg mt-5">
                  {topic.name}
                </h3>

                <div className="flex items-center justify-between mt-5">

                  <span className="text-sm text-gray-500">
                    Mastery
                  </span>

                  <span
                    className={`font-bold ${getScoreColor(
                      topic.mastery
                    )}`}
                  >
                    {topic.mastery}%
                  </span>

                </div>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-3 overflow-hidden">

                  <div
                    className="h-full bg-violet-600"
                    style={{
                      width: `${topic.mastery}%`,
                    }}
                  />

                </div>

              </button>
            ))}

          </div>

        </div>

        {/* Selected Topic */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

            <div>

              <p className="text-sm text-gray-500">
                Selected Topic
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                {selected.name}
              </h2>

              <div className="flex flex-wrap gap-3 mt-5">

                <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
                  Current Level: {selected.level}
                </span>

                <span className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  Recommended: {selected.recommendedDifficulty}
                </span>

              </div>

            </div>

            <div className="text-center">

              <p className="text-sm text-gray-500">
                Topic Readiness
              </p>

              <p className="text-6xl font-black text-violet-600 mt-2">
                {selected.readiness}%
              </p>

            </div>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("recommendations")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "recommendations"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Recommended Resources
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("analysis")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "analysis"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Skill Analysis
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("gaps")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "gaps"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Skill Gaps
          </button>

        </div>

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6">

            <div className="grid lg:grid-cols-3 gap-6">

              {selected.resources.map((resource, index) => (

                <div
                  key={index}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6"
                >

                  <div className="flex items-center justify-between gap-4">

                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {getResourceIcon(resource.type)}
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelClass(
                        resource.difficulty
                      )}`}
                    >
                      {resource.difficulty}
                    </span>

                  </div>

                  <h3 className="text-xl font-bold mt-6">
                    {resource.title}
                  </h3>

                  <p className="text-sm text-violet-600 font-semibold mt-2">
                    {resource.type}
                  </p>

                  <p className="text-gray-500 mt-4 leading-6">
                    {resource.description}
                  </p>

                  <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">

                    <Clock size={16} />

                    {resource.duration}

                  </div>

                  <div className="mt-6">

                    <div className="flex justify-between mb-2">

                      <span className="text-sm text-gray-500">
                        AI Match
                      </span>

                      <span className="font-black text-green-600">
                        {resource.match}%
                      </span>

                    </div>

                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                        style={{
                          width: `${resource.match}%`,
                        }}
                      />

                    </div>

                  </div>

                  <button
                    type="button"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
                  >
                    Start Resource
                    <ArrowRight size={18} />
                  </button>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* Skill Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Skill-Level Analysis
                </h2>

              </div>

              <div className="space-y-7">

                <div>

                  <div className="flex justify-between mb-3">

                    <span className="font-semibold">
                      Topic Mastery
                    </span>

                    <span className="font-black text-violet-600">
                      {selected.mastery}%
                    </span>

                  </div>

                  <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full bg-violet-600"
                      style={{
                        width: `${selected.mastery}%`,
                      }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-3">

                    <span className="font-semibold">
                      Recent Performance
                    </span>

                    <span className="font-black text-blue-600">
                      {selected.performance}%
                    </span>

                  </div>

                  <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full bg-blue-600"
                      style={{
                        width: `${selected.performance}%`,
                      }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-3">

                    <span className="font-semibold">
                      Preparation Readiness
                    </span>

                    <span className="font-black text-green-600">
                      {selected.readiness}%
                    </span>

                  </div>

                  <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full bg-green-600"
                      style={{
                        width: `${selected.readiness}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Brain className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Matching Decision
                </h2>

              </div>

              <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

                <p className="text-sm text-gray-500">
                  Recommended Resource Level
                </p>

                <p className="text-3xl font-black text-violet-600 mt-3">
                  {selected.recommendedDifficulty}
                </p>

              </div>

              <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

                <p className="font-semibold">
                  Why this level?
                </p>

                <p className="text-gray-500 mt-3 leading-7">
                  {selected.reason}
                </p>

              </div>

              <div className="mt-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

                <div className="flex items-start gap-3">

                  <CheckCircle2
                    className="text-green-600 shrink-0"
                    size={22}
                  />

                  <p className="text-gray-600 dark:text-gray-300 leading-6">
                    AI recommends resources that challenge you enough to
                    grow without creating unnecessary learning friction.
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Skill Gaps */}

        {activeTab === "gaps" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <AlertTriangle className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Areas Needing Improvement
                </h2>

              </div>

              <div className="space-y-4">

                {selected.gaps.map((gap, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-5"
                  >

                    <AlertTriangle
                      className="text-orange-500 shrink-0"
                      size={21}
                    />

                    <p className="font-semibold">
                      {gap}
                    </p>

                  </div>
                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Award className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Current Strengths
                </h2>

              </div>

              <div className="space-y-4">

                {selected.strengths.map((strength, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl bg-green-50 dark:bg-green-900/10 p-5"
                  >

                    <CheckCircle2
                      className="text-green-600 shrink-0"
                      size={21}
                    />

                    <p className="font-semibold">
                      {strength}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* Difficulty Matching Explanation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              How AI Matches Resource Difficulty
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              {
                title: "Skill Assessment",
                description:
                  "Uses your assessment results to estimate your current ability.",
                icon: "🧠",
              },
              {
                title: "Performance",
                description:
                  "Reviews recent question accuracy and solving performance.",
                icon: "📊",
              },
              {
                title: "Topic Mastery",
                description:
                  "Measures how well you understand individual topics.",
                icon: "🎯",
              },
              {
                title: "Learning History",
                description:
                  "Considers previously completed resources and practice.",
                icon: "📚",
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

        {/* Resource Difficulty Levels */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Layers className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Personalized Difficulty Levels
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

              <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-semibold">
                Beginner
              </span>

              <h3 className="text-xl font-bold mt-5">
                Build Foundations
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Recommended when fundamental concepts need strengthening
                before moving to more difficult material.
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

              <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 font-semibold">
                Intermediate
              </span>

              <h3 className="text-xl font-bold mt-5">
                Build Interview Readiness
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Recommended when the user has solid fundamentals and needs
                targeted interview-level practice.
              </p>

            </div>

            <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

              <span className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400 font-semibold">
                Advanced
              </span>

              <h3 className="text-xl font-bold mt-5">
                Push Technical Depth
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Recommended when the user has strong mastery and needs
                challenging problems or advanced system concepts.
              </p>

            </div>

          </div>

        </div>

        {/* Resource Match Scores */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Resource Match Quality
            </h2>

          </div>

          <div className="space-y-7">

            {selected.resources.map((resource) => (

              <div key={resource.title}>

                <div className="flex justify-between mb-3">

                  <span className="font-semibold">
                    {resource.title}
                  </span>

                  <span className="font-black text-green-600">
                    {resource.match}%
                  </span>

                </div>

                <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                    style={{
                      width: `${resource.match}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

          <div className="mt-8 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

            <div className="flex items-center gap-3">

              <Sparkles
                size={22}
                className="text-violet-600"
              />

              <p className="font-bold">
                AI Recommendation
              </p>

            </div>

            <p className="text-gray-500 mt-3 leading-7">
              Start with the highest-match resources first. Resources with
              significantly lower match scores may be useful later after
              your mastery improves.
            </p>

          </div>

        </div>

        {/* Common Resource Types */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Personalized Resource Types
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-200 dark:border-white/10">

                  <th className="p-4">
                    Resource
                  </th>

                  <th className="p-4">
                    Best For
                  </th>

                  <th className="p-4">
                    AI Matching Factor
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  [
                    "Books",
                    "Conceptual learning",
                    "Topic mastery and knowledge gaps",
                  ],
                  [
                    "DSA Sheets",
                    "Structured practice",
                    "Question accuracy and topic performance",
                  ],
                  [
                    "Questions",
                    "Interview practice",
                    "Current difficulty readiness",
                  ],
                  [
                    "Projects",
                    "Practical application",
                    "Technical skill and preparation level",
                  ],
                  [
                    "Practice Materials",
                    "Targeted revision",
                    "Recent mistakes and weak areas",
                  ],
                ].map((row, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-white/5"
                  >

                    <td className="p-4 font-semibold text-violet-600">
                      {row[0]}
                    </td>

                    <td className="p-4 font-semibold">
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

        {/* AI Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Resource Matching Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Match the Learner
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Recommend resources based on the user's actual ability
                instead of treating every learner the same.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                📈
              </p>

              <h3 className="text-xl font-bold mt-4">
                Support Progression
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Gradually increase difficulty as performance and mastery
                improve.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Avoid Learning Friction
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Avoid resources that are so easy they add little value or
                so difficult that they create unnecessary frustration.
              </p>

            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Resource Matching Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 68,
              },
              {
                label: "Week 2",
                score: 74,
              },
              {
                label: "Week 3",
                score: 82,
              },
              {
                label: "Current",
                score: 91,
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
                Current Recommendation
              </p>

              <h3 className="text-xl font-bold mt-2">
                {selected.recommendedDifficulty}
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Focus on resources at this level to maximize learning
                efficiency for {selected.name}.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Close Skill Gaps
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Choose resources that directly target your weaker concepts
                instead of repeating topics you already understand.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Step
              </p>

              <h3 className="text-xl font-bold mt-2">
                Start Highest Match
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Begin with the resource that has the highest AI match score
                and reassess your difficulty level after completing it.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Resource Matching Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your preparation profile is being matched with resources
                according to your current skill level, topic mastery,
                performance, and learning history.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {averageMatch}%
              </p>

              <p className="text-gray-500 mt-2">
                Resource Match
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
              style={{
                width: `${averageMatch}%`,
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
                The most useful resource is not always the most difficult
                one. Your preparation should progress from your current
                ability toward the next level. Use your recent performance,
                topic mastery, and learning history to select resources that
                challenge you appropriately and help close your specific
                skill gaps.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Match
              </h3>

              <p className="text-5xl font-black">
                {averageMatch}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationResourceDifficultyMatching;