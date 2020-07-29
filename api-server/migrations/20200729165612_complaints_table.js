
const { COMPLAINT_STATUS } = require('../src/constants')

exports.up = function (knex) {
  return knex.schema.createTable('complaints', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.text('body').notNullable();
    table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
    table.enu('status', [
      COMPLAINT_STATUS.PENDING,
      COMPLAINT_STATUS.RESOLVED,
      COMPLAINT_STATUS.DISMISSED
    ]).defaultTo(COMPLAINT_STATUS.PENDING);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('complaints');
};
