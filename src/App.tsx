// src/App.tsx
import { useEffect, useState } from 'react';
import LoginPage from '@/pages/LoginPage';
import Portfolio from '@/pages/Portfolio';
import ResetPassword from '@/pages/ResetPassword';
import { enableGuest, isGuest, logout, onAuthChange } from '@/lib/auth';
import { tid } from '@/lib/testIds';

function isResetRoute() {
  const base = import.meta.env.BASE_URL || '/';
  const target = base.endsWith('/') ? `${base}reset` : `${base}/reset`;
  return location.pathname === target; // '/reset' in dev, '/porto/reset' in prod
}

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [guest, setGuest] = useState(isGuest());

  useEffect(() => {
    const off = onAuthChange((ok) => {
      setAuthed(ok);
      setGuest(isGuest());
    });
    return off;
  }, []);

  if (isResetRoute()) {
    return (
      <div data-testid={tid.app.viewReset}>
        <ResetPassword />
      </div>
    );
  }

  const handleGuest = () => {
    enableGuest();
    setGuest(true);
    setAuthed(true);
  };

  const handleLogout = async () => {
    await logout();
    setGuest(false);
    setAuthed(false);
  };

  return (
    <div data-testid={tid.app.root}>
      {authed ? (
        <div data-testid={tid.app.viewPortfolio}>
          <Portfolio guest={guest} onLogout={handleLogout} />
        </div>
      ) : (
        <div data-testid={tid.app.viewLogin}>
          <LoginPage onSuccess={() => setAuthed(true)} onGuest={handleGuest} />
        </div>
      )}
    </div>
  );
}
