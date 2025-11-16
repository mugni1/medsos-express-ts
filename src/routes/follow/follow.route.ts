import { Router } from 'express';
import { authorizationMiddleware } from '../../middlewares';
import { follow } from '../../controllers';

const router = Router();
router.post("/follow/:other_user_id", authorizationMiddleware, follow)
router.delete("/follow/:other_user_id", authorizationMiddleware, follow)

export default router;