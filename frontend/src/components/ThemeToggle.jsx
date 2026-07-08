import React, { useContext } from"react";
import { ThemeContext } from"../context/themeContext";
import { Sun, Moon } from"lucide-react";
import { motion } from"framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center p-2 rounded-full text-text-muted hover:text-violet-600  dark:hover:text-violet-400 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
      aria-label={`Switch to ${theme ==="light" ?"dark" :"light"} mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            scale: theme ==="light" ? 1 : 0,
            opacity: theme ==="light" ? 1 : 0,
            rotate: theme ==="light" ? 0 : 90,
          }}
          transition={{ duration: 0.3, ease:"easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={20} strokeWidth={2.5} />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            scale: theme ==="dark" ? 1 : 0,
            opacity: theme ==="dark" ? 1 : 0,
            rotate: theme ==="dark" ? 0 : -90,
          }}
          transition={{ duration: 0.3, ease:"easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={20} strokeWidth={2.5} />
        </motion.div>
      </div>
    </button>
  );
};

export default ThemeToggle;
