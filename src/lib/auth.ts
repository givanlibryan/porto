import { supabase } from '@/lib/supabaseClient';

const GUEST_KEY = 'guest_mode';

// --- Guest helpers ---
export function enableGuest() {
  localStorage.setItem(GUEST_KEY, '1');
}
export function disableGuest() {
  localStorage.removeItem(GUEST_KEY);
}
export function isGuest() {
  return localStorage.getItem(GUEST_KEY) === '1';
}

// --- Auth helpers you already had ---
export async function login(email: string, password: string): Promise<boolean> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return !error;
}

export async function logout(): Promise<void> {
  // clear both real session and guest flag
  disableGuest();
  await supabase.auth.signOut();
}

export async function isAuthenticated(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return !!data.session || isGuest();
}

export function onAuthChange(cb: (authed: boolean) => void) {
  const fire = async () => {
    const { data } = await supabase.auth.getSession();
    cb(!!data.session || isGuest());
  };

  // initial
  fire();

  // subscribe to supabase session changes
  const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
    cb(!!session || isGuest());
  });

  // react to guest flag changes (e.g., another tab)
  const onStorage = (e: StorageEvent) => {
    if (e.key === GUEST_KEY) fire();
  };
  window.addEventListener('storage', onStorage);

  return () => {
    sub?.subscription.unsubscribe();
    window.removeEventListener('storage', onStorage);
  };
}
