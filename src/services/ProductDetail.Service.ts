import axiosConfig from "./axiosConfig";
const api = "/api/v1";

// get by id /products/public/6823099ba0de5b7faf90f096
export const getProductById = async (productId: string) => {
    try {
        const url = `${api}/products/public/${productId}`;
        let result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting product detail:", error);
        return { success: false, message: error };
    }
}

// get specific product by productId
// /specifications/public/find/6822ecba9b989e58769c1e8b
export const getSpecifications = async (productId: string) => {
    try {
        const url = `${api}/specifications/public/find/${productId}`;
        let result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting product detail:", error);
        return { success: false, message: error };
    }
}

// get all reviews by productId
// /reviews/public/all?productId=6822ecba9b989e58769c1e8b
export const getAllReviews = async (productId: string) => {
    try {
        const url = `${api}/reviews/public/all?productId=${productId}`;
        let result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting reviews:", error);
        return { success: false, message: error };
    }
}

// send review
// /reviews/create
export const sendReview = async (data: any) => {
    try {
        const url = `${api}/reviews/create`;
        let result = await axiosConfig.post(url, data);
        return result;
    } catch (error) {
        console.error("Error sending review:", error);
        throw error;
    }
}