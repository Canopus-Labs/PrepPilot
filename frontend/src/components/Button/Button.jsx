import React from "react";

const variants = {
  primary:
    "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-md hover:shadow-violet-500/25",
  secondary:
    "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-white/20",
  danger:
    "bg-red-600 hover:bg-red-700 text-white",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-sm",
};

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  variant = "primary",
  size = "lg",
  icon,
  className = "",
  fullWidth = true,
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${fullWidth ? "w-full" : ""} flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 group ${variants[variant]} ${sizes[size]} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {icon && <span className="text-base">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
