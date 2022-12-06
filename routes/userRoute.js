import express, { application } from "express";
import bcrypt from "bcrypt";

import User from "../model/user.model.js";
import generateToken from "../generateToken.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const userRoute = express.Router();
const saltRounds = 10;

userRoute.post("/sign-up", async (req, res) => {
  try {
    const { password } = req.body;
    if (
      !password ||
      !password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/
      )
    ) {
      return res.status(400).json({
        error:
          "A senha deve ter pelo menos um digito, letra maíscula, minúscula e caracter especial, e pelo menos 8 caracteres.",
      });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      ...req.body,
      passwordHash: hashedPassword,
    });
    delete newUser._doc._id;
    delete newUser._doc.__v;
    delete newUser._doc.passwordHash;
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json("Email não cadastrado.");
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      delete user._doc.passwordHash;
      return res.status(200).json(generateToken(user));
    } else {
      return res.status(200).json({ error: "Usuário ou senha inválido." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

userRoute.get("/profile", isAuth, attachCurrentUser,async (req, res) => {
  try {
    return res.status(200).json(req.currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

export default userRoute;
