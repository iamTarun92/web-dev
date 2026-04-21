const { validationResult } = require('express-validator')
const { Permission } = require('../../models/permissionModel')

const handleGetPermissions = async (req, res) => {
  try {
    const permissionsData = await Permission.find({})
    return res.status(200).json({
      success: true,
      message: 'Permissions fetched successfully!',
      data: permissionsData,
    })
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

const handleAddPermission = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      })
    }

    const { permission_name, is_default } = req.body

    const isExists = await Permission.findOne({
      permission_name: {
        $regex: `^${permission_name.trim()}$`, // Added anchors ^ and $ for exact match
        $options: 'i',
      },
    })

    if (isExists) {
      return res.status(409).json({
        success: false,
        message: 'Permission Name already exists!',
      })
    }

    const payload = { permission_name }

    if (is_default !== undefined && is_default !== null) {
      const parsedValue = Number(is_default)

      if (isNaN(parsedValue)) {
        return res.status(400).json({
          success: false,
          message:
            'Invalid type: is_default must be a number or numeric string.',
        })
      }

      payload.is_default = parsedValue
    }

    const permissionData = await Permission.create(payload)

    return res.status(201).json({
      success: true,
      message: 'Permission added successfully!',
      data: permissionData,
    })
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

const handleUpdatePermission = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      })
    }

    const { id, permission_name } = req.body

    const isExists = await Permission.findOne({ _id: id })

    if (!isExists) {
      return res.status(404).json({
        success: false,
        message: 'Permission not Exist!',
      })
    }

    const isNameAssigned = await Permission.findOne({
      _id: { $ne: id },
      permission_name: {
        $regex: permission_name,
        $options: 'i',
      },
    })

    if (isNameAssigned) {
      return res.status(409).json({
        success: false,
        message: 'Permission name already assigned to another permission!',
      })
    }

    const payload = {
      permission_name,
    }

    if (req.body.is_default && req.body.is_default !== null) {
      payload.is_default = parseInt(req.body.is_default)
    }

    const permissionData = await Permission.findByIdAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true },
    )

    return res.status(201).json({
      success: true,
      message: 'Permission updated Successfully!',
      data: permissionData,
    })
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

const handleDeletePermission = async (req, res) => {
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

    const isExists = await Permission.findOne({ _id: id })

    if (!isExists) {
      return res.status(404).json({
        success: false,
        message: 'Permission not Exist!',
      })
    }

    const permissionData = await Permission.findByIdAndDelete({ _id: id })

    return res.status(200).json({
      success: true,
      message: 'Permission Deleted Successfully!',
      data: permissionData,
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
  handleAddPermission,
  handleGetPermissions,
  handleUpdatePermission,
  handleDeletePermission,
}
