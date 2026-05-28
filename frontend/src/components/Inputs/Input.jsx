import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowpassword] = useState(false);
  const toggleShowPassword = () => {
    setShowpassword(!showPassword);
  };

  return (
    <div className="mb-5 w-full min-w-0">
      <label className="text-xs font-semibold text-gray-300 block mb-2">
        {label}
      </label>
      <div className="relative flex items-center w-full min-w-0 group">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full min-w-0 bg-white/5 border border-white/15 hover:border-white/25 focus:border-violet-500/50 rounded-lg py-2.5 px-4 pr-10 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <span
            className="absolute right-3 cursor-pointer select-none text-gray-400 hover:text-gray-300 transition-colors"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FaRegEye size={18} />
            ) : (
              <FaRegEyeSlash size={18} />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
