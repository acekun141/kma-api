import { Router } from "express";
import { userController } from "../controllers/index.js";
import { userSchema } from "../schemas/index.js";
import { validate, role } from "../middlewares/index.js";
import passport from "passport";

const userRouter = Router();

userRouter.post(
  '/change-password',
  passport.authenticate('jwt'),
  validate(userSchema.changePassword),
  userController.changePassword
);
userRouter.post(
  '/',
  passport.authenticate('jwt'),
  role(['admin']),
  userController.createAccount
)
userRouter.get(
  '/',
  passport.authenticate('jwt'),
  userController.getInfo
);
userRouter.post(
  '/add-info',
  passport.authenticate('jwt'),
  role(['admin']),
  validate(userSchema.addInfo),
  userController.addInfo
)
userRouter.get(
  '/all',
  passport.authenticate("jwt"),
  role(['admin']),
  userController.getAll
)

export default userRouter;
