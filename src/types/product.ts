export interface ProductResponse {
    productId: string;
    name: string;
    price: number;
    priceReduced: number;
    image: string;
}

export interface ProductListProps {
    products: ProductResponse[];
}