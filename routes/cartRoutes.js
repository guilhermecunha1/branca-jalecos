const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")
const { isAuthenticated } = require('../middlewares/auth')

router.use(isAuthenticated)

router.get('/', cartController.accessCart )
router.post('/add', cartController.addProduct)
router.post('/remove', cartController.removeProducts)
router.post('/update', cartController.updCartProduct)

module.exports = router