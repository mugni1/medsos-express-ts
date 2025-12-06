import express from "express";
import cors from "cors"
// import { API_VERSION } from "./utils/version";
import { config } from "dotenv";
// import {
//   authRoute,
//   feedRoute,
//   followRoute,
//   profileRoute,
//   uploadRoute,
//   userRoute
// } from "./src/routes";
config()

// init 
const app = express();
app.use(express.json());
app.use(cors())

// routes
app.get('/', (_, res) => { res.json({ message: 'Hello, World!' }) });
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

export default app;
