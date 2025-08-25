// src/App.tsx
import { Suspense, useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import { isAuthenticated, logout } from "./auth";

const Portfolio = /* lazy import */ 
  (await import("react")).default.lazy(() => import("./pages/Portfolio"));
// If top-level await isn’t enabled in your setup, use the classic form:
 // const Portfolio = React.lazy(() => import("./pages/Portfolio"));

export default function App() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => { setAuthed(isAuthenticated()); }, []);

  return authed ? (
    <Suspense fallback={<div className="p-8">Loading…</div>}>
      <Portfolio onLogout={() => { logout(); setAuthed(false); }} />
    </Suspense>
  ) : (
    <LoginPage onSuccess={() => setAuthed(true)} />
  );
}
