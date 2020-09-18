const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth')
require('dotenv').config()

const app = express()

mongoose.connect(
  'mongodb+srv://yevhenii:was123456789was@cluster0-vrxpp.mongodb.net/gta',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
)

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api', auth)

module.exports = app
