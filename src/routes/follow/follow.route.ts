import { Router } from 'express';
import { authorizationMiddleware } from '../../middlewares';
import { follow } from '../../controllers';

const router = Router();
router.post("/follow", authorizationMiddleware, follow)

export default router;