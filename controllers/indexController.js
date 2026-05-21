const mongoose = require("mongoose")

async function home(req, res) {
    res.render("home/index")
}

module.exports = {
    home

}