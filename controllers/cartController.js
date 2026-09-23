const mongoose = require('mongoose')
const {ZodError} = require('zod')

//Models
require('../models/Product')
const Product = mongoose.model("products")


//Utils: 
const addFlash = require("../utils/addFlash")
const formatZodErrors = require("../utils/formatZodErrors")


//Controllers

async function accessCart(req, res) {
    try{
    const cartProducts = []
    for(const item of req.user.cart){

        const product = await Product.findById(item.productId).lean()
        if(!product){continue} //Se nao achar, segue para o proximo item

        const variation = product.variations.find(variation => variation._id.toString() === item.variationId.toString())
        if(!variation){continue} //Se não achar, segue para o proximo item

        cartProducts.push({
            product,
            variation,
            quantity: item.quantity
        })

    }

    res.render('cart/index', {cartProducts})
    } 
    catch(err){
        addFlash(req, 'alert-danger', 'Erro ao carregar carrinho')
        res.redirect('/')

    }
    
}

async function addProduct(req, res) { 
    const {...data} = req.body

    const product = await Product.findById(data.productId)

    if(!product){
        addFlash(req, 'alert-danger' ,'Produto nao encontrado, tente novamente mais tarde')
        return res.redirect("/products")
    }
    //Procura varição correspondente ao que o usuario escolheu
    const variation = product.variations.find(variation => 
        variation.color === data.color && 
        variation.size === data.size
    )
    //verifica se a variação existe
    if(!variation){
        addFlash(req, 'alert-danger', 'Produto nao encontrado, tente novamente mais tarde')
        return res.redirect('/products')
    }

    //procura se o usuario ja tem uma variação igual no carrinho
    const cartItem = req.user.cart.find(item => 
        item.variationId.toString() === variation._id.toString()
    )

    //Se tiver variação igual no carrinho a variavel pega, se nao, vira 0
    const currentQuantity = cartItem ? cartItem.quantity : 0

    if(variation.stock < Number(data.quantity) + currentQuantity ){
        addFlash(req, "alert-danger", 'Não há estoque disponivel para a sua demanda, Tente novamente mais tarde')
        return res.redirect('/products')
    }

    if(!cartItem){

    req.user.cart.push({
        productId: product._id,
        variationId: variation._id,
        quantity: Number(data.quantity)
        
    })
    }

    else{
        cartItem.quantity += Number(data.quantity)
    }

    await req.user.save()
    addFlash(req, "alert-success", "Produto Adicionado Ao Carrinho !")
    res.redirect("/products")

}

async function removeProducts(req, res) {

    const {productId, variationId} = req.body

    const index = req.user.cart.findIndex(item => 
        item.variationId.toString() === variationId &&
        item.productId.toString() === productId
    )

    if(index === -1){
        addFlash(req, "alert-danger", "Erro ao encontrar produto, tente novamente.")
        return res.redirect("/")
    }

    req.user.cart.splice(index, 1)

    await req.user.save()

    addFlash(req, "alert-success", "Produto removido do seu carrinho.")

    res.redirect('/cart')



    //remover voltando pro carrinho
}

module.exports = {
    addProduct,
    accessCart,
    removeProducts,

}