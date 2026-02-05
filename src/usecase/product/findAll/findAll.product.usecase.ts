import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputFindProductDto } from "./findAll.product.dto";

export default class FindAllProductUseCase {
    private readonly _productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this._productRepository = productRepository;
    }

    async execute(): Promise<OutputFindProductDto> {
        const products = await this._productRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(products: any[]): OutputFindProductDto {
        return {
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        };
    }  
}