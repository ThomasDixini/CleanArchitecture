import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create('a', 'Product 1', 100);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
    }
} 

const input = {
    id: expect.any(String),
    name: 'Updated Product',
    price: 150
};

describe('Update Product Use Case', () => {
    it('should update a product', async () => {
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);
        
        const output = await updateProductUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
        expect(productRepository.update).toHaveBeenCalled();
        expect(productRepository.update).toHaveBeenCalledTimes(1);
    });
});