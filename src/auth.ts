import { supabase } from './supabaseClient';

export async function login(email: string, password: string): Promise<boolean> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return !error;
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}

export async function isAuthenticated(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

export function onAuthChange(cb: (authed: boolean) => void) {
  // initial
  supabase.auth.getSession().then(({ data }) => cb(!!data.session));
  // subscribe
  const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => cb(!!session));
  return () => sub.subscription.unsubscribe();
}
