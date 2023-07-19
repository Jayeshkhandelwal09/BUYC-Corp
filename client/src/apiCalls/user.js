import { axiosInstance } from "./axiosInstance";

// Register User

export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post("users/register" , payload);
        return response.data;
    } catch (error) {
        return error
    }
}

// Login User
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("users/login" , payload);
        return response.data;
    } catch (error) {
        return error
    }
}