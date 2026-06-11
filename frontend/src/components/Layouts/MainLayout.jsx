import React from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <div className="hidden md:flex h-screen w-full bg-white dark:bg-[#0b1120] text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300">
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto w-full relative">
          <ErrorBoundary variant="section" key={location.pathname}>
            {children}
          </ErrorBoundary>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-screen w-full bg-white dark:bg-[#0b1120] text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300">
        <Sidebar />
        <main className="flex-1 overflow-y-auto w-full relative">
          <ErrorBoundary variant="section" key={location.pathname}>
            {children}
          </ErrorBoundary>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
