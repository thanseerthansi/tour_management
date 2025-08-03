import { ApiEndpoints } from "../constants/Urls";
import { ApiCall } from "../services/ApiCall";

export const fetchEnquiry = async (params) => {
    const response = await ApiCall("GET", ApiEndpoints.Enquiry, null, params);
    console.log("Banner response:", response);
    return response?.message?.data || [];
}