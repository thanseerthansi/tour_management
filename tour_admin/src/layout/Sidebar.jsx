import React, { useContext } from "react";
import { ContextDatas } from "../services/Context";

import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../constants/Path";

function Sidebar() {
  const { mobileSide, setmobileSide, urlPath, setUrlPath } =
    useContext(ContextDatas);

  let navigate = useNavigate();

  return (
    <div className="sidebar-wrapper">
      <div
        className={`sidebar sidebar-collapse ${mobileSide ? "collapsed" : ""}`}
        id="sidebar"
      >
        <div className="sidebar__menu-group">
          <ul className="sidebar_nav">
            {/* <li className={urlPath === PATH.HOME ? "active" : ""}>
              <Link to={PATH.HOME} onClick={() => setUrlPath(PATH.HOME)}>
                <span className="nav-icon uil uil-create-dashboard" />
                <span className="menu-text">Dashboard</span>
                
              </Link>
            </li> */}
            <li className={urlPath===PATH.HOME ? "active" : ""}>
             
            <Link
                to={PATH.HOME}
                onClick={() => setUrlPath(PATH.HOME)}
              >
                <span className="nav-icon uil uil-truck-loading" />
                <span className="menu-text">Packages</span>
                {/* <span className="badge badge-info-10 menuItem rounded-pill">
              1.1.7
            </span> */}
              </Link>
            </li>
            <li className={urlPath===PATH.ENQUIRY ? "active" : ""}>
             
              <Link
                to={PATH.ENQUIRY}
                onClick={() => setUrlPath(PATH.ENQUIRY)}
              >
                <span className="nav-icon uil uil-bag" />
                <span className="menu-text">Enquiry</span>
                
              </Link>
    
            </li>

            <li className={urlPath===PATH.COUNTRY ? "active" : ""}>
              <Link
                to={PATH.COUNTRY}
                onClick={() => setUrlPath(PATH.COUNTRY)}
              >
               
                <span className="nav-icon uil uil-streering" />
                <span className="menu-text">Country</span>
               
              </Link>
            </li>

            <li className={urlPath===PATH.BANNER ? "active" : ""}>
              <Link
                to={PATH.BANNER}
                onClick={() => setUrlPath(PATH.BANNER)}
              >
                <span className="nav-icon uil uil-truck" />
                <span className="menu-text">Banner</span>
               
              </Link>
            </li>
           

      
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
