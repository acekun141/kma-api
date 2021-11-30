import { Router } from "express";
import { authController } from "../controllers/index.js";
import { authSchema } from "../schemas/index.js";
import { validate } from "../middlewares/index.js";

const authRouter = Router();

authRouter.post('/signin', validate(authSchema.signinSchema), authController.signin);
authRouter.post('/signup', validate(authSchema.signupSchema), authController.signup);

export default authRouter;