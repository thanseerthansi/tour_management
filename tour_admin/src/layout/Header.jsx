import React, { useContext } from "react";
import { ContextDatas } from "../services/Context";
import { ApiCall } from "../services/ApiCall";
import { ApiEndpoints } from "../constants/Urls";

function Header() {
  const { mobileSide, setmobileSide , setuser,setsearch ,search} = useContext(ContextDatas);
  const signOutHandler=async()=>{
    const data = await ApiCall("GET",ApiEndpoints.LOGOUT)
    console.log("data",data?.message?.status)
    if(data?.message?.status ===200){
      localStorage.removeItem("token")
      setuser("")
    }

   

  }
  return (
    <header className="header-top">
      <nav className="navbar navbar-light">
        <div className="navbar-left">
          <div className="logo-area">
          <h6>Tour_Admin</h6>
            {/* <a className="navbar-brand mt-4" href="/">
              <img className="dark" src="/img/logo/logo1-01.png" alt="logo" />
            </a> */}
            <a
              // href="#"
              className="sidebar-toggle"
              onClick={(e) => {
                e.preventDefault();
                setmobileSide(!mobileSide);
              }}
            >
              <img
                className="svg"
                src="/img/svg/align-center-alt.svg"
                alt="/img"
              />
            </a>
          </div>
          {/* <a href="#" className="customizer-trigger">
          <i className="uil uil-edit-alt" />
          <span>Customize...</span>
        </a> */}
        </div>
        <div className="navbar-right">
          <ul className="navbar-right__menu">
            <li className="nav-search">
              {/* <form
                action="https://demo.dashboardmarket.com/"
                className="search-form-topMenu show"
              >
                <span className="search-icon uil uil-search" />
                <input
                  className="form-control me-sm-2 box-shadow-none"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>setsearch(e.target.value)}
                />
              </form> */}
            </li>
           
           

            <li className="nav-author">
              <div className="dropdown-custom">
                <a href="javascript:;" className="nav-item-toggle">
                  <img
                    src="/img/author/robert-1.png"
                    alt
                    className="rounded-circle"
                  />
                  <span className="nav-item__title">
                    {/* Danial */}
                    <i className="las la-angle-down nav-item__arrow" />
                  </span>
                </a>
                <div className="dropdown-parent-wrapper">
                  <div className="dropdown-wrapper">
                    {/* <div className="nav-author__info">
                      <div className="author-img">
                        <img
                          src="/img/author-nav.jpg"
                          alt
                          className="rounded-circle"
                        />
                      </div>
                      <div>
                        <h6>Rabbi Islam Rony</h6>
                        <span>UI Designer</span>
                      </div>
                    </div> */}
                    <div className="nav-author__options">
                      <ul>
                        {/* <li>
                          <a href>
                            <i className="uil uil-user" /> Profile
                          </a>
                        </li> */}
                        <li>
                        <a href onClick={()=>signOutHandler()} className=" cursor-true ">
                        <i className="uil uil-sign-out-alt" /> Sign Out
                      </a>
                        </li>
                       
                      </ul>
                      {/* <a href onClick={()=>signOutHandler()} className="nav-author__signout cursor-true ">
                        <i className="uil uil-sign-out-alt" /> Sign Out
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          {/* <div className="navbar-right__mobileAction d-md-none">
          <a href="#" className="btn-search">
            <img
              src="/img/svg/search.svg"
              alt="search"
              className="svg feather-search"
            />
            <img src="/img/svg/x.svg" alt="x" className="svg feather-x" />
          </a>
          <a href="#" className="btn-author-action">
            <img
              className="svg"
              src="/img/svg/more-vertical.svg"
              alt="more-vertical"
            />
          </a>
        </div> */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
