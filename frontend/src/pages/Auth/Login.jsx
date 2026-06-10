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

      const { token } = response.data;

      if (token) {
        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
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
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <img
            src="/PrepPilot-Logo.png"
            alt="PrepPilot Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="font-semibold text-gray-300">PrepPilot</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-400">
          Sign in to continue your interview preparation journey
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="your@email.com"
          type="text"
          autoFocus
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {/* Remember Me */}
        <div className="flex items-center gap-2 mt-2">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="cursor-pointer"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-400 cursor-pointer">
            Remember Me
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div
            id="login-error"
            role="alert"
            aria-live="polite"
            className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
          >
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          loading={loading}
          loadingText="Signing in..."
          icon={<LuArrowRight className="group-hover:translate-x-1 transition-transform" />}
          className="mt-6"
        >
          Sign In
        </Button>

        {/* Signup Link */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-sm text-gray-400 text-center">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-semibold text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text hover:opacity-80 transition-opacity cursor-pointer"
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
  );
};

export default Login;
