import axiosConfig from "./axiosConfig";
import { ProductResponse } from "../types/product";
const api = "/api/v1/products"

const api_product = "/api/v1/products"
const api_category = "/api/v1/categories"
const api_supplier = "/api/v1/suppliers"
const api_inventories = "/api/v1/inventories"
const api_specification = "/api/v1/specifications"
const api_promotions = "/api/v1/promotions"

//===========Products============

interface PaginatedResponse<T> {
    content: T[];
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}

export const getAllProduct = async (
    pageNo = 0,
    pageSize = 4,
    sortBy = "name",
    sortDirection = "ASC"
): Promise<PaginatedResponse<ProductResponse>> => {
    try {
        const url = `${api}/public/getProductForHome`;
        const response = await axiosConfig.get(url, {
            params: {
                pageNo,
                pageSize,
                sortBy,
                sortDirection
            }
        });

        console.log("API response object:", response);

        return response.data;
    } catch (error: any) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        if (error.response && error.response.data) {
            return error.response.data;
        }

        return {
            statusCode: error.statusCode || error.response?.status || 500,
            message: error.message || "Đã xảy ra lỗi không mong muốn trong service.",
            success: false,
            data: {
                content: [],
                page: {
                    size: pageSize,
                    number: pageNo,
                    totalElements: 0,
                    totalPages: 0
                }
            }
        }
    }
};

export const getProductAll = async () => {
    try {
        const url = `${api_product}/public/all`;
        const result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error get Product:", error);
        return { success: false };
    }
}

export const getInvetoryByProductId = async (productId: string) => {
    try {
        const url = `${api_product}/public/productId`;
        const result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error get Product:", error);
        return { success: false };
    }
}

export const getProductWithPage = async (data: any) => {
    try {
        const url = `${api_product}/public/getProductsWithPage`;
        const result = await axiosConfig.get(url, {
            params: data
        });
        return result;
    } catch (error) {
        console.error("Error get Product:", error);
        return { success: false };
    }
}

//===========Category============
export const getAllCategory = async () => {
    try {
        const url = `${api_category}/public/getAll`;
        const result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error get category:", error);
        return { success: false };
    }
}

//===========Supplier============
export const getAllSupplier = async () => {
    try {
        const url = `${api_supplier}/getAllSupplier`;
        const result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error get supplier:", error);
        return { success: false };
    }
}

//===========Specifications============
export const getSpecificationByProductId = async (productId: string) => {
    try {
        const url = `${api_specification}/public/find/${productId}`;
        const result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error get supplier:", error);
        return { success: false };
    }
}
export const createSpecifications = async (data: any) => {
    try {
        const url = `${api_specification}/create`;
        const result = await axiosConfig.post(url, data);
        console.log("check response: ", result);
        return result.data;
    } catch (error) {
        console.error("Error create specification:", error);
        return { success: false };
    }
}
export const createCategory = async (data: any) => {
    try {
        const url = `${api_supplier}/create`;
        const result = await axiosConfig.post(url, data);
        return result.data;
    } catch (error) {
        console.error("Error create category:", error);
        return { success: false };
    }
}
export const createProduct = async (data: any) => {
    try {
        const url = `${api_product}/create`;
        const result = await axiosConfig.post(url, data);
        return result.data;
    } catch (error) {
        console.error("Error create product:", error);
        return { success: false };
    }
}
export const createInventory = async (data: any) => {
    try {
        const url = `${api_inventories}/create`;
        const result = await axiosConfig.post(url, data);
        return result.data;
    } catch (error) {
        console.error("Error create inventories:", error);
        return { success: false };
    }
}
export const bulkCreateInventory = async (data: any) => {
    try {
        const url = `${api_inventories}/bulkCreateInventory`;
        const result = await axiosConfig.post(url, data);
        return result.data;
    } catch (error) {
        console.error("Error create inventories:", error);
        return { success: false };
    }
}
export const getAllPromotions = async () => {
    try {
        const url = `${api_promotions}/list`;
        const result = await axiosConfig.get(url);
        return result.data;
    } catch (error) {
        console.error("Error get all promotion:", error);
        return { success: false };
    }
}