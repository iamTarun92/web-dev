const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
})

const Role = mongoose.model('Role', roleSchema)

module.exports = { Role }
