import { afterAll, beforeAll, describe, expect, test } from "vitest"
import request from "supertest"
import app from "../app"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import { randomUUID } from "node:crypto"

const User = mongoose.model("users")
const adminEmail = `admin-e2e-${randomUUID()}@example.test`
const adminPassword = "SenhaE2E123!"

describe("Admin E2E", () => {

    beforeAll(async () => {
        await mongoose.connection.asPromise()

        await User.create({
            name: "Administrador de teste",
            email: adminEmail,
            password: await bcrypt.hash(adminPassword, 10),
            role: "admin",
            active: true
        })
    })

    afterAll(async () => {
        await User.deleteOne({ email: adminEmail })
        await mongoose.disconnect()
    })

    test("Admin deve conseguir acessar o painel", async () => {

        const agent = request.agent(app)

        const loginResponse = await agent
            .post("/users/login")
            .send({
                email: adminEmail,
                password: adminPassword
            })

        expect(loginResponse.status).toBe(302)
        expect(loginResponse.headers.location).toBe("/")


 
        const adminResponse = await agent
            .get("/admin")
        expect(adminResponse.status).toBe(200)
    })

})


