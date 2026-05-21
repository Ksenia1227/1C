const express = require('express')
const router = express.Router()
const { checkJwt } = require('../middlewares')


const { getUserByUid } = require('../controllers/users')

router.get('/user', [checkJwt.checkToken], getUserByUid)

module.exports = router