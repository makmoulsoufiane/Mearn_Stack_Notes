import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  CheckCircle2,
  FileText,
  Layers3,
  LockKeyhole,
  LogIn,
  Mail,
  Sparkles,
} from "lucide-react";

import Input from "../components/Input";
import api from "../api/axios";
import { notesPath } from "../utils/notesPath";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate(notesPath(), { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-lg border border-base-content/10 bg-base-300/90 shadow-2xl backdrop-blur lg:grid-cols-[0.9fr_1.1fr]">
        <section className="mx-auto flex w-full max-w-md flex-col justify-center p-6 sm:p-8 lg:min-h-[620px]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
            <LogIn className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold text-base-content">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-base-content/60">
            Sign in to continue managing your notes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="alert alert-error text-sm">
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            leftIcon={<Mail className="h-5 w-5" />}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            leftIcon={<LockKeyhole className="h-5 w-5" />}
            required
          />

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="label cursor-pointer justify-start gap-2 p-0 text-base-content/70">
              <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
              <span className="label-text">Remember me</span>
            </label>

            <button type="button" className="link-hover link text-primary">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading && <span className="loading loading-spinner loading-sm" />}
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="divider my-6 text-base-content/40">or</div>

        <p className="text-center text-sm text-base-content/70">
          Do not have an account?{" "}
          <Link to="/registre" className="link-hover link text-primary">
            Create one
          </Link>
        </p>

        <div className="mt-6 text-center">
          <Link to="/login" className="btn btn-ghost btn-sm">
            Back to notes
          </Link>
        </div>
        </section>
        <section className="relative hidden min-h-[620px] overflow-hidden border-l border-base-content/10 bg-base-200/60 p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-content">
                <FileText className="h-7 w-7" />
              </div>
              <div>
                <h2 className="font-mono text-3xl font-bold text-primary">
                  ThinkBoard
                </h2>
                <p className="text-sm text-base-content/60">
                  Notes that stay organized.
                </p>
              </div>
            </div>

            <h3 className="max-w-lg text-4xl font-bold leading-tight text-base-content">
              Capture ideas, organize tasks, and keep your thinking in one calm
              place.
            </h3>
            <p className="mt-4 max-w-xl text-base leading-7 text-base-content/65">
              ThinkBoard gives you a focused workspace for quick notes, project
              thoughts, reminders, and everything you do not want to lose.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-base-content/10 bg-base-300/80 p-4">
                <Layers3 className="mb-3 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">Organize</p>
                <p className="mt-1 text-xs text-base-content/55">
                  Keep notes easy to scan.
                </p>
              </div>
              <div className="rounded-lg border border-base-content/10 bg-base-300/80 p-4">
                <Sparkles className="mb-3 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">Create</p>
                <p className="mt-1 text-xs text-base-content/55">
                  Save ideas before they fade.
                </p>
              </div>
              <div className="rounded-lg border border-base-content/10 bg-base-300/80 p-4">
                <CheckCircle2 className="mb-3 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">Review</p>
                <p className="mt-1 text-xs text-base-content/55">
                  Return to what matters.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-10">
            <div className="rounded-lg border border-primary/20 bg-base-100/80 p-5 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/50">Today</p>
                  <p className="text-xl font-bold text-base-content">
                    Product ideas
                  </p>
                </div>
                <span className="badge badge-primary">3 notes</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg bg-base-200 p-4">
                  <p className="font-semibold text-base-content">
                    Build login page
                  </p>
                  <p className="mt-1 text-sm text-base-content/55">
                    Add clean auth screens and reusable inputs.
                  </p>
                </div>
                <div className="rounded-lg bg-base-200 p-4">
                  <p className="font-semibold text-base-content">
                    Plan note filters
                  </p>
                  <p className="mt-1 text-sm text-base-content/55">
                    Search, sort, and pin important notes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
