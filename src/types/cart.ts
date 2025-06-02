export interface CartItemsResponse {
    productId: string;
    price: number;
    color: string; 
    quantity: number;
}

export interface CartResponse {
    cartId: string;
    userId: string;
    items: CartItemsResponse[];
}

export interface MessageResponse<T> {
    statusCode: number;
    message: string;
    success: boolean;
    data: T;
}