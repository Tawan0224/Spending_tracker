import React from "react";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/journal" element={<Journal />} />
      {/* <Route path="/journal/:id" element={<JournalDetail />} /> */}
    </Routes>
  );
}

export default AppRoutes;