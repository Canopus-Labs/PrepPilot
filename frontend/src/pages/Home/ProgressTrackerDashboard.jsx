import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { 
  TrendingUp, FileText, Activity, BookOpen, 
  PlusCircle, Video, ArrowRight, CheckCircle 
} from "lucide-react";
import toast from "react-hot-toast";

import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { CARD_BG } from "../../utils/data";

import SummaryCard from "../../components/Cards/SummaryCard";

// Helper components for the dashboard
const StatCard = ({ title, value, icon: Icon, colorClass, gradientClass }) => (
  <div className={`relative overflow-hidden rounded-2xl p-6 ${gradientClass} border border-white/10 dark:border-white/5 shadow-sm`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

const SheetProgressCard = ({ progress, navigate }) => {
  // Try to derive a clean name from sheetId (e.g., neetcode-150 -> Neetcode 150)
  const formatSheetName = (id) => {
    if (!id) return "Unknown Sheet";
    return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-5 hover:border-violet-300 dark:hover:border-violet-500/50 transition-colors cursor-pointer group flex flex-col justify-between"
         onClick={() => navigate(`/sheet/${progress.sheetId}`)}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            {formatSheetName(progress.sheetId)}
          </h4>
          <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 rounded-lg">
            {Math.round(progress.percentage || 0)}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${progress.percentage || 0}%` }}
          />
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <BookOpen size={14} /> Active Practice
        </span>
        <ArrowRight size={16} className="text-gray-400 group-hover:text-violet-500 transition-colors transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};

const ResumeCard = ({ resume, navigate }) => (
  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
       // Use blank if no ID, but generally users can just go back to builder to edit.
       // The best mapping is to pass the latex code, but currently ResumeBuilder fetches from params or default. 
       // For now, link to the builder page or download PDF directly. We'll simply link to /resume-builder.
       onClick={() => navigate(`/resume-builder`)}>
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 bg-indigo-500 text-white rounded-xl shadow-sm">
          <FileText size={20} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{resume.title || "My Resume"}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Updated {moment(resume.updatedAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
    
    <div className="mt-3 flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
      <span>Edit Resume</span>
      <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
    </div>
  </div>
);

const ProgressTrackerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Data states
  const [sessions, setSessions] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [sheetProgress, setSheetProgress] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [sessionsRes, resumesRes, progressRes] = await Promise.all([
          axiosInstance.get(API_PATHS.SESSION.GET_ALL).catch(() => ({ data: [] })),
          axiosInstance.get(API_PATHS.RESUME.GET_ALL).catch(() => ({ data: { resumes: [] } })),
          axiosInstance.get('/api/user/sheet-progress').catch(() => ({ data: { progressList: [] } }))
        ]);

        setSessions(sessionsRes.data || []);
        setResumes(resumesRes.data?.resumes || []);
        
        // Only show sheets that are actually followed or have progress
        const activeProgress = (progressRes.data?.progressList || [])
            .filter(p => p.percentage > 0 || p.followed)
            .sort((a, b) => b.percentage - a.percentage);
            
        setSheetProgress(activeProgress);
      } catch (error) {
        console.error("Dashboard data error:", error);
        toast.error("Failed to load some dashboard widgets.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] dark:bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] text-gray-900 dark:text-white pb-20 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="bg-white dark:bg-white/5 border-b border-gray-200 dark:border-white/10 pt-8 pb-10 px-6 md:px-12 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
              Progress Tracker
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
              Your centralized hub for interview preparation. Monitor DSA progress, manage mock interviews, and organize your generated resumes.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
             <button 
                onClick={() => navigate('/coding-sheets')}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/20 transition-all flex items-center gap-2"
             >
                <BookOpen size={18} />
                Explore Sheets
             </button>
             <button 
                onClick={() => navigate('/role-prep')}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white shadow-sm shadow-violet-500/30 transition-all flex items-center gap-2"
             >
                <PlusCircle size={18} />
                New Session
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-8 space-y-12">
        
        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard 
            title="SDE Sheets Active" 
            value={sheetProgress.length} 
            icon={TrendingUp} 
            colorClass="bg-emerald-500"
            gradientClass="bg-white dark:bg-black/20"
          />
          <StatCard 
            title="Interview Sessions" 
            value={sessions.length} 
            icon={Video} 
            colorClass="bg-violet-500"
            gradientClass="bg-white dark:bg-black/20"
          />
          <StatCard 
            title="Saved Resumes" 
            value={resumes.length} 
            icon={FileText} 
            colorClass="bg-blue-500"
            gradientClass="bg-white dark:bg-black/20"
          />
          <StatCard 
            title="App Readiness" 
            value={sessions.length > 2 && sheetProgress.length > 0 ? "High" : "Learning"} 
            icon={Activity} 
            colorClass="bg-fuchsia-500"
            gradientClass="bg-white dark:bg-black/20"
          />
        </div>

        {/* MAIN CONTENT SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Sessions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Video className="text-violet-500" size={24} /> 
                Recent Interview Sessions
              </h2>
              <Link to="/role-prep" className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline">View All</Link>
            </div>
            
            {sessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {sessions.slice(0, 4).map((data, index) => (
                  <SummaryCard
                    key={data._id}
                    colors={CARD_BG[index % CARD_BG.length]}
                    role={data.role || ""}
                    topicsToFocus={data.topicsToFocus || ""}
                    experience={data.experience || "-"}
                    questions={data.questions?.length || "-"}
                    description={data.description || ""}
                    lastupdated={data.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""}
                    onSelect={() => navigate(`/interview-prep/${data._id}`)}
                    onDelete={() => {}} // Handle delete in full view if needed, or pass prop
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video size={28} />
                </div>
                <h3 className="font-bold text-lg mb-2">No Mock Interviews yet</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                  Practice your behavioral and technical speaking skills with our AI interviewer.
                </p>
                <button 
                  onClick={() => navigate('/role-prep')}
                  className="bg-violet-600 text-white rounded-lg px-6 py-2.5 font-semibold"
                >
                  Create Session
                </button>
              </div>
            )}
            
            {/* SAVED RESUMES SECTION */}
            <div className="pt-6 mt-8 border-t border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FileText className="text-blue-500" size={24} /> 
                  Your Resumes
                </h2>
                <button onClick={() => navigate('/resume-builder')} className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Create New
                </button>
              </div>
              
              {resumes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {resumes.map(resume => (
                    <ResumeCard key={resume._id} resume={resume} navigate={navigate} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 text-center shadow-sm">
                  <div className="inline-block p-4 bg-gray-50 dark:bg-gray-800 rounded-full mb-3">
                    <FileText size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium text-sm mb-4">You haven't built any resumes yet.</p>
                  <button 
                    onClick={() => navigate('/resume-builder')}
                    className="text-white bg-gray-800 dark:bg-white/10 hover:dark:bg-white/20 px-5 py-2 rounded-lg font-semibold text-sm transition"
                  >
                    Build Resume
                  </button>
                </div>
              )}
            </div>
            
          </div>

          {/* RIGHT COLUMN: Sheet Progress */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle className="text-emerald-500" size={24} /> 
              DSA Progress
            </h2>
            
            {sheetProgress.length > 0 ? (
              <div className="flex flex-col gap-4">
                {sheetProgress.map(progress => (
                  <SheetProgressCard key={progress.sheetId} progress={progress} navigate={navigate} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={28} />
                </div>
                <h3 className="font-bold text-lg mb-2">No Active Sheets</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Follow a DSA Master Sheet to start tracking your coding progress.
                </p>
                <button 
                  onClick={() => navigate('/coding-sheets')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 py-2.5 font-semibold transition"
                >
                  Explore Sheets
                </button>
              </div>
            )}
            
            {/* Quick tips widget */}
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl p-6 mt-6 shadow-lg shadow-violet-500/20 relative overflow-hidden text-white">
               <div className="relative z-10">
                 <h3 className="font-bold text-lg mb-2">Tip of the day</h3>
                 <p className="text-violet-100 text-sm leading-relaxed mb-4">
                   Consistency is key. Aim to solve at least 2 coding problems and do 1 quick mock interview session every day.
                 </p>
               </div>
               {/* Decorative background shapes */}
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
               <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-black opacity-10 rounded-full blur-xl"></div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackerDashboard;
