const mongoose = require("mongoose");
const { required } = require("zod/mini");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "employee", "user"],
      default: "user",
    },

    active: {
      type: Boolean,
      default: true,
    },

    cart: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },

          variationId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },

          quantity: {
            type: Number,
            default: 1,
            required: true,
            min: 1,
          },
        },
      ],
      default: []
    },
  },
  { timestamps: true },
); //VER SE PRECISA POR O TIMESTAMPS PRO CREATEDAT !!

mongoose.model("users", User);
