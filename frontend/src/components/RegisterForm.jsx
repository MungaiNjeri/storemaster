import { User, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import auth from "../api/auth";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Cashier");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await auth.register({
      full_name: fullName,
      email,
      password,
      role,
    });

    alert(response.data.message);

    navigate("/");
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Registration failed."
    );
  }
};
  return (
    <div className="flex items-center justify-center bg-slate-50 px-10 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            StoreMaster
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Smart POS System
          </p>
        </div>

        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Create Account
          </h2>

          <p className="mt-2 text-slate-500">
            Register a new StoreMaster account.
          </p>
        </div>

        <form
           className="space-y-4"
           onSubmit={handleSubmit}
        >
          <InputField
            label="Full Name"
            type="text"
            placeholder="Mary Mungai"
            icon={User}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="example@store.com"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>Cashier</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
          >
            Create Account
          </Button>

          <p className="text-xs text-center text-slate-500">
            You'll receive a verification email before accessing StoreMaster.
          </p>

          {/* Divider */}

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200"></div>

            <span className="text-xs uppercase tracking-wide text-slate-400">
              Or
            </span>

            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {/* Google */}

          <Button
            variant="outline"
            fullWidth
            leftIcon={<FcGoogle size={20} />}
          >
            Continue with Google
          </Button>

          {/* Microsoft */}

          <Button
            variant="outline"
            fullWidth
            leftIcon={<FaMicrosoft className="text-blue-600" size={18} />}
          >
            Continue with Microsoft
          </Button>
        </form>

        {/* Footer */}

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?

          <Link
            to="/"
            className="ml-1 font-medium text-blue-600 hover:text-blue-700"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;