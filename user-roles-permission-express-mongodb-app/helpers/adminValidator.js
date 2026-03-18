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

const addCategoryValidator = [
  check('category_name', 'category_name is required.').not().isEmpty(),
]

const deleteCategoryValidator = [check('id', 'id is required.').not().isEmpty()]

const updateCategoryValidator = [
  check('id', 'id is required.').not().isEmpty(),
  check('category_name', 'category_name is required.').not().isEmpty(),
]

module.exports = {
  addPermissionValidator,
  deletePermissionValidator,
  updatePermissionValidator,
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
}
