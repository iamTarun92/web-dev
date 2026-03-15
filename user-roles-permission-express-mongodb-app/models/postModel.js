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

module.exports = mongoose.model('Post', postSchema)
