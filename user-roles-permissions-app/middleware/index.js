const express = require('express')
const path = require('path')

const configureMiddlewares = (app) => {
  // Static files
  app.use(express.static(path.join(__dirname, '../public')))

  // Body parsers
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
}

module.exports = { configureMiddlewares }
