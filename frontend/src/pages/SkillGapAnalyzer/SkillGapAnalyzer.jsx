import React, { useState } from "react";
import {
  Brain,
  Target,
  BarChart3,
  Briefcase,
  TrendingUp,
} from "lucide-react";

const SkillGapAnalyzer = () => {

  const [role, setRole] = useState("Full Stack Developer");

  const [stats] = useState({
    readiness: 81,
    matchedSkills: 12,
    missingSkills: 6,
    learningProgress: 68,
  });

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

                AI Skill Gap Analyzer

              </h1>

              <p className="text-gray-500 mt-2">

                Compare your skills with your target role
                and discover what you need to learn next.

              </p>

            </div>

          </div>

        </div>

        {/* Target Role */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="font-semibold flex items-center gap-2 mb-3">

                <Briefcase
                  size={18}
                  className="text-violet-600"
                />

                Target Job Role

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

          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Readiness Score

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.readiness}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <TrendingUp
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              Matched Skills

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.matchedSkills}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-red-500 mb-3"
            />

            <h3 className="text-gray-500">

              Missing Skills

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.missingSkills}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <BarChart3
              size={30}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="text-gray-500">

              Learning Progress

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.learningProgress}%

            </p>

          </div>

        </div>
                {/* Missing Skills Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Missing Skills Analysis

          </h2>

          <div className="space-y-8">

            {[
              {
                skill: "System Design",
                progress: 38,
                priority: "High",
              },
              {
                skill: "Docker",
                progress: 42,
                priority: "High",
              },
              {
                skill: "AWS",
                progress: 30,
                priority: "High",
              },
              {
                skill: "CI/CD",
                progress: 48,
                priority: "Medium",
              },
              {
                skill: "Redis",
                progress: 55,
                priority: "Medium",
              },
              {
                skill: "Kubernetes",
                progress: 22,
                priority: "High",
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between items-center mb-3">

                  <div>

                    <h3 className="text-lg font-bold">

                      {item.skill}

                    </h3>

                    <p className="text-gray-500">

                      Current Proficiency: {item.progress}%

                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      item.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {item.priority} Priority

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Resume Skill Comparison */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-8">

            Resume vs Required Skills

          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

              <h3 className="text-xl font-bold mb-6">

                Skills Found in Resume

              </h3>

              <div className="flex flex-wrap gap-3">

                {[
                  "React",
                  "Node.js",
                  "JavaScript",
                  "MongoDB",
                  "Express",
                  "Git",
                  "HTML",
                  "CSS",
                ].map((skill, index) => (

                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium"
                  >

                    ✓ {skill}

                  </span>

                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

              <h3 className="text-xl font-bold mb-6">

                Skills Missing

              </h3>

              <div className="flex flex-wrap gap-3">

                {[
                  "Docker",
                  "AWS",
                  "System Design",
                  "Redis",
                  "CI/CD",
                  "Kubernetes",
                ].map((skill, index) => (

                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-medium"
                  >

                    ✗ {skill}

                  </span>

                ))}

              </div>

            </div>

          </div>

        </div>

        {/* AI Match Overview */}

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Role Match

            </h3>

            <p className="text-5xl font-black text-violet-600 mt-4">

              81%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              AI Confidence

            </h3>

            <p className="text-5xl font-black text-green-600 mt-4">

              95%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Skills Covered

            </h3>

            <p className="text-5xl font-black text-blue-600 mt-4">

              12/18

            </p>

          </div>

        </div>
                {/* Personalized Learning Roadmap */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Personalized Learning Roadmap

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                week: "Week 1",
                task: "Learn Docker Fundamentals",
              },
              {
                week: "Week 2",
                task: "Practice AWS EC2 & S3",
              },
              {
                week: "Week 3",
                task: "Study System Design Basics",
              },
              {
                week: "Week 4",
                task: "Build CI/CD Pipeline Project",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:border-violet-500 transition"
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

        {/* AI Resource Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Recommended Learning Resources

          </h2>

          <div className="space-y-5">

            {[
              {
                title: "Docker Mastery Course",
                type: "Course",
              },
              {
                title: "AWS Cloud Practitioner Guide",
                type: "Documentation",
              },
              {
                title: "System Design Primer",
                type: "GitHub Repository",
              },
              {
                title: "CI/CD with GitHub Actions",
                type: "Tutorial",
              },
              {
                title: "Kubernetes for Beginners",
                type: "Course",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div>

                  <h3 className="font-bold">

                    {item.title}

                  </h3>

                  <p className="text-gray-500">

                    {item.type}

                  </p>

                </div>

                <button className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold">

                  View

                </button>

              </div>

            ))}

          </div>

        </div>

        {/* Weekly Learning Schedule */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Weekly Learning Schedule

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                day: "Monday",
                hours: "2 Hours",
              },
              {
                day: "Wednesday",
                hours: "1.5 Hours",
              },
              {
                day: "Friday",
                hours: "2 Hours",
              },
              {
                day: "Saturday",
                hours: "3 Hours",
              },
              {
                day: "Sunday",
                hours: "Mock Interview",
              },
              {
                day: "Daily",
                hours: "30 min Revision",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <h3 className="text-xl font-bold">

                  {item.day}

                </h3>

                <p className="mt-3 text-gray-500">

                  {item.hours}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* AI Insights */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Career Insights

          </h2>

          <p className="leading-8 text-white/90">

            Your strongest technical foundation is in
            Frontend and Full Stack Development.

            Learning Docker, AWS, Kubernetes,
            and System Design will significantly
            increase your competitiveness for
            software engineering roles at
            product-based companies.

          </p>

        </div>
                {/* AI Skill Gap Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Skill Gap Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Based on your selected target role and current
            preparation progress, you have a strong foundation
            in frontend and full-stack development.

            To become interview-ready for top product companies,
            prioritize learning System Design, Docker, AWS,
            Kubernetes, and CI/CD. Completing the recommended
            roadmap and projects will significantly improve your
            technical profile and increase your job readiness.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Close the Gap, Unlock Opportunities 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every new skill you master moves you one step
                closer to your dream job. Learn consistently,
                build real-world projects, practice interviews,
                and let AI guide your preparation journey.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🎯

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Skill Match

              </h3>

              <p className="text-5xl font-black">

                81%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SkillGapAnalyzer;