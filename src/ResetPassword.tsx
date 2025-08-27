import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { tid } from './testIds';

export default function ResetPassword() {
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const base = import.meta.env.BASE_URL || '/';
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const homeUrl = isLocal ? `${location.protocol}//${location.host}/` : `${location.origin}${base}`;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setHasSession(!!data.session));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (pw1.length < 6) return setErr('Password must be at least 6 characters.');
    if (pw1 !== pw2) return setErr('Passwords do not match.');

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pw1 });
    setLoading(false);

    if (error) setErr(error.message);
    else {
      setMsg('Password updated. Redirecting…');
      setTimeout(() => window.location.replace(homeUrl), 1200);
    }
  }

  if (hasSession === null) {
    return (
      <div
        data-testid={tid.reset.root}
        className="grid min-h-screen place-items-center text-slate-600 dark:text-slate-300"
      >
        Checking session…
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div data-testid={tid.reset.invalid} className="grid min-h-screen place-items-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-xl font-semibold">Invalid reset link</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Please open this page from the password reset link sent to your email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div data-testid={tid.reset.root} className="grid min-h-screen place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
        <h1 className="text-xl font-semibold">Set a new password</h1>

        {err && (
          <div
            data-testid={tid.reset.error}
            className="mt-3 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-800/50 dark:bg-red-900/30 dark:text-red-200"
          >
            {err}
          </div>
        )}
        {msg && (
          <div
            data-testid={tid.reset.notice}
            className="mt-3 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-900/30 dark:text-emerald-200"
          >
            {msg}
          </div>
        )}

        <form data-testid={tid.reset.form} onSubmit={submit} className="mt-4 space-y-3">
          <label className="block text-sm">
            New password
            <input
              data-testid={tid.reset.pw1}
              type="password"
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-slate-200"
            />
          </label>
          <label className="block text-sm">
            Confirm password
            <input
              data-testid={tid.reset.pw2}
              type="password"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-slate-200"
            />
          </label>
          <button
            data-testid={tid.reset.submit}
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 py-2.5 text-white disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900"
          >
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
}
