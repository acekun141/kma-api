import mongoose from "mongoose";
import { Borrow, UserInfo, Book } from "../models/index.js";

// const createEBook = async ({ name, type, military, cover, number, publishing_year, author, file }) => {
//   const book = await Book.create({ name, type, military, cover });
//   const bookDetail = await BookDetail.create({ number, publishing_year, author, book: book._id, file, is_ebook: true });
//   return book._id;
// };
  // date: { type: Date, default: Date.now },
  // expire: { type: Date, required: true },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  // book: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Book',
  //   required: true
  // }

const createEvent = async ({ date, expire, book_id, user_code }) => {
  const user = await UserInfo.findOne({ username: user_code });
  const book = await Book.findById(book_id);
  const borrow = await Borrow.create({ date, expire, user: user.id, book: book.id });
  return borrow._id;
};

const getAllEvent = async ({ page, pageSize }) => {
  // const events = await Borrow.find({}).skip(page * pageSize).limit(pageSize);
  const events = await Borrow.aggregate([
    { $lookup: { from: "userinfos", localField: "user", foreignField: "_id", as: "userinfo" }},
    { $unwind: "$userinfo"},
    { $lookup: { from: "books", localField: "book", foreignField: "_id", as: "bookinfo" }},
    { $unwind: "$bookinfo"},
  ]).skip(page * pageSize).limit(+pageSize);
  const total = await Borrow.find({}).count();
  return { events, total };
}

const getByUsername = async ({ page, pageSize, userId }) => {
  const events = await Borrow.aggregate([
    { $lookup: { from: "userinfos", localField: "user", foreignField: "_id", as: "userinfo" }},
    { $unwind: "$userinfo"},
    { $lookup: { from: "books", localField: "book", foreignField: "_id", as: "bookinfo" }},
    { $unwind: "$bookinfo"},
    { $match: { "user": mongoose.Types.ObjectId(userId) } },
  ]).skip(page * pageSize).limit(+pageSize);
  const total = await Borrow.find({ user: userId }).count();
  return { events, total };
}

const editEvent = async ({ date, expire, recieve_date, eventId }) => {
  const event = await Borrow.updateOne(
    { _id: eventId },
    { $set: {
      date, expire, recieve_date
    }}
  );
  return event;
}

const removeEvent = async ({ eventId }) => {
  const event = await Borrow.deleteOne({ _id: eventId });
  return event;
}

export default {
  createEvent,
  getAllEvent,
  getByUsername,
  editEvent,
  removeEvent,
}