import Validator from 'validatorjs';

const errorMessages = {
  required: 'this field is required',
  alpha: 'this field can only be alphabets',
  email: 'your email is not valid',
  min: 'this field should be at least eight characters long',
  alpha_num: 'this field should contain alphabets and numbers',
  numeric: 'this field can only be numeric characters',
  string: 'this field should be a string',
  url: 'the url parsed is not valid',
};

const validateRequestCredentials = (req, res, next, rule) => {
  const validation = new Validator(req.body, rule, errorMessages);
  if (validation.passes()) {
    return next();
  }
  const errors = validation.errors.all();
  return res.status(400).json({
    message: 'Invalid Credentials',
    errors,
  });
};

export const validateContactCreation = (req, res, next) => {
  const rule = {
    name: 'required|string',
    phoneNumber: 'required|string|size:11',
  };

  return validateRequestCredentials(req, res, next, rule);
};

export const validateSmsCreation = (req, res, next) => {
  const rule = { message: 'required|string' };
  return validateRequestCredentials(req, res, next, rule);
};
