import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.use(requireAuth);
router.get('/me', async (req, res) => {
  const { data, error } = await req.db!.from('profiles').select('*').eq('id', req.userId).single();
  if (error) return res.status(404).json({ message: error.message });
  return res.json(data);
});
router.put('/me', async (req, res) => {
  const { nome, foto_url } = req.body ?? {};
  const { data, error } = await req.db!.from('profiles').upsert({ id: req.userId, nome, foto_url }).select().single();
  if (error) return res.status(400).json({ message: error.message });
  return res.json(data);
});
export default router;
