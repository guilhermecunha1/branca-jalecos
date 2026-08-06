const express = require("express")
const router = express.Router()
const indexController = require("../controllers/indexController")

router.get("/", indexController.home)
router.get("/about", indexController.aboutUs)

module.exports = router