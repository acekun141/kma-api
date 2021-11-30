import { Router } from "express";
import { userController } from "../controllers/index.js";
import { userSchema } from "../schemas/index.js";
import { validate, role } from "../middlewares/index.js";
import passport from "passport";

const userRouter = Router();

userRouter.post(
  '/change-password',
  passport.authenticate('jwt'),
  role(['admin']),
  validate(userSchema.changePassword),
  userController.changePassword
);

export default userRouter;
