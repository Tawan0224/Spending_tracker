import React from "react";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import NotFound from "./pages/NotFound";
import SpendingDetails from "./pages/SpendingDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/journal" element={<Journal />} />
      {/* <Route path="/journal/:id" element={<JournalDetail />} /> */}
      <Route path="*" element={<NotFound />} />
      <Route path="/journal/:id" element={<SpendingDetails />} />
    </Routes>
  );
}

export default AppRoutes;