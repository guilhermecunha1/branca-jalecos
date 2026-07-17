const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const { email } = require('zod')

require('../models/User')
const User = mongoose.model('users')

//  Configurações do Passport

module.exports = function(passport){

    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: "password",

    }, async (email, password, done) => {

        const user = await User.findOne({email})

        if(!user){
            return done(null, false, {message: "Essa conta nao existe."})
        }

        const match = await bcrypt.compare(password, user.password)
        if(!match){return done(null, false, {message: "Senha incorreta."})}
        return done(null, user)
        

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)

    })

    passport.deserializeUser(async(id, done) =>{
        try{
            const user = await User.findById(id)
            done(null, user)
        }
        catch(err){ 
            done(err)
        }
    })

}

