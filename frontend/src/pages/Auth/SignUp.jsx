import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Button/Button";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { LuArrowRight } from "react-icons/lu";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Computed inside the component so they react to `password` state
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password),
  };

  const strengthScore = Object.values(passwordChecks).filter(Boolean).length;
  const passwordStrength =
    strengthScore <= 2 ? "Weak" : strengthScore <= 4 ? "Medium" : "Strong";
  // Checks if the string has at least one number (0-9)
  function containsNumber(str) {
    return /\d/.test(str);
  }
  // Checks if the string has at least one alphanumeric character (letter or number)
  function containsAlphanumeric(str) {
    return /[a-zA-Z0-9]/.test(str);
  }
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) { setError("Please enter your full name"); return; }
    if(containsNumber(fullName) || !containsAlphanumeric(fullName)) { setError("Full name should not contain numbers or special characters"); return; }
    if (!validateEmail(email) || !email.endsWith(".com") || !email.includes("@")) { setError("Please enter a valid email address"); return; }
    if (!password || password.length < 8) { setError("Password must be at least 8 characters long."); return; }
    if (!/[A-Z]/.test(password)) { setError("Password must contain at least one uppercase letter."); return; }
    if (!/[a-z]/.test(password)) { setError("Password must contain at least one lowercase letter."); return; }
    if (!/[0-9]/.test(password)) { setError("Password must contain at least one number."); return; }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password)) { setError("Password must contain at least one special character (e.g. !@#$%^&*)."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }

    setError("");
    setLoading(true);

    try {
      // Note: profile image upload requires auth, so we only send the
      // profileImageUrl if the user picked a file — the backend stores the
      // URL reference; the actual upload happens after email verification + login.
      // For now we skip the upload here to avoid a 401 on the protected endpoint.

      const payload = {
        name: fullName,
        email,
        password,
      };

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, payload);

      if (response.data.success) {
        const authToken = response.data.token || response.data.accessToken;
        sessionStorage.setItem("token", authToken);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
        setError("Request timed out. Please check your connection and try again.");
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
          <img src="/PrepPilot-Logo.png" alt="PrepPilot Logo" className="w-8 h-8 object-contain" />
          <span className="font-semibold text-gray-300">PrepPilot</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent mb-2">
          Create Account
        </h2>
        <p className="text-sm text-gray-400">Join thousands preparing smarter for their dream jobs</p>
      </div>

      {/* Registration form */}
      <form onSubmit={handleSignup} className="space-y-4">
          <div className="mb-6">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
            autoFocus
          />

          <Input
             value={email}
             onChange={({ target }) => {
             const value = target.value;
                   setEmail(value);

             if (
                 error === "Please enter a valid email address" &&
                 validateEmail(value)
                ) {
              setError("");
             }
             }}
               label="Email Address"
               placeholder="your@email.com"
               type="email"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {/* Password strength indicator */}
          {password && (
            <div className="mt-2 space-y-3">
              {/* Segmented bars */}
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((seg) => (
                  <div
                    key={seg}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      seg <= strengthScore
                        ? strengthScore <= 2
                          ? "bg-red-500"
                          : strengthScore <= 4
                          ? "bg-yellow-400"
                          : "bg-emerald-400"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>

              <p className={`text-xs font-medium ${
                strengthScore <= 2 ? "text-red-400" : strengthScore <= 4 ? "text-yellow-400" : "text-emerald-400"
              }`}>
                {passwordStrength} password
              </p>

              {/* Requirement chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "length", label: "8+ chars" },
                  { key: "uppercase", label: "Uppercase" },
                  { key: "lowercase", label: "Lowercase" },
                  { key: "number", label: "Number" },
                  { key: "special", label: "Special" },
                ].map(({ key, label }) => (
                  <span
                    key={key}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      passwordChecks[key]
                        ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
                        : "bg-white/5 text-gray-500 ring-1 ring-white/10"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${passwordChecks[key] ? "bg-emerald-400" : "bg-gray-600"}`} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Input
            value={confirmPassword}
            onChange={({ target }) => {
              const value = target.value;
              setConfirmPassword(value);
              if (error === "Passwords do not match." && password === value) {
                setError("");
              }
            }}
            label="Confirm Password"
            placeholder="Re-enter your password"
            type="password"
          />

          {error && (
            <div id="signup-error" role="alert" aria-live="polite" className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            loadingText="Creating account..."
            icon={<LuArrowRight className="group-hover:translate-x-1 transition-transform" />}
            className="mt-6"
          >
            Create Account
          </Button>

          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <button
                type="button"
                className="font-semibold text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => { setCurrentPage("login"); setError(null); }}
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