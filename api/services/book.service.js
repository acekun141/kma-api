import mongoose from "mongoose";
import { Book, BookDetail, Borrow } from "../models/index.js";

const createEBook = async ({ name, type, military, cover, number, publishing_year, author, file }) => {
  const book = await Book.create({ name, type, military, cover });
  const bookDetail = await BookDetail.create({ number, publishing_year, author, book: book._id, file, is_ebook: true });
  return book._id;
};

const createBook = async ({ name, type, military, cover, number, publishing_year, author }) => {
  const book = await Book.create({ name, type, military, cover });
  const bookDetail = await BookDetail.create({ number, publishing_year, author, book: book._id });
  return book._id;
};

const getAll = ({ is_ebook=false, military=false, search='', bookType='' }) => async (cursor = null) => {
  const name = { $regex: search, $options: 'i' }
  const type = { $regex: bookType }
  const perPage = 10;
  if (!cursor || !cursor._id) {
    const books = await Book.aggregate([
      { $lookup: { from: "bookdetails", localField: "_id", foreignField: "book", as: "detail" }},
      { $unwind: "$detail"},
      { $match: { "detail.is_ebook": is_ebook, military: military, name, type }}
    ]).sort({ _id: -1}).limit(perPage);
    if (books.length) {
      const lastId = books[books.length - 1]._id
      const listNextBook = await Book.aggregate([
        { $lookup: { from: "bookdetails", localField: "_id", foreignField: "book", as: "detail" }},
        { $unwind: "$detail"},
        { $match: { "detail.is_ebook": is_ebook, military: military, name, type, _id: { $lt: mongoose.Types.ObjectId(lastId) } }}
        ]).sort({ _id: -1 }).limit(perPage);
      const newCursor = { _id: lastId }
      return { books, cursor: listNextBook.length ? newCursor : null };
    }
    return { books };
  }
  const books = await Book.aggregate([
    { $lookup: { from: "bookdetails", localField: "_id", foreignField: "book", as: "detail" }},
    { $unwind: "$detail"},
    { $match: { "detail.is_ebook": is_ebook, military: military, name, type, _id: { $lt: mongoose.Types.ObjectId(cursor._id) } }}
  ]).sort({ _id: -1 }).limit(perPage);
  if (books.length) {
    const lastId = books[books.length - 1]._id
    const listNextBook = await Book.aggregate([
      { $lookup: { from: "bookdetails", localField: "_id", foreignField: "book", as: "detail" }},
      { $unwind: "$detail"},
      { $match: { "detail.is_ebook": is_ebook, military: military, name, type, _id: { $lt: mongoose.Types.ObjectId(lastId) } }}
      ]).sort({ _id: -1 }).limit(perPage);
    const newCursor = { _id: lastId }
    return { books, cursor: listNextBook.length ? newCursor : null };
  }
  return { books };
}

const getAllSort = async () => {
  const books = await Book.aggregate([
    { $lookup: { from: "borrows", localField: "_id", foreignField: "book", as: "borrows" }},
    { $unwind: "$borrows"},
    { $group: { _id: "$_id", name: { $first: "$name" }, borrows: { $push: "$borrows" }, size: { $sum:1 }}}, 
    { $lookup: { from: "bookdetails", localField: "_id", foreignField: "book", as: "detail" }},
    { $unwind: "$detail"},
    { $sort: { size: -1 }}
  ])
  return { books };
}

const getDetail = async (id) => {
  const book = await Book.findOne({ _id: id });
  const bookDetail = await BookDetail.findOne({ book: id });
  const borrows = await Borrow.find({ book: id });
  return { book, bookDetail, borrows }
}

export default {
  createBook,
  createEBook,
  getAll,
  getDetail,
  getAllSort
}