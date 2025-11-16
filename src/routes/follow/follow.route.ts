import { Router } from 'express';
import { authorizationMiddleware } from '../../middlewares';
import { follow, unfollow } from '../../controllers';

const router = Router();
router.post("/follow/:other_user_id", authorizationMiddleware, follow)
router.delete("/follow/:other_user_id", authorizationMiddleware, unfollow)

export default router;