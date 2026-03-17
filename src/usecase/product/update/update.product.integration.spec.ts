import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

describe('Update Product Use Case', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('Should update a product', async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        // Create a product first
        const product = new Product("123", "Original Product", 100);
        await productRepository.create(product);

        const input = {
            id: "123",
            name: 'Updated Product',
            price: 150
        };
        
        const output = await updateProductUseCase.execute(input);
        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        });
    })
})