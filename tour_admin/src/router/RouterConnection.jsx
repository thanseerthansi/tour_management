import React, { useContext, useEffect } from "react";

import { ContextDatas } from "../services/Context";
import { Outlet } from "react-router-dom";

import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Loader from "../components/Loader";

function RouterConnection() {
  const { mobileSide, pageLoading, setpageLoading} = useContext(ContextDatas);
  useEffect(() => {
    const timer = setTimeout(() => {
      setpageLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div>
      <div className="mobile-author-actions" />
      <Header />
      <main className="main-content">
        <Sidebar />
        {pageLoading ? (
        <Loader />
      ):
        <Outlet />
    }
      
      </main>

      <div className={`overlay-dark-sidebar ${mobileSide ? "show" : ""}`} />
      {/* <div className="customizer-overlay" /> */}
    </div>
  );
}

export default RouterConnection;
