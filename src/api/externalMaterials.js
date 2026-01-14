import api from "./config";

export async function getExternalMaterials() {
  try {
    const response = await api.get(`/branch/material-externals`);
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    return null;
  }
}


export async function addExternalMaterialRequest(data) {
  try {
    const response = await api.post(
      "/branch/material-externals-requests",
      data
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching external material request:", error);
    return [];
  }
}

export async function getExternalMaterialHistory() {
  try {
    const response = await api.get(
      "/branch/material-externals-requests/history"
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching external material history:", error);
    return [];
  }
}
export async function getExternalMaterialRequests() {
  try {
    const response = await api.get("/branch/material-externals-requests");
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching external material requests:", error);
    return [];
  }
}

export async function updateExternalMaterialRequest({ id, data }) {
  try {
    const response = await api.post(
      `/branch/material-externals-requests/${id}/confirm-delivery`,
      data
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching external material request:", error);
    return [];
  }
}
