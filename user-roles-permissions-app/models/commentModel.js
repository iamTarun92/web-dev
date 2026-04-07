const mongoose = require('mongoose')

const commentScheme = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
  },
  comment: {
    type: String,
    required: true,
  },
})

const Comment = mongoose.model('Comment', commentScheme)

module.exports = Comment
