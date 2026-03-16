const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  const token =
    req.body?.token || req.query?.token || req.headers['authorization']

  if (!token) {
    return res.status(403).json({
      success: false,
      msg: 'A token is required for authentication',
    })
  }

  try {
    let BearerToken = token.split(' ')[1]
    const decodedToken = jwt.verify(
      BearerToken,
      process.env.ACCESS_TOKEN_SECRET,
    )
    req.user = decodedToken.user
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: 'Invalid Token',
    })
  }
  next()
}

module.exports = { verifyToken }
