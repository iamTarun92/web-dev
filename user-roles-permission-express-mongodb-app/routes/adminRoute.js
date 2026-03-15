const express = require('express')
const { addPermissionValidator } = require('../helpers/adminValidator')
const {
  handleAddPermission,
} = require('../controllers/admin/permissionController')

const router = express.Router()

router.post('/add-permission', addPermissionValidator, handleAddPermission)

module.exports = router
