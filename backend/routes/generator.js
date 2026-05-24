const express = require('express')
const router = express.Router()
const { checkJwt } = require('../middlewares')

const controller = require('../controllers/generator')

router.post('/user', [checkJwt.checkToken], controller.getGeneratedData)

module.exports = router