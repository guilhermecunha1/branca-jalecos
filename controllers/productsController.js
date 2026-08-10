const mongoose = require("mongoose")

//Models:
require("../models/Product")
const Product = mongoose.model("products")

//Utils:
const addFlash = require("../utils/addFlash")


async function indexCollection (req, res) {
    try{

        const products = await Product.find().lean().sort({active: -1, createdAt: -1})
        res.render("products/index", {products, currentPage: 'collection'})

    }catch(err){
        addFlash(req, "Erro ao acessar pagina de produtos!")
        res.redirect("/")
    }

}

async function showProduct(req, res) {
    
    try{

    const product = await Product.findOne({slug: req.params.slug}).lean()
    res.render("products/showProduct", {product})
    }
    catch(err){
        addFlash(req, "Erro ao acessar produto, tente novamente mais tarde.")
        res.redirect("/products")
    }
}

module.exports = {
    indexCollection,
    showProduct,
}