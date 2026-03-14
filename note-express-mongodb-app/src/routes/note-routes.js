const express = require('express')
const {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} = require('../controllers/noteController')
const auth = require('../middlewares/auth')

const noteRouter = express.Router()

noteRouter.route('/').get(getNotes).post(createNote)

noteRouter.route('/:id').put(updateNote).delete(deleteNote)

module.exports = noteRouter
