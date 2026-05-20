const express = require('express')
const router = express.Router()
const { checkJwt } = require('../middlewares')

const controller = require('../controllers/animal')

router.get('/group', [checkJwt.checkToken],controller.getAnimalGroup)
router.post('/group', [checkJwt.checkToken],controller.addAnimalGroup)
router.put('/group', [checkJwt.checkToken],controller.updateAnimalGroup)
router.get('/animal', [checkJwt.checkToken],controller.getAnimal)
router.post('/animal', [checkJwt.checkToken], controller.addAnimal)
router.put('/animal', [checkJwt.checkToken],controller.updateAnimal)
router.get('/balance', [checkJwt.checkToken],controller.getBalanceCardAnimal)
router.post('/balance', [checkJwt.checkToken], controller.addBalanceCardAnimal)
router.put('/balance', [checkJwt.checkToken],controller.updateBalanceCardAnimal)

module.exports = router