const express = require('express')
const {
  handelGenerateShortUrl,
  handelGetAnalytics,
  handelGetAllUrl,
} = require('../controllers/url')
const router = express.Router()

router
  .get('/', handelGetAllUrl)
  .post('/', handelGenerateShortUrl)
  .get('/analytics/:shortId', handelGetAnalytics)

module.exports = router
