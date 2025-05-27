import api from "../services/api";

export const getUserAuth = async () => {
    try {
        const response = await api.get("/auth/get-info");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const getUserList = async () => {
    try {
        const response = await api.get("/auth/get-users-list");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const editUser = async () => {
    try {
        const response = await api.get("/auth/edit-user");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const deleteUser = async (data) => {
    try {
        const response = await api.get(`/auth/delete-user/${data?.id}`, data);
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}




