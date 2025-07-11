const express = require("express")
const router = express.Router()
const validateHelper = require("../helpers/validate")
router.post('/checkEmail' , validateHelper.validateEmail)
router.post('/checkPassword' , validateHelper.validatePassword)
router.post('/checkname' , validateHelper.isValidName)
router.post('/checklastname' , validateHelper.isValidName)

module.exports = router 