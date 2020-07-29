const Users = require('./UserService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthService {
  constructor() {
    this._tokenSecret = process.env.TOKEN_SECRET;
    this._tokenExpiration = '1800s';
  }
  async login({email, password}) {
    const user = await Users.firstByEmail(email);
    // provided email address does not belong to any account
    // OR
    // user found with the provided email, compare provided password with the encrypted password
    if (!user || await this._comparePassword(password, user.password) === false) {
      //invalid login
      throw new Error('Invalid login')
    }
    // valid login
    return {
      user,
      accessToken: this.generateAccessToken(user)
    }
  }
  async _comparePassword(plainPassword, encryptedPassword) {
    return await bcrypt.compare(plainPassword, encryptedPassword).catch(err => false);
  }
  generateAccessToken(user) {
    return jwt.sign({ email: user.email }, this._tokenSecret, { expiresIn: this._tokenExpiration })
  }
}

module.exports = new AuthService();
