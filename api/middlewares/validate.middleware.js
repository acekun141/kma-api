import { HttpException } from "../utils/exceptions/index.js";

const validate = (schema, type="body") => {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };

  return (req, res, next) => {
    console.log(req.body, req.file)
    const { error, value } = schema.validate(req[type], options);
    if (error) {
      const errorMessage = error.details.map(field => field.message).join(', ');
      return next(new HttpException(400, errorMessage));
    }
    req[type] = value;
    return next();
  }
}

export default validate;