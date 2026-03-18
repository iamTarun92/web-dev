require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { configureMiddlewares } = require('./middleware')
const authRoute = require('./routes/authRoute')
const adminRoute = require('./routes/adminRoute')
const commonRoute = require('./routes/commonRoute')

// App Initialization
const app = express()
const port = process.env.SERVER_PORT | 3000

// Call middleware function
configureMiddlewares(app)

// Restful API routes
app.use('/api', commonRoute)
app.use('/api/auth', authRoute)
app.use('/api/admin', adminRoute)

mongoose
  .connect('mongodb://127.0.0.1:27017/user-roles-permission')
  .then(() => {
    app.listen(port, () => {
      console.log(`Express server is running on http://localhost:${port}`)
    })
  })
  .catch((error) => console.log(error))
