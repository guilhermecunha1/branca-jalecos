const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Product = new Schema({
    nome:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    
    descricao: {
        type: String,
        required: true
    },

    sexo: {
        type: String,
        enum: ['masculino', 'feminino', 'unissex'],
        required: true
    },

    precoBase: {
        type: Number,
        required: true
    },

     ativo: {
        type: Boolean,
        default: false,
    },
    

}, { timestamps: true })

mongoose.model("products", Product)