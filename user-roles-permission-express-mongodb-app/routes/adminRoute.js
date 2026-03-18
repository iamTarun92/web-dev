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
  '/permissions',
  verifyToken,
  addPermissionValidator,
  handleAddPermission,
)
router.post(
  '/permissions/update',
  verifyToken,
  updatePermissionValidator,
  handleUpdatePermission,
)
router.post(
  '/permissions/delete',
  verifyToken,
  deletePermissionValidator,
  handleDeletePermission,
)

module.exports = router
