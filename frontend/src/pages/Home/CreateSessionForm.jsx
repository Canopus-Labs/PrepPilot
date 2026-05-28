import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { Target, Briefcase, Code2, FileText, Sparkles } from "lucide-react";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS, {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data.question || aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        topicsToFocus: formData.topicsToFocus,
        question: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputConfig = [
    {
      id: "role",
      icon: Target,
      label: "Target Role",
      placeholder: "e.g., Frontend Developer, UI/UX Designer",
      type: "text"
    },
    {
      id: "experience",
      icon: Briefcase,
      label: "Years of Experience",
      placeholder: "e.g., 1, 3, 5",
      type: "number"
    },
    {
      id: "topicsToFocus",
      icon: Code2,
      label: "Topics to Focus On",
      placeholder: "React, Node.js, System Design",
      type: "text"
    },
    {
      id: "description",
      icon: FileText,
      label: "Session Goals (Optional)",
      placeholder: "Any specific areas you want the AI to challenge you on...",
      type: "textarea"
    }
  ];

  return (
    <div className="w-full flex justify-center min-w-0">
      <div className="w-full flex flex-col justify-center min-w-0">
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
            New Interview Journey
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
            Configure your AI interviewer to perfectly match your target role.
          </p>
        </div>

        <form onSubmit={handleCreateSession} className="flex flex-col gap-5">
          {inputConfig.map((field) => {
            const Icon = field.icon;
            
            return (
              <div key={field.id} className="relative group">
                <label className="text-[13px] font-bold text-gray-700 dark:text-gray-300 block mb-1.5 ml-1 transition-colors">
                  {field.label} {field.id !== 'description' && <span className="text-rose-500">*</span>}
                </label>
                <div className="relative flex items-center w-full min-w-0">
                  <div className="absolute left-3 text-gray-400 dark:text-gray-500 group-focus-within:text-violet-500 transition-colors pointer-events-none">
                    <Icon size={18} />
                  </div>
                  
                  {field.type === "textarea" ? (
                    <textarea
                      value={formData[field.id]}
                      onChange={({ target }) => handleChange(field.id, target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full min-w-0 bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-[14px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all shadow-sm resize-none scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.id]}
                      onChange={({ target }) => handleChange(field.id, target.value)}
                      placeholder={field.placeholder}
                      className="w-full min-w-0 bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-[14px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all shadow-sm"
                    />
                  )}
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            {error && (
              <div className="mb-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium px-3 py-2.5 rounded-lg flex items-center gap-2">
                <Target size={14} className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-[14px] sm:text-[15px] font-bold text-white transition-colors ${
                isLoading
                  ? "bg-violet-400 dark:bg-violet-600/50 cursor-wait"
                  : "bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
              }`}
            >
              {isLoading && <SpinnerLoader />}
              <span>{isLoading ? "Generating Interview..." : "Create Session"}</span>
            </button>
            <p className="text-center text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-4 font-medium uppercase tracking-wider">
              Powered by advanced AI modeling
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSessionForm;
