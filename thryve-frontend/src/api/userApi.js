import api from "../services/api";

export const getUserAuth = async () => {
    try {
        const response = await api.get("/get-info");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}