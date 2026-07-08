import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Button/Button";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosinstance";
import { LuArrowRight } from "react-icons/lu";

const Login = ({ setCurrentPage, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, accessToken } = response.data;
      const authToken = token || accessToken;

      if (authToken) {
        if (rememberMe) {
          localStorage.setItem("token", authToken);
        } else {
          sessionStorage.setItem("token", authToken);
        }
        updateUser(response.data);
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
            <img
              src="/PrepPilot-Logo.png"
              alt="PrepPilot Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="font-semibold text-gray-200">PrepPilot</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-400">
            Sign in to continue your interview preparation journey
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="w-full">
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="your@email.com"
              type="text"
              autoFocus
            />
          </div>

          <div className="w-full">
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 characters"
              type="password"
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="cursor-pointer w-4 h-4 rounded border-gray-600 bg-white"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition-colors"
              >
                Remember Me
              </label>
            </div>

            <button
              type="button"
              onClick={() => {
                setCurrentPage("forgot-password"); // or "forgotPassword" depending on your page name
                setError(null);
              }}
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <div
              id="login-error"
              role="alert"
              aria-live="polite"
              className="p-3 mt-4 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            loadingText="Signing in..."
            icon={
              <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
            }
            className="mt-6 w-full flex justify-center py-2.5 text-sm font-semibold shadow-lg shadow-violet-500/20 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white rounded-lg transition-all"
          >
            Sign In
          </Button>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400 text-center">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer ml-1"
                onClick={() => {
                  setCurrentPage("signup");
                  setError(null);
                }}
              >
                Create account
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
