import express from "express";
import { API_VERSION } from "utils/api-version";
import { config } from "dotenv";
import {
  authRoute,
  followRoute,
  profileRoute,
  uploadRoute,
  userRoute
} from "@/routes";
config()

// init 
const app = express();
app.use(express.json());

// routes
app.get('/', (_, res) => { res.json({ message: 'Hello, World!' }) });
app.use(`${API_VERSION}/auth`, authRoute)
app.use(`${API_VERSION}/`, profileRoute)
app.use(`${API_VERSION}/`, userRoute)
app.use(`${API_VERSION}/`, uploadRoute)
app.use(`${API_VERSION}/`, followRoute)

// listen server
const HOST = process.env.HOST_APP || '0.0.0.0';
const PORT = Number(process.env.PORT_APP) || 5050;
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
});
