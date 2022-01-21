import { Router } from "express";
import { role } from "../middlewares/index.js";
import passport from "passport";
import { borrowController } from "../controllers/index.js";

const borrowRouter = Router();

borrowRouter.post('/',
  passport.authenticate('jwt'),
  role(['admin']),
  borrowController.create,
);
borrowRouter.get(
  '/',
  passport.authenticate('jwt'),
  role(['admin']),
  borrowController.getAllBorrow,
);
borrowRouter.get(
  '/my',
  passport.authenticate('jwt'),
  borrowController.getByUsername,
);
borrowRouter.get(
  '/admin',
  passport.authenticate('jwt'),
  role(['admin']),
  borrowController.adminGetByUsername,
);
borrowRouter.put(
  '/',
  passport.authenticate('jwt'),
  role(['admin']),
  borrowController.editEvent,
);
borrowRouter.post(
  '/delete',
  passport.authenticate('jwt'),
  role(['admin']),
  borrowController.removeEvent,
);

export default borrowRouter;

