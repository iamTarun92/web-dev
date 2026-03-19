const { check } = require('express-validator')

const registerValidator = [
  check('name', 'Name is required.').not().isEmpty(),
  check('email', 'Please include a valid email.').isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check('password', 'Password is required.').not().isEmpty(),
]

const loginValidator = [
  check('email', 'Please include a valid email.').isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check('password', 'Password is required.').not().isEmpty(),
]

const addUserValidator = [
  check('name', 'Name is required.').not().isEmpty(),
  check('email', 'Please include a valid email.').isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
]

module.exports = {
  registerValidator,
  loginValidator,
  addUserValidator,
}
