import FindProductUseCase from "./find.product.usecase";

const product = {
    id: '1',
    name: 'Product 1',
    price: 100
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(product),
        update: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
    }
}

describe('Find Product Use Case', () => {
    it('should find a product', async () => {
        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);
        const input = {
            id: '1'
        }

        const output = await findProductUseCase.execute(input);

        expect(output).toEqual(product)
        expect(productRepository.find).toHaveBeenCalledTimes(1)

    })

    it('should throw an error when product not found', async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error('Product not found')
        })
        const findProductUseCase = new FindProductUseCase(productRepository);
        const input = {
            id: '3'
        }

        await expect(findProductUseCase.execute(input)).rejects.toThrow('Product not found')
    })
});