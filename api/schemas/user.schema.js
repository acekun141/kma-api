import Joi from "joi";

const changePassword = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export default {
  changePassword
}