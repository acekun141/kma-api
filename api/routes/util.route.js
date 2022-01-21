import { Router } from "express";
import { utilController } from "../controllers/index.js";
import { utilSchema } from "../schemas/index.js";
import { validate, role } from "../middlewares/index.js";
import passport from "passport";

const utilRouter = Router();

utilRouter.get(
  '/',
  validate(utilSchema.getOptions, "query"),
  utilController.getOptions
);

export default utilRouter;