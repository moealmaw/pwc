const { body, validationResult } = require('express-validator');

module.exports = {
  list: async (req, res) => {
    res.send({
      user: req.user
    });
  },
  store: async (req, res) => {
    // title
    // body
    // timestamp
    // default status
    // user_id

  }
}
