import React, { useContext, useState } from "react";
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
  Github,
  BookOpen,
  BookMarked,
  CalendarDays,
} from "lucide-react";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

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
      <div className="p-4 border-t border-white/5 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200">
          <Settings size={18} />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200">
          <HelpCircle size={18} />
          Help & Support
        </button>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3 px-2">
            {user ? (
              user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-violet-600 to-fuchsia-600">
                  {userInitial}
                </div>
              )
            ) : (
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-400 bg-white/5 border border-white/10">
                <UserIcon size={16} />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white max-w-[100px] truncate">
                {user ? user.name || user.email : "Guest"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            {user && (
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
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
