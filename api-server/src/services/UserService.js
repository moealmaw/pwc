const { connection } = require('../database');
const { LOGIN_TYPE } = require('../constants');
const { hashPassword } = require('../Utils');

class UserService {
  /**
   * Find single user by email field
   * @param {string} email
   */
  async firstByEmail(email) {
    const user = await connection('users').select('*').where({ email: email }).limit(1).catch(err => null);
    if (user && user.length) {
      return user[0];
    }
    return null;
  }
  /**
   * Create a normal user
   * @param {name: string, email: string, password: string} param0
   */
  async createUser({ name, email, password }) {
    const userFields = {
      name,
      email,
      password: await hashPassword(password),
      type: LOGIN_TYPE.USER,
      verified: true
    }
    if(await this.firstByEmail(email)) {
      throw new Error(`User already exist with this email address`);
    }
    return await connection('users').insert(userFields);
  }
  /**
   * Create a normal user
   * @param {name: string, email: string, password: string} param0
   */
  async createAdmin({ name, email, password }) {
    const userFields = {
      name,
      email,
      password: await hashPassword(password),
      type: LOGIN_TYPE.ADMIN,
      verified: false
    }
    if(await this.firstByEmail(email)) {
      throw new Error(`User already exist with this email address`);
    }
    return await connection('users').insert(userFields);
  }
}

module.exports = new UserService();
