import type { NextFunction, Request, Response } from 'express';
import { supabase } from '../lib/supabase.js';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

declare global { namespace Express { interface Request { userId?: string; accessToken?: string; db?: SupabaseClient } } }

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Token não informado.' });
  const token = header.slice(7);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return res.status(401).json({ message: 'Sessão inválida ou expirada.' });
  req.userId = data.user.id;
  req.accessToken = token;
  req.db = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false, autoRefreshToken: false } });
  next();
}
