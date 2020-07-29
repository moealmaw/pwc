
const { LOGIN_TYPE, COMPLAINT_STATUS } = require("../src/constants");
const { randomInteger } = require("../src/Utils");

const SAMPLE_BODY = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam nobis voluptates sequi voluptate, quis esse itaque quasi consequatur. Reiciendis, praesentium.';

const generateComplaint = (user) => {
  const randomStatus = COMPLAINT_STATUS[Object.keys(COMPLAINT_STATUS)[randomInteger(0, 3)]];
  return { title: `Title ${randomInteger()}`, body: SAMPLE_BODY, user_id: user.id, status: randomStatus }
}

// generate complaint seed samples for users
const complaintSamples = (users) => {
  const complaintSamples = [];
  users.forEach(user => {
    Array(randomInteger(2, 6)).fill(null).forEach(_ => {
      complaintSamples.push(generateComplaint(user))
    });
  });
  return complaintSamples;
}

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  knex.schema.raw('TRUNCATE TABLE complaints CASCADE');
    //get normal (non-admin users to seed them with complaints)
  const users = await knex('users').where({ type: LOGIN_TYPE.USER });

  return knex('complaints').insert(complaintSamples(users));
};
