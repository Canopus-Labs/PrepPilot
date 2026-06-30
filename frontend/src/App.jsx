import Compiler from "./components/Compiler";
import SkillAssessment from "./components/SkillAssessment";
import DsaSheet from "./components/SheetDetailsPage";
import SheetList from "./components/SheetList";
import UserProvider from "./context/userContext";
import ThemeProvider from "./context/themeContext";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/animations/PageTransition";
import ErrorBoundary from "./components/ErrorBoundary";
import CompanyPrep from "./pages/CompanyPrep/CompanyPrep";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import VerifyEmail from "./pages/Auth/verifyEmail";
import LandingPage from "./LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import ProgressTrackerDashboard from "./pages/Home/ProgressTrackerDashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import AIHelper from "./components/AIHepler";
import PracticePage from "./pages/InterviewPrep/components/PracticePage";
import { useContext } from "react";
import { UserContext } from "./context/userContext";
import MainLayout from "./components/Layouts/MainLayout";
import { Navigate, Outlet } from "react-router-dom";
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
import HelpSupport from "./pages/Support/HelpSupport";
import Settings from "./pages/Settings/Settings";
import NotFound from "./pages/NotFound";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) return null;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const BuggyComponent = () => {
  throw new Error("This is a simulated crash to test the Error Boundary component!");
};

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-dark)] transition-colors duration-300">
          <Router>
            <AnimatePresence mode="wait">
              <Routes>
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
                        <div className="min-h-screen w-full flex items-center justify-center bg-[#0B0F19] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a2e] via-[#0B0F19] to-[#05080f]">
                          <div className="w-full max-w-[420px] rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/5 bg-[#111827]">
                            <Login />
                          </div>
                        </div>
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
                    path="/role-prep"
                    element={
                      <PageTransition>
                        <Dashboard />
                      </PageTransition>
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
  path="/company-prep"
  element={
    <PageTransition>
      <CompanyPrep />
    </PageTransition>
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
                 path="*"
                 element={
                    <PageTransition>
                      <NotFound />
                      </PageTransition>
                    }
                 />
              </Routes>
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
