import { UserDetail, UserInfo } from "../models/index.js";
import UserExisted from "../utils/exceptions/user-exist.exception.js";
import bcrypt from "bcrypt";
import HttpException from "../utils/exceptions/http.exception.js";
import jwt from "jsonwebtoken";

const signup = async (username, password, first_name, last_name, military=false) => {
  const user = await UserInfo.findOne({ username });
  if (user) throw new UserExisted(username);
  const hash_password = await bcrypt.hash(password, 10);
  const new_user = await UserInfo.create({ username, hash_password, role: military ? "military" : "civil" });
  const detail = await UserDetail.create({ first_name, last_name, user: new_user._id });
  return true;
};

const signin = async (username, password) => {
  const user = await UserInfo.findOne({ username });
  if (!user) throw new HttpException(404, 'Username or Password is incorrect!');
  const isCorrectPassword = await bcrypt.compare(password, user.hash_password);
  if (!isCorrectPassword) throw new HttpException(404, 'Username or Password is incorrect!');
  
  const tokenPayload = {
    username: user.username,
    role: user.role,
    id: user._id
  };
  // const accessToken = jwt.sign(tokenPayload, process.env.SECRET || 'SECRET', { expiresIn: 60 * 15 });
  const accessToken = jwt.sign(tokenPayload, process.env.SECRET || 'SECRET', { expiresIn: 60 * 60 });
  return accessToken;
}

export default {
  signup,
  signin
}