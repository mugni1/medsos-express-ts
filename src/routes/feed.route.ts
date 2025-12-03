import { getAllFeeds, getDetailFeedById, getFeedByUserId, postFeed } from '@/controllers';
import { authorizationMiddleware } from '@/middlewares';
import { Router } from 'express';

const router = Router();
router.post("/feed", authorizationMiddleware, postFeed);
router.get("/feed", authorizationMiddleware, getFeedByUserId);
router.get("/feeds", authorizationMiddleware, getAllFeeds);
router.get("/feed/:id", authorizationMiddleware, getDetailFeedById)


export default router;