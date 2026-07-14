const mongoose = require('mongoose')
const {ZodError} = require("zod")

//Models
require("../models/User")
const User = mongoose.model('users')


async function loginUser(req, res) {
    res.render("users/login")
}



async function registerUser(req, res){
    res.render("users/register")

}

async function createUser(req, res) {
    
}

module.exports = {
    loginUser,
    registerUser,
}