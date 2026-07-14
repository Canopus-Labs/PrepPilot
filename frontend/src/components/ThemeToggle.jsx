import React from "react";
import { LuSun, LuMoon } from "react-icons/lu";
import { useTheme } from "../context/themeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center justify-center w-9 h-9 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200"
    >
      {isDark ? <LuSun className="text-lg" /> : <LuMoon className="text-lg" />}
    </button>
  );
};

export default ThemeToggle;