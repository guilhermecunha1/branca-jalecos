const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")



router.get('/', adminController.home)
router.get("/products", adminController.manageProducts)
router.get("/products/create", adminController.showNewProductForm)
router.post("/products/create", adminController.createProduct)


module.exports = router