const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const short = require('./modules/short')

router.use('/', home)
router.use('/:short_URL', short)

module.exports = router