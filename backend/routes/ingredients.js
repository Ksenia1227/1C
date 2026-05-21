const express = require('express')
const router = express.Router()
const { checkJwt } = require('../middlewares')

const controller = require('../controllers/ingredients')

router.get('/ingredients/:id_recipe',[checkJwt.checkToken], controller.getIngredientByRecipe);
// router.delete('/ingredients', controller.deleteIngredientsByRecipeId);
// router.post('/ingredients', controller.addIngredients);
router.delete('/ingredient/:id_recipe',[checkJwt.checkToken], controller.deleteIngredientsById);


module.exports = router