import { Router } from 'express';
import { authorizationMiddleware } from '../../middlewares';
import { follow, unfollow } from '../../controllers';

const router = Router();
router.post("/follow/:otherUserId", authorizationMiddleware, follow)
router.delete("/follow/:otherUserId", authorizationMiddleware, unfollow)

export default router;