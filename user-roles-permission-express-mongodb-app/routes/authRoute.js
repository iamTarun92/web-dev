const express = require('express')
const { handleUserSignup } = require('../controllers/authController')
const { registerValidator } = require('../helpers/validation')
const router = express.Router()

router.post('/signup', registerValidator, handleUserSignup)

module.exports = router
