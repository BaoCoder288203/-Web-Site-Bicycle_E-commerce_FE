import axiosConfig from "./axiosConfig";
const api = "/api/v1/suppliers";

export const getSuppliersPaging = async (pageNo: number) => {
    try {
        const url = `${api}/public/getAll?pageNo=${pageNo}`;
        let result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting suppliers:", error);
        return { success: false, message: error };
    }
}

export const getSupplierById = async (supplierId: string) => {
    try {   
        const url = `${api}/public/getSupplierById/${supplierId}`;
        const result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting supplier:", error);
        return { success: false, message: error };
    }
}

export const getSupplierByEmail = async (email: string) => {
    try {   
        const url = `${api}/public/getSupplierByEmail?email=${email}`;
        const result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting supplier:", error);
        return { success: false, message: error };
    }
}

export const createSupplier = async (data: any) => {
    try {
        const url = `${api}/create`;
        let result = await axiosConfig.post(url, data);
        return result;
    } catch (error) {
        console.error("Error creating supplier:", error);
        return { success: false, message: error };
    }
}

export const deleteSupplier = async (supplierId: string) => {
    try {
        const url = `${api}/delete/${supplierId}`;
        let result = await axiosConfig.post(url);
        return result;
    } catch (error) {
        console.error("Error deleting supplier:", error);
        return { success: false, message: error };
    }
}

export const updateSupplier = async (supplierId: string, data: any) => {
    data.supplierId = supplierId;
    try {
        const url = `${api}/update`;
        let result = await axiosConfig.post(url, data);
        return result;
    } catch (error) {
        console.error("Error updating supplier:", error);
        return { success: false, message: error };
    }
}

