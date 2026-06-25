import React, { useState, useEffect, useContext, useRef } from "react";
import useUnsavedChangesWarning from "../../hooks/useUnsavedChangesWarning";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useTheme } from "../../context/themeContext";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadimage";
import toast from "react-hot-toast";
import { getPasswordStrength } from "../../utils/passwordStrength";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  User,
  FileText,
  Sliders,
  Lock,
  Shield,
  ArrowLeft,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Share2,
  Bold,
  Italic,
  Underline,
  Code,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Quote,
  Undo2,
  Redo2,
  Maximize2,
  Eye as PreviewIcon,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
const Settings = () => {
  const navigate = useNavigate();
  const { user, clearUser, updateUser } = useContext(UserContext);
  const { theme, toggleTheme } = useTheme();
  // Sidebar Tabs State
  const [activeSection, setActiveSection] = useState("basic-info");
  // Profile Photo Upload State
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const fileInputRef = useRef(null);
  // Form Fields State - Basic Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [branch, setBranch] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [initialFormData, setInitialFormData] = useState(null);
  // Form Fields State - Profile Details
  const [profileDetailsActiveTab, setProfileDetailsActiveTab] =
    useState("about-me");
  const [aboutMeText, setAboutMeText] = useState("");
  const [educationText, setEducationText] = useState("");
  const [achievementsText, setAchievementsText] = useState("");
  const [workExperienceText, setWorkExperienceText] = useState("");

  // Socials
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [portfolio, setPortfolio] = useState("");
  // Editor Tab: "write" or "preview"
  const [editorMode, setEditorMode] = useState("write");
  const textareaRef = useRef(null);
  // Form Fields State - Platform
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  // Form Fields State - Visibility
  const [visibilityOption, setVisibilityOption] = useState("Public");
  // Form Fields State - Accounts
  const [isEditingPrepPilotId, setIsEditingPrepPilotId] = useState(false);
  const [prepPilotIdInput, setPrepPilotIdInput] = useState("");

  // Password States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordInfo = getPasswordStrength(newPassword);
  // Show / Hide Password Toggles
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Modals
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");
  // Populate user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
      setCountry(user.country || "");
      setSchool(user.educationDetails?.school || "");
      setDegree(user.educationDetails?.degree || "");
      setBranch(user.educationDetails?.branch || "");
      setGraduationYear(user.educationDetails?.graduationYear || "");

      setInitialFormData({
  firstName: user.firstName || "",
  lastName: user.lastName || "",
  bio: user.bio || "",
  country: user.country || "",
  school: user.educationDetails?.school || "",
  degree: user.educationDetails?.degree || "",
  branch: user.educationDetails?.branch || "",
  graduationYear: user.educationDetails?.graduationYear || "",
});

      setAboutMeText(user.profileDetails?.aboutMe || "");
      setEducationText(user.profileDetails?.education || "");
      setAchievementsText(user.profileDetails?.achievements || "");
      setWorkExperienceText(user.profileDetails?.workExperience || "");
      setGithub(user.profileDetails?.socials?.github || "");
      setLinkedin(user.profileDetails?.socials?.linkedin || "");
      setTwitter(user.profileDetails?.socials?.twitter || "");
      setPortfolio(user.profileDetails?.socials?.portfolio || "");
      setVisibilityOption(user.visibility || "Public");
      setPrepPilotIdInput(user.prepPilotId || "");
      setNotificationsEnabled(
        user.platformPreferences?.notificationsEnabled !== false,
      );
    }
  }, [user]);

  const currentFormData = {
  firstName,
  lastName,
  bio,
  country,
  school,
  degree,
  branch,
  graduationYear,
};

