"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const version_1 = require("./utils/version");
const dotenv_1 = require("dotenv");
const routes_1 = require("./src/routes");
(0, dotenv_1.config)();
// init 
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.get('/', (_, res) => { res.json({ message: 'Hello, World!' }); });
app.use(`${version_1.API_VERSION}/auth`, routes_1.authRoute);
app.use(`${version_1.API_VERSION}/`, routes_1.profileRoute);
app.use(`${version_1.API_VERSION}/`, routes_1.userRoute);
app.use(`${version_1.API_VERSION}/`, routes_1.uploadRoute);
app.use(`${version_1.API_VERSION}/`, routes_1.followRoute);
app.use(`${version_1.API_VERSION}/`, routes_1.feedRoute);
// listen server
// const HOST = process.env.HOST_APP || '0.0.0.0';
// const PORT = Number(process.env.PORT_APP) || 5050;
// app.listen(PORT, HOST, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
exports.default = app;
