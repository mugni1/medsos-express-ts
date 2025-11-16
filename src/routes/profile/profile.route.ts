import { Router } from 'express';
import { getDetailProfile, getProfile, updateProfile } from '../../controllers';
import { authorizationMiddleware } from '../../middlewares';

const router = Router();
router.get(`/profile`, authorizationMiddleware, getProfile);
router.get(`/profile-details`, authorizationMiddleware, getDetailProfile);
router.put(`/profile`, authorizationMiddleware, updateProfile);

export default router;