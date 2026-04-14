import Compiler from "./components/Compiler";
import SkillAssessment from "./components/SkillAssessment";
import DsaSheet from "./components/SheetDetailsPage";
import SheetList from "./components/SheetList";
// ...existing code...
import UserProvider from "./context/userContext";
import ThemeProvider from "./context/themeContext";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/animations/PageTransition";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
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
import ProjectIdeas from "./pages/ProjectIdeas/ProjectIdeas";
import RepositoryHive from "./pages/OpenSource/RepositoryHive";
import OSSBlog from "./pages/OpenSource/OSSBlog";
import OpenSourceEvents from "./pages/OpenSource/OpenSourceEvents";
import NotesBooks from "./pages/NotesBooks/NotesBooks";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) return null;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-dark)] transition-colors duration-300">
          <Router>
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <LandingPage />
                    </PageTransition>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PageTransition>
                      <Login />
                    </PageTransition>
                  }
                />
                {/* Routes without Sidebar */}
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <LandingPage />
                    </PageTransition>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PageTransition>
                      <Login />
                    </PageTransition>
                  }
                />
                <Route
                  path="/interview-prep/:sessionId"
                  element={
                    <PageTransition>
                      <InterviewPrep />
                    </PageTransition>
                  }
                />
                <Route
                  path="/resume-builder/:id"
                  element={
                    <ProtectedRoute>
                      <PageTransition>
                        <ResumeEditor />
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />

                {/* Routes with Sidebar (MainLayout) */}
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
                </Route>
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
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
