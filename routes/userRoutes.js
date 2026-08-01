const express = require('express')
const router = express.Router() 
const userController = require("../controllers/userController")
const { isAuthenticated } = require('../middlewares/auth')


router.get('/login', userController.loginUserView)
router.get('/register', userController.registerUserView)
router.post('/register', userController.createUser)
router.post("/login", userController.loginUser) 
router.get("/logout", isAuthenticated ,userController.logoutUser)


module.exports = router