const express = require('express')
const router = express.Router()
const { checkJwt } = require('../middlewares')

const controller = require('../controllers/assets')

router.get('/assets', [checkJwt.checkToken],controller.getFixedAsset)
router.post('/assets', [checkJwt.checkToken],controller.addFixedAsset)
router.put('/assets', [checkJwt.checkToken],controller.updateFixedAsset)
router.get('/building', [checkJwt.checkToken],controller.getBuilding)
router.post('/building', [checkJwt.checkToken], controller.addBuilding)
router.put('/building', [checkJwt.checkToken],controller.updateBuilding)

router.get('/wayBill', [checkJwt.checkToken],controller.getWayBill)
router.post('/wayBill', [checkJwt.checkToken], controller.addWayBill)
router.put('/wayBill', [checkJwt.checkToken],controller.updateWayBill)

router.get('/fuel', [checkJwt.checkToken],controller.getFuelWriteOff)
router.post('/fuel', [checkJwt.checkToken], controller.addFuelWriteOff)
router.put('/fuel', [checkJwt.checkToken],controller.updateFuelWriteOff)

router.get('/fertilizer', [checkJwt.checkToken],controller.getFertilizerWriteOff)
router.post('/fertilizer', [checkJwt.checkToken], controller.addFertilizerWriteOff)
router.put('/fertilizer', [checkJwt.checkToken],controller.updateFertilizerWriteOff)

router.get('/balance', [checkJwt.checkToken],controller.getBalanceCardGood)
router.post('/balance', [checkJwt.checkToken], controller.addBalanceCardGood)
router.put('/balance', [checkJwt.checkToken],controller.updateBalanceCardGood)

module.exports = router