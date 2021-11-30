import { bookService } from "../services/index.js";

const create = async (req, res, next) => {
  try {
    const { name, type, military, cover } = req.body;
    const bookId = await  bookService.createBook({ name, type, military, cover });
    return res.json({ bookId });
  } catch (error) {
    next(error);
  }
}

const edit = (req, res, next) => {
  try {
    const { bookId } = req.params;
    res.json({ bookId });
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  edit
}