import { Router } from 'express';
import { getUserByUsername, getUsers } from '../../controllers';
import { authorizationMiddleware } from '../../middlewares';

const router = Router();
router.get("/user", authorizationMiddleware, getUsers);
router.get("/user/:username", authorizationMiddleware, getUserByUsername);

export default router;