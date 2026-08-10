const express = require("express")
const router = express.router()
const productsController = require("../controllers/productsController")
const {isAuthenticated} = require("../middlewares/auth")
const { route } = require("./adminRoutes")


//Home
router.get("/", productsController.indexCollection )
router.get("/item", productsController.showProduct)
