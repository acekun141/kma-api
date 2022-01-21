import mongoose from "mongoose";
const { model, Schema } = mongoose;

const BookDetailSchema = new Schema({
  is_ebook: { type: Boolean, default: false },
  number: { type: Number, default: 0 },
  publishing_year: { type: Number },
  author: { type: String },
  file: { type: String },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  }
});

export default model('BookDetail', BookDetailSchema);