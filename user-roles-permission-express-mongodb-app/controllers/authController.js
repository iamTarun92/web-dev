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

const handelLoginUser = async (req, res) => {
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
    const passwordMatch = await bcrypt.compare(password, userData.password)

    if (!userData || !passwordMatch) {
      return res
        .status(401)
        .json({ success: false, msg: 'Email and Password is Incorrect!' })
    }

    const accessToken = await handelGenerateAccessToken({ user: userData })
    const refreshToken = await handelGenerateRefreshToken({ user: userData })

    return res.status(201).json({
      success: true,
      msg: 'Login Successfully!',
      user: userData,
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
    const user = await User.findOne({ _id: req.user._id })
    return res.status(200).json({
      success: true,
      msg: 'Profile data loaded!',
      user,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    })
  }
}

module.exports = {
  handleUserSignup,
  handelGenerateAccessToken,
  handelGenerateRefreshToken,
  handelLoginUser,
  handelGetProfile,
}
