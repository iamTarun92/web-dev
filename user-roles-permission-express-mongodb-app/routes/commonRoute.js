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
router.post('/post', verifyToken, addPostValidator, handleAddPost)
router.get('/post', verifyToken, handleGetPost)
router.post('/update-post', verifyToken, updatePostValidator, handleUpdatePost)
router.post('/delete-post', verifyToken, deletePostValidator, handleDeletePost)
/* Post route end */

module.exports = router
