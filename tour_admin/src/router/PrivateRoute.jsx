import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { PATH } from "../constants/Path";
import { ContextDatas } from "../services/Context";



function PrivateRoute({ children }) {
  const { user } = useContext(ContextDatas)
// const user = localStorage.getItem("token");
console.log("user",user)

    if (!user)
    {
        return <Navigate to={PATH.LOGIN} />
    }
     if ( user != undefined || user !=null ) {
        // not logged in so redirect to login page with the return url
        // return <Navigate to={login} />
        return children;

    }
    else
    {
        return <Navigate to={PATH.LOGIN} />
    }


}
export default PrivateRoute