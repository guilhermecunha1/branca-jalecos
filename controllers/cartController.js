const mongoose = require('mongoose')
const {ZodError} = require('zod')

//Models
require('../models/Product')
const Product = mongoose.model("products")


//Utils: 
const addFlash = require("../utils/addFlash")
const formatZodErrors = require("../utils/formatZodErrors")

//Schema:
const{editCartSchema} = require('../validators/editCartSchema')


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

async function addProduct(req, res) {  //Adicionar zod futuramente
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

}


async function updCartProduct(req, res) {

    let valitadedData
    try {
        valitadedData = editCartSchema.parse(req.body)
    } catch (err) {
        if (err instanceof ZodError) {
            addFlash(req, "alert-danger", "Dados inválidos para atualizar o produto.")
            return res.redirect("/cart")
        }
        throw err
    }


    const productInCart = req.user.cart.find(item =>
        valitadedData.currentVariationId === item.variationId.toString() &&
        valitadedData.productId === item.productId.toString()
    )

    if(!productInCart){
        addFlash(req, "alert-danger", "Erro ao procurar produto, tente novamente mais tarde.")
        return res.redirect("/cart")
    }

    const product = await Product.findById(valitadedData.productId)

    if(!product){
        addFlash(req, "alert-danger", "Erro ao procurar produto, tente novamente mais tarde")
        return res.redirect("/cart")
    }

    const variation = product.variations.find( item =>
        item._id.toString() === valitadedData.variationId &&
        item.color === valitadedData.color &&
        item.size === valitadedData.size
    )

    if(!variation){
        addFlash(req, "alert-danger", "Erro ao procurar produto, tente novamente mais tarde")
        return res.redirect("/cart")
    }

    //Verificar o codigo abaixo daqui amanhã
    const variationAlreadyInCart = req.user.cart.find(item =>
        item !== productInCart && //Evita linha duplicada
        item.productId.toString() === product._id.toString() &&
        item.variationId.toString() === variation._id.toString()
    )

    if(variationAlreadyInCart){
        addFlash(req, "alert-danger", "Essa variação já está no carrinho.")
        return res.redirect("/cart")
    }

    if(valitadedData.quantity > variation.stock) {
        addFlash(req, "alert-danger", "Não há demanda suficiente para o seu pedido")
        return res.redirect("/cart")
    }

    
    Object.assign(productInCart, {
        productId: product._id,
        variationId: variation._id,
        quantity: valitadedData.quantity
    })


    await req.user.save()

    addFlash(req, "alert-success", "Alterações Salvas")

    res.redirect("/cart")

    
}




module.exports = {
    addProduct,
    accessCart,
    removeProducts,
    updCartProduct,

}
