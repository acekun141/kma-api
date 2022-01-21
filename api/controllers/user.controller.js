import { userService, authService } from "../services/index.js";

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await userService.changePasswordService(req.user.id, currentPassword, newPassword);
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const getInfo = async (req, res, next) => {
  try {
    const { first_name, last_name, user, avatar, is_change_password } = await userService.getInfoService(req.user.id); 
    console.log(is_change_password)
    return res.json({ user: { id: user._id, first_name, last_name, avatar, role: user.role, is_change_password: user.is_change_password } });
  } catch (error) {
    next(error);
  }
}

const addInfo = async (req, res, next) => {
  try {
    const { first_name, last_name, user_id } = req.body;
    await userService.addDetailService(user_id, first_name, last_name);
    return res.sendStatus(201);
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const { search } = req.query;
    const users = await userService.getAllService(search);
    return res.json({ users });
  } catch (error) {
    next(error);
  }
}

const createAccount = async (req, res, next) => {
  try {
    const { username, password, military, first_name, last_name } = req.body;
    await authService.signup(username, password, first_name, last_name, military);
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

export default {
  changePassword,
  getInfo,
  addInfo,
  getAll,
  createAccount,
}