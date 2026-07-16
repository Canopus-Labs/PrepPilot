import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Button/Button";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";

const ForgotPassword = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, { email });

      setSuccess(true);
      setError(null);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to send reset link. Please try again.");
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
            Reset Password
          </h2>
          <p className="text-sm text-gray-400">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="w-full">
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="your@email.com"
                type="email"
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              loadingText="Sending reset link..."
              icon={
                <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
              }
              className="mt-6 w-full flex justify-center py-2.5 text-sm font-semibold shadow-lg shadow-violet-500/20 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white rounded-lg transition-all"
            >
              Send Reset Link
            </Button>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setCurrentPage("login");
                  setError(null);
                }}
                className="flex items-center justify-center gap-2 mx-auto text-sm text-gray-400 hover:text-gray-300 transition-colors"
              >
                <LuArrowLeft className="w-4 h-4" />
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          /* Success State */
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">
              Check Your Email
            </h3>
            <p className="text-gray-400 mb-8">
              We've sent a password reset link to <br />
              <span className="font-medium text-white">{email}</span>
            </p>

            <Button
              type="button"
              onClick={() => {
                setCurrentPage("login");
                setSuccess(false);
                setEmail("");
              }}
              className="w-full py-2.5 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
            >
              Back to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
