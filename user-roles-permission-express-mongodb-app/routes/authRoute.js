const express = require('express')
const {
  handleUserSignup,
  handelLoginUser,
  handelGetProfile,
} = require('../controllers/authController')
const { registerValidator, loginValidator } = require('../helpers/validator')
const { verifyToken } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/signup', registerValidator, handleUserSignup)
router.post('/signin', loginValidator, handelLoginUser)
router.get('/profile', verifyToken, handelGetProfile)

module.exports = router
