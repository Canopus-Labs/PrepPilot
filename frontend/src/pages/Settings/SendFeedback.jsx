import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { MessageSquare, Heart, Bug, Lightbulb, Sparkles, Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EMOJIS = [
  { value: 1, label: "😠", text: "Terrible" },
  { value: 2, label: "😐", text: "Bad" },
  { value: 3, label: "🙂", text: "Good" },
  { value: 4, label: "🤩", text: "Amazing" },
];

const CATEGORIES = [
  { id: "bug", label: "Bug Report", icon: Bug, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
  { id: "feature", label: "Feature Request", icon: Sparkles, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  { id: "design", label: "Design/UX", icon: Lightbulb, color: "text-teal-500 bg-teal-500/10 border-teal-500/20" },
  { id: "other", label: "Other", icon: MessageSquare, color: "text-violet-500 bg-violet-500/10 border-violet-500/20" },
];

const SendFeedback = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [category, setCategory] = useState("feature");
  const [rating, setRating] = useState(3);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter your feedback message.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you! Your feedback has been submitted successfully.");
      setMessage("");
      setRating(3);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white px-4 sm:px-6 lg:px-8 py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 transition-colors"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                Send Feedback <MessageSquare className="text-violet-500" size={28} />
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Help us improve PrepPilot AI. Share your thoughts, report issues, or suggest new features.
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden transition-colors duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -z-10" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                What kind of feedback is this?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const active = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                        active
                          ? "border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 scale-102"
                          : "border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                      }`}
                    >
                      <Icon size={24} className="mb-2" />
                      <span className="text-xs font-semibold">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Satisfaction level */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">
                How would you rate your experience?
              </label>
              <div className="flex items-center gap-4 sm:gap-6 bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                {EMOJIS.map((emoji) => {
                  const active = rating === emoji.value;
                  return (
                    <button
                      key={emoji.value}
                      type="button"
                      onClick={() => setRating(emoji.value)}
                      className={`flex flex-col items-center gap-1 transition-all duration-200 flex-1 ${
                        active
                          ? "scale-115 filter-none"
                          : "scale-100 opacity-60 hover:opacity-100 filter grayscale hover:grayscale-0"
                      }`}
                    >
                      <span className="text-3xl sm:text-4xl select-none">{emoji.label}</span>
                      <span className={`text-[10px] sm:text-xs font-bold ${active ? "text-violet-500" : "text-gray-500"}`}>
                        {emoji.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-gray-900 dark:text-white transition-all duration-200"
                required
              />
            </div>

            {/* Message area */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Your Message
                </label>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                  {message.length} / 1000 characters
                </span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                placeholder="Tell us what you like, what is broken, or what features you would love to see next..."
                rows={5}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-gray-900 dark:text-white transition-all duration-200 resize-none"
                required
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold transition-all duration-200 ${
                  isSubmitting || !message.trim()
                    ? "bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 hover:scale-101 shadow-lg shadow-violet-500/25 cursor-pointer"
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendFeedback;
