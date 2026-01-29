import Address from "../../../domain/customer/value-object/address";
import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    id: '123',
    name: 'John Doe',
    address: {
        street: 'Main St',
        number: 100,
        zip: '12345',
        city: 'Metropolis'
    }
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: 'John Doe',
            address: {
                street: 'Main St',
                number: 100,
                zip: '12345',
                city: 'Metropolis'
            }
        });
        expect(customerRepository.create).toHaveBeenCalled();
        expect(customerRepository.create).toHaveBeenCalledTimes(1);
    })

    it('should throw an error when name is missing', async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = '';

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow('Name is required');
    });
});