const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    enum: [0, 1, 2, 3], //'USER', 'ADMIN', 'SUB ADMIN', 'EDITOR'
    default: 0,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
