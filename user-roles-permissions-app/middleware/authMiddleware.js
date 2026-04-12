const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    // Check if header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token missing or malformed',
      })
    }

    // Extract token
    const token = authHeader.split(' ')[1]

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    // Attach user to request
    req.user = decoded.user

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
  }
}

module.exports = { verifyToken }
