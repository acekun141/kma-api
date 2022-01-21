import Joi from "joi";

const signinSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const signupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default {
  signinSchema,
  signupSchema,
};