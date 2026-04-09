"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-base">
      <div className="w-full max-w-md bg-navy-surface rounded-xl shadow p-8">
        <h1 className="text-2xl font-semibold text-text-primary mb-6">Welcome Back</h1>
        <p className="text-text-secondary text-sm mb-6">Sign in to your account</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
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

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-accent text-navy-base py-2 rounded-lg text-sm font-medium hover:bg-amber-hover disabled:opacity-50 transition-colors"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-text-secondary mt-6 text-center">
          No account?{" "}
          <Link className="text-amber-accent hover:underline" href="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
