const { check } = require('express-validator')

const addPermissionValidator = [
  check('permission_name', 'Permission name is required.').not().isEmpty(),
]
const deletePermissionValidator = [
  check('id', 'ID is required.').not().isEmpty(),
]
const updatePermissionValidator = [
  check('id', 'ID is required.').not().isEmpty(),
  check('permission_name', 'Permission name is required.').not().isEmpty(),
]

module.exports = {
  addPermissionValidator,
  deletePermissionValidator,
  updatePermissionValidator,
}
