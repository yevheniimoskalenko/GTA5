const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api', auth)
module.exports = app
