const express = require("express")
const router = require.router()
const {checkUser , addUser} = require("../controllers/auth")

router.post('/login' , checkUser)
router.post('/signup' , addUser)

module.exports = router 