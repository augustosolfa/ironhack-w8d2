import express, { application } from "express";
import bcrypt from "bcrypt";

import User from "../model/user.model.js";

const userRoute = express.Router();
const saltRounds = 10;

userRoute.post("/sign-up", async (req, res) => {
  try {
  const { password } = req.body;
  if(!password || !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/)) {
    return res.status(400).json({error: "A senha deve ter pelo menos um digito, letra maíscula, minúscula e caracter especial, e pelo menos 8 caracteres."})
  }
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({...req.body, passwordHash: hashedPassword});
  delete newUser._doc._id;
  delete newUser._doc.__v;
  delete newUser._doc.passwordHash;
  return res.status(201).json(newUser)
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error});
  }
})

export default userRoute;