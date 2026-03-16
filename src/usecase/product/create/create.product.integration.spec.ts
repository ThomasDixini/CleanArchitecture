import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase";
import { string } from "yup";

describe('Find Product Use Case', () => {
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

    it('Should create a product', async () => {
        const productRepository = new ProductRepository();
        const findProductUseCase = new CreateProductUseCase(productRepository);
        
        const input = {
            type: 'a',
            name: 'Teste',
            price: 10
        }

        const output = await findProductUseCase.execute(input);

        expect(typeof output.id).toBe('string')
        expect(output.name).toBe(input.name)
        expect(output.price).toBe(input.price)
    })
})