import mongoose from "mongoose";
const { model, Schema } = mongoose;

const BorrowSchema = new Schema({
  date: { type: Date, default: Date.now },
  expire: { type: Date, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  }
});

export default model('Borrow', BorrowSchema);