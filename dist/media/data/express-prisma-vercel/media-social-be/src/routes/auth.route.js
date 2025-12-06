"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post(`/login`, controllers_1.postLogin);
router.post(`/register`, controllers_1.postRegister);
exports.default = router;
