import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-dark)] flex items-center justify-center px-6 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <h1 className="text-7xl font-bold mb-4">404</h1>

        <h2 className="text-2xl font-semibold mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg bg-[var(--color-primary)] hover:opacity-90 text-white transition-all duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;