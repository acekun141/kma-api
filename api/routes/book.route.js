import { Router } from "express";
import { bookController } from "../controllers/index.js";
import passport from "passport";
import { validate, role } from "../middlewares/index.js";
import { bookSchema } from "../schemas/index.js";
import multer from "multer";
import { storage } from "../utils/filesaver.js";

const upload = multer({ storage: storage })
const book = Router();

book.post(
  '/',
  upload.single("cover"),
  validate(bookSchema.create),
  passport.authenticate('jwt'),
  role(['admin']),
  bookController.create
);

book.post(
  '/ebook',
  upload.any(),
  passport.authenticate('jwt'),
  role(['admin']),
  bookController.createEbook
)

book.get(
  '/',
  validate(bookSchema.getAll, "query"),
  passport.authenticate('jwt'),
  bookController.getAll()
)
book.get(
  '/sort',
  passport.authenticate('jwt'),
  bookController.getSort
)

book.get(
  '/detail',
  validate(bookSchema.getDetail, "query"),
  passport.authenticate('jwt'),
  bookController.getDetail
)

book.get(
  '/ebook',
  validate(bookSchema.getAll, "query"),
  // passport.authenticate('jwt'),
  bookController.getAll({ is_ebook: true })
)

book.get(
  '/military',
  validate(bookSchema.getAll, "query"),
  // passport.authenticate('jwt'),
  bookController.getAll({ military: true })
)

book.get(
  '/military/ebook',
  validate(bookSchema.getAll, "query"),
  // passport.authenticate('jwt'),
  bookController.getAll({ military: true, is_ebook: true })
)

book.put(
  '/:bookId',
  validate(bookSchema.edit),
  passport.authenticate('jwt'),
  role(['admin']),
  bookController.edit
)

export default book;