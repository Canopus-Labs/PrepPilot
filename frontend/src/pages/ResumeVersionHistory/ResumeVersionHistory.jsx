import React, { useState } from "react";
import {
  FileText,
  History,
  Download,
  RotateCcw,
  GitCompare,
} from "lucide-react";

const ResumeVersionHistory = () => {
  const [stats] = useState({
    totalVersions: 8,
    currentVersion: "v3.2",
    lastUpdated: "02 Aug 2026",
    downloads: 26,
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <History
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                Resume Version History

              </h1>

              <p className="text-gray-500 mt-2">

                Track every resume update, compare versions,
                restore previous copies, and download any version.

              </p>

            </div>

          </div>

        </div>

        {/* Overview Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <FileText
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">
              Total Versions
            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.totalVersions}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <History
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">
              Current Version
            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.currentVersion}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <RotateCcw
              size={30}
              className="mx-auto text-orange-500 mb-3"
            />

            <h3 className="text-gray-500">
              Last Updated
            </h3>

            <p className="text-2xl font-black mt-4">

              {stats.lastUpdated}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Download
              size={30}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="text-gray-500">
              Downloads
            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.downloads}

            </p>

          </div>

        </div>
                {/* Resume Version History */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-8">

            <History
              size={26}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              Resume Versions
            </h2>

          </div>

          <div className="space-y-6">

            {[
              {
                version: "v3.2",
                date: "02 Aug 2026",
                note: "Added new AI projects and updated technical skills.",
                current: true,
              },
              {
                version: "v3.1",
                date: "28 Jul 2026",
                note: "Improved ATS keywords and resume formatting.",
                current: false,
              },
              {
                version: "v3.0",
                date: "20 Jul 2026",
                note: "Added internship experience and certifications.",
                current: false,
              },
              {
                version: "v2.5",
                date: "10 Jul 2026",
                note: "Updated education details and achievements.",
                current: false,
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:shadow-lg transition"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-6">

                  <div>

                    <div className="flex items-center gap-3">

                      <h3 className="text-2xl font-bold">

                        {item.version}

                      </h3>

                      {item.current && (

                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">

                          Current

                        </span>

                      )}

                    </div>

                    <p className="text-gray-500 mt-3">

                      Last Modified: {item.date}

                    </p>

                    <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">

                      {item.note}

                    </p>

                  </div>

                  <div className="flex flex-wrap gap-3 items-center">

                    <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition">

                      <Download size={18} />

                      Download

                    </button>

                    <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold transition">

                      <RotateCcw size={18} />

                      Restore

                    </button>

                    <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white font-semibold transition">

                      <GitCompare size={18} />

                      Compare

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Version Labels */}

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          {[
            {
              title: "Major Updates",
              value: "3",
            },
            {
              title: "Minor Updates",
              value: "5",
            },
            {
              title: "Restore Points",
              value: "8",
            },
          ].map((item, index) => (

            <div
              key={index}
              className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center"
            >

              <h3 className="text-gray-500">

                {item.title}

              </h3>

              <p className="text-5xl font-black text-violet-600 mt-4">

                {item.value}

              </p>

            </div>

          ))}

        </div>
                {/* Version Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-8">

            <GitCompare
              size={26}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              Version Comparison
            </h2>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <h3 className="text-xl font-bold mb-5">
                Version v3.1
              </h3>

              <ul className="space-y-3 text-gray-600 dark:text-gray-300">

                <li>• ATS Score: 84%</li>
                <li>• Projects: 4</li>
                <li>• Skills: 12</li>
                <li>• Certifications: 2</li>
                <li>• Experience: 1 Internship</li>

              </ul>

            </div>

            <div className="rounded-2xl border border-violet-500 p-6 bg-violet-50 dark:bg-violet-900/10">

              <h3 className="text-xl font-bold mb-5">
                Version v3.2 (Current)
              </h3>

              <ul className="space-y-3 text-gray-700 dark:text-gray-200">

                <li>✅ ATS Score: 91%</li>
                <li>✅ Projects: 6</li>
                <li>✅ Skills: 16</li>
                <li>✅ Certifications: 4</li>
                <li>✅ Experience: Internship + Open Source</li>

              </ul>

            </div>

          </div>

        </div>

        {/* Resume Timeline */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Resume Evolution Timeline

          </h2>

          <div className="space-y-6">

            {[
              {
                version: "v2.5",
                update: "Education & achievements updated",
              },
              {
                version: "v3.0",
                update: "Internship experience added",
              },
              {
                version: "v3.1",
                update: "ATS optimization and formatting",
              },
              {
                version: "v3.2",
                update: "AI projects and certifications added",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="flex gap-5 items-start"
              >

                <div className="w-5 h-5 rounded-full bg-violet-600 mt-2"></div>

                <div>

                  <h3 className="font-bold">

                    {item.version}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    {item.update}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Resume Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Resume Suggestions

          </h2>

          <p className="leading-8 text-white/90">

            Your latest resume shows significant improvements
            compared to previous versions. AI recommends
            adding measurable achievements, quantifying project
            impact, including GitHub contributions, and tailoring
            your resume for each company to further improve ATS
            compatibility and recruiter visibility.

          </p>

        </div>

        {/* Resume Growth Statistics */}

        <div className="mt-10 grid md:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">
              ATS Score
            </h3>

            <p className="text-5xl font-black text-green-600 mt-4">
              91%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">
              Resume Strength
            </h3>

            <p className="text-5xl font-black text-violet-600 mt-4">
              95%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">
              Improvements
            </h3>

            <p className="text-5xl font-black text-orange-600 mt-4">
              +18
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">
              AI Confidence
            </h3>

            <p className="text-5xl font-black text-blue-600 mt-4">
              96%
            </p>

          </div>

        </div>
                {/* AI Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Resume Version Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your resume has improved consistently across each
            version. Recent updates have strengthened ATS
            compatibility, technical skills, project descriptions,
            and overall presentation.

            Continue tailoring your resume for specific job
            roles and regularly update new projects,
            certifications, and achievements to maximize
            interview opportunities.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Every Version Makes You Better 🚀

              </h2>

              <p className="leading-8 text-white/90">

                A great resume evolves with your journey.
                Keep refining your projects, skills,
                certifications, and achievements to build
                a resume that truly represents your growth.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📄

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Resume Quality

              </h3>

              <p className="text-5xl font-black">

                96%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ResumeVersionHistory;