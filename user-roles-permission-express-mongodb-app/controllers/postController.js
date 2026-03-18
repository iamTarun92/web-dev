const { validationResult } = require('express-validator')
const Post = require('../models/postModel')

const handleAddPost = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors!',
        errors: errors.array(),
      })
    }

    const { title, description } = req.body

    let obj = {
      title,
      description,
    }

    if (req.body.categories) {
      obj.categories = req.body.categories
    }

    const newPost = await Post.create(obj).id

    const postData = await Post.findOne({ _id: newPost._id }).populate(
      'categories',
    )

    return res.status(201).json({
      success: true,
      message: 'Post added Successfully!',
      data: postData,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const handleGetPost = async (req, res) => {
  try {
    const postData = await Post.find({}).populate('categories')
    return res.status(200).json({
      success: true,
      message: 'Post fetched successfully!',
      data: postData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

const handleUpdatePost = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      })
    }

    const { id, title, description } = req.body

    const isExists = await Post.findOne({ _id: id })

    if (!isExists) {
      return res.status(400).json({
        success: false,
        message: 'Post not Exist!',
      })
    }

    let obj = {
      title,
      description,
    }

    if (req.body.categories) {
      obj.categories = req.body.categories
    }

    const postData = await Post.findByIdAndUpdate(
      { _id: id },
      { $set: obj },
      { new: true },
    )

    return res.status(201).json({
      success: true,
      message: 'Post updated Successfully!',
      data: postData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

const handleDeletePost = async (req, res) => {
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

    const isExists = await Post.findOne({ _id: id })

    if (!isExists) {
      return res.status(400).json({
        success: false,
        message: 'Post not Exist!',
      })
    }

    const postData = await Post.findByIdAndDelete({ _id: id })

    return res.status(200).json({
      success: true,
      message: 'Post deleted Successfully!',
      data: postData,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = {
  handleAddPost,
  handleGetPost,
  handleUpdatePost,
  handleDeletePost,
}
