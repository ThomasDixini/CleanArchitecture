import { create } from "yup/lib/Reference"
import FindAllCustomersUseCase from "./findAll.customer.usecase"
import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"

const customer1 = CustomerFactory.createWithAddress('John Doe', new Address(
    'Main St',
    100,
    '12345',
    'Metropolis'
))

const customer2 = CustomerFactory.createWithAddress('Jane Doe', new Address(
    'Second St',
    200,
    '54321',
    'Gotham'
))

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        update: jest.fn(),
    }
}

describe('Find All Customers Use Case', () => {
    it('should find all customers', async () => {
        const customerRepository = MockRepository();
        const findAllCustomersUseCase = new FindAllCustomersUseCase(customerRepository);

        const output = await findAllCustomersUseCase.execute();

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);
        expect(output.customers[0].address.number).toBe(customer1.Address.number);
        expect(output.customers[0].address.zip).toBe(customer1.Address.zip);
        expect(output.customers[0].address.city).toBe(customer1.Address.city);
    })
})