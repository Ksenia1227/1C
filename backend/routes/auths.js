const express = require('express')
const router = express.Router()
const { checkSignUp } = require('../middlewares')

const controller = require('../controllers/auths')

router.post('/signup', [checkSignUp.checkDuplicateEmail], controller.signup)
router.post('/signin', controller.signin)
router.post('/change-access', controller.changeAccess)

module.exports = router