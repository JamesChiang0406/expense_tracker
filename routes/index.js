const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const month = require('./modules/month')


router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/month', month)
router.use('/', authenticator, home)

module.exports = router