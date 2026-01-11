import api from "./config";

export async function getOrders(status) {
   try {
     const response = await api.get(
       `/branch/orders?status=${status}`
     );
     return response?.data;
   } catch (error) {
     console.error("Error fetching orders:", error);
     return null;
   }
    
}