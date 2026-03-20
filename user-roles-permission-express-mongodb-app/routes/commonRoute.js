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
const {
  addUserValidator,
  updateUserValidator,
  deleteUserValidator,
  addLikeValidator,
} = require('../helpers/validator')
const {
  handleGetUsers,
  handleAddUser,
  handleUpdateUser,
  handleDeleteUser,
} = require('../controllers/userController')
const {
  handleAddLike,
  handleGetLikes,
  handleUpdateLike,
  handleDeleteLike,
} = require('../controllers/likeController')

const router = express.Router()

/* Category routes start */
router.get('/categories', verifyToken, handleGetCategory)
router.post('/categories', verifyToken, addCategoryValidator, handleAddCategory)
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
router.get('/users', verifyToken, handleGetUsers)
router.post('/users', verifyToken, addUserValidator, handleAddUser)
router.post('/update-users', verifyToken, updateUserValidator, handleUpdateUser)
router.post('/delete-users', verifyToken, deleteUserValidator, handleDeleteUser)
/* user routes end */

/* likes routes start */
router.get('/likes', verifyToken, handleGetLikes)
router.post('/likes', verifyToken, addLikeValidator, handleAddLike)
router.post('/update-likes', verifyToken, addLikeValidator, handleUpdateLike)
router.post('/delete-likes', verifyToken, addLikeValidator, handleDeleteLike)
/* likes routes end */

module.exports = router
