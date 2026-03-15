const { check } = require('express-validator')

const addPermissionValidator = [
  check('permission_name', 'Permission name is required.').not().isEmpty(),
]

module.exports = {
  addPermissionValidator,
}
