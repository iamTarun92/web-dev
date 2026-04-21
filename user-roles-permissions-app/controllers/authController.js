const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { User } = require('../models/userModel')
const { Permission } = require('../models/permissionModel')
const { UserPermission } = require('../models/userPermissionModel')

const assignDefaultPermissions = async (userData) => {
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
}

const handleUserRegister = async (req, res) => {
  try {
    // Step 1: Validate request
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errors',
        errors: errors.array(),
      })
    }

    // Step 2: Extract user data
    const { name, email, password } = req.body

    // Step 3: Check if user already exists
    const isExists = await User.findOne({ email })

    if (isExists) {
      return res.status(409).json({
        success: false,
        message: 'Email already Exists!',
      })
    }

    // Step 4: Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Step 5: Prepare payload
    const payload = { name, email, password: hashedPassword }
    if (req.body.role) {
      payload.role = req.body.role
    }

    // Step 6: Create user
    const userData = await User.create(payload)

    // Pass userData to next step
    await assignDefaultPermissions(userData)

    return res.status(201).json({
      success: true,
      message: 'Registered Successfully!',
      data: userData,
    })
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

const handleGenerateAccessToken = async (user) => {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10h',
  })
  return token
}

const handleGenerateRefreshToken = async (user) => {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '24h',
  })
  return token
}

const getUserPermissions = async (email) => {
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
          $ifNull: ['$permissionsData.permissions', null],
        },
      },
    },
  ])

  return result[0] || null
}

const handleUserLogin = async (req, res) => {
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

    const userWithPermissions = await getUserPermissions(email)
    const accessToken = await handleGenerateAccessToken({ user })
    const refreshToken = await handleGenerateRefreshToken({ user })

    return res.status(201).json({
      success: true,
      message: 'Login Successfully!',
      data: userWithPermissions,
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
    })
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

const handleGetProfile = async (req, res) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId).select('-password -__v').lean()

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Profile data loaded!',
      data: user,
    })
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

module.exports = {
  handleUserRegister,
  handleGenerateAccessToken,
  handleGenerateRefreshToken,
  handleUserLogin,
  handleGetProfile,
}
