const { check } = require('express-validator')

const addCategoryValidator = [
  check('category_name', 'category_name is required.').not().isEmpty(),
]

const deleteCategoryValidator = [check('id', 'id is required.').not().isEmpty()]

const updateCategoryValidator = [
  check('id', 'id is required.').not().isEmpty(),
  check('category_name', 'category_name is required.').not().isEmpty(),
]

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

const addUserValidator = [
  check('name', 'name is required.').not().isEmpty(),
  check('email', 'Please include a valid email.').isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
]

const updateUserValidator = [
  check('id', 'id is required.').not().isEmpty(),
  check('name', 'name is required.').not().isEmpty(),
]

const deleteUserValidator = [check('id', 'id is required.').not().isEmpty()]

const addPostLikeValidator = [
  check('user_id', 'user_id is required').not().isEmpty(),
  check('post_id', 'post_id is required').not().isEmpty(),
]

const countPostLikeValidator = [
  check('post_id', 'post_id is required').not().isEmpty(),
]

module.exports = {
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  addPostValidator,
  deletePostValidator,
  updatePostValidator,
  addUserValidator,
  updateUserValidator,
  deleteUserValidator,
  addPostLikeValidator,
  countPostLikeValidator,
}
