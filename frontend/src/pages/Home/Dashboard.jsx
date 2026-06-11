import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { User, PlusCircle } from "lucide-react";


import SummaryCard from "../../components/Cards/SummaryCard";
import Modal from "../../components/Loader/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";

import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { CARD_BG } from "../../utils/data";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

  const fetchAllSessions = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setFetchError("Unable to load your interview sessions.");
      toast.error("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (session) => {
    if (!session?._id) return;
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(session._id));
      toast.success("Session deleted successfully!");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      toast.error("Failed to delete session");
    }
  };

  useEffect(() => {
    fetchAllSessions();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] text-gray-900 dark:text-white md:px-10 relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto pt-8 pb-16 px-4 md:px-0 relative z-10">
          <div className="mb-8 md:mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300 tracking-tight">
              Your Interview Sessions
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base">
              Manage, review, and dynamically create your AI-driven mock interview sessions.
            </p>
          </div>

          {/* Sessions Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="min-h-[220px] rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-sm animate-pulse"
                >
                  <div className="h-5 w-2/3 rounded bg-gray-200 dark:bg-white/10 mb-4" />
                  <div className="h-3 w-full rounded bg-gray-100 dark:bg-white/10 mb-2" />
                  <div className="h-3 w-5/6 rounded bg-gray-100 dark:bg-white/10 mb-8" />
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="h-10 rounded-lg bg-gray-100 dark:bg-white/10" />
                    <div className="h-10 rounded-lg bg-gray-100 dark:bg-white/10" />
                  </div>
                  <div className="h-9 w-28 rounded-full bg-gray-200 dark:bg-white/10" />
                </div>
              ))}
            </div>
          ) : fetchError ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 mt-8 text-center border border-red-200 dark:border-red-500/30 rounded-2xl bg-red-50/60 dark:bg-red-500/10 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                Could not load sessions
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-sm mb-6 text-sm leading-relaxed">
                {fetchError} Please check your connection and try again.
              </p>
              <button
                onClick={fetchAllSessions}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-lg font-medium shadow-sm hover:bg-violet-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          ) : sessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((data, index) => (
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
                  onDelete={() => setOpenDeleteAlert({ open: true, data })}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 mt-8 text-center border border-gray-200 dark:border-white/10 rounded-2xl bg-gray-50/50 dark:bg-gray-800/20 shadow-sm">
              <div className="flex items-center justify-center w-16 h-16 mb-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500 shadow-sm">
                <User size={28} strokeWidth={1.5} />
              </div>
              
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                No interview sessions
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8 text-sm leading-relaxed">
                You don't have any mock interview sessions yet. Create your first session to start practicing with our AI interviewer.
              </p>
              
              <button
                onClick={() => setOpenCreateModal(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-violet-600 text-white rounded-lg font-medium shadow-sm hover:bg-violet-700 transition-colors duration-200"
              >
                <PlusCircle size={18} />
                Create Session
              </button>
            </div>
          )}

          {/* Add New Floating Button */}
          {sessions.length > 0 && (
            <button
              className="fixed bottom-8 right-8 md:bottom-12 md:right-12 h-14 flex items-center gap-2 px-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-full shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-1 transition-all duration-300 z-50 ring-2 ring-white/20 dark:ring-transparent"
              onClick={() => setOpenCreateModal(true)}
            >
              <LuPlus className="text-2xl" /> Add Session
            </button>
          )}
        </div>
      </div>

      {/* Create Session Modal */}
      <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} hideHeader>
        <CreateSessionForm />
      </Modal>

      {/* Delete Alert Modal */}
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Session"
      >
        <DeleteAlertContent
          content="Are you sure you want to delete this session?"
          onDelete={() => deleteSession(openDeleteAlert.data)}
        />
      </Modal>
    </>
  );
};

export default Dashboard;
