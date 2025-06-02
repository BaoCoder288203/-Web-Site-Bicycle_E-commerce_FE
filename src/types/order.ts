export interface OrderDetail {
    orderDetailId: string;
    productId: string;
    quantity: number;
    subtotal: number;
}

export interface Order {
    orderId: string;
    userId: string;
    orderDate: string;
    totalPrice: number;
    orderDetails: OrderDetail[];
    promotionId?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface Pageable {
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface SpringPage<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface OrdersPageResponse {
    success: boolean;
    data: SpringPage<Order>;
    message?: string;
    statusCode?: number;
}