const express = require('express')

const authLogin = require('./routes/auth')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api', authLogin)
module.exports = app
