const bcrypt = require('bcrypt');
const Validator = require('validatorjs');

module.exports.hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, parseInt(process.env.SALT_ROUND))
}

module.exports.validateRequest = (req, res, rules = {}, callback = null) => {
  const validation = new Validator(req.body, rules);
  //validation success
  if (validation.passes()) {
    if (callback) {
      return callback(null, req.body);
    }
    return req.body
  }

  if (validation.fails()) {
    if (callback) {
      return callback(validation.errors, false)
    }
    return res.status(412).send({
      success: false,
      message: 'VALIDATION_ERROR',
      errors: validation.errors.errors
    });
  }
}
module.exports.picked = () => {
  return
}
module.exports.pick = (obj, keys) => {
  return keys.map(k => k in obj ? { [k]: obj[k] } : {})
    .reduce((res, o) => Object.assign(res, o), {});
}
module.exports.randomInteger = (min = 0, max = 9999999) => {
	return min + Math.floor((max - min) * Math.random());
}
module.exports.isEmpty = (obj) => {
	Object.keys(obj).length === 0 && obj.constructor === Object
}
