import { Router } from "express";
import { deleteFile, uploadFile } from "../../controllers";
import { handleMulterErrorMiddleware, uploadMiddleware } from "../../middlewares";

const router = Router();
router.post("/upload", uploadMiddleware.single("file"), handleMulterErrorMiddleware, uploadFile);
router.delete("/delete", deleteFile);

export default router;
