import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { FiTrendingUp, FiBookOpen } from "react-icons/fi";
import { FiHelpCircle, FiUsers } from "react-icons/fi";
import { BASE_URL } from "../utils/apiPaths";

function SheetList({ type }) {
  const [sheetList, setSheetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [sheetProgresses, setSheetProgresses] = useState({});

  useEffect(() => {
    // Fetch sheets from backend API
    fetch(`${BASE_URL}/api/sheets`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched sheets:", data.sheets);
        setSheetList(data.sheets);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const checkUpdate = () => {
      const latest = localStorage.getItem("sheet-last-update");
      if (latest && parseInt(latest) > timestamp) {
        setTimestamp(parseInt(latest));
      }
    };
    const interval = setInterval(checkUpdate, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  useEffect(() => {
    if (sheetList.length > 0) {
      const updateProgresses = () => {
        const newProgresses = {};
        sheetList.forEach((sheet) => {
          let progress = 0;
          let isFollowed = false;
          try {
            const raw = localStorage.getItem(`${sheet.id}-progress`);
            if (raw) {
              const data = JSON.parse(raw);
              isFollowed = !!data.followed;
              if (data.completedTopics) {
                const completedCount = Object.values(data.completedTopics).filter(Boolean).length;
                let total = 0;
                for (const section of sheet.sections || []) {
                  for (const topic of section.topics || []) {
                    total += topic.subtopics?.length || 0;
                  }
                }
                progress = total > 0 ? Math.floor((completedCount / total) * 100) : 0;
              }
            }
          } catch (e) {
            console.error("Failed to parse progress", e);
          }
          newProgresses[sheet.id] = { progress, isFollowed };
        });
        setSheetProgresses(newProgresses);
      };
      updateProgresses();
    }
  }, [sheetList, timestamp]);

  if (loading)
    return (
      <>
        <p className="p-4 text-gray-900 dark:text-white">Loading sheets...</p>
      </>
    );
  if (!Array.isArray(sheetList)) return <p>No sheets available.</p>;

  let filteredSheet = [];
  if (type === "popular") {
    filteredSheet = [...sheetList]
      .sort((a, b) => b.followers - a.followers)
      .slice(0, 10);
  } else if (type === "all") {
    filteredSheet = [...sheetList];
  } else {
    filteredSheet = sheetList.filter((sheet) => sheet.category === type);
  }

  const displayedSheets = showAll ? filteredSheet : filteredSheet.slice(0, 7);

  return (
    <>
      <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] text-gray-900 dark:text-white px-6 py-8 transition-colors duration-300">
        <p className="text-2xl font-bold mb-8 flex items-center gap-2 transition-colors duration-300">
          {type === "popular" ? (
            <>
              <FiTrendingUp className="text-yellow-500 dark:text-yellow-400" size={28} /> Popular Sheets
            </>
          ) : type === "all" ? (
            <>
              <FiBookOpen className="text-blue-600 dark:text-blue-400" size={28} /> All Sheets
            </>
          ) : type && typeof type === "string" ? (
            <>
              <FiBookOpen className="text-purple-600 dark:text-purple-400" size={28} /> {`${type.toUpperCase()} Sheets`}
            </>
          ) : (
            <>Sheets</>
          )}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedSheets.map((sheet) => {
            const pInfo = sheetProgresses[sheet.id] || { progress: 0, isFollowed: false };
            const progress = pInfo.progress;
            const isFollowed = pInfo.isFollowed;
            return (
              <Link
                to={`/sheet/${sheet.id}`}
                key={sheet.id}
                className="group relative bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-gray-700 rounded-xl p-5 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 min-h-[190px] overflow-hidden ring-1 ring-black/5 dark:ring-white/5"
              >
                {/* Glowing Hover Background */}
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500"></div>

                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 p-2.5 rounded-xl bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 ring-1 ring-black/5 dark:ring-white/10">
                    <FiBookOpen size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300 leading-tight">
                      {sheet.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3.5 line-clamp-2 leading-snug flex-grow">
                  {sheet.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-3.5">
                  <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium border border-gray-100 dark:border-gray-700">
                    <FiHelpCircle className="text-violet-500" size={13} /> {sheet.questions}
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium border border-gray-100 dark:border-gray-700">
                    <FiUsers className="text-blue-500" size={13} /> {sheet.followers}
                  </div>
                </div>

                <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full mb-3 overflow-hidden shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 relative transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  >
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    {progress}% <span className="text-gray-400 dark:text-gray-500 font-medium text-[10px] tracking-wider uppercase">Completed</span>
                  </span>
                  
                  <button
                    className={`py-1 px-4 rounded-full text-[11px] font-bold tracking-wider transition-all border ${
                      isFollowed
                        ? 'bg-transparent border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-transparent border-violet-500 text-violet-600 hover:bg-violet-600 hover:text-white dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-600 dark:hover:text-white dark:hover:border-violet-600'
                    }`}
                    disabled={isFollowed}
                  >
                    {isFollowed ? 'FOLLOWED' : 'FOLLOW'}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredSheet.length > 7 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2 text-sm font-semibold bg-purple-100 dark:bg-white/10 text-purple-700 dark:text-white rounded-lg hover:bg-purple-200 dark:hover:bg-white/20 transition"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SheetList;
