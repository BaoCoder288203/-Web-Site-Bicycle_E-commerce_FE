import axiosConfig from "./axiosConfig";

const api = "api/v1/orders"

export const getDashboardSalesData = async () => {
    try {
        const url = `${api}/sales`
        const result = await axiosConfig.get(url);
        return { success: true, data: Array.isArray(result) ? result : [] };
    } catch (error) {
        console.error("Error fetching sales data:", error);
        return { success: false, data: [] }
    }
};


export const getDashboardMonthlyData = async () => {
    try {
        const url = `${api}/monthly-stats`
        const result = await axiosConfig.get(url);
        return { success: true, data: Array.isArray(result) ? result : [] };
    } catch (error) {
        console.error("Error fetching stats data:", error);
        return { success: false, data: [] }
    }
};

export const getDashboardStatCards = async () => {
    try {
        const url = `${api}/stat-cards`
        const result = await axiosConfig.get(url);
        return { success: true, data: Array.isArray(result) ? result : [] };
    } catch (error) {
        console.error("Error fetching top products:", error);
        return { success: false, data: [] }
    }
};

export const getDashboardYearData = async (year: number) => {
    try {
        const url = `${api}/get-revenue-by-year/${year}`
        const response = await axiosConfig.get(url);

        if (response && response.data.success === true && Array.isArray(response.data)) {
            return { success: true, data: response.data };
        } else {
            console.warn("API response structure is unexpected:", response);
            return { success: true, data: response };
        }

    } catch (error) {
        console.error("Error fetching year data:", error);
        return { success: false, data: [] }
    }
}


