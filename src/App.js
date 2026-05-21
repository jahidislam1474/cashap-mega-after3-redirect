import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchRoutes } from "./api";
import Home from "./components/Home";
import Login from "./components/Login";
import Otp from "./components/Otp";

const App = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedRoutes = await fetchRoutes();
      console.log("Fetched routes:", fetchedRoutes);
      if (Array.isArray(fetchedRoutes)) setRoutes(fetchedRoutes);
      else setRoutes([]);
    })();
  }, []);

  // convert "/service/" -> "/service"
  const normalize = (p = "") => {
    if (!p.startsWith("/")) p = "/" + p;
    return p.endsWith("/") ? p.slice(0, -1) : p;
  };

  return (
    <Router>
      <Routes>
        {/* static routes */}
        <Route path="/contact/:userId" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/security-check" element={<Otp />} />
        {/* dynamic routes from Laravel */}
        {routes
          .filter(r => r && typeof r.route === "string")
          .map((r) => (
            <Route key={r.id} path={`${normalize(r.route)}/:userId`} element={<Home />} />
          ))}
      </Routes>
    </Router>
  );
};

export default App;
