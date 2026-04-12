const isAdmin = (req, res, next) => {
  try {
    // Check if user exists (set by auth middleware)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No user found',
      })
    }

    // Check admin role
    if (req.user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You don't have permission to access this route",
      })
    }

    // If everything is fine
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    })
  }
}

module.exports = { isAdmin }
