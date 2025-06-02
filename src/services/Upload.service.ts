import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/media";

export const uploadSingleImage = async (file: File, folder: string = "Bicycle-E-commerce") => {
    try {
        // Tạo FormData để chứa dữ liệu upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const url = `${API_BASE_URL}/upload`;

        // Gửi request và không tự đặt Content-Type để tránh lỗi boundary
        const response = await axios.post(url, formData);

        // Xử lý kết quả thành công
        return {
            success: true,
            data: response.data,
            imageUrl: response.data.imageUrls?.[0] || null
        };
    } catch (error: any) {
        // Xử lý chi tiết khi có lỗi
        console.error("Error uploading image:", error);

        return {
            success: false,
            error: error.message || "Unknown error occurred",
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: null,
            imageUrl: null
        };
    }
};


export const uploadMultipleImages = async (files: File[], folder: string = "Bicycle-E-commerce") => {
    try {
        // Tạo FormData để chứa dữ liệu upload
        const formData = new FormData();

        // Thêm từng file vào FormData với key "files"
        files.forEach(file => {
            formData.append("files", file);
        });

        formData.append("folder", folder);

        const url = `${API_BASE_URL}/upload/multiple`;

        // Gửi request và không tự đặt Content-Type để tránh lỗi boundary
        const response = await axios.post(url, formData);

        // Xử lý kết quả thành công
        return {
            success: true,
            data: response.data,
            imageUrls: response.data.data.imageUrls || []
        };
    } catch (error: any) {
        // Xử lý chi tiết khi có lỗi
        console.error("Error uploading multiple images:", error);

        return {
            success: false,
            error: error.message || "Unknown error occurred",
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: null,
            imageUrls: []
        };
    }
};


export const deleteImage = async (imageUrl: string) => {
    try {
        const url = `${API_BASE_URL}/delete`;

        // Gửi request delete với query parameter
        const response = await axios.delete(url, {
            params: { url: imageUrl }
        });

        return {
            success: true,
            data: response.data
        };
    } catch (error: any) {
        console.error("Error deleting image:", error);

        return {
            success: false,
            error: error.message || "Unknown error occurred",
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: null
        };
    }
};


export const deleteMultipleImages = async (imageUrls: string[]) => {
    try {
        const url = `${API_BASE_URL}/delete/multiple`;

        // Gửi request delete với body là danh sách URL
        const response = await axios.delete(url, {
            data: { imageUrls }
        });

        return {
            success: true,
            data: response.data
        };
    } catch (error: any) {
        console.error("Error deleting multiple images:", error);

        return {
            success: false,
            error: error.message || "Unknown error occurred",
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: null
        };
    }
};