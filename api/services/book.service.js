import { Book } from "../models/index.js";

const createBook = async ({ name, type, military, cover }) => {
  const book = await Book.create({ name, type, military, cover });
  return book._id;
};

export default {
  createBook
}