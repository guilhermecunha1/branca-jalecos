require('dotenv').config()
const connectDatabase = require("./config/db")
const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const path = require("path")
const session = require("express-session")
const passport = require("passport")
require("./config/auth")(passport)

const PORT = process.env.PORT || 1476

//Routes Connection
    const indexRoutes = require("./routes/indexRoutes")
    const adminRoutes = require("./routes/adminRoutes")
    const userRoutes = require('./routes/userRoutes')

//Utils
    const flashMessages = require("./middlewares/flash")
const { nextTick } = require('process')



// Sessions
    app.use(
        session({
            secret: process.env.SESSION_SECRET || 'secret', //TEMPORARIO
            resave: false,
            saveUninitialized: false
        })
    )

//Passport
    app.use(passport.initialize())
    app.use(passport.session())

    
    app.use((req, res, next) => {
        res.locals.user = req.user //Manda pra todas as rotas o usuario que esta conectado !
        res.locals.isAdmin = req.user?.role === "admin" //Envia pra view se o user é admin ou nao
        next()
    })

//Body parser
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())


//Flash messages
    app.use(flashMessages)

// View engine - Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    app.set('views', path.join(__dirname, "views"))

//Static Files
    app.use(express.static(path.join(__dirname, "public")))

//Conexão com o banco
    connectDatabase()

//Rotas
    app.use("/", indexRoutes)
    app.use('/admin', adminRoutes)
    app.use('/users', userRoutes)







app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});