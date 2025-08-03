import { ApiEndpoints } from "../constants/Urls";
import { ApiCall } from "../services/ApiCall";

export const fetchPackage = async (params) => {
    const response = await ApiCall("GET", ApiEndpoints.Package, null, params);
    // console.log("package response:", response);
    return response?.message || [];
}
export const fetchSchedule = async (params) => {
    const response = await ApiCall("GET", ApiEndpoints.Schedule, null, params);
    console.log("schedule response:", response);
    return response?.message?.data || [];
}