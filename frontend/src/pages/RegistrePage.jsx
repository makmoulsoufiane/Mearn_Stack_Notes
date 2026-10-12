import { useState } from "react";
import { Link } from "react-router";
import { LockKeyhole, Mail, UserRound, UserPlus } from "lucide-react";

import Input from "../components/Input";

const RegistrePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const passwordMismatch =
    formData.confirmPassword && formData.password !== formData.confirmPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordMismatch) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-base-content/10 bg-base-300/90 p-6 shadow-2xl backdrop-blur">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
            <UserPlus className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold text-base-content">
            Create account
          </h1>
          <p className="mt-2 text-sm text-base-content/60">
            Join ThinkBoard and start saving your notes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            leftIcon={<UserRound className="h-5 w-5" />}
            required
          />

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            leftIcon={<LockKeyhole className="h-5 w-5" />}
            helperText="Use at least 8 characters."
            minLength={8}
            required
          />

          <Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            leftIcon={<LockKeyhole className="h-5 w-5" />}
            error={passwordMismatch ? "Passwords do not match." : ""}
            minLength={8}
            required
          />

          <label className="label cursor-pointer justify-start gap-3 p-0 text-sm text-base-content/70">
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-sm"
              required
            />
            <span className="label-text">
              I agree to the terms and privacy policy.
            </span>
          </label>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading || passwordMismatch}
          >
            {loading && <span className="loading loading-spinner loading-sm" />}
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="divider my-6 text-base-content/40">or</div>

        <p className="text-center text-sm text-base-content/70">
          Already have an account?{" "}
          <Link to="/login" className="link-hover link text-primary">
            Login
          </Link>
        </p>

        <div className="mt-6 text-center">
          <Link to="/" className="btn btn-ghost btn-sm">
            Back to notes
          </Link>
        </div>
      </section>
    </main>
  );
};

export default RegistrePage;
