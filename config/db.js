const mongoose = require("mongoose")

async function connectDatabase(){

    try{

        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Conectado com Sucesso !")

    } catch (error){
        console.error("Erro ao conectar ao banco:", error)
        process.exit(1)
    }
}

module.exports = connectDatabase