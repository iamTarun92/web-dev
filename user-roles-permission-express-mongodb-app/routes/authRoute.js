const express = require('express')
const {
  handleUserRegister,
  handelUserLogin,
  handelGetProfile,
} = require('../controllers/authController')
const { registerValidator, loginValidator } = require('../helpers/validator')
const { verifyToken } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', registerValidator, handleUserRegister)
router.post('/login', loginValidator, handelUserLogin)
router.get('/profile', verifyToken, handelGetProfile)

module.exports = router
