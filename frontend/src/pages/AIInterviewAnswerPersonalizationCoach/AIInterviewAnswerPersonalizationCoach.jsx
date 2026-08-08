import React, { useState } from "react";
import {
  Brain,
  UserRound,
  Sparkles,
  Briefcase,
  GraduationCap,
  Code2,
  Trophy,
  Lightbulb,
  Target,
  CheckCircle2,
  AlertTriangle,
  MessageSquareText,
} from "lucide-react";

const AIInterviewAnswerPersonalizationCoach = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const [stats] = useState({
    personalizationScore: 82,
    matchedExperiences: 5,
    missingConnections: 2,
    authenticityScore: 88,
  });

  const questions = [
    {
      title: "Tell me about yourself.",
      category: "Behavioral",
      type: "Introduction",
    },
    {
      title: "Tell me about a challenging project you worked on.",
      category: "Behavioral",
      type: "Project Experience",
    },
    {
      title: "Why should we hire you?",
      category: "HR",
      type: "Personal Strengths",
    },
  ];

  const experiences = [
    {
      title: "Smart Irrigation System",
      type: "Personal Project",
      icon: <Code2 size={22} />,
      relevance: 94,
      description:
        "IoT-based irrigation project involving ESP32, sensors, weather prediction, and automated watering.",
      keywords: [
        "IoT",
        "ESP32",
        "Problem Solving",
        "AI",
      ],
    },
    {
      title: "AI & Data Science Coursework",
      type: "Academic Experience",
      icon: <GraduationCap size={22} />,
      relevance: 86,
      description:
        "Academic experience involving algorithms, data structures, machine learning, and data analysis.",
      keywords: [
        "Algorithms",
        "Machine Learning",
        "Data Analysis",
      ],
    },
    {
      title: "Open Source Contributions",
      type: "Technical Experience",
      icon: <Briefcase size={22} />,
      relevance: 91,
      description:
        "Experience contributing features, fixes, and improvements to open-source software projects.",
      keywords: [
        "GitHub",
        "Collaboration",
        "Debugging",
        "Development",
      ],
    },
    {
      title: "Technical Event Coordination",
      type: "Leadership Experience",
      icon: <Trophy size={22} />,
      relevance: 78,
      description:
        "Experience coordinating technical activities, volunteers, and event execution.",
      keywords: [
        "Leadership",
        "Communication",
        "Teamwork",
      ],
    },
    {
      title: "Problem-Solving Projects",
      type: "Problem-Solving Experience",
      icon: <Target size={22} />,
      relevance: 89,
      description:
        "Hands-on experience identifying problems, designing solutions, testing implementations, and improving results.",
      keywords: [
        "Problem Solving",
        "Testing",
        "Optimization",
      ],
    },
  ];

  const getRelevanceClasses = (score) => {
    if (score >= 90) {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (score >= 80) {
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    }

    return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
            <UserRound
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Answer Personalization Coach
            </h1>

            <p className="text-gray-500 mt-2">
              Turn generic interview answers into authentic responses
              built around your own projects, skills, achievements, and
              experiences.
            </p>

          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Sparkles
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Personalization Score
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.personalizationScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Matched Experiences
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.matchedExperiences}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Missing Connections
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.missingConnections}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Authenticity Score
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.authenticityScore}%
            </p>

          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-3xl font-bold">
              AI Personalization Analysis
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            The AI compares each interview question with your personal
            experience profile and identifies projects, skills,
            achievements, and problem-solving examples that can make
            your answer more specific and authentic.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquareText className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {questions.map((question, index) => (

              <button
                key={index}
                onClick={() => setSelectedQuestion(index)}
                className={`text-left rounded-2xl border p-6 transition ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                  {question.category}
                </span>

                <h3 className="font-bold text-lg mt-4">
                  {question.title}
                </h3>

                <p className="text-gray-500 mt-3">
                  {question.type}
                </p>

              </button>

            ))}

          </div>

        </div>

        {/* Interview Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <p className="text-sm text-gray-500">
            Interview Question
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {questions[selectedQuestion].title}
          </h2>

          <span className="inline-block mt-5 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
            {questions[selectedQuestion].category}
          </span>

        </div>

        {/* Generic Answer */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <MessageSquareText className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Generic Answer
            </h2>

          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

            <p className="leading-8">
              I am a hardworking and motivated computer science student
              with good technical skills. I enjoy solving problems,
              learning new technologies, and working with teams. I am
              interested in software development and would like to use my
              skills to contribute to your organization.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Personal References
              </p>

              <p className="font-bold text-lg mt-2">
                0
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Specific Examples
              </p>

              <p className="font-bold text-lg mt-2">
                0
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Personalization
              </p>

              <p className="font-bold text-lg mt-2">
                32%
              </p>

            </div>

          </div>

        </div>

        {/* User Experience Profile */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <UserRound className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Your Experience Profile
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {experiences.map((experience, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex justify-between items-start">

                  <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                    {experience.icon}
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getRelevanceClasses(
                      experience.relevance
                    )}`}
                  >
                    {experience.relevance}%
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5">
                  {experience.title}
                </h3>

                <p className="text-sm text-violet-600 mt-1">
                  {experience.type}
                </p>

                <p className="text-gray-500 mt-3 leading-6">
                  {experience.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">

                  {experience.keywords.map((keyword, keywordIndex) => (

                    <span
                      key={keywordIndex}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm"
                    >
                      {keyword}
                    </span>

                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Experience Matching */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Experience Matching
            </h2>

          </div>

          <p className="text-gray-500 leading-7 mb-8">
            Based on the selected interview question, these experiences
            are the strongest candidates for creating a personalized
            response.
          </p>

          <div className="space-y-5">

            {experiences.slice(0, 4).map((experience, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                      {experience.icon}
                    </div>

                    <div>

                      <h3 className="font-bold">
                        {experience.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {experience.type}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-4">

                    <span className="text-gray-500">
                      Relevance
                    </span>

                    <span className="text-2xl font-black text-violet-600">
                      {experience.relevance}%
                    </span>

                  </div>

                </div>

                <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${experience.relevance}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>
                {/* AI Personalization Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Brain size={30} />

            <h2 className="text-3xl font-bold">
              AI Personalization Suggestions
            </h2>

          </div>

          <p className="text-white/90 leading-7 mb-7">
            Replace generic statements with specific examples from your
            own experience. This makes your answer more memorable and
            gives the interviewer evidence of your skills.
          </p>

          <div className="space-y-5">

            {[
              "Mention your Smart Irrigation System when discussing technical problem-solving.",
              "Explain how you worked with ESP32, sensors, APIs, and automation to demonstrate hands-on development.",
              "Connect your AI & Data Science coursework with your interest in solving data-driven problems.",
              "Use your open-source contributions to demonstrate collaboration, debugging, and software development experience.",
              "Mention technical event coordination when answering questions about teamwork, leadership, or communication.",
              "Support your strengths with measurable outcomes or specific responsibilities instead of generic claims.",
            ].map((suggestion, index) => (

              <div
                key={index}
                className="rounded-xl bg-white/10 p-5"
              >

                <span className="font-semibold">
                  💡 {suggestion}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Personalized Answer */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Personalized Answer
            </h2>

          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-7">

            <p className="leading-8">

              I am a Computer Science student specializing in AI and
              Data Science, and I enjoy applying technology to solve
              practical problems. One example is a smart irrigation
              project I worked on, where I used an ESP32, sensors, and
              weather data to automate irrigation decisions. This project
              helped me strengthen my problem-solving and development
              skills because I had to integrate hardware, software, and
              external APIs into one system. I have also gained experience
              through open-source contributions, where I worked on
              features and fixes and learned how to collaborate using
              GitHub. These experiences have made me comfortable learning
              new technologies and applying them to real-world problems.

            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="rounded-xl border border-green-200 dark:border-green-900/30 p-5">

              <p className="text-gray-500">
                Personal References
              </p>

              <p className="font-bold text-lg mt-2">
                5
              </p>

            </div>

            <div className="rounded-xl border border-blue-200 dark:border-blue-900/30 p-5">

              <p className="text-gray-500">
                Specific Examples
              </p>

              <p className="font-bold text-lg mt-2">
                3
              </p>

            </div>

            <div className="rounded-xl border border-violet-200 dark:border-violet-900/30 p-5">

              <p className="text-gray-500">
                Personalization
              </p>

              <p className="font-bold text-lg mt-2">
                92%
              </p>

            </div>

          </div>

        </div>

        {/* Generic vs Personalized Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Generic vs Personalized Answer
            </h2>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="rounded-2xl border border-orange-200 dark:border-orange-900/30 p-7">

              <div className="flex items-center gap-3">

                <AlertTriangle className="text-orange-500" />

                <h3 className="text-xl font-bold">
                  Generic Answer
                </h3>

              </div>

              <p className="text-gray-500 mt-5 leading-7">
                "I am hardworking, motivated, and enjoy solving problems.
                I have good technical skills and I am interested in
                software development."
              </p>

              <div className="mt-6 space-y-3">

                {[
                  "No personal project",
                  "No measurable experience",
                  "No specific technical example",
                  "Uses generic claims",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 text-orange-700"
                  >

                    <XCircleIcon />

                    <span>{item}</span>

                  </div>

                ))}

              </div>

              <div className="mt-7 text-center">

                <p className="text-5xl font-black text-orange-500">
                  32%
                </p>

                <p className="text-gray-500 mt-2">
                  Personal Relevance
                </p>

              </div>

            </div>

            <div className="rounded-2xl border border-green-200 dark:border-green-900/30 p-7">

              <div className="flex items-center gap-3">

                <CheckCircle2 className="text-green-600" />

                <h3 className="text-xl font-bold">
                  Personalized Answer
                </h3>

              </div>

              <p className="text-gray-500 mt-5 leading-7">
                "I built a smart irrigation system using an ESP32,
                sensors, and weather data, which helped me develop
                practical problem-solving and integration skills."
              </p>

              <div className="mt-6 space-y-3">

                {[
                  "Personal project included",
                  "Specific technical skills",
                  "Real problem-solving example",
                  "Authentic experience",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 text-green-700"
                  >

                    <CheckCircle2 size={20} />

                    <span>{item}</span>

                  </div>

                ))}

              </div>

              <div className="mt-7 text-center">

                <p className="text-5xl font-black text-green-600">
                  92%
                </p>

                <p className="text-gray-500 mt-2">
                  Personal Relevance
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Experience-to-Question Matching */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Experience-to-Question Matching
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              {
                question: "Tell me about yourself",
                experience: "AI & Data Science Coursework",
                score: 94,
              },
              {
                question: "Describe a difficult project",
                experience: "Smart Irrigation System",
                score: 97,
              },
              {
                question: "How do you work in teams?",
                experience: "Open Source Contributions",
                score: 91,
              },
              {
                question: "Tell me about leadership",
                experience: "Technical Event Coordination",
                score: 88,
              },
              {
                question: "How do you solve problems?",
                experience: "Problem-Solving Projects",
                score: 95,
              },
              {
                question: "Why should we hire you?",
                experience: "Combined Experience",
                score: 89,
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <p className="text-sm text-gray-500">
                  {item.question}
                </p>

                <h3 className="font-bold mt-3">
                  {item.experience}
                </h3>

                <div className="flex items-center gap-3 mt-5">

                  <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                      style={{
                        width: `${item.score}%`,
                      }}
                    />

                  </div>

                  <span className="font-bold">
                    {item.score}%
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Behavioral STAR Personalization */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Briefcase className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Behavioral Answer Personalization
            </h2>

          </div>

          <p className="text-gray-500 leading-7 mb-8">
            For behavioral questions, AI recommends using the STAR
            framework with experiences from your own background.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                letter: "S",
                title: "Situation",
                text: "Describe the specific project, event, or challenge.",
              },
              {
                letter: "T",
                title: "Task",
                text: "Explain your responsibility in that situation.",
              },
              {
                letter: "A",
                title: "Action",
                text: "Describe the technical or personal actions you took.",
              },
              {
                letter: "R",
                title: "Result",
                text: "Explain what you achieved and what you learned.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 text-violet-600 flex items-center justify-center text-xl font-black">
                  {item.letter}
                </div>

                <h3 className="font-bold text-lg mt-5">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

          <div className="mt-8 rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-6">

            <h3 className="font-bold text-lg">
              AI Suggested STAR Example
            </h3>

            <div className="space-y-4 mt-5">

              <p>
                <strong>Situation:</strong> While working on a smart
                irrigation project, the system needed to make watering
                decisions using both sensor readings and weather data.
              </p>

              <p>
                <strong>Task:</strong> The goal was to integrate these
                inputs into a reliable automated irrigation workflow.
              </p>

              <p>
                <strong>Action:</strong> I worked with the ESP32, sensors,
                APIs, and the application dashboard to connect the
                different parts of the system.
              </p>

              <p>
                <strong>Result:</strong> The project gave me practical
                experience in integrating hardware and software while
                improving my debugging and problem-solving skills.
              </p>

            </div>

          </div>

        </div>

        {/* Missing Personalization Connections */}

        <div className="mt-10 bg-orange-50 dark:bg-orange-900/10 rounded-3xl border border-orange-200 dark:border-orange-900/30 p-8">

          <div className="flex items-center gap-3 mb-6">

            <AlertTriangle className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Missing Personalization Opportunities
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Add a measurable result from one of your projects.",
              "Mention a specific challenge you solved instead of only listing skills.",
              "Connect your open-source experience to your ability to collaborate.",
              "Include a concrete example when describing your strengths.",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl bg-white dark:bg-[#111827] p-5"
              >

                <div className="flex gap-3">

                  <AlertTriangle
                    className="text-orange-500 shrink-0"
                    size={20}
                  />

                  <p className="leading-6">
                    {item}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Personal Relevance Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Personal Relevance Analytics
          </h2>

          {[
            ["Project Relevance", 94],
            ["Technical Skill Relevance", 91],
            ["Academic Experience", 84],
            ["Problem-Solving Evidence", 89],
            ["Achievement Integration", 72],
            ["Behavioral Authenticity", 88],
          ].map(([label, value], index) => (

            <div key={index} className="mb-7">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{
                    width: `${value}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* AI Improvement Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Personalization Improvement Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              [
                "👤",
                "Be Specific",
                "Replace generic claims with real experiences.",
              ],
              [
                "💻",
                "Show Skills",
                "Connect technical skills to actual projects.",
              ],
              [
                "🏆",
                "Show Results",
                "Mention achievements and measurable outcomes.",
              ],
              [
                "🎯",
                "Stay Relevant",
                "Choose experiences that directly answer the question.",
              ],
            ].map(([icon, title, description], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Interview Authenticity Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Interview Authenticity Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7">
                Your answer contains strong connections to your real
                experiences. Adding more specific outcomes and examples
                can make it even more authentic and memorable.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {stats.authenticityScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Highly Authentic
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: `${stats.authenticityScore}%`,
              }}
            />

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Make Your Story Stand Out 🚀
              </h2>

              <p className="leading-8 text-white/90">
                The strongest interview answers are not copied from
                sample answers. They connect your knowledge with the
                projects, challenges, skills, and experiences that make
                your journey unique.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                ⭐
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Personalization
              </h3>

              <p className="text-5xl font-black">
                {stats.personalizationScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerPersonalizationCoach;