import axiosConfig from "./axiosConfig";
import { Order, OrdersPageResponse, SpringPage } from "../types/order";

const api = "/api/v1/orders";

export const getOrdersByUserId = async (
    pageNo: number = 0,
    pageSize: number = 10,
    sortBy: string = "orderDate",
    sortDirection: string = "desc"
): Promise<OrdersPageResponse> => {
    try {
        const url = `${api}/history-orders`;
        console.log("Calling API:", url, { params: { pageNo, pageSize, sortBy, sortDirection } });
        const response = await axiosConfig.get<SpringPage<Order>>(url, {
            params: {
                pageNo,
                pageSize,
                sortBy,
                sortDirection,
            }
        });
        console.log("API response data:", response.data);
        return {
            success: true,
            data: response.data,
            message: "Lấy danh sách đơn hàng thành công"
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

        const emptyResponse: SpringPage<Order> = {
            content: [],
            pageable: {
                sort: { sorted: false, unsorted: true, empty: true },
                offset: 0,
                pageNumber: 0,
                pageSize: pageSize,
                paged: true,
                unpaged: false,
            },
            totalPages: 0,
            totalElements: 0,
            last: true,
            size: pageSize,
            number: 0,
            sort: { sorted: false, unsorted: true, empty: true },
            numberOfElements: 0,
            first: true,
            empty: true,
        };

        return {
            success: false,
            data: emptyResponse,
            message: errorMessage,
        };
    }
};

export const getOrders = async () => {
    try {
        const url = `${api}/get-all`;
        let result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting orders:", error);
        return { success: false, message: error };
    }
}

export const getOrdersByPage = async (pageNo: number) => {
    try {
        const url = `${api}/get-all?pageNo=${pageNo}`;
        let result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting orders:", error);
        return { success: false, message: error };
    }
}

export const getOrdersByUserId_DB = async (userId: string, pageNo: number) => {
    try {
        const url = `${api}/get-by-user/${userId}?pageNo=${pageNo}`;
        let result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting orders:", error);
        return { success: false, message: error };
    }
}

//get order by orderId
export const getOrderById = async (orderId: string) => {
    try {   
        const url = `${api}/get/${orderId}`;
        const result = await axiosConfig.get(url, {
            maxRedirects: 0, // chặn redirect và xử lý nó nếu xảy ra
            validateStatus: (status) => status < 400 // không ném lỗi cho 3xx
          });
        return result;
    } catch (error) {
        console.error("Error getting order:", error);
        return { success: false, message: error };
    }
}
//create order
export const createOrder = async (data: any) => {
    try {   
        const url = `${api}/create`;
        const result = await axiosConfig.post(url, data);
        return result.data;
    } catch (error) {
        console.error("Error create order:", error);
        return { success: false, message: error };
    }
}
//create order
export const updateOrderStatus = async (data: any) => {
    try {   
        const url = `${api}/update`;
        const result = await axiosConfig.put(url, data);
        return result.data;
    } catch (error) {
        console.error("Error create order:", error);
        return { success: false, message: error };
    }
}