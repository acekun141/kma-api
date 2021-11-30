import mongoose from "mongoose";
const { model, Schema } = mongoose;

const MessageSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  is_readed: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
  delete_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default model('Message', MessageSchema);