import React from "react";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import SpendingDetails from "./pages/SpendingDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/journal/:id" element={<SpendingDetails />} />
    </Routes>
  );
}

export default AppRoutes;