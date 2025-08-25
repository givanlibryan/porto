import React, { useState } from 'react';
import { login } from './auth';

type Props = { onSuccess?: () => void };

export default function LoginPage({ onSuccess }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) return setError('Enter username.');
    if (password.length < 4) return setError('Password must be at least 4 characters.');

    setLoading(true);
    await new Promise(r => setTimeout(r, 400)); // demo delay

    if (login(username.trim(), password)) {
      onSuccess?.();
    } else {
      setError('Invalid username or password.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 grid place-items-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="text-slate-500 text-sm mb-4">Sign in to your account</p>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Username</span>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
            />
          </label>

          <label className="block">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <a href="#" className="text-xs underline text-slate-500">Forgot password?</a>
            </div>
            <div className="mt-1.5 flex gap-2">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="px-3 rounded-xl border border-slate-200"
              >
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-slate-900"
              />
              Remember me
            </label>
            <span className="text-xs text-slate-400">Demo • no API</span>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 text-white font-medium py-2.5 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
