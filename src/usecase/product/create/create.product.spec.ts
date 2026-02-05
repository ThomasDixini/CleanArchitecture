import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.usecase";

const product = ProductFactory.create('a', 'Product 1', 100);

const MockRepository = () => {
    return {
        find: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
    }
}

describe('Create Product Use Case', () => {
    it('should create a product', async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const input = {
            type: 'a',
            name: 'Product 1',
            price: 100
        }
        const output = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: product.name,
            price: product.price
        });
        expect(productRepository.create).toHaveBeenCalled();
        expect(productRepository.create).toHaveBeenCalledTimes(1);
    });
});