const { validationResult } = require('express-validator')
const Like = require('../models/likeModel')

const handleCountLikes = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors!',
        errors: errors.array(),
      })
    }
    const { post_id } = req.body

    const isExists = await Like.findOne({
      post_id,
    })

    if (!isExists) {
      return res.status(200).json({
        success: false,
        message: 'Post ID not Exist!',
      })
    }

    const allLikes = await Like.find({ post_id }).countDocuments()
    return res.status(200).json({
      success: true,
      message: 'Likes data fetched successfully!',
      data: allLikes,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

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

    const isExists = await Like.findOne({
      user_id,
      post_id,
    })

    if (isExists) {
      const likeData = await Like.deleteOne({
        user_id,
        post_id,
      })

      return res.status(201).json({
        success: true,
        message: 'Post unlike successfully!',
        data: likeData,
      })
    } else {
      const likeData = await Like.create({
        user_id,
        post_id,
      })

      return res.status(201).json({
        success: true,
        message: 'Post liked successfully!',
        data: likeData,
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  handleAddLike,
  handleCountLikes,
}
