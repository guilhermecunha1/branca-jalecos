const {z} = require('zod')
const mongoose = require('mongoose')


const addCartSchema = z.object({

    productId: z.string().refine(value => mongoose.isValidObjectId(value)),

    variationId: z.string().refine(value => mongoose.isValidObjectId(value)),

    color: z.string().trim().min(1),

    size: z.string().trim().min(1),

    quantity: z.coerce.number().int().min(1),


        
})

module.exports = { addCartSchema }
