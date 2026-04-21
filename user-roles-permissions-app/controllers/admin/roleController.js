const { validationResult } = require('express-validator')
const { Role } = require('../../models/roleModel')

const handleGetRoles = async (req, res) => {
  try {
    const rolesData = await Role.find({ type: { $ne: 1 } })
    return res.status(200).json({
      success: true,
      message: 'Role fetched successfully!',
      data: rolesData,
    })
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
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

    const { name, type } = req.body

    // prevent duplicate entry
    const isExists = await Role.findOne({
      name: {
        $regex: name.trim(),
        $options: 'i',
      },
    })

    if (isExists) {
      return res.status(409).json({
        success: false,
        message: 'Role name already Exist!',
      })
    }

    const roleData = await Role.create({
      name,
      type,
    })

    return res.status(201).json({
      success: true,
      message: 'Role added Successfully!',
      data: roleData,
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
  handleGetRoles,
  handleAddRoles,
}
