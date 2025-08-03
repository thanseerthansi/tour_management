import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiCall } from "./ApiCall";
import { ShowToast } from "../utils/Toast";

 
export const useCustomMutation = () => {

  const queryClient = useQueryClient();
 
  const mutation = useMutation({
    mutationFn: async ({ method, url, values,key, next, resetForm, params }) => {
      const response = await ApiCall(method, url, values,params);
      console.log(response);
    
      if (response?.message?.status===200) {
      
        ShowToast(response?.message?.message, "success");
        if(key){
          queryClient.invalidateQueries([key]);
          
        }
        if(next){
          next();
        }
        return  response?.message?.data;
      } else {
     
       
        ShowToast(response?.message?.message, "error");
        
        throw new Error(`HTTP status ${response.status}`);
      }
    },
  });
 
  return { mutation };
};

export const useGetFetchQuery = (key) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(key);
}