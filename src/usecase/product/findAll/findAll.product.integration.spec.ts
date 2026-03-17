import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindAllProductUseCase from "./findAll.product.usecase";

describe('Find All Products Use Case', () => {
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

    it('Should find all products', async () => {
        const productRepository = new ProductRepository();
        const findAllProductsUsecase = new FindAllProductUseCase(productRepository);
        
        const product = new Product('1', 'Teste', 10);
        await productRepository.create(product);

        const product2 = new Product('2', 'Teste2', 20);
        await productRepository.create(product2);

        const productsOutput = {
            products: [
                {
                    id: '1',
                    name: 'Teste',
                    price: 10
                },
                {
                    id: '2',
                    name: 'Teste2',
                    price: 20
                },
            ]
        }

        const output = await findAllProductsUsecase.execute();

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product.id);
        expect(output.products[0].name).toBe(product.name);
        expect(output.products[0].price).toBe(product.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    })
})