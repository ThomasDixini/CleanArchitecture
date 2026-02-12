import request from 'supertest';
import { app, sequelize } from '../express';
import { number } from 'yup';
import e from 'express';

describe("E2E Test for Customer", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "123 Main St",
                    city: "Anytown",
                    number: 100,
                    zipCode: "12345"
                }
            });

            expect(response.status).toBe(200);
            expect(response.body.name).toBe("John Doe");
            expect(response.body.address.street).toBe("123 Main St");
            expect(response.body.address.city).toBe("Anytown");
            expect(response.body.address.number).toBe(100);
            expect(response.body.address.zip).toBe("12345");
    })

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
            });

            expect(response.status).toBe(500);
    });

    it("should list all customers", async () => {
        const response1 = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "123 Main St",
                    city: "Anytown",
                    number: 100,
                    zipCode: "12345"
                }
            });
        expect(response1.status).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Jane Doe",
                address: {
                    street: "Second St",
                    city: "Anytown",
                    number: 200,
                    zipCode: "54321"
                }
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app)
            .get("/customer")
            .send();
        
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        expect(listResponse.body.customers[0].name).toBe("John Doe");
        expect(listResponse.body.customers[0].address.street).toBe("123 Main St");
        expect(listResponse.body.customers[1].name).toBe("Jane Doe");
        expect(listResponse.body.customers[1].address.street).toBe("Second St");
    });
})