const express = require('express')
const router = express.Router() 
const userController = require("../controllers/userController")


router.get('/login', userController.loginUserView)
router.get('/register', userController.registerUserView)
router.post('/register', userController.createUser)
//router.post("/login", userController.loginUser) 
//router.post("/logout", userController.logoutUser)


module.exports = router