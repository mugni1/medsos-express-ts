import { Router } from "express";
import { deleteFile, uploadFile } from "@/controllers";
import { authorizationMiddleware, handleMulterErrorMiddleware, uploadMiddleware } from "@/middlewares";

const router = Router();
router.post("/upload", authorizationMiddleware, uploadMiddleware.single("file"), handleMulterErrorMiddleware, uploadFile);
router.delete("/delete", authorizationMiddleware, deleteFile);

export default router;
