import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../pages/Home";

function AuthRoutes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} />
    </BrowserRouter>
  );
}
export default AuthRoutes;
