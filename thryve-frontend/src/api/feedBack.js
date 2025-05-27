import api from "../services/api";

export const getFeedbackList = async () => {
    try {
        const response = await api.get("/get-feed");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const createResponse = async (data) => {
    try {
        const response = await api.get("/feedback/create-feed", data);
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

//kapag may params
export const createResponse = async (data) => {
    try {
        const response = await api.get(`/feedback/create-feed/${data?.id}`, data);
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}