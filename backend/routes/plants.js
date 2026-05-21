const express = require('express')
const router = express.Router()
const { checkJwt } = require('../middlewares')

const controller = require('../controllers/plants')

router.get('/field', [checkJwt.checkToken],controller.getField)
router.post('/field', [checkJwt.checkToken],controller.addField)
router.put('/field', [checkJwt.checkToken],controller.updateField)
router.get('/gculture', [checkJwt.checkToken],controller.getGroupCulture)
router.post('/gculture', [checkJwt.checkToken], controller.addGroupCulture)
router.put('/gculture', [checkJwt.checkToken],controller.updateGroupCulture)

router.get('/crop', [checkJwt.checkToken],controller.getCrop)
router.post('/crop', [checkJwt.checkToken], controller.addCrop)
router.put('/crop', [checkJwt.checkToken],controller.updateCrop)
router.get('/structure', [checkJwt.checkToken],controller.getStructureAcreage)
router.post('/structure', [checkJwt.checkToken], controller.addStructureAcreage)
router.put('/structure', [checkJwt.checkToken],controller.updateStructureAcreage)

router.get('/balance', [checkJwt.checkToken],controller.getBalanceCardPlant)
router.post('/balance', [checkJwt.checkToken], controller.addBalanceCardPlant)
router.put('/balance', [checkJwt.checkToken],controller.updateBalanceCardPlant)

module.exports = router