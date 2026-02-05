export interface OutputFindProductDto {
    products: {
        id: string;
        name: string;
        price: number;
    }[];
}