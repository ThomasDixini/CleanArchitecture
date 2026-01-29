import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { OutputCreateCustomerDto } from "../create/create.customer.dto";
import { InputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    private readonly _customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this._customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = await this._customerRepository.find(input.id);

        customer.changeName(input.name);
        customer.changeAddress(new Address(
            input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city
        ));
        await this._customerRepository.update(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
            }
        };
    }
}