import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
const router = Router();

router.post('/register', async (req, res) => {
  const { email, password, nome } = req.body ?? {};
  if (!email || !password || !nome) return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
  if (String(password).length < 6) return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { nome } } });
  if (error) return res.status(400).json({ message: error.message });
  return res.status(201).json({ message: 'Cadastro realizado. Verifique seu e-mail se a confirmação estiver ativada.', user: data.user, session: data.session });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.session) return res.status(401).json({ message: error?.message ?? 'Não foi possível entrar.' });
  return res.status(200).json({ user: data.user, session: data.session });
});

router.post('/logout', async (_req, res) => {
  // A sessão é removida do armazenamento local pelo aplicativo.
  return res.status(200).json({ message: 'Sessão encerrada.' });
});
export default router;
