import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import ThemeToggle from "../ThemeToggle";
import Modal from "../Loader/Modal";
import Login from "../../pages/Auth/Login";
import {
  LayoutDashboard,
  Bot,
  BrainCircuit,
  Briefcase,
  Code2,
  Target,
  Settings,
  HelpCircle,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  FileText,
  Zap,
  MessageSquare,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Github,
  BookOpen,
  BookMarked,
  CalendarDays,
  Clock,
  LogIn,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../context/themeContext";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".settings-menu-container")) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  const NAV_ITEMS = [
    {
      id: "dashboard",
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "aptitude",
      title: "Aptitude",
      isHeader: true,
      items: [
        {
          id: "aptitude-builder",
          title: "Cognitive Builder",
          path: "/aptitude",
          icon: BrainCircuit,
        },
      ],
    },
    {
      id: "dsa",
      title: "DSA",
      isHeader: true,
      items: [
        {
          id: "coding-sheets",
          title: "DSA Master Sheets",
          path: "/coding-sheets",
          icon: Code2,
        },
      ],
    },
    {
      id: "interview",
      title: "Interview",
      isHeader: true,
      items: [
        {
          id: "role-prep",
          title: "Role-Specific Prep",
          path: "/role-prep",
          icon: Briefcase,
        },
        {
          id: "assessment",
          title: "Skill Assessment",
          path: "/assessment",
          icon: Target,
        },
        {
          id: "interview-experiences",
          title: "Interview Experiences",
          path: "/interview-experiences",
          icon: MessageSquare,
        },
      ],
    },
    {
      id: "project",
      title: "Project",
      isHeader: true,
      items: [
        {
          id: "project-ideas",
          title: "Project Ideas",
          path: "/project-ideas",
          icon: Lightbulb,
        },
      ],
    },
    {
      id: "resume",
      title: "Resume Section",
      isHeader: true,
      items: [
        {
          id: "resume-builder",
          title: "Resume Builder",
          path: "/resume-builder",
          icon: FileText,
        },
        {
          id: "resume-analyzer",
          title: "Resume Analyzer",
          path: "/resume-analyzer",
          icon: Zap,
        },
      ],
    },
    {
      id: "ai-tools",
      title: "AI Tools",
      isHeader: true,
      items: [
        {
          id: "ai-assistance",
          title: "AI Assistance",
          path: "/ai-assistance",
          icon: Bot,
        },
      ],
    },
    {
      id: "open-source",
      title: "Open Source",
      isHeader: true,
      items: [
        {
          id: "repository-hive",
          title: "Repository Hive",
          path: "/repository-hive",
          icon: Github,
        },
        {
          id: "oss-blog",
          title: "OSS Learning Hub",
          path: "/oss-blog",
          icon: BookOpen,
        },
        {
          id: "oss-events",
          title: "Conferences & Events",
          path: "/oss-events",
          icon: CalendarDays,
        },
      ],
    },
    {
      id: "notes-books",
      title: "Notes & Books",
      isHeader: true,
      items: [
        {
          id: "notes-books-home",
          title: "Notes & Books",
          path: "/notes-books",
          icon: BookMarked,
        },
      ],
    },
  ];

  const handleServiceClick = (item) => {
    if (item.title === "Cognitive Builder" && !user) {
      setShowLoginModal(true);
    } else {
      navigate(item.path);
    }
    setMobileMenuOpen(false);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const renderNavItems = () => {
    return NAV_ITEMS.map((item) => {
      // Handle header items with collapsible content
      if (item.isHeader) {
        return (
          <div key={item.id}>
            <button
              onClick={() => toggleSection(item.id)}
              className="w-full flex items-center justify-between pt-4 pb-2 px-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider hover:text-gray-400 transition-colors group"
            >
              <span>{item.title}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  expandedSections[item.id] ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSections[item.id] && (
              <div className="space-y-1">
                {item.items.map((navItem) => {
                  const isActive = location.pathname.startsWith(navItem.path);
                  const Icon = navItem.icon;

                  return (
                    <button
                      key={navItem.id}
                      onClick={() => handleServiceClick(navItem)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? "bg-violet-600/10 text-violet-400"
                          : "hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`${isActive ? "text-violet-400" : "text-gray-400 group-hover:text-gray-200"}`}
                      />
                      {navItem.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      }

      // Handle non-header items (like Dashboard)
      const isActive = location.pathname.startsWith(item.path);
      const Icon = item.icon;

      return (
        <button
          key={item.id}
          onClick={() => handleServiceClick(item)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
            isActive
              ? "bg-violet-600/10 text-violet-400"
              : "hover:bg-white/5 hover:text-white"
          }`}
        >
          <Icon
            size={18}
            className={`${isActive ? "text-violet-400" : "text-gray-400 group-hover:text-gray-200"}`}
          />
          {item.title}
        </button>
      );
    });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#111827] text-gray-300 w-64 border-r border-white/5 shadow-2xl transition-colors duration-300">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/5 shrink-0">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <img
            src="/PrepPilot-Logo.png"
            alt="PrepPilot Logo"
            className="w-7 h-7 object-contain"
          />
          <h2 className="text-[22px] font-extrabold text-white tracking-tight">
            PrepPilot{" "}
            <span className="text-violet-500 drop-shadow-[0_0_8px_rgba(167,139,250,0.3)]">
              AI
            </span>
          </h2>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
        {renderNavItems()}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/5 relative settings-menu-container" ref={settingsRef}>
        {isSettingsOpen && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#1e293b] border border-white/10 rounded-xl p-2 shadow-2xl z-50 flex flex-col gap-1">
            <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200">
              <div className="flex items-center gap-3">
                <Clock size={18} />
                <span>Activity</span>
              </div>
            </button>
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                <span>Theme</span>
              </div>
              <ChevronRight size={16} className="text-gray-500" />
            </button>
            <button
              onClick={() => {
                setIsSettingsOpen(false);
                navigate("/feedback");
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <MessageSquare size={18} />
                <span>Send feedback</span>
              </div>
            </button>
            <button
              onClick={() => {
                setIsSettingsOpen(false);
                navigate("/support");
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <HelpCircle size={18} />
                <span>Help & Support</span>
              </div>
              <ChevronRight size={16} className="text-gray-500" />
            </button>
            
            <div className="h-px bg-white/5 my-1 mx-2" />

            {user ? (
              <button
                onClick={() => {
                  setIsSettingsOpen(false);
                  localStorage.clear();
                  window.location.reload();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200 text-left"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsSettingsOpen(false);
                  setShowLoginModal(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-violet-400 hover:bg-violet-500/10 transition-all duration-200 text-left"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </button>
            )}

            <div className="h-px bg-white/5 my-1 mx-2" />

            <div className="px-3 py-2 flex flex-col gap-0.5 text-left select-none">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <span className="text-[10px] text-gray-500 pl-3.5">
                From your IP address • <span className="hover:underline cursor-pointer text-violet-400/80">Update location</span>
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 min-w-0">
            {user ? (
              user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-violet-600 to-fuchsia-600 shrink-0 shadow-md">
                  {userInitial}
                </div>
              )
            ) : (
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-gray-400 bg-white/5 border border-white/10 shrink-0">
                <UserIcon size={18} />
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-white truncate max-w-[110px]" title={user ? user.name || "User" : "Guest"}>
                {user ? user.name || "User" : "Guest"}
              </span>
              {user?.email && (
                <span className="text-[10px] text-gray-400 truncate max-w-[110px]" title={user.email}>
                  {user.email}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`relative p-2 rounded-xl transition-all duration-200 shrink-0 ${
              isSettingsOpen
                ? "bg-white/10 text-white scale-105"
                : "text-gray-400 hover:bg-white/5 hover:text-white hover:scale-105"
            }`}
            aria-label="Toggle Settings Menu"
          >
            <Settings size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 border border-[#111827]" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full shrink-0 z-20">
        <SidebarContent />
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#111827] border-b border-white/5 flex items-center justify-between px-4 z-40">
        <Link to="/" className="flex items-center gap-2">
          <h2 className="text-[20px] font-extrabold text-white tracking-tight">
            PrepPilot <span className="text-violet-500">AI</span>
          </h2>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-300 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-64 h-full transform transition-transform duration-300">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Spacer for mobile top bar so content doesn't tuck under */}
      <div className="md:hidden h-16 w-full shrink-0"></div>

      {/* Login Modal */}
      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Login"
      >
        <Login setCurrentPage={() => {}} />
      </Modal>
    </>
  );
};

export default Sidebar;
