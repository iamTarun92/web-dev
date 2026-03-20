const { validationResult } = require('express-validator')
const Category = require('../models/categoryModel')

const handleGetCategory = async (req, res) => {
  try {
    const categoryData = await Category.find({})
    return res.status(200).json({
      success: true,
      message: 'Category fetched successfully!',
      data: categoryData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

const handleAddCategory = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors!',
        errors: errors.array(),
      })
    }

    let { category_name } = req.body

    category_name = category_name.trim()

    const isExists = await Category.findOne({
      name: {
        $regex: category_name,
        $options: 'i',
      },
    })

    if (isExists) {
      return res.status(409).json({
        success: false,
        message: 'Category name already Exists!',
      })
    }

    const categoryData = await Category.create({
      name: category_name,
    })

    return res.status(201).json({
      success: true,
      message: 'Category added Successfully!',
      data: categoryData,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const handleUpdateCategory = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      })
    }

    const { id, category_name } = req.body

    const isExists = await Category.findOne({ _id: id })

    if (!isExists) {
      return res.status(400).json({
        success: false,
        message: 'Category not Exist!',
      })
    }

    const isNameAssigned = await Category.findOne({
      _id: { $ne: id },
      name: {
        $regex: category_name,
        $options: 'i',
      },
    })

    if (isNameAssigned) {
      return res.status(401).json({
        success: false,
        message: 'Name already assigned to another category!',
      })
    }

    const categoryData = await Category.findByIdAndUpdate(
      { _id: id },
      { $set: { name: category_name } },
      { new: true },
    )

    return res.status(201).json({
      success: true,
      message: 'Category updated Successfully!',
      data: categoryData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

const handleDeleteCategory = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      })
    }

    const { id } = req.body

    const isExists = await Category.findOne({ _id: id })

    if (!isExists) {
      return res.status(400).json({
        success: false,
        message: 'Category not Exist!',
      })
    }

    const categoryData = await Category.findByIdAndDelete({ _id: id })

    return res.status(200).json({
      success: true,
      message: 'Category deleted Successfully!',
      data: categoryData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = {
  handleAddCategory,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
}
