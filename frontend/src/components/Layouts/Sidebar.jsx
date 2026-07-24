import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Modal from "../Loader/Modal";
import Login from "../../pages/Auth/Login";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import {
  LayoutDashboard, Bot, BrainCircuit, Briefcase, BriefcaseBusiness,
  Code2, Target, Settings, HelpCircle, User as UserIcon, LogOut,
  Menu, X, FileText, Zap, MessageSquare, Lightbulb, ChevronUp,
  ChevronDown, Github, BookOpen, BookMarked, CalendarDays, ScrollText,
  Grid3x3, GraduationCap, Calculator,
} from "lucide-react";

/* ── NAV DEFINITION ──────────────────────────────────────────────────────── */
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
    icon: Calculator,
    isHeader: true,
    items: [
      { id: "aptitude-builder", title: "Cognitive Builder", path: "/aptitude", icon: Calculator },
    ],
  },
  {
    id: "cognitive-skills",
    title: "Cognitive Skills",
    icon: Grid3x3,
    isHeader: true,
    items: [
      { id: "cognitive-games", title: "Cognitive Games", path: "/cognitive-games", icon: Grid3x3 },
    ],
  },
  {
    id: "dsa",
    title: "DSA",
    icon: Code2,
    isHeader: true,
    items: [
      { id: "coding-sheets", title: "DSA Master Sheets", path: "/coding-sheets", icon: Code2 },
    ],
  },
  {
    id: "interview",
    title: "Interview",
    icon: Briefcase,
    isHeader: true,
    items: [
      { id: "role-prep",              title: "Role-Specific Prep",    path: "/role-prep",              icon: Briefcase },
      { id: "assessment",             title: "Skill Assessment",       path: "/assessment",             icon: Target },
      { id: "interview-experiences",  title: "Interview Experiences",  path: "/interview-experiences",  icon: MessageSquare },
    ],
  },
  {
    id: "jobs",
    title: "Jobs",
    icon: BriefcaseBusiness,
    isHeader: true,
    items: [
      { id: "jobs-for-you", title: "Jobs for You", path: "/jobs", icon: BriefcaseBusiness },
    ],
  },
  {
    id: "project",
    title: "Project",
    icon: Lightbulb,
    isHeader: true,
    items: [
      { id: "project-ideas", title: "Project Ideas", path: "/project-ideas", icon: Lightbulb },
    ],
  },
  {
    id: "resume",
    title: "Resume",
    icon: FileText,
    isHeader: true,
    items: [
      { id: "resume-builder",  title: "Resume Builder",  path: "/resume-builder",  icon: FileText },
      { id: "resume-analyzer", title: "Resume Analyzer", path: "/resume-analyzer", icon: Zap },
    ],
  },
  {
    id: "ai-tools",
    title: "AI Tools",
    icon: Bot,
    isHeader: true,
    items: [
      { id: "ai-assistance", title: "AI Assistance", path: "/ai-assistance", icon: Bot },
    ],
  },
  {
    id: "open-source",
    title: "Open Source",
    icon: Github,
    isHeader: true,
    items: [
      { id: "repository-hive", title: "Repository Hive",      path: "/repository-hive", icon: Github },
      { id: "oss-blog",        title: "OSS Learning Hub",     path: "/oss-blog",         icon: BookOpen },
      { id: "oss-events",      title: "Conferences & Events", path: "/oss-events",       icon: CalendarDays },
    ],
  },
  {
    id: "notes-books",
    title: "Notes & Books",
    icon: BookMarked,
    isHeader: true,
    items: [
      { id: "notes-books-home", title: "Notes & Books", path: "/notes-books", icon: BookMarked },
    ],
  },
  {
    id: "free-courses",
    title: "Free Courses",
    icon: GraduationCap,
    isHeader: true,
    items: [
      { id: "free-courses-home", title: "Free Courses", path: "/free-courses", icon: GraduationCap },
    ],
  },
];

