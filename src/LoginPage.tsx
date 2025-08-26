// src/LoginPage.tsx
import { useEffect, useState } from "react";
import { login } from "./auth";

type Props = { onSuccess?: () => void };

export default function LoginPage({ onSuccess }: Props) {
  // theme toggle
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark); // Tailwind v4
    document.body.classList.toggle("dark-mode", isDark);       // (ok if unused)
    localStorage.setItem("theme", theme);
  }, [theme]);

  // form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true); // demo only
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username.trim()) return setError("Enter username.");
    if (password.length < 4) return setError("Password must be at least 4 characters.");

    setLoading(true);
    await new Promise(r => setTimeout(r, 400)); // demo delay

    if (login(username.trim(), password)) onSuccess?.();
    else setError("Invalid username or password.");

    setLoading(false);
  }

  return (
    <div className="min-h-screen grid place-items-center p-4
                    bg-gradient-to-br from-slate-50 via-white to-slate-100
                    dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      {/* theme toggle */}
      <button
        type="button"
        onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
        className="absolute right-4 top-4 rounded-xl border px-3 py-1.5
                   border-slate-300 text-slate-700 bg-white/70
                   dark:border-slate-700 dark:text-slate-200 dark:bg-slate-800/70
                   backdrop-blur"
        title="Toggle dark mode"
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div className="w-full max-w-md rounded-2xl shadow-xl border p-6 sm:p-8
                      bg-white/80 text-slate-900 border-slate-200
                      dark:bg-slate-900/70 dark:text-slate-100 dark:border-slate-700">
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
          Sign in to your account
        </p>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Username</span>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              className="mt-1.5 w-full rounded-xl border px-3 py-2 outline-none
                         bg-white text-slate-900 border-slate-200
                         focus:ring-2 focus:ring-slate-900
                         dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700
                         placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </label>

          <label className="block">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Password</span>
              <a href="#" className="text-xs underline text-slate-500 dark:text-slate-400">Forgot password?</a>
            </div>
            <div className="mt-1.5 flex gap-2">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border px-3 py-2 outline-none
                           bg-white text-slate-900 border-slate-200
                           focus:ring-2 focus:ring-slate-900
                           dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700
                           placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="px-3 rounded-xl border
                           border-slate-200 text-slate-700 bg-white
                           dark:border-slate-700 dark:text-slate-200 dark:bg-slate-800"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-slate-900 dark:border-slate-600 dark:text-slate-100"
              />
              Remember me
            </label>
            <span className="text-xs text-slate-400 dark:text-slate-500">Demo • no API</span>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2
                            dark:border-red-400/40 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl font-medium py-2.5 disabled:opacity-60
                       bg-slate-900 text-white
                       dark:bg-slate-100 dark:text-slate-900"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
