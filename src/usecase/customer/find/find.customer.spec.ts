import e from "express";
import FindCustomerUseCase from "./find.customer.usecase";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";

const customer = {
    id: '123',
    name: 'John Doe',
    Address: {
        street: 'Main St',
        number: 100,
        zip: '12345',
        city: 'Metropolis'
    }
};
const customerRepositoryMock = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(customer)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn()
    }
}

describe('Find Customer Use Case', () => {
    it('should find a customer', async () => {
        const customerRepository = customerRepositoryMock();
        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        const input = { id: '123' };
        const output = await findCustomerUseCase.execute(input);

        expect(output).toEqual({
            id: '123',
            name: 'John Doe',
            address: {
                street: 'Main St',
                number: 100,
                zip: '12345',
                city: 'Metropolis'
            }
        });
        expect(customerRepository.find).toHaveBeenCalledWith('123');
        expect(customerRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when customer not found', async () => {
        const customerRepository = customerRepositoryMock();
        customerRepository.find.mockImplementation(() => {
            throw new Error('Customer not found');
        })
        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        expect(() => {
            return findCustomerUseCase.execute({ id: '999' });
        }).rejects.toThrow('Customer not found');
    })
});