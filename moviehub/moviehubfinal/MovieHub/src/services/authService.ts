import { api, removeToken, saveToken } from './api';

export async function login(email: string, password: string) {
  const result = await api<{ session: { access_token: string } | null; user: any }>('/auth/login', {
    method: 'POST', body: JSON.stringify({ email, password }),
  });
  if (!result.session?.access_token) throw new Error('O Supabase não retornou uma sessão. Confira a confirmação do e-mail.');
  await saveToken(result.session.access_token);
  return result.user;
}

export async function register(nome: string, email: string, password: string) {
  const result = await api<{ session: { access_token: string } | null; message: string }>('/auth/register', {
    method: 'POST', body: JSON.stringify({ nome, email, password }),
  });
  if (result.session?.access_token) await saveToken(result.session.access_token);
  return result;
}

export async function logout() { await removeToken(); }
