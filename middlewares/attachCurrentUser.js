import User from "../model/user.model.js";

async function attachCurrentUser(req, res, next) {
  try {
    const { _id } = req.auth;
    const user = await User.findById(_id, { passwordHash: 0});

    if(!user) {
      return res.status(400).json({error: "Usuário não existe mais."});
    }

    req.currentUser = user;

    next();
  } catch (error) {
    console.log(error);
  }

}

export default attachCurrentUser;