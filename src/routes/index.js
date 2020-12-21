import React from "react";

import { useAuth } from "../contexts/auth";

import AuthRoutes from "./AuthRoutes";
import UnauthRoutes from "./UnauthRoutes";

function Routes() {
  const { signed, isLoading } = useAuth();

  console.log("routes");
  console.log(signed);
  if (isLoading) {
    return (
      <div>
        <h1>LOADING</h1>
      </div>
    );
  }

  return signed ? <AuthRoutes /> : <UnauthRoutes />;
}

export default Routes;
