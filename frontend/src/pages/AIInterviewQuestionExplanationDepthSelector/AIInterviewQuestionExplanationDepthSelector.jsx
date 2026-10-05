import React, { useState } from "react";
import {
  Brain,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock3,
  Layers,
  Lightbulb,
  Target,
  Code2,
  ChevronRight,
  RefreshCw,
  Settings2,
  GraduationCap,
  Zap,
  Search,
  Bookmark,
  ArrowRight,
  CircleHelp,
  BarChart3,
} from "lucide-react";

const AIInterviewQuestionExplanationDepthSelector = () => {
  const [selectedDepth, setSelectedDepth] = useState("standard");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState("explanation");
  const [generating, setGenerating] = useState(false);
  const [savedPreference, setSavedPreference] = useState(true);

  const depthModes = [
    {
      id: "quick",
      title: "Quick",
      subtitle: "Fast answer",
      icon: "⚡",
      color: "blue",
      time: "30 sec",
      description:
        "A concise answer with the key concept and the most important point to remember.",
      includes: [
        "Short answer",
        "Key concept",
        "Main takeaway",
      ],
    },
    {
      id: "standard",
      title: "Standard",
      subtitle: "Balanced explanation",
      icon: "🎯",
      color: "violet",
      time: "1–2 min",
      description:
        "A balanced explanation covering the concept, approach, and a practical example.",
      includes: [
        "Concept explanation",
        "Approach",
        "Example",
      ],
    },
    {
      id: "detailed",
      title: "Detailed",
      subtitle: "Step-by-step",
      icon: "📚",
      color: "green",
      time: "3–5 min",
      description:
        "A comprehensive step-by-step explanation designed for deeper understanding.",
      includes: [
        "Concept",
        "Step-by-step approach",
        "Example",
        "Common mistakes",
      ],
    },
    {
      id: "deep",
      title: "Deep Dive",
      subtitle: "Expert analysis",
      icon: "🧠",
      color: "orange",
      time: "5–10 min",
      description:
        "An advanced explanation covering edge cases, alternatives, complexity, and related concepts.",
      includes: [
        "Detailed reasoning",
        "Edge cases",
        "Alternatives",
        "Complexity",
        "Related concepts",
      ],
    },
  ];

  const questions = [
    {
      question:
        "What is the difference between an array and a linked list?",
      category: "Data Structures",
      difficulty: "Easy",
      quick: {
        answer:
          "An array stores elements in contiguous memory, while a linked list stores elements in separate nodes connected by pointers.",
        keyConcept:
          "Arrays provide fast indexed access, while linked lists provide flexible insertion and deletion.",
      },
      standard: {
        answer:
          "An array stores elements in contiguous memory locations, which allows direct O(1) indexed access. A linked list stores elements in individual nodes connected through pointers, so accessing a specific element generally requires O(n) traversal.",
        approach:
          "Compare their memory layout, access time, insertion and deletion behavior, and memory overhead.",
        example:
          "If you frequently access elements by index, an array is usually preferable. If you frequently insert or remove elements from known positions, a linked list can be useful.",
      },
      detailed: {
        answer:
          "An array is a linear data structure where elements are stored in contiguous memory locations. Because the address of each element can be calculated using its index, accessing an element takes O(1) time.",
        steps: [
          "Arrays allocate a continuous block of memory.",
          "The index is used to calculate an element's address.",
          "This provides constant-time random access.",
          "Inserting or deleting elements in the middle may require shifting elements.",
          "A linked list stores data in separate nodes connected using pointers.",
          "Finding an arbitrary node requires traversal from the beginning, which generally takes O(n).",
        ],
        example:
          "For a list of student marks where you frequently access marks by index, an array is a good choice. For a structure where elements are frequently inserted or removed, a linked list may be more appropriate.",
        mistakes: [
          "Assuming linked-list access is O(1).",
          "Ignoring the memory overhead of pointers.",
          "Assuming arrays always have faster insertion and deletion.",
        ],
      },
      deep: {
        answer:
          "Arrays and linked lists represent linear collections but make different trade-offs between memory layout, access, insertion, deletion, and cache behavior.",
        steps: [
          "Arrays use contiguous memory, enabling O(1) indexed access.",
          "Linked lists use dynamically allocated nodes connected through references or pointers.",
          "Array insertion or deletion in the middle can require O(n) shifting.",
          "Linked-list insertion can be O(1) when the target node or predecessor is already known.",
          "Linked-list lookup is generally O(n).",
          "Arrays usually benefit from better CPU cache locality.",
          "Linked lists have additional memory overhead for node pointers.",
        ],
        complexity:
          "Array access: O(1). Array search: O(n). Array insertion/deletion in the middle: O(n). Linked-list access/search: O(n). Linked-list insertion/deletion with a known node: O(1).",
        alternatives:
          "For many practical applications, dynamic arrays such as Java ArrayList or C++ vector provide a useful compromise by combining fast indexing with automatic resizing.",
        edgeCases: [
          "A linked list can still require O(n) time to locate the position before an insertion.",
          "Dynamic arrays occasionally perform O(n) resizing operations.",
          "Memory fragmentation can affect linked-list performance.",
          "For small collections, implementation simplicity may matter more than theoretical complexity.",
        ],
        related: [
          "Stacks",
          "Queues",
          "Dynamic Arrays",
          "Hash Tables",
          "Memory Management",
        ],
      },
    },
    {
      question:
        "How does a binary search algorithm work?",
      category: "Algorithms",
      difficulty: "Medium",
      quick: {
        answer:
          "Binary search repeatedly divides a sorted search range in half until the target is found or the range becomes empty.",
        keyConcept:
          "Binary search reduces the search space by half at every step.",
      },
      standard: {
        answer:
          "Binary search works on a sorted collection by comparing the target with the middle element. If the target is smaller, search the left half; if larger, search the right half.",
        approach:
          "Calculate the middle index, compare the middle value with the target, eliminate half the search space, and repeat.",
        example:
          "Searching for 70 in [10, 20, 40, 50, 70, 90] starts at 50, then searches the right half because 70 is larger.",
      },
      detailed: {
        answer:
          "Binary search is a divide-and-conquer searching algorithm that requires the data to be sorted.",
        steps: [
          "Set left to the first index.",
          "Set right to the last index.",
          "Calculate the middle index.",
          "Compare the middle element with the target.",
          "If they match, return the index.",
          "If the target is smaller, move right to mid - 1.",
          "If the target is larger, move left to mid + 1.",
          "Repeat until the target is found or left becomes greater than right.",
        ],
        example:
          "For [10, 20, 30, 40, 50, 60, 70], searching for 60 first checks 40, then 60, and finds the target after reducing the search space.",
        mistakes: [
          "Using binary search on unsorted data.",
          "Creating incorrect loop boundaries.",
          "Forgetting to update the search range.",
        ],
      },
      deep: {
        answer:
          "Binary search exploits the ordering property of a sorted search space. Instead of examining every element, it eliminates half of the remaining candidates after each comparison.",
        steps: [
          "Initialize the search interval.",
          "Choose a midpoint safely.",
          "Compare the midpoint with the target.",
          "Discard the half that cannot contain the target.",
          "Continue until the interval becomes empty.",
        ],
        complexity:
          "Time complexity is O(log n) because the search space is halved at every iteration. Space complexity is O(1) for an iterative implementation.",
        alternatives:
          "A recursive implementation can make the logic expressive but introduces O(log n) call-stack usage in the worst case.",
        edgeCases: [
          "Empty arrays.",
          "Duplicate values.",
          "Target smaller than the minimum.",
          "Target larger than the maximum.",
          "Integer overflow when calculating midpoint incorrectly in some languages.",
        ],
        related: [
          "Binary Search Trees",
          "Divide and Conquer",
          "Lower Bound",
          "Upper Bound",
          "Search Space Optimization",
        ],
      },
    },
    {
      question:
        "What is the purpose of normalization in databases?",
      category: "DBMS",
      difficulty: "Medium",
      quick: {
        answer:
          "Database normalization organizes data to reduce redundancy and prevent update anomalies.",
        keyConcept:
          "Normalization improves data consistency by structuring related data appropriately.",
      },
      standard: {
        answer:
          "Normalization is the process of organizing database tables to reduce duplicate data and avoid insertion, update, and deletion anomalies.",
        approach:
          "Identify dependencies and divide data into related tables according to normalization rules such as 1NF, 2NF, and 3NF.",
        example:
          "Instead of storing a department name repeatedly for every employee, department information can be stored in a separate table and referenced by an ID.",
      },
      detailed: {
        answer:
          "Normalization is a database design technique used to organize data into tables while reducing unnecessary duplication and improving consistency.",
        steps: [
          "First Normal Form requires atomic values and removes repeating groups.",
          "Second Normal Form removes partial dependencies on part of a composite key.",
          "Third Normal Form removes transitive dependencies between non-key attributes.",
          "Tables are connected using primary and foreign keys.",
          "The result is reduced redundancy and fewer data anomalies.",
        ],
        example:
          "If employee and department details are repeatedly stored together, changing a department name may require many updates. Separating departments into their own table avoids this duplication.",
        mistakes: [
          "Thinking normalization always improves performance.",
          "Ignoring the cost of additional joins.",
          "Applying normalization without understanding functional dependencies.",
        ],
      },
      deep: {
        answer:
          "Normalization provides a systematic way to decompose relational data based on functional dependencies so that redundancy and modification anomalies are minimized.",
        steps: [
          "Identify entities and attributes.",
          "Determine candidate keys and functional dependencies.",
          "Ensure attributes are atomic under 1NF.",
          "Remove partial dependencies for 2NF.",
          "Remove transitive dependencies for 3NF.",
          "Consider higher normal forms when multivalued or join dependencies exist.",
        ],
        complexity:
          "Normalization does not have a single algorithmic complexity because it is primarily a schema-design process. Its practical cost often appears through additional joins during queries.",
        alternatives:
          "Denormalization can intentionally introduce redundancy when read performance, reporting, or query simplicity is more important than minimizing duplication.",
        edgeCases: [
          "Highly normalized schemas can require many joins.",
          "Some analytical workloads benefit from denormalized structures.",
          "Business rules may create dependencies that are not obvious from the table structure.",
        ],
        related: [
          "Functional Dependencies",
          "Primary Keys",
          "Foreign Keys",
          "Denormalization",
          "Database Design",
        ],
      },
    },
    {
      question:
        "What is the difference between TCP and UDP?",
      category: "Computer Networks",
      difficulty: "Medium",
      quick: {
        answer:
          "TCP is connection-oriented and reliable, while UDP is connectionless and prioritizes speed and lower overhead.",
        keyConcept:
          "TCP favors reliability; UDP favors speed and simplicity.",
      },
      standard: {
        answer:
          "TCP establishes a connection and provides reliable, ordered delivery with retransmission. UDP sends datagrams without establishing a connection and does not guarantee delivery or ordering.",
        approach:
          "Compare connection setup, reliability, ordering, overhead, and common use cases.",
        example:
          "Web applications commonly use TCP-based protocols when reliable delivery matters, while real-time applications such as some voice or video systems may use UDP.",
      },
      detailed: {
        answer:
          "TCP and UDP are transport-layer protocols with different goals.",
        steps: [
          "TCP establishes a connection before transmitting data.",
          "TCP uses acknowledgements and retransmission to provide reliable delivery.",
          "TCP maintains ordering of transmitted data.",
          "UDP sends independent datagrams without connection establishment.",
          "UDP does not guarantee delivery or ordering.",
          "UDP generally has lower protocol overhead.",
        ],
        example:
          "A file transfer typically needs reliable delivery, making TCP appropriate. A real-time application may prefer UDP because avoiding retransmission delays can be more important than perfect delivery.",
        mistakes: [
          "Saying UDP is always faster.",
          "Saying UDP cannot be used for reliable applications.",
          "Confusing TCP with HTTP itself.",
        ],
      },
      deep: {
        answer:
          "TCP and UDP provide transport-layer communication but optimize for different requirements. TCP offers connection-oriented reliable byte-stream delivery, while UDP provides lightweight datagram delivery without built-in reliability guarantees.",
        steps: [
          "TCP uses a connection establishment process.",
          "TCP tracks sequence numbers and acknowledgements.",
          "TCP retransmits missing data.",
          "TCP performs flow and congestion control.",
          "UDP sends datagrams without these reliability mechanisms.",
          "Applications using UDP can implement their own reliability when needed.",
        ],
        complexity:
          "TCP introduces additional communication and state-management overhead. UDP has lower protocol overhead but leaves reliability, ordering, and congestion-related application behavior to higher layers where appropriate.",
        alternatives:
          "Modern protocols such as QUIC use UDP as a foundation while implementing reliability, encryption, multiplexing, and congestion control at a higher layer.",
        edgeCases: [
          "UDP can be used when an application implements its own reliability.",
          "TCP may be unsuitable for latency-sensitive communication where stale data is less useful than current data.",
          "Neither protocol alone determines the complete performance of an application.",
        ],
        related: [
          "HTTP",
          "QUIC",
          "IP",
          "Network Congestion",
          "WebSockets",
        ],
      },
    },
  ];

  const selectedQuestionData =
    questions[selectedQuestion];

  const currentExplanation =
    selectedQuestionData[selectedDepth];

  const selectedMode = depthModes.find(
    (mode) => mode.id === selectedDepth
  );

  const handleGenerate = () => {
    setGenerating(true);

    setTimeout(() => {
      setGenerating(false);
      setActiveTab("explanation");
    }, 800);
  };

  const handleDepthChange = (depth) => {
    setSelectedDepth(depth);
    setSavedPreference(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Brain
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Question Explanation Depth Selector
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Choose how deeply AI explains interview questions based on
              your learning level and preparation needs.
            </p>

          </div>

        </div>

        {/* Overview Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Questions Explained
            </p>

            <p className="text-5xl font-black mt-3">
              48
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Settings2
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Current Mode
            </p>

            <p className="text-3xl font-black mt-5">
              {selectedMode.title}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <GraduationCap
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Learning Level
            </p>

            <p className="text-3xl font-black mt-5">
              Adaptive
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Zap
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Saved Preference
            </p>

            <p className="text-3xl font-black mt-5">
              {savedPreference ? "Yes" : "No"}
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Explanation Personalization Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            Different learners need different levels of detail. Select
            a preferred explanation depth and AI will adapt its response
            from a quick summary to a deep technical analysis.
          </p>

        </div>

        {/* Explanation Depth Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

            <div className="flex items-center gap-3">

              <Layers className="text-violet-600" />

              <div>

                <h2 className="text-2xl font-bold">
                  Choose Explanation Depth
                </h2>

                <p className="text-gray-500 mt-1">
                  Your selection will be remembered for future explanations.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2 text-sm">

              {savedPreference && (
                <>
                  <CheckCircle2
                    size={18}
                    className="text-green-600"
                  />

                  <span className="text-green-600 font-semibold">
                    Preference saved
                  </span>
                </>
              )}

            </div>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            {depthModes.map((mode) => (

              <button
                key={mode.id}
                type="button"
                onClick={() => handleDepthChange(mode.id)}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedDepth === mode.id
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10 ring-2 ring-violet-200 dark:ring-violet-900"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-start justify-between gap-3">

                  <span className="text-4xl">
                    {mode.icon}
                  </span>

                  {selectedDepth === mode.id && (
                    <CheckCircle2
                      className="text-violet-600"
                      size={23}
                    />
                  )}

                </div>

                <h3 className="text-xl font-bold mt-5">
                  {mode.title}
                </h3>

                <p className="text-sm text-violet-600 font-semibold mt-1">
                  {mode.subtitle}
                </p>

                <p className="text-gray-500 mt-4 leading-6">
                  {mode.description}
                </p>

                <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">

                  <Clock3 size={17} />

                  {mode.time}

                </div>

                <div className="mt-5">

                  <p className="text-sm font-semibold">
                    Includes
                  </p>

                  <div className="space-y-2 mt-3">

                    {mode.includes.map((item) => (

                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-500"
                      >

                        <CheckCircle2
                          size={15}
                          className="text-green-600"
                        />

                        {item}

                      </div>

                    ))}

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Mode Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <span className="inline-block px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold">
                Selected Mode
              </span>

              <h2 className="text-3xl font-bold mt-4">
                {selectedMode.title}
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                {selectedMode.description}
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                {selectedMode.icon}
              </div>

              <p className="text-gray-500 mt-3">
                Estimated reading time
              </p>

              <p className="text-2xl font-black mt-1">
                {selectedMode.time}
              </p>

            </div>

          </div>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

            <div className="flex items-center gap-3">

              <CircleHelp className="text-indigo-600" />

              <div>

                <h2 className="text-2xl font-bold">
                  Select Interview Question
                </h2>

                <p className="text-gray-500 mt-1">
                  Preview how the selected explanation depth changes the answer.
                </p>

              </div>

            </div>

            <div className="relative w-full lg:w-72">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-violet-500"
              />

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {questions.map((question, index) => (

              <button
                key={index}
                type="button"
                onClick={() => setSelectedQuestion(index)}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-center justify-between gap-4">

                  <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-semibold">
                    {question.category}
                  </span>

                  <span className="text-sm text-gray-500">
                    {question.difficulty}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {question.question}
                </h3>

                <div className="flex items-center gap-2 mt-5 text-violet-600 font-semibold">

                  View explanation

                  <ChevronRight size={18} />

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row justify-between gap-6">

            <div>

              <span className="inline-block px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold">
                {selectedQuestionData.category}
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold mt-5">
                {selectedQuestionData.question}
              </h2>

            </div>

            <div className="text-center">

              <p className="text-sm text-gray-500">
                Difficulty
              </p>

              <p className="text-xl font-black text-orange-500 mt-2">
                {selectedQuestionData.difficulty}
              </p>

            </div>

          </div>

        </div>

        {/* Generate Button */}

        <div className="mt-8 flex justify-center">

          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-violet-600 text-white font-bold text-lg hover:bg-violet-700 transition disabled:opacity-60"
          >

            {generating ? (
              <>
                <RefreshCw
                  size={22}
                  className="animate-spin"
                />

                Generating Explanation...
              </>
            ) : (
              <>
                <Sparkles size={22} />

                Generate {selectedMode.title} Explanation
              </>
            )}

          </button>

        </div>

        {/* Explanation Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["explanation", "Explanation"],
            ["comparison", "Depth Comparison"],
            ["tips", "Learning Tips"],
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

        {/* Explanation */}

        {activeTab === "explanation" && (

          <div className="mt-6">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-7">

                <div className="flex items-center gap-3">

                  <Brain className="text-violet-600" />

                  <h2 className="text-2xl font-bold">
                    {selectedMode.title} Explanation
                  </h2>

                </div>

                <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold">
                  {selectedMode.time}
                </span>

              </div>

              <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-7">

                <p className="text-lg leading-8">
                  {currentExplanation.answer}
                </p>

              </div>

              {/* Quick */}

              {selectedDepth === "quick" && (

                <div className="mt-7">

                  <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 p-6">

                    <div className="flex items-center gap-3">

                      <Target
                        className="text-blue-600"
                        size={22}
                      />

                      <h3 className="font-bold text-lg">
                        Key Concept
                      </h3>

                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
                      {currentExplanation.keyConcept}
                    </p>

                  </div>

                </div>
              )}

              {/* Standard */}

              {selectedDepth === "standard" && (

                <div className="grid md:grid-cols-2 gap-6 mt-7">

                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

                    <div className="flex items-center gap-3">

                      <Target
                        className="text-violet-600"
                        size={22}
                      />

                      <h3 className="font-bold text-lg">
                        Approach
                      </h3>

                    </div>

                    <p className="text-gray-500 mt-3 leading-7">
                      {currentExplanation.approach}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

                    <div className="flex items-center gap-3">

                      <Lightbulb
                        className="text-yellow-500"
                        size={22}
                      />

                      <h3 className="font-bold text-lg">
                        Example
                      </h3>

                    </div>

                    <p className="text-gray-500 mt-3 leading-7">
                      {currentExplanation.example}
                    </p>

                  </div>

                </div>
              )}

              {/* Detailed */}

              {selectedDepth === "detailed" && (

                <div className="mt-7 space-y-6">

                  <div>

                    <div className="flex items-center gap-3">

                      <Target
                        className="text-green-600"
                        size={22}
                      />

                      <h3 className="font-bold text-lg">
                        Step-by-Step Explanation
                      </h3>

                    </div>

                    <div className="space-y-3 mt-4">

                      {currentExplanation.steps.map(
                        (step, index) => (

                          <div
                            key={index}
                            className="flex gap-4 rounded-xl bg-gray-50 dark:bg-gray-800 p-4"
                          >

                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 flex items-center justify-center font-bold shrink-0">
                              {index + 1}
                            </div>

                            <p className="leading-6">
                              {step}
                            </p>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                  <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 p-6">

                    <div className="flex items-center gap-3">

                      <Lightbulb
                        className="text-blue-600"
                        size={22}
                      />

                      <h3 className="font-bold text-lg">
                        Example
                      </h3>

                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
                      {currentExplanation.example}
                    </p>

                  </div>

                  <div>

                    <h3 className="font-bold text-lg">
                      Common Mistakes
                    </h3>

                    <div className="space-y-3 mt-4">

                      {currentExplanation.mistakes.map(
                        (mistake, index) => (

                          <div
                            key={index}
                            className="flex items-start gap-3 rounded-xl bg-red-50 dark:bg-red-900/10 p-4"
                          >

                            <CircleHelp
                              size={20}
                              className="text-red-500 shrink-0"
                            />

                            <p className="leading-6">
                              {mistake}
                            </p>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                </div>
              )}

              {/* Deep Dive */}

              {selectedDepth === "deep" && (

                <div className="mt-7 space-y-7">

                  <div>

                    <div className="flex items-center gap-3">

                      <Target
                        className="text-orange-500"
                        size={22}
                      />

                      <h3 className="font-bold text-lg">
                        Detailed Reasoning
                      </h3>

                    </div>

                    <div className="space-y-3 mt-4">

                      {currentExplanation.steps.map(
                        (step, index) => (

                          <div
                            key={index}
                            className="flex gap-4 rounded-xl bg-gray-50 dark:bg-gray-800 p-4"
                          >

                            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center font-bold shrink-0">
                              {index + 1}
                            </div>

                            <p className="leading-6">
                              {step}
                            </p>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                  <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 p-6">

                    <h3 className="font-bold text-lg">
                      Complexity
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
                      {currentExplanation.complexity}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-6">

                    <h3 className="font-bold text-lg">
                      Alternative Approaches
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
                      {currentExplanation.alternatives}
                    </p>

                  </div>

                  <div>

                    <h3 className="font-bold text-lg">
                      Edge Cases
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">

                      {currentExplanation.edgeCases.map(
                        (item, index) => (

                          <div
                            key={index}
                            className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
                          >

                            <div className="flex gap-3">

                              <CircleHelp
                                size={19}
                                className="text-orange-500 shrink-0"
                              />

                              <p className="leading-6">
                                {item}
                              </p>

                            </div>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                  <div>

                    <h3 className="font-bold text-lg">
                      Related Concepts
                    </h3>

                    <div className="flex flex-wrap gap-3 mt-4">

                      {currentExplanation.related.map(
                        (item) => (

                          <span
                            key={item}
                            className="px-4 py-2 rounded-xl bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold"
                          >
                            {item}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>
        )}

        {/* Depth Comparison */}

        {activeTab === "comparison" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <BarChart3 className="text-indigo-600" />

              <h2 className="text-2xl font-bold">
                Explanation Depth Comparison
              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr className="border-b border-gray-200 dark:border-white/10">

                    <th className="p-4">
                      Mode
                    </th>

                    <th className="p-4">
                      Detail
                    </th>

                    <th className="p-4">
                      Best For
                    </th>

                    <th className="p-4">
                      Time
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {[
                    [
                      "Quick",
                      "Short answer + key concept",
                      "Revision",
                      "30 sec",
                    ],
                    [
                      "Standard",
                      "Concept + approach + example",
                      "Regular practice",
                      "1–2 min",
                    ],
                    [
                      "Detailed",
                      "Step-by-step + mistakes",
                      "Learning",
                      "3–5 min",
                    ],
                    [
                      "Deep Dive",
                      "Advanced technical analysis",
                      "Expert preparation",
                      "5–10 min",
                    ],
                  ].map((row, index) => (

                    <tr
                      key={index}
                      className={`border-b border-gray-100 dark:border-white/5 ${
                        row[0].toLowerCase().replace(" ", "") ===
                        selectedMode.title.toLowerCase().replace(" ", "")
                          ? "bg-violet-50 dark:bg-violet-900/10"
                          : ""
                      }`}
                    >

                      <td className="p-4 font-bold">
                        {row[0]}
                      </td>

                      <td className="p-4 text-gray-500">
                        {row[1]}
                      </td>

                      <td className="p-4 text-gray-500">
                        {row[2]}
                      </td>

                      <td className="p-4 font-semibold">
                        {row[3]}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* Learning Tips */}

        {activeTab === "tips" && (

          <div className="mt-6 grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Use Quick for Revision",
                icon: "⚡",
                text:
                  "Choose Quick mode when you already understand a topic and only need a fast reminder before an interview.",
              },
              {
                title: "Use Standard for Practice",
                icon: "🎯",
                text:
                  "Standard mode is a good default for regular interview practice because it balances depth and reading time.",
              },
              {
                title: "Use Deep Dive Strategically",
                icon: "🧠",
                text:
                  "Use Deep Dive when studying difficult concepts, edge cases, system design, or advanced technical topics.",
              },
            ].map((tip) => (

              <div
                key={tip.title}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
              >

                <div className="text-5xl">
                  {tip.icon}
                </div>

                <h3 className="text-xl font-bold mt-5">
                  {tip.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  {tip.text}
                </p>

              </div>
            ))}

          </div>
        )}

        {/* Saved Preference */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">

                <Bookmark
                  className="text-green-600"
                  size={23}
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Explanation Preference
                </h2>

                <p className="text-gray-500 mt-1">
                  Your preferred explanation depth is saved for future
                  interview questions.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <span className="px-5 py-3 rounded-xl bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-bold">
                {selectedMode.title}
              </span>

              <CheckCircle2
                className="text-green-600"
                size={25}
              />

            </div>

          </div>

        </div>

        {/* AI Personalization */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Explanation Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎓
              </p>

              <h3 className="text-xl font-bold mt-4">
                Match Your Learning Level
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Beginners can use detailed explanations while experienced
                developers can focus on concise technical answers.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                ⏱️
              </p>

              <h3 className="text-xl font-bold mt-4">
                Respect Your Time
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Quick explanations are useful for revision when you need
                information without unnecessary detail.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Go Deeper When Needed
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Deep Dive mode provides edge cases, alternatives,
                complexity, and related concepts for advanced preparation.
              </p>

            </div>

          </div>

        </div>

        {/* Usage Statistics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Explanation Usage
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Quick",
                percentage: 22,
                icon: "⚡",
              },
              {
                label: "Standard",
                percentage: 46,
                icon: "🎯",
              },
              {
                label: "Detailed",
                percentage: 24,
                icon: "📚",
              },
              {
                label: "Deep Dive",
                percentage: 8,
                icon: "🧠",
              },
            ].map((item) => (

              <div
                key={item.label}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center"
              >

                <div className="text-3xl">
                  {item.icon}
                </div>

                <p className="font-bold mt-4">
                  {item.label}
                </p>

                <p className="text-4xl font-black text-violet-600 mt-3">
                  {item.percentage}%
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                  <div
                    className="h-full bg-violet-600 rounded-full"
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Final Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              AI Personalized Recommendation
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Current Preference
              </p>

              <h3 className="text-xl font-bold mt-2">
                {selectedMode.title}
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your selected mode provides{" "}
                {selectedMode.description.toLowerCase()}
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Best Use
              </p>

              <h3 className="text-xl font-bold mt-2">
                {selectedDepth === "quick"
                  ? "Fast Revision"
                  : selectedDepth === "standard"
                  ? "Daily Practice"
                  : selectedDepth === "detailed"
                  ? "Concept Learning"
                  : "Advanced Preparation"}
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Select this mode when you want the AI response to match
                your current preparation goal.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Saved for Future
              </p>

              <h3 className="text-xl font-bold mt-2">
                Yes
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Future interview explanations can use this preference as
                the default explanation depth.
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
                Your current explanation preference is{" "}
                <strong>
                  {selectedMode.title}
                </strong>
                . Use Quick mode when revising familiar concepts,
                Standard for normal interview practice, Detailed for
                learning new concepts, and Deep Dive when you need
                advanced technical analysis. The goal is to provide the
                right amount of information without unnecessary detail.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                {selectedMode.icon}
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Current Mode
              </h3>

              <p className="text-4xl font-black">
                {selectedMode.title}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionExplanationDepthSelector;