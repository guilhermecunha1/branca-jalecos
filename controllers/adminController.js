const mongoose = require("mongoose")
const {ZodError} = require("zod")

//Models:
    require("../models/Product")
    const Product = mongoose.model("products")

//Schemas:
    const {productSchema} = require("../validators/productSchema")
    const {editProductSchema} = require("../validators/editProductSchema")

//Utils:
    const addFlash = require("../utils/addFlash")
    const formatZodErrors = require("../utils/formatZodErrors")


//Controllers:


    // Umas ajudadinha ai pra encurtar codigo tlgd
function generateVariations(colors, sizes) { //Cria todas variações de jalecos
    const variations = []

    for (const color of colors){
        for(const size of sizes){
            variations.push({
                color,
                size,
                stock: 0
            })
        }
    }
    return variations
}

function mergeVariations(oldVariations = [], colors = [], sizes = []) {

    const newVariations = generateVariations(colors, sizes)

    const mergedVariations = []

    for (const variation of newVariations) {

        const existing = oldVariations.find(oldVariation =>
            oldVariation.color === variation.color &&
            oldVariation.size === variation.size
        )

        if (existing) {
            mergedVariations.push(existing)
        } else {
            mergedVariations.push(variation)
        }
    }

    return mergedVariations
}




async function loadProducts(req, res) {
    return Product.find().lean().sort({active: -1, createdAt: -1})
}

    //Aqui é os codigo mesmo mesmo

async function home(req, res) {
    res.render("admin/index")
}

async function manageProducts(req, res) {
    try{
        const products = await loadProducts()
        res.render("admin/products/manage", {products})
    } catch (error){
        addFlash(req, "alert-danger", "Erro ao listar produtos disponiveis!")
        res.redirect("/admin")

    }
}

async function showNewProductForm(req, res) {
    res.render("admin/products/create")
}

async function createProduct(req, res) {
    const {...productData} = req.body

    try{

        // Transforma as cores e tamanhos em Arrays (Caso o usuario envie somente 1 variação de cor/tam)
        if (productData.colors && !Array.isArray(productData.colors)) {
            productData.colors = [productData.colors]
        }

        if (productData.sizes && !Array.isArray(productData.sizes)) {
            productData.sizes = [productData.sizes]
        }

        //Validação
        productSchema.parse(productData)

        // Gera as variações e cria no model
        productData.variations = generateVariations(
            productData.colors,
            productData.sizes
        )


        await Product.create(productData)

        addFlash(req, "alert-success", "Produto Criado Com Sucesso")
        res.redirect("/admin/products")

    }catch(error){
        if (error instanceof ZodError) {
            const erros = formatZodErrors(error)
            return res.render("admin/products/create", {erros})

        }

        addFlash(req, "alert-danger", "Erro ao salvar categoria")
        console.log(error)
        res.redirect("/admin/products/create")
    }
}

async function deleteProduct(req, res) {

    try{
        await Product.findByIdAndDelete(req.params.id)
        addFlash(req, "alert-success", "Produto excluido com sucesso!")
        res.redirect("/admin/products")

    }catch(error){
        addFlash(req, "alert-danger", "Erro ao excluir produto, Tente novamente!")
        res.redirect("/admin/products")
    }
    
}

async function showEditProductForm(req, res) {
    try{
        const product = await Product.findById(req.params.id).lean()
        res.render("admin/products/edit", {product})

    }catch(error){
        addFlash(req, "alert-danger", "Erro ao encontrar produto, Tente novamente!")
    }
}


async function editProduct(req, res) {

    const {id, ...productData} = req.body

    try{
            //Transforma o active em true
        productData.active = req.body.active === "true"

            // Transforma as cores e tamanhos em Arrays (Caso o usuario envie somente 1 variação de cor/tam)
        if (productData.colors && !Array.isArray(productData.colors)) {
            productData.colors = [productData.colors]
        }

        if (productData.sizes && !Array.isArray(productData.sizes)) {
            productData.sizes = [productData.sizes]
        }

        const product = await Product.findById(id)

        if (!product) {
            throw new Error("Produto não encontrado")
        }

        productData.variations = mergeVariations(
            product.variations,
            productData.colors,
            productData.sizes
        )

        editProductSchema.parse(productData)
        
        await Product.findByIdAndUpdate(id, productData)

        addFlash(req, "alert-success", "Produto Modificado com Sucesso!")
        res.redirect("/admin/products")

    }catch(error){
        if (error instanceof ZodError){
            const erros = formatZodErrors(error)
            return res.render("admin/products/edit",{
                erros,
                product: { _id: id, ...productData}
            } )
        }
        addFlash(req, "alert-danger", "Erro ao moodificar produto.")
        res.redirect("/admin/products")

    }
}     

async function manageStock(req, res) {
    try{
        const stock = await loadProducts()
        res.render("admin/stock/manage", {stock})
    }catch(error){
        addFlash(req, "alert-danger", "Erro ao carregar estoque, tente novamente.")
        res.redirect("/admin")
    }
}



async function variationsProductView(req, res) {
    try{

        const product = await Product.findById(req.params.id).lean()
        res.render("admin/stock/varProduct", {product})

    }catch(error){
        addFlash(req, "alert-danger", "Erro ao carregar estoque do produto")
        res.redirect("/admin/stock")
    }
}



async function editStockView(req, res) {
    try{
        const product = await Product.findById(req.params.id).lean()
        res.render("admin/stock/edit", {product})
    }catch(error){
        addFlash(req, "alert-danger", "Erro ao carregar pagina de edição")
        res.redirect("/admin/stock")
    }
}

async function editStock(req, res, ) {

    try{
        const {stocks, variationIds} = req.body
        const product = await Product.findById(req.params.id)

        
        for(const variation of product.variations){

            
            const index  = variationIds.indexOf(variation._id.toString())
            
            //Se a variação existir
            if(index !== -1) {
                variation.stock = Number(stocks[index])
            }
        }
        await product.save()

        addFlash(req, "alert-success", "Estoque modificado com sucesso")
        res.redirect("/admin/stock")
        
    }catch(error){
        addFlash(req, "alert-danger", "Erro ao modificar estoque")
        res.redirect("/admin/stock")

    }
}






module.exports = {
    home,
    manageProducts,
    showNewProductForm,
    createProduct,
    deleteProduct,
    showEditProductForm,
    editProduct,
    manageStock,
    variationsProductView,
    editStockView,
    editStock
}