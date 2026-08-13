import {test, expect, describe} from 'vitest'
const {mergeVariations} = require("../controllers/adminController.js")   


describe( 'Servico Teste', () => {

    test("Quando eu tenho variações antigas e gero as novas as antigas devem ser mantidas", async () => {

        const oldVariations = [
            {
                color: 'Branco',
                size: 'M',
                stock: 10
            }
        ]

        const colors = ["Branco"]
        const sizes = ['M']

        const resultado = mergeVariations(
            oldVariations,
            colors,
            sizes
        )
        
        expect(resultado).toEqual([
            {
                color: 'Branco',
                size: "M",
                stock: 10
            }
        ])
         
    })


})
