import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";

import InputField from "./InputField";
import Button from "./Button";
import { useState } from "react";
import auth from "../api/auth";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const response = await auth.post("/login", {
      email,
      password,
    });

   localStorage.setItem("token", response.data.token);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

navigate("/dashboard");

  } catch (error) {

    console.log(
      error.response?.data?.message || "Login failed"
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
            Welcome Back 👋
          </h2>

          <p className="mt-2 text-slate-500">
            Sign in to continue managing your business.
          </p>

        </div>

        {/* Form */}

        <form 
  className="space-y-4"
  onSubmit={handleSubmit}
>

         <InputField
          label="Email Address"
          type="email"
         placeholder="example@store.com"
         icon={Mail}
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
        />
          <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={Lock}
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />

          {/* Remember */}

          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                className="accent-blue-600"
              />

              <span>Remember me</span>

            </label>

            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </button>

          </div>

          {/* Sign In */}

          <Button
            type="submit"
            variant="primary"
            fullWidth
          >
            Sign In
          </Button>

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

          Need help?

          <button
            type="button"
            className="ml-1 font-medium text-blue-600 hover:text-blue-700"
          >
            Contact your administrator
          </button>

        </p>

      </div>

    </div>
  );
}

export default LoginForm;