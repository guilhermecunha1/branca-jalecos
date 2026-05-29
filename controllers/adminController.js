const mongoose = require("mongoose")
const {ZodError} = require("zod")

//Models:
    require("../models/Product")
    const Product = mongoose.model("products")

//Schemas:
    const {productSchema} = require("../validators/productSchema")


    //Controllers:

async function addFlash(req, type, msg) {
    req.session.flash = {type, msg}
}

function formatZodErrors(error) {
  if (!(error instanceof ZodError)) {
    return [];
  }

  return error.issues.map((issue) => ({ texto: issue.message }));
}



async function home(req, res) {
    res.render("admin/index")
}

async function loadProducts(req, res) {
    return Product.find().lean().sort({createdAt: -1})
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
    const {name, slug, basePrice, gender, description, active} = req.body

    try{

        //Validação
        productSchema.parse({name, slug, basePrice, gender, description})
        await Product.create({name, slug, basePrice, gender, description, active})

        addFlash(req, "alert-success", "Produto Criado Com Sucesso")
        res.redirect("/admin/products")

    }catch(error){
        if (error instanceof ZodError) {
            const erros = formatZodErrors(error)
            return res.render("admin/products/create", {erros})

        }

        addFlash(req, "alert-danger", "Erro ao salvar categoria")
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







module.exports = {
    home,
    manageProducts,
    showNewProductForm,
    createProduct,
    deleteProduct
}