const { validateRequest, pick } = require('../utils')
const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');

const VISIBLE_FIELDS = ['id', 'name', 'email', 'verified', 'type'];


const AuthController = {
  registerUser: async (req, res) => {
    const { name, email, password } = validateRequest(req, res, {
      name: 'required|string',
      email: 'required|email',
      password: 'required|string'
    });
    try {
      await UserService.createUser({
        name,
        email,
        password,
      });
      const login = await AuthService.login({ email, password });
      res.send({
        user: pick(login.user, VISIBLE_FIELDS),
        accessToken: login.accessToken
      });
    } catch (error) {
      res.status(400).send({
        error: error.message
      })
    }
  },
  // handles user login
  loginUser: async (req, res) => {
    const { email, password } = validateRequest(req, res, {
      email: 'required|email',
      password: 'required|string'
    });
    try {
      const login = await AuthService.login({ email, password });
      res.send({
        user: pick(login.user, VISIBLE_FIELDS),
        accessToken: login.accessToken
      });
    } catch (error) {
      res.status(401).send({
        error: error.message
      });
    }
  },
  // handles admin register
  registerAdmin: async (req, res) => {
    const { name, email, password } = validateRequest(req, res, {
      name: 'required|string',
      email: 'required|email',
      password: 'required|string'
    });
    try {
      await UserService.createAdmin({
        name,
        email,
        password,
      });
      const login = await AuthService.login({ email, password });
      res.send({
        user: pick(login.user, VISIBLE_FIELDS),
        accessToken: login.accessToken
      });
    } catch (error) {
      res.status(400).send({
        error: error.message
      })
    }
  },
}

module.exports = AuthController
