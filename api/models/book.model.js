import mongoose from "mongoose";
const { model, Schema } = mongoose;

const BookSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  military: { type: Boolean, default: false },
  cover: { type: String },
  createAt: { type: Date, default: Date.now() }
});

export default model('Book', BookSchema);