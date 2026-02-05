import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    private readonly _productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this._productRepository = productRepository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const newProduct = ProductFactory.create('a', input.name, input.price) as Product;
        await this._productRepository.create(newProduct);
        return {
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price,
        };
    }
}