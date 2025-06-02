import axiosConfig from "./axiosConfig";

const api = "/api/v1/users";
const api_address = "/api/v1/address"

export const register = async (data: any) => {
    try {
        const url = `${api}/register`;
        const response = await axiosConfig.post(url, data);
        console.log("Register response:", response);
        return response;
    } catch (error) {
        console.error("Error registering user:", error);
        return error;
    }
}
export const getUserById = async (userId: string) => {
    try {
        const url = `${api}/${userId}`;
        const result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error fetching user:", error);
        return { success: false };
    }
}
export const getAddressById = async (userId: string) => {
    try {
        const url = `${api_address}/${userId}`;
        const result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error fetching address:", error);
        return { success: false };
    }
}
export const createAddress = async (address: any) => {
    try {
        const url = `${api_address}/create`;
        const result = await axiosConfig.post(url, address);
        return result;
    } catch (error) {
        console.error("Error create address:", error);
        return { success: false };
    }
}
export const editAddress = async (address: any) => {
    try {
        const url = `${api_address}/update`;
        const result = await axiosConfig.post(url, address);
        return result;
    } catch (error) {
        console.error("Error edit address:", error);
        return { success: false };
    }
}
export const editProfile = async (user: any) => {
    try {
        const url = `${api}/update`;
        const result = await axiosConfig.post(url, user);
        return result;
    } catch (error) {
        console.log("Error edit profile:", error);
        return { success: false };
    }
}
export const updateAvatar = async (data: any) => {
    try {
        const url = `${api}/updateAvatar`;
        const result = await axiosConfig.put(url, data);
        return result;
    } catch (error) {
        console.error("Error update avatar:", error);
        return { success: false };
    }
}