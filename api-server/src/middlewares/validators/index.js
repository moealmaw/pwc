module.exports.UserRegisterValidator = (req, res, next) => {
  const validationRule = {
    "email": "required|string",
    "email": "required|email",
    "password": "required|string|min:6",
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    next();
  });
}
