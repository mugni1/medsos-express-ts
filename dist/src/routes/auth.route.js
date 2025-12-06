import { Router } from 'express';
import { postLogin, postRegister } from '@/controllers';
const router = Router();
router.post(`/login`, postLogin);
router.post(`/register`, postRegister);
export default router;
