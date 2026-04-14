import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowpassword] = useState(false);
  const toggleShowPassword = () => {
    setShowpassword(!showPassword);
  };

  return (
    <div className="mb-4 w-full min-w-0">
      <label className="text-[13px] text-slate-800 block mb-1">{label}</label>
      <div className="relative flex items-center w-full min-w-0">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full min-w-0 bg-white border border-gray-300 rounded-md py-2 px-3 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <span className="absolute right-3 cursor-pointer select-none" onClick={toggleShowPassword}>
            {showPassword ? (
              <FaRegEye size={20} className="text-primary"
              onClick={()=>toggleShowPassword()} 
              />
            ) : (
              <FaRegEyeSlash size={20} className="text-slate-400" 
              onClick={()=>toggleShowPassword()} 
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
