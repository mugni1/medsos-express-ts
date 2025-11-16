import { Router } from 'express';
import { getProfile, getProfileDetail, updateProfile } from '../../controllers';
import { authorizationMiddleware } from '../../middlewares';

const router = Router();
router.get(`/profile`, authorizationMiddleware, getProfile);
router.get(`/profile-details`, authorizationMiddleware, getProfileDetail);
router.put(`/profile`, authorizationMiddleware, updateProfile);

export default router;