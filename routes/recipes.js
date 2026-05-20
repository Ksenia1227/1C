const express = require('express')
const router = express.Router()
const { checkJwt } = require('../middlewares')

const controller = require('../controllers/recipes')

const multer = require("multer");
const upload = multer({
  dest: "uploads",
});

router.get('/recipesByUid', [checkJwt.checkToken], controller.getRecipesByUid)
router.get('/approvedRecipes', [checkJwt.checkToken], controller.getApprovedRecipes)
router.get('/pendingRecipes', [checkJwt.checkToken], controller.getPendingRecipes)
router.get('/rejectedRecipes', [checkJwt.checkToken], controller.getRejectedRecipes)
router.get('/recipes', [checkJwt.checkToken], controller.getAllRecipes)
router.delete('/recipes/:recipeId',[checkJwt.checkToken], controller.deleteRecipeByUid);
router.post('/recipes', [upload.single("photo"),checkJwt.checkToken], controller.addRecipes);
router.get('/recipe/:id', [checkJwt.checkToken],controller.getRecipeById);
router.put('/upDateRecipes', [upload.single("photo"), checkJwt.checkToken],controller.updateRecipeByUid );
router.put('/upDateRecipesById', [upload.single("photo"), checkJwt.checkToken],controller.updateRecipeById );
router.put('/upDateStatus', [checkJwt.checkToken],controller.updateRecipeStatus );


module.exports = router