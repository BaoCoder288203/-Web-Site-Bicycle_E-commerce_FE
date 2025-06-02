import axiosConfig from "./axiosConfig";

const api = "/api/v1/payments"

export const createPayment = async (data: any) => {
    try {
        const url = `${api}/create`
        const response = await axiosConfig.post(url, data);
        return response.data;
    } catch (error: any) {
        console.error("Error create payment:", error);
        if (error.response && error.response.status === 302 && error.response.data) {
            const responseData = error.response.data;
            if (responseData.success === true && Array.isArray(responseData.data)) {
                return { success: true, data: responseData.data };
            }
        }

        return { success: false, data: [] }

    }
}

export const getPaymentStatus = async (data: any) => {
    try {
        const url = `${api}/vnpay-callback`
        const response = await axiosConfig.get(url, { 
            params: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error get payment status:", error);
        return { 
            success: false, 
            message: error.response?.data?.message || "Có lỗi xảy ra khi kiểm tra trạng thái thanh toán" 
        };
    }
}