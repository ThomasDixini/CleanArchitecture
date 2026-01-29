import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('John Doe', new Address(
    'Main St',
    100,
    '12345',
    'Metropolis'
))

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
    }
}

const input = {
    id: customer.id,
    name: 'Jane Doe',
    address: {
        street: 'Second St',
        number: 200,
        zip: '54321',
        city: 'Gotham'
    }
}


describe('Unit test update customer use case', () => {
    it('should update a customer', async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input)
        expect(customerRepository.find).toHaveBeenCalledWith(customer.id);
        expect(customerRepository.find).toHaveBeenCalledTimes(1);
        expect(customerRepository.update).toHaveBeenCalled();
        expect(customerRepository.update).toHaveBeenCalledTimes(1);
    });
});