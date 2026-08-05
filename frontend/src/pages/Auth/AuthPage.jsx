import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

/**
 * Unified auth page that toggles between Login and SignUp.
 * Rendered at /login — handles the setCurrentPage prop that both
 * Login and SignUp expect.
 */
const AuthPage = () => {
  const [page, setPage] = useState("login");
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  // Already logged in → go to dashboard
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B0F19] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a2e] via-[#0B0F19] to-[#05080f]">
      <div className="w-full max-w-[440px] rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/5 bg-[#111827]">
        {page === "login" ? (
          <Login
            setCurrentPage={setPage}
            onLoginSuccess={() => navigate("/dashboard")}
          />
        ) : (
          <SignUp setCurrentPage={setPage} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
