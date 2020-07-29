const { connection } = require('../database');
const { hashPassword } = require('../utils')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { LOGIN_TYPE } = require('../constants');

module.exports = {
  registerUser: async (req, res) => {
    const userFields = {
      name: req.body.name,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      type: LOGIN_TYPE.USER,
      verified: true
    }
    const user = await connection('users').insert(userFields).catch(err => {
      let errMessage;
      if (err.message.indexOf('Duplicate') >= 0) {
        errMessage = `User already exist with this email address`;
      }
      res.status(400).send({
        error: errMessage || err.message
      })
    });

    res.send({
      user
    });
  },

  loginUser: async (req, res) => {
    const userFields = {
      email: req.body.email,
      password: req.body.password
    }
    const users = await connection('users').select('*').where({ email: userFields.email }).catch(err => {
      res.status(400).send({
        error: err.message
      })
    });
    if (users.length === 0) {
      res.status(400).send({
        error: "Invalid email and/or password"
      });
    }
    // user found with the provided email, compare provided password with the encrypted password
    const comparePassword = await bcrypt.compare(userFields.password, users[0].password);
    //invalid login
    if (comparePassword === false) {
      res.status(400).send({
        error: "Invalid email and/or password"
      });
    }
    // valid login
    const accessToken = () => {
      return jwt.sign({ email: users[0].email }, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
    }
    res.send({
      accessToken: accessToken()
    });
  },
  registerAdmin: async (req, res) => {
    const userFields = {
      name: req.body.name,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      verified: false,
      type: LOGIN_TYPE.ADMIN
    }
    const user = await connection('users').insert(userFields).catch(err => {
      let errMessage;
      if (err.message.indexOf('Duplicate') >= 0) {
        errMessage = `User already exist with this email address`;
      }
      res.status(400).send({
        error: errMessage || err.message
      })
    });

    res.send({
      user
    });
  },
}
