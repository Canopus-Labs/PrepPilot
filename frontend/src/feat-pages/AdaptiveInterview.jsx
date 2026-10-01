import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BrainCircuit, 
  Play, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Award,
  ChevronRight,
  History,
  ArrowLeft,
  Loader2,
  Trophy
} from "lucide-react";
import toast from "react-hot-toast";

const AdaptiveInterview = () => {
  const { user } = useContext(UserContext);
  
  // App States: 'setup', 'interview', 'report', 'history'
  const [viewState, setViewState] = useState("setup");
  
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Setup Form State
  const [form, setForm] = useState({
    role: "Software Engineer",
    experienceLevel: "Mid-level",
    topics: "Data Structures, React, System Design",
    maxQuestions: 5
  });
  
  // Interview State
  const [answer, setAnswer] = useState("");
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [latestFeedback, setLatestFeedback] = useState(null);
  
  // History State
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [pagination, setPagination] = useState(null);

  const handleStart = async (e) => {
    e.preventDefault();
    if (!form.role || !form.topics) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const topicArray = form.topics.split(",").map(t => t.trim()).filter(Boolean);
      const res = await axiosInstance.post(API_PATHS.ADAPTIVE_INTERVIEW.START, {
        role: form.role,
        experienceLevel: form.experienceLevel,
        topics: topicArray,
        maxQuestions: form.maxQuestions
      });
      setSession(res.data.session);
      setViewState("interview");
      toast.success("Interview session started!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to start session");
      toast.error(err.response?.data?.error || "Failed to start session");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post(
        API_PATHS.ADAPTIVE_INTERVIEW.ANSWER(session._id), 
        { answer }
      );
      setSession(res.data.session);
      setLatestFeedback(res.data.evaluation);
      setFeedbackMode(true);
      
      if (res.data.isCompleted) {
        toast.success("Interview completed! Generating report...");
      } else {
        toast.success("Answer evaluated!");
      }
    } catch (err) {
      if (err.response?.status === 502 && err.response?.data?.evaluation) {
        // Handled graceful failure from backend
        setSession(err.response.data.session);
        setLatestFeedback(err.response.data.evaluation);
        setFeedbackMode(true);
        toast.error("AI question generation delayed, but your answer was saved.");
      } else {
        setError(err.response?.data?.error || "Failed to submit answer");
        toast.error(err.response?.data?.error || "Failed to submit answer");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (session.status === "completed") {
      setViewState("report");
    } else {
      setFeedbackMode(false);
      setLatestFeedback(null);
      setAnswer("");
    }
  };

  const fetchHistory = async (page = 1) => {
    setHistoryLoading(true);
    try {
      const res = await axiosInstance.get(`${API_PATHS.ADAPTIVE_INTERVIEW.HISTORY}?page=${page}`);
      setHistory(res.data.sessions);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error("Failed to load history");
    } finally {
      setHistoryLoading(false);
    }
  };

  const openHistory = () => {
    setViewState("history");
    fetchHistory();
  };

  const loadReport = async (sessionId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.ADAPTIVE_INTERVIEW.REPORT(sessionId));
      setSession(res.data.session);
      setViewState("report");
    } catch (err) {
      toast.error("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  // Visual helper for difficulty
  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case "Easy": return <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-wider">Easy</span>;
      case "Medium": return <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-xs font-bold uppercase tracking-wider">Medium</span>;
      case "Hard": return <span className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-xs font-bold uppercase tracking-wider">Hard</span>;
      default: return null;
    }
  };

  const getDifficultyIcon = (current, previous) => {
    if (!previous) return <Minus className="w-5 h-5 text-gray-400" />;
    const levels = { "Easy": 1, "Medium": 2, "Hard": 3 };
    if (levels[current] > levels[previous]) return <TrendingUp className="w-5 h-5 text-red-500" />;
    if (levels[current] < levels[previous]) return <TrendingDown className="w-5 h-5 text-green-500" />;
    return <Minus className="w-5 h-5 text-yellow-500" />;
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-4 md:p-8 relative dot-grid-bg">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
              <BrainCircuit className="w-10 h-10 text-[var(--color-primary)]" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-teal)]">
                Adaptive AI Interview
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Dynamic difficulty adjustment based on your real-time performance.
            </p>
          </div>
          
          <div className="flex gap-3">
            {viewState !== "setup" && (
              <button 
                onClick={() => { setViewState("setup"); setSession(null); setFeedbackMode(false); }}
                className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Setup
              </button>
            )}
            {viewState === "setup" && (
              <button 
                onClick={openHistory}
                className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition"
              >
                <History className="w-4 h-4" /> View History
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          
          {/* SETUP VIEW */}
          {viewState === "setup" && (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-6 md:p-10 rounded-2xl bento-card border border-[var(--color-border)]"
            >
              <form onSubmit={handleStart} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Target Role</label>
                    <input 
                      type="text" 
                      className="input-box bg-white/5 border-white/10 text-[var(--color-text-dark)] focus:border-[var(--color-primary)]"
                      value={form.role}
                      onChange={e => setForm({...form, role: e.target.value})}
                      placeholder="e.g. Frontend Engineer"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Experience Level</label>
                    <select 
                      className="input-box bg-white/5 border-white/10 text-[var(--color-text-dark)] focus:border-[var(--color-primary)]"
                      value={form.experienceLevel}
                      onChange={e => setForm({...form, experienceLevel: e.target.value})}
                    >
                      <option value="Intern/Entry-level">Intern / Entry-level</option>
                      <option value="Junior">Junior (1-3 years)</option>
                      <option value="Mid-level">Mid-level (3-5 years)</option>
                      <option value="Senior">Senior (5+ years)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Topics to Cover</label>
                  <input 
                    type="text" 
                    className="input-box bg-white/5 border-white/10 text-[var(--color-text-dark)] focus:border-[var(--color-primary)]"
                    value={form.topics}
                    onChange={e => setForm({...form, topics: e.target.value})}
                    placeholder="e.g. React, Node.js, System Design"
                    required
                  />
                  <p className="text-xs text-gray-500">Comma separated topics</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Number of Questions</label>
                  <input 
                    type="number" 
                    min="1" max="20"
                    className="input-box bg-white/5 border-white/10 text-[var(--color-text-dark)] focus:border-[var(--color-primary)]"
                    value={form.maxQuestions}
                    onChange={e => setForm({...form, maxQuestions: parseInt(e.target.value) || 5})}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-small py-4 text-lg mt-4 cta-glow relative overflow-hidden group"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin"/> Starting Engine...</span>
                  ) : (
                    <span className="flex items-center justify-center gap-2"><Play className="w-5 h-5"/> Start Adaptive Session</span>
                  )}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </button>
              </form>
            </motion.div>
          )}

          {/* INTERVIEW VIEW */}
          {viewState === "interview" && session && (
            <motion.div 
              key="interview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {(() => {
                const currentQIndex = session.questions.findIndex(q => !q.isAnswered);
                const isLastQuestion = session.questions.length >= session.maxQuestions && currentQIndex === -1;
                const currentQ = feedbackMode ? session.questions[session.questions.length - 1] : session.questions[currentQIndex];
                const prevQ = currentQIndex > 0 ? session.questions[currentQIndex - 1] : null;

                return (
                  <>
                    {/* Progress Bar */}
                    <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-teal)] transition-all duration-500"
                          style={{ width: `${(session.questions.length / session.maxQuestions) * 100}%` }}
                        />
                      </div>
                      <span className="font-bold text-sm">
                        Q {session.questions.length} / {session.maxQuestions}
                      </span>
                    </div>

                    {/* Question Card */}
                    <div className="glass-panel p-6 md:p-8 rounded-2xl bento-card relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-primary)]" />
                      
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <span className="text-[var(--color-primary)] font-bold text-sm uppercase tracking-wider block mb-1">
                            Topic: {currentQ?.topic}
                          </span>
                          <div className="flex items-center gap-2">
                            {getDifficultyBadge(currentQ?.difficulty)}
                            {feedbackMode && prevQ && (
                              <span className="flex items-center gap-1 text-xs text-gray-500">
                                {getDifficultyIcon(currentQ?.difficulty, prevQ?.difficulty)}
                                from previous
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <h2 className="text-xl md:text-2xl font-medium leading-relaxed">
                        {currentQ?.questionText}
                      </h2>
                    </div>

                    {/* Input Area or Feedback Area */}
                    <AnimatePresence mode="wait">
                      {!feedbackMode ? (
                        <motion.div 
                          key="input"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="glass-panel p-6 rounded-2xl"
                        >
                          <textarea
                            className="w-full bg-transparent border border-[var(--color-border)] rounded-xl p-4 min-h-[200px] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none resize-y transition-all text-lg custom-scrollbar"
                            placeholder="Formulate your answer here... Be as detailed as possible."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            disabled={loading}
                          />
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={handleSubmitAnswer}
                              disabled={loading || !answer.trim()}
                              className="btn-small py-3 px-8 text-base flex items-center gap-2"
                            >
                              {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin"/> Evaluating...</>
                              ) : (
                                <><Send className="w-4 h-4"/> Submit Answer</>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="feedback"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-6"
                        >
                          {/* Scores Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span className="text-4xl font-extrabold text-blue-500 mb-2">{latestFeedback?.overallScore}%</span>
                              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Overall Score</span>
                            </div>
                            <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span className="text-4xl font-extrabold text-green-500 mb-2">{latestFeedback?.correctnessScore}%</span>
                              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Correctness</span>
                            </div>
                            <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span className="text-4xl font-extrabold text-purple-500 mb-2">{latestFeedback?.explanationScore}%</span>
                              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Explanation</span>
                            </div>
                          </div>

                          {/* Feedback Text */}
                          <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-6">
                            <div>
                              <h4 className="flex items-center gap-2 font-bold text-[var(--color-primary)] mb-2">
                                <BrainCircuit className="w-5 h-5" /> Approach Analysis
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {latestFeedback?.approachFeedback}
                              </p>
                            </div>
                            <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
                            <div>
                              <h4 className="flex items-center gap-2 font-bold text-[var(--color-primary)] mb-2">
                                <Award className="w-5 h-5" /> General Feedback
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {latestFeedback?.generalFeedback}
                              </p>
                            </div>
                          </div>

                          {/* Next Action */}
                          <div className="flex flex-col sm:flex-row justify-between items-center glass-panel p-4 rounded-xl gap-4 border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5">
                            <div className="text-sm font-medium">
                              {!isLastQuestion ? (
                                <span>Next difficulty dynamically set to: <strong>{session.currentDifficulty}</strong></span>
                              ) : (
                                <span>Interview complete! Ready to view your final report.</span>
                              )}
                            </div>
                            <button
                              onClick={handleNextQuestion}
                              className="btn-small py-2 px-6 w-full sm:w-auto flex justify-center items-center gap-2"
                            >
                              {isLastQuestion ? "View Final Report" : "Next Question"} <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                );
              })()}
            </motion.div>
          )}

          {/* REPORT VIEW */}
          {viewState === "report" && session && session.finalReport && (
            <motion.div 
              key="report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent-teal)] mb-4 shadow-xl shadow-[var(--color-primary)]/20">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold mb-2">Interview Completed</h2>
                <p className="text-gray-500">Here is your performance summary for the {session.role} role.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Score */}
                <div className="glass-panel p-8 rounded-3xl md:col-span-1 flex flex-col justify-center items-center bento-card text-center">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Final Score</h3>
                  <div className="text-7xl font-extrabold stat-number mb-2">
                    {session.finalReport.totalScore}%
                  </div>
                  <p className="text-sm text-gray-500">Average across {session.questions.length} questions</p>
                </div>

                {/* Topic Breakdown */}
                <div className="glass-panel p-8 rounded-3xl md:col-span-2 bento-card">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
                    <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" /> Topic Performance
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(session.finalReport.topicPerformance || {}).map(([topic, score]) => (
                      <div key={topic} className="flex items-center gap-4">
                        <div className="w-32 font-medium truncate text-sm" title={topic}>{topic}</div>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                              score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <div className="w-10 text-right font-bold text-sm">{score}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Improvement Areas */}
              <div className="glass-panel p-8 rounded-3xl bento-card">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
                  <AlertCircle className="w-5 h-5 text-yellow-500" /> Actionable Feedback
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {session.finalReport.improvementAreas?.map((area, i) => (
                    <li key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm leading-relaxed">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          )}

          {/* HISTORY VIEW */}
          {viewState === "history" && (
            <motion.div 
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel p-6 md:p-8 rounded-3xl bento-card min-h-[400px]"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-[var(--color-border)] pb-4">
                <History className="w-6 h-6 text-[var(--color-primary)]" /> Past Interviews
              </h2>

              {historyLoading ? (
                <div className="flex justify-center items-center h-48">
                  <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
                </div>
              ) : history.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <BrainCircuit className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>You haven't completed any adaptive interviews yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((hSession) => (
                    <div 
                      key={hSession._id} 
                      className="group flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--color-primary)]/30 transition-all cursor-pointer"
                      onClick={() => loadReport(hSession._id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-lg">{hSession.role}</h3>
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-400">{new Date(hSession.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-1">Topics: {hSession.topics?.join(", ")}</p>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex items-center gap-6">
                        <div className="text-center">
                          <span className="block text-xs uppercase tracking-wider text-gray-500">Status</span>
                          <span className={`text-sm font-bold ${hSession.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                            {hSession.status}
                          </span>
                        </div>
                        {hSession.finalReport && (
                          <div className="text-center">
                            <span className="block text-xs uppercase tracking-wider text-gray-500">Score</span>
                            <span className="text-sm font-bold text-[var(--color-primary)]">{hSession.finalReport.totalScore}%</span>
                          </div>
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                  
                  {/* Pagination Controls */}
                  {pagination && pagination.totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8 pt-4 border-t border-[var(--color-border)]">
                      <button 
                        disabled={!pagination.hasPreviousPage}
                        onClick={() => fetchHistory(pagination.page - 1)}
                        className="px-4 py-2 glass-panel rounded-lg disabled:opacity-30 hover:bg-white/10 transition"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 text-sm text-gray-500 flex items-center">
                        Page {pagination.page} of {pagination.totalPages}
                      </span>
                      <button 
                        disabled={!pagination.hasNextPage}
                        onClick={() => fetchHistory(pagination.page + 1)}
                        className="px-4 py-2 glass-panel rounded-lg disabled:opacity-30 hover:bg-white/10 transition"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdaptiveInterview;

