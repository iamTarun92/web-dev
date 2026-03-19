const { check } = require('express-validator')

const registerValidator = [
  check('name', 'name is required.').not().isEmpty(),
  check('email', 'Please include a valid email.').isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check('password', 'password is required.').not().isEmpty(),
]

const loginValidator = [
  check('email', 'Please include a valid email.').isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check('password', 'password is required.').not().isEmpty(),
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

module.exports = {
  registerValidator,
  loginValidator,
  addUserValidator,
  updateUserValidator,
  deleteUserValidator,
}
