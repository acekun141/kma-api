import { UserInfo, UserDetail } from "../models/index.js";
import HttpException from "../utils/exceptions/http.exception.js";
import bcrypt from "bcrypt";


const getInfoService = async (id) => {
  const userDetail = await UserDetail.findOne({ user: id }).populate({
    path: 'user',
    select: 'username role is_change_password'
  });
  return userDetail;
}

const addDetailService = async (id, first_name, last_name) => {
  const userInfo = await UserInfo.findById(id);
  if (!userInfo) throw new HttpException(404, "User does not existed");
  const userDetail = await UserDetail.create({ user: id, first_name, last_name });
  return userDetail;
}

const changePasswordService = async (id, old_password, password) => {
  const user = await UserInfo.findById(id);
  if (!user) throw new HttpException(404, 'User does not existed');
  const isCorrectPassword = await bcrypt.compare(old_password, user.hash_password);
  if (!isCorrectPassword) throw new HttpException(404, 'Old password is incorrect!');

  const hash_password = await bcrypt.hash(password, 10);
  const result = await UserInfo.updateOne({ _id: id }, { $set: { hash_password, is_change_password: true } });
  return result;
}

const getAllService = async (search="") => {
  const name = { $regex: search, $options: 'i' }
  const users = await UserInfo.aggregate([
    { $lookup: { from: "userdetails", localField: "_id", foreignField: "user", as: "detail" }},
    { $unwind: "$detail"},
    { $match: { role: { $ne: "admin" }, username: name }},
    { $unset: ["hash_password"] }
  ])
  return users;
}

export default {
  getInfoService,
  addDetailService,
  changePasswordService,
  getAllService,
}