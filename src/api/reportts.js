import api from "./config";

export async function getAllReports(filter="today") {
  try {
    const response = await api.get(
      `/branch/financial-reports?date_filter=${filter}`
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return null;
  }
}
export async function getOperationsReports(filter="today") {
  try {
    const response = await api.get(
      `/branch/operations-reports?date_filter=${filter}`
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return null;
  }
}
export async function getProductsReports(filter="today") {
  try {
    const response = await api.get(
      `/branch/products-reports?date_filter=${filter}`
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return null;
  }
}
