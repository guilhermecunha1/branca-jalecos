const mongoose = require('mongoose')
const {ZodError} = require('zod')

//Models
require('../models/Product')
const Product = mongoose.model("products")


//Utils: 
const addFlash = require("../utils/addFlash")
const formatZodErrors = require("../utils/formatZodErrors")


//Controllers

async function addProduct(req, res) { //Falta integrar com controle de estoque !
    const {...data} = req.body

    const user = req.user
    const product = await Product.findById(data.productId)

    if(!product){
        addFlash(req, 'alert-danger' ,'Produto nao encontrado, tente novamente mais tarde')
        return res.redirect("/products")
    }

    const variation = product.variations.find(variation => 
        variation.color === data.color && 
        variation.size === data.size
    )

    if(!variation){
        addFlash(req, 'alert-danger', 'Produto nao encontrado, tente novamente mais tarde')
        return res.redirect('/products')
    }

    req.user.cart.push({
        productId: product._id,
        variationId: variation._id,
        quantity: data.quantity
        
    })

    await req.user.save()
    addFlash(req, "alert-success", "Produto Adicionado Ao Carrinho !")
    res.redirect("/products")

}

module.exports = {
    addProduct,

}