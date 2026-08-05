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
    <div className="space-y-2">

      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <div
        className={`
          flex items-center rounded-xl border bg-white px-4 py-3 transition
          ${
            error
              ? "border-red-500 ring-2 ring-red-100"
              : "border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
          }
        `}
      >
        {Icon && (
          <Icon
            size={20}
            className="text-slate-400"
          />
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="flex-1 bg-transparent px-3 outline-none text-slate-800 placeholder:text-slate-400 disabled:cursor-not-allowed"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 hover:text-slate-600"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>

      {helperText && !error && (
        <p className="text-xs text-slate-500">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

export default InputField;