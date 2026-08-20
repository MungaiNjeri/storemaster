import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function InputField({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  icon: Icon,
  error = "",
  helperText = "",
  required = false,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="w-full min-w-0 space-y-2">

      {/* Label */}

      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}

          {required && (
            <span className="ml-1 text-red-500">
              *
            </span>
          )}
        </label>
      )}

      {/* Input container */}

      <div
        className={`
          flex
          w-full
          min-w-0
          items-center
          rounded-xl
          border
          bg-white
          px-3
          py-3
          transition
          sm:px-4
          ${
            error
              ? "border-red-500 ring-2 ring-red-100"
              : "border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
          }
        `}
      >

        {/* Left icon */}

        {Icon && (
          <Icon
            size={19}
            className="mr-1 shrink-0 text-slate-400 sm:mr-2"
          />
        )}

        {/* Input */}

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="
            min-w-0
            flex-1
            bg-transparent
            px-2
            text-sm
            text-slate-800
            outline-none
            placeholder:text-slate-400
            disabled:cursor-not-allowed
            sm:px-3
            sm:text-base
          "
        />

        {/* Password visibility */}

        {type === "password" && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
              shrink-0
              p-1
              text-slate-400
              transition
              hover:text-slate-600
            "
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={19} />
            ) : (
              <Eye size={19} />
            )}
          </button>
        )}

      </div>

      {/* Helper text */}

      {helperText && !error && (
        <p className="text-xs leading-5 text-slate-500">
          {helperText}
        </p>
      )}

      {/* Error */}

      {error && (
        <p className="text-xs leading-5 text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

export default InputField;