import React, { useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  Star,
  TrendingUp,
  Filter,
  Search,
  ChevronDown,
  CheckCircle2,
  Clock,
  Award,
  BarChart3,
  RefreshCw,
  Briefcase,
  Code2,
  Database,
  Server,
  Layers,
} from "lucide-react";

const questions = [
  {
    id: 1,
    title: "Design a Scalable URL Shortener",
    topic: "System Design",
    difficulty: "Hard",
    relevance: 97,
    label: "Highly Relevant",
    skills: ["System Design", "Scalability", "Databases"],
    reason: "Strong match for Backend Developer requirements.",
    attempts: 2,
    score: 68,
  },
  {
    id: 2,
    title: "Implement LRU Cache",
    topic: "Data Structures",
    difficulty: "Medium",
    relevance: 94,
    label: "Highly Relevant",
    skills: ["DSA", "Hash Map", "Design"],
    reason: "Targets a weak topic with high role relevance.",
    attempts: 4,
    score: 71,
  },
  {
    id: 3,
    title: "Database Indexing Strategies",
    topic: "Databases",
    difficulty: "Medium",
    relevance: 91,
    label: "Highly Relevant",
    skills: ["SQL", "Databases", "Performance"],
    reason: "Important database concept for your target role.",
    attempts: 1,
    score: 76,
  },
  {
    id: 4,
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    relevance: 84,
    label: "Relevant",
    skills: ["Arrays", "Hashing", "Problem Solving"],
    reason: "Useful for maintaining core problem-solving skills.",
    attempts: 7,
    score: 94,
  },
  {
    id: 5,
    title: "REST API Design Principles",
    topic: "Backend",
    difficulty: "Medium",
    relevance: 88,
    label: "Relevant",
    skills: ["APIs", "Backend", "Architecture"],
    reason: "Matches common backend interview requirements.",
    attempts: 3,
    score: 82,
  },
  {
    id: 6,
    title: "Binary Tree Traversal",
    topic: "Trees",
    difficulty: "Easy",
    relevance: 72,
    label: "Relevant",
    skills: ["Trees", "Recursion", "DSA"],
    reason: "Good revision topic but currently a lower priority.",
    attempts: 8,
    score: 91,
  },
  {
    id: 7,
    title: "Advanced Graph Algorithms",
    topic: "Graphs",
    difficulty: "Hard",
    relevance: 63,
    label: "Optional",
    skills: ["Graphs", "Algorithms", "DSA"],
    reason: "Lower priority based on current role requirements.",
    attempts: 0,
    score: 0,
  },
  {
    id: 8,
    title: "Frontend Component Optimization",
    topic: "Frontend",
    difficulty: "Medium",
    relevance: 42,
    label: "Optional",
    skills: ["React", "Frontend", "Performance"],
    reason: "Limited relevance for your selected backend role.",
    attempts: 1,
    score: 80,
  },
];

const roleRequirements = [
  {
    name: "Backend Development",
    match: 94,
    icon: Server,
  },
  {
    name: "System Design",
    match: 91,
    icon: Layers,
  },
  {
    name: "Database Engineering",
    match: 86,
    icon: Database,
  },
  {
    name: "Problem Solving",
    match: 82,
    icon: Code2,
  },
];

const getLabelClass = (label) => {
  if (label === "Highly Relevant") {
    return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
  }

  if (label === "Relevant") {
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
  }

  return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
};

const getDifficultyClass = (difficulty) => {
  if (difficulty === "Hard") {
    return "text-red-600";
  }

  if (difficulty === "Medium") {
    return "text-orange-600";
  }

  return "text-green-600";
};

