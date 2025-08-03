import { ApiEndpoints } from "../constants/Urls";
import { ApiCall } from "../service/ApiCall";

export const fetchBanner = async (params) => {
    const response = await ApiCall("GET", ApiEndpoints.Banner, null, params);
    console.log("Banner response:", response);
    return response?.message?.data || [];
}