const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
    

}, { timestamps: true })

mongoose.model("products", Product)