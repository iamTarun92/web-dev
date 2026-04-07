require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { configureMiddlewares } = require('./middleware')
const authRoute = require('./routes/authRoute')
const adminRoute = require('./routes/adminRoute')
const commonRoute = require('./routes/commonRoute')

// App Initialization
const app = express()
const port = process.env.SERVER_PORT || 3000

// Call middleware function
configureMiddlewares(app)

// Restful API routes
app.use('/api', commonRoute)
app.use('/api', authRoute)
app.use('/api/admin', adminRoute)

// Handle 404 (Route not found)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
  })
})

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
})

mongoose
  .connect('mongodb://127.0.0.1:27017/user-roles-permission')
  .then(() => {
    app.listen(port, () => {
      console.log(`Express server is running on http://localhost:${port}`)
    })
  })
  .catch((error) => console.log(error))
