const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Tamanhos e Cores:

const COLORS = [
    "Branco",
    "Preto",
    "Marrom",
    "Bege",
    "Azul",
    "Azul Marinho",
    "Ciano",
    "Bordo",
    "Magenta",
    "Lilás"
]

const SIZES = [
    "PP",
    "P",
    "M",
    "G",
    "XG",
    "XXG",
    "XXXG"

]

const Product = new Schema({
    name:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ['masculino', 'feminino', 'unissex'],
        required: true
    },

    basePrice: {
        type: Number,
        required: true
    },

     active: {
        type: Boolean,
        default: false,
    },

    colors: [{
        type: "String",
        enum: COLORS
    }],

    sizes: [{
        type: "String",
        enum: SIZES
    }]
    

}, { timestamps: true })

mongoose.model("products", Product)