const { validationResult } = require('express-validator')
const { Role } = require('../../models/roleModel')

const handleGetRoles = async (req, res) => {
  try {
    const roleData = await Role.find({ role_value: { $ne: 1 } })
    return res.status(200).json({
      success: true,
      message: 'Role fetched successfully!',
      data: roleData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}
const handleAddRoles = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors!',
        errors: errors.array(),
      })
    }

    const { role_name, role_value } = req.body
    const roleData = await Role.create({
      role_name,
      role_value,
    })
    return res.status(201).json({
      success: true,
      message: 'Role added Successfully!',
      data: roleData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = {
  handleGetRoles,
  handleAddRoles,
}
