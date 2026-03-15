var mongoose = require('mongoose')

var likeSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true },
)

const Like = mongoose.model('Like', likeSchema)

module.exports = Like
