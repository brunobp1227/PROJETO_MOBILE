import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.get('/', requireAuth, async (req, res) => {
  const { data, error } = await req.db!.from('genres').select('id,name').order('name');
  if (error) return res.status(500).json({ message: error.message });
  return res.json(data);
});
export default router;
