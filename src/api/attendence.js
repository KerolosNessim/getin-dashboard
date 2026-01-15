
import api from "./config";

export async function getEmployeeAttendenceToday() {
  try {
    const response = await api.get(`/branch/attendance/today`);
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching getEmployeeAttendenceToday:", error);
    return null;
  } 
}
export async function updateEmployeeAttendence(data) {
  try {
    const response = await api.post(`/branch/attendance`,data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching updateEmployeeAttendence:", error);
    return null;
  } 
}
export async function updateEmployeeDeparture(data) {
  try {
    const response = await api.post(`/branch/departure`, data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching updateEmployeeDeparture:", error);
    return null;
  } 
}
