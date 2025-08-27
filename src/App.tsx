import { useEffect, useState } from 'react';
import LoginPage from './LoginPage';
import Portfolio from './pages/Portfolio';
import ResetPassword from './ResetPassword';
import { logout, onAuthChange } from './auth';

function isResetRoute() {
  const base = import.meta.env.BASE_URL || '/';
  const target = base.endsWith('/') ? `${base}reset` : `${base}/reset`;
  return location.pathname === target; // '/reset' in dev, '/porto/reset' in prod
}

export default function App() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const off = onAuthChange(setAuthed);
    return off;
  }, []);

  if (isResetRoute()) {
    return <ResetPassword />;
  }

  return authed ? (
    <Portfolio onLogout={() => logout()} />
  ) : (
    <LoginPage onSuccess={() => setAuthed(true)} />
  );
}
