import { expressjwt } from "express-jwt";
import * as dotenv from "dotenv";

dotenv.config();

export default expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
