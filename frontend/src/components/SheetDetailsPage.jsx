import { useParams } from "react-router-dom";
import gfg from "../assets/gfg.svg";
import leetcode from "../assets/leetcode.svg";
import youtube from "../assets/youtube.svg";
import React, { useState, useEffect, useCallback, memo } from "react";

import { BASE_URL } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosinstance";
import { CheckCircle2, Circle, AlertCircle, BookOpen, Users, CheckSquare } from "lucide-react";

// Optimized row component to prevent 150+ re-renders on a single click
const SubtopicRow = memo(({ sub, sectionIdx, topicIdx, subIdx, completed, followed, onToggle }) => {
  let diffColor = "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  const diffStr = (sub.difficulty || "").toLowerCase();
  if (diffStr === 'easy') diffColor = "bg-green-50 text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-800/20";
  if (diffStr === 'medium') diffColor = "bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-800/20";
  if (diffStr === 'hard') diffColor = "bg-red-50 text-red-700 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-800/20";

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center px-5 py-3.5 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-200 gap-4 sm:gap-6">
      <div className="flex items-start sm:items-center gap-3.5 flex-1">
        <button
          onClick={() => onToggle(sectionIdx, topicIdx, subIdx)}
          disabled={!followed}
          className={`flex-shrink-0 focus:outline-none transition-transform hover:scale-110 ${!followed ? 'opacity-40 cursor-not-allowed cursor-pointer' : 'cursor-pointer'}`}
          title={followed ? "Toggle Completion" : "Follow sheet to track progress"}
        >
          {completed ? (
            <CheckCircle2 size={20} className="text-green-500 dark:text-green-400 drop-shadow-sm" />
          ) : (
            <Circle size={20} className="text-gray-300 dark:text-gray-500 hover:text-violet-400 transition-colors" />
          )}
        </button>
        
        <span className={`text-sm font-medium transition-all duration-200 ${
          completed ? "text-gray-400 dark:text-gray-500 line-through decoration-gray-300 dark:decoration-gray-600 origin-left" : "text-gray-800 dark:text-gray-200 group-hover:text-violet-600 dark:group-hover:text-violet-400"
        }`}>
          {sub.title}
        </span>
      </div>

      <div className="flex items-center gap-4 sm:ml-auto pl-8 sm:pl-0 sm:shrink-0">
        <div className="flex items-center gap-2.5">
          {["gfg", "leetcode", "youtube"].map((platform) =>
            sub.links?.[platform] ? (
              <a
                key={platform}
                href={followed ? sub.links[platform] : undefined}
                target={followed ? "_blank" : undefined}
                rel="noreferrer"
                className={`p-1.5 rounded-md transition-all ${
                  followed 
                    ? "hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" 
                    : "opacity-30 cursor-not-allowed grayscale"
                }`}
                onClick={(e) => {
                  if (!followed) {
                    e.preventDefault();
                  }
                }}
              >
                <img
                  src={
                    platform === "gfg"
                      ? gfg
                      : platform === "leetcode"
                      ? leetcode
                      : youtube
                  }
                  alt={platform}
                  className={`w-4 h-4 object-contain ${
                    platform === "youtube" ? "opacity-90" : "scale-110 opacity-70"
                  } ${followed && "group-hover:opacity-100"}`}
                />
              </a>
            ) : null
          )}
        </div>

        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide min-w-[60px] text-center ${diffColor}`}>
          {sub.difficulty}
        </div>
      </div>
    </div>
  );
});

function SheetDetail() {
  const { id } = useParams();
  const [sheet, setSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedTopics, setCompletedTopics] = useState({});
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/sheets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSheet(data.sheet);
        const saved = localStorage.getItem(`${id}-progress`);
        if (saved) {
          const progressData = JSON.parse(saved);
            setFollowed(progressData.followed || false);
            setCompletedTopics(progressData.completedTopics || {});
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const totalSubtopics =
    sheet?.sections?.reduce(
      (acc, section) =>
        acc +
        section.topics.reduce(
          (subAcc, topic) => subAcc + (topic.subtopics?.length || 0),
          0
        ),
      0
    ) || 0;

  const completedCount = Object.values(completedTopics).filter(Boolean).length;

  useEffect(() => {
    if (followed) {
      const percentage =
        totalSubtopics > 0
          ? Math.round((completedCount / totalSubtopics) * 100)
          : 0;

      // Debounce the localStorage save slightly to avoid blocking rapid clicks
      const saveToStorage = setTimeout(() => {
        localStorage.setItem(
          `${id}-progress`,
          JSON.stringify({
            followed: true,
            completedTopics,
            percentage,
          })
        );
        localStorage.setItem("sheet-last-update", Date.now().toString());

        // Sync to backend so dashboard can see it
        axiosInstance.post("/api/user/sheet-progress", {
          sheetId: id,
          followed: true,
          completedTopics,
          percentage
        }).catch(err => console.error("Failed to sync progress to backend:", err));

      }, 500);

      return () => clearTimeout(saveToStorage);
    }
  }, [completedTopics, completedCount, followed, id, totalSubtopics]);

  const handleCompleteToggle = useCallback((sectionIdx, topicIdx, subIdx) => {
    if (!followed) return;
    const key = `${sectionIdx}-${topicIdx}-${subIdx}`;
    setCompletedTopics((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, [followed]);

  const handleFollow = () => {
    if (followed) {
      localStorage.removeItem(`${id}-progress`);
      setFollowed(false);
      setCompletedTopics({});
      
      // Update backend to unfollow
      axiosInstance.post("/api/user/sheet-progress", {
        sheetId: id,
        followed: false,
        completedTopics: {},
        percentage: 0
      }).catch(err => console.error(err));

    } else {
      setFollowed(true);
      // Backend sync occurs in the useEffect above when `followed` becomes true
    }
  };

  if (loading)
    return (
      <>
        <p className="p-4 text-gray-900 dark:text-white bg-[var(--color-background)] dark:bg-[#0f172a] min-h-screen transition-colors duration-300">Loading...</p>
      </>
    );

  if (!sheet)
    return (
      <>
        <p className="p-4 text-gray-900 dark:text-white bg-[var(--color-background)] dark:bg-[#0f172a] min-h-screen transition-colors duration-300">
          Sheet not found
        </p>
      </>
    );

  const progressPercent = totalSubtopics > 0 ? Math.round((completedCount / totalSubtopics) * 100) : 0;

  return (
    <>
      <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] text-gray-900 dark:text-white px-5 md:px-12 lg:px-24 py-8 transition-colors duration-300">
        
        {/* Modern Hero Section */}
        <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 shadow-sm border border-gray-200 dark:border-white/10 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight">
                {sheet.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
                {sheet.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-6 lg:mb-0">
                <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 dark:border-white/5">
                  <BookOpen size={14} className="text-violet-500" /> {sheet.questions} Questions
                </div>
                <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 dark:border-white/5">
                  <Users size={14} className="text-blue-500" /> {sheet.followers} Followers
                </div>
                <div className="flex items-center gap-1.5 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 px-3 py-1.5 rounded-lg text-xs font-bold border border-violet-200 dark:border-violet-800/30">
                  <CheckSquare size={14} className="text-violet-500" /> {completedCount} / {totalSubtopics} Solved
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3 min-w-[200px]">
              <button
                onClick={handleFollow}
                className={`w-full md:w-auto px-6 py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-sm border ${
                  followed
                    ? "bg-transparent border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    : "bg-violet-600 text-white border-violet-600 hover:bg-violet-700 hover:shadow-violet-500/20"
                }`}
              >
                {followed ? "UNFOLLOW" : "FOLLOW SHEET"}
              </button>

              {!followed && (
                <div className="flex items-start gap-2 text-[11px] text-amber-600 dark:text-amber-400/80 bg-amber-50 dark:bg-transparent p-2 rounded-lg border border-amber-200 dark:border-amber-800/30">
                  <AlertCircle size={12} className="shrink-0 mt-0.5" />
                  <span>Follow sheet to track progress & unlock links.</span>
                </div>
              )}
            </div>
          </div>

          {/* Top Level Progress Bar */}
          <div className="mt-6 pt-5 border-t border-gray-200 dark:border-white/10">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Overall Progress</span>
              <span className="text-sm font-bold text-violet-600 dark:text-violet-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden shadow-inner flex">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Traditional DSA List/Table UI */}
        <div className="flex flex-col gap-8">
          {sheet.sections?.map((section, sectionIdx) => (
            <div key={sectionIdx} className="w-full">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 flex flex-wrap items-center gap-3">
                <span className="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 px-2.5 py-1 rounded-lg text-xs font-bold border border-violet-200 dark:border-violet-800/30">
                  Step {sectionIdx + 1}
                </span>
                {section.title}
              </h2>
              
              <div className="bg-white dark:bg-transparent rounded-xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden backdrop-blur-sm">
                {section.topics.map((topic, topicIdx) => (
                  <div key={topicIdx} className="w-full border-b border-gray-200 dark:border-white/10 last:border-0 border-t-0">
                    <div className="bg-gray-50 dark:bg-white/5 px-5 py-3 border-b border-gray-200 dark:border-white/10">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        {topicIdx + 1}. {topic.title}
                      </h3>
                    </div>

                    <div className="flex flex-col">
                      {topic.subtopics?.map((sub, subIdx) => {
                        const key = `${sectionIdx}-${topicIdx}-${subIdx}`;
                        const completed = completedTopics[key];
                        return (
                          <SubtopicRow
                            key={subIdx}
                            sub={sub}
                            sectionIdx={sectionIdx}
                            topicIdx={topicIdx}
                            subIdx={subIdx}
                            completed={completed}
                            followed={followed}
                            onToggle={handleCompleteToggle}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Completion banner */}
        {completedCount === totalSubtopics && totalSubtopics > 0 && (
          <div className="mt-12 bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white text-center p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
             <h2 className="text-2xl font-black mb-2 flex items-center justify-center gap-3 drop-shadow-md">
               <CheckCircle2 size={32} /> Mastered!
             </h2>
             <p className="text-white/90 font-medium text-lg drop-shadow-sm">Congratulations! You've successfully solved every problem in this sheet!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default SheetDetail;
