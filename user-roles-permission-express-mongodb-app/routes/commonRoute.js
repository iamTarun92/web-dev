const express = require('express')
const { verifyToken } = require('../middleware/authMiddleware')
const {
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  addPostValidator,
  updatePostValidator,
  deletePostValidator,
} = require('../helpers/adminValidator')
const {
  handleAddCategory,
  handleGetCategory,
  handleDeleteCategory,
  handleUpdateCategory,
} = require('../controllers/categoryController')
const {
  handleAddPost,
  handleGetPost,
  handleUpdatePost,
  handleDeletePost,
} = require('../controllers/postController')
const { addUserValidator } = require('../helpers/validator')
const { handleAddUser } = require('../controllers/userController')

const router = express.Router()

/* Category routes start */
router.post('/categories', verifyToken, addCategoryValidator, handleAddCategory)
router.get('/categories', verifyToken, handleGetCategory)
router.post(
  '/update-categories',
  verifyToken,
  updateCategoryValidator,
  handleUpdateCategory,
)
router.post(
  '/delete-categories',
  verifyToken,
  deleteCategoryValidator,
  handleDeleteCategory,
)
/* Category routes end */

/* Post route start */
router.get('/posts', verifyToken, handleGetPost)
router.post('/posts', verifyToken, addPostValidator, handleAddPost)
router.post('/update-posts', verifyToken, updatePostValidator, handleUpdatePost)
router.post('/delete-posts', verifyToken, deletePostValidator, handleDeletePost)
/* Post route end */

/* user routes start */
router.post('/users', verifyToken, addUserValidator, handleAddUser)
/* user routes end */

module.exports = router
