import React, { useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Code2,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Award,
  Layers3,
  Search,
  Zap,
  ShieldCheck,
} from "lucide-react";

const AIInterviewQuestionSkillMapping = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState("mapping");
  const [analyzing, setAnalyzing] = useState(false);

  const questions = [
    {
      question: "How would you find the first non-repeating character in a string?",
      type: "Algorithm",
      difficulty: "Medium",
      skills: [
        {
          name: "Problem Solving",
          score: 88,
          level: "Strong",
        },
        {
          name: "Logical Reasoning",
          score: 84,
          level: "Strong",
        },
        {
          name: "Algorithm Design",
          score: 92,
          level: "Excellent",
        },
        {
          name: "Technical Knowledge",
          score: 78,
          level: "Good",
        },
      ],
      primarySkills: [
        "Algorithm Design",
        "Problem Solving",
        "Logical Reasoning",
      ],
      secondarySkills: [
        "Technical Knowledge",
        "Complexity Analysis",
      ],
      strengths: [
        "Recognizes the need to track character frequency.",
        "Understands that the string should be processed efficiently.",
        "Can reason about multiple possible approaches.",
      ],
      recommendations: [
        "Practice hash-map based string problems.",
        "Compare O(n²) and O(n) approaches.",
        "Practice explaining time and space complexity.",
      ],
    },
    {
      question: "A production API is returning intermittent 500 errors. How would you debug it?",
      type: "Debugging",
      difficulty: "Hard",
      skills: [
        {
          name: "Debugging",
          score: 94,
          level: "Excellent",
        },
        {
          name: "System Thinking",
          score: 89,
          level: "Strong",
        },
        {
          name: "Problem Solving",
          score: 86,
          level: "Strong",
        },
        {
          name: "Communication",
          score: 76,
          level: "Good",
        },
      ],
      primarySkills: [
        "Debugging",
        "System Thinking",
        "Problem Solving",
      ],
      secondarySkills: [
        "Communication",
        "Technical Knowledge",
      ],
      strengths: [
        "Focuses on identifying the source of intermittent failures.",
        "Understands the importance of logs and monitoring.",
        "Approaches debugging systematically.",
      ],
      recommendations: [
        "Practice production debugging scenarios.",
        "Learn to correlate logs, metrics, and traces.",
        "Practice communicating incident investigation steps.",
      ],
    },
    {
      question: "Design a scalable URL shortening service.",
      type: "System Design",
      difficulty: "Hard",
      skills: [
        {
          name: "System Thinking",
          score: 95,
          level: "Excellent",
        },
        {
          name: "Problem Solving",
          score: 91,
          level: "Excellent",
        },
        {
          name: "Communication",
          score: 87,
          level: "Strong",
        },
        {
          name: "Technical Knowledge",
          score: 90,
          level: "Excellent",
        },
      ],
      primarySkills: [
        "System Thinking",
        "Problem Solving",
        "Technical Knowledge",
      ],
      secondarySkills: [
        "Communication",
        "Scalability",
        "Architecture",
      ],
      strengths: [
        "Requires decomposition of a large technical problem.",
        "Tests scalability and architecture decisions.",
        "Requires clear communication of system components.",
      ],
      recommendations: [
        "Practice high-level system architecture.",
        "Study caching and database scaling strategies.",
        "Practice explaining design trade-offs clearly.",
      ],
    },
  ];

  const allSkills = [
    {
      name: "Problem Solving",
      score: 88,
      questions: 18,
      color: "blue",
      description: "Breaking complex problems into manageable steps.",
      icon: Target,
    },
    {
      name: "Logical Reasoning",
      score: 82,
      questions: 14,
      color: "violet",
      description: "Analyzing relationships, constraints, and logical patterns.",
      icon: Lightbulb,
    },
    {
      name: "Algorithm Design",
      score: 79,
      questions: 16,
      color: "green",
      description: "Designing efficient algorithms and choosing suitable approaches.",
      icon: Code2,
    },
    {
      name: "Debugging",
      score: 72,
      questions: 11,
      color: "orange",
      description: "Finding, isolating, and fixing technical problems.",
      icon: Search,
    },
    {
      name: "Communication",
      score: 86,
      questions: 13,
      color: "pink",
      description: "Clearly explaining technical ideas and decisions.",
      icon: MessageSquare,
    },
    {
      name: "System Thinking",
      score: 68,
      questions: 9,
      color: "indigo",
      description: "Understanding systems, dependencies, scalability, and architecture.",
      icon: Layers3,
    },
    {
      name: "Technical Knowledge",
      score: 84,
      questions: 21,
      color: "cyan",
      description: "Applying technical concepts to interview problems.",
      icon: Brain,
    },
    {
      name: "Complexity Analysis",
      score: 75,
      questions: 12,
      color: "emerald",
      description: "Evaluating time and space efficiency of solutions.",
      icon: BarChart3,
    },
  ];

  const selected = questions[selectedQuestion];

  const overallSkillScore = useMemo(() => {
    return Math.round(
      allSkills.reduce((sum, skill) => sum + skill.score, 0) /
        allSkills.length
    );
  }, []);

  const strongestSkill = useMemo(() => {
    return [...allSkills].sort((a, b) => b.score - a.score)[0];
  }, []);

  const weakestSkill = useMemo(() => {
    return [...allSkills].sort((a, b) => a.score - b.score)[0];
  }, []);

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getSkillLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Strong";
    if (score >= 70) return "Developing";
    return "Needs Practice";
  };

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("mapping");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Target size={34} className="text-violet-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Question Skill Mapping
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Understand which professional and technical skills each
              interview question develops and track your competency growth.
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
              Questions Mapped
            </p>

            <p className="text-5xl font-black mt-3">
              84
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Skills Tracked
            </p>

            <p className="text-5xl font-black mt-3">
              {allSkills.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Overall Skill Score
            </p>

            <p className="text-5xl font-black mt-3">
              {overallSkillScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Skill Gaps
            </p>

            <p className="text-5xl font-black mt-3">
              3
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Skill Mapping Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            AI maps each interview question to the skills it evaluates.
            Instead of tracking only topics and solved questions, the
            system identifies the competencies you are actually practicing
            and highlights areas that need more attention.
          </p>

        </div>

        {/* Skill Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Skill Development Overview
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {allSkills.map((skill) => {

              const Icon = skill.icon;

              return (
                <div
                  key={skill.name}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex items-center justify-between">

                    <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                      <Icon
                        size={23}
                        className="text-violet-600"
                      />
                    </div>

                    <span
                      className={`text-xl font-black ${getScoreColor(
                        skill.score
                      )}`}
                    >
                      {skill.score}%
                    </span>

                  </div>

                  <h3 className="font-bold text-lg mt-5">
                    {skill.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 leading-5">
                    {skill.description}
                  </p>

                  <div className="flex justify-between text-sm mt-5">

                    <span className="text-gray-500">
                      {skill.questions} questions
                    </span>

                    <span className="font-semibold">
                      {getSkillLabel(skill.score)}
                    </span>

                  </div>

                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-4 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                      style={{
                        width: `${skill.score}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Skill Gap Banner */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-3xl p-7">

            <div className="flex items-center gap-3">

              <Award className="text-green-600" />

              <h2 className="text-2xl font-bold">
                Strongest Skill
              </h2>

            </div>

            <h3 className="text-3xl font-black text-green-600 mt-6">
              {strongestSkill.name}
            </h3>

            <p className="text-5xl font-black mt-3">
              {strongestSkill.score}%
            </p>

            <p className="text-gray-500 mt-4 leading-6">
              You demonstrate strong performance in this competency
              across your practiced interview questions.
            </p>

          </div>

          <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-3xl p-7">

            <div className="flex items-center gap-3">

              <AlertTriangle className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Priority Skill Gap
              </h2>

            </div>

            <h3 className="text-3xl font-black text-orange-500 mt-6">
              {weakestSkill.name}
            </h3>

            <p className="text-5xl font-black mt-3">
              {weakestSkill.score}%
            </p>

            <p className="text-gray-500 mt-4 leading-6">
              Practice more questions targeting this skill to create
              a more balanced interview competency profile.
            </p>

          </div>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

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

                <div className="flex items-center justify-between gap-3">

                  <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                    {question.type}
                  </span>

                  <span className="text-sm font-semibold text-orange-500">
                    {question.difficulty}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {question.question}
                </h3>

                <div className="flex items-center gap-2 mt-5">

                  <Target
                    size={18}
                    className="text-violet-600"
                  />

                  <span className="text-sm text-gray-500">
                    {question.primarySkills.length} primary skills
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

            <span className="px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400">
              {selected.difficulty}
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
                Mapping Skills...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Analyze Question Skills
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["mapping", "Skill Mapping"],
            ["skills", "Skill Breakdown"],
            ["recommendations", "Recommendations"],
            ["progress", "Skill Progress"],
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

        {/* Skill Mapping */}

        {activeTab === "mapping" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Primary Skills
                </h2>

              </div>

              <div className="space-y-4">

                {selected.primarySkills.map(
                  (skillName, index) => {

                    const skill = selected.skills.find(
                      (item) => item.name === skillName
                    );

                    return (
                      <div
                        key={skillName}
                        className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-5"
                      >

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold">
                              {index + 1}
                            </div>

                            <span className="font-bold">
                              {skillName}
                            </span>

                          </div>

                          <span className="font-black text-violet-600">
                            {skill?.score}%
                          </span>

                        </div>

                        <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-4 overflow-hidden">

                          <div
                            className="h-full bg-violet-600"
                            style={{
                              width: `${skill?.score || 0}%`,
                            }}
                          />

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Layers3 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Supporting Skills
                </h2>

              </div>

              <div className="space-y-4">

                {selected.secondarySkills.map(
                  (skillName, index) => {

                    const skill = selected.skills.find(
                      (item) => item.name === skillName
                    );

                    return (
                      <div
                        key={skillName}
                        className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                      >

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center font-bold">
                              {index + 1}
                            </div>

                            <span className="font-bold">
                              {skillName}
                            </span>

                          </div>

                          <span className="font-black text-blue-600">
                            {skill?.score || 80}%
                          </span>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          </div>
        )}

        {/* Skill Breakdown */}

        {activeTab === "skills" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <BarChart3 className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Question Skill Breakdown
              </h2>

            </div>

            <div className="space-y-6">

              {selected.skills.map((skill) => (

                <div
                  key={skill.name}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <h3 className="text-xl font-bold">
                        {skill.name}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        {skill.level}
                      </p>

                    </div>

                    <p
                      className={`text-3xl font-black ${getScoreColor(
                        skill.score
                      )}`}
                    >
                      {skill.score}%
                    </p>

                  </div>

                  <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                      style={{
                        width: `${skill.score}%`,
                      }}
                    />

                  </div>

                  <p className="text-gray-500 mt-4">
                    This question evaluates your ability to apply{" "}
                    <strong>{skill.name.toLowerCase()}</strong>{" "}
                    while solving the problem.
                  </p>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Lightbulb className="text-yellow-500" />

              <h2 className="text-2xl font-bold">
                AI Skill Recommendations
              </h2>

            </div>

            <div className="space-y-5">

              {selected.recommendations.map(
                (recommendation, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex items-start gap-4">

                      <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">

                        <span className="font-bold text-violet-600">
                          {index + 1}
                        </span>

                      </div>

                      <div>

                        <h3 className="font-bold text-lg">
                          {recommendation}
                        </h3>

                        <p className="text-gray-500 mt-2 leading-6">
                          Practicing this area will strengthen the skills
                          evaluated by this interview question.
                        </p>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

            <div className="mt-8 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

              <div className="flex items-center gap-3">

                <Brain
                  size={23}
                  className="text-violet-600"
                />

                <p className="font-bold">
                  AI Recommendation
                </p>

              </div>

              <p className="text-gray-500 mt-3 leading-7">
                Focus on questions that target your lower-scoring skills
                while continuing to practice your strongest competencies.
                A balanced skill profile is more valuable than solving a
                large number of questions from only one topic.
              </p>

            </div>

          </div>
        )}

        {/* Progress */}

        {activeTab === "progress" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <TrendingUp className="text-green-600" />

              <h2 className="text-2xl font-bold">
                Skill Progress
              </h2>

            </div>

            <div className="space-y-6">

              {allSkills.map((skill) => (

                <div
                  key={skill.name}
                  className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="font-bold text-lg">
                        {skill.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Practiced across {skill.questions} questions
                      </p>

                    </div>

                    <p className="text-2xl font-black text-violet-600">
                      {skill.score}%
                    </p>

                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
                      style={{
                        width: `${skill.score}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Skills Demonstrated by This Question
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

        {/* Skill Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Interview Competency Categories
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Problem Solving",
                score: 88,
                example: "Breaking problems into logical steps.",
                icon: "🧩",
              },
              {
                title: "Technical Skills",
                score: 84,
                example: "Applying technical concepts correctly.",
                icon: "💻",
              },
              {
                title: "Communication",
                score: 86,
                example: "Explaining ideas clearly.",
                icon: "💬",
              },
              {
                title: "System Thinking",
                score: 68,
                example: "Understanding systems and dependencies.",
                icon: "🏗️",
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

        {/* AI Personalized Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Personalized Skill Recommendation
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Current Strength
              </p>

              <h3 className="text-xl font-bold mt-2">
                {strongestSkill.name}
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                This is currently your strongest tracked competency.
                Continue practicing it through increasingly difficult
                questions.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                {weakestSkill.name}
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                This skill has the lowest current score. Targeted
                practice can improve your overall interview readiness.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Balanced Skills
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Practice questions that combine technical knowledge,
                communication, problem solving, and system thinking.
              </p>

            </div>

          </div>

        </div>

        {/* Skill Coverage */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Skill Coverage
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

              <p className="text-sm text-green-600 font-semibold">
                Strong Coverage
              </p>

              <p className="text-4xl font-black text-green-600 mt-3">
                4
              </p>

              <p className="text-gray-500 mt-3">
                Skills consistently practiced and performing well.
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

              <p className="text-sm text-orange-600 font-semibold">
                Developing Coverage
              </p>

              <p className="text-4xl font-black text-orange-500 mt-3">
                3
              </p>

              <p className="text-gray-500 mt-3">
                Skills requiring additional targeted practice.
              </p>

            </div>

            <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-6">

              <p className="text-sm text-red-600 font-semibold">
                Priority Coverage
              </p>

              <p className="text-4xl font-black text-red-600 mt-3">
                1
              </p>

              <p className="text-gray-500 mt-3">
                Skill that should receive immediate attention.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Interview Skill Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your skill profile shows strong problem-solving,
                technical knowledge, and communication abilities. Focus
                on system thinking and debugging to create a more
                balanced interview competency profile.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {overallSkillScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Developing Competency
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
              style={{
                width: `${overallSkillScore}%`,
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
                Solving more questions is not the only measure of
                interview preparation. Each question can develop multiple
                professional competencies. Track the skills behind your
                practice, strengthen weaker areas, and build a balanced
                combination of technical knowledge, problem solving,
                communication, debugging, and system thinking.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Skill Coverage
              </h3>

              <p className="text-5xl font-black">
                {overallSkillScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionSkillMapping;