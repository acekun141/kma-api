import Joi from "joi";

const getOptions = Joi.object({
  type: Joi.string().required(),
});

export default {
  getOptions
}
