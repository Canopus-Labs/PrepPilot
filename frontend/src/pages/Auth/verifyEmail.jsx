import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const hasVerified = useRef(false); // prevents double call in React StrictMode

    const [status, setStatus] = useState("verifying");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (hasVerified.current) return; // skip second call
        hasVerified.current = true;

        const token = searchParams.get("token");

        if (!token) {
            setStatus("error");
            setMessage("Verification token is missing. Please use the link from your email.");
            return;
        }

        const verify = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.VERIFY_EMAIL, {
                    params: { token },
                });
                if (response.data.success) {
                    setStatus("success");
                    setMessage(response.data.message);
                    setTimeout(() => navigate("/"), 3000);
                }
            } catch (error) {
                setStatus("error");
                setMessage(
                    error.response?.data?.message ||
                    "Something went wrong. Please try again."
                );
            }
        };

        verify();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f] px-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <img
                        src="/PrepPilot-Logo.png"
                        alt="PrepPilot Logo"
                        className="w-8 h-8 object-contain"
                    />
                    <span className="font-semibold text-gray-300">PrepPilot</span>
                </div>

                {/* Verifying state */}
                {status === "verifying" && (
                    <>
                        <div className="w-12 h-12 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">Verifying your email</h2>
                        <p className="text-gray-400 text-sm">Please wait a moment...</p>
                    </>
                )}

                {/* Success state */}
                {status === "success" && (
                    <>
                        <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Email verified!</h2>
                        <p className="text-gray-400 text-sm mb-4">{message}</p>
                        <p className="text-gray-500 text-xs">Redirecting you to Home Page in 3 seconds...</p>
                    </>
                )}

                {/* Error state */}
                {status === "error" && (
                    <>
                        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Verification failed</h2>
                        <p className="text-gray-400 text-sm mb-6">{message}</p>
                        <button
                            onClick={() => navigate("/")}
                            className="text-sm text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
                        >
                            Back to Home Page
                        </button>
                    </>
                )}

            </div>
        </div>
    );
};

export default VerifyEmail;