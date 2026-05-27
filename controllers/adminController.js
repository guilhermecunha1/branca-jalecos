const mongoose = require("mongoose")
const {ZodError} = require("zod")

//Models:
    require("../models/Product")
    const Product = mongoose.model("products")


    //Controllers:

async function home(req, res) {
    res.render("admin/index")
}

//* Criar gerenciamento de produtos amanha:
// Produto com nome e slug, onde o administrador podera criar produtos que vao ser
// gerenciados no estoque, e la ira ter separações por tamanho, e também a quantidade
// que tem, tudo isso sendo administrado pelo controlador do estoque*//

async function productsForm(req, res) {
    res.render("admin/products/form")
}







module.exports = {
    home,
    productsForm
}