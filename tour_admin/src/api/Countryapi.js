import { ApiEndpoints } from "../constants/Urls";
import { ApiCall } from "../services/ApiCall";

export const fetchcountry = async (params) => {
    const response = await ApiCall("GET", ApiEndpoints.Country, null, params);
    // console.log("Country response:", response);
    return response?.message?.data || [];
}
export const fetchcity = async (params) => {
    const response = await ApiCall("GET", ApiEndpoints.City, null, params);
    // console.log("Country response:", response);
    return response?.message?.data || [];
}