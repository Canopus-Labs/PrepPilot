import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail, validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadimage";
import { LuArrowRight, LuCheck, LuX } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

const RequirementItem = ({ label, met }) => (
  <div className="flex items-center gap-1.5 py-0.5">
    <div className={`shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors duration-200 ${
      met ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/5 text-gray-500'
    }`}>
      {met ? <LuCheck size={10} strokeWidth={3} /> : <LuX size={10} strokeWidth={3} />}
    </div>
    <span className={`text-[10px] font-bold tracking-tight transition-colors duration-200 ${met ? 'text-emerald-400/90' : 'text-gray-500'}`}>
      {label}
    </span>
  </div>
);

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const passwordValidation = validatePassword(password);

  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    const { isValid } = validatePassword(password);
    if (!isValid) {
      setError("Please ensure your password meets all requirements");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl: profileImageUrl || "",
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
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
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <img
            src="/PrepPilot-Logo.png"
            alt="PrepPilot Logo"
            className="w-7 h-7 object-contain"
          />
          <span className="font-bold text-gray-400 text-sm tracking-tight">PrepPilot</span>
        </div>
        <h2 className="text-2xl font-black bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent mb-1">
          Create Account
        </h2>
        <p className="text-[13px] text-gray-500 font-medium">
          Join thousands preparing smarter for their dream jobs
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSignup} className="space-y-4">
        {/* Profile Photo */}
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        {/* Full Name Input */}
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="John Doe"
          type="text"
        />

        {/* Email Input */}
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="your@email.com"
          type="text"
        />

        {/* Password Input */}
        <div className="space-y-2">
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Create a strong password"
            type="password"
          />

          <AnimatePresence>
            {password.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-3 p-3 bg-white/[0.03] dark:bg-white/[0.02] rounded-xl border border-white/10 backdrop-blur-sm">
                  {/* Strength Meter */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-black">
                      <span className="text-gray-500">Security Strength</span>
                      <span className={`
                        ${passwordValidation.strength === 'weak' ? 'text-red-400' : ''}
                        ${passwordValidation.strength === 'fair' ? 'text-amber-400' : ''}
                        ${passwordValidation.strength === 'strong' ? 'text-emerald-400' : ''}
                      `}>
                        {passwordValidation.strength}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((step) => (
                        <div
                          key={step}
                          className={`h-full flex-1 transition-all duration-500 ${
                            step <= passwordValidation.score
                              ? passwordValidation.strength === 'weak' ? 'bg-red-500' :
                                passwordValidation.strength === 'fair' ? 'bg-amber-500' : 'bg-emerald-500'
                              : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Requirements Checklist */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <RequirementItem 
                      label="8+ Characters" 
                      met={passwordValidation.requirements.minLength} 
                    />
                    <RequirementItem 
                      label="Uppercase Letter" 
                      met={passwordValidation.requirements.hasUpper} 
                    />
                    <RequirementItem 
                      label="One Number" 
                      met={passwordValidation.requirements.hasNumber} 
                    />
                    <RequirementItem 
                      label="Special Symbol" 
                      met={passwordValidation.requirements.hasSpecial} 
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 group"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <LuArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Login Link */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <button
              type="button"
              className="font-semibold text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text hover:opacity-80 transition-opacity cursor-pointer"
              onClick={() => {
                setCurrentPage("login");
                setError(null);
              }}
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
