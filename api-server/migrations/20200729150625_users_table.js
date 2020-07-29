
const { LOGIN_TYPE } = require('../src/constants')

exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.enu('type', [LOGIN_TYPE.USER, LOGIN_TYPE.ADMIN]).defaultTo(LOGIN_TYPE.USER);
    table.boolean('verified').defaultTo(true);
    // table.unique('email');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
