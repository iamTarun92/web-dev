const express = require('express')
const {
  handleUserSignup,
  handelLoginUser,
} = require('../controllers/authController')
const { registerValidator, loginValidator } = require('../helpers/validation')
const router = express.Router()

router.post('/signup', registerValidator, handleUserSignup)
router.post('/signin', loginValidator, handelLoginUser)

module.exports = router
