const express = require('express')
const { verifyToken } = require('../middleware/authMiddleware')
const {
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../helpers/adminValidator')
const {
  handleAddCategory,
  handleGetCategory,
  handleDeleteCategory,
  handleUpdateCategory,
} = require('../controllers/categoryController')

const router = express.Router()

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

module.exports = router
