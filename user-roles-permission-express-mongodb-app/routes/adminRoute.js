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
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/permissions', verifyToken, isAdmin, handleGetPermissions)
router.post(
  '/permissions',
  verifyToken,
  isAdmin,
  addPermissionValidator,
  handleAddPermission,
)
router.post(
  '/permissions/update',
  verifyToken,
  isAdmin,
  updatePermissionValidator,
  handleUpdatePermission,
)
router.post(
  '/permissions/delete',
  verifyToken,
  isAdmin,
  deletePermissionValidator,
  handleDeletePermission,
)

module.exports = router
