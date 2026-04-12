const bcrypt = require('bcrypt')
const randomstring = require('randomstring')
const { validationResult } = require('express-validator')
const { User } = require('../models/userModel')
const { sendEmail } = require('../helpers/mailer')

const handleGetUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.user._id } })
    return res.status(200).json({
      success: true,
      message: 'Users data fetched Successfully!',
      data: allUsers,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

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
      return res.status(409).json({
        success: false,
        message: 'Email already Exists!',
      })
    }

    const password = randomstring.generate(6)
    const hashedPassword = await bcrypt.hash(password, 10)

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

    await sendEmail({
      to: userData.email,
      subject: 'account created',
      html: `<h3>Name: ${userData.name}</h3><h3>Email: ${userData.email}</h3><h3>Password: ${password}</h3>`,
    })

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

const handleUpdateUser = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      })
    }

    const { id, name } = req.body

    const isExists = await User.findOne({ _id: id })

    if (!isExists) {
      return res.status(404).json({
        success: false,
        message: 'User not Exist!',
      })
    }

    const updateObj = {
      name,
    }

    if (req.body.role != undefined) updateObj.role = req.body.role

    const userData = await User.findByIdAndUpdate(
      { _id: id },
      { $set: updateObj },
      { new: true },
    )

    return res.status(201).json({
      success: true,
      message: 'User updated Successfully!',
      data: userData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

const handleDeleteUser = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      })
    }

    const { id } = req.body

    const isExists = await User.findOne({ _id: id })

    if (!isExists) {
      return res.status(404).json({
        success: false,
        message: 'User not Exist!',
      })
    }

    const userData = await User.findByIdAndDelete({ _id: id })

    return res.status(200).json({
      success: true,
      message: 'Category deleted Successfully!',
      data: userData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = {
  handleAddUser,
  handleGetUsers,
  handleUpdateUser,
  handleDeleteUser,
}
