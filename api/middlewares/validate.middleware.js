import { HttpException } from "../utils/exceptions/index.js";

const validate = (schema) => {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };

  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      const errorMessage = error.details.map(field => field.message).join(', ');
      return next(new HttpException(400, errorMessage));
    }
    req.body = value;
    return next();
  }
}

export default validate;