const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const Permission = require('../../models/permissionModel')

const handleAddPermission = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: 'Errors',
        errors: errors.array(),
      })
    }

    const { permission_name } = req.body

    const isExists = await Permission.findOne({ permission_name })

    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: 'Permission name already Exist!',
      })
    }

    const newPermission = new Permission({
      permission_name,
      is_default: req.body.is_default ? req.body.is_default : 0,
    })

    await newPermission
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          msg: 'Permission added Successfully!',
          newPermission,
        })
      })
      .catch((err) =>
        res.status(400).json({ error: 'Unable to add this Permission!' }),
      )
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = {
  handleAddPermission,
}
