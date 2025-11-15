import { Router } from 'express';
import { getProfile } from '../../controllers';
import { authorizationMiddleware } from '../../middlewares';

const router = Router();
router.get(`/profile`, authorizationMiddleware, getProfile);

export default router;