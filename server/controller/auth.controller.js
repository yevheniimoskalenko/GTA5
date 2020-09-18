const jwt = require('jsonwebtoken')
const { hashSync, genSaltSync, compareSync } = require('bcrypt-nodejs')
const Person = require('../model/person.model')
const salt = genSaltSync(10)
require('dotenv').config()
module.exports.create = async (req, res) => {
  const { email, password } = req.body // spread
  try {
    const candidate = await Person.findOne({ email })
    if (!candidate) {
      const user = new Person({ email, password: hashSync(password, salt) })
      user.save()
      return res.json({ status: 'success', message: 'user created' })
    }
    return res.json({
      status: 'error',
      message: 'user not created or user be find create new email'
    })
  } catch (e) {
    return res.json({ error: e })
  }
}
module.exports.login = async (req, res) => {
  const { email, password } = req.body // spread

  const candidate = await Person.findOne({ email })

  if (candidate) {
    const isPasswordcorrect = compareSync(password, candidate.password)
    if (isPasswordcorrect) {
      const token = jwt.sign({ email: candidate.email }, process.env.secret)
      return res.json({ token })
    } else {
      return res.json({ status: 'error', message: 'password is not correct' })
    }
  } else {
    return res.json({ status: 'error', message: 'user not found' })
  }
}
