import Joi from "joi";

const create = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  military: Joi.boolean().default(false),
  cover: Joi.string(), 
});

const edit = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  military: Joi.boolean().default(false),
  cover: Joi.string(), 
});

export default {
  create,
  edit
}