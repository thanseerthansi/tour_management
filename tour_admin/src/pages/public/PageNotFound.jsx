import React from "react";

function PageNotFound() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="min-vh-100 content-center">
            <div className="error-page text-center">
              <img src="/img/svg/404.svg" alt={404} className="svg" />
              <div className="error-page__title">404</div>
              <h5 className="fw-500">
                Sorry! the page you are looking for doesn't exist.
              </h5>
              <div className="content-center mt-30">
                <a
                  href="/"
                  className="btn btn-primary btn-default btn-squared px-30"
                >
                  Return Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
