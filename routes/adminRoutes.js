const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")
const { isAdmin, isAuthenticated } = require("../middlewares/auth")

router.use(isAuthenticated)
router.use(isAdmin)


router.get('/', adminController.home)
//Produtos
router.get("/products", adminController.manageProducts)
router.get("/products/create", adminController.showNewProductForm)
router.post("/products/create", adminController.createProduct)
router.post("/products/delete/:id", adminController.deleteProduct)
router.get("/products/edit/:id", adminController.showEditProductForm)
router.post("/products/edit", adminController.editProduct)
router.get("/stock", adminController.manageStock)
//Stock
router.get("/stock/product/:id", adminController.variationsProductView)
router.get("/stock/product/:id/edit", adminController.editStockView)
router.post("/stock/product/:id/edit", adminController.editStock)
//Users
router.get("/users", adminController.viewUsersData)
router.get("/users/edit/:id", adminController.viewUserEdit)
router.post("/users/edit/", adminController.editUser)
router.post("/users/delete/:id", adminController.deleteUser )



module.exports = router