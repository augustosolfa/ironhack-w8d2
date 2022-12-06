import express from "express";
import * as dotenv from "dotenv";

import connect from "./db_connect.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
connect();

const app = express();
app.use(express.json());

app.use("/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`URL: http://localhost:${process.env.PORT}`);
});
