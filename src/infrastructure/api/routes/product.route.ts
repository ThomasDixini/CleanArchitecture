import express from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import FindAllCustomersUseCase from "../../../usecase/customer/findAll/findAll.customer.usecase";
import FindAllProductUseCase from "../../../usecase/product/findAll/findAll.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req, res) => {
    const useCase = new CreateProductUseCase(new ProductRepository());
    try {
        const productDto = {
            name: req.body.name,
            type: req.body.type,
            price: req.body.price
        };
        const output = await useCase.execute(productDto);
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (req, res) => {
    const useCase = new FindAllProductUseCase(new ProductRepository());
    try {
        const output = await useCase.execute();
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});