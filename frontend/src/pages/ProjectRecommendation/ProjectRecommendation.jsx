import React, { useState } from "react";
import {
  Brain,
  Code2,
  Briefcase,
  Layers,
  Sparkles,
} from "lucide-react";

const ProjectRecommendation = () => {
  const [skills, setSkills] = useState("React, Node.js");
  const [role, setRole] = useState("Frontend Developer");
  const [experience, setExperience] = useState("Intermediate");

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Brain
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                AI Project Recommendation

              </h1>

              <p className="text-gray-500 mt-2">

                Discover portfolio projects tailored to your
                skills, career goals, and experience level.

              </p>

            </div>

          </div>

        </div>

        {/* Recommendation Filters */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Recommendation Preferences

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Skills */}

            <div>

              <label className="font-semibold flex items-center gap-2 mb-3">

                <Code2
                  size={18}
                  className="text-violet-600"
                />

                Skills

              </label>

              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Node.js"
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 p-3 bg-white dark:bg-[#1f2937] outline-none"
              />

            </div>

            {/* Target Role */}

            <div>

              <label className="font-semibold flex items-center gap-2 mb-3">

                <Briefcase
                  size={18}
                  className="text-violet-600"
                />

                Target Role

              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 p-3 bg-white dark:bg-[#1f2937] outline-none"
              >

                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>AI/ML Engineer</option>
                <option>Data Scientist</option>

              </select>

            </div>

            {/* Experience */}

            <div>

              <label className="font-semibold flex items-center gap-2 mb-3">

                <Layers
                  size={18}
                  className="text-violet-600"
                />

                Experience

              </label>

              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 p-3 bg-white dark:bg-[#1f2937] outline-none"
              >

                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>

              </select>

            </div>

          </div>

        </div>

        {/* AI Recommendation Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">

          <div className="flex items-center gap-4">

            <Sparkles size={38} />

            <div>

              <h2 className="text-2xl font-bold">

                AI Recommendation Ready

              </h2>

              <p className="mt-2 text-white/90">

                Personalized project suggestions will be
                generated based on your selected skills,
                target role, and experience level.

              </p>

            </div>

          </div>

        </div>
                {/* Recommended Projects */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-8">

            Recommended Portfolio Projects

          </h2>

          <div className="grid lg:grid-cols-2 gap-8">

            {[
              {
                title: "AI Resume Analyzer",
                difficulty: "Intermediate",
                duration: "2 Weeks",
                match: "98%",
                tech: ["React", "Node.js", "OpenAI"],
              },
              {
                title: "Smart Expense Tracker",
                difficulty: "Beginner",
                duration: "1 Week",
                match: "94%",
                tech: ["React", "Firebase"],
              },
              {
                title: "Job Portal Platform",
                difficulty: "Advanced",
                duration: "4 Weeks",
                match: "91%",
                tech: ["MERN", "JWT", "MongoDB"],
              },
              {
                title: "AI Interview Simulator",
                difficulty: "Advanced",
                duration: "5 Weeks",
                match: "97%",
                tech: ["React", "Express", "OpenAI"],
              },
            ].map((project, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 hover:shadow-xl transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-2xl font-bold">

                      {project.title}

                    </h3>

                    <div className="flex gap-3 mt-4">

                      <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">

                        {project.difficulty}

                      </span>

                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">

                        {project.duration}

                      </span>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-gray-500">

                      AI Match

                    </p>

                    <p className="text-3xl font-black text-violet-600">

                      {project.match}

                    </p>

                  </div>

                </div>

                <div className="mt-6">

                  <h4 className="font-semibold mb-3">

                    Tech Stack

                  </h4>

                  <div className="flex flex-wrap gap-3">

                    {project.tech.map((tech, idx) => (

                      <span
                        key={idx}
                        className="px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium"
                      >

                        {tech}

                      </span>

                    ))}

                  </div>

                </div>

                <div className="flex gap-4 mt-8">

                  <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold transition">

                    View Project

                  </button>

                  <button className="flex-1 border border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white py-3 rounded-xl font-semibold transition">

                    Save

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Recommendation Statistics */}

        <div className="mt-10 grid md:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Projects

            </h3>

            <p className="text-5xl font-black text-violet-600 mt-4">

              24

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              AI Match

            </h3>

            <p className="text-5xl font-black text-green-600 mt-4">

              97%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Saved

            </h3>

            <p className="text-5xl font-black text-orange-600 mt-4">

              8

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Completion Rate

            </h3>

            <p className="text-5xl font-black text-blue-600 mt-4">

              82%

            </p>

          </div>

        </div>
                {/* Skill Gap Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Skill Gap Analysis

          </h2>

          <div className="space-y-6">

            {[
              {
                skill: "React",
                progress: 92,
              },
              {
                skill: "Node.js",
                progress: 81,
              },
              {
                skill: "System Design",
                progress: 56,
              },
              {
                skill: "Docker",
                progress: 48,
              },
              {
                skill: "AWS",
                progress: 35,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.skill}

                  </span>

                  <span className="font-bold">

                    {item.progress}%

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Learning Roadmap */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Personalized Learning Roadmap

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                week: "Week 1",
                task: "Build a React Portfolio Website",
              },
              {
                week: "Week 2",
                task: "Develop a Full Stack Task Manager",
              },
              {
                week: "Week 3",
                task: "Create an AI Resume Analyzer",
              },
              {
                week: "Week 4",
                task: "Deploy Projects using Docker & AWS",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <h3 className="text-xl font-bold">

                  {item.week}

                </h3>

                <p className="mt-3 text-gray-500">

                  {item.task}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* AI Career Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Career Recommendations

          </h2>

          <p className="leading-8 text-white/90">

            Based on your current skills, your strongest
            career path is Full Stack Development.

            To become highly competitive, focus on
            System Design, Cloud Computing, Docker,
            Authentication, and large-scale project
            development.

            Completing the recommended portfolio projects
            will significantly strengthen your resume.

          </p>

        </div>

        {/* AI Suggestions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Improvement Suggestions

          </h2>

          <div className="space-y-5">

            {[
              "Build at least 3 production-ready projects.",
              "Deploy every project online using Vercel or Netlify.",
              "Write detailed README files for GitHub repositories.",
              "Practice System Design alongside project development.",
              "Contribute to Open Source every month.",
            ].map((tip, index) => (

              <div
                key={index}
                className="flex gap-4 items-start rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

                  {index + 1}

                </div>

                <p className="leading-7">

                  {tip}

                </p>

              </div>

            ))}

          </div>

        </div>
                {/* AI Recommendation Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Recommendation Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Based on your selected skills, experience level,
            and career goals, AI recommends focusing on
            Full Stack Development projects while gradually
            learning Cloud Computing, System Design,
            and DevOps.

            Completing these projects will improve your
            portfolio, strengthen your resume, and increase
            your interview readiness.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Build Projects That Get You Hired 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Great projects demonstrate practical skills
                better than certificates alone.

                Focus on solving real-world problems,
                deploy your applications,
                write clean documentation,
                and continuously improve your portfolio.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                💻

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Portfolio Score

              </h3>

              <p className="text-5xl font-black">

                95%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProjectRecommendation;