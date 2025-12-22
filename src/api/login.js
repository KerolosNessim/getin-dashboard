import api from "./config";

export async function login(credentials) {
    try {
        const response = await api.post("/branch/login", credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}