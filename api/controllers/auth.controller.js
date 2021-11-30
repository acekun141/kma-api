import { authService } from "../services/index.js";

const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const accessToken = await authService.signin(username, password);
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    await authService.signup(username, password);
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

export default {
  signin,
  signup
};