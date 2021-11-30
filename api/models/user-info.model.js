// import mongoose, { Schema } from "mongoose";
import mongoose from "mongoose";
const { model, Schema } = mongoose;

const UserInfoSchema = new Schema({
  username: { type: String, required: true },
  hash_password: { type: String, required: true },
  role: { type: String, enum: ["admin", "civil", "military"], required: true},
  deactivate: { type: Boolean, default: false },
});

export default model('UserInfo', UserInfoSchema);