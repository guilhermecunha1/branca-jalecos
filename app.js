require('dotenv').config()
const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const path = require("path")
const session = require("express-session")

const PORT = process.env.PORT || 1476

//Routes Connection
    const indexRoutes = require("./routes/indexRoutes")

//Middlewares
    const flashMessages = require("./middlewares/flash")


// Sessions
    app.use(
        session({
            secret: process.env.SESSION_SECRET || 'secret', //TEMPORARIO
            resave: false,
            saveUninitialized: false
        })
    )

//Body parser
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())


//Flash messages
    app.use(flashMessages)

// View engine
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    app.set('views', path.join(__dirname, "views"))

//Static Files
    app.use(express.static(path.join(__dirname, "public")))


//Rotas
    app.use("/", indexRoutes)







app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});