import AsyncStorage from '@react-native-async-storage/async-storage';

// No celular físico, use o IP local do computador; no Android Emulator, use 10.0.2.2.
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
const TOKEN_KEY = '@moviehub:access_token';

export async function saveToken(token: string) { await AsyncStorage.setItem(TOKEN_KEY, token); }
export async function removeToken() { await AsyncStorage.removeItem(TOKEN_KEY); }
export async function getToken() { return AsyncStorage.getItem(TOKEN_KEY); }

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (response.status === 204) return undefined as T;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Não foi possível concluir a solicitação.');
  return data as T;
}
