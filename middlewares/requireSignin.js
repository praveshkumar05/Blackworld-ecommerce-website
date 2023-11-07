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
  try {
    const user = await users.findById(req.user);
    if (user?.role === 1) next();
    else {
      return res.status(400).send(
        {
          message: "unauthorize access",
          status: "400"
        }
      )
    }
  }catch (error) {
    console.log(error);
  }
}
