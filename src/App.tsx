import { useEffect, useState } from 'react';
import LoginPage from './LoginPage';
import Portfolio from './pages/Portfolio';
import ResetPassword from './ResetPassword';
import { enableGuest, isGuest, logout, onAuthChange } from './auth';

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
    return <ResetPassword />;
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

  return authed ? (
    <Portfolio guest={guest} onLogout={handleLogout} />
  ) : (
    <LoginPage onSuccess={() => setAuthed(true)} onGuest={handleGuest} />
  );
}
