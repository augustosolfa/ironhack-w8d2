import { expressjwt } from "express-jwt";

function isAuth() {
  return expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  });
}

export default isAuth;
