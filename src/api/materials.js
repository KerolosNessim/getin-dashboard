import api from "./config";

export async function getMaterials() {
  try {
    const response = await api.get(`/branch/materials`);
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    return null;
  }
}

export async function getMaterialsCategories() {
  try {
    const response = await api.get("/branch/categories");
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function addMaterialRequest(data) {
  try {
    const response = await api.post("/branch/material-requests", data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getApprovalHistory() {
  try {
    const response = await api.get("/branch/material-requests/history");
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
export async function getMaterialsRequests() {
  try {
    const response = await api.get("/branch/material-requests");
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function updateMaterialRequest({ id, data }) {
  try {
    const response = await api.post(
      `/branch/material-requests/${id}/confirm-delivery`,
      data
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
