import React from "react";
import StartPage from "./StartPage";
import RoleChoice from "./RoleChoice";
import CustomerOnboarding from "./Customer/CustomerOnboarding";
import OwnerOnboarding from "./Owner/OwnerOnboarding";
import CustomerDashboard from "./Customer/CustomerDashboard";
import CustomerMarket from "./Customer/CustomerMarket";
import CustomerQuest from "./Customer/CustomerQuest";
import CustomerProfile from "./Customer/CustomerProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<StartPage />} />
        <Route path="/role-choice" element={<RoleChoice />} />
        <Route path="/customer-onboarding" element={<CustomerOnboarding />} />
        <Route path="/owner-onboarding" element={<OwnerOnboarding />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/customer-market" element={<CustomerMarket />} />
        <Route path="/customer-quest" element={<CustomerQuest />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
      </Routes>
    </Router>
  );
}

export default App; 
