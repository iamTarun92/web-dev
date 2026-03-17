const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const User = require('../models/userModel')

const handleUserRegister = async (req, res) => {
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

    const isExistUser = await User.findOne({ email })

    if (isExistUser) {
      return res.status(400).json({
        success: false,
        msg: 'Email already Exists!',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    const userData = await newUser.save()

    return res
      .status(201)
      .json({ success: true, msg: 'Registered Successfully!', data: userData })
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    })
  }
}

const handelGenerateAccessToken = async (user) => {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '2h',
  })
  return token
}

const handelGenerateRefreshToken = async (user) => {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '4h',
  })
  return token
}

const handelUserLogin = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: 'Errors',
        errors: errors.array(),
      })
    }

    const { email, password } = req.body

    const userData = await User.findOne({ email: email })

    if (!userData) {
      return res
        .status(400)
        .json({ success: false, msg: 'Email and Password is Incorrect!' })
    }

    const passwordMatch = await bcrypt.compare(password, userData.password)

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, msg: 'Email and Password is Incorrect!' })
    }

    const accessToken = await handelGenerateAccessToken({ user: userData })
    const refreshToken = await handelGenerateRefreshToken({ user: userData })

    return res.status(201).json({
      success: true,
      msg: 'Login Successfully!',
      data: userData,
      accessToken: accessToken,
      refreshToken: refreshToken,
      tokenType: 'Bearer',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    })
  }
}

const handelGetProfile = async (req, res) => {
  try {
    const _id = req.user._id
    const userdata = await User.findOne({ _id })
    return res.status(200).json({
      success: true,
      msg: 'Profile data loaded!',
      data: userdata,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    })
  }
}

module.exports = {
  handleUserRegister,
  handelGenerateAccessToken,
  handelGenerateRefreshToken,
  handelUserLogin,
  handelGetProfile,
}
