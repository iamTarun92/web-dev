const express = require('express')
const {
  addPermissionValidator,
  updatePermissionValidator,
  deletePermissionValidator,
} = require('../helpers/adminValidator')
const {
  handleGetPermissions,
  handleAddPermission,
  handleUpdatePermission,
  handleDeletePermission,
} = require('../controllers/admin/permissionController')
const { verifyToken } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/permissions', verifyToken, handleGetPermissions)
router.post(
  '/permission',
  verifyToken,
  addPermissionValidator,
  handleAddPermission,
)
router.post(
  '/permission/update',
  verifyToken,
  updatePermissionValidator,
  handleUpdatePermission,
)
router.post(
  '/permission/delete',
  verifyToken,
  deletePermissionValidator,
  handleDeletePermission,
)

module.exports = router
