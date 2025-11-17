import { Router } from 'express';
import { getUserByUsername, getUsers, getRandomUsers } from '@/controllers';
import { authorizationMiddleware } from '@/middlewares';

const router = Router();
router.get("/user", authorizationMiddleware, getUsers);
router.get("/user-random", authorizationMiddleware, getRandomUsers);
router.get("/user/:username", authorizationMiddleware, getUserByUsername);

export default router;