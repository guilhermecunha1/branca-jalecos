const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")
const { isAuthenticated } = require('../middlewares/auth')



router.post('/add', cartController.addProduct)

module.exports = router