const AIInterviewQuestionRelevanceRanking = () => {
  const [activeTab, setActiveTab] = useState("ranking");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredQuestions = useMemo(() => {
    const filtered = questions.filter((question) => {
      const matchesSearch =
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.topic.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filter === "All" || question.label === filter;

      return matchesSearch && matchesFilter;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "difficulty") {
        const order = {
          Easy: 1,
          Medium: 2,
          Hard: 3,
        };

        return order[b.difficulty] - order[a.difficulty];
      }

      if (sortBy === "score") {
        return b.score - a.score;
      }

      return b.relevance - a.relevance;
    });
  }, [searchTerm, filter, sortBy]);

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
              <Target size={34} className="text-blue-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                AI Interview Question Relevance Ranking
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Discover which interview questions deserve the most attention
                based on your role, skills, weaknesses, and performance.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            <RefreshCw
              size={19}
              className={isRefreshing ? "animate-spin" : ""}
            />
            {isRefreshing ? "Re-ranking..." : "Refresh Ranking"}
          </button>

        </div>

        {/* Hero */}

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">
            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Practice What Matters Most
            </h2>
          </div>

          <p className="leading-8 text-white/90">
            AI ranks your question bank according to your target role,
            required skills, weak topics, preparation progress, difficulty,
            and previous performance.
          </p>

        </div>

        {/* Profile Summary */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <Briefcase className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Target Role
            </p>

            <p className="text-xl font-bold mt-2">
              Backend Developer
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <Star className="text-yellow-500" size={30} />

            <p className="text-gray-500 mt-4">
              Highly Relevant
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              3
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <Target className="text-indigo-600" size={30} />

            <p className="text-gray-500 mt-4">
              Avg. Relevance
            </p>

            <p className="text-5xl font-black text-indigo-600 mt-2">
              79%
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <TrendingUp className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Questions Prioritized
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              8
            </p>
          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["ranking", "Question Ranking"],
            ["role", "Role Relevance"],
            ["weaknesses", "Weak Topic Focus"],
            ["analytics", "Ranking Analytics"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Ranking */}

        {activeTab === "ranking" && (
          <div className="mt-6 space-y-6">

            {/* Filters */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-5">

              <div className="flex flex-col lg:flex-row gap-4">

                <div className="relative flex-1">

                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search questions or topics..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                <div className="relative">

                  <Filter
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="appearance-none pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 outline-none"
                  >
                    <option value="All">All Relevance</option>
                    <option value="Highly Relevant">
                      Highly Relevant
                    </option>
                    <option value="Relevant">Relevant</option>
                    <option value="Optional">Optional</option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  />

                </div>

                <div className="relative">

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pr-10 pl-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 outline-none"
                  >
                    <option value="relevance">
                      Sort by Relevance
                    </option>
                    <option value="difficulty">
                      Sort by Difficulty
                    </option>
                    <option value="score">
                      Sort by Performance
                    </option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  />

                </div>

              </div>

            </div>

            {/* Question List */}

            {filteredQuestions.map((question, index) => (

              <div
                key={question.id}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-7"
              >

                <div className="flex flex-col lg:flex-row gap-6">

                  {/* Rank */}

                  <div className="flex items-center gap-4 lg:w-20 shrink-0">

                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">

                      <span className="text-xl font-black text-blue-600">
                        #{index + 1}
                      </span>

                    </div>

                  </div>

                  {/* Content */}

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-xl font-bold">
                        {question.title}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getLabelClass(
                          question.label
                        )}`}
                      >
                        {question.label}
                      </span>

                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">

                      <span className="text-gray-500">
                        {question.topic}
                      </span>

                      <span className="text-gray-300">
                        •
                      </span>

                      <span
                        className={`font-bold ${getDifficultyClass(
                          question.difficulty
                        )}`}
                      >
                        {question.difficulty}
                      </span>

                    </div>

                    <p className="text-gray-500 mt-4 leading-7">
                      {question.reason}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-5">

                      {question.skills.map((skill) => (

                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm"
                        >
                          {skill}
                        </span>

                      ))}

                    </div>

                    <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-500">

                      <span className="flex items-center gap-2">
                        <Clock size={16} />
                        {question.attempts} attempts
                      </span>

                      <span className="flex items-center gap-2">
                        <Award size={16} />
                        Best score: {question.score || "Not attempted"}
                      </span>

                    </div>

                  </div>

                  {/* Relevance */}

                  <div className="lg:w-36 shrink-0 flex lg:flex-col items-center lg:justify-center gap-3">

                    <div className="relative w-24 h-24">

                      <svg
                        className="w-24 h-24 -rotate-90"
                        viewBox="0 0 100 100"
                      >

                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="10"
                          className="text-gray-200 dark:text-gray-700"
                        />

                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={`${question.relevance * 2.64} 264`}
                          className={
                            question.relevance >= 90
                              ? "text-green-500"
                              : question.relevance >= 70
                              ? "text-blue-500"
                              : "text-gray-400"
                          }
                        />

                      </svg>

                      <div className="absolute inset-0 flex items-center justify-center">

                        <span className="text-xl font-black">
                          {question.relevance}%
                        </span>

                      </div>

                    </div>

                    <p className="text-sm font-semibold text-gray-500">
                      AI Relevance
                    </p>

                  </div>

                </div>

              </div>

            ))}

            {filteredQuestions.length === 0 && (
              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-12 text-center">

                <Search
                  size={45}
                  className="mx-auto text-gray-400"
                />

                <h3 className="text-xl font-bold mt-5">
                  No questions found
                </h3>

                <p className="text-gray-500 mt-2">
                  Try changing your search or relevance filter.
                </p>

              </div>
            )}

          </div>
        )}

        {/* Role Relevance */}

        {activeTab === "role" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Briefcase className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Target Role Matching
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {roleRequirements.map((role) => {

                  const Icon = role.icon;

                  return (
                    <div
                      key={role.name}
                      className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                    >

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">

                            <Icon
                              size={24}
                              className="text-blue-600"
                            />

                          </div>

                          <h3 className="font-bold">
                            {role.name}
                          </h3>

                        </div>

                        <span className="text-xl font-black text-blue-600">
                          {role.match}%
                        </span>

                      </div>

                      <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-6">

                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{
                            width: `${role.match}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">

              <div className="flex items-center gap-3 mb-5">

                <Sparkles size={28} />

                <h2 className="text-2xl font-bold">
                  AI Role Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90">
                Your question ranking is optimized for a Backend Developer
                role. System design, databases, API architecture, and
                performance-related questions receive higher priority because
                they align strongly with the selected role.
              </p>

            </div>

          </div>
        )}

        {/* Weaknesses */}

        {activeTab === "weaknesses" && (
          <div className="mt-6 space-y-8">

            <div className="grid md:grid-cols-3 gap-6">

              {[
                {
                  topic: "System Design",
                  score: 68,
                  priority: "Critical",
                  questions: 12,
                },
                {
                  topic: "Data Structures",
                  score: 74,
                  priority: "High",
                  questions: 18,
                },
                {
                  topic: "Databases",
                  score: 76,
                  priority: "High",
                  questions: 9,
                },
              ].map((item) => (

                <div
                  key={item.topic}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="flex items-center justify-between">

                    <h3 className="text-xl font-bold">
                      {item.topic}
                    </h3>

                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 text-xs font-bold">
                      {item.priority}
                    </span>

                  </div>

                  <p className="text-5xl font-black text-orange-600 mt-7">
                    {item.score}%
                  </p>

                  <p className="text-gray-500 mt-2">
                    Current mastery
                  </p>

                  <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                    <div
                      className="h-full rounded-full bg-orange-500"
                      style={{
                        width: `${item.score}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between mt-5 text-sm text-gray-500">

                    <span>
                      Available questions
                    </span>

                    <strong>
                      {item.questions}
                    </strong>

                  </div>

                </div>

              ))}

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Brain className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Weakness-Based Ranking
                </h2>

              </div>

              <p className="text-gray-500 leading-8">
                Questions related to your weaker areas receive an additional
                relevance boost. This ensures the ranking does not only show
                questions that match your role, but also questions that can
                actively improve your current weaknesses.
              </p>

              <div className="mt-7 grid md:grid-cols-3 gap-5">

                {[
                  ["Role Match", "+40%", "text-blue-600"],
                  ["Weak Topic", "+30%", "text-orange-600"],
                  ["Past Performance", "+20%", "text-green-600"],
                ].map(([title, value, color]) => (

                  <div
                    key={title}
                    className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6"
                  >

                    <p className="text-gray-500">
                      {title}
                    </p>

                    <p className={`text-3xl font-black mt-2 ${color}`}>
                      {value}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Analytics */}

        {activeTab === "analytics" && (
          <div className="mt-6 space-y-8">

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
                <BarChart3 className="text-blue-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Highly Relevant
                </p>

                <p className="text-5xl font-black text-blue-600 mt-2">
                  38%
                </p>
              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
                <Target className="text-green-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Relevant
                </p>

                <p className="text-5xl font-black text-green-600 mt-2">
                  42%
                </p>
              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
                <Star className="text-gray-500" size={30} />

                <p className="text-gray-500 mt-4">
                  Optional
                </p>

                <p className="text-5xl font-black text-gray-500 mt-2">
                  20%
                </p>
              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
                <TrendingUp className="text-violet-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Avg. Relevance
                </p>

                <p className="text-5xl font-black text-violet-600 mt-2">
                  79%
                </p>
              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Relevance Distribution
                </h2>

              </div>

              <div className="space-y-7">

                {[
                  ["Highly Relevant", 38, "bg-green-500"],
                  ["Relevant", 42, "bg-blue-500"],
                  ["Optional", 20, "bg-gray-400"],
                ].map(([label, percentage, color]) => (

                  <div key={label}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {label}
                      </span>

                      <span className="font-bold">
                        {percentage}%
                      </span>

                    </div>

                    <div className="h-5 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className={`h-full rounded-full ${color}`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Sparkles className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Ranking Explanation
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {[
                  "Target role alignment",
                  "Required skill coverage",
                  "Weak-topic relevance",
                  "Previous question performance",
                  "Question difficulty",
                  "Preparation progress",
                ].map((factor, index) => (

                  <div
                    key={factor}
                    className="flex items-center gap-4 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5"
                  >

                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <span className="font-semibold">
                      {factor}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* How Ranking Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              How AI Ranking Works
            </h2>

          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">

            {[
              ["1", "Role", "Target job requirements"],
              ["2", "Skills", "Required competencies"],
              ["3", "Weakness", "Low-performing topics"],
              ["4", "Progress", "Current preparation stage"],
              ["5", "Difficulty", "Question complexity"],
              ["6", "Performance", "Previous attempts"],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">
                  {number}
                </div>

                <h3 className="font-bold mt-4">
                  {title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Benefits */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 size={30} />

            <h2 className="text-3xl font-bold">
              Benefits
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              [
                "🎯",
                "High-Value Practice",
                "Focuses preparation on questions that matter most.",
              ],
              [
                "⏱️",
                "Saves Time",
                "Reduces time spent searching through large question banks.",
              ],
              [
                "💼",
                "Role-Specific",
                "Prioritizes questions relevant to the target job.",
              ],
              [
                "🧠",
                "Personalized",
                "Uses weaknesses and previous performance to improve ranking.",
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
                Prioritize system design, database, and backend architecture
                questions first. These questions have the strongest
                combination of role relevance and alignment with your current
                weaker areas.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Top Question
              </h3>

              <p className="text-xl font-black mt-2">
                97% Relevant
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionRelevanceRanking;