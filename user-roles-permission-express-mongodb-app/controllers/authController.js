const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const User = require('../models/userModel')

const handleUserSignup = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: 'Errors',
        errors: errors.array(),
      })
    }

    const { name, email, password } = req.body
    const isExists = await User.findOne({ email })
    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: 'Email already Exists!',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    const userData = await user.save()

    return res
      .status(201)
      .json({ success: true, msg: 'Registered Successfully!', user: userData })
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    })
  }
}

module.exports = {
  handleUserSignup,
}
