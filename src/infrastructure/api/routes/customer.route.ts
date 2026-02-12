import express, { Router } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import { number } from "yup";
import FindAllCustomersUseCase from "../../../usecase/customer/findAll/findAll.customer.usecase";


export const customerRoute: Router = express.Router();

customerRoute.post("/", async (req, res) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());
    try
    {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                zip: req.body.address.zipCode
            }
        };
        const output = await useCase.execute(customerDto);
        res.status(200).send(output);
    } catch(err){
        res.status(500).send(err);
    }
});

customerRoute.get("/", async (req, res) => {
    const useCase = new FindAllCustomersUseCase(new CustomerRepository());
    try
    {
        const output = await useCase.execute();
        res.status(200).send(output);
    } catch(err){
        res.status(500).send(err);
    }
});