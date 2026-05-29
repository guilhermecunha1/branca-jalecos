const z = require("zod")

const productSchema = z.object({

    name: z
        .string({
            required_error: "O nome do produto é obrigatório"
        })
        .min(3, "O nome precisa ter no mínimo 3 caracteres")
        .max(30, "O nome pode ter no máximo 30 caracteres"),

    slug: z
        .string({
            required_error: "O slug é obrigatório"
        })
        .toLowerCase()
        .min(3, "O slug precisa ter no mínimo 3 caracteres")
        .max(50, "O slug pode ter no máximo 50 caracteres")
        .regex(
        /^[a-z0-9-]+$/,
        "O slug pode conter apenas letras minúsculas, números e hífen"
        ),

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
        .min(8, "A descrição precisa ter no mínimo 8 caracteres")

})

module.exports = {productSchema}