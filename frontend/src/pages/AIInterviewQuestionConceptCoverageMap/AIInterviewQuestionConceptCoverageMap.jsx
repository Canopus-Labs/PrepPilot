import React, { useMemo, useState } from "react";
import {
  Brain,
  Map,
  Target,
  CheckCircle2,
  AlertTriangle,
  Circle,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Sparkles,
  ArrowRight,
  BarChart3,
  Search,
  RefreshCw,
  Award,
  Layers,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

const AIInterviewQuestionConceptCoverageMap = () => {
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const concepts = [
    {
      id: 1,
      name: "Arrays",
      category: "Data Structures",
      mastery: 92,
      status: "mastered",
      practiced: 24,
      solved: 22,
      totalQuestions: 25,
      accuracy: 92,
      lastPracticed: "2 days ago",
      description:
        "Array operations, indexing, traversal, searching, sorting, and common interview patterns.",
      related: ["Strings", "Two Pointers", "Sliding Window"],
    },
    {
      id: 2,
      name: "Linked Lists",
      category: "Data Structures",
      mastery: 76,
      status: "strong",
      practiced: 16,
      solved: 13,
      totalQuestions: 20,
      accuracy: 81,
      lastPracticed: "4 days ago",
      description:
        "Node-based data structures, insertion, deletion, traversal, and pointer manipulation.",
      related: ["Stacks", "Queues", "Pointers"],
    },
    {
      id: 3,
      name: "Binary Trees",
      category: "Data Structures",
      mastery: 64,
      status: "developing",
      practiced: 12,
      solved: 8,
      totalQuestions: 25,
      accuracy: 67,
      lastPracticed: "1 week ago",
      description:
        "Tree traversal, recursion, height, balanced trees, and binary search trees.",
      related: ["Recursion", "Graphs", "BST"],
    },
    {
      id: 4,
      name: "Graphs",
      category: "Algorithms",
      mastery: 42,
      status: "partial",
      practiced: 7,
      solved: 3,
      totalQuestions: 25,
      accuracy: 57,
      lastPracticed: "2 weeks ago",
      description:
        "Graph representation, BFS, DFS, shortest paths, and connectivity problems.",
      related: ["BFS", "DFS", "Dynamic Programming"],
    },
    {
      id: 5,
      name: "Dynamic Programming",
      category: "Algorithms",
      mastery: 28,
      status: "partial",
      practiced: 4,
      solved: 1,
      totalQuestions: 20,
      accuracy: 35,
      lastPracticed: "3 weeks ago",
      description:
        "Memoization, tabulation, optimal substructure, and overlapping subproblems.",
      related: ["Recursion", "Graphs", "Greedy Algorithms"],
    },
    {
      id: 6,
      name: "Sorting Algorithms",
      category: "Algorithms",
      mastery: 88,
      status: "strong",
      practiced: 18,
      solved: 16,
      totalQuestions: 20,
      accuracy: 89,
      lastPracticed: "3 days ago",
      description:
        "Bubble sort, selection sort, insertion sort, merge sort, quick sort, and complexity analysis.",
      related: ["Searching", "Arrays", "Time Complexity"],
    },
    {
      id: 7,
      name: "SQL Queries",
      category: "DBMS",
      mastery: 81,
      status: "strong",
      practiced: 20,
      solved: 17,
      totalQuestions: 25,
      accuracy: 85,
      lastPracticed: "5 days ago",
      description:
        "SELECT queries, joins, grouping, aggregation, subqueries, and query optimization.",
      related: ["Joins", "Indexes", "Database Design"],
    },
    {
      id: 8,
      name: "Database Normalization",
      category: "DBMS",
      mastery: 52,
      status: "partial",
      practiced: 6,
      solved: 4,
      totalQuestions: 15,
      accuracy: 67,
      lastPracticed: "10 days ago",
      description:
        "Functional dependencies, normal forms, redundancy, and database design principles.",
      related: ["SQL", "Database Design", "Transactions"],
    },
    {
      id: 9,
      name: "Operating System Processes",
      category: "Operating Systems",
      mastery: 74,
      status: "strong",
      practiced: 14,
      solved: 11,
      totalQuestions: 20,
      accuracy: 79,
      lastPracticed: "6 days ago",
      description:
        "Processes, threads, scheduling, synchronization, and process states.",
      related: ["Threads", "Scheduling", "Deadlocks"],
    },
    {
      id: 10,
      name: "Deadlocks",
      category: "Operating Systems",
      mastery: 35,
      status: "partial",
      practiced: 3,
      solved: 1,
      totalQuestions: 15,
      accuracy: 50,
      lastPracticed: "2 weeks ago",
      description:
        "Deadlock conditions, prevention, avoidance, detection, and recovery.",
      related: ["Processes", "Threads", "Synchronization"],
    },
    {
      id: 11,
      name: "Computer Networks",
      category: "Networking",
      mastery: 18,
      status: "unexplored",
      practiced: 1,
      solved: 0,
      totalQuestions: 25,
      accuracy: 0,
      lastPracticed: "Never",
      description:
        "Networking fundamentals including OSI, TCP/IP, routing, protocols, and network security.",
      related: ["TCP/IP", "HTTP", "OSI Model"],
    },
    {
      id: 12,
      name: "OOP Concepts",
      category: "Object Oriented Programming",
      mastery: 94,
      status: "mastered",
      practiced: 26,
      solved: 25,
      totalQuestions: 25,
      accuracy: 96,
      lastPracticed: "Yesterday",
      description:
        "Encapsulation, inheritance, polymorphism, abstraction, classes, and interfaces.",
      related: ["Design Patterns", "Classes", "Interfaces"],
    },
  ];

  const categories = [
    {
      name: "Data Structures",
      icon: "🧩",
      color: "blue",
      concepts: 3,
      coverage: 77,
    },
    {
      name: "Algorithms",
      icon: "⚡",
      color: "violet",
      concepts: 3,
      coverage: 53,
    },
    {
      name: "DBMS",
      icon: "🗄️",
      color: "green",
      concepts: 2,
      coverage: 67,
    },
    {
      name: "Operating Systems",
      icon: "💻",
      color: "orange",
      concepts: 2,
      coverage: 55,
    },
    {
      name: "Networking",
      icon: "🌐",
      color: "cyan",
      concepts: 1,
      coverage: 18,
    },
    {
      name: "OOP",
      icon: "🏗️",
      color: "pink",
      concepts: 1,
      coverage: 94,
    },
  ];

  const filteredConcepts = useMemo(() => {
    return concepts.filter((concept) => {
      const matchesFilter =
        activeFilter === "all" || concept.status === activeFilter;

      const matchesSearch =
        concept.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        concept.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  const overallCoverage = useMemo(() => {
    return Math.round(
      concepts.reduce((sum, concept) => sum + concept.mastery, 0) /
        concepts.length
    );
  }, []);

  const practicedConcepts = concepts.filter(
    (concept) =>
      concept.status === "mastered" ||
      concept.status === "strong"
  ).length;

  const partialConcepts = concepts.filter(
    (concept) =>
      concept.status === "developing" ||
      concept.status === "partial"
  ).length;

  const unexploredConcepts = concepts.filter(
    (concept) => concept.status === "unexplored"
  ).length;

  const totalQuestions = concepts.reduce(
    (sum, concept) => sum + concept.totalQuestions,
    0
  );

  const solvedQuestions = concepts.reduce(
    (sum, concept) => sum + concept.solved,
    0
  );

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
    }, 800);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "mastered":
        return "Mastered";
      case "strong":
        return "Strong";
      case "developing":
        return "Developing";
      case "partial":
        return "Partially Covered";
      case "unexplored":
        return "Unexplored";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "mastered":
        return "text-green-600";
      case "strong":
        return "text-blue-600";
      case "developing":
        return "text-yellow-600";
      case "partial":
        return "text-orange-500";
      case "unexplored":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "mastered":
        return "bg-green-100 dark:bg-green-900/20";
      case "strong":
        return "bg-blue-100 dark:bg-blue-900/20";
      case "developing":
        return "bg-yellow-100 dark:bg-yellow-900/20";
      case "partial":
        return "bg-orange-100 dark:bg-orange-900/20";
      case "unexplored":
        return "bg-red-100 dark:bg-red-900/20";
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  const getMasteryBar = (score) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 50) return "bg-yellow-500";
    if (score >= 30) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Map
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Question Concept Coverage Map
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Discover which interview concepts you have mastered,
              partially covered, or have not explored yet.
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
              Overall Coverage
            </p>

            <p className="text-5xl font-black mt-3">
              {overallCoverage}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Strong Concepts
            </p>

            <p className="text-5xl font-black mt-3">
              {practicedConcepts}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Partial Coverage
            </p>

            <p className="text-5xl font-black mt-3">
              {partialConcepts}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Circle
              className="mx-auto text-red-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Unexplored
            </p>

            <p className="text-5xl font-black mt-3">
              {unexploredConcepts}
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Concept Coverage Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-4xl">
            Solving many questions does not always mean you have covered
            the important concepts. This map groups your interview
            questions by underlying concepts and identifies areas that
            need more practice.
          </p>

        </div>

        {/* Coverage Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center gap-10">

            <div className="relative w-52 h-52 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">

              <div className="absolute inset-4 rounded-full border-[18px] border-violet-500 border-r-gray-200 dark:border-r-gray-700 border-b-gray-200 dark:border-b-gray-700" />

              <div className="text-center relative">

                <p className="text-5xl font-black text-violet-600">
                  {overallCoverage}%
                </p>

                <p className="text-gray-500 mt-2">
                  Coverage
                </p>

              </div>

            </div>

            <div className="flex-1 w-full">

              <h2 className="text-2xl font-bold">
                Your Preparation Coverage
              </h2>

              <p className="text-gray-500 mt-3 leading-7">
                Your preparation covers several core concepts well,
                but there are still important knowledge gaps that could
                affect interview performance.
              </p>

              <div className="grid sm:grid-cols-3 gap-5 mt-7">

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-5">

                  <p className="text-sm text-gray-500">
                    Strong
                  </p>

                  <p className="text-3xl font-black text-green-600 mt-2">
                    {practicedConcepts}
                  </p>

                </div>

                <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-5">

                  <p className="text-sm text-gray-500">
                    Needs Practice
                  </p>

                  <p className="text-3xl font-black text-orange-500 mt-2">
                    {partialConcepts}
                  </p>

                </div>

                <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 p-5">

                  <p className="text-sm text-gray-500">
                    Not Explored
                  </p>

                  <p className="text-3xl font-black text-red-600 mt-2">
                    {unexploredConcepts}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Concept Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Layers className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Concept Coverage by Category
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {categories.map((category) => (

              <div
                key={category.name}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:-translate-y-1 transition"
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <span className="text-3xl">
                      {category.icon}
                    </span>

                    <div>

                      <h3 className="font-bold text-lg">
                        {category.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {category.concepts} concepts
                      </p>

                    </div>

                  </div>

                  <span className="font-black text-violet-600">
                    {category.coverage}%
                  </span>

                </div>

                <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-6 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
                    style={{
                      width: `${category.coverage}%`,
                    }}
                  />

                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm(category.name);
                    setActiveFilter("all");
                  }}
                  className="mt-5 inline-flex items-center gap-2 text-violet-600 font-semibold hover:gap-3 transition-all"
                >
                  Explore concepts
                  <ChevronRight size={18} />
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* Interactive Map */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

            <div className="flex items-center gap-3">

              <Map className="text-indigo-600" />

              <div>

                <h2 className="text-2xl font-bold">
                  Interactive Concept Map
                </h2>

                <p className="text-gray-500 mt-1">
                  Select a concept to inspect its coverage.
                </p>

              </div>

            </div>

            <div className="relative w-full lg:w-80">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search concepts..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-violet-500"
              />

            </div>

          </div>

          {/* Filters */}

          <div className="flex flex-wrap gap-3 mb-8">

            {[
              ["all", "All Concepts"],
              ["mastered", "Mastered"],
              ["strong", "Strong"],
              ["developing", "Developing"],
              ["partial", "Partial"],
              ["unexplored", "Unexplored"],
            ].map(([value, label]) => (

              <button
                key={value}
                type="button"
                onClick={() => setActiveFilter(value)}
                className={`px-4 py-2 rounded-xl font-semibold transition ${
                  activeFilter === value
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                {label}
              </button>

            ))}

          </div>

          {/* Map Nodes */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {filteredConcepts.map((concept) => (

              <button
                key={concept.id}
                type="button"
                onClick={() => setSelectedConcept(concept)}
                className={`text-left rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ${
                  selectedConcept?.id === concept.id
                    ? "border-violet-500 ring-2 ring-violet-200 dark:ring-violet-900"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusBg(
                        concept.status
                      )} ${getStatusColor(concept.status)}`}
                    >
                      {getStatusLabel(concept.status)}
                    </span>

                    <h3 className="font-bold text-lg mt-4">
                      {concept.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {concept.category}
                    </p>

                  </div>

                  <span
                    className={`text-2xl font-black ${getStatusColor(
                      concept.status
                    )}`}
                  >
                    {concept.mastery}%
                  </span>

                </div>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                  <div
                    className={`h-full rounded-full ${getMasteryBar(
                      concept.mastery
                    )}`}
                    style={{
                      width: `${concept.mastery}%`,
                    }}
                  />

                </div>

                <div className="flex justify-between text-sm text-gray-500 mt-4">

                  <span>
                    {concept.solved}/{concept.practiced} solved
                  </span>

                  <span>
                    {concept.accuracy}% accuracy
                  </span>

                </div>

              </button>

            ))}

          </div>

          {filteredConcepts.length === 0 && (

            <div className="text-center py-14">

              <Search
                size={42}
                className="mx-auto text-gray-400"
              />

              <h3 className="font-bold text-xl mt-4">
                No concepts found
              </h3>

              <p className="text-gray-500 mt-2">
                Try another search term or filter.
              </p>

            </div>

          )}

        </div>

        {/* Selected Concept Details */}

        {selectedConcept && (

          <div className="mt-8 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex flex-col lg:flex-row justify-between gap-6">

              <div>

                <span
                  className={`inline-block px-4 py-2 rounded-full font-semibold ${getStatusBg(
                    selectedConcept.status
                  )} ${getStatusColor(selectedConcept.status)}`}
                >
                  {getStatusLabel(selectedConcept.status)}
                </span>

                <h2 className="text-3xl font-bold mt-4">
                  {selectedConcept.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  {selectedConcept.category}
                </p>

                <p className="text-gray-500 mt-5 leading-7 max-w-3xl">
                  {selectedConcept.description}
                </p>

              </div>

              <div className="text-center">

                <p
                  className={`text-6xl font-black ${getStatusColor(
                    selectedConcept.status
                  )}`}
                >
                  {selectedConcept.mastery}%
                </p>

                <p className="text-gray-500 mt-2">
                  Mastery
                </p>

              </div>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Questions Practiced
                </p>

                <p className="text-3xl font-black mt-2">
                  {selectedConcept.practiced}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Questions Solved
                </p>

                <p className="text-3xl font-black mt-2">
                  {selectedConcept.solved}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Accuracy
                </p>

                <p className="text-3xl font-black text-violet-600 mt-2">
                  {selectedConcept.accuracy}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Last Practiced
                </p>

                <p className="text-lg font-black mt-3">
                  {selectedConcept.lastPracticed}
                </p>

              </div>

            </div>

            <div className="mt-8">

              <h3 className="font-bold text-lg">
                Related Concepts
              </h3>

              <div className="flex flex-wrap gap-3 mt-4">

                {selectedConcept.related.map((item) => (

                  <span
                    key={item}
                    className="px-4 py-2 rounded-xl bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold"
                  >
                    {item}
                  </span>

                ))}

              </div>

            </div>

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition"
              >
                <BookOpen size={19} />
                Practice This Concept
              </button>

              <button
                type="button"
                onClick={() => setSelectedConcept(null)}
                className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold"
              >
                Close Details
              </button>

            </div>

          </div>

        )}

        {/* Knowledge Gaps */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-orange-500" />

            <div>

              <h2 className="text-2xl font-bold">
                AI Detected Knowledge Gaps
              </h2>

              <p className="text-gray-500 mt-1">
                Concepts that require additional practice.
              </p>

            </div>

          </div>

          <div className="space-y-5">

            {concepts
              .filter(
                (concept) =>
                  concept.mastery < 60
              )
              .map((concept) => (

                <div
                  key={concept.id}
                  className="rounded-2xl border border-orange-200 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/10 p-6"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                    <div>

                      <div className="flex items-center gap-3">

                        <AlertTriangle
                          className="text-orange-500"
                          size={22}
                        />

                        <h3 className="text-xl font-bold">
                          {concept.name}
                        </h3>

                      </div>

                      <p className="text-gray-500 mt-2">
                        {concept.category} •{" "}
                        {concept.practiced} questions practiced
                      </p>

                    </div>

                    <div className="flex items-center gap-5">

                      <div className="text-right">

                        <p className="text-sm text-gray-500">
                          Mastery
                        </p>

                        <p className="text-3xl font-black text-orange-500">
                          {concept.mastery}%
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedConcept(concept)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition"
                      >
                        Practice
                        <ArrowRight size={18} />
                      </button>

                    </div>

                  </div>

                </div>

              ))}

          </div>

        </div>

        {/* Recommended Questions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center justify-between gap-5 mb-8">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-yellow-500" />

              <div>

                <h2 className="text-2xl font-bold">
                  AI Recommended Questions
                </h2>

                <p className="text-gray-500 mt-1">
                  Practice these concepts to improve your coverage.
                </p>

              </div>

            </div>

            <Sparkles className="text-violet-600" />

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Implement BFS Traversal",
                concept: "Graphs",
                difficulty: "Medium",
                reason: "Graph coverage is currently low.",
              },
              {
                title: "Longest Common Subsequence",
                concept: "Dynamic Programming",
                difficulty: "Hard",
                reason: "Your DP mastery needs improvement.",
              },
              {
                title: "Explain TCP vs UDP",
                concept: "Computer Networks",
                difficulty: "Easy",
                reason: "Networking is largely unexplored.",
              },
            ].map((question) => (

              <div
                key={question.title}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex items-center justify-between gap-3">

                  <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm font-semibold">
                    {question.concept}
                  </span>

                  <span className="text-sm text-gray-500">
                    {question.difficulty}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5">
                  {question.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {question.reason}
                </p>

                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 text-violet-600 font-bold"
                >
                  Practice Question
                  <ArrowRight size={18} />
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* Mastery Distribution */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Mastery Distribution
            </h2>

          </div>

          <div className="grid md:grid-cols-5 gap-5">

            {[
              {
                label: "Mastered",
                range: "85–100%",
                count: concepts.filter(
                  (c) => c.mastery >= 85
                ).length,
                icon: "🏆",
                bg: "bg-green-50 dark:bg-green-900/10",
                text: "text-green-600",
              },
              {
                label: "Strong",
                range: "70–84%",
                count: concepts.filter(
                  (c) => c.mastery >= 70 && c.mastery < 85
                ).length,
                icon: "💪",
                bg: "bg-blue-50 dark:bg-blue-900/10",
                text: "text-blue-600",
              },
              {
                label: "Developing",
                range: "50–69%",
                count: concepts.filter(
                  (c) => c.mastery >= 50 && c.mastery < 70
                ).length,
                icon: "📈",
                bg: "bg-yellow-50 dark:bg-yellow-900/10",
                text: "text-yellow-600",
              },
              {
                label: "Partial",
                range: "30–49%",
                count: concepts.filter(
                  (c) => c.mastery >= 30 && c.mastery < 50
                ).length,
                icon: "⚠️",
                bg: "bg-orange-50 dark:bg-orange-900/10",
                text: "text-orange-500",
              },
              {
                label: "Unexplored",
                range: "0–29%",
                count: concepts.filter(
                  (c) => c.mastery < 30
                ).length,
                icon: "🔴",
                bg: "bg-red-50 dark:bg-red-900/10",
                text: "text-red-600",
              },
            ].map((item) => (

              <div
                key={item.label}
                className={`rounded-2xl p-6 text-center ${item.bg}`}
              >

                <div className="text-3xl">
                  {item.icon}
                </div>

                <h3 className={`font-bold mt-4 ${item.text}`}>
                  {item.label}
                </h3>

                <p className="text-4xl font-black mt-3">
                  {item.count}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {item.range}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Question Coverage */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Question Coverage
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Questions Solved
                </span>

                <span className="font-black text-violet-600">
                  {solvedQuestions}/{totalQuestions}
                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                  style={{
                    width: `${Math.round(
                      (solvedQuestions / totalQuestions) * 100
                    )}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 text-sm mt-3">
                Overall question completion across tracked concepts.
              </p>

            </div>

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Concept Coverage
                </span>

                <span className="font-black text-green-600">
                  {overallCoverage}%
                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  style={{
                    width: `${overallCoverage}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 text-sm mt-3">
                Measures breadth and depth of concept preparation.
              </p>

            </div>

          </div>

        </div>

        {/* Coverage Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Coverage Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🗺️
              </p>

              <h3 className="text-xl font-bold mt-4">
                Think Beyond Question Counts
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Solving many questions from one topic does not guarantee
                broad interview preparation.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Target Knowledge Gaps
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Focus your practice on concepts with low mastery or
                limited question coverage.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Build Complete Coverage
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                A balanced preparation strategy reduces hidden knowledge
                gaps before interviews.
              </p>

            </div>

          </div>

        </div>

        {/* Progress Tracking */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Concept Coverage Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 41,
              },
              {
                label: "Week 2",
                score: 52,
              },
              {
                label: "Week 3",
                score: 63,
              },
              {
                label: "Current",
                score: overallCoverage,
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
                OOP & Core Data Structures
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                You have strong coverage in OOP, arrays, sorting, and
                several core data-structure concepts.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Knowledge Gap
              </p>

              <h3 className="text-xl font-bold mt-2">
                Computer Networks
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Networking has very limited practice. Start with OSI,
                TCP/IP, HTTP, and common networking interview questions.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Improve Graphs & DP
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Strengthen algorithmic coverage by practicing graph
                traversal and introductory dynamic programming problems.
              </p>

            </div>

          </div>

        </div>

        {/* Analyze Button */}

        <div className="mt-10 flex justify-center">

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
                Analyzing Coverage...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Analyze Concept Coverage
              </>
            )}

          </button>

        </div>

        {/* Final Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <GraduationCap size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your preparation is strongest in core programming and
                object-oriented concepts. To achieve more comprehensive
                interview readiness, prioritize unexplored areas such as
                computer networks and strengthen partially covered topics
                such as graphs, dynamic programming, and operating-system
                concepts.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🗺️
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Coverage
              </h3>

              <p className="text-5xl font-black">
                {overallCoverage}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionConceptCoverageMap;