import axiosConfig from "./axiosConfig";
const api = "/api/v1/auth"
export const login = async (email: string, password: string) => {
    try {
        const url = `${api}/login`;
        console.log("check url: ", url);
        const result = await axiosConfig.post(url, { email, password });
        return result;
    } catch (error) {
        console.error("Error logging in user:", error);
        return { success: false, message: error };
    }
}

interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
        userId: string;
        email: string;
        role: string;
    } | null;
}

export const loginWithGoogle = async (token: string): Promise<AuthResponse> => {
    try {
        const url = `${api}/google`;
        const result = await axiosConfig.post(url, { token });
        return result;
    } catch (error: any) {
        console.error("Error logging in with Google:", error);
        return { success: false, message: error.message, data: null };
    }
}