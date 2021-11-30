import mongoose from "mongoose";
const { model, Schema } = mongoose;

const UserDetailSchema = new Schema({
  name: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  avatar: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'UserInfo',
    required: true,
  },
});

export default model("UserDetail", UserDetailSchema);