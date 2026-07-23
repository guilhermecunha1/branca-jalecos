const addFlash = require("../utils/addFlash")


function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.role === "admin"){
            return next()
        }

        addFlash(req, "alert-danger", "Voce nao tem permissão para acessar a esta pagina.")
        return res.redirect("/")
}

function isAuthenticated(req, res, next){

    if(req.isAuthenticated()){
            return next()
        }

        addFlash(req, "alert-danger", "Faça login para poder acessar á essa pagina !")
        return res.redirect("/")
}


module.exports = {
    isAdmin,
    isAuthenticated
}