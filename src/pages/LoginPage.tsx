import { useEffect, useState } from 'react';
import { login } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import { tid } from '@/lib/testIds';

type Props = { onSuccess?: () => void; onGuest?: () => void };

export default function LoginPage({ onSuccess, onGuest }: Props) {
  // theme toggle
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  );
  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // surface any supabase hash errors
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(location.hash.slice(1));
    const msg = params.get('error_description');
    if (msg) setError(decodeURIComponent(msg.replace(/\+/g, ' ')));
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
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
    const redirectTo = `${location.origin}${base}reset`;
    const { error: resetErr } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo,
    });
    if (resetErr) setError(resetErr.message);
    else {
      setError(null);
      alert('Reset link sent. Check your email.');
    }
  }

  return (
    <div
      data-testid={tid.login.root}
      className="from-brand-50 to-brand-100 dark:from-brand-950 dark:via-brand-900 dark:to-brand-900 grid min-h-screen place-items-center bg-gradient-to-br via-white p-4"
    >
      <button
        data-testid={tid.login.themeToggle}
        type="button"
        onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        className="border-brand-300 text-brand-800 dark:border-brand-700 dark:bg-brand-800/70 dark:text-brand-100 absolute top-4 right-4 rounded-xl border bg-white/70 px-3 py-1.5"
        title="Toggle dark mode"
      >
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>

      <div
        data-testid={tid.login.card}
        className="border-brand-200 text-brand-900 dark:border-brand-700 dark:bg-brand-900/70 dark:text-brand-100 w-full max-w-md rounded-2xl border bg-white/80 p-6 shadow-xl sm:p-8"
      >
        <h1 data-testid={tid.login.title} className="text-xl font-semibold">
          Welcome back
        </h1>
        <p
          data-testid={tid.login.subtitle}
          className="text-brand-600 dark:text-brand-300 mb-4 text-sm"
        >
          Sign in to your account
        </p>

        <form data-testid={tid.login.form} onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-brand-800 dark:text-brand-100 text-sm font-medium">Email</span>
            <input
              data-testid={tid.login.email}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="border-brand-200 text-brand-900 focus:ring-brand-600 dark:border-brand-700 dark:bg-brand-800 dark:text-brand-100 dark:focus:ring-brand-300 mt-1.5 w-full rounded-xl border bg-white px-3 py-2 outline-none focus:ring-2"
            />
          </label>

          <label className="block">
            <div className="flex items-center justify-between">
              <span className="text-brand-800 dark:text-brand-100 text-sm font-medium">
                Password
              </span>
              <button
                data-testid={tid.login.forgot}
                type="button"
                onClick={sendReset}
                className="text-brand-600 dark:text-brand-300 text-xs underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="mt-1.5 flex gap-2">
              <input
                data-testid={tid.login.password}
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="border-brand-200 text-brand-900 focus:ring-brand-600 dark:border-brand-700 dark:bg-brand-800 dark:text-brand-100 dark:focus:ring-brand-300 w-full rounded-xl border bg-white px-3 py-2 outline-none focus:ring-2"
              />
              <button
                data-testid={tid.login.showPassword}
                type="button"
                onClick={() => setShow((s) => !s)}
                className="border-brand-200 text-brand-800 dark:border-brand-700 dark:text-brand-100 rounded-xl border px-3"
              >
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <div className="flex items-center justify-between">
            <label className="text-brand-700 dark:text-brand-200 inline-flex items-center gap-2 text-sm">
              <input
                data-testid={tid.login.remember}
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="border-brand-300 text-brand-700 dark:border-brand-600 dark:text-brand-100 h-4 w-4 rounded"
              />
              Remember me
            </label>
          </div>

          {error && (
            <div
              data-testid={tid.login.error}
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-400/40 dark:bg-red-950/40 dark:text-red-200"
            >
              {error}
            </div>
          )}

          <button
            data-testid={tid.login.submit}
            type="submit"
            disabled={loading}
            className="bg-brand-700 dark:bg-brand-100 dark:text-brand-900 w-full rounded-xl py-2.5 font-medium text-white disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <button
            data-testid={tid.login.guest}
            type="button"
            onClick={onGuest}
            className="border-brand-300 text-brand-800 dark:border-brand-700 dark:text-brand-100 mt-2 w-full rounded-xl border py-2.5"
          >
            Continue as guest
          </button>
          <p
            data-testid={tid.login.notice}
            className="text-brand-600 dark:text-brand-300 mt-2 text-center text-xs"
          >
            Guests can browse only. Actions that change data require sign in.
          </p>
        </form>
      </div>
    </div>
  );
}
