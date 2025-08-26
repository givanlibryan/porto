// src/App.tsx
import { useEffect, useState } from 'react';
import LoginPage from './LoginPage';
import Portfolio from './pages/Portfolio';
import { logout, onAuthChange } from './auth';

export default function App() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const off = onAuthChange(setAuthed);
    return off;
  }, []);

  return authed ? (
    <Portfolio onLogout={() => logout()} />
  ) : (
    <LoginPage onSuccess={() => setAuthed(true)} />
  );
}
