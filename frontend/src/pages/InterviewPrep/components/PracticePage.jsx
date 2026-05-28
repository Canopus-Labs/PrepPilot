import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import AptitudeQuestionCard from "../../../components/Cards/AptitudeQuestionCard";
import Loader from "../../../components/Loader/Loader";

import axiosInstance from "../../../utils/axiosinstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { BrainCircuit, LineChart, Calculator, Dices, BookOpen, Puzzle } from "lucide-react";

const topicsData = [
  {
    name: "Logical Reasoning",
    icon: BrainCircuit,
    desc: "Test your analytical and logical thinking abilities.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400"
  },
  {
    name: "Data Interpretation",
    icon: LineChart,
    desc: "Analyze and interpret data from charts and graphs.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-600 dark:text-emerald-400"
  },
  {
    name: "Quantitative Aptitude",
    icon: Calculator,
    desc: "Sharpen your mathematical and numerical calculation skills.",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    text: "text-violet-600 dark:text-violet-400"
  },
  {
    name: "Probability",
    icon: Dices,
    desc: "Master the concepts of chance, odds, and likelihood.",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    text: "text-rose-600 dark:text-rose-400"
  },
  {
    name: "Verbal ability",
    icon: BookOpen,
    desc: "Improve your grammar, vocabulary, and comprehension.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-600 dark:text-amber-400"
  },
  {
    name: "Puzzles",
    icon: Puzzle,
    desc: "Solve complex brain teasers and lateral thinking puzzles.",
    color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    text: "text-indigo-600 dark:text-indigo-400"
  },
];

const PracticePage = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleTopicClick = async (topic) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (topic === "Career Specific Roadmap") {
      navigate("/dashboard");
      return;
    }
    setSelectedTopic(topic);
    setLoading(true);
    setQuestions([]);

    try {
      const res = await axiosInstance.get(
        `${API_PATHS.APTITUDE.GENERATE}?topic=${topic}`
      );
      setQuestions(res.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to generate questions.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
        <main className="flex-1 container mx-auto px-4 py-10 md:py-16">
          <div className={`text-center mb-12 transition-colors duration-300 ${selectedTopic ? 'hidden' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Practice Cognitive Skills
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto md:text-lg">
              Sharpen your logical reasoning, quantitative, and verbal skills
              with curated aptitude tests and exercises.
            </p>
          </div>

          {/* Topics Grid */}
          {!selectedTopic && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 max-w-[1400px] mx-auto">
              {topicsData.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.name}
                    onClick={() => handleTopicClick(topic.name)}
                    className="group flex flex-col items-start sm:flex-row sm:items-center gap-4 md:gap-5 p-5 md:p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-500/40 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-all duration-300 text-left w-full shadow-sm hover:shadow"
                  >
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-300 group-hover:bg-violet-100 group-hover:text-violet-600 dark:group-hover:bg-violet-600/30 dark:group-hover:text-violet-400 transition-colors duration-300">
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    
                    <div className="flex flex-col mt-2 sm:mt-0 flex-1">
                      <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                        {topic.name}
                      </h3>
                      
                      <p className="text-[13px] md:text-sm text-gray-500 dark:text-gray-400 leading-snug line-clamp-2">
                        {topic.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Quiz Header */}
          {selectedTopic && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0 transition-colors duration-300">
                Practicing: <span className="text-violet-600 dark:text-violet-400">{selectedTopic}</span>
              </h2>
              <button
                className="bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-300 flex items-center gap-2"
                onClick={() => {
                  setSelectedTopic(null);
                  setQuestions([]);
                }}
              >
                ← Choose Another Topic
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && <Loader />}

          {/* Questions */}
          {questions.length > 0 && (
            <>
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <AptitudeQuestionCard
                    key={idx}
                    question={q.question}
                    options={q.options}
                    answer={q.answer}
                  />
                ))}
              </div>

              {/* Load More */}
              <div className="flex justify-center mt-6">
                <button
                  className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-full font-semibold shadow transition"
                  disabled={loading || !selectedTopic}
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const res = await axiosInstance.get(
                        `${API_PATHS.APTITUDE.GENERATE}?topic=${selectedTopic}`
                      );
                      setQuestions((prev) => [...prev, ...res.data]);
                    } catch (error) {
                      console.error("Error fetching questions:", error);
                      alert("Failed to generate more questions.");
                    }
                    setLoading(false);
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default PracticePage;
