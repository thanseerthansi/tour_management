import axios from "axios";
import { BaseUrl } from "../constants/Urls";

export const ApiCall = async (method, endPoint, data, params, is_formdata) => {
  let token = localStorage.getItem("token")
  // console.log("token...............",token)
  var headers = {
    "Content-Type": is_formdata ? "multipart/form-data" : "application/json",
    Authorization:token? token:'',
    platform: "web",
  };
  var url = BaseUrl + endPoint;
  try {
    const res = await axios({
      method,
      url,
      params,
      data,
      headers,
    });
    console.log("Response from API:", res);
    var response = { status:true, message: res.data };

    return response;
  } catch (error) {
    return error;
  }
};
