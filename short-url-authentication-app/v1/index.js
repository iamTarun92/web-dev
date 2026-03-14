const express = require('express')
const { connectMongoDb } = require('./connection')
const { PORT, HOSTNAME, DB_NAME } = require('./config')
const urlRoute = require('./routes/url')
const { configureMiddlewares, logReqRes } = require('./middleware')
const { handelRedirectShortUrl } = require('./controllers/url')

// Initialize Express app
const app = express()
const port = PORT || 8000

// Call middleware function
configureMiddlewares(app)
app.use(logReqRes('access.log'))

// Restful API routes
app.use('/url', urlRoute)
app.get('/:shortId', handelRedirectShortUrl)

// Connect to MongoDB and start the server
connectMongoDb(`mongodb://${HOSTNAME}:27017/${DB_NAME}`)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Express server is running on http://localhost:${port}`)
    })
  })
  .catch((error) => console.log(error))
