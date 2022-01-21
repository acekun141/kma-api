import constants from "../constants/index.js";

const getOptions = async (req, res, next) => {
  try {
    const { type } = req.query;
    switch (type) {
      case "BOOK_TYPES":
        return res.json({ options: constants.BOOK_TYPES });
      default:
        return res.json({ options: [] });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  getOptions
}
