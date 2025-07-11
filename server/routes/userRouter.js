const express = require('express');
const router = express.Router();

const {
  getCoins,
  getName,
  getOwnedAnimations,
  getOwnedIdioms,
  getOwnedCharacters,
  getEquippedAnimation,
  getEquippedCharacter,
  getEquippedIdiom,
  getFullName,
} = require('../controllers/userController');


router.get('/coins', getCoins);
router.get('/name', getFullName);
router.get('/owned/animations', getOwnedAnimations);
router.get('/owned/idioms', getOwnedIdioms);
router.get('/owned/characters', getOwnedCharacters);
router.get('/equipped/animation', getEquippedAnimation);
router.get('/equipped/character', getEquippedCharacter);
router.get('/equipped/idiom', getEquippedIdiom);

module.exports = router;
