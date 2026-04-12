const express = require('express')
const router = express.Router()
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
  addUserValidator,
  updateUserValidator,
  deleteUserValidator,
  addPostLikeValidator,
  countPostLikeValidator,
} = require('../helpers/validator')
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
  handleGetUsers,
  handleAddUser,
  handleUpdateUser,
  handleDeleteUser,
} = require('../controllers/userController')
const {
  handleAddLike,
  handleCountLikes,
} = require('../controllers/likeController')

router.use(verifyToken)

router
  .route('/categories')
  .get(handleGetCategory)
  .post(addCategoryValidator, handleAddCategory)
  .put(updateCategoryValidator, handleUpdateCategory)
  .delete(deleteCategoryValidator, handleDeleteCategory)

router
  .route('/posts')
  .get(handleGetPost)
  .post(addPostValidator, handleAddPost)
  .put(updatePostValidator, handleUpdatePost)
  .delete(deletePostValidator, handleDeletePost)

router
  .route('/users')
  .get(handleGetUsers)
  .post(addUserValidator, handleAddUser)
  .put(updateUserValidator, handleUpdateUser)
  .delete(deleteUserValidator, handleDeleteUser)

router.post('/likes', addPostLikeValidator, handleAddLike)
router.get('/likes/count', countPostLikeValidator, handleCountLikes)

module.exports = router
