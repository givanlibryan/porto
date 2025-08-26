// src/App.tsx
import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import Portfolio from "./pages/Portfolio";
import { isAuthenticated, logout } from "./auth";

export default function App() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  return authed ? (
    <Portfolio onLogout={() => { logout(); setAuthed(false); }} />
  ) : (
    <LoginPage onSuccess={() => setAuthed(true)} />
  );
}
