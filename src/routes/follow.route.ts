import { Router } from 'express';
import { authorizationMiddleware } from '../middlewares';
import { follow, unfollow, getFollowers } from '../controllers';
import { getFollowings } from '../controllers/follow.controller';

const router = Router();
router.get("/followers", authorizationMiddleware, getFollowers)
router.get("/followings", authorizationMiddleware, getFollowings)
router.post("/follow/:otherUserId", authorizationMiddleware, follow)
router.delete("/follow/:otherUserId", authorizationMiddleware, unfollow)

export default router;