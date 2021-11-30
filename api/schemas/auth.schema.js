import Joi from "joi";

const signinSchema = Joi.object({
  username: Joi.string().min(8).required(),
  password: Joi.string().min(6).required(),
});

const signupSchema = Joi.object({
  username: Joi.string().min(8).required(),
  password: Joi.string().min(6).required(),
});

export default {
  signinSchema,
  signupSchema,
};