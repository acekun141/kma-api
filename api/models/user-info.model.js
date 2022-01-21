// import mongoose, { Schema } from "mongoose";
import mongoose from "mongoose";
const { model, Schema } = mongoose;

const UserInfoSchema = new Schema({
  username: { type: String, required: true },
  hash_password: { type: String, required: true },
  role: { type: String, enum: ["admin", "civil", "military"], required: true},
  is_change_password: { type: Boolean, default: false },
  deactivate: { type: Boolean, default: false },
});

export default model('UserInfo', UserInfoSchema);