const { hashPassword } = require("../src/Utils");
const { LOGIN_TYPE } = require("../src/constants");

exports.seed = async function (knex) {
  knex.schema.raw('TRUNCATE TABLE users CASCADE');
  return knex('users').insert([
    { name: 'Administrator', email: 'admin@pwc-test.com', password: await hashPassword('secret'), type: LOGIN_TYPE.ADMIN, verified: true },
    { name: 'Customer One', email: 'customer-one@pwc-test.com', password: await hashPassword('secret'), type: LOGIN_TYPE.USER },
    { name: 'Customer Two', email: 'customer-two@pwc-test.com', password: await hashPassword('secret'), type: LOGIN_TYPE.USER },
    { name: 'Customer Three', email: 'customer-three@pwc-test.com', password: await hashPassword('secret'), type: LOGIN_TYPE.USER },
  ]);
};
