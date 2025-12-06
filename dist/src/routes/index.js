"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedRoute = exports.followRoute = exports.uploadRoute = exports.userRoute = exports.authRoute = exports.profileRoute = void 0;
var profile_route_1 = require("./profile.route");
Object.defineProperty(exports, "profileRoute", { enumerable: true, get: function () { return __importDefault(profile_route_1).default; } });
var auth_route_1 = require("./auth.route");
Object.defineProperty(exports, "authRoute", { enumerable: true, get: function () { return __importDefault(auth_route_1).default; } });
var user_route_1 = require("./user.route");
Object.defineProperty(exports, "userRoute", { enumerable: true, get: function () { return __importDefault(user_route_1).default; } });
var upload_route_1 = require("./upload.route");
Object.defineProperty(exports, "uploadRoute", { enumerable: true, get: function () { return __importDefault(upload_route_1).default; } });
var follow_route_1 = require("./follow.route");
Object.defineProperty(exports, "followRoute", { enumerable: true, get: function () { return __importDefault(follow_route_1).default; } });
var feed_route_1 = require("./feed.route");
Object.defineProperty(exports, "feedRoute", { enumerable: true, get: function () { return __importDefault(feed_route_1).default; } });
