var mongoose = require('mongoose')

var postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
  },
  { timestamps: true },
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post
