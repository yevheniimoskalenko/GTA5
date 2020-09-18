const { Schema, model } = require('mongoose')

const person = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now }
})

module.exports = model('Users', person)
