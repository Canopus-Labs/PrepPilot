import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type,
  ...props
}) => {
const Input = ({ value, onChange, label, placeholder, type, autoFocus = false, }) => {
  const [showPassword, setShowpassword] = useState(false);
  const toggleShowPassword = () => {
    setShowpassword(!showPassword);
  };

  return (
    <div className="mb-5 w-full min-w-0">
      <label className="text-sm font-semibold text-gray-700 block mb-2">
        {label}
      </label>
      <div className="relative flex items-center w-full min-w-0 group">
        <input
  type={
    type === "password"
      ? (showPassword ? "text" : "password")
      : type
  }
  placeholder={placeholder}
  className="w-full min-w-0 bg-white border border-violet-300 hover:border-violet-400 focus:border-violet-500 rounded-lg py-2.5 px-4 pr-10 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
  value={value}
  onChange={(e) => onChange(e)}
  {...props}
/>
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          // Set autoComplete based on input type
          autoComplete={
          label?.toLowerCase().includes("email")
          ? "email"
          : type === "password"
          ? "current-password"
          : "off"
          }

          placeholder={placeholder}
          className="w-full min-w-0 bg-white border border-violet-300 hover:border-violet-400 focus:border-violet-500 rounded-lg py-2.5 px-4 pr-10 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
          value={value}
          onChange={(e) => onChange(e)}
          autoFocus={autoFocus}
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
