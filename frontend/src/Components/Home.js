import React from "react";
import { Navigate } from "react-router-dom";

//just for navigate to login page
function Home() {
  return <Navigate to="/auth/login" />;
}

export default Home;
