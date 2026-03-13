const { Schema, model } = require('mongoose')

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
      default: 'https://placehold.co/600x400',
    },
    interest_status: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true },
)

const Blog = model('blog', blogSchema)

module.exports = Blog
