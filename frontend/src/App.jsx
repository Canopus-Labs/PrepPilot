const Compiler = lazy(() => import("./components/Compiler"));
const SkillAssessment = lazy(() => import("./components/SkillAssessment"));
const DsaSheet = lazy(() => import("./components/SheetDetailsPage"));
const SheetList = lazy(() => import("./components/SheetList"));
import UserProvider from "./context/userContext";
import ThemeProvider from "./context/themeContext";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from 'framer-motion';
import PageTransition from "./components/animations/PageTransition";
import ErrorBoundary from "./components/ErrorBoundary";

const Login = lazy(() => import("./pages/Auth/Login"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const AuthPage = lazy(() => import("./pages/Auth/AuthPage"));
const VerifyEmail = lazy(() => import("./pages/Auth/verifyEmail"));
import LandingPage from "./LandingPage";
const Dashboard = lazy(() => import("./pages/Home/Dashboard"));
const ProgressTrackerDashboard = lazy(() => import("./pages/Home/ProgressTrackerDashboard"));
const InterviewPrep = lazy(() => import("./pages/InterviewPrep/InterviewPrep"));
const AIHelper = lazy(() => import("./components/AIHepler"));
const PracticePage = lazy(() => import("./pages/InterviewPrep/components/PracticePage"));
const CognitiveGamesPage = lazy(() => import("./pages/CognitiveGames/CognitiveGamesPage"));
import { useContext } from "react";
import { useUser } from "./context/userContext";
import MainLayout from "./components/Layouts/MainLayout";
import { Navigate, Outlet } from "react-router-dom";
const ResumeTemplates = lazy(() => import("./pages/ResumeBuilder/ResumeTemplates"));
const ResumeEditor = lazy(() => import("./pages/ResumeBuilder/ResumeEditor"));
const ResumeAnalyzer = lazy(() => import("./pages/ResumeBuilder/ResumeAnalyzer"));
const InterviewExperiences = lazy(() => import("./pages/InterviewExperiences/InterviewExperiences"));
const TermsandConditions = lazy(() => import("./pages/Terms/TermsandConditions"));
const ProjectIdeas = lazy(() => import("./pages/ProjectIdeas/ProjectIdeas"));
const RepositoryHive = lazy(() => import("./pages/OpenSource/RepositoryHive"));
const OSSBlog = lazy(() => import("./pages/OpenSource/OSSBlog"));
const OpenSourceEvents = lazy(() => import("./pages/OpenSource/OpenSourceEvents"));
const NotesBooks = lazy(() => import("./pages/NotesBooks/NotesBooks"));
const NotesSummarizer = lazy(() => import("./pages/NotesSummarizer/NotesSummarizer"));
const JobsForYou = lazy(() => import("./pages/Jobs/JobsForYou"));
const HelpSupport = lazy(() => import("./pages/Support/HelpSupport"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/Terms/PrivacyPolicy"));
const FreeCourses = lazy(() => import("./pages/FreeCourses/FreeCourses"));
const SpacedRepetitionPage = lazy(() => import("./pages/SpacedRepetition/SpacedRepetitionPage"));
import ResumeTemplates from "./pages/ResumeBuilder/ResumeTemplates";
import ResumeEditor from "./pages/ResumeBuilder/ResumeEditor";
import ResumeAnalyzer from "./pages/ResumeBuilder/ResumeAnalyzer";
import InterviewExperiences from "./pages/InterviewExperiences/InterviewExperiences";
import TermsandConditions from "./pages/Terms/TermsandConditions";
import ProjectIdeas from "./pages/ProjectIdeas/ProjectIdeas";
import RepositoryHive from "./pages/OpenSource/RepositoryHive";
import OSSBlog from "./pages/OpenSource/OSSBlog";
import OpenSourceEvents from "./pages/OpenSource/OpenSourceEvents";
import NotesBooks from "./pages/NotesBooks/NotesBooks";
import NotesSummarizer from "./pages/NotesSummarizer/NotesSummarizer";
import JobsForYou from "./pages/Jobs/JobsForYou";
import HelpSupport from "./pages/Support/HelpSupport";
import Settings from "./pages/Settings/Settings";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/Terms/PrivacyPolicy";
import FreeCourses from "./pages/FreeCourses/FreeCourses";
import SpacedRepetitionPage from "./pages/SpacedRepetition/SpacedRepetitionPage";
import InterviewReplay from "./pages/InterviewReplay/InterviewReplay";
import DailyCodingChallenge from "./pages/DailyCodingChallenge/DailyCodingChallenge";
import Analytics from "./pages/Analytics";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const BuggyComponent = () => {
  throw new Error("This is a simulated crash to test the Error Boundary component!");
};


const SuspenseFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" />
  </div>
);

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-dark)] transition-colors duration-300">
          <Router>
            <AnimatePresence mode="wait">
              <Suspense fallback={<SuspenseFallback />}><Routes>
                {/* Routes without Sidebar */}
                <Route
                  path="/"
                  element={
                    <ErrorBoundary>
                      <PageTransition>
                        <LandingPage />
                      </PageTransition>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <ErrorBoundary>
                      <PageTransition>
                        <AuthPage />
                      </PageTransition>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <ErrorBoundary>
                      <PageTransition>
                        <AuthPage />
                      </PageTransition>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/verify-email"
                  element={
                    <ErrorBoundary>
                      <PageTransition>
                        <VerifyEmail />
                      </PageTransition>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/interview-prep/:sessionId"
                  element={
                    <ErrorBoundary>
                      <PageTransition>
                        <InterviewPrep />
                      </PageTransition>
                    </ErrorBoundary>
                  }
                />
                {import.meta.env.DEV && (
                  <Route
                    path="/test-error"
                    element={<BuggyComponent />}
                  />
                )}
                <Route
                  path="/resume-builder/:id"
                  element={
                    <ProtectedRoute>
                      <ErrorBoundary>
                        <PageTransition>
                          <ResumeEditor />
                        </PageTransition>
                      </ErrorBoundary>
                    </ProtectedRoute>
                  }
                />

                <Route
                  element={
                    <MainLayout>
                      <Outlet />
                    </MainLayout>
                  }
                >
                  <Route
                    path="/dashboard"
                    element={
                      <PageTransition>
                        <ProgressTrackerDashboard />
                      </PageTransition>
                    }
                  />
                  {import.meta.env.DEV && (
                    <Route
                      path="/layout-test-error"
                      element={<BuggyComponent />}
                    />
                  )}
                  <Route
                    path="/ai-helper"
                    element={
                      <PageTransition>
                        <AIHelper />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/practice"
                    element={
                      <ProtectedRoute>
                        <PageTransition>
                          <PracticePage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/aptitude"
                    element={
                      <ProtectedRoute>
                        <PageTransition>
                          <PracticePage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cognitive-games"
                    element={
                      <ProtectedRoute>
                        <PageTransition>
                          <CognitiveGamesPage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/role-prep"
                    element={
                      <PageTransition>
                        <Dashboard />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/interview-replay"
                    element={
                      <ProtectedRoute>
                        <PageTransition>
                          <InterviewReplay />
                    path="/analytics"
                    element={
                      <ProtectedRoute>
                        <PageTransition>
                          <Analytics />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/spaced-repetition"
                    element={
                      <ProtectedRoute>
                        <PageTransition>
                          <SpacedRepetitionPage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ai-insight"
                    element={
                      <PageTransition>
                        <AIHelper />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/ai-assistance"
                    element={
                      <PageTransition>
                        <AIHelper />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/coding-sheets"
                    element={
                      <PageTransition>
                        <SheetList type="all" />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/daily-challenge"
                    element={
                      <ProtectedRoute>
                        <PageTransition>
                          <DailyCodingChallenge />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/sheet/:id"
                    element={
                      <PageTransition>
                        <DsaSheet />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/assessment"
                    element={
                      <PageTransition>
                        <SkillAssessment />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/compiler"
                    element={
                      <PageTransition>
                        <Compiler />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/resume-builder"
                    element={
                      <ProtectedRoute>
                        <PageTransition>
                          <ResumeTemplates />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/resume-analyzer"
                    element={
                      <ProtectedRoute>
                        <PageTransition>
                          <ResumeAnalyzer />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/interview-experiences"
                    element={
                      <PageTransition>
                        <InterviewExperiences />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/project-ideas"
                    element={
                      <PageTransition>
                        <ProjectIdeas />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/repository-hive"
                    element={
                      <PageTransition>
                        <RepositoryHive />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/oss-blog"
                    element={
                      <PageTransition>
                        <OSSBlog />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/oss-events"
                    element={
                      <PageTransition>
                        <OpenSourceEvents />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/notes-books"
                    element={
                      <PageTransition>
                        <NotesBooks />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/notes-summarizer"
                    element={
                      <ProtectedRoute>
                        <PageTransition>
                          <NotesSummarizer />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/free-courses"
                    element={
                      <PageTransition>
                        <FreeCourses />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/support"
                    element={
                      <PageTransition>
                        <HelpSupport />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <PageTransition>
                          <Settings />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/jobs"
                    element={
                      <ProtectedRoute>
                        <PageTransition>
                          <JobsForYou />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/terms-and-conditions"
                    element={
                      <ErrorBoundary>
                        <PageTransition>
                          <TermsandConditions />
                        </PageTransition>
                      </ErrorBoundary>
                    }
                  />
                </Route>
                <Route
  path="/privacy-policy"
  element={
    <ErrorBoundary>
      <PageTransition>
        <PrivacyPolicy />
      </PageTransition>
    </ErrorBoundary>
  }
/>
                <Route
                 path="*"
                 element={
                    <PageTransition>
                      <NotFound />
                      </PageTransition>
                    }
                 />
              </Routes></Suspense>
            </AnimatePresence>
          </Router>
          <Toaster
            toastOptions={{
              className: "",
              style: {
                fontSize: "13px",
              },
            }}
          />
          </div>
        </ErrorBoundary>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;