/* ── Component ───────────────────────────────────────────────────────────── */
const Sidebar = () => {
  const { user, clearUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = async () => {
    try { await axiosInstance.post(API_PATHS.AUTH.LOGOUT); } catch {}
    finally {
      localStorage.clear(); sessionStorage.clear();
      clearUser(); navigate("/");
    }
  };

  const handleServiceClick = (item) => {
    if ((item.title === "Cognitive Builder" || item.title === "Cognitive Games") && !user) {
      setShowLoginModal(true);
    } else {
      navigate(item.path);
    }
    setMobileMenuOpen(false);
  };

  const toggleSection = (id) =>
    setExpandedSections((prev) => ({ [id]: !prev[id] }));

  /* ── Nav renderer ── */
  const renderNavItems = () =>
    NAV_ITEMS.map((item) => {
      /* ── Flat top-level link (Dashboard) ── */
      if (!item.isHeader) {
        const isActive = location.pathname === item.path ||
          location.pathname.startsWith(item.path + "/");
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => handleServiceClick(item)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
              isActive
                ? "bg-white/10 text-white shadow-sm"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={18} className={isActive ? "text-violet-400" : "text-gray-500"} />
            {item.title}
          </button>
        );
      }

      /* ── Collapsible section ── */
      const isOpen = !!expandedSections[item.id];
      const SectionIcon = item.icon;
      // Section is "active" if any child is active
      const anyChildActive = item.items.some(
        (c) => location.pathname === c.path || location.pathname.startsWith(c.path + "/")
      );

      return (
        <div key={item.id}>
          {/* Section header row */}
          <button
            onClick={() => toggleSection(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
              anyChildActive && !isOpen
                ? "text-white"
                : isOpen
                ? "text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <SectionIcon
              size={18}
              className={anyChildActive || isOpen ? "text-violet-400" : "text-gray-500"}
            />
            <span className="flex-1 text-left">{item.title}</span>
            {isOpen
              ? <ChevronUp size={14} className="text-gray-500 shrink-0" />
              : <ChevronDown size={14} className="text-gray-500 shrink-0" />
            }
          </button>

          {/* Children with left-border indent line */}
          {isOpen && (
            <div className="ml-[22px] mt-0.5 mb-1 pl-3 border-l border-white/10 space-y-5">
              {item.items.map((navItem) => {
                const isActive = location.pathname === navItem.path ||
                  location.pathname.startsWith(navItem.path + "/");
                return (
                  <button
                    key={navItem.id}
                    onClick={() => handleServiceClick(navItem)}
                    className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm transition-all duration-150 ${
                      isActive
                        ? "bg-white/10 text-white font-semibold shadow-sm"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200 font-medium"
                    }`}
                  >
                    {navItem.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    });

  /* ── Shared sidebar shell ── */
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#111827] text-gray-300 w-64 border-r border-white/5 shadow-2xl">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/5 shrink-0">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
          <img src="/PrepPilot-Logo.png" alt="PrepPilot Logo" className="w-7 h-7 object-contain" />
          <h2 className="text-[21px] font-extrabold text-white tracking-tight">
            PrepPilot <span className="text-violet-500">AI</span>
          </h2>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1.5 custom-scrollbar">
        {renderNavItems()}
      </div>

      {/* Bottom bar */}
      <div className="p-3 border-t border-white/5">
        {/* Settings / Policy / Help — icon row */}
        <div className="flex items-center gap-1 mb-3">
          {[
            { path: "/settings",           icon: Settings,   title: "Settings" },
            { path: "/terms-and-conditions", icon: ScrollText, title: "Policy" },
            { path: "/support",            icon: HelpCircle, title: "Help & Support" },
          ].map(({ path, icon: Icon, title }) => {
            const active = location.pathname.startsWith(path);
            return (
              <button key={path} onClick={() => { navigate(path); setMobileMenuOpen(false); }}
                title={title}
                className={`flex-1 flex items-center justify-center p-2 rounded-xl transition-all ${
                  active ? "bg-violet-600/15 text-violet-400" : "text-gray-500 hover:bg-white/5 hover:text-white"
                }`}>
                <Icon size={17} />
              </button>
            );
          })}
        </div>

        {/* User row */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5 min-w-0">
            {user ? (
              user.profileImageUrl ? (
                <img src={user.profileImageUrl} alt="Profile"
                  className="w-8 h-8 rounded-full border border-white/10 object-cover shrink-0" />
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-violet-600 to-fuchsia-600 shrink-0 text-sm">
                  {userInitial}
                </div>
              )
            ) : (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 bg-white/5 border border-white/10 shrink-0">
                <UserIcon size={15} />
              </div>
            )}
            <span className="text-sm font-semibold text-white truncate max-w-[110px]">
              {user ? user.name || user.email : "Guest"}
            </span>
          </div>

          {user && (
            <button onClick={handleLogout}
              className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors shrink-0"
              title="Logout">
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  /* ── Desktop ── */
  return (
    <>
      <div className="hidden md:block h-full shrink-0 z-20">
        <SidebarContent />
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#111827] border-b border-white/5 flex items-center justify-between px-4 z-40">
        <Link to="/" className="flex items-center gap-2">
          <h2 className="text-[20px] font-extrabold text-white tracking-tight">
            PrepPilot <span className="text-violet-500">AI</span>
          </h2>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-300 hover:text-white focus:outline-none">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-64 h-full">
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="md:hidden h-16 w-full shrink-0" />

      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} hideHeader>
        <Login setCurrentPage={() => {}} />
      </Modal>
    </>
  );
};

export default Sidebar;
