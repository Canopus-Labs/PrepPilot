import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProfileinfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex items-center md:pr-5">
      {/* Avatar */}
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm transition-colors duration-300"
        />
      ) : (
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white 
                        bg-gradient-to-r from-indigo-500 to-purple-500">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
      )}

      {/* User Info */}
      <div className="ml-3">
        <div className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300">
          {user.name || user.email || ""}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-700 dark:text-white font-medium hover:underline transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileinfoCard;
