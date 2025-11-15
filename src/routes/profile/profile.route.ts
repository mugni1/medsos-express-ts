import { Router } from 'express';
import { getProfile, updateProfile } from '../../controllers';
import { authorizationMiddleware } from '../../middlewares';

const router = Router();
router.get(`/profile`, authorizationMiddleware, getProfile);
router.put(`/profile`, authorizationMiddleware, updateProfile);

export default router;