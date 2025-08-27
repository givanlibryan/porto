// src/LoginPage.tsx
import { supabase } from './supabaseClient';
import { useEffect, useState } from 'react';
import { login } from './auth';

type Props = { onSuccess?: () => void };

export default function LoginPage({ onSuccess }: Props) {
  // theme toggle (keeps your dark mode working)
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  );
  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) return setError('Enter email.');
    if (password.length < 4) return setError('Password must be at least 4 characters.');

    setLoading(true);
    const ok = await login(email.trim(), password);
    setLoading(false);

    if (ok) onSuccess?.();
    else setError('Invalid email or password.');
  }

  async function sendReset() {
    if (!email) return setError('Enter your email first.');

    const base = import.meta.env.BASE_URL || '/';
    const redirectTo = `${location.origin}${base}reset`; // dev: /reset, prod: /porto/reset

    const { error: resetErr } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo,
    });

    if (resetErr) {
      setError(resetErr.message); // Supabase AuthError.message
    } else {
      setError(null);
      alert('Reset link sent. Check your email.');
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <button
        type="button"
        onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        className="absolute top-4 right-4 rounded-xl border border-slate-300 bg-white/70 px-3 py-1.5 text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
        title="Toggle dark mode"
      >
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>

      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-6 text-slate-900 shadow-xl sm:p-8 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100">
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Sign in to your account</p>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>

          <label className="block">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Password
              </span>
              <button
                type="button"
                onClick={sendReset}
                className="text-xs text-slate-500 underline dark:text-slate-400"
              >
                Forgot password?
              </button>
            </div>
            <div className="mt-1.5 flex gap-2">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="rounded-xl border border-slate-200 px-3 dark:border-slate-700"
              >
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-slate-900 dark:border-slate-600 dark:text-slate-100"
              />
              Remember me
            </label>
            <span className="text-xs text-slate-400 dark:text-slate-500">Demo UI</span>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-400/40 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 py-2.5 font-medium text-white disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
