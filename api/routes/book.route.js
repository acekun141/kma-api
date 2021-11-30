import { Router } from "express";
import { bookController } from "../controllers/index.js";
import passport from "passport";
import { validate, role } from "../middlewares/index.js";
import { bookSchema } from "../schemas/index.js";


const book = Router();

book.post(
  '/',
  validate(bookSchema.create),
  passport.authenticate('jwt'),
  role(['admin']),
  bookController.create
);

book.put(
  '/:bookId',
  validate(bookSchema.edit),
  passport.authenticate('jwt'),
  role(['admin']),
  bookController.edit
)

export default book;