import axiosConfig from "./axiosConfig";

const api = "/api/v1/promotions"

export const getPromotions = async () => {
    try {
        const url = `${api}/list`
        const response = await axiosConfig.get(url);

        if (response && response.data.success === true && Array.isArray(response.data)) {
            return { success: true, data: response.data.data };
        } else {
            console.warn("API response structure is unexpected:", response);
            return { success: true, data: response };
        }
    } catch (error: any) {
        console.error("Error fetching promotions:", error);
        if (error.response && error.response.status === 302 && error.response.data) {
            const responseData = error.response.data;
            if (responseData.success === true && Array.isArray(responseData.data)) {
                return { success: true, data: responseData.data };
            }
        }

        return { success: false, data: [] }

    }
}

export const createPromotion = async (promotionData: any) => {
    try {

        const formattedData = {
            name: promotionData.name,
            reducePercent: Number(promotionData.reducePercent) || 0,
            limitValue: Number(promotionData.limitValue) || 0,
            startDate: promotionData.startDate,
            endDate: promotionData.endDate,
            applyFor: promotionData.applyFor || 'PRODUCT',
            isActive: typeof promotionData.isActive === 'string' ? promotionData.isActive === 'true' : Boolean(promotionData.isActive)
        }

        const url = `${api}/createPromotion`;
        const response = await axiosConfig.post(url, formattedData);
        if (response && (
            response.data.success === true ||
            response.data.statusCode === 201 ||
            response.data.statusCode === 200
        )) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response?.data?.message || "Tạo khuyến mãi thất bại" };
        }
    } catch (error: any) {
        console.error("Error creating promotion:", error);

        if (error.response && error.response.data) {
            return {
                success: false,
                message: error.response.data.message || "Tạo khuyến mãi thất bại"
            };
        }

        return { success: false, message: "Tạo khuyến mãi thất bại" };
    }
};


export const updatePromotion = async (id: string, promotionData: any) => {
    try {
        const url = `${api}/updatePromotion/${id}`;
        const response = await axiosConfig.put(url, promotionData);

        if (response && (
            response.data.success === true ||
            response.data.statusCode === 201 ||
            response.data.statusCode === 200
        )) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response?.data?.message || "Cập nhật khuyến mãi thất bại" };
        }
    } catch (error: any) {
        console.error("Error updating promotion:", error);

        if (error.response && error.response.data) {
            return {
                success: false,
                message: error.response?.data?.message || "Cập nhật khuyến mãi thất bại"
            };
        }
    };
}

export const deletePromotion = async (id: string) => {
    try {
        console.log("Deleting promotion with ID:", id);
 
        const url = `${api}/deletePromotion/${id}`;


        const response = await axiosConfig.delete(url);
        console.log("Delete API response:", response);

        if (response && response.data.success === true) {
            return { success: true };
        } else {
            console.warn("Delete API returned success=false:", response);
            return { success: false, message: response?.data?.message || "Xóa khuyến mãi thất bại" };
        }
    } catch (error: any) {
        console.error("Delete error details:", error);

        if (error.response && error.response.data) {
            console.log("Error response data:", error.response.data);


            if (error.response.data.success === true) {
                return { success: true };
            }
        }

        return {
            success: false,
            message: error.response?.data?.message || "Xóa khuyến mãi thất bại"
        };
    }
};