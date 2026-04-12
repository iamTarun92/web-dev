const { check } = require('express-validator')

const addPermissionValidator = [
  check('permission_name', 'permission_name is required.').not().isEmpty(),
]
const deletePermissionValidator = [
  check('id', 'id is required.').not().isEmpty(),
]
const updatePermissionValidator = [
  check('id', 'id is required.').not().isEmpty(),
  check('permission_name', 'permission_name is required.').not().isEmpty(),
]

const addRoleValidator = [
  check('name', 'name is required.').not().isEmpty(),
  check('type', 'type is required.').not().isEmpty(),
]

module.exports = {
  addPermissionValidator,
  deletePermissionValidator,
  updatePermissionValidator,
  addRoleValidator,
}
