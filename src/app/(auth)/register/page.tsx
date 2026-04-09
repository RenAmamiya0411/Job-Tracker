"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/actions/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const result = await registerUser(name, email, password);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/login");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-base">
      <div className="w-full max-w-md bg-navy-surface rounded-xl shadow p-8">
        <h1 className="text-2xl font-semibold text-text-primary mb-6">Create account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
            <input
              className="w-full border border-navy-border text-text-primary rounded-lg px-3 py-2 text-sm outline-none  focus:border-amber-accent bg-navy-elevated"
              type="text"
              name="name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
            <input
              className="w-full border border-navy-border text-text-primary rounded-lg px-3 py-2 text-sm outline-none  focus:border-amber-accent bg-navy-elevated"
              type="email"
              name="email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
            <input
              className="w-full border border-navy-border text-text-primary rounded-lg px-3 py-2 text-sm outline-none  focus:border-amber-accent bg-navy-elevated"
              type="password"
              name="password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Confirm Password</label>
            <input
              className="w-full border border-navy-border text-text-primary rounded-lg px-3 py-2 text-sm outline-none  focus:border-amber-accent bg-navy-elevated"
              type="password"
              name="confirm"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-accent text-navy-base py-2 rounded-lg text-sm font-medium hover:bg-amber-hover disabled:opacity-50 transition-colors"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-sm text-text-secondary mt-6 text-center">
          Already have an account?{" "}
          <Link className="text-amber-accent hover:underline" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
