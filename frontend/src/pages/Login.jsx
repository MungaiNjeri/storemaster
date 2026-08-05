import LoginForm from "../components/LoginForm";
import LoginIllustration from "../components/LoginIllustration";

function Login() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-175">

          <LoginIllustration />

          <LoginForm />

        </div>

      </div>

    </div>
  );
}

export default Login;