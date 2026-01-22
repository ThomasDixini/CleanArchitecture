import e from "express";
import FindCustomerUseCase from "./find.customer.usecase";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";

describe('Find Customer Use Case', () => {
  it('should find a customer', async () => {
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
    const customerRepositoryMock: CustomerRepositoryInterface = {
        find: jest.fn().mockResolvedValue(customer),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn()
    }
    const findCustomerUseCase = new FindCustomerUseCase(customerRepositoryMock);

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
    expect(customerRepositoryMock.find).toHaveBeenCalledWith('123');
    expect(customerRepositoryMock.find).toHaveBeenCalledTimes(1);
  });
});