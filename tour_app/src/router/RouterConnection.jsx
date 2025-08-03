
import { Outlet } from "react-router-dom";
import Header from "../layout/Header";


function RouterConnection() {

  return (
    <div>
      <Header/>
        <Outlet />
    </div>
  );
}

export default RouterConnection;
