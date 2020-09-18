const jsonwebtoken = require('jsonwebtoken')
const { hashSync, genSaltSync } = require('bcrypt-nodejs')
const Person = require('../model/person.model')
const salt = genSaltSync(10)
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
module.exports.login = (req, res) => {
  console.log(req.body)
}
