import { borrowService } from "../services/index.js";

const create = async (req, res, next) => {
  try {
    const { date, expire, book_id, user_code } = req.body;
    const eventId = await borrowService.createEvent({ date, expire, book_id, user_code });
    return res.json({ message: "ok" });
  } catch (error) {
    next(error);
  }
}

const getAllBorrow = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    const { events, total } = await borrowService.getAllEvent({ page, pageSize });
    return res.json({ events, total });
  } catch (error) {
    next(error);
  }
}

const getByUsername = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page, pageSize } = req.query;
    const { events, total } = await borrowService.getByUsername({ page, pageSize, userId });
    return res.json({ events, total });
  } catch (error) {
    next(error);
  }
}

const adminGetByUsername = async (req, res, next) => {
  try {
    const { page, pageSize, userId } = req.query;
    const { events, total } = await borrowService.getByUsername({ page, pageSize, userId });
    return res.json({ events, total });
  } catch (error) {
    next(error);
  }
}

const editEvent = async (req, res, next) => {
  try {
    const { date, expire, recieve_date, eventId } = req.body;
    const event = await borrowService.editEvent({ date, expire, recieve_date, eventId });
    return res.json({ message: "ok" });
  } catch (error) {
    next(error);
  }
}

const removeEvent = async (req, res, next) => {
  try {
    const { eventId } = req.body;
    const event = await borrowService.removeEvent({ eventId });
    return res.json({ message: "ok" });
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  getAllBorrow,
  getByUsername,
  adminGetByUsername,
  editEvent,
  removeEvent,
};