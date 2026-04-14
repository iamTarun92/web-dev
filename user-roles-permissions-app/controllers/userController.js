const bcrypt = require('bcrypt')
const randomstring = require('randomstring')
const { validationResult } = require('express-validator')
const { User } = require('../models/userModel')
const { sendEmail } = require('../helpers/mailer')
const mongoose = require('mongoose')
const { Permission } = require('../models/permissionModel')
const { UserPermission } = require('../models/userPermissionModel')

const getUserPermissions = async (currentUserId) => {
  const result = await User.aggregate([
    {
      $match: { _id: { $ne: new mongoose.Types.ObjectId(currentUserId) } },
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

  return result || null
}

const handleGetUsers = async (req, res) => {
  try {
    const allUsers = await getUserPermissions(req.user._id)
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

const assignUserPermissions = async (currentUser, userPermissions) => {
  try {
    // Step 1: Extract ids
    const ids = userPermissions.map((p) => p._id)

    // Step 2: Query DB for matching permissions
    const dbPermissions = await Permission.find({ _id: { $in: ids } })

    // Step 3: Merge results
    const mergedPermissions = userPermissions.map((userPerm) => {
      const dbPerm = dbPermissions.find(
        (perm) => perm._id.toString() === userPerm._id,
      )
      return {
        permission_value: userPerm.permission_value,
        permission_name: dbPerm ? dbPerm.permission_name : null, // fallback if not found
      }
    })

    await UserPermission.create({
      user_id: currentUser._id,
      permissions: mergedPermissions,
    })
  } catch (error) {
    console.error('Error merging permissions:', error)
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

    const payload = {
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
      payload.role = req.body.role
    }

    const userData = await User.create(payload)

    if (req.body.permissions.length) {
      await assignUserPermissions(userData, req.body.permissions)
    }

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
