const express = require('express')
const { addPermissionValidator } = require('../helpers/adminValidator')
const {
  handleAddPermission,
} = require('../controllers/admin/permissionController')
const { verifyToken } = require('../middleware/authMiddleware')

const router = express.Router()

router.post(
  '/add-permission',
  verifyToken,
  addPermissionValidator,
  handleAddPermission,
)

module.exports = router
