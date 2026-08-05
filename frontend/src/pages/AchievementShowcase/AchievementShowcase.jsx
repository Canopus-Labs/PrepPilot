import React, { useState, useEffect, useContext } from "react";
import {
  Trophy,
  Medal,
  Star,
  Award,
  User,
  Share2,
} from "lucide-react";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosinstance";
import Loader from "../../components/Loader/Loader";

const AchievementShowcase = () => {
  const { user: authUser } = useContext(UserContext);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await axiosInstance.get("/api/user/achievements");
        if (res.data.success) {
          setAchievements(res.data.unlockedAchievements || []);
        }
      } catch (err) {
        console.error("Failed to load achievements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const badgeCount = achievements.length;

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Trophy
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Preparation Achievement Showcase
              </h1>

              <p className="text-gray-500 mt-2">

                Display all the badges and achievements
                earned throughout your interview preparation
                journey.

              </p>

            </div>

          </div>

          <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold">

            <Share2 size={18} />

            Share Profile

          </button>

        </div>

        {/* Profile Card */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

              <div className="flex items-center gap-6">

                <div className="w-24 h-24 rounded-full bg-violet-600 flex items-center justify-center text-white">

                  <User size={42} />

                </div>

                <div>

                  <h2 className="text-3xl font-bold">

                    {authUser?.name || "Guest"}

                  </h2>

                  <p className="text-violet-600 font-semibold mt-2">

                    Interview Ready

                  </p>

                </div>

              </div>

              <div className="grid grid-cols-3 gap-8">

                <div className="text-center">

                  <Award
                    className="mx-auto text-yellow-500 mb-2"
                    size={28}
                  />

                  <p className="text-3xl font-black">

                    {badgeCount}

                  </p>

                  <p className="text-gray-500">
                    Badges
                  </p>

                </div>

                <div className="text-center">

                  <Star
                    className="mx-auto text-violet-600 mb-2"
                    size={28}
                  />

                  <p className="text-3xl font-black">

                    --

                  </p>

                  <p className="text-gray-500">
                    Points
                  </p>

                </div>

                <div className="text-center">

                  <Medal
                    className="mx-auto text-green-600 mb-2"
                    size={28}
                  />

                  <p className="text-3xl font-black">

                    --

                  </p>

                  <p className="text-gray-500">
                    Global Rank
                  </p>

                </div>

              </div>

            </div>
          )}

        </div>
                {/* Earned Badges */}

        <div className="mb-10">

          <h2 className="text-2xl font-bold mb-8">
            Earned Achievement Badges
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                title: "DSA Master",
                icon: "💻",
                description: "Solved 300+ DSA questions.",
                rarity: "Legendary",
                color: "bg-yellow-100 text-yellow-700",
              },
              {
                title: "Mock Interview Pro",
                icon: "🎤",
                description: "Completed 25 mock interviews.",
                rarity: "Epic",
                color: "bg-violet-100 text-violet-700",
              },
              {
                title: "Resume Expert",
                icon: "📄",
                description: "Created an ATS-friendly resume.",
                rarity: "Rare",
                color: "bg-green-100 text-green-700",
              },
              {
                title: "Study Streak",
                icon: "🔥",
                description: "Maintained a 30-day streak.",
                rarity: "Epic",
                color: "bg-red-100 text-red-700",
              },
              {
                title: "Flashcard Master",
                icon: "📚",
                description: "Reviewed 1000+ flashcards.",
                rarity: "Rare",
                color: "bg-blue-100 text-blue-700",
              },
              {
                title: "Community Contributor",
                icon: "🌍",
                description: "Contributed to open source projects.",
                rarity: "Legendary",
                color: "bg-indigo-100 text-indigo-700",
              },
            ].map((badge, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 hover:shadow-xl transition"
              >

                <div className="text-6xl text-center mb-6">

                  {badge.icon}

                </div>

                <h3 className="text-2xl font-bold text-center">

                  {badge.title}

                </h3>

                <p className="text-gray-500 text-center mt-4 leading-7">

                  {badge.description}

                </p>

                <div className="flex justify-center mt-6">

                  <span
                    className={`px-5 py-2 rounded-full font-semibold ${badge.color}`}
                  >

                    {badge.rarity}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Badge Categories */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Badge Categories

          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                name: "DSA",
                count: 5,
                icon: "💻",
              },
              {
                name: "Mock Interviews",
                count: 4,
                icon: "🎤",
              },
              {
                name: "Resume",
                count: 2,
                icon: "📄",
              },
              {
                name: "Study",
                count: 7,
                icon: "📚",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center hover:bg-violet-50 dark:hover:bg-violet-900/10 transition"
              >

                <div className="text-5xl mb-4">

                  {item.icon}

                </div>

                <h3 className="font-bold text-xl">

                  {item.name}

                </h3>

                <p className="text-gray-500 mt-2">

                  {item.count} Badges

                </p>

              </div>

            ))}

          </div>

        </div>
                {/* Locked Badges */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">
            Locked Badges
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              {
                title: "Interview Champion",
                progress: 80,
                requirement: "Complete 50 Mock Interviews",
              },
              {
                title: "Algorithm Wizard",
                progress: 62,
                requirement: "Solve 500 DSA Questions",
              },
              {
                title: "Open Source Hero",
                progress: 45,
                requirement: "Merge 20 Open Source PRs",
              },
            ].map((badge, index) => (

              <div
                key={index}
                className="rounded-3xl border border-gray-200 dark:border-white/10 p-6 opacity-90"
              >

                <div className="text-5xl text-center mb-5">
                  🔒
                </div>

                <h3 className="text-xl font-bold text-center">
                  {badge.title}
                </h3>

                <p className="text-center text-gray-500 mt-3">
                  {badge.requirement}
                </p>

                <div className="mt-6">

                  <div className="flex justify-between mb-2">

                    <span className="text-sm">
                      Progress
                    </span>

                    <span className="font-semibold">
                      {badge.progress}%
                    </span>

                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                      style={{
                        width: `${badge.progress}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Badge Statistics */}

        <div className="mt-10 grid md:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <p className="text-gray-500">
              Total Badges
            </p>

            <p className="text-5xl font-black text-violet-600 mt-4">
              18
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <p className="text-gray-500">
              Legendary
            </p>

            <p className="text-5xl font-black text-yellow-500 mt-4">
              4
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <p className="text-gray-500">
              Epic
            </p>

            <p className="text-5xl font-black text-purple-600 mt-4">
              7
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <p className="text-gray-500">
              Rare
            </p>

            <p className="text-5xl font-black text-green-600 mt-4">
              7
            </p>

          </div>

        </div>

        {/* Achievement Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">
            Progress Towards Next Achievements
          </h2>

          <div className="space-y-6">

            {[
              {
                title: "Mock Interviews",
                progress: 80,
              },
              {
                title: "DSA Sheet Completion",
                progress: 74,
              },
              {
                title: "Study Streak",
                progress: 92,
              },
              {
                title: "Community Contributions",
                progress: 48,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">
                    {item.title}
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
                {/* Share Achievements */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Share2
              size={26}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              Share Your Achievements
            </h2>

          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-8 mb-8">

            Share your preparation journey and achievement badges
            with your friends, mentors, and professional network.

          </p>

          <div className="flex flex-wrap gap-4">

            <button className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition">

              Share on LinkedIn

            </button>

            <button className="px-6 py-3 rounded-xl border border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white font-semibold transition">

              Download Badge Card

            </button>

          </div>

        </div>

        {/* AI Achievement Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Achievement Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Congratulations! You have consistently progressed
            through multiple interview preparation modules.

            Your strongest areas include DSA practice,
            study consistency, resume preparation,
            and mock interviews.

            Continue contributing to open source,
            solving advanced problems, and maintaining
            your study streak to unlock legendary badges.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Every Badge Tells Your Story 🏆

              </h2>

              <p className="leading-8 text-white/90">

                Each achievement reflects your dedication,
                consistency, and continuous learning.

                Keep practicing, keep improving,
                and unlock every badge on your
                interview preparation journey.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🏅

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Achievement Score

              </h3>

              <p className="text-5xl font-black">

                97%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AchievementShowcase;