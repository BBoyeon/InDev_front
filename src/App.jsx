// src/App.jsx
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
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const PageWrapper = ({ children }) => (
  <motion.div
    style={{ width: "100%", height: "100%" }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2 }}   // ⏱ 더 짧게
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><StartPage /></PageWrapper>} />
        <Route path="/role-choice" element={<PageWrapper><RoleChoice /></PageWrapper>} />
        <Route path="/customer-onboarding" element={<PageWrapper><CustomerOnboarding /></PageWrapper>} />
        <Route path="/customer-dashboard" element={<PageWrapper><CustomerDashboard /></PageWrapper>} />
        <Route path="/customer-dashboard/:id" element={<PageWrapper><CustomerDashboard /></PageWrapper>} />
        <Route path="/customer-market" element={<PageWrapper><CustomerMarket /></PageWrapper>} />
        <Route path="/customer-market/:id" element={<PageWrapper><CustomerMarket /></PageWrapper>} />
        <Route path="/customer-quest" element={<PageWrapper><CustomerQuest /></PageWrapper>} />
        <Route path="/customer-quest/:id" element={<PageWrapper><CustomerQuest /></PageWrapper>} />
        <Route path="/customer-profile" element={<PageWrapper><CustomerProfile /></PageWrapper>} />
        <Route path="/customer-profile/:id" element={<PageWrapper><CustomerProfile /></PageWrapper>} />
        <Route path="/customer-point" element={<PageWrapper><CustomerPoint /></PageWrapper>} />
        <Route path="/customer-point/:id" element={<PageWrapper><CustomerPoint /></PageWrapper>} />
        <Route path="/customer-exchange" element={<PageWrapper><CustomerExchange /></PageWrapper>} />
        <Route path="/customer-exchange/:id" element={<PageWrapper><CustomerExchange /></PageWrapper>} />
        <Route path="/customer-record" element={<PageWrapper><CustomerRecord /></PageWrapper>} />
        <Route path="/customer-record/:id" element={<PageWrapper><CustomerRecord /></PageWrapper>} />
        <Route path="/customer-badges" element={<PageWrapper><CustomerBadges /></PageWrapper>} />
        <Route path="/customer-badges/:id" element={<PageWrapper><CustomerBadges /></PageWrapper>} />
        
        <Route path="/owner-onboarding" element={<PageWrapper><OwnerOnboarding /></PageWrapper>} />
        <Route path="/owner-dashboard" element={<PageWrapper><OwnerDashboard /></PageWrapper>} />
        <Route path="/owner-quest" element={<PageWrapper><OwnerQuest /></PageWrapper>} />
        <Route path="/owner-profile" element={<PageWrapper><OwnerProfile /></PageWrapper>} />
        <Route path="/owner-market" element={<PageWrapper><OwnerMarket /></PageWrapper>} />
        <Route path="/owner-profile-edit" element={<PageWrapper><OwnerProfileEdit /></PageWrapper>} />
        <Route path="/owner-ai" element={<PageWrapper><OwnerAi /></PageWrapper>} />
        <Route path="/owner-record" element={<PageWrapper><OwnerRecord /></PageWrapper>} />
        <Route path="/owner-quest-history" element={<PageWrapper><OwnerQuestHistory /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="app-background">
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
