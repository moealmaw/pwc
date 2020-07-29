const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

module.exports = {
  authenticateToken: (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // if there isn't any token
    if (token == null) {
      return res.sendStatus(401)
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, _user) => {
      if (err) {
        return res.status(403).send({
          error: "TOKEN_INVALID",
          message: err.message
        });
      }
      const user = await UserService.firstByEmail(_user.email);
      if (!user) {
        return res.sendStatus(403).send({
          error: "USER_INVALID"
        });
      }
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
  }
}
