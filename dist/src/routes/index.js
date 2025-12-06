"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedRoute = exports.followRoute = exports.uploadRoute = exports.userRoute = exports.authRoute = exports.profileRoute = void 0;
const profile_route_1 = __importDefault(require("../routes/profile.route"));
exports.profileRoute = profile_route_1.default;
const auth_route_1 = __importDefault(require("../routes/auth.route"));
exports.authRoute = auth_route_1.default;
const user_route_1 = __importDefault(require("../routes/user.route"));
exports.userRoute = user_route_1.default;
const upload_route_1 = __importDefault(require("../routes/upload.route"));
exports.uploadRoute = upload_route_1.default;
const follow_route_1 = __importDefault(require("../routes/follow.route"));
exports.followRoute = follow_route_1.default;
const feed_route_1 = __importDefault(require("../routes/feed.route"));
exports.feedRoute = feed_route_1.default;
