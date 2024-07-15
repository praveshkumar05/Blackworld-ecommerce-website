import JWT from "jsonwebtoken";
import users from "../models/userModels.js";
export const signInrequire = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    // console.log("decode", decode);
    req.user = decode._id;
    const data = await users.findById(decode._id);

    // console.log("users", data);

    next();
  } catch (error) {
    console.log(error, "some error in signinrequire");
  }
};
export const adminChecker = async (req, res, next) => {

  users.findById(req.user)
    .then((user) => {
      fun(user);
    })
    .catch((error) => {
      console.log(error);
    })

  function fun(user) {
    if (user?.role === 1) next();
    else {
      return res.status(400).json(
        {
          message: "unauthorize access",
          status: "400"
        }
      )
    }
  }
}
