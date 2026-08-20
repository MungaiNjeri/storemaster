function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
}) {
  const baseStyles =
    "inline-flex min-w-0 items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",

    secondary:
      "bg-slate-100 text-slate-800 hover:bg-slate-200",

    outline:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    success:
      "bg-green-600 text-white hover:bg-green-700",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-4 py-3 text-sm sm:px-5 sm:py-3 sm:text-base",
    lg: "px-5 py-3 text-base sm:px-6 sm:py-4 sm:text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${
          disabled || loading
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        }
      `}
    >
      {loading ? (
        <>
          <div className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-white border-t-transparent"></div>

          <span className="truncate">
            Loading...
          </span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="shrink-0">
              {leftIcon}
            </span>
          )}

          <span className="truncate">
            {children}
          </span>

          {rightIcon && (
            <span className="shrink-0">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}

export default Button;