import { postFeed } from '@/controllers';
import { getFeedByUserId } from '@/controllers/feed.controller';
import { authorizationMiddleware } from '@/middlewares';
import { Router } from 'express';

const router = Router();
router.post("/feed", authorizationMiddleware, postFeed);
router.get("/feed", authorizationMiddleware, getFeedByUserId);


export default router;