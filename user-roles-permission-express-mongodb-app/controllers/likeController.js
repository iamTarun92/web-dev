const { validationResult } = require('express-validator')
const Like = require('../models/likeModel')

const handleAddLike = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors!',
        errors: errors.array(),
      })
    }
    const { user_id, post_id } = req.body

    const isLiked = await Like.findOne({
      user_id,
      post_id,
    })

    if (isLiked) {
      return res.status(400).json({
        success: false,
        msg: 'Already liked!',
      })
    }

    const categoryData = await Like.create({
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

const handleGetLikes = async (req, res) => {
  try {
    const categoryData = await Like.find({})
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

const handleUpdateLike = async (req, res) => {
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

    const isExists = await Like.findOne({ _id: id })

    if (!isExists) {
      return res.status(400).json({
        success: false,
        message: 'Category not Exist!',
      })
    }

    const isNameAssigned = await Like.findOne({
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

    const categoryData = await Like.findByIdAndUpdate(
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

const handleDeleteLike = async (req, res) => {
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

    const isExists = await Like.findOne({ _id: id })

    if (!isExists) {
      return res.status(400).json({
        success: false,
        message: 'Category not Exist!',
      })
    }

    const categoryData = await Like.findByIdAndDelete({ _id: id })

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
  handleAddLike,
  handleGetLikes,
  handleUpdateLike,
  handleDeleteLike,
}
