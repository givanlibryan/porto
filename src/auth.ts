// src/auth.ts
const USERNAME = "admin";
const PASSWORD = "admin123"; // change if you like

export function login(username: string, password: string): boolean {
  if (username === USERNAME && password === PASSWORD) {
    localStorage.setItem("auth", JSON.stringify({ user: USERNAME, ts: Date.now() }));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem("auth");
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("auth");
}

export function getUser(): string | null {
  try {
    return JSON.parse(localStorage.getItem("auth") || "{}").user ?? null;
  } catch {
    return null;
  }
}
