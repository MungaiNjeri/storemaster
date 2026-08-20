import { useState } from "react";
import {
  User,
  Mail,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import Button from "../components/Button";
import auth from "../api/auth";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [confirmAccessKey, setConfirmAccessKey] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async (e) => {
    e.preventDefault();

    setError("");

    // Validate name
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    // Validate email
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Validate access key
    if (!accessKey) {
      setError("Please create an access key.");
      return;
    }

    if (accessKey.length < 6) {
      setError(
        "Your access key must be at least 6 characters."
      );
      return;
    }

    // Confirm access key
    if (accessKey !== confirmAccessKey) {
      setError("Access keys do not match.");
      return;
    }

    try {
      setLoading(true);

      // Register owner
      const response = await auth.register({
        full_name: fullName,
        email: email,
        password: accessKey,
        role: "Admin",
      });

      console.log("REGISTER RESPONSE:", response.data);

      // Save JWT
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Save signup information
      sessionStorage.setItem(
        "ownerSignup",
        JSON.stringify({
          full_name: fullName,
          email: email,
        })
      );

      // Go to store setup
      navigate("/setup");

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Registration failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-50">

      <div
        className="
          mx-auto
          w-full
          max-w-85
          px-3
          py-6
          sm:max-w-xl
          sm:px-6
          sm:py-10
          lg:max-w-2xl
        "
      >

        {/* Brand */}

        <div className="mb-7 text-center sm:mb-9">

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            StoreMaster
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Smart POS System
          </p>

        </div>

        {/* Progress */}

        <div className="mx-auto mb-7 w-full max-w-sm sm:mb-9">

          <div className="flex items-center">

            {/* Account */}

            <div className="flex shrink-0 items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white sm:h-9 sm:w-9 sm:text-sm">
                1
              </div>

              <span className="text-xs font-medium text-slate-900 sm:text-sm">
                Account
              </span>

            </div>

            {/* Line */}

            <div className="mx-3 h-px flex-1 bg-slate-200 sm:mx-4"></div>

            {/* Store */}

            <div className="flex shrink-0 items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-500 sm:h-9 sm:w-9 sm:text-sm">
                2
              </div>

              <span className="text-xs text-slate-400 sm:text-sm">
                Store
              </span>

            </div>

          </div>

        </div>

        {/* Card */}

        <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">

          {/* Heading */}

          <div className="mb-7">

            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Create your account
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Create your owner account to start managing your business.
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleContinue}
            className="w-full space-y-5"
          >

            {/* Full name */}

            <InputField
              label="Full Name"
              type="text"
              placeholder="e.g. Mary Mungai"
              icon={User}
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              required
            />

            {/* Email */}

            <InputField
              label="Email Address"
              type="email"
              placeholder="e.g. mary@example.com"
              icon={Mail}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            {/* Access key */}

            <div className="w-full">

              <InputField
                label="Access Key"
                type="password"
                placeholder="Create an access key"
                icon={KeyRound}
                value={accessKey}
                onChange={(e) =>
                  setAccessKey(e.target.value)
                }
                required
              />

              <p className="mt-2 text-xs leading-5 text-slate-400">
                At least 6 characters.
              </p>

            </div>

            {/* Confirm */}

            <InputField
              label="Confirm Access Key"
              type="password"
              placeholder="Enter your access key again"
              icon={KeyRound}
              value={confirmAccessKey}
              onChange={(e) =>
                setConfirmAccessKey(e.target.value)
              }
              required
            />

            {/* Error */}

            {error && (
              <div className="w-full rounded-lg border border-red-100 bg-red-50 px-3 py-3 text-sm leading-5 text-red-600">
                {error}
              </div>
            )}

            {/* Continue */}

            <div className="pt-1">

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                rightIcon={
                  !loading ? (
                    <ArrowRight size={18} />
                  ) : null
                }
              >
                Continue
              </Button>

            </div>

          </form>

          {/* Divider */}

          <div className="my-6 flex items-center gap-3">

            <div className="h-px min-w-0 flex-1 bg-slate-200"></div>

            <span className="shrink-0 text-xs uppercase tracking-wide text-slate-400">
              Or
            </span>

            <div className="h-px min-w-0 flex-1 bg-slate-200"></div>

          </div>

          {/* Google */}

          <Button
            type="button"
            variant="outline"
            fullWidth
            leftIcon={<FcGoogle size={20} />}
          >
            Continue with Google
          </Button>

          {/* Microsoft */}

          <div className="mt-3">

            <Button
              type="button"
              variant="outline"
              fullWidth
              leftIcon={
                <FaMicrosoft
                  className="text-blue-600"
                  size={18}
                />
              }
            >
              Continue with Microsoft
            </Button>

          </div>

          {/* Login */}

          <p className="mt-6 text-center text-sm leading-6 text-slate-500">

            Already have an account?

            <button
              type="button"
              onClick={() => navigate("/")}
              className="ml-1 font-medium text-blue-600 hover:text-blue-700"
            >
              Sign in
            </button>

          </p>

        </section>

        {/* Footer */}

        <p className="mx-auto mt-5 max-w-sm px-2 text-center text-xs leading-5 text-slate-400 sm:mt-6">
          By continuing, you agree to the StoreMaster
          terms and privacy policy.
        </p>

      </div>

    </main>
  );
}

export default Register;