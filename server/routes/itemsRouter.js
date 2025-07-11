const express = require("express")
const router = express.Router()
const itemController = require("../controllers/items")
// we get the animations 
router.get("/getAnimations" , itemController.getAnimations)
router.get('/getCharacters' , itemController.getCharacters)
router.get('/getIdioms' , itemController.getIdioms)
router.get('/getEquippedItems' , itemController.getEquippedItems)
router.post('/equip' , itemController.equip)
router.post('/buyItem' , itemController.buyItem)
module.exports = router 