const { Router } = require('express')
const jwt = require('express-jwt')
require('dotenv').config()
const router = Router()

const { create, login } = require('../controller/auth.controller.js')

router.post('/create', create)
router.post('/login', login)
router.post('/logout', (req, res, next) => {
  return res.json({ status: 'OK' })
})
router.get('/user', jwt({ secret: 'fooGTA' }), (req, res, next) =>
  res.json({ user: req.user })
)

module.exports = router
