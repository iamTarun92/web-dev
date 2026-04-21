const express = require('express')
const {
  handleUserRegister,
  handleUserLogin,
  handleGetProfile,
} = require('../controllers/authController')
const {
  registerValidator,
  loginValidator,
} = require('../helpers/authValidator')
const { verifyToken } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', registerValidator, handleUserRegister)
router.post('/login', loginValidator, handleUserLogin)
router.get('/profile', verifyToken, handleGetProfile)

module.exports = router
