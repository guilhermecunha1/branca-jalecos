const z = require("zod")

const editProductSchema = z.object({

    name: z
        .string({
            required_error: "O nome do produto é obrigatório"
        })
        .min(3, "O nome precisa ter no mínimo 3 caracteres")
        .max(30, "O nome pode ter no máximo 30 caracteres"),

    basePrice: z
        .coerce
        .number({
            invalid_type_error: "O preço deve ser um número"
        })
        .positive("O preço deve ser maior que zero"),

    gender: z
        .enum(
            [
                "masculino",
                "feminino",
                "unissex"
            ],
            {
                errorMap: () => ({
                    message: "Selecione um gênero válido"
                })
            }
        ),

    description: z
        .string({
            required_error: "A descrição é obrigatória"
        })
        .min(8, "A descrição precisa ter no mínimo 8 caracteres"),
        
    active: z
    .coerce
    .boolean()
    .optional()

})

module.exports = {editProductSchema}