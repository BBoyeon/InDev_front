import React from "react";
import StartPage from "./StartPage";
import RoleChoice from "./RoleChoice";
import CustomerOnboarding from "./Customer/CustomerOnboarding";
import CustomerDashboard from "./Customer/CustomerDashboard";
import CustomerMarket from "./Customer/CustomerMarket";
import CustomerQuest from "./Customer/CustomerQuest";
import CustomerProfile from "./Customer/CustomerProfile";

import OwnerDashboard from "./Owner/OwnerDashboard/OwnerDashboard";
import OwnerOnboarding from "./Owner/OwnerOnboarding/OwnerOnboarding";
import OwnerQuest from "./Owner/OwnerQuest/OwnerQuest";
import OwnerProfile from "./Owner/OwnerProfile/OwnerProfile";
import OwnerMarket from "./Owner/OwnerMarket/OwnerMarket";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<StartPage />} />
        <Route path="/role-choice" element={<RoleChoice />} />
        <Route path="/customer-onboarding" element={<CustomerOnboarding />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/customer-market" element={<CustomerMarket />} />
        <Route path="/customer-quest" element={<CustomerQuest />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />

         <Route path="/owner-onboarding" element={<OwnerOnboarding />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/owner-quest" element={<OwnerQuest />} />
        <Route path="/owner-profile" element={<OwnerProfile />} />
        <Route path="/owner-market" element={<OwnerMarket />} />
        
      </Routes>
    </Router>
  );
}

export default App; 
