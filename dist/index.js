"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { API_VERSION } from "./utils/version";
const dotenv_1 = require("dotenv");
// import {
//   authRoute,
//   feedRoute,
//   followRoute,
//   profileRoute,
//   uploadRoute,
//   userRoute
// } from "./src/routes";
(0, dotenv_1.config)();
// init 
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.get('/', (_, res) => { res.json({ message: 'Hello, World!' }); });
// app.use(`${API_VERSION}/auth`, authRoute)
// app.use(`${API_VERSION}/`, profileRoute)
// app.use(`${API_VERSION}/`, userRoute)
// app.use(`${API_VERSION}/`, uploadRoute)
// app.use(`${API_VERSION}/`, followRoute)
// app.use(`${API_VERSION}/`, feedRoute)
// listen server
// const HOST = process.env.HOST_APP || '0.0.0.0';
// const PORT = Number(process.env.PORT_APP) || 5050;
// app.listen(PORT, HOST, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
exports.default = app;
