const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema({

    name:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true

    },

    password:{
        type: String,
        required: true
    },

    role:{
        type: String,
        enum: ["admin", "employee", "user"],
        default: "user"
    },

    active:{
        type: Boolean,
        default: true
    }

})