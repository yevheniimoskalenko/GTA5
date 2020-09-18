const { Router } = require('express')
const router = Router()

const { create, login } = require('../controller/auth.controller.js')

router.post('/create', create)
router.post('/login', login)

module.exports = router
