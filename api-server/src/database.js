const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port: 13003,
    user : 'root',
    password : 'p4ssw0rd',
    database : 'pwc'
  }
});

module.exports = {
  connection: knex
}


