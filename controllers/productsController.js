const mongoose = require("mongoose")

//Models:
require("../models/Product")
const Product = mongoose.model("products")

//Utils:
const addFlash = require("../utils/addFlash")

