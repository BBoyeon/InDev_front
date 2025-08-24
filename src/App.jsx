import React from "react";
import StartPage from "./StartPage";
import RoleChoice from "./RoleChoice";
import CustomerOnboarding from "./Customer/CustomerOnboarding/CustomerOnboarding";
import CustomerDashboard from "./Customer/CustomerDashboard/CustomerDashboard";
import CustomerMarket from "./Customer/CustomerMarket/CustomerMarket";
import CustomerQuest from "./Customer/CustomerQuest/CustomerQuest";
import CustomerProfile from "./Customer/CustomerProfile/CustomerProfile";
import CustomerExchange from "./Customer/CustomerExchange/CustomerExchange";
import CustomerPoint from "./Customer/CustomerPoint/CustomerPoint";
import CustomerRecord from "./Customer/CustomerRecord/CustomerRecord";
import CustomerBadges from "./Customer/CustomerBadges/CustomerBadges";

import OwnerDashboard from "./Owner/OwnerDashboard/OwnerDashboard";
import OwnerOnboarding from "./Owner/OwnerOnboarding/OwnerOnboarding";
import OwnerQuest from "./Owner/OwnerQuest/OwnerQuest";
import OwnerProfile from "./Owner/OwnerProfile/OwnerProfile";
import OwnerMarket from "./Owner/OwnerMarket/OwnerMarket";

import OwnerProfileEdit from "./Owner/OwnerProfileEdit/OwnerProfileEdit";
import OwnerAi from "./Owner/OwnerAi/OwnerAi";
import OwnerRecord from "./Owner/OwnerRecord/OwnerRecord";
import OwnerQuestHistory from "./Owner/OwnerQuestHistory/OwnerQuestHistory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<StartPage />} />
        <Route path="/role-choice" element={<RoleChoice />} />
        <Route path="/customer-onboarding" element={<CustomerOnboarding />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/customer-dashboard/:id" element={<CustomerDashboard />} />
        <Route path="/customer-market" element={<CustomerMarket />} />
        <Route path="/customer-market/:id" element={<CustomerMarket />} />
        <Route path="/customer-quest" element={<CustomerQuest />} />
        <Route path="/customer-quest/:id" element={<CustomerQuest />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/customer-profile/:id" element={<CustomerProfile />} />
        <Route path="/customer-point" element={<CustomerPoint />} />
        <Route path="/customer-point/:id" element={<CustomerPoint />} />
        <Route path="/customer-exchange" element={<CustomerExchange />} />
        <Route path="/customer-exchange/:id" element={<CustomerExchange />} />
        <Route path="/customer-record" element={<CustomerRecord />} />
        <Route path="/customer-record/:id" element={<CustomerRecord />} />
        <Route path="/customer-badges" element={<CustomerBadges />} />
        <Route path="/customer-badges/:id" element={<CustomerBadges />} />

        <Route path="/owner-onboarding" element={<OwnerOnboarding />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/owner-quest" element={<OwnerQuest />} />
        <Route path="/owner-profile" element={<OwnerProfile />} />
        <Route path="/owner-market" element={<OwnerMarket />} />
        <Route path="/owner-profile-edit" element={<OwnerProfileEdit />} />
        <Route path="/owner-ai" element={<OwnerAi />} />
        <Route path="/owner-record" element={<OwnerRecord />} />
        <Route path="/owner-quest-history" element={<OwnerQuestHistory />} />
        
      </Routes>
    </Router>
  );
}

export default App; 
