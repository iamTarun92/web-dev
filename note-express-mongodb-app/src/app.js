require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const userRouter = require('./routes/user-routes')
const noteRouter = require('./routes/note-routes')
const auth = require('./middlewares/auth')

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URL =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/notes-db'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', userRouter)
app.use('/api/notes', auth, noteRouter) // auth applied here

app.get('/', (req, res) => res.send('Welcome to the Note API!'))

mongoose
  .connect(MONGO_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((err) => console.error('MongoDB error:', err))
