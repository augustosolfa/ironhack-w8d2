import jwt from "jsonwebtoken";

function generateToken(user) {
  const { _id, email, role } = user;
  const secret = process.env.JWT_SECRET;
  const expiration = "12h";

  return jwt.sign({_id, email, role}, secret, { expiresIn: expiration});
}

export default generateToken;