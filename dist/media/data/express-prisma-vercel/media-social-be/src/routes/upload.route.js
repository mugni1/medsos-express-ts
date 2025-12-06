"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post("/upload", middlewares_1.authorizationMiddleware, middlewares_1.uploadMiddleware.single("file"), middlewares_1.handleMulterErrorMiddleware, controllers_1.uploadFile);
router.delete("/delete", middlewares_1.authorizationMiddleware, controllers_1.deleteFile);
exports.default = router;
