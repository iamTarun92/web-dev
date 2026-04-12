const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { User } = require('../models/userModel')
const { Permission } = require('../models/permissionModel')
const { UserPermission } = require('../models/userPermissionModel')

const handleUserRegister = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errors',
        errors: errors.array(),
      })
    }

    const { name, email, password } = req.body

    const isExists = await User.findOne({ email })

    if (isExists) {
      return res.status(409).json({
        success: false,
        message: 'Email already Exists!',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const payload = {
      name,
      email,
      password: hashedPassword,
    }

    if (req.body.role) {
      payload.role = req.body.role
    }

    // Create User collection
    const userData = await User.create(payload)

    // Fetch default permissions
    const defaultPermissions = await Permission.find({ is_default: 1 })

    if (defaultPermissions.length) {
      const userPermissionsData = defaultPermissions.map((perm) => ({
        permission_name: perm.permission_name,
        permission_value: [0, 1, 2, 3],
      }))

      await UserPermission.create({
        user_id: userData._id,
        permissions: userPermissionsData,
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Registered Successfully!',
      data: userData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
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

const getUserWithPermissions = async (email) => {
  const result = await User.aggregate([
    {
      $match: { email: email },
    },
    {
      $lookup: {
        from: 'userpermissions',
        localField: '_id',
        foreignField: 'user_id',
        as: 'permissionsData',
      },
    },
    {
      $unwind: {
        path: '$permissionsData',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        role: 1,
        permissions: {
          $ifNull: ['$permissionsData.permissions', []],
        },
      },
    },
  ])

  return result[0] || null
}

const handelUserLogin = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errors',
        errors: errors.array(),
      })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!user || !passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Email and Password is Incorrect!' })
    }

    const userWithPermissions = await getUserWithPermissions(email)
    const accessToken = await handelGenerateAccessToken({ user })
    const refreshToken = await handelGenerateRefreshToken({ user })

    return res.status(201).json({
      success: true,
      message: 'Login Successfully!',
      data: userWithPermissions,
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const handelGetProfile = async (req, res) => {
  try {
    const _id = req.user._id
    const user = await User.findOne({ _id })
    return res.status(200).json({
      success: true,
      message: 'Profile data loaded!',
      data: user,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
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
