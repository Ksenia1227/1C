const express = require('express')
const router = express.Router()
const { checkJwt } = require('../middlewares')

const controller = require('../controllers/report')

router.get('/initial_report', [checkJwt.checkToken],controller.getInitialBalances);
module.exports = router;