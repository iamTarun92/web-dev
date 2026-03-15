var mongoose = require('mongoose')

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'SUB ADMIN', 'EDITOR'],
      default: 'USER',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)
