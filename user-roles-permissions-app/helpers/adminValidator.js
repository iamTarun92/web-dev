const { check } = require('express-validator')

/* permissions validator start */
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
/* permissions validator end */

/* categories validator start */
const addCategoryValidator = [
  check('category_name', 'category_name is required.').not().isEmpty(),
]
const deleteCategoryValidator = [check('id', 'id is required.').not().isEmpty()]
const updateCategoryValidator = [
  check('id', 'id is required.').not().isEmpty(),
  check('category_name', 'category_name is required.').not().isEmpty(),
]
/* categories validator end */

/* posts validator start */
const addPostValidator = [
  check('title', 'title is required.').not().isEmpty(),
  check('description', 'description is required.').not().isEmpty(),
]
const deletePostValidator = [check('id', 'id is required.').not().isEmpty()]
const updatePostValidator = [
  check('id', 'id is required.').not().isEmpty(),
  check('title', 'title is required.').not().isEmpty(),
  check('description', 'description is required.').not().isEmpty(),
]
/* posts validator end */

/* roles validator start*/
const addRoleValidator = [
  check('role_name', 'role_name is required.').not().isEmpty(),
  check('role_value', 'role_value is required.').not().isEmpty(),
]
/* roles validator end */

module.exports = {
  addPermissionValidator,
  deletePermissionValidator,
  updatePermissionValidator,
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  addPostValidator,
  deletePostValidator,
  updatePostValidator,
  addRoleValidator,
}
