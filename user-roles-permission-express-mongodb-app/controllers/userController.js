const bcrypt = require('bcrypt')
const randomstring = require('randomstring')
const { validationResult } = require('express-validator')
const User = require('../models/userModel')

const handleAddUser = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errors',
        errors: errors.array(),
      })
    }

    const { name, email } = req.body

    const isExists = await User.findOne({ email })

    if (isExists) {
      return res.status(401).json({
        success: false,
        message: 'Email already Exists!',
      })
    }

    const password = randomstring.generate(6)
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('password', password)

    const userObj = {
      name,
      email,
      password: hashedPassword,
    }

    if (req.body.role && req.body.role == 1) {
      return res.status(401).json({
        success: false,
        message: 'You can not create Admin!',
      })
    } else if (req.body.role) {
      userObj.role = req.body.role
    }

    const userData = await User.create(userObj)

    return res.status(201).json({
      success: true,
      message: 'User created Successfully!',
      data: userData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  handleAddUser,
}
