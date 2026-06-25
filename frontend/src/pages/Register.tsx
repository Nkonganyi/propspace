import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import { Logo, AlertCircleIcon } from "../components/icons";

export default function Register() {
  const nav = useNavigate();
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Catch obviously broken input before it ever hits the network.
    if (!username.trim() || !email.trim() || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await auth.register(username.trim(), email.trim(), password);
      nav("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 sm:py-20">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex animate-fade-in">
        {/* Registration Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Create Account
            </h1>
            <p className="text-slate-500">
              Join PropSpace to list your property
            </p>
          </div>

          {error && (
            <div className="alert-error mb-6">
              <AlertCircleIcon className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <InputField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
            />

            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-4 text-base mt-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline transition-all duration-200"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Side Illustration — CSS only, no image assets */}
        <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-primary to-accent overflow-hidden items-center justify-center p-10">
          <div className="blob absolute -top-16 -right-10 w-56 h-56 bg-white/20"></div>
          <div className="blob absolute bottom-0 -left-12 w-64 h-64 bg-white/10"></div>
          <div className="blob absolute top-1/3 left-1/4 w-24 h-24 bg-white/15"></div>

          <div className="relative z-10 text-center text-white space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Logo className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-extrabold leading-tight">
              Your Journey<br />Starts Here
            </h2>
            <p className="text-white/85 text-base max-w-xs mx-auto">
              List your properties and connect with buyers and renters in minutes.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="w-2 h-2 rounded-full bg-white/40"></span>
              <span className="w-2 h-2 rounded-full bg-white/40"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
