import Joi from "joi";

const create = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  military: Joi.boolean().default(false),
  cover: Joi.string(), 
  publishing_year: Joi.number(),
  number: Joi.number(),
  author: Joi.string(),
});

const edit = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  military: Joi.boolean().default(false),
  cover: Joi.string(), 
  publishing_year: Joi.number(),
  number: Joi.number(),
  author: Joi.string(),
});

const getAll = Joi.object({
  nextPage: Joi.number(),
  _id: Joi.string(),
  search: Joi.string().allow(''),
  type: Joi.string().allow('')
})

const getDetail = Joi.object({
  id: Joi.string(),
})

export default {
  create,
  edit,
  getAll,
  getDetail,
}