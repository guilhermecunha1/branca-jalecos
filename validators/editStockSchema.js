const z = require('zod')
const mongoose = require('mongoose')

const editStockSchema = z.object({


    stocks: z.array( 

    z.coerce.number()
    .int().min(0)

    ),

    variationIds: z.array(
        z.string().refine(value => mongoose.isValidObjectId(value))//Verifica se tem formato de objeto!
    )



})

module.exports = { editStockSchema }