import api from "./config";

export async function getOrders(page = 1) {
  try {
    const response = await api.get(`/branch/orders?page=${page}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
}
export async function getOrderbyId(id) {
  try {
    const response = await api.get(`/branch/orders/${id}`);
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
}

export async function changeOrderStatus({ order_id, status }) {
  try {
    const response = await api.post(`/branch/change-status`, {
      order_id,
      status,
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
}
