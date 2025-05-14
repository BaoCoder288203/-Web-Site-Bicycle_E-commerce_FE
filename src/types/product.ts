export interface ProductResponse {
    productId: string;
    productName: string;
    price: number;
    priceReduced: number;
    image: string;
}

export interface ProductListProps {
    products: ProductResponse[];
}