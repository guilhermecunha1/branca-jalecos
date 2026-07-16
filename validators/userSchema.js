const z = require("zod")

const userSchema = z.object({

    name: z.string()
    .trim()
    .min(3, 'O nome deve conter pelo menos 3 carácteres')
    .max(20, "Nome muito longo, Tente novamente.")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),

    email: z.string()
    .trim()
    .email("E-mail invalido !")
    .toLowerCase(),

    password: z.string()
    .min(8, "A senha deve conter pelo menos 8 carácteres.")
    .max(25, "Senha muito extensa, Tente novamente com uma senha menor."),

    confirmPassword: z.string()
    .min(8, "Confirme sua senha"),

    


}).refine(data => data.password === data.confirmPassword, {
    message: "As senhas nao se coincidem.",
    path: ["confirmPassword"]    
})

module.exports = {userSchema}