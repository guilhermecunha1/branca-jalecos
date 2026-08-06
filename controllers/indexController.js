const mongoose = require("mongoose")

async function home(req, res) {
    res.render("home/index", {currentPage: "home"})
}

async function aboutUs(req, res) {
    res.render('home/about', {currentPage: 'about'})
}
module.exports = {
    home,
    aboutUs

}