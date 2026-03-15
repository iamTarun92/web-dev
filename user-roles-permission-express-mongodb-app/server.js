require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.SERVER_PORT | 3000

app.use(express.static('public'))

mongoose
  .connect('mongodb://127.0.0.1:27017/user-roles-permission')
  .then(() => {
    app.listen(port, () => {
      console.log(`Express server is running on http://localhost:${port}`)
    })
  })
  .catch((error) => console.log(error))