const hasUnsavedChanges =
  initialFormData &&
  JSON.stringify(currentFormData) !== JSON.stringify(initialFormData);

  useUnsavedChangesWarning(hasUnsavedChanges);

  // Handle Profile Picture Upload
  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingPhoto(true);
    const loadingToast = toast.loading("Uploading profile image...");
    try {
      const res = await uploadImage(file);
      if (res && res.imageUrl) {
        // Save image URL to DB
        const response = await axiosInstance.put(
          API_PATHS.AUTH.UPDATE_PROFILE,
          {
            profileImageUrl: res.imageUrl,
          },
        );
        updateUser(response.data);
        toast.success("Profile image updated!", { id: loadingToast });
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to upload profile image",
        { id: loadingToast },
      );
    } finally {
      setUploadingPhoto(false);
    }
  };
  const handleRemovePhoto = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove your profile picture?",
    );

    if (!confirmed) return;

    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        profileImageUrl: null,
      });

      updateUser(response.data);

      toast.success("Profile picture removed successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to remove profile picture",
      );
    }
  };

  // Handle Save Basic Info
  const handleSaveBasicInfo = async (e) => {
    e.preventDefault();
    const saveToast = toast.loading("Saving changes...");
    try {
      const payload = {
        firstName,
        lastName,
        bio,
        country,
        educationDetails: {
          school,
          degree,
          branch,
          graduationYear,
        },
      };
      const response = await axiosInstance.put(
  API_PATHS.AUTH.UPDATE_PROFILE,
  payload,
);

updateUser(response.data);

setInitialFormData({
  firstName,
  lastName,
  bio,
  country,
  school,
  degree,
  branch,
  graduationYear,
});

toast.success("Basic info updated successfully!", { id: saveToast });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile", {
        id: saveToast,
      });
    }
  };
  // Handle Markdown Insertion
  const insertMarkdown = (syntax, placeholder = "text") => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end) || placeholder;
    let replacement = "";
    if (syntax === "bold") replacement = `**${selectedText}**`;
    else if (syntax === "italic") replacement = `*${selectedText}*`;
    else if (syntax === "underline") replacement = `<u>${selectedText}</u>`;
    else if (syntax === "code") replacement = `\`${selectedText}\``;
    else if (syntax === "quote") replacement = `> ${selectedText}`;
    else if (syntax === "list") replacement = `\n- ${selectedText}`;
    else if (syntax === "list-ordered") replacement = `\n1. ${selectedText}`;
    else if (syntax === "link") replacement = `[${selectedText}](url)`;
    else if (syntax === "image") replacement = `![${selectedText}](img-url)`;
    const newValue =
      text.substring(0, start) + replacement + text.substring(end);
    if (profileDetailsActiveTab === "about-me") setAboutMeText(newValue);
    else if (profileDetailsActiveTab === "education")
      setEducationText(newValue);
    else if (profileDetailsActiveTab === "achievements")
      setAchievementsText(newValue);
    else if (profileDetailsActiveTab === "work-experience")
      setWorkExperienceText(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + replacement.length,
        start + replacement.length,
      );
    }, 0);
  };
  const getProfileTabTextValue = () => {
    if (profileDetailsActiveTab === "about-me") return aboutMeText;
    if (profileDetailsActiveTab === "education") return educationText;
    if (profileDetailsActiveTab === "achievements") return achievementsText;
    if (profileDetailsActiveTab === "work-experience")
      return workExperienceText;
    return "";
  };
  const setProfileTabTextValue = (val) => {
    if (profileDetailsActiveTab === "about-me") setAboutMeText(val);
    else if (profileDetailsActiveTab === "education") setEducationText(val);
    else if (profileDetailsActiveTab === "achievements")
      setAchievementsText(val);
    else if (profileDetailsActiveTab === "work-experience")
      setWorkExperienceText(val);
  };
  // Update Profile Details Tab Content
  const handleUpdateProfileDetails = async () => {
    const saveToast = toast.loading("Updating profile details...");
    try {
      let payload = {};
      if (profileDetailsActiveTab === "socials") {
        payload = {
          profileDetails: {
            socials: { github, linkedin, twitter, portfolio },
          },
        };
      } else {
        payload = {
          profileDetails: {
            aboutMe: aboutMeText,
            education: educationText,
            achievements: achievementsText,
            workExperience: workExperienceText,
          },
        };
      }
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        payload,
      );
      updateUser(response.data);
      toast.success("Profile details updated successfully!", { id: saveToast });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update profile details",
        { id: saveToast },
      );
    }
  };
  // Handle Stats Visibility Change
  const handleVisibilityChange = async (option) => {
    setVisibilityOption(option);
    const saveToast = toast.loading(`Changing visibility to ${option}...`);
    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        visibility: option,
      });
      updateUser(response.data);
      toast.success(`Profile visibility set to ${option}!`, { id: saveToast });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to change visibility",
        { id: saveToast },
      );
    }
  };
  // Save Platform Preferences
  const handleSavePlatformSettings = async () => {
    const saveToast = toast.loading("Saving platform preferences...");
    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        platformPreferences: {
          theme,
          notificationsEnabled,
        },
      });
      updateUser(response.data);
      toast.success("Platform preferences saved!", { id: saveToast });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save preferences", {
        id: saveToast,
      });
    }
  };
  // Save / Update PrepPilot ID
  const handleSavePrepPilotId = async () => {
    if (!prepPilotIdInput.trim()) {
      toast.error("PrepPilot ID cannot be empty");
      return;
    }
    const saveToast = toast.loading("Updating PrepPilot ID...");
    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        prepPilotId: prepPilotIdInput.trim(),
      });
      updateUser(response.data);
      setIsEditingPrepPilotId(false);
      toast.success("PrepPilot ID updated!", { id: saveToast });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update PrepPilot ID",
        { id: saveToast },
      );
    }
  };
  // Update Password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    const { checks } = getPasswordStrength(newPassword);

    const isValid = Object.values(checks).every(Boolean);

    if (!isValid) {
      toast.error("Password must meet all security requirements");
      return;
    }
    const saveToast = toast.loading("Updating password...");
    try {
      await axiosInstance.put(API_PATHS.AUTH.CHANGE_PASSWORD, {
        originalPassword: oldPassword,
        newPassword,
      });
      toast.success("Password updated successfully!", { id: saveToast });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password", {
        id: saveToast,
      });
    }
  };
  // Delete Account
  const handleDeleteAccount = async () => {
    const deleteToast = toast.loading("Deleting account...");
    try {
      await axiosInstance.delete(API_PATHS.AUTH.DELETE_ACCOUNT);
      toast.success("Account deleted permanently. Goodbye!", {
        id: deleteToast,
      });

      navigate("/");

      setTimeout(() => {
        clearUser();
      }, 100);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account", {
        id: deleteToast,
      });
    } finally {
      setShowDeleteConfirm(false);
      setDeleteConfirmationText("");
    }
  };

  const Requirement = ({ valid, text }) => (
    <li className="flex items-center gap-2">
      {valid ? (
        <Check size={14} className="text-green-500" />
      ) : (
        <X size={14} className="text-red-500" />
      )}

      <span>{text}</span>
    </li>
  );

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Settings Navigation Sidebar */}
      <div className="hidden lg:flex w-64 border-r border-slate-200/60 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex-col p-4">
        {/* Back Link */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 mb-8 text-sm font-semibold text-[#f5a962] dark:text-orange-400 hover:opacity-80 cursor-pointer self-start"
        >
          <ArrowLeft size={16} />
          Back to Profile
        </button>
        {/* Navigation Tabs */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:flex md:flex-col">
          <button
            onClick={() => setActiveSection("basic-info")}
            className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm ${
              activeSection === "basic-info"
                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-sm"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <User size={18} />
            Basic Info
          </button>
          <button
            onClick={() => setActiveSection("profile-details")}
            className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm ${
              activeSection === "profile-details"
                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-sm"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FileText size={18} />
            Profile Details
          </button>
          <button
            onClick={() => setActiveSection("platform")}
            className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm${
              activeSection === "platform"
                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-sm"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Sliders size={18} />
            Platform
          </button>
          <button
            onClick={() => setActiveSection("visibility")}
            className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm${
              activeSection === "visibility"
                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-sm"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Lock size={18} />
            Visibility
          </button>
          <button
            onClick={() => setActiveSection("accounts")}
            className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm ${
              activeSection === "accounts"
                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-sm"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Shield size={18} />
            Accounts
          </button>
        </nav>
      </div>
      {/* Mobile & Tablet Navigation */}
      <div className="block lg:hidden border-b border-slate-800 p-4">
        <nav className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              id: "basic-info",
              label: "Basic Info",
              icon: <User size={18} />,
            },
            {
              id: "profile-details",
              label: "Profile Details",
              icon: <FileText size={18} />,
            },
            {
              id: "platform",
              label: "Platform",
              icon: <Sliders size={18} />,
            },
            {
              id: "visibility",
              label: "Visibility",
              icon: <Lock size={18} />,
            },
            {
              id: "accounts",
              label: "Accounts",
              icon: <Shield size={18} />,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
          flex items-center justify-center gap-2
          rounded-xl h-14
          text-sm font-medium
          transition-all duration-200

          ${
            activeSection === item.id
              ? "bg-slate-800 text-white border border-slate-700"
              : "bg-slate-900/40 text-slate-400 border border-slate-800 hover:bg-slate-800/60 hover:text-white"
          }

          ${item.id === "accounts" ? "md:col-span-2" : ""}
        `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Main Settings Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 max-w-5xl w-full">
        {/* ================= BASIC INFO SECTION ================= */}
        {activeSection === "basic-info" && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Basic Info
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                You can manage your details here.
              </p>
            </div>
            <form
              onSubmit={handleSaveBasicInfo}
              className="bg-white dark:bg-[#0f172a] rounded-xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-6">
                  Basic Details
                </h3>

                {/* Photo uploader */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                  <div className="relative group">
                    {user?.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt="Profile avatar"
                        className="w-24 h-24 rounded-full object-cover border-2 border-blue-500/20 group-hover:opacity-85 transition-opacity"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 font-extrabold text-3xl border border-slate-200 dark:border-slate-700">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                    {showPhotoMenu && (
                      <div className="absolute top-full left-0 mt-2 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => {
                            setShowPhotoMenu(false);
                            handlePhotoClick();
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          Upload Photo
                        </button>

                        {user?.profileImageUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setShowPhotoMenu(false);
                              handleRemovePhoto();
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                          >
                            Remove Photo
                          </button>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      disabled={uploadingPhoto}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPhotoMenu((prev) => !prev);
                      }}
                      className="absolute bottom-0 right-0 p-1.5 bg-blue-600 dark:bg-violet-600 rounded-full text-white shadow-lg"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                      Profile Photo
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Accepts PNG, JPG, or WEBP up to 5MB.
                    </p>
                  </div>
                </div>
                {/* Form fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-slate-100 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-lg py-2.5 px-4 text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed focus:outline-none"
                    value={email}
                    disabled
                  />
                </div>
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Bio (Max 200 Characters)
                    </label>
                    <span className="text-[10px] text-slate-400">
                      {bio.length}/200
                    </span>
                  </div>
                  <textarea
                    maxLength={200}
                    rows={3}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a little bit about yourself..."
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter Country"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="border-t border-slate-200/60 dark:border-slate-800 pt-6">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-6">
                  Educational Details
                </h3>
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    School / College / University
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="Enter school name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Degree
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="Degree"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Branch
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      placeholder="Branch"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Year of Graduation
                    </label>
                    <input
                      type="number"
                      min="1900"
                      max="2100"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      placeholder="2028"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm hover:shadow transition-all text-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
        {/* ================= PROFILE DETAILS SECTION ================= */}
        {activeSection === "profile-details" && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                Profile Details
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Manage details about your experiences and achievements.
              </p>
            </div>
            {/* Sub-tabs header */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
              {[
                { id: "about-me", label: "About Me", icon: User },
                { id: "education", label: "Education", icon: GraduationCap },
                { id: "achievements", label: "Achievements", icon: Award },
                {
                  id: "work-experience",
                  label: "Work Experience",
                  icon: Briefcase,
                },
                { id: "socials", label: "Socials", icon: Share2 },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = profileDetailsActiveTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setProfileDetailsActiveTab(tab.id);
                      setEditorMode("write");
                    }}
                    className={`flex items-center gap-2 pb-3 text-sm font-semibold transition-all relative cursor-pointer ${
                      isActive
                        ? "text-orange-500 dark:text-orange-400 border-b-2 border-orange-500 dark:border-orange-400"
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    }`}
                  >
                    <TabIcon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
            {/* Tab content area */}
            {profileDetailsActiveTab !== "socials" ? (
              <div className="bg-white dark:bg-[#0f172a] rounded-xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white capitalize">
                      {profileDetailsActiveTab.replace("-", " ")}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {profileDetailsActiveTab === "about-me" &&
                        "Add a brief introduction about yourself to showcase your personality and interests."}
                      {profileDetailsActiveTab === "education" &&
                        "Summarize your educational achievements and qualifications."}
                      {profileDetailsActiveTab === "achievements" &&
                        "List your major competitions, highlights, and accolades."}
                      {profileDetailsActiveTab === "work-experience" &&
                        "Detail your past work, internships, or volunteering experience."}
                    </p>
                  </div>
                  <button
                    onClick={handleUpdateProfileDetails}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all text-xs cursor-pointer"
                  >
                    Update Changes
                  </button>
                </div>
                {/* Editor Area */}
                <div className="border border-slate-200/80 dark:border-slate-800 rounded-lg overflow-hidden flex flex-col">
                  {/* Write/Preview header */}
                  <div className="flex bg-slate-50 dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 justify-between items-center px-4 py-2 text-xs">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditorMode("write")}
                        className={`font-semibold py-1 px-3 rounded-md cursor-pointer ${
                          editorMode === "write"
                            ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-violet-400 shadow-xs"
                            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        }`}
                      >
                        Write
                      </button>
                      <button
                        onClick={() => setEditorMode("preview")}
                        className={`font-semibold py-1 px-3 rounded-md cursor-pointer ${
                          editorMode === "preview"
                            ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-violet-400 shadow-xs"
                            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        }`}
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                  {/* Formatting Toolbar - only in write mode */}
                  {editorMode === "write" && (
                    <div className="flex flex-wrap gap-1 items-center px-3 py-1.5 bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                      <button
                        type="button"
                        onClick={() => insertMarkdown("bold", "bold text")}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                        title="Bold"
                      >
                        <Bold size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("italic", "italic text")}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                        title="Italic"
                      >
                        <Italic size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          insertMarkdown("underline", "underlined text")
                        }
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                        title="Underline"
                      >
                        <Underline size={14} />
                      </button>
                      <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("list", "list item")}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                        title="Bulleted List"
                      >
                        <List size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          insertMarkdown("list-ordered", "list item")
                        }
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                        title="Numbered List"
                      >
                        <ListOrdered size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("quote", "quote block")}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                        title="Blockquote"
                      >
                        <Quote size={14} />
                      </button>
                      <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("code", "code block")}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                        title="Code"
                      >
                        <Code size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          insertMarkdown("image", "Image description")
                        }
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                        title="Image"
                      >
                        <ImageIcon size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("link", "Link text")}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                        title="Link"
                      >
                        <Link2 size={14} />
                      </button>
                    </div>
                  )}
                  {/* Text area or Markdown view */}
                  {editorMode === "write" ? (
                    <textarea
                      ref={textareaRef}
                      className="w-full bg-white dark:bg-slate-900 border-0 p-4 text-sm text-slate-800 dark:text-slate-200 focus:outline-none min-h-[300px] resize-y"
                      value={getProfileTabTextValue()}
                      onChange={(e) => setProfileTabTextValue(e.target.value)}
                      placeholder={`Write your ${profileDetailsActiveTab.replace("-", " ")} section in Markdown format...`}
                    />
                  ) : (
                    <div className="p-6 min-h-[300px] max-h-[500px] overflow-y-auto bg-slate-50/20 dark:bg-slate-900/10 prose dark:prose-invert prose-sm max-w-none">
                      {getProfileTabTextValue() ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {getProfileTabTextValue()}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-slate-400 italic">
                          No content to preview yet. Use the Write tab to add
                          content.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Socials Content */
              <div className="bg-white dark:bg-[#0f172a] rounded-xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                      Social Media Links
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Connect your online profiles here.
                    </p>
                  </div>
                  <button
                    onClick={handleUpdateProfileDetails}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all text-xs cursor-pointer"
                  >
                    Update Changes
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Twitter / X Profile
                    </label>
                    <input
                      type="url"
                      placeholder="https://x.com/username"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Portfolio Website
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourportfolio.com"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* ================= PLATFORM SETTINGS SECTION ================= */}
        {activeSection === "platform" && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                Platform
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Manage system configurations and notifications.
              </p>
            </div>
            <div className="bg-white dark:bg-[#0f172a] rounded-xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-6">
              {/* Theme Settings */}
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-4">
                  Appearance Theme
                </h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      if (theme === "dark") toggleTheme();
                    }}
                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${
                      theme === "light"
                        ? "border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <Sun size={18} />
                    Light Theme
                  </button>
                  <button
                    onClick={() => {
                      if (theme === "light") toggleTheme();
                    }}
                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${
                      theme === "dark"
                        ? "border-violet-500 bg-violet-950/20 text-violet-400 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <Moon size={18} />
                    Dark Theme
                  </button>
                </div>
              </div>
              {/* Notification Toggles */}
              <div className="border-t border-slate-200/60 dark:border-slate-800 pt-6">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-4">
                  Notification Preferences
                </h3>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 rounded-xl">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Email Notifications
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Receive product updates, progress digests, and alert logs.
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() =>
                      setNotificationsEnabled(!notificationsEnabled)
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      notificationsEnabled
                        ? "bg-blue-600 dark:bg-violet-600"
                        : "bg-slate-200 dark:bg-slate-800"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        notificationsEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex justify-end pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <button
                  onClick={handleSavePlatformSettings}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm hover:shadow transition-all text-sm cursor-pointer"
                >
                  Save Platform Settings
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ================= VISIBILITY SECTION ================= */}
        {activeSection === "visibility" && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                Visibility
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                You can manage your stats visibility here.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                {
                  id: "Public",
                  desc: "Allow other users and guests to view your practice statistics, completed sheets, and developer profile.",
                },
                {
                  id: "Private",
                  desc: "Hide your profile from search results, and ensure your progress logs are only visible to you.",
                },
              ].map((option) => {
                const isSelected = visibilityOption === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleVisibilityChange(option.id)}
                    className={`w-full flex items-start text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/10 dark:border-violet-500 dark:bg-violet-950/10"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center h-5 mr-4 mt-0.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? "border-blue-500 dark:border-violet-500"
                            : "border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-violet-50" />
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-950 dark:text-white">
                        {option.id}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {option.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {/* ================= ACCOUNTS SECTION ================= */}
        {activeSection === "accounts" && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                Accounts
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                You can manage your accounts here.
              </p>
            </div>
            {/* Account Information Block */}
            <div className="bg-white dark:bg-[#0f172a] rounded-xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-6">
                  Account Information
                </h3>

                {/* ID input/editing */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-4">
                  <div className="flex-1 mr-4">
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                      PrepPilot ID:
                    </span>
                    {isEditingPrepPilotId ? (
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-1 px-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all w-full max-w-[250px]"
                          value={prepPilotIdInput}
                          onChange={(e) => setPrepPilotIdInput(e.target.value)}
                        />
                        <button
                          onClick={handleSavePrepPilotId}
                          className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20 rounded-md transition-colors"
                          title="Save"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setPrepPilotIdInput(user?.prepPilotId || "");
                            setIsEditingPrepPilotId(false);
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors"
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {user?.prepPilotId || (
                          <span className="text-slate-400 italic">
                            None set
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                  {!isEditingPrepPilotId && (
                    <button
                      onClick={() => setIsEditingPrepPilotId(true)}
                      className="text-sm font-semibold text-blue-600 dark:text-violet-400 hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </div>
                {/* Email (Readonly info) */}
                <div className="flex items-start flex-col">
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                    Email:
                  </span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {user?.email}
                  </span>
                </div>
              </div>
              {/* Password update section */}
              <div className="border-t border-slate-200/60 dark:border-slate-800 pt-6">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-6">
                  Update Password
                </h3>

                <form
                  onSubmit={handleUpdatePassword}
                  className="space-y-4 max-w-xl"
                >
                  {/* Old Password */}
                  <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                      Original Password:
                    </label>
                    <div className="relative md:col-span-2 flex items-center">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2 px-4 pr-10 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showOldPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  {/* New Password */}
                  <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                      New Password:
                    </label>
                    <div className="relative md:col-span-2 flex items-center">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2 px-4 pr-10 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showNewPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  {newPassword && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Password Strength</span>
                        <span>{passwordInfo.strength}</span>
                      </div>

                      <div className="h-2 rounded bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            passwordInfo.strength === "Weak"
                              ? "bg-red-500 w-1/3"
                              : passwordInfo.strength === "Medium"
                                ? "bg-yellow-500 w-2/3"
                                : "bg-green-500 w-full"
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  {newPassword && (
                    <ul className="mt-3 space-y-1 text-xs">
                      <Requirement
                        valid={passwordInfo.checks.minLength}
                        text="Minimum 8 characters"
                      />

                      <Requirement
                        valid={passwordInfo.checks.uppercase}
                        text="At least one uppercase letter"
                      />

                      <Requirement
                        valid={passwordInfo.checks.lowercase}
                        text="At least one lowercase letter"
                      />

                      <Requirement
                        valid={passwordInfo.checks.number}
                        text="At least one number"
                      />

                      <Requirement
                        valid={passwordInfo.checks.special}
                        text="At least one special character"
                      />
                    </ul>
                  )}

                  {/* Confirm Password */}
                  <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                      Confirm Password:
                    </label>
                    <div className="relative md:col-span-2 flex items-center">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg py-2 px-4 pr-10 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
              {/* Delete Account */}
              <div className="border-t border-slate-200/60 dark:border-slate-800 pt-6">
                <div className="flex flex-col lg:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-red-600 mb-1">
                      Delete Account
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-lg text-sm transition-colors cursor-pointer self-start md:self-center"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Delete Account</h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Are you sure you want to delete your account? This action is
              permanent and cannot be undone. All your session data, progress
              tracker, and profile configurations will be deleted forever.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Type DELETE to confirm
              </label>

              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="DELETE"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmationText("");
                }}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmationText !== "DELETE"}
                className={`px-4 py-2 rounded-lg text-white ${
                  deleteConfirmationText === "DELETE"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-red-300 cursor-not-allowed"
                }`}
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default Settings;
