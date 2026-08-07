import {
  LayoutDashboard,
  Bot,
  Briefcase,
  BriefcaseBusiness,
  Code2,
  Target,
  FileText,
  Zap,
  MessageSquare,
  Lightbulb,
  Github,
  BookOpen,
  BookMarked,
  CalendarDays,
  Grid3x3,
  GraduationCap,
  Calculator,
  RotateCcw,
  Sparkles,
  Map,
} from "lucide-react";

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
      { id: "spaced-repetition",     title: "Spaced Repetition",     path: "/spaced-repetition",      icon: RotateCcw },
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
      { id: "project-roadmap", title: "Roadmap Assistant", path: "/project-roadmap", icon: Map },
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
      { id: "notes-summarizer", title: "AI Notes Summarizer", path: "/notes-summarizer", icon: Sparkles },
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

export default NAV_ITEMS;
