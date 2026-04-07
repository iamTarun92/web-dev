const express = require('express')
const {
  addPermissionValidator,
  updatePermissionValidator,
  deletePermissionValidator,
  addRoleValidator,
} = require('../helpers/adminValidator')
const {
  handleGetPermissions,
  handleAddPermission,
  handleUpdatePermission,
  handleDeletePermission,
} = require('../controllers/admin/permissionController')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')
const {
  handleGetRoles,
  handleAddRoles,
} = require('../controllers/admin/roleController')

const router = express.Router()

/* permissions routes start */
router.get('/permissions', verifyToken, isAdmin, handleGetPermissions)
router.post(
  '/permissions',
  verifyToken,
  isAdmin,
  addPermissionValidator,
  handleAddPermission,
)
router.post(
  '/update-permissions',
  verifyToken,
  isAdmin,
  updatePermissionValidator,
  handleUpdatePermission,
)
router.post(
  '/delete-permissions',
  verifyToken,
  isAdmin,
  deletePermissionValidator,
  handleDeletePermission,
)
/* permissions routes end */

/* roles routes start */
router.get('/roles', verifyToken, isAdmin, handleGetRoles)
router.post('/roles', verifyToken, isAdmin, addRoleValidator, handleAddRoles)

/* roles routes end */

module.exports = router
