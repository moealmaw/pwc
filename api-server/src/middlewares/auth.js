const jwt = require('jsonwebtoken');

module.exports = {
  authenticateToken: (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // if there isn't any token
    if (token == null) {
       return res.sendStatus(401)
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
  }
}
