import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { OutputFindAllCustomerDto } from "./findAll.customer.dto";

export default class FindAllCustomersUseCase {
    private readonly _customerRepository: CustomerRepositoryInterface;
    
    constructor(customerRepository: CustomerRepositoryInterface) {
        this._customerRepository = customerRepository;
    }

    async execute(): Promise<OutputFindAllCustomerDto> {
        const customers = await this._customerRepository.findAll();
        return OutputMapper.toOutput(customers);
    }


}

class OutputMapper {
    static toOutput(customers: Customer[]): OutputFindAllCustomerDto {
        return {
            customers: customers.map(customer => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city,
                },
            })),
        };
    }
}