const mongoose = require('mongoose')
const {ZodError} = require("zod")
const bcrypt = require("bcrypt")
const passport = require("passport")

//Models
require("../models/User")
const User = mongoose.model('users')

//Schema
const {userSchema} = require("../validators/userSchema")

//Utils
const addFlash = require('../utils/addFlash')
const formatZodErrors = require("../utils/formatZodErrors")

//Middlewares
const {isAuthenticated} = require("../middlewares/auth")




async function loginUserView(req, res) {
    res.render("users/login", {layout: 'auth'})
}



async function registerUserView(req, res){
    res.render("users/register", {layout: 'auth'})

}

async function loginUser(req, res, next) {
    console.log("Logou")
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureFlash: true // Messages!
    }) (req, res, next)
    
}

async function logoutUser(req, res) {
    req.logout(function(err){

        if(err){
            return next (err)
        }

        addFlash(req, "alert-success", "Conta desconectada com sucesso")
        res.redirect('/')
    })
}

async function createUser(req, res) {
    try{
    const data = userSchema.parse(req.body)

    const userExists = await User.findOne({email: data.email})

    if(userExists){
        addFlash(req, "alert-danger", "Ja existe um usuario com este email, use outro e-mail ou entre em login")
        return res.redirect("/users/register")
    }

    const hash = await bcrypt.hash(data.password, 10)

    

    const user = await User.create({
        name: data.name,
        email: data.email,
        password: hash,
        role: "user",
        active: true
    })

    req.login(user, (err) => {

        if(err) {
            addFlash(req, "alert-danger", "Erro ao fazer o login")
            return res.redirect("/")
        }

        addFlash(req, "alert-success", "Seja bem vindo !")
        return res.redirect("/")
    })

    


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
    loginUserView,
    registerUserView,
    createUser,
    loginUser,
    logoutUser, // !!
}