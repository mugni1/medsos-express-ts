import { getAllFeeds, getDetailFeedById, getFeedByUserId, postFeed, deleteFeedById } from '../controllers';
import { authorizationMiddleware } from '../middlewares';
import { Router } from 'express';

const router = Router();
router.post("/feed", authorizationMiddleware, postFeed);
router.get("/feed", authorizationMiddleware, getFeedByUserId);
router.get("/feeds", authorizationMiddleware, getAllFeeds);
router.get("/feed/:id", authorizationMiddleware, getDetailFeedById)
router.delete("/feed/:id", authorizationMiddleware, deleteFeedById)

export default router;