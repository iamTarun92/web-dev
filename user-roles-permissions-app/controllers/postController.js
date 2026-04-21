const { validationResult } = require('express-validator')
const { Post } = require('../models/postModel')

const handleGetPost = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('categories')
    return res.status(200).json({
      success: true,
      message: 'Post fetched successfully!',
      data: posts,
    })
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

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

    const newPost = await Post.create(obj)

    const postData = await Post.findOne({ _id: newPost._id }).populate(
      'categories',
    )

    return res.status(201).json({
      success: true,
      message: 'Post added Successfully!',
      data: postData,
    })
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
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
      return res.status(404).json({
        success: false,
        message: 'Post not Exist!',
      })
    }

    let payload = {
      title,
      description,
    }

    if (req.body.categories) {
      payload.categories = req.body.categories
    }

    const postData = await Post.findByIdAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true },
    ).populate('categories')

    return res.status(201).json({
      success: true,
      message: 'Post updated Successfully!',
      data: postData,
    })
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
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
      return res.status(404).json({
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
    console.error(`Error: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

module.exports = {
  handleAddPost,
  handleGetPost,
  handleUpdatePost,
  handleDeletePost,
}
