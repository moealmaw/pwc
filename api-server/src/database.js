const { development } = require('../knexfile');
const knex = require('knex');
const connection = knex(development);

const testDBConnection = (callback) => {
  connection.raw('select 1+1 as result').then(function () {
    console.log('? DB Connected');
    callback();
  }).catch(err => {
    console.error("🔴 [ERROR]: Database connection error")
    console.error(err.message)
    process.exit(1)
  });
}

module.exports = {
  connection,
  testDBConnection
}


