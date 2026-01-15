import api from "./config";

export async function getEmployees(page=1) {
  try {
    const response = await api.get(`/branch/employees?page=${page}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching getEmployees:", error);
    return null;
  }
}

export async function addPoints(data) {
  try {
    const response = await api.post(`/branch/award-points`, data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching addPoints:", error);
    return null;
  }
}

