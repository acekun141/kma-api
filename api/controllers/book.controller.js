import { bookService } from "../services/index.js";

const create = async (req, res, next) => {
  try {
    const { name, type, military, author, publishing_year, number } = req.body;
    const file = req.file;
    const bookId = await  bookService.createBook({ name, type, military, cover: file.filename, author, publishing_year, number });
    return res.json({ bookId });
  } catch (error) {
    next(error);
  }
}

const createEbook = async (req, res, next) => {
  try {
    const { name, type, military, author, publishing_year, number } = req.body;
    const file = req.files[1];
    const cover = req.files[0]
    const bookId = await  bookService.createEBook({ name, type, military, cover: cover.filename, file: file.filename, author, publishing_year, number });
    return res.json({ bookId });
  } catch (error) {
    next(error);
  }
}

const getAll = (props={}) => async (req, res, next) => {
  try {
    const { is_ebook=false, military=false } = props;
    const { _id, nextPage, search, type } = req.query;
    const { books, cursor } = await bookService.getAll({ is_ebook, military, search, bookType: type })({ _id, nextPage });
    return res.json({ books, cursor })
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

const getDetail = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { book, bookDetail, borrows } = await bookService.getDetail(id)
    return res.json({ book: {...book._doc, detail: bookDetail, borrows }});
  } catch (error) {
    next(error);
  }
}

const getSort = async (req, res, next) => {
  try {
    const { books } = await bookService.getAllSort();
    return res.json({ books })
  } catch (error) {
    next(error);
  }
}


export default {
  create,
  edit,
  getAll,
  createEbook,
  getDetail,
  getSort,
}