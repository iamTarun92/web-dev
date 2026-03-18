const { validationResult } = require('express-validator')
const Permission = require('../../models/permissionModel')

const handleGetPermissions = async (req, res) => {
  try {
    const permissionsData = await Permission.find({})
    return res.status(200).json({
      success: true,
      message: 'Permissions fetched successfully!',
      data: permissionsData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

const handleAddPermission = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errors',
        errors: errors.array(),
      })
    }

    const { permission_name } = req.body

    const isExistPermission = await Permission.findOne({ permission_name })

    if (isExistPermission) {
      return res.status(401).json({
        success: false,
        message: 'Permission name already Exist!',
      })
    }

    const payload = {
      permission_name,
    }

    if (req.body.is_default) {
      payload.is_default = parseInt(req.body.is_default)
    }

    const newPermission = new Permission(payload)

    const permissionData = await newPermission.save()

    return res.status(201).json({
      success: true,
      message: 'Permission added Successfully!',
      data: permissionData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

const handleUpdatePermission = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errors',
        errors: errors.array(),
      })
    }

    const { id: _id, permission_name } = req.body

    const isExistPermission = await Permission.findOne({ _id })

    if (!isExistPermission) {
      return res.status(400).json({
        success: false,
        message: 'Permission not Exist!',
      })
    }
    const isNameAssigned = await Permission.findOne({
      _id: { $ne: _id },
      permission_name,
    })

    if (isNameAssigned) {
      return res.status(401).json({
        success: false,
        message: 'Permission name already assigned to another permission!',
      })
    }

    const payload = {
      permission_name,
    }

    if (req.body.is_default !== null) {
      payload.is_default = parseInt(req.body.is_default)
    }

    const permissionData = await Permission.findByIdAndUpdate(
      { _id },
      { $set: payload },
      { new: true },
    )

    return res.status(201).json({
      success: true,
      message: 'Permission updated Successfully!',
      data: permissionData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

const handleDeletePermission = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errors',
        errors: errors.array(),
      })
    }

    const { id } = req.body

    const userData = await Permission.findByIdAndDelete({ _id: id })

    return res.status(200).json({
      success: true,
      message: 'Permission Deleted Successfully!',
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
  handleGetPermissions,
  handleAddPermission,
  handleUpdatePermission,
  handleDeletePermission,
}
