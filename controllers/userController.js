const mongoose = require('mongoose')
const {ZodError} = require("zod")
const bcrypt = require("bcrypt")

//Models
require("../models/User")
const User = mongoose.model('users')

//Schema
const {userSchema} = require("../validators/userSchema")

//Utils
const addFlash = require('../utils/addFlash')
const formatZodErrors = require("../utils/formatZodErrors")



async function loginUser(req, res) {
    res.render("users/login", {layout: 'auth'})
}



async function registerUser(req, res){
    res.render("users/register", {layout: 'auth'})

}

async function createUser(req, res) {
    try{
    const data = userSchema.parse(req.body)

    const userExists = await User.findOne({email: data.email})

    if(userExists){
        addFlash(req, "alert-danger", "Ja existe um usuario com este email, use outro e-mail ou entre em login")
        return res.render("users/register")
    }

    const hash = await bcrypt.hash(data.password, 10)

    await User.create({
        name: data.name,
        email: data.email,
        password: hash,
        role: "user",
        active: true
    })
    console.log("Conta Criada")
    addFlash(req, "alert-success", "Usuario registrado.")
    res.redirect("/")

}  catch(error){

    if(error instanceof ZodError){

        const erros = formatZodErrors(error)

        return res.render("users/register", {
            erros,
            oldValues: {
                name: req.body.name,
                email: req.body.email
            }
        })

    }else{
        addFlash(req, "alert-danger", "Erro ao registrar usuario, Tente novamente.")
        return res.redirect('/users/register')
    }
}


}

module.exports = {
    loginUser,
    registerUser,
    createUser,
}