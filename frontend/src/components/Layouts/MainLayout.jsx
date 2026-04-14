import React from "react";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-white dark:bg-[#0b1120] text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto w-full relative">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
