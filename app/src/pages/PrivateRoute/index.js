import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ auth, redirectTo, children }) => {
  const location = useLocation();
  if (!auth) {
    return (
      <Navigate
        to={redirectTo}
        replace={true}
        state={{ path: location.pathname }}
      />
    );
  }
  return children;
};

export default PrivateRoute;
