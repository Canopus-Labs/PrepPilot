import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse, LuDownload } from "react-icons/lu";
import html2pdf from "html2pdf.js";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import AIResponsePreview from "./components/AIResponsePreview";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import Drawer from "../../components/Drawer";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionsData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const handleDownloadPdf = () => {
    const element = document.getElementById("pdf-report");
    if (!element) return;
    const opt = {
      margin:       10,
      filename:     'Interview_Feedback_Report.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  // fetch session data
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data && response.data.session) {
        setSessionsData(response.data.session);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // generate explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );
      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation, try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // toggle pin
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      if (response.data && response.data.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // load more questions
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );
      // Extract the question array from the response
      const generatedQuestions = aiResponse.data.question || aiResponse.data;

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        { sessionId, questions: generatedQuestions }
      );
      if (response.data) {
        toast.success("Added more Q&A!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
          "Something went wrong. Please try again"
      );
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
  }, [sessionId]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-6 pb-10 px-4 sm:px-6 md:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
            Interview Q & A
          </h2>
          {sessionData?.questions?.length > 0 && (
            <button
              onClick={handleDownloadPdf}
              className="mt-3 sm:mt-0 flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              <LuDownload size={16} />
              Download PDF
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          {/* Q&A Section */}
          <div className="col-span-12">
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (
                <motion.div
                  key={data._id || index}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="mb-6"
                >
                  <QuestionCard
                    question={data?.question}
                    answer={data?.answer}
                    onLearnMore={() =>
                      generateConceptExplanation(data.question)
                    }
                    isPinned={data?.isPinned}
                    onTogglePin={() => toggleQuestionPinStatus(data._id)}
                  />

                  {/* Load More button after last card */}
                  {!isLoading &&
                    sessionData?.questions?.length === index + 1 && (
                      <div className="flex justify-center mt-6">
                        <button
                          className="flex items-center gap-2 text-sm sm:text-base text-white font-medium bg-gradient-to-r from-black to-gray-800 px-5 sm:px-6 py-2.5 rounded-full shadow hover:opacity-90 transition"
                          disabled={isLoading || isUpdateLoader}
                          onClick={uploadMoreQuestions}
                        >
                          {isUpdateLoader ? (
                            <SpinnerLoader />
                          ) : (
                            <LuListCollapse className="text-lg" />
                          )}
                        <span className="hidden md:inline"> Learn More</span>
                        </button>
                      </div>
                    )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Drawer */}
        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading && explanation?.title}
        >
          {errorMsg && (
            <p className="flex gap-2 text-sm text-amber-600 font-medium mb-4">
              <LuCircleAlert className="mt-1" />
              {errorMsg}
            </p>
          )}
          {isLoading && <SkeletonLoader />}
          {!isLoading && explanation && (
            <AIResponsePreview content={explanation?.explanation} />
          )}
        </Drawer>

        {/* Hidden PDF Report Area */}
        <div className="absolute left-[-9999px] top-0 w-[800px] bg-white text-black p-10 font-sans" id="pdf-report">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Feedback Report</h1>
            <p className="text-gray-600 text-sm mb-1"><strong>Role:</strong> {sessionData?.role || ""}</p>
            <p className="text-gray-600 text-sm mb-1"><strong>Experience:</strong> {sessionData?.experience || "-"} {sessionData?.experience === 1 ? "Year" : "Years"}</p>
            <p className="text-gray-600 text-sm mb-1"><strong>Date:</strong> {sessionData?.updatedAt ? moment(sessionData.updatedAt).format("MMMM Do YYYY, h:mm a") : ""}</p>
          </div>
          
          <div className="space-y-8">
            {sessionData?.questions?.map((q, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-5 break-inside-avoid shadow-sm bg-white">
                <div className="flex gap-3 mb-4 border-b border-gray-100 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 font-bold flex items-center justify-center shrink-0">
                    Q{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{q.question}</h3>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Answer</h4>
                  <div className="prose prose-sm max-w-none text-gray-800">
                    <AIResponsePreview content={q.answer} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
