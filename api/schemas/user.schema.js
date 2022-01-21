import Joi from "joi";

const changePassword = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const addInfo = Joi.object({
  user_id: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required()
})

export default {
  changePassword,
  addInfo
}