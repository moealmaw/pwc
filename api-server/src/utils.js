const bcrypt = require('bcrypt');
const Validator = require('validatorjs');

module.exports.hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, parseInt(process.env.SALT_ROUND))
}


const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

module.exports.validator = validator;
