const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/authMiddleware')
const { isAdmin } = require('../middleware/adminMiddleware')
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
const {
  handleGetRoles,
  handleAddRoles,
} = require('../controllers/admin/roleController')

router.use(verifyToken, isAdmin)

router
  .route('/permissions')
  .get(handleGetPermissions)
  .post(addPermissionValidator, handleAddPermission)
  .put(updatePermissionValidator, handleUpdatePermission)
  .delete(deletePermissionValidator, handleDeletePermission)

router
  .route('/roles')
  .get(handleGetRoles)
  .post(addRoleValidator, handleAddRoles)

module.exports = router
