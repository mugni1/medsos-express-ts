import { postFeed } from '@/controllers';
import { authorizationMiddleware } from '@/middlewares';
import { Router } from 'express';

const router = Router();
router.post("/feed", authorizationMiddleware, postFeed);


export default router;