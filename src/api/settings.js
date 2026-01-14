import api from "./config";

export async function getSettings() {
  try {
    const response = await api.get(`/branch/settings`);
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching getSettings:", error);
    return null;
  }
}
export async function updateSettings(data) {
  try {
    const response = await api.post(`/branch/settings`, data);
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching updateSettings:", error);
    return null;
  }
}
