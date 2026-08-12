import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  Target,
  TrendingUp,
  Copy,
} from "lucide-react";

const ResumeBulletEnhancer = () => {

  const [bullet, setBullet] = useState("");

  const [stats] = useState({
    atsScore: 86,
    qualityScore: 91,
    rewrites: 4,
    actionVerbs: 28,
  });

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Sparkles
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                AI Resume Bullet Point Enhancer

              </h1>

              <p className="text-gray-500 mt-2">

                Transform ordinary resume bullet points into
                powerful achievement-oriented statements
                using AI.

              </p>

            </div>

          </div>

        </div>

        {/* Resume Bullet Input */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">

            Resume Bullet

          </h2>

          <textarea
            rows={6}
            value={bullet}
            onChange={(e) => setBullet(e.target.value)}
            placeholder="Example: Worked on a React project using APIs..."
            className="w-full rounded-2xl border border-gray-300 dark:border-white/10 p-4 bg-white dark:bg-[#1f2937] resize-none outline-none"
          />

          <button className="mt-6 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition">

            Enhance with AI

          </button>

        </div>

        {/* Dashboard */}

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              ATS Score

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.atsScore}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <TrendingUp
              size={30}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="text-gray-500">

              Quality

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.qualityScore}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <FileText
              size={30}
              className="mx-auto text-orange-500 mb-3"
            />

            <h3 className="text-gray-500">

              Rewrites

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.rewrites}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Copy
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Action Verbs

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.actionVerbs}

            </p>

          </div>

        </div>
                {/* AI Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Resume Analysis

          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                title: "Action Verbs",
                value: "Good",
              },
              {
                title: "Grammar",
                value: "98%",
              },
              {
                title: "Clarity",
                value: "91%",
              },
              {
                title: "Impact",
                value: "76%",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <h3 className="text-gray-500">

                  {item.title}

                </h3>

                <p className="text-3xl font-black text-violet-600 mt-4">

                  {item.value}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* AI Rewrite Suggestions */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-8">

            AI Rewrite Suggestions

          </h2>

          <div className="space-y-6">

            {[
              "Developed and deployed a responsive React application that improved user engagement by 30% through optimized API integration.",

              "Engineered a scalable frontend using React and REST APIs, reducing page load time by 25% and enhancing user experience.",

              "Designed and implemented a modern React-based web application with efficient API integration, increasing performance and usability.",

              "Built a feature-rich React application utilizing REST APIs, improving application responsiveness and overall user satisfaction.",
            ].map((text, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8"
              >

                <h3 className="font-bold text-lg mb-4">

                  Rewrite Option {index + 1}

                </h3>

                <p className="leading-8 text-gray-600 dark:text-gray-300">

                  {text}

                </p>

                <button
                 onClick={() => navigator.clipboard.writeText(text)}
                className="mt-6 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold"
                >
                Copy Rewrite
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* Action Verb Suggestions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Strong Action Verbs

          </h2>

          <div className="flex flex-wrap gap-4">

            {[
              "Engineered",
              "Developed",
              "Designed",
              "Optimized",
              "Implemented",
              "Automated",
              "Architected",
              "Enhanced",
              "Integrated",
              "Streamlined",
            ].map((verb, index) => (

              <span
                key={index}
                className="px-5 py-3 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold"
              >

                {verb}

              </span>

            ))}

          </div>

        </div>

        {/* Achievement Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            Achievement Suggestions

          </h2>

          <p className="leading-8 text-white/90">

            Strengthen this bullet by adding measurable
            achievements such as percentage improvements,
            response time reductions, number of users served,
            project scale, deployment statistics, or business
            impact whenever possible.

          </p>

        </div>
                {/* ATS Optimization */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            ATS Optimization Report

          </h2>

          <div className="space-y-6">

            {[
              {
                label: "Keyword Matching",
                value: 90,
              },
              {
                label: "Action-Oriented Language",
                value: 95,
              },
              {
                label: "Quantified Achievements",
                value: 72,
              },
              {
                label: "Readability",
                value: 94,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.label}

                  </span>

                  <span className="font-bold">

                    {item.value}%

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Grammar & Clarity */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Grammar & Clarity Improvements

          </h2>

          <div className="space-y-5">

            {[
              "Replace weak verbs such as 'worked' with stronger action verbs like 'developed' or 'engineered'.",
              "Use active voice instead of passive voice.",
              "Keep each bullet concise and focused on one achievement.",
              "Include measurable business or technical impact wherever possible.",
            ].map((tip, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <p className="leading-7 text-gray-600 dark:text-gray-300">

                  {tip}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Before vs After */}

        <div className="mt-10 grid lg:grid-cols-2 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <h2 className="text-2xl font-bold mb-6">

              Before

            </h2>

            <p className="leading-8 text-gray-600 dark:text-gray-300">

              Worked on a React application using REST APIs
              and helped improve the website.

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <h2 className="text-2xl font-bold mb-6">

              After AI Enhancement

            </h2>

            <p className="leading-8 text-gray-600 dark:text-gray-300">

              Engineered a responsive React application with
              REST API integration, improving application
              performance by 25% and enhancing overall user
              experience.

            </p>

          </div>

        </div>

        {/* One Click Copy */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            Ready to Use

          </h2>

          <p className="leading-8 text-white/90">

            Copy the AI-enhanced resume bullet directly into
            your resume and improve readability, ATS
            compatibility, and professional impact.

          </p>

          <button className="mt-8 px-8 py-3 rounded-xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition">

            Copy Final Version

          </button>

        </div>
        
                {/* AI Enhancement Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Enhancement Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            AI analyzed your resume bullet and identified opportunities
            to improve clarity, impact, and ATS compatibility.
            The enhanced version uses stronger action verbs,
            measurable achievements, and concise language to
            better showcase your accomplishments.

            Continue applying these improvements across all
            experience and project sections to create a stronger,
            recruiter-friendly resume.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Make Every Bullet Count 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Strong resumes are built with clear,
                achievement-focused bullet points.
                Use measurable results, impactful action verbs,
                and concise language to highlight your
                contributions and stand out to recruiters.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📄

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Resume Strength

              </h3>

              <p className="text-5xl font-black">

                94%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default ResumeBulletEnhancer;