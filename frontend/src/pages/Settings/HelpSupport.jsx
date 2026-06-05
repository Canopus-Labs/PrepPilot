import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Bot, 
  Code, 
  FileText, 
  Mail, 
  HelpCircle, 
  Send, 
  ArrowLeft,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const FAQ_ITEMS = [
  {
    category: "ai",
    question: "How does the AI Resume Analyzer work?",
    answer: "Our AI Resume Analyzer parses your resume using advanced AI models and compares it against industry standards and job descriptions. It provides a match score, highlights missing keywords, and gives actionable recommendations to improve your formatting and content."
  },
  {
    category: "dsa",
    question: "Are the DSA Coding Sheets free to use?",
    answer: "Yes, all DSA Master Sheets (curated lists of essential coding problems categorized by topic and difficulty) are 100% free and open for all users to track their learning progress and practice compiler integration."
  },
  {
    category: "ai",
    question: "How does the AI Mock Interview system grade my responses?",
    answer: "The AI interviewer evaluates your responses for technical accuracy, code quality, communication skills, and structure. It then provides detailed rubric-based feedback and dynamic follow-up questions to help you improve."
  },
  {
    category: "account",
    question: "How do I upgrade or change my plan?",
    answer: "Currently, PrepPilot AI is in beta/free mode. All features are fully accessible without any subscription or payment!"
  },
  {
    category: "account",
    question: "Is my data secure on PrepPilot?",
    answer: "Yes, your personal profile, uploaded resumes, and coding activity are stored securely. We do not sell or share user data with third-party companies, and all resume processing is done in compliance with data safety standards."
  },
  {
    category: "general",
    question: "How can I report a bug or suggest a feature?",
    answer: "You can use the 'Send Feedback' page from the settings menu to directly report bugs or suggest new features to our development team. We review all submissions regularly!"
  }
];

const CATEGORIES = [
  { id: "all", label: "All Support", icon: HelpCircle },
  { id: "account", label: "Account & Profile", icon: User },
  { id: "ai", label: "AI Tools & Interviews", icon: Bot },
  { id: "dsa", label: "Coding & DSA", icon: Code },
  { id: "general", label: "General Questions", icon: FileText }
];

const HelpSupport = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Support form state
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState("general");
  const [ticketMessage, setTicketMessage] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim() || !email.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to create ticket
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Support ticket created! Our team will contact you shortly.");
      setTicketSubject("");
      setTicketMessage("");
    }, 1200);
  };

  // Filter FAQs based on search query and selected category
  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white px-4 sm:px-6 lg:px-8 py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        
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
                Help & Support <HelpCircle className="text-violet-500" size={28} />
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Find answers, search our FAQ knowledge base, or reach out to our support team.
              </p>
            </div>
          </div>
        </div>

        {/* Support Grid (FAQs + Contact Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* FAQ Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl p-6 relative overflow-hidden transition-colors duration-300">
              <div className="absolute top-0 left-0 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl -z-10" />
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
              
              {/* Search input */}
              <div className="relative mb-6">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search questions or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-gray-900 dark:text-white transition-all duration-200"
                />
              </div>

              {/* Categories Navigation */}
              <div className="flex flex-wrap gap-2 mb-6">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const active = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setOpenFaqIndex(null); // Reset open accordion on category change
                      }}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                        active
                          ? "bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-500/20"
                          : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                      }`}
                    >
                      <Icon size={14} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* FAQ Accordion List */}
              <div className="space-y-3">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div 
                        key={idx}
                        className="border border-gray-150 dark:border-white/5 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-white/2 transition-colors duration-200"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? <ChevronUp size={16} className="text-violet-500 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                        </button>
                        
                        {/* Smooth Transition for answer content */}
                        <div 
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isOpen ? "max-h-48 border-t border-gray-150 dark:border-white/5" : "max-h-0"
                          }`}
                        >
                          <p className="p-4 text-sm text-gray-650 dark:text-gray-400 leading-relaxed bg-white/40 dark:bg-transparent">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-10 text-gray-550 dark:text-gray-400">
                    <p className="font-semibold mb-1">No matches found</p>
                    <p className="text-xs">Try searching for different keywords or checking another category.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Support Form Column */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl p-6 relative overflow-hidden transition-colors duration-300">
              <div className="absolute top-0 right-0 w-48 h-48 bg-fuchsia-500/5 rounded-full blur-3xl -z-10" />
              
              <div className="flex items-center gap-2 mb-4">
                <Mail className="text-violet-500" size={20} />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Submit Ticket</h2>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-6">
                Can't find what you need? Open a support ticket, and our support desk will respond shortly.
              </p>

              <form onSubmit={handleSupportSubmit} className="space-y-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-gray-900 dark:text-white transition-all duration-200"
                    required
                  />
                </div>

                {/* Ticket Topic Category */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Topic Category
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-gray-900 dark:text-white transition-all duration-200 cursor-pointer appearance-none"
                  >
                    <option value="account" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">Account Issue</option>
                    <option value="bug" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">Bug Report</option>
                    <option value="ai" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">AI/Interview System</option>
                    <option value="dsa" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">DSA Sheets</option>
                    <option value="general" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">General Inquiry</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Subject Heading
                  </label>
                  <input
                    type="text"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="Briefly describe the issue..."
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-gray-900 dark:text-white transition-all duration-200"
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Details
                  </label>
                  <textarea
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    placeholder="Please provide steps to reproduce, or explain what you need assistance with..."
                    rows={4}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-gray-900 dark:text-white transition-all duration-200 resize-none"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !ticketSubject.trim() || !ticketMessage.trim()}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-xs transition-all duration-200 ${
                    isSubmitting || !ticketSubject.trim() || !ticketMessage.trim()
                      ? "bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 hover:scale-101 shadow-md shadow-violet-500/25 cursor-pointer"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Submit Ticket</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpSupport;
