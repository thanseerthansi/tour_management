import { toast } from "react-toastify";

export const ShowToast = (message, type = "success") => {

  const toastOptions = {
    position: "top-right",    
    autoClose: 2000,           
    hideProgressBar: true,    
    closeOnClick: true,        
    pauseOnHover: true,       
    draggable: true,          
    progress: undefined,       
    theme: "colored",          // Can be 'light', 'dark', or 'colored'
  };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
    case "warning":
      toast.warn(message, toastOptions);
      break;
    default:
      toast(message, toastOptions); 
      break;
  }
};
