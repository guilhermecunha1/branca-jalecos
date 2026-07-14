const express = require('express')
const router = express.Router() 
const userController = require("../controllers/userController")


router.get('/login', userController.loginUser)
router.get('/register', userController.registerUser)

module.exports